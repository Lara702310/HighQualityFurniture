
const isMobile = {
    Android: () => navigator.userAgent.match(/Android/i),
    BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
    iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
    Opera: () => navigator.userAgent.match(/Opera Mini/i),
    Windows: () => navigator.userAgent.match(/IEMobile/i),
    any: () => (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
    )
};



window.onload = function () {
    document.addEventListener("click", documentActions);

    function documentActions(e) {
        const targetElement = e.target;

        // тач-десктоп: шире 768px И тач-устройство
        if (window.innerWidth > 768 && isMobile.any()) {

            // клик на кнопку стрелки
            const arrowBtn = targetElement.closest('.btn--menu-arrow-down');
            if (arrowBtn) {
                arrowBtn.closest('.menu__item').classList.toggle('_hover');
            }

            // клик вне меню — убираем все ._hover
            if (!targetElement.closest('.menu__item')) {
                document.querySelectorAll('.menu__item._hover')
                    .forEach(el => el.classList.remove('_hover'));
            }
        }
        if (targetElement.closest('.search-form__icon')) {
            document.querySelector('.search-form').classList.toggle('_active');
        }
        // header menu-burger // =======
        // клик на menu-burger
        if (targetElement.closest('.icon-menu--burger')) {
            targetElement.closest('.icon-menu--burger').classList.toggle('_active');

            //  выезжает  sub-list    при клике   menu-burger
            document.querySelector('.menu__body').classList.toggle('_active');
        }
    }
}

// !spollers //

// Находит все группы [data-spollers] на странице и инициализирует их.
// Если у группы задан media-запрос — подключает/отключает логику при resize.
function initSpollers() {
    document.querySelectorAll('[data-spollers]').forEach(group => {
        const attr = group.dataset.spollers.trim();
        const oneOpen = group.hasAttribute('data-one-spoller');

        if (attr) {
            const mq = window.matchMedia(attr);
            const handler = () => mq.matches ? bindGroup(group, oneOpen) : unbindGroup(group);
            handler();
            mq.addEventListener('change', handler);
        } else {
            bindGroup(group, oneOpen);
        }
    });
}

// Находит тело спойлера (menu__sub-list) по родительскому <li>.
// Если родитель не найден — берёт следующий элемент после кнопки.
function getBody(btn) {
    const parent = btn.closest('li');
    return parent ? parent.querySelector('.menu__sub-list') : btn.nextElementSibling;
}


// Вешает обработчик клика на каждую кнопку [data-spoller] внутри группы.
// Если oneOpen=true — перед открытием закрывает все остальные спойлеры группы.
function bindGroup(group, oneOpen) {
    group.querySelectorAll('[data-spoller]').forEach(btn => {
        if (btn._spollersHandler) return;

        btn._spollersHandler = () => {
            const isOpen = btn.classList.contains('_spoller-active'); // ← исправлено
            if (oneOpen) closeAll(group);
            isOpen ? close(btn) : open(btn);
        };

        btn.addEventListener('click', btn._spollersHandler);
    });
}


// Снимает обработчики клика со всех кнопок группы и раскрывает все спойлеры.
// Вызывается когда media-запрос перестаёт совпадать (например, переход на десктоп).
function unbindGroup(group) {
    group.querySelectorAll('[data-spoller]').forEach(btn => {
        if (btn._spollersHandler) {
            btn.removeEventListener('click', btn._spollersHandler);
            btn._spollersHandler = null;
        }

        // Убираем активный класс со стрелки и сбрасываем inline-стили с тела
        btn.classList.remove('_spoller-active');
        const body = getBody(btn);
        if (body) body.removeAttribute('style');
    });
}


// Открывает тело спойлера: добавляет класс _spoller-active на кнопку,
// раскрывает список через max-height и восстанавливает padding.
// silent=true — открывает мгновенно без анимации (при resize).
function open(btn, silent = false) {
    const body = getBody(btn);
    if (!body) return;

    btn.classList.add('_spoller-active');

    if (silent) {
        body.removeAttribute('style');
    } else {
        body.style.overflowY = 'hidden';        // во время анимации — hidden
        body.style.maxHeight = '100px';
        body.style.paddingTop = '1.5rem';
        body.style.paddingBottom = '1.5rem';

        // после окончания анимации — включаем скролл
        body.addEventListener('transitionend', () => {
            if (btn.classList.contains('_spoller-active')) {
                body.style.overflowY = 'auto';
            }
        }, { once: true }); // once: true — сработает только один раз
    }
}

// Закрывает тело спойлера: убирает класс _spoller-active с кнопки,
// схлопывает список через max-height: 0 и обнуляет padding.
function close(btn) {
    const body = getBody(btn);
    if (!body) return;

    btn.classList.remove('_spoller-active');
    body.style.overflowY = 'hidden';
    body.style.maxHeight = '0';
    body.style.paddingTop = '0';
    body.style.paddingBottom = '0';
}

// Закрывает все спойлеры внутри группы.
// Используется когда oneOpen=true — чтобы открыть только один.
function closeAll(group) {
    group.querySelectorAll('[data-spoller]').forEach(close);
}

document.addEventListener('DOMContentLoaded', initSpollers);

// Добавляет стрелки в заголовки футера:  menu-footer__title //============================
function initFooterArrows() {
    document.querySelectorAll('.menu-footer [data-spoller]').forEach(btn => {
        if (!btn.querySelector('.btn--menu-arrow-down')) {
            btn.insertAdjacentHTML('beforeend', `
                <span class="btn--menu-arrow-down"></span>
            `);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initFooterArrows();
    initSpollers();
});

//! стили для картинок с классом .ibg =======

function ibg() {

    let ibg = document.querySelectorAll("._ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

ibg();


// Swiper  ///  slider ////=================

const swiper = new Swiper('._swiper', {
    observer: true,
    observerParents: true,
    slidesPerView: 1,
    watchOverflow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlide: 5,
    preloadImages: false,
    initialSlide: 0,
    
    spaceBetween: 20,
    navigation: {
        nextEl: '.slider-arrow--next',
        prevEl: '.slider-arrow--prev',
    },
    pagination: {
        el: '.controls-slider-main__dotts',
        clickable: true,
    },
});


//  Стилизациа  header во время скрола ===========
const headerElement = document.querySelector(".header");

const callback = function (entries, observer) {
    if (entries[0].isIntersecting) { 
        headerElement.classList.remove("_scroll");
    } else {
        headerElement.classList.add("_scroll");
    }
}

const headerObserver = new IntersectionObserver(callback);
headerObserver.observe(headerElement);