$(document).ready(function () {

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



    // const $tblWrap = document.querySelector('.tbl-wrap'),
    //     $blurTop = document.querySelector('.blur.left'),
    //     $blurBottom = document.querySelector('.blur.right');
    //
    // window.onload = function() {
    //     if($tblWrap){
    //         $tblWrap.addEventListener('scroll', () => {
    //             if ($tblWrap.offsetWidth + $tblWrap.scrollLeft + 20 >= $tblWrap.scrollWidth) {
    //                 $blurBottom.classList.remove('on');
    //                 $blurTop.classList.add('on');
    //             } else if ($tblWrap.offsetWidth + $tblWrap.scrollLeft < $tblWrap.scrollWidth) {
    //                 $blurTop.classList.add('on');
    //                 $blurBottom.classList.add('on');
    //             } else {
    //                 $blurBottom.classList.add('on');
    //             }
    //             if ($tblWrap.scrollLeft <= 10) {
    //                 $blurTop.classList.remove('on');
    //             }
    //         });
    //     }
    // };
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

    // 경기종목
    const $sportsItem = $('.sports-tab .item-list>li');
    let dataSession = sessionStorage.getItem('saveData');
    let $sportsTabView = $('.sports-tab-view>li'),
        $tableTabView = $('.table-tab-view>li'),
        $gameInfoWrap = $('.game-info-wrap');
        $tableTabViewWrap = $('.table-tab-view-warp');
    const $sportsWrap = $('.sports-wrap');


    if(sessionStorage.getItem('saveData')) {
        $sportsItem.eq(dataSession).addClass('active').siblings().removeClass('active');
        $sportsTabView.eq(dataSession).addClass('active').siblings().removeClass('active');
        $tableTabView.eq(dataSession).addClass('active').siblings().removeClass('active');
        $('html, body').animate({scrollTop: $sportsWrap.offset().top-150},800);
    }

    $sportsItem.on('click', function () {
        let $btnIdx = $(this).index();
        $gameInfoWrap.removeClass('active');
        void $gameInfoWrap[0].offsetWidth;
        $gameInfoWrap.addClass('active');

        $tableTabViewWrap.removeClass('active');
        void $tableTabViewWrap[0].offsetWidth;
        $tableTabViewWrap.addClass('active');

        $(this).addClass('active').siblings().removeClass('active');
        $sportsTabView.eq($btnIdx).addClass('active').siblings().removeClass('active');
        $tableTabView.eq($btnIdx).addClass('active').siblings().removeClass('active');

        $('html, body').animate({
            scrollTop: $sportsTabView.eq($btnIdx).offset().top - 150
        }, 500);
    });

    setTimeout(function () {
        sessionStorage.clear();
    }, 3000);



    // 경기장안내 추가 240806
    const $mapBtn = $('button.map-btn'),
        $popupMap = $('.popup-map-wrap'),
        $mapSelBtn = $('.map-sel-box button'),
        $mapSelBox = $('.map-sel-box'),
        $popupTitle = $('.map-text .title'),
        $popupAddress = $('.map-text .address span'),
        $popupClose = $('button.pop-map-close');

    $mapBtn.on('click', function() {
        const $btn = $(this);
        const title = $btn.text().trim();
        const $currentRow = $btn.closest('tr');
        const address = $currentRow.find('.address').text().trim();
        const sportsType = $btn.data('sports');
        $popupMap.show().addClass('open');
        $popupTitle.text(title);
        $popupAddress.text(address);
        $mapSelBtn.text(title);
        $mapSelBtn.removeClass('on');
        $('.stadium-map').removeAttr('style');
        updateMapSelBox(sportsType);
    });


    function updateMapSelBox(sportsType) {
        $mapSelBox.find('ul.stadium-map').empty();
        $('button.map-btn').each(function() {
            const $btn = $(this);
            if ($btn.data('sports') === sportsType) {
                const stadiumName = $btn.text().trim();
                const address = $btn.closest('tr').find('.address').text().trim();
                $mapSelBox.find('ul.stadium-map').append(`<li><a href="#lnk" data-map="${address}">${stadiumName}</a></li>`);
            }
        });
    }

    $('html').on('click',function (e) {
        if($(e.target).hasClass('popup-map-wrap')){
            $(e.target).hide().removeClass('open');
            $('body').removeClass('on');
        }
    });

    $popupClose.on('click',function () {
        $popupMap.hide().removeClass('open');
        $('body').removeClass('on');
    });

    $mapSelBtn.on('click',function () {
        if(!$(this).hasClass('on')){
            $(this).addClass('on');
            $(this).siblings('.stadium-map').stop().slideDown();
        } else {
            $(this).removeClass('on');
            $(this).siblings('.stadium-map').stop().slideUp();
        }
    });

    $(document).on('click', '.stadium-map>li', function () {
        let placeLi = $(this).parent().html();
        let elTarget = $(this).find('a').text();

        // if(window.innerWidth>=1024){
        if($popupMap.css('display') == 'none'){
            $mapSelBoxWrap.html(placeLi);
            $('.stadium-map').removeAttr('style');
        }
        $popupMap.show().addClass('open');
        $('.popup-map-wrap .map-sel-box>button').text(elTarget);
        // }


        $(this).addClass('active').siblings().removeClass('active');
        $mapSelBtn.removeClass('on');
        $(this).parent().stop().slideUp();
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