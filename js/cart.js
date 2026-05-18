// ============================================================
//  CART — список товаров в выпадашке корзины
// ============================================================

const cart = []; // хранилище товаров в памяти

/**
 * Добавляет товар в корзину или увеличивает количество если уже есть.
 * @param {HTMLElement} productCard
 */
function addToCart(productCard) {
    const id = productCard.dataset.pid;
    const img = productCard.querySelector('.item-product__image img')?.src || '';
    const title = productCard.querySelector('.item-product__title')?.textContent.trim() || '';
    const price = productCard.querySelector('.item-product__price:not(.item-product__price--old)')?.textContent.trim() || '';

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, img, title, price, qty: 1 });
    }

    if (typeof flyToCart === 'function') flyToCart(productCard);

    renderCart();
    updateCartCount();
}

/**
 * Удаляет товар из корзины по id.
 */
function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) cart.splice(index, 1);
    renderCart();
    updateCartCount();
}

/**
 * Перерисовывает список товаров в выпадашке.
 */
function renderCart() {
    const list = document.querySelector('.cart-header__list');
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = `<li class="cart-empty">Корзина пуста</li>`;
        return;
    }

    list.innerHTML = cart.map(item => `
        <li class="cart-item" data-id="${item.id}">
            <img class="cart-item__img" src="${item.img}" alt="${item.title}">
            <div class="cart-item__info">
                <span class="cart-item__title">${item.title}</span>
                <span class="cart-item__price">
                    <span class="cart-item__qty">${item.qty}</span> x
                    <span class="cart-item__price-val">${item.price}</span>
                </span>
            </div>
            <button class="cart-item__remove" data-id="${item.id}" title="Удалить">&#x2715;</button>
        </li>
    `).join('');

    // Кнопки удаления
    list.querySelectorAll('.cart-item__remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFromCart(btn.dataset.id);
        });
    });
}

/**
 * Обновляет счётчик на иконке корзины.
 */
function updateCartCount() {
    const badge = document.querySelector('.cart-header__icon span');
    if (!badge) return;
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = total;
}

/**
 * Открывает / закрывает выпадашку корзины.
 */
function toggleCart(e) {
    e.preventDefault();
    const cartWrapper = document.querySelector('.cart-header');
    cartWrapper.classList.toggle('cart-header--open');
}

// ============================================================
//  Инициализация
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    // Открытие/закрытие по клику на иконку
    const cartIcon = document.querySelector('.cart-header__icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', toggleCart);
    }

    // Закрытие при клике вне корзины
    document.addEventListener('click', (e) => {
        const cartHeader = document.querySelector('.cart-header');
        if (cartHeader && !cartHeader.contains(e.target)) {
            cartHeader.classList.remove('cart-header--open');
        }
    });

    // Добавление товара — делегирование на весь документ (работает и для динамических карточек)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.actions-product__button');
        if (!btn) return;
        e.preventDefault();
        const card = btn.closest('.item-product');
        if (card) addToCart(card);
    });

    renderCart(); // начальный рендер (пустая корзина)
});

// Экспортируем addToCart для fly-to-cart.js
window.addToCart = addToCart;