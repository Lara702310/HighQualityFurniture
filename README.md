# 🪑 High-Quality Furniture

Учебный проект интернет-магазина мебели, созданный в процессе изучения веб-разработки.

## 🚀 Технологии

- **HTML5** — семантическая вёрстка
- **SCSS** — архитектура с разбивкой на компоненты, миксины, переменные, BEM
- **CSS3** — анимации, transitions, media queries
- **JavaScript** — обработка событий, споллеры, адаптивное меню
- **SVG-спрайты** — иконки через `<use href="icons-sprite.svg#name" />`
- **[Swiper](https://swiperjs.com/) v12.1.4** 



## 📁 Структура проекта

 project/
├── index.html
├── assets/
│   └── icons-sprite.svg
├── css/
│   └── style.css
├── scss/
│   ├── style.scss
│   ├── base/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── _reset.scss
│   └── components/
│       ├── _buttons.scss
│       ├── _forms.scss
│       ├── _icons.scss
│       ├── _menu.scss
│       └── _lists.scss
└── js/
    └── main.js



## ⚙️ SCSS архитектура

Проект использует модульную структуру SCSS:

- **`_variables.scss`** — цвета, брейкпоинты, типографика
- **`_mixins.scss`** — flex-утилиты (`flex-center`, `flex-between`...)
- **`_components/`** — стили отдельных UI-компонентов

Пример миксина:
  scss
@mixin flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}


## 🧩 Компоненты

- **Меню** — адаптивное с выпадающими подсписками
  - hover на десктопе (`any-hover: hover`)
  - `data-spoller` на мобильных
  - JS-класс `._hover` для тач-десктопов (планшеты >768px)
- **Форма поиска** — с SVG-иконкой и `focus-within`
- **Кнопки** — включая кнопку стрелки меню с анимацией поворота
- **Иконки** — через SVG-спрайт с модификаторами размера (`--sm`, `--md`, `--lg`, `--xl`)
- **Main slider** — implemented with Swiper (navigation arrows and pagination dots)

## 📱 Адаптивность

| Устройство | Поведение меню |
|---|---|
| Десктоп (мышь) | Открытие по `:hover` |
| Планшет (тач + >768px) | Открытие по клику через JS |
| Мобильный | Споллер через `data-spoller` |

## 📌 Статус

Проект в разработке — сейчас изучаю JavaScript.



> Проект создан в учебных целях для отработки навыков вёрстки и написания чистого, структурированного кода.