

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
    }
}