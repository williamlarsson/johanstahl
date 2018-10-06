require('./TweenMax.min.js');
require('vimeo-froogaloop');

// import ScrollTo from './ScrollTo.js'

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
        $player_content = $('.portfolio_player_content');

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
            iframes_counter = 0,
            iframes_length = $fields['front_images'].length - 1;

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
        } else {
            $(front_images[0]).addClass('is-active')
            cycleFrontImages()
        }
        stopper = true
        function cycleFrontImages(){
            var current = $(front_images[iframes_counter])
            setTimeout(function(){
                var next = $(front_images[iframes_counter])
                next.addClass('is-active')
                current.removeClass('is-active')
                cycleFrontImages()
            }, ( $fields['front_images'][iframes_counter]['duration'] ))
            if (iframes_counter == iframes_length) {
                iframes_counter = 0;
            } else {
                iframes_counter++;                
            }
        }
    } else {
        setTimeout(function() {
            $body.addClass('finished');
        }, 200);
    }
    // load bg images
    $('.portfolio_image').each(function (index, item) {
        var img = new Image()
        img.onload = function () {
            console.log('image loaded', img.src)
            $(item).css({
                "background-image": "url(" + img.src + ")",
                "transition-delay": "0." + index + "s"
            });
            $(item).addClass('loaded')
        }
        img.src = $(this).data('src')
    });
    
    function showVideo(el){
        if ( frontHasVideo ) {   
            $f($('.front_video').find('iframe')[0]).api('pause');
        }
        var $el = $(el);
        $player_iframe.html( JSON.parse( $el.data('url') ));
        $player_title.text( $el.find('.portfolio_title').text() )
        $player_client.text( $el.find('.portfolio_client').text() )
        $player_content.text( $el.find('.portfolio_client').text() )
        $player_content.html( $el.find('.portfolio_content').html() )
        $body.addClass('player-open');
    }
    if (window.location.hash.length > 1 ) {
        var el = $(".portfolio_image[data-hash='"+window.location.hash.replace('#','')+"']");
        showVideo(el)
    }
    $('.portfolio_image').click(function(event) {
        event.preventDefault();
        window.location.hash = $(this).data('hash');
        showVideo(this);
    });
    $player_close.click(function(event){
        window.location.hash = '';
        event.preventDefault();
        $body.removeClass('player-open');
        $f($player_iframe.find('iframe')[0]).api('pause');
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

