// ============================================================
//  FLY-TO-CART  — анимация полёта миниатюры товара в корзину
// ============================================================

function flyToCart(productCard) {
    const cartIcon = document.querySelector('.cart-header__icon');
    if (!cartIcon) return;

    const productImg = productCard.querySelector('.item-product__image img');
    if (!productImg) return;

    const imgRect = productImg.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    // Создаём летящий клон-миниатюру
    const fly = document.createElement('img');
    fly.src = productImg.src;

    Object.assign(fly.style, {
        position: 'fixed',
        zIndex: '9999',
        borderRadius: '8px',
        objectFit: 'cover',
        pointerEvents: 'none',
        width: imgRect.width + 'px',
        height: imgRect.height + 'px',
        top: imgRect.top + 'px',
        left: imgRect.left + 'px',
        margin: '0',
        transition: 'none',
        opacity: '1',
    });

    document.body.appendChild(fly);

    // Запускаем анимацию на следующем кадре
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const targetX = cartRect.left + cartRect.width / 2;
            const targetY = cartRect.top + cartRect.height / 2;

            Object.assign(fly.style, {
                transition: 'all 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                width: '40px',
                height: '40px',
                top: (targetY - 20) + 'px',
                left: (targetX - 20) + 'px',
                opacity: '0.3',
                borderRadius: '50%',
            });
        });
    });

    fly.addEventListener('transitionend', (e) => {
        if (e.propertyName !== 'width') return; // срабатывает только один раз
        fly.remove();
        bumpCart();
        
    });
}

// Анимация «прыжка» иконки корзины
function bumpCart() {
    const cartIcon = document.querySelector('.cart-header__icon');
    if (!cartIcon) return;
    cartIcon.classList.add('cart--bump');
    cartIcon.addEventListener('animationend', () => {
        cartIcon.classList.remove('cart--bump');
    }, { once: true });
}

