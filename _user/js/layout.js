$(document).ready(function () {
    const $body = $('body'),
        $header = $('.header'),
        $innerHeaderWrap = $('.inner-header-wrap'),
        $headerLogo = $('.inner-header .logo'),
        $headerUtil = $('.header-util'),
        $gnbWrap = $('.gnb-wrap'),
        $gnb = $gnbWrap.find('.gnb'),
        $dep1A = $gnb.find('>li>a'),
        $dep2A = $gnb.find('.dep2>li>a'),
        $dep2Wrap = $('.dep2-wrap'),
        $menuBtn = $header.find('.menu-btn'),
        $dimm = $('.dimm');

    const $btnPopup = $('.util .popup-btn'),
        $popup = $('.popup-wrap'),
        $popupClose = $('.popup-bottom .popup-close');

    const $topBtn = $('.btn-top');

    mobGnb();
    webGnb();


    //header sticky
    $(window).on('scroll', function() {
        let scrollTop = $(this).scrollTop();
        if (scrollTop > 0) {
            $header.addClass('sticky');
        } else {
            $header.removeClass('sticky');
        }
    });


    // resize
    $(window).resize(function () {
        if(window.innerWidth >= 1200){
            $dimm.removeClass('on');
            $header.removeClass('active');
            $body.removeClass('on');
            $('.gnb .dep1').removeClass('active');
            $dep2Wrap.removeAttr('style');
        } else {
            $innerHeaderWrap.removeAttr('style');
            $dep2Wrap.removeAttr('style');
        }
    });

    /* ===== Mobile GNB ===== */
    function mobGnb(){
        function reset(){
            $header.removeClass('active');
            $body.removeClass('on');
            $gnbWrap.removeClass('open');
            $dimm.removeClass('on');
            $headerUtil.removeClass('on');
            $menuBtn.removeClass('off');
        }

        $menuBtn.on('click', function(){
            if(!$(this).hasClass('off')){
                $menuBtn.addClass('off');
                $body.addClass('on');
                $header.addClass('active');
                $gnbWrap.addClass('open');
                $headerUtil.addClass('on');
                $dimm.addClass('on');
            } else {
                reset();
            }
        });

        $('.gnb-close, .dimm').on('click', reset);

        $dep1A.on('click', function (e) {
            if(window.innerWidth < 1024){
                let $thisLi = $(this).parent('.dep1');
                let $currentDep2 = $thisLi.find('.dep2-wrap');

                if($currentDep2.length > 0) e.preventDefault();

                $thisLi.siblings().removeClass('active').find('.dep2-wrap').stop().slideUp();

                if(!$thisLi.hasClass('active')){
                    $thisLi.addClass('active');
                    $currentDep2.stop().slideDown();
                } else {
                    $thisLi.removeClass('active');
                    $currentDep2.stop().slideUp();
                }
            }
        });

        $dep2A.on('click', function (e) {
            if(window.innerWidth < 1200){
                let $currentDep3 = $(this).siblings('.dep3');
                if($currentDep3.length > 0){
                    e.preventDefault();
                    if($(this).hasClass('on')){
                        $(this).removeClass('on');
                        $currentDep3.stop().slideUp();
                    } else {
                        $('.gnb .dep3').stop().slideUp();
                        $dep2A.removeClass('on');
                        $(this).addClass('on');
                        $currentDep3.stop().slideDown();
                    }
                }
            }
        });
    }

    /* ===== Web GNB ===== */
    function webGnb() {
        $('.gnb>li:nth-child(2)').addClass('bg-h');

        $dep1A.on({
            mouseenter : function (e) {
                if(window.innerWidth >= 1200){
                    let bgH = $('.dep1.bg-h .dep2-wrap').outerHeight();
                    let headerH = bgH + 119;
                    let thisdep2Wrap = $(this).siblings('.dep2-wrap');

                    $header.addClass('on');
                    $dimm.addClass('on');
                    $dep2Wrap.css('height',bgH).removeClass('on');
                    $dep1A.removeClass('active');
                    $(this).addClass('active');

                    if(thisdep2Wrap.length > 0){
                        e.preventDefault();
                        $innerHeaderWrap.css('height',headerH);
                        $dimm.addClass('on');
                        thisdep2Wrap.addClass('on');
                    }
                }
            },
            focusin : function (e) {
                if(window.innerWidth >= 1200){
                    let bgH = $('.dep1.bg-h .dep2-wrap').outerHeight();
                    let headerH = bgH + 119;
                    let thisdep2Wrap = $(this).siblings('.dep2-wrap');

                    $header.addClass('on');
                    $dep2Wrap.css('height',bgH).removeClass('on');
                    $dep1A.removeClass('active');
                    $(this).addClass('active');

                    if(thisdep2Wrap.length > 0){
                        e.preventDefault();
                        $innerHeaderWrap.css('height',headerH);
                        $dimm.addClass('on');
                        thisdep2Wrap.addClass('on');
                    } else {
                        $innerHeaderWrap.css('height',headerH);
                        $dimm.removeClass('on');
                    }
                }
            }
        });

        $headerLogo.on('keydown',function (e) {
            let keyCode = e.keyCode || e.which;
            if(keyCode === 9 && e.shiftKey){
                $gnb.children('li').removeClass('active');
                $innerHeaderWrap.removeAttr('style');
                $dimm.removeClass('on');
                $header.removeClass('on');
                $dep1A.removeClass('active');
                $dep2Wrap.removeClass('on');
                $('.dep2 li').removeClass('active');
            }
        });

        $dep2A.on('mouseenter', function () {
            if(window.innerWidth>=1200){
                $(this).parent('li').addClass('active').siblings().removeClass('active');
            }
        });

        $dep2Wrap.on('mouseenter', function () {
            if(window.innerWidth>=1200){
                $dep2Wrap.removeClass('on');
                $dep1A.removeClass('active');
                $(this).addClass('on').parent().children('a').addClass('active');
            }
        });

        $innerHeaderWrap.on('mouseleave',function () {
            if(window.innerWidth >= 1200){
                $gnb.children('li').removeClass('active');
                $innerHeaderWrap.removeAttr('style');
                $dimm.removeClass('on');
                $header.removeClass('on');
                $dep1A.removeClass('active');
                $dep2Wrap.removeClass('on');
                $('.dep2 li').removeClass('active');
            }
        });
    }

    /* ===== Top Button ===== */
    $topBtn.on('click', function(e){
        e.preventDefault();
        $('html,body').animate({scrollTop:0},500);
    });

    $(document).mouseup(function (e){
        if($popup.has(e.target).length === 0){
            $popup.hide();
        }
    });

    /* ===== Popup ===== */
    $popupClose.on('click',function () {
        $popup.fadeOut();
        popupAniOpen();
    });

    $popupClose.on('keydown',function (e) {
        let keyCode = e.keyCode || e.which;
        if(keyCode === 9 && !e.shiftKey){
            e.preventDefault();
            $('.popup-wrap .swiper-button-prev').focus();
        } else if(keyCode === 13){
            e.preventDefault();
            $popup.hide();
            $('body').removeClass('on');
            if($popup.hasClass('on')){
                $btnPopup.attr('tabindex','0').focus();
            }
        }
    });

    $btnPopup.on('click',function () {
        $popup.fadeIn();
        popupAniClose();
    });

    function popupAniClose() {
        if(window.innerWidth < 1023) {
            $btnPopup.animate({'right': '-50%'},300);
        } else {
            $btnPopup.animate({'top': '-50%'},300);
        }
    }

    function popupAniOpen() {
        if(window.innerWidth < 1023) {
            $btnPopup.animate({'right': '0'},300);
        } else {
            $btnPopup.animate({'top': '0'},300);
        }
    }

    let popupSlide = new Swiper('.popup-slider', {
        speed: 600,
        slidesPerView: 1,
        observer: true,
        observeParents: true,
        simulateTouch: true,
        autoplay: { delay: 7000 },
        watchOverflow : true,
        pagination: { el: '.popup-wrap .swiper-pagination', type: 'fraction' },
        navigation: { nextEl: '.popup-wrap .swiper-button-next', prevEl: '.popup-wrap .swiper-button-prev' }
    });

    /* ===== Quick Menu ===== */
    $('.quick .btn-open').on('click', function(){
        $(this).closest('.quick').toggleClass('open');
    });
});
