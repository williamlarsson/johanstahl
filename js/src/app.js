require('./TweenMax.min.js');
require('vimeo-froogaloop');
const Papa = require('./papaparse.min.js');


var blue = "#132A3E",
    darkblue = "#0D1B28",
    orange = "#EB5842";
$ = jQuery;
log = function(content) {   
    console.log(content);
};
function App() {
          
    var $width = $(window).width(),
        $height = $(window).height(),
        $tablet = $width < 1025, 
        $body = $('body'),
        timeline = new TimelineMax(),
        $navContainer = document.querySelector('.nav_container'),
        $nav = document.querySelector('nav'),
        $listItems = $('.nav li.menu-item-type-custom'),
        headerLogo = document.querySelector('.header_logo'),
        headerLogoImg = document.querySelector('.header_logo_img'),
        // scrollBreakPoint = headerLogoImg.getBoundingClientRect().top - $nav.clientHeight,
        scrollBreakPointNav = headerLogoImg.offsetTop - ($navContainer.clientHeight),
        scrollBreakPointLogo = headerLogoImg.offsetTop - (15),
        count = 0,
        // easer = 140,
        video_delay = 500,
        stopper = false,
        frontHasVideo = innerWidth > 767 && $('.front_container').hasClass('has-video'),
        $player_close = $('.portfolio_close'),
        $player_iframe = $('.portfolio_iframe'),
        $player_title = $('.portfolio_player_title'),
        $player_client = $('.portfolio_player_client'),
        $player_content = $('.portfolio_player_content'),
        videosLoaded = false;

    // Variables other
    var $transitionFast = 0.45,
        $transitionSlow = 0.35,
        $ease ='cubic-bezier(.77, 0, .175, 1)';
        console.log($nav.clientHeight)

    // NAVIGATION
    if (innerWidth > 767) {
        window.addEventListener('scroll', scrollHandler)
    } else {
        $body.addClass('scrolled-nav scrolled-logo')
    }
    function scrollHandler(event) {
        if (window.scrollY > scrollBreakPointNav){
            $body.addClass('scrolled-nav')
        } else {
            $body.removeClass('scrolled-nav')
        }
        if (window.scrollY > scrollBreakPointLogo){
            $body.addClass('scrolled-logo')
        } else {
            $body.removeClass('scrolled-logo')
        }
    }
    function scrollTo(toElement) {
        $('html, body').animate({
            scrollTop: toElement.offsetTop - 40
        },500) 
    }

    function htmlString(title,client, image, embed, info, size){
        return `<div class="portfolio_image ${size}-width" data-url='${JSON.stringify(embed)}'
            data-title="${title}" style="background-image: url('img/${image}');" data-hash="${title.toLocaleLowerCase().replace(' ','-')}">
            <div class="portfolio_info">
                <h3 class="portfolio_title">${title}</h3>
                <hr>
                <h2 class="portfolio_client">${client}</h2>
            </div>
            <div class="portfolio_content">${info}</div>
        </div>
    `};

    function injectHTML(data, targetEl){

        for (item of data){

            if (item[0] == "TITLE") {

                continue;
            }

            let string = htmlString(
                item[0],
                item[1],
                item[2],
                item[3],
                item[4],
                item[5]);

            targetEl.insertAdjacentHTML('beforeend', string)
        }
        videosLoaded = true;
    }
    // // navigation
    // $listItems.on('click', function (ev) {
    //     ev.preventDefault()
    //     toElement = document.querySelector(this.querySelector('a').hash)
    //     scrollTo(toElement)
    // })
    // headerLogoImg.addEventListener('click', function (ev) {
    //     if($body.hasClass('home')) {
    //         toElement = document.querySelector('section#home')
    //         scrollTo(toElement)
    //     } else {
    //        window.location = this.getAttribute('data-url')
    //     }
    // })
    if ( $body.hasClass('home') ) {
        /*************** FRONTPAGE ***************/ 
        var front_container = $('.front_container'), 
            front_images = $('.front_image'),
            iframes_counter = 0;

        setTimeout(function() {
            $body.addClass('finished');
        }, 1200);
        if ( frontHasVideo ) {   
            // froogaloop.api('getVideoUrl', function(url) {
            //     console.log('url:', url);
            // });

            $('.front_video').html( JSON.parse( $('.front_video').data('url') ));
            console.log('set video')
            // $f_front_video = $f($('.front_video').find('iframe')[0])
            // console.log($f_front_video.api)
        }
       

        let workDataPath = './data/work.csv',
            workContainer = document.querySelector('#work>.portfolio_images');
        

        Papa.parse(workDataPath, {
            download: true,
            complete: (result) => {
                injectHTML(result.data, workContainer)
            }
        })

    } else {
        setTimeout(function() {
            $body.addClass('finished');
        }, 200);
    }
    if ($body.hasClass('archive-page')){
        

        let archivePath = './data/archive.csv',
            archiveContainer = document.querySelector('#archive>.portfolio_images');
        

        Papa.parse(archivePath, {
            download: true,
            complete: (result) => {
                injectHTML(result.data, archiveContainer)
            }
        })
        
    };
    // load bg images

    // $('.portfolio_image').each(function (index, item) {
    //     console.log('item', item)
    //     var img = new Image()
    //     img.onload = function () {
    //         // console.log('image loaded', img.src)
    //         $(item).css({
    //             "background-image": "url(" + img.src + ")",
    //             "transition-delay": "0." + index + "s"
    //         });
    //         $(item).addClass('loaded')
    //     }
    //     img.src = $(this).data('src')
    // });
    
    function showVideo(el){
        if ( frontHasVideo ) {   
            $f($('.front_video').find('iframe')[0]).api('pause');
        }
        var $el = $(el);
        $player_iframe.html( JSON.parse( $el.data('url') ));
        $player_title.text( $el.find('.portfolio_title').text() )
        $player_client.text( $el.find('.portfolio_client').text() )
        console.log($player_client.text())
        $player_client[0].style.display = $player_client.text().length > 0 ? 'inline-block' : 'none';
        // $player_content.text( $el.find('.portfolio_client').text() )
        $player_content.html( $el.find('.portfolio_content').html() )
        $body.addClass('player-open');
    }
    if (window.location.hash.length > 1 ) {
        let waitForLoad = setInterval(() => {
            if (videosLoaded) {
                var el = $(".portfolio_image[data-hash='"+window.location.hash.replace('#','')+"']");
                console.log(el)
                showVideo(el)
                clearInterval(waitForLoad)
            }
        }, 500);
    }
    $(document).on('click','.portfolio_image', function(event) {
        event.preventDefault();
        window.location.hash = $(event.target).data('hash');
        showVideo(event.target);
    });
    $player_close.click(function(event){
        window.location.hash = '';
        event.preventDefault();
        $body.removeClass('player-open');
        $player_iframe.html('')
        // $f($player_iframe.find('iframe')[0]).api('pause');
        if ( frontHasVideo ) {   
            $f($('.front_video').find('iframe')[0]).api('play');
        }
    })
    
    
    /*************** modernizr ***************/ 
    if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ){
        $body.addClass('firefox')
    }   else if( navigator.userAgent.toLowerCase().indexOf('chrome') > -1 ){
        $body.addClass('chrome')
    }   
    else if( navigator.userAgent.toLowerCase().indexOf('safari') > -1 ){
        $body.addClass('safari')
    }
    $(window).on('resize',function () {
        $width = $(window).width(),
        $height = $(window).height();
        scrollBreakPointNav = headerLogoImg.offsetTop - ($navContainer.clientHeight)
        scrollBreakPointLogo = headerLogoImg.offsetTop - (15)
    })


} // APP

$(document).ready(function() {
    console.log('ready')
    App();
});   
$(window).on('load',function() {
    console.log('load')
});   

