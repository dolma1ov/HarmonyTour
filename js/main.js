let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateCartCount();
    setupEventListeners();
});

function initializeApp() {
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

function initializeHomePage() {
    setupScrollAnimations();
    
    animateHeroSection();
    
    if (typeof loadTours === 'function') {
        loadTours();
    }
}

function setupEventListeners() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    const modal = document.getElementById('tour-modal');
    const closeModal = document.getElementById('close-modal');
    
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.classList.add('hidden');
            document.body.classList.remove('modal-open');
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.classList.remove('modal-open');
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
                document.body.classList.remove('modal-open');
            }
        });
    }

    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

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

    const heroBtn = document.querySelector('.hero-section button');
    if (heroBtn) {
        heroBtn.addEventListener('click', function() {
            document.querySelector('#tours-grid').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
}

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

    const elementsToAnimate = document.querySelectorAll('.tour-card, .testimonial-card, .section');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

function animateHeroSection() {
    const heroElements = document.querySelectorAll('.hero-section .animate-fade-in, .hero-section .animate-fade-in-delay, .hero-section .animate-fade-in-delay-2');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function handleSearch() {
    const destination = document.getElementById('destination-filter')?.value || '';
    const priceFrom = parseInt(document.getElementById('price-from')?.value) || 0;
    const priceTo = parseInt(document.getElementById('price-to')?.value) || Infinity;
    
    if (typeof filterTours === 'function') {
        filterTours(destination, priceFrom, priceTo);
    }
}

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

function addToCart(tourId) {
    const tour = window.tours.find(t => t.id === tourId);
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
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function loginUser(userData) {
    currentUser = userData;
    localStorage.setItem('currentUser', JSON.stringify(userData));
    showNotification('Вы успешно вошли в систему!', 'success');
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showNotification('Вы вышли из системы', 'info');
    
    if (window.location.pathname.includes('profile.html')) {
        window.location.href = 'index.html';
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${type === 'success' ? 'success-message' : type === 'error' ? 'error-message' : 'bg-blue-500 text-white'}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(price);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function initializeProfilePage() {
    if (!currentUser) {
        currentUser = {
            name: 'Александр Петров',
            email: 'alex@example.com',
            phone: '+7 (999) 123-45-67',
            registered: '2023-01-15',
            bookings: [],
            favorites: []
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    updateProfileDisplay();
    renderBookingHistory();
    renderFavorites();
    setupProfileTabs();
    setupProfileEvents();
}

function setupProfileTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

function setupProfileEvents() {
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const editModal = document.getElementById('edit-profile-modal');
    const closeEditModal = document.getElementById('close-edit-modal');
    const cancelEdit = document.getElementById('cancel-edit');
    const editForm = document.getElementById('edit-profile-form');
    
    if (editProfileBtn && editModal) {
        editProfileBtn.addEventListener('click', function() {
            fillEditForm();
            editModal.classList.remove('hidden');
        });
    }
    
    if (closeEditModal && editModal) {
        closeEditModal.addEventListener('click', function() {
            editModal.classList.add('hidden');
        });
    }
    
    if (cancelEdit && editModal) {
        cancelEdit.addEventListener('click', function() {
            editModal.classList.add('hidden');
        });
    }
    
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfileChanges();
            editModal.classList.add('hidden');
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
}

function updateProfileDisplay() {
    if (!currentUser) return;
    
    const avatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const displayName = document.getElementById('display-name');
    const displayEmail = document.getElementById('display-email');
    const displayPhone = document.getElementById('display-phone');
    const displayRegistered = document.getElementById('display-registered');
    
    if (avatar) avatar.textContent = currentUser.name.charAt(0);
    if (userName) userName.textContent = currentUser.name;
    if (userEmail) userEmail.textContent = currentUser.email;
    if (displayName) displayName.textContent = currentUser.name;
    if (displayEmail) displayEmail.textContent = currentUser.email;
    if (displayPhone) displayPhone.textContent = currentUser.phone;
    if (displayRegistered) displayRegistered.textContent = formatDate(currentUser.registered);
}

function fillEditForm() {
    if (!currentUser) return;
    
    const nameInput = document.getElementById('edit-name');
    const emailInput = document.getElementById('edit-email');
    const phoneInput = document.getElementById('edit-phone');
    
    if (nameInput) nameInput.value = currentUser.name;
    if (emailInput) emailInput.value = currentUser.email;
    if (phoneInput) phoneInput.value = currentUser.phone;
}

function saveProfileChanges() {
    const nameInput = document.getElementById('edit-name');
    const emailInput = document.getElementById('edit-email');
    const phoneInput = document.getElementById('edit-phone');
    
    if (nameInput && emailInput && phoneInput) {
        currentUser.name = nameInput.value;
        currentUser.email = emailInput.value;
        currentUser.phone = phoneInput.value;
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateProfileDisplay();
        showNotification('Профиль успешно обновлен!', 'success');
    }
}

function initializeCartPage() {
    if (typeof renderCartItems === 'function') {
        renderCartItems();
    }
    setupCheckoutForm();
    setupCheckoutModalEvents();
}

function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
}

function setupCheckoutModalEvents() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutModal = document.getElementById('close-checkout-modal');
    const cancelCheckout = document.getElementById('cancel-checkout');

    if (checkoutBtn && checkoutModal) {
        checkoutBtn.addEventListener('click', function() {
            checkoutModal.classList.remove('hidden');
            document.body.classList.add('modal-open');
        });
    }
    if (closeCheckoutModal && checkoutModal) {
        closeCheckoutModal.addEventListener('click', function() {
            checkoutModal.classList.add('hidden');
            document.body.classList.remove('modal-open');
        });
    }
    if (cancelCheckout && checkoutModal) {
        cancelCheckout.addEventListener('click', function() {
            checkoutModal.classList.add('hidden');
            document.body.classList.remove('modal-open');
        });
    }
    // Закрытие по клику вне окна
    if (checkoutModal) {
        checkoutModal.addEventListener('click', function(e) {
            if (e.target === checkoutModal) {
                checkoutModal.classList.add('hidden');
                document.body.classList.remove('modal-open');
            }
        });
    }
}

function saveOrder(orderNumber, orderData) {
    if (!currentUser) return;
    if (!currentUser.bookings) {
        currentUser.bookings = [];
    }
    // Добавить заказ в профиль пользователя
    currentUser.bookings.push(orderData);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    // Добавить заказ в глобальный массив orders
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({
        ...orderData,
        user: {
            name: currentUser.name,
            email: currentUser.email,
            phone: currentUser.phone
        }
    });
    localStorage.setItem('orders', JSON.stringify(orders));
}

function handleCheckout(e) {
    e.preventDefault();
    const orderNumber = generateOrderNumber();
    const orderData = {
        number: orderNumber,
        date: new Date().toISOString(),
        items: [...cart],
        total: getCartTotal(),
        customer: {
            name: document.getElementById('checkout-name').value,
            surname: document.getElementById('checkout-surname').value,
            email: document.getElementById('checkout-email').value,
            phone: document.getElementById('checkout-phone').value
        },
        status: 'confirmed'
    };
    saveOrder(orderNumber, orderData);
    clearCart();
    showNotification('Оплата прошла успешно!', 'success');
    if (typeof renderCartItems === 'function') {
        renderCartItems();
    }
    // Закрыть модальное окно после оплаты
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
        checkoutModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }
}

function generateOrderNumber() {
    return 'HT' + Date.now().toString().slice(-8);
}

function renderBookingHistory() {
    const bookingsList = document.getElementById('bookings-list');
    if (!bookingsList) return;
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (orders.length === 0) {
        bookingsList.innerHTML = `<div class="text-center py-12 text-gray-500">
            <i class="fas fa-ticket-alt text-4xl mb-4 text-gray-400"></i>
            <p>У вас пока нет заказов</p>
            <a href="index.html" class="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-300">
                <i class="fas fa-search mr-2"></i>Найти тур
            </a>
        </div>`;
        document.getElementById('bookings-count').textContent = 0;
        return;
    }
    document.getElementById('bookings-count').textContent = orders.length;
    bookingsList.innerHTML = orders.map(order => `
        <div class="border rounded-lg overflow-hidden border-gray-200">
            <div class="bg-gray-50 p-4 flex flex-col md:flex-row md:items-center justify-between">
                <div>
                    <h3 class="font-semibold text-gray-900">Заказ №${order.number}</h3>
                    <p class="text-gray-600 text-sm">Дата: ${formatDate(order.date)}</p>
                </div>
                <div class="mt-2 md:mt-0">
                    <span class="inline-block px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        ${order.status === 'confirmed' ? 'В обработке' : order.status}
                    </span>
                    <div class="text-lg font-bold text-gray-900 mt-1">${formatPrice(order.total)}</div>
                </div>
            </div>
            <div class="p-4 space-y-3">
                ${order.items.map(item => `
                    <div class="flex justify-between items-center">
                        <div>
                            <h4 class="font-medium">${item.name}</h4>
                            <p class="text-sm text-gray-500">${item.duration}</p>
                        </div>
                        <div class="text-right">
                            <div>${formatPrice(item.price)}</div>
                            <div class="text-sm text-gray-500">x${item.quantity}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartContent = document.getElementById('cart-content');
    const subtotalElem = document.getElementById('cart-subtotal');
    const discountElem = document.getElementById('cart-discount');
    const feeElem = document.getElementById('cart-fee');
    const totalElem = document.getElementById('cart-total');

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        if (cartEmptyMessage) cartEmptyMessage.classList.remove('hidden');
        if (cartContent) cartContent.classList.add('hidden');
        if (subtotalElem) subtotalElem.textContent = '0 ₽';
        if (discountElem) discountElem.textContent = '0 ₽';
        if (feeElem) feeElem.textContent = '0 ₽';
        if (totalElem) totalElem.textContent = '0 ₽';
        return;
    } else {
        if (cartEmptyMessage) cartEmptyMessage.classList.add('hidden');
        if (cartContent) cartContent.classList.remove('hidden');
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item flex items-center justify-between bg-white rounded-lg shadow p-4">
            <div>
                <h3 class="font-semibold text-lg text-gray-900 mb-1">${item.name}</h3>
                <div class="text-gray-500 text-sm mb-1">${item.duration}</div>
                <div class="text-gray-500 text-sm mb-1">Категория: ${item.category}</div>
                <div class="text-gray-500 text-sm">Цена: ${formatPrice(item.price)}</div>
            </div>
            <div class="flex flex-col items-end">
                <div class="flex items-center mb-2">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="quantity-btn">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="quantity-btn">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 text-sm"><i class="fas fa-trash mr-1"></i>Удалить</button>
            </div>
        </div>
    `).join('');

    // Итоги
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = 0; // Можно реализовать промокоды
    const fee = 0; // Можно добавить сервисный сбор
    const total = subtotal - discount + fee;

    if (subtotalElem) subtotalElem.textContent = formatPrice(subtotal);
    if (discountElem) discountElem.textContent = formatPrice(discount);
    if (feeElem) feeElem.textContent = formatPrice(fee);
    if (totalElem) totalElem.textContent = formatPrice(total);
}

function addToFavorites(tourId) {
    // Получаем тур из разных возможных источников
    let tour = null;
    if (window.tours && window.tours.length > 0) {
        tour = window.tours.find(t => t.id === tourId);
    }
    
    if (!tour) {
        showNotification('Тур не найден!', 'error');
        return;
    }

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const existingItem = favorites.find(item => item.id === tourId);
    
    if (existingItem) {
        showNotification(`Тур "${tour.name}" уже в избранном!`, 'info');
        return;
    }
    
    favorites.push({
        ...tour,
        addedAt: new Date().toISOString()
    });
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showNotification(`Тур "${tour.name}" добавлен в избранное!`, 'success');
}

function removeFromFavorites(tourId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(item => item.id !== tourId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    if (typeof renderFavorites === 'function') {
        renderFavorites();
    }
}

function renderFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    if (!favoritesList) return;
    
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = `<div class="text-center py-12 text-gray-500">
            <i class="fas fa-heart text-4xl mb-4 text-gray-400"></i>
            <p>У вас пока нет избранных туров</p>
            <a href="index.html" class="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-300">
                <i class="fas fa-search mr-2"></i>Найти тур
            </a>
        </div>`;
        document.getElementById('favorites-count').textContent = 0;
        return;
    }
    
    document.getElementById('favorites-count').textContent = favorites.length;
    favoritesList.innerHTML = favorites.map(tour => `
        <div class="border rounded-lg overflow-hidden border-gray-200">
            <div class="bg-gray-50 p-4 flex flex-col md:flex-row md:items-center justify-between">
                <div class="flex-1">
                    <h3 class="font-semibold text-lg text-gray-900 mb-1">${tour.name}</h3>
                    <div class="text-gray-500 text-sm mb-1">${tour.duration}</div>
                    <div class="text-gray-500 text-sm mb-1">Категория: ${tour.category}</div>
                    <div class="text-gray-500 text-sm">Цена: ${formatPrice(tour.price)}</div>
                </div>
                <div class="flex flex-col items-end mt-4 md:mt-0">
                    <div class="text-lg font-bold text-gray-900 mb-2">${formatPrice(tour.price)}</div>
                    <div class="flex space-x-2">
                        <button onclick="showTourDetails(${tour.id})" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300">
                            <i class="fas fa-external-link-alt mr-1"></i>Перейти к туру
                        </button>
                        <button onclick="removeFromFavorites(${tour.id})" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
                            <i class="fas fa-trash mr-1"></i>Удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

if (typeof window !== 'undefined') {
    window.addToCart = addToCart;
    window.addToFavorites = addToFavorites;
    window.removeFromFavorites = removeFromFavorites;
    window.formatPrice = formatPrice;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        cart, currentUser, addToCart, removeFromCart, updateQuantity, 
        clearCart, getCartTotal, loginUser, logoutUser, showNotification 
    };
}
