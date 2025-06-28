// Основные переменные
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateCartCount();
    setupEventListeners();
});

// Инициализация приложения
function initializeApp() {
    // Проверяем текущую страницу и выполняем соответствующие действия
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initializeHomePage();
            break;
        case 'profile.html':
            initializeProfilePage();
            break;
        case 'cart.html':
            initializeCartPage();
            break;
    }
}

// Инициализация главной страницы
function initializeHomePage() {
    // Плавная анимация при скролле
    setupScrollAnimations();
    
    // Анимация героического блока
    animateHeroSection();
    
    // Загрузка туров
    if (typeof loadTours === 'function') {
        loadTours();
    }
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Мобильное меню
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Модальное окно
    const modal = document.getElementById('tour-modal');
    const closeModal = document.getElementById('close-modal');
    
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.classList.add('hidden');
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    // Поиск туров
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

    // Фильтры
    const destinationFilter = document.getElementById('destination-filter');
    const priceFrom = document.getElementById('price-from');
    const priceTo = document.getElementById('price-to');
    
    if (destinationFilter) {
        destinationFilter.addEventListener('change', handleSearch);
    }
    if (priceFrom) {
        priceFrom.addEventListener('input', debounce(handleSearch, 500));
    }
    if (priceTo) {
        priceTo.addEventListener('input', debounce(handleSearch, 500));
    }

    // Кнопка "Найти тур" в героическом блоке
    const heroBtn = document.querySelector('.hero-section button');
    if (heroBtn) {
        heroBtn.addEventListener('click', function() {
            document.querySelector('#tours-grid').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
}

// Анимации при скролле
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами, которые нужно анимировать
    const elementsToAnimate = document.querySelectorAll('.tour-card, .testimonial-card, .section');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Анимация героического блока
function animateHeroSection() {
    const heroElements = document.querySelectorAll('.hero-section .animate-fade-in, .hero-section .animate-fade-in-delay, .hero-section .animate-fade-in-delay-2');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Обработка поиска туров
function handleSearch() {
    const destination = document.getElementById('destination-filter')?.value || '';
    const priceFrom = parseInt(document.getElementById('price-from')?.value) || 0;
    const priceTo = parseInt(document.getElementById('price-to')?.value) || Infinity;
    
    if (typeof filterTours === 'function') {
        filterTours(destination, priceFrom, priceTo);
    }
}

// Debounce функция для оптимизации поиска
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Работа с корзиной
function addToCart(tourId) {
    const tour = tours.find(t => t.id === tourId);
    if (!tour) return;

    const existingItem = cart.find(item => item.id === tourId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...tour,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification(`Тур "${tour.name}" добавлен в корзину!`, 'success');
}

function removeFromCart(tourId) {
    cart = cart.filter(item => item.id !== tourId);
    saveCart();
    updateCartCount();
    
    if (typeof renderCartItems === 'function') {
        renderCartItems();
    }
}

function updateQuantity(tourId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(tourId);
        return;
    }
    
    const item = cart.find(item => item.id === tourId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartCount();
        
        if (typeof renderCartItems === 'function') {
            renderCartItems();
        }
    }
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    
    if (typeof renderCartItems === 'function') {
        renderCartItems();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        if (totalItems > 0) {
            cartCount.classList.add('pulse');
        } else {
            cartCount.classList.remove('pulse');
        }
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Работа с пользователем
function loginUser(userData) {
    currentUser = userData;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showNotification('Добро пожаловать!', 'success');
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showNotification('Вы вышли из аккаунта', 'success');
    
    if (window.location.pathname.includes('profile.html')) {
        window.location.href = 'index.html';
    }
}

// Система уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type === 'success' ? 'success-message' : 'error-message'}`;
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Утилиты
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(price);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Инициализация страницы профиля
function initializeProfilePage() {
    if (!currentUser) {
        // Создаем демо-пользователя для показа
        currentUser = {
            id: 1,
            name: 'Анна Петрова',
            email: 'anna@example.com',
            phone: '+7 (999) 123-45-67',
            avatar: 'А',
            memberSince: '2023-01-15',
            preferences: {
                notifications: true,
                newsletter: true,
                smsAlerts: false
            }
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    setupProfileTabs();
    renderProfileInfo();
    renderBookingHistory();
    renderFavorites();
}

// Настройка табов профиля
function setupProfileTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Убираем активный класс у всех табов
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Добавляем активный класс к выбранному табу
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Инициализация страницы корзины
function initializeCartPage() {
    if (typeof renderCartItems === 'function') {
        renderCartItems();
    }
    setupCheckoutForm();
}

// Настройка формы оформления заказа
function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
}

function handleCheckout(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        showNotification('Корзина пуста!', 'error');
        return;
    }
    
    // Имитация обработки заказа
    showNotification('Обрабатываем ваш заказ...', 'info');
    
    setTimeout(() => {
        const orderNumber = generateOrderNumber();
        showNotification(`Заказ №${orderNumber} успешно оформлен! Наш менеджер свяжется с вами в течение часа.`, 'success');
        
        // Сохраняем заказ в историю
        saveOrder(orderNumber);
        
        // Очищаем корзину
        clearCart();
        
        // Перенаправляем на страницу профиля
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 3000);
    }, 2000);
}

function generateOrderNumber() {
    return Date.now().toString().slice(-6);
}

function saveOrder(orderNumber) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
        id: orderNumber,
        items: [...cart],
        total: getCartTotal(),
        status: 'processing',
        date: new Date().toISOString(),
        customer: currentUser || { name: 'Гость' }
    };
    
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Экспорт функций для использования в других файлах
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.showNotification = showNotification;
window.formatPrice = formatPrice;
window.formatDate = formatDate;
