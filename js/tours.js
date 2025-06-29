const tours = [
    {
        id: 1,
        name: "Романтическая Италия",
        destination: "europe",
        price: 89000,
        duration: "7 дней",
        rating: 4.8,
        reviewsCount: 124,
        image: "italy",
        shortDescription: "Венеция, Рим, Флоренция - классический маршрут по Италии",
        fullDescription: "Незабываемое путешествие по самым красивым городам Италии. Вы посетите романтическую Венецию с её каналами и гондолами, величественный Рим с Колизеем и Ватиканом, и прекрасную Флоренцию - колыбель Ренессанса.",
        includes: ["Авиаперелет", "Проживание в отелях 4*", "Завтраки", "Экскурсии с гидом", "Трансферы"],
        highlights: ["Прогулка на гондоле в Венеции", "Экскурсия в Ватикан", "Дегустация итальянских вин"],
        category: "Культурный тур"
    },
    {
        id: 2,
        name: "Солнечная Турция",
        destination: "asia",
        price: 45000,
        duration: "10 дней",
        rating: 4.6,
        reviewsCount: 89,
        image: "turkey",
        shortDescription: "Анталья - все включено на берегу Средиземного моря",
        fullDescription: "Прекрасный пляжный отдых на турецком побережье. Отель со всеми удобствами, чистые пляжи, турецкая кухня и множество развлечений для всей семьи.",
        includes: ["Авиаперелет", "Проживание All Inclusive", "Трансферы", "Анимация", "Детский клуб"],
        highlights: ["Частный пляж", "Аквапарк в отеле", "Турецкие бани"],
        category: "Пляжный отдых"
    },
    {
        id: 3,
        name: "Экзотические Мальдивы",
        destination: "asia",
        price: 180000,
        duration: "8 дней",
        rating: 4.9,
        reviewsCount: 67,
        image: "maldives",
        shortDescription: "Райские острова с белоснежными пляжами и лагунами",
        fullDescription: "Роскошный отдых на одном из самых красивых островов мира. Кристально чистая вода, коралловые рифы, бунгало над водой и незаберпаемые закаты.",
        includes: ["Авиаперелет", "Проживание в бунгало", "Полный пансион", "Водные виды спорта", "Spa-процедуры"],
        highlights: ["Бунгало над водой", "Подводное плавание", "Романтические ужины на пляже"],
        category: "Luxury отдых"
    },
    {
        id: 4,
        name: "Таинственный Египет",
        destination: "africa",
        price: 65000,
        duration: "9 дней",
        rating: 4.5,
        reviewsCount: 156,
        image: "egypt",
        shortDescription: "Каир, пирамиды Гизы и круиз по Нилу",
        fullDescription: "Увлекательное путешествие в страну фараонов. Посещение пирамид, Сфинкса, круиз по священному Нилу и знакомство с древней историей Египта.",
        includes: ["Авиаперелет", "Проживание в отелях", "Круиз по Нилу", "Все экскурсии", "Питание"],
        highlights: ["Пирамиды Гизы", "Долина Царей", "Храм Луксора"],
        category: "Исторический тур"
    },
    {
        id: 5,
        name: "Незабываемая Греция",
        destination: "europe",
        price: 72000,
        duration: "8 дней",
        rating: 4.7,
        reviewsCount: 92,
        image: "greece",
        shortDescription: "Афины и острова - колыбель европейской цивилизации",
        fullDescription: "Путешествие по древней Греции с посещением Афин, Акрополя и живописных греческих островов. Сочетание богатой истории и прекрасных пляжей.",
        includes: ["Авиаперелет", "Проживание", "Завтраки", "Экскурсии", "Паромные переправы"],
        highlights: ["Акрополь и Парфенон", "Остров Санторини", "Греческая кухня"],
        category: "Культурно-пляжный"
    },
    {
        id: 6,
        name: "Ночной Дубай",
        destination: "asia",
        price: 95000,
        duration: "6 дней",
        rating: 4.8,
        reviewsCount: 78,
        image: "dubai",
        shortDescription: "Город будущего с небоскребами и роскошными отелями",
        fullDescription: "Современный мегаполис в пустыне. Небоскреб Бурдж-Калифа, роскошные торговые центры, искусственные острова и незабываемые впечатления.",
        includes: ["Авиаперелет", "Проживание 5*", "Завтраки", "Экскурсии", "Входные билеты"],
        highlights: ["Бурдж-Калифа", "Сафари в пустыне", "Фонтаны Дубая"],
        category: "Современный город"
    },
    {
        id: 7,
        name: "Магическая Испания",
        destination: "europe",
        price: 78000,
        duration: "10 дней",
        rating: 4.6,
        reviewsCount: 134,
        image: "spain",
        shortDescription: "Мадрид, Барселона и пляжи Коста-дель-Соль",
        fullDescription: "Яркое путешествие по Испании - от художественных музеев Мадрида до архитектуры Гауди в Барселоне и солнечных пляжей Андалусии.",
        includes: ["Авиаперелет", "Проживание", "Завтраки", "Скоростные поезда", "Экскурсии"],
        highlights: ["Музей Прадо", "Саграда Фамилия", "Фламенко-шоу"],
        category: "Культурно-пляжный"
    },
    {
        id: 8,
        name: "Сказочная Чехия",
        destination: "europe",
        price: 52000,
        duration: "7 дней",
        rating: 4.7,
        reviewsCount: 167,
        image: "czech",
        shortDescription: "Прага - город ста башен и замков",
        fullDescription: "Романтическое путешествие в сердце Европы. Средневековая Прага с её замками, мостами и уютными улочками. Дегустация знаменитого чешского пива.",
        includes: ["Авиаперелет", "Проживание в центре", "Завтраки", "Экскурсии", "Дегустации"],
        highlights: ["Пражский Град", "Карлов мост", "Чешское пиво"],
        category: "Культурный тур"
    },
    {
        id: 9,
        name: "Горная Швейцария",
        destination: "europe",
        price: 125000,
        duration: "8 дней",
        rating: 4.9,
        reviewsCount: 45,
        image: "switzerland",
        shortDescription: "Альпы, озера и шоколадные фабрики",
        fullDescription: "Живописная Швейцария с её заснеженными вершинами, кристальными озерами и уютными деревушками. Поездки на горных поездах и дегустация швейцарского шоколада.",
        includes: ["Авиаперелет", "Проживание", "Swiss Pass", "Экскурсии", "Горные подъемники"],
        highlights: ["Юнгфрауйох", "Женевское озеро", "Фабрика шоколада"],
        category: "Горный туризм"
    }
];

function loadTours() {
    const toursGrid = document.getElementById('tours-grid');
    if (!toursGrid) return;
    
    toursGrid.innerHTML = '<div class="loader"></div>';
    
    setTimeout(() => {
        renderTours(tours);
    }, 1000);
}

function renderTours(toursToRender) {
    const toursGrid = document.getElementById('tours-grid');
    if (!toursGrid) return;
    
    if (toursToRender.length === 0) {
        toursGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-600">Туры не найдены</h3>
                <p class="text-gray-500">Попробуйте изменить критерии поиска</p>
            </div>
        `;
        return;
    }
    
    toursGrid.innerHTML = toursToRender.map(tour => createTourCard(tour)).join('');
    
    setupTourCardEvents();
}

function createTourCard(tour) {
    const imageGradients = {
        italy: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        turkey: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        maldives: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        egypt: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        greece: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        dubai: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        spain: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        czech: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
        switzerland: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'
    };
    
    return `
        <div class="tour-card" data-tour-id="${tour.id}">
            <div class="tour-card-image" style="background: ${imageGradients[tour.image] || imageGradients.italy}">
                <div class="absolute inset-0 flex items-center justify-center">
                    <i class="fas fa-map-marked-alt text-white text-4xl opacity-70"></i>
                </div>
                <div class="absolute top-4 right-4">
                    <span class="tour-price">${formatPrice(tour.price)}</span>
                </div>
            </div>
            <div class="tour-card-content">
                <div class="tour-rating mb-2">
                    ${generateStarRating(tour.rating)}
                    <span class="text-sm text-gray-500 ml-2">(${tour.reviewsCount} отзывов)</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">${tour.name}</h3>
                <p class="text-gray-600 mb-3">${tour.shortDescription}</p>
                <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span><i class="fas fa-clock mr-1"></i>${tour.duration}</span>
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">${tour.category}</span>
                </div>
                <div class="flex space-x-2">
                    <button onclick="showTourDetails(${tour.id})" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300">
                        Подробнее
                    </button>
                    <button onclick="addToCart(${tour.id})" class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star text-yellow-400"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star text-yellow-400"></i>';
    }
    
    return `<div class="flex items-center">${starsHTML}<span class="ml-1 font-semibold">${rating}</span></div>`;
}

function setupTourCardEvents() {
    const tourCards = document.querySelectorAll('.tour-card');
    
    tourCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

function showTourDetails(tourId) {
    const tour = tours.find(t => t.id === tourId);
    if (!tour) return;
    
    const modal = document.getElementById('tour-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalTitle || !modalContent) return;
    
    modalTitle.textContent = tour.name;
    modalContent.innerHTML = `
        <div class="space-y-6">
            <div class="tour-modal-image h-64 rounded-lg" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
                <div class="h-full flex items-center justify-center">
                    <i class="fas fa-map-marked-alt text-white text-6xl opacity-70"></i>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 class="font-semibold text-lg mb-3">Информация о туре</h4>
                    <ul class="space-y-2 text-gray-600">
                        <li><strong>Продолжительность:</strong> ${tour.duration}</li>
                        <li><strong>Категория:</strong> ${tour.category}</li>
                        <li><strong>Рейтинг:</strong> ${generateStarRating(tour.rating)}</li>
                        <li><strong>Отзывы:</strong> ${tour.reviewsCount} отзывов</li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="font-semibold text-lg mb-3">Стоимость</h4>
                    <div class="text-3xl font-bold text-orange-500 mb-2">${formatPrice(tour.price)}</div>
                    <p class="text-sm text-gray-500">за человека</p>
                </div>
            </div>
            
            <div>
                <h4 class="font-semibold text-lg mb-3">Описание</h4>
                <p class="text-gray-600 leading-relaxed">${tour.fullDescription}</p>
            </div>
            
            <div>
                <h4 class="font-semibold text-lg mb-3">Включено в стоимость</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    ${tour.includes.map(item => `
                        <div class="flex items-center text-green-600">
                            <i class="fas fa-check mr-2"></i>
                            <span>${item}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div>
                <h4 class="font-semibold text-lg mb-3">Особенности тура</h4>
                <div class="space-y-2">
                    ${tour.highlights.map(highlight => `
                        <div class="flex items-center text-blue-600">
                            <i class="fas fa-star mr-2"></i>
                            <span>${highlight}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="flex space-x-4 pt-4 border-t">
                <button onclick="addToCart(${tour.id}); document.getElementById('tour-modal').classList.add('hidden'); document.body.classList.remove('modal-open');" 
                        class="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-300">
                    <i class="fas fa-shopping-cart mr-2"></i>Добавить в корзину
                </button>
                <button onclick="addToFavorites(${tour.id}); document.getElementById('tour-modal').classList.add('hidden'); document.body.classList.remove('modal-open');" 
                        class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-300">
                    <i class="fas fa-heart mr-2"></i>В избранное
                </button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function filterTours(destination, priceFrom, priceTo) {
    let filteredTours = tours;
    
    if (destination) {
        filteredTours = filteredTours.filter(tour => tour.destination === destination);
    }
    
    if (priceFrom) {
        filteredTours = filteredTours.filter(tour => tour.price >= priceFrom);
    }
    
    if (priceTo) {
        filteredTours = filteredTours.filter(tour => tour.price <= priceTo);
    }
    
    renderTours(filteredTours);
    
    if (filteredTours.length > 0) {
        showSearchResults(`Найдено ${filteredTours.length} туров`);
    } else {
        showSearchResults('Туры не найдены');
    }
}

function showSearchResults(text) {
    const toursGrid = document.getElementById('tours-grid');
    if (!toursGrid) return;
    
    const existingMessage = toursGrid.querySelector('.search-result-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = 'search-result-message col-span-full text-center py-4 bg-blue-50 rounded-lg';
    message.innerHTML = `<p class="text-blue-600 font-medium">${text}</p>`;
    
    toursGrid.insertBefore(message, toursGrid.firstChild);
}

function searchTours(query) {
    if (!query.trim()) {
        renderTours(tours);
        return;
    }
    
    const filteredTours = tours.filter(tour => 
        tour.name.toLowerCase().includes(query.toLowerCase()) ||
        tour.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
        tour.category.toLowerCase().includes(query.toLowerCase())
    );
    
    renderTours(filteredTours);
}

function getPopularTours(count = 6) {
    return tours.sort((a, b) => b.rating - a.rating).slice(0, count);
}

function getToursByCategory(category) {
    return tours.filter(tour => tour.category === category);
}

if (typeof window !== 'undefined') {
    window.showTourDetails = showTourDetails;
    window.addToCart = typeof addToCart !== 'undefined' ? addToCart : () => {};
    window.tours = tours;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { tours, loadTours, renderTours, filterTours, searchTours };
}
