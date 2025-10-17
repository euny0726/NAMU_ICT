$(document).ready(function(){
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);


    function setupFadeUpAnimations() {
        document.querySelectorAll("[data-gsap='fade-up']").forEach(el => {
            gsap.from(el, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }
    setupFadeUpAnimations();

    // visual-swiper
    let mainVisualList = $('.visual-swiper .swiper-slide').length;
    let mainVisualSlide = new Swiper(".visual-swiper .swiper-container", {
        loop: true,
        effect: 'fade',
        speed: 600,
        slidesPerView: 1,
        spaceBetween: 20,
        observer: true,
        observeParents: true,
        simulateTouch: true,
        watchOverflow: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".visual-swiper .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return `
                <span class="${className}">
                  <svg viewBox="0 0 36 36">
                    <circle class="bg" cx="18" cy="18" r="16"/>
                    <circle class="progress" cx="18" cy="18" r="16"/>
                  </svg>
                </span>`;
            },
        },
        on: {
            init: function () {
                mainVisualAnimateText(this.realIndex);
            },
            slideChange: function () {
                mainVisualAnimateText(this.realIndex);
            }
        }
    });

    // visual-slide-txt func
    function mainVisualAnimateText(index) {
        document.querySelectorAll(".swiper-txt-item").forEach((el, i) => {
            el.style.display = (i === index) ? "block" : "none";
        });

        let currentTxt = document.querySelector(`.swiper-txt-item:nth-child(${index + 1}) h2`);
        if (!currentTxt) return;

        let em = currentTxt.querySelector("em");
        let span = currentTxt.querySelector("span");

        gsap.set([em, span], {opacity: 0, x: 0, y: 0});

        let mainVisualTimeline = gsap.timeline({id: "mainVisualTimeline"});
        mainVisualTimeline
            .fromTo(em, {opacity: 0, x: -20}, {opacity: 1, x: 0, duration: 0.6, ease: "power2.out"})
            .fromTo(span, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.6, ease: "power2.out"}, "-=0.2");
    }

    // visual play/stop
    $('.main-visual .play-stop>button').on('click', function () {
        $('.main-visual .play-stop>button').addClass('on');
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
        }
        if ($('.stop').hasClass('on')) {
            mainVisualSlide.autoplay.start();
            $('.visual-swiper').removeClass('paused');
        }
        if ($('.play').hasClass('on')) {
            mainVisualSlide.autoplay.stop();
            $('.visual-swiper').addClass('paused');
        }
    });



    // computing-swiper
    var computingSwiper;

    function initComputingSwiper() {
        computingSwiper = new Swiper('.computing-swiper .swiper-container', {
            spaceBetween: 10,
            slidesPerView: 4,
            observer: true,
            observeParents: true,
            breakpoints: {
                599: {
                    slidesPerView: 1.3,
                    spaceBetween: 10
                },
                899: {
                    slidesPerView: 2.5,
                    spaceBetween: 10
                },
                999: {
                    slidesPerView: 3.5,
                    spaceBetween: 10
                }
            }
        });
    }

    function checkComputingSize() {
        if ($('.computing-swiper .swiper-container').length > 0) {
            if ($(window).width() >= 1200) {
                if (computingSwiper) {
                    computingSwiper.destroy(true, true);
                    computingSwiper = null;
                }
            } else {
                if (!computingSwiper) {
                    initComputingSwiper();
                }
            }
        }
    }

    checkComputingSize();

    $(window).resize(function() {
        checkComputingSize();
    });


    // computing card
    gsap.matchMedia().add("(min-width: 1200px)", () => {
        const cards = document.querySelectorAll(".card");
        const list = document.querySelector(".computing-list");

        const setCardPositions = () => {
            const total = cards.length;
            const center = (total - 1) / 2;
            const listWidth = list.offsetWidth;
            const slot = listWidth / total;

            cards.forEach((card, i) => {
                gsap.set(card, { x: (i - center) * slot, rotation: 0 });
            });
        };

        gsap.set(cards, {
            xPercent: -50,
            left: "50%",
            rotation: 0
        });

        let tl = gsap.timeline({ paused: true });

        tl.to(cards[1], { rotation: 8, duration: 0.3, ease: "power1.in", immediateRender: false }, 0)
            .to(cards[2], { rotation: 16, duration: 0.3, ease: "power1.in", immediateRender: false }, 0.1)
            .to(cards[3], { rotation: 24, duration: 0.3, ease: "power1.in", immediateRender: false }, 0.2)
            .to(cards, {
                rotation: 0,
                x: (i) => {
                    let total = cards.length;
                    let center = (total - 1) / 2;
                    let listWidth = list.offsetWidth;
                    let slot = listWidth / total;
                    return (i - center) * slot;
                },
                duration: 1,
                ease: "power2.out",
                immediateRender: false
            });

        ScrollTrigger.create({
            trigger: ".computing-list",
            start: "top 70%",
            once: true,
            onEnter: () => tl.play(0)
        });

        window.addEventListener("resize", () => {
            setCardPositions();
        });
    });

//  notice
    const tabs = document.querySelectorAll('.board-box-tab > li');
    const tabWrap = document.querySelector('.board-box-tab');
    const boards = document.querySelectorAll('.board-list-box .board-cont');

    tabs.forEach((li, i) => {
        li.querySelector('button').addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('on'));
            li.classList.add('on');
            tabWrap.classList.toggle('on-left', i === 0);
            tabWrap.classList.toggle('on-right', i === 1);

            tabs.forEach(t => t.querySelector('button').removeAttribute('aria-label'));
            const btn = li.querySelector('button');
            btn.setAttribute('aria-label', btn.textContent + ' 선택됨');

            boards.forEach((b, idx) => {
                if (idx === i) {
                    b.style.position = 'absolute';
                    b.style.zIndex = 1;
                    const yValue = window.innerWidth >= 1024 ? 50 : 25;
                    gsap.to(b, {
                        duration: 1,
                        y: yValue,
                        ease: "cubic-bezier(0.68, -0.6, 0.32, 1.6)"
                    });
                } else {
                    b.style.position = 'relative';
                    b.style.zIndex = 0;
                    gsap.to(b, {
                        duration: 1,
                        y: 0,
                        ease: "cubic-bezier(0.68, -0.6, 0.32, 1.6)"
                    });
                }
            });
        });
    });

    // AI
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
        const items = gsap.utils.toArray(".main-ai-list > li");
        let queue = [];
        let isAnimating = false;

        const runNext = () => {
            if (isAnimating || queue.length === 0) return;

            const { item, targets } = queue.shift();
            isAnimating = true;
            item.classList.add("active");

            const targetHeight = window.innerWidth >= 1200 ? "60rem" : "60rem";

            const tl = gsap.timeline({
                onComplete: () => {
                    isAnimating = false;
                    runNext();
                    ScrollTrigger.refresh();
                }
            });

            tl.to(item, { duration: 0.4, height: targetHeight, ease: "power3.out" })
                .to(window, {
                    duration: 0.6,
                    ease: "power3.inOut",
                    scrollTo: {
                        y: () => {
                            const itemTop = item.getBoundingClientRect().top + window.scrollY;
                            return itemTop - window.innerHeight * 0.4 + item.offsetHeight / 2;
                        },
                        autoKill: false
                    }
                })
                .fromTo(
                    targets,
                    { autoAlpha: 0, y: 30 },
                    { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
                    "-=0.2"
                );
        };

        items.forEach((item) => {
            const targets = item.querySelectorAll(
                ".ai-more, h3 em, h3 span, .ai-cont-box, .ai-cont-box .before-el, .ai-devel-list > li"
            );

            let activated = false;
            let initialCheckDone = false;

            ScrollTrigger.create({
                trigger: item,
                start: "top 30%",
                onEnter: () => {
                    if (activated) return;

                    if (!initialCheckDone) {
                        initialCheckDone = true;
                        const triggerTop = item.getBoundingClientRect().top + window.scrollY;
                        if (window.scrollY > triggerTop) {
                            return;
                        }
                    }
                    activated = true;
                    queue.push({ item, targets });
                    runNext();
                }
            });
        });
    });

    // main-tit-box ani
    document.querySelectorAll(".main-tit-box").forEach((box) => {
        const label = box.querySelector(".main-label");
        const p = box.querySelector("p");
        const h2 = box.querySelector("h2");
        if (!label || !p || !h2) return;

        gsap.set([label, p, h2], {opacity: 0, y: 30, scale: 1});

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: box,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            defaults: {ease: "power3.out"},
        });

        tl.to(label, {opacity: 1, y: 0, duration: 0.8})
            .to(p, {opacity: 1, y: 0, duration: 0.8}, "-=0.4")
            .fromTo(
                h2,
                {opacity: 0, y: 20, scale: 1.05},
                {opacity: 1, y: 0, scale: 1, duration: 1, ease: "power4.out"},
                "-=0.5"
            );
    });


});