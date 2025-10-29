$(document).ready(function () {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

    function setupFadeUpAnimations() {
        document.querySelectorAll("[data-gsap='fade-up']").forEach(el => {
            gsap.fromTo(el,
                {opacity: 0, y: 50},
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        once: true
                    }
                }
            );
        });
    }
    setupFadeUpAnimations();

    document.querySelectorAll(".sub-container").forEach(container => {

        const introTop = container.querySelector(".sub-top");
        if(introTop) {
            const introTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: introTop,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            const subTitTop = introTop.querySelector(".sub-tit-top");
            const h2 = introTop.querySelector("h2");

            if(subTitTop) {
                introTimeline.from(subTitTop, {
                    opacity: 0,
                    filter: "blur(6px)",
                    y: 20,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }

            if(h2) {
                introTimeline.from(h2, {
                    opacity: 0,
                    filter: "blur(6px)",
                    y: 10,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.4");
            }
        }

        container.querySelectorAll(".sub-title-box").forEach(box => {
            const subTitle = box.querySelector(".sub-title");
            const subInfo = box.querySelector(".sub-title-info");

            gsap.timeline({
                scrollTrigger: {
                    trigger: box,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            })
                .from(subTitle, { x: -40, opacity: 0, duration: 0.8, ease: "power3.out" })
                .from(subInfo, { opacity: 0, filter: "blur(2px)", duration: 0.8, ease: "power2.out" }, "-=0.4");
        });

    });


    //breadcrumbs
    const $breadcrumbs = $('.breadcrumbs'),
        $breadcrumbButton = $('.breadcrumbs>button'),
        $breadcrumbUl = $('.breadcrumbs>ul'),
        $dimm = $('.dimm'),
        $main = $('#main'),
        $body = $('body');

    function breadcrumbClose(){
        $breadcrumbButton.removeClass('on');
        $breadcrumbUl.stop().slideUp(100);
        // $dimm.removeClass('on');
    }

    $breadcrumbButton.on('click',function () {
        $breadcrumbUl.stop().slideUp();
        if(!$(this).hasClass('on')){
            $(this).addClass('on').siblings().removeClass('on');
            $(this).siblings().stop().slideDown(100);
            // if(window.innerWidth < 1024){
            //     $dimm.addClass('on');
            //     $body.addClass('on')
            // }
        } else {
            $(this).removeClass('on').siblings().removeClass('active');
            $(this).siblings().stop().slideUp(100);

            // if(window.innerWidth < 1024){
            //     $dimm.removeClass('on');
            //     $body.removeClass('on');
            // }
        }
    });

    if(window.innerWidth > 1024){
        $breadcrumbs.on('mouseleave',function () {
            breadcrumbClose();
        });
    }

    if(window.innerWidth < 1024){
        $dimm.on('click', function () {
            breadcrumbClose();
        });
    }

    $('.breadcrumbs:last-of-type>ul>li:last-of-type>a').on('focusout',function () {
        breadcrumbClose();
    });

    function stickyBody() {
        let locat = $(window).scrollTop();
        if ($main.hasClass('sub-container')) {
            if (window.innerWidth >= 1024) {
                if (locat > 372) {
                    $body.addClass('fix');
                } else {
                    $body.removeClass('fix');
                }
            } else {
                if (window.innerWidth > 768) {
                    if (locat > 102) {
                        $body.addClass('fix');
                    } else {
                        $body.removeClass('fix');
                    }
                } else {
                    if (locat > 50) {
                        $body.addClass('fix');
                    } else {
                        $body.removeClass('fix');
                    }
                }
            }
        }
    }

    stickyBody();

    $(window).on('scroll', function () {
        stickyBody();
    });

    // tab
    $('.tab-nav>li').on('click keyup', function () {
        if (!$(this).children('a').hasClass('out-link')) {
            $(this).addClass('on').siblings().removeClass('on');

            let tabNum = $(this).index();
            const boxCon = $('.tab-content>li');

            boxCon.eq(tabNum).show().addClass('on').siblings().hide().removeClass('on');

            if ($('.navi-wrap').length > 0) {
                $('.navi-wrap>li:first-child').addClass('active').siblings().removeClass('active');
            }

            if ($(this).hasClass('slide-contents')) {
                slideReload();
            }
        }
    });


    // 스크롤 시 가로 스크롤 dimm
    const $tblWrap = $('.tbl-wrap'),
        $blurLeft =  $('.blur.left'),
        $blurRight = $('.blur.right');

    $tblWrap.on('scroll', function () {
        let cur = $(this).scrollLeft();
        if (cur === 0) {
            $blurRight.addClass('on');
            $blurLeft.removeClass('on');
        } else {
            let max = $(this)[0].scrollWidth - $(this).parent().width();
            if (cur === max) {
                $blurLeft.addClass('on');
                $blurRight.removeClass('on');
            } else {
                $blurLeft.addClass('on');
                $blurRight.addClass('on');
            }
        }
    });

    function tblScrollChk() {
        if($tblWrap.has('.min500')){
            if($tblWrap.width()>=500){
                $blurRight.removeClass('on');
            } else if ($tblWrap.width()<500){
                $blurRight.addClass('on');
            }
        } else if($tblWrap.has('.min600')) {
            if($tblWrap.width()>=600){
                $blurRight.removeClass('on');
            } else if ($tblWrap.width()<600){
                $blurRight.addClass('on');
            }
        } else if($tblWrap.has('.min700')){
            if($tblWrap.width()>=700){
                $blurRight.removeClass('on');
            } else if ($tblWrap.width()<700){
                $blurRight.addClass('on');
            }
        } else if($tblWrap.has('.min900')){
            if($tblWrap.width()>=900){
                $blurRight.removeClass('on');
            } else if ($tblWrap.width()<900){
                $blurRight.addClass('on');
            }
        }
    }
    tblScrollChk();

    $(window).resize(function () {
        tblScrollChk();
    });


    // 확대보기 버튼
    $('.btn-img-popup').on('click',function () {
        let getImg = $(this).siblings().attr("src");
        $('.bigimg-popup').find('img').attr("src", getImg);
        $('.bigimg-popup').show();
        $('.dimm').addClass('on');
        $('body').css('overflow','hidden');
    });

    $('.btn-close').on('click',function () {
        $('.bigimg-popup').hide();
        $('.dimm').removeClass('on');
        $('body').css('overflow','visible');
    });
});