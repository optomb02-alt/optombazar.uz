import { Translations, Category } from './types';

export const MIN_ORDER_AMOUNT = 500000;
export const FREE_DELIVERY_THRESHOLD = 2000000;
export const STANDARD_DELIVERY_COST = 35000;

// Initial Categories with Subcategory Support
export const CATEGORIES: Category[] = [
  // ===== ASOSIY KATEGORIYALAR =====
  { id: 'cat-1', name_uz: 'Paketlar', name_ru: 'Пакеты', parent_id: null, icon: '🛍️' },
  { id: 'cat-2', name_uz: 'Oshxona sarflov materiallari', name_ru: 'Расходные материалы для кухни', parent_id: null, icon: '🍳' },
  { id: 'cat-3', name_uz: 'Tozalash inventarlari', name_ru: 'Инвентарь для уборки', parent_id: null, icon: '🧹' },
  { id: 'cat-4', name_uz: 'Qog\'oz gigiena', name_ru: 'Бумажная гигиена', parent_id: null, icon: '🧻' },
  { id: 'cat-5', name_uz: 'Boshqa xo\'jalik buyumlari', name_ru: 'Прочие хозтовары', parent_id: null, icon: '📦' },

  // ===== PAKETLAR SUBKATEGORIYALARI =====
  { id: 'sub-1-1', name_uz: 'Mayka paketlar', name_ru: 'Пакеты майка', parent_id: 'cat-1' },
  { id: 'sub-1-2', name_uz: 'Fasovka paketlari', name_ru: 'Фасовочные пакеты', parent_id: 'cat-1' },
  { id: 'sub-1-3', name_uz: 'Chiqindi (Musor) paketlari', name_ru: 'Мешки для мусора', parent_id: 'cat-1' },
  { id: 'sub-1-4', name_uz: 'Zip-Lock paketlar', name_ru: 'Пакеты с замком Zip-Lock', parent_id: 'cat-1' },
  { id: 'sub-1-5', name_uz: 'Sovg\'a paketlari', name_ru: 'Подарочные пакеты', parent_id: 'cat-1' },

  // ===== OSHXONA SARFLOV MATERIALLARI =====
  { id: 'sub-2-1', name_uz: 'Oziq-ovqat plyonkasi', name_ru: 'Пищевая пленка', parent_id: 'cat-2' },
  { id: 'sub-2-2', name_uz: 'Alyuminiy folga', name_ru: 'Алюминиевая фольга', parent_id: 'cat-2' },
  { id: 'sub-2-3', name_uz: 'Pergament qog\'oz', name_ru: 'Пергаментная бумага', parent_id: 'cat-2' },
  { id: 'sub-2-4', name_uz: 'Pishiriq yenglari', name_ru: 'Рукав для запекания', parent_id: 'cat-2' },

  // ===== TOZALASH INVENTARLARI =====
  { id: 'sub-3-1', name_uz: 'Gubkalar (Idish yuvish uchun)', name_ru: 'Губки для посуды', parent_id: 'cat-3' },
  { id: 'sub-3-2', name_uz: 'Salfetka va lattalar', name_ru: 'Салфетки и тряпки для уборки', parent_id: 'cat-3' },
  { id: 'sub-3-3', name_uz: 'Xo\'jalik qo\'lqoplari', name_ru: 'Хозяйственные перчатки', parent_id: 'cat-3' },
  { id: 'sub-3-4', name_uz: 'Supurgi va faroshlar', name_ru: 'Веники и совки', parent_id: 'cat-3' },

  // ===== QOG'OZ GIGIENA =====
  { id: 'sub-4-1', name_uz: 'Tualet qog\'ozi', name_ru: 'Туалетная бумага', parent_id: 'cat-4' },
  { id: 'sub-4-2', name_uz: 'Stol salfetkalari', name_ru: 'Столовые салфетки', parent_id: 'cat-4' },
  { id: 'sub-4-3', name_uz: 'Nam salfetkalar', name_ru: 'Влажные салфетки', parent_id: 'cat-4' },
  { id: 'sub-4-4', name_uz: 'Qog\'oz sochiqlar', name_ru: 'Бумажные полотенца', parent_id: 'cat-4' },

  // ===== BOSHQA XO'JALIK BUYUMLARI =====
  { id: 'sub-5-1', name_uz: 'Shamlar', name_ru: 'Свечи', parent_id: 'cat-5' },
  { id: 'sub-5-2', name_uz: 'Gugurt va zajigalkalar', name_ru: 'Спички и зажигалки', parent_id: 'cat-5' },
  { id: 'sub-5-3', name_uz: 'Tish kovlagichlar', name_ru: 'Зубочистки', parent_id: 'cat-5' },

  // ===== YANGI ASOSIY KATEGORIYALAR - BIR MARTALIK IDISHLAR =====
  { id: 'cat-6', name_uz: 'Stakanlar', name_ru: 'Стаканы', parent_id: null, icon: '🥤' },
  { id: 'cat-7', name_uz: 'Konteynerlar', name_ru: 'Контейнеры', parent_id: null, icon: '📦' },
  { id: 'cat-8', name_uz: 'Likopchalar', name_ru: 'Тарелки', parent_id: null, icon: '🍽️' },
  { id: 'cat-9', name_uz: 'Oshxona anjomlari', name_ru: 'Столовые приборы', parent_id: null, icon: '🍴' },
  { id: 'cat-10', name_uz: 'Aksessuarlar', name_ru: 'Аксессуары', parent_id: null, icon: '🎯' },

  // ===== STAKANLAR SUBKATEGORIYALARI =====
  { id: 'sub-6-1', name_uz: 'Qog\'oz stakanlar', name_ru: 'Бумажные стаканы', parent_id: 'cat-6' },
  { id: 'sub-6-2', name_uz: 'Plastik stakanlar', name_ru: 'Пластиковые стаканы', parent_id: 'cat-6' },
  { id: 'sub-6-3', name_uz: 'Gumbazsimon qopqoqli stakanlar', name_ru: 'Купольные стаканы', parent_id: 'cat-6' },

  // ===== KONTEYNERLAR SUBKATEGORIYALARI =====
  { id: 'sub-7-1', name_uz: 'Plastik konteynerlar', name_ru: 'Пластиковые контейнеры', parent_id: 'cat-7' },
  { id: 'sub-7-2', name_uz: 'Lanchbokslar', name_ru: 'Ланч-боксы', parent_id: 'cat-7' },
  { id: 'sub-7-3', name_uz: 'Alyuminiy formalar', name_ru: 'Алюминиевые формы', parent_id: 'cat-7' },
  { id: 'sub-7-4', name_uz: 'Sous idishlari', name_ru: 'Соусницы', parent_id: 'cat-7' },

  // ===== LIKOPCHALAR SUBKATEGORIYALARI =====
  { id: 'sub-8-1', name_uz: 'Plastik likopchalar', name_ru: 'Пластиковые тарелки', parent_id: 'cat-8' },
  { id: 'sub-8-2', name_uz: 'Qog\'oz likopchalar', name_ru: 'Бумажные тарелки', parent_id: 'cat-8' },
  { id: 'sub-8-3', name_uz: 'Kosalar (Chuqur likopchalar)', name_ru: 'Миски / Суповые тарелки', parent_id: 'cat-8' },

  // ===== OSHXONA ANJOMLARI SUBKATEGORIYALARI =====
  { id: 'sub-9-1', name_uz: 'Qoshiq, sanchqi, pichoq', name_ru: 'Ложки, вилки, ножи', parent_id: 'cat-9' },
  { id: 'sub-9-2', name_uz: 'Aralashtirgichlar (Meshalka)', name_ru: 'Размешиватели', parent_id: 'cat-9' },

  // ===== AKSESSUARLAR SUBKATEGORIYALARI =====
  { id: 'sub-10-1', name_uz: 'Naychalar (Trubochkalar)', name_ru: 'Трубочки для напитков', parent_id: 'cat-10' },
  { id: 'sub-10-2', name_uz: 'Stakan ushlagichlar', name_ru: 'Держатели для стаканов (Капхолдеры)', parent_id: 'cat-10' },
];

export const TEXTS: Translations = {
  // General
  brand: { uz: 'Optombazar.uz', ru: 'Optombazar.uz' },
  searchPlaceholder: { uz: 'Mahsulotlarni izlash...', ru: 'Поиск товаров...' },
  adminPanel: { uz: 'Admin Panel', ru: 'Админ панель' },
  backToShop: { uz: 'Do\'konga qaytish', ru: 'Вернуться в магазин' },

  // Registration / Welcome
  welcomeTitle: { uz: 'Xush kelibsiz!', ru: 'Добро пожаловать!' },
  welcomeSubtitle: { uz: 'Platformadan foydalanish uchun ma\'lumotlaringizni kiriting', ru: 'Введите свои данные для использования платформы' },
  interestLabel: { uz: 'Sizni qaysi mahsulotlar qiziqtiradi?', ru: 'Какие товары вас интересуют?' },
  startShopping: { uz: 'Xaridni boshlash', ru: 'Начать покупки' },
  selectCategory: { uz: 'Kategoriyani tanlang', ru: 'Выберите категорию' },

  // Telegram Popup
  tgPopupTitle: { uz: 'Telegram kanalimizga obuna bo\'ling!', ru: 'Подпишитесь на наш Telegram канал!' },
  tgPopupDesc: { uz: 'Yangiliklar, aksiyalar va yangi mahsulotlar haqida birinchi bo\'lib bilib oling.', ru: 'Узнавайте первыми о новостях, акциях и новых товарах.' },
  tgJoin: { uz: 'A\'zo bo\'lish', ru: 'Подписаться' },
  tgLater: { uz: 'Yopish', ru: 'Закрыть' },

  // Navigation
  home: { uz: 'Asosiy', ru: 'Главная' },
  catalog: { uz: 'Katalog', ru: 'Каталог' },
  profile: { uz: 'Profil', ru: 'Профиль' },
  blog: { uz: 'Blog', ru: 'Блог' },

  // Favorites
  favorites: { uz: 'Saralanganlar', ru: 'Избранное' },
  emptyFavorites: { uz: 'Saralanganlar ro\'yxati bo\'sh', ru: 'Список избранного пуст' },
  addToFavorites: { uz: 'Saralanganlarga qo\'shildi', ru: 'Добавлено в избранное' },
  removeFromFavorites: { uz: 'Saralanganlardan o\'chirildi', ru: 'Удалено из избранного' },

  // Badges
  badgeNew: { uz: 'Yangi', ru: 'New' },
  badgeLowStock: { uz: 'Kam qoldi', ru: 'Мало' },

  // Cart & Orders
  cart: { uz: 'Savat', ru: 'Корзина' },
  addToCart: { uz: 'Savatga qo\'shish', ru: 'В корзину' },
  itemsInPack: { uz: 'Ichida', ru: 'В упаковке' },
  pieces: { uz: 'dona', ru: 'шт' },
  perPack: { uz: 'blok narxi', ru: 'цена за блок' },
  minOrderWarning: { uz: 'Eng kam buyurtma: 500,000 so\'m', ru: 'Минимальный заказ: 500,000 сум' },
  total: { uz: 'Jami', ru: 'Итого' },
  emptyCart: { uz: 'Savatcha bo\'sh', ru: 'Корзина пуста' },
  checkout: { uz: 'Buyurtma berish', ru: 'Оформить заказ' },

  // Checkout Form
  name: { uz: 'Ismingiz', ru: 'Ваше имя' },
  phone: { uz: 'Telefon raqam', ru: 'Номер телефона' },
  address: { uz: 'Manzil', ru: 'Адрес' },
  addressPlaceholder: { uz: 'Mo\'ljal, ko\'cha nomi yoki lokatsiya...', ru: 'Ориентир, название улицы или локация...' },
  detectLocation: { uz: 'Lokatsiyani aniqlash', ru: 'Определить локацию' },
  detecting: { uz: 'Aniqlanmoqda...', ru: 'Определение...' },
  locationFound: { uz: 'Lokatsiya olindi', ru: 'Локация получена' },
  locationError: { uz: 'Lokatsiyani olishda xatolik', ru: 'Ошибка получения локации' },
  deliveryMethod: { uz: 'Yetkazib berish turi', ru: 'Способ доставки' },
  paymentMethod: { uz: 'To\'lov turi', ru: 'Способ оплаты' },

  // Delivery Options
  pickup: { uz: 'Olib ketish (O\'rikzor)', ru: 'Самовывоз (Урикзар)' },
  delivery: { uz: 'Yetkazib berish (Toshkent)', ru: 'Доставка (Ташкент)' },
  regional: { uz: 'Viloyat pochtasi', ru: 'Почта в области' },
  yandex: { uz: 'Yandex yetkazib berish', ru: 'Yandex доставка' },

  freeDelivery: { uz: 'Bepul', ru: 'Бесплатно' },
  deliveryNote: { uz: '2 mln so\'mdan oshsa bepul, ungacha 35,000 so\'m', ru: 'Бесплатно от 2 млн, до этого 35,000 сум' },
  yandexNote: { uz: 'Narxi Yandex tarifi bo\'yicha', ru: 'Цена по тарифу Yandex' },
  regionalNote: { uz: 'Maslahat orqali (Telefon)', ru: 'По договоренности (Телефон)' },
  deliveryCostLabel: { uz: 'Yetkazib berish narxi', ru: 'Стоимость доставки' },

  // Payment Options
  cash: { uz: 'Naqd pul', ru: 'Наличные' },
  card: { uz: 'Plastik karta (Click/Payme)', ru: 'Пластиковая карта (Click/Payme)' },
  transfer: { uz: 'Pul o\'tkazish (Perechislenie)', ru: 'Перечисление' },

  // Admin
  productNameUz: { uz: 'Mahsulot nomi (UZ)', ru: 'Название товара (UZ)' },
  productNameRu: { uz: 'Mahsulot nomi (RU)', ru: 'Название товара (RU)' },
  descriptionUz: { uz: 'Tavsif (UZ)', ru: 'Описание (UZ)' },
  descriptionRu: { uz: 'Tavsif (RU)', ru: 'Описание (RU)' },
  price: { uz: 'Narx', ru: 'Цена' },
  stock: { uz: 'Ombor', ru: 'Склад' },
  category: { uz: 'Kategoriya', ru: 'Категория' },
  image: { uz: 'Rasmlar URL (har qatorda bittadan)', ru: 'URL изображений (по одному на строку)' },
  video: { uz: 'Video URL', ru: 'URL видео' },
  addProduct: { uz: 'Mahsulot qo\'shish', ru: 'Добавить товар' },
  editProduct: { uz: 'Mahsulotni tahrirlash', ru: 'Редактировать товар' },
  updateProduct: { uz: 'Yangilash', ru: 'Обновить' },
  cancel: { uz: 'Bekor qilish', ru: 'Отмена' },
  edit: { uz: 'Tahrirlash', ru: 'Редактировать' },
  orders: { uz: 'Buyurtmalar', ru: 'Заказы' },
  customers: { uz: 'Mijozlar', ru: 'Клиенты' },
  interest: { uz: 'Qiziqish', ru: 'Интерес' },
  order: { uz: 'Buyurtma', ru: 'Заказ' },
  customer: { uz: 'Mijoz', ru: 'Клиент' },
  items: { uz: 'Mahsulotlar', ru: 'Товары' },
  inventory: { uz: 'Omborxona', ru: 'Склад' },
  save: { uz: 'Saqlash', ru: 'Сохранить' },
  delete: { uz: 'O\'chirish', ru: 'Удалить' },
  updateStatus: { uz: 'Statusni yangilash', ru: 'Обновить статус' },
  deleteOrder: { uz: 'Buyurtmani o\'chirish', ru: 'Удалить заказ' },

  // Blog
  blogTopic: { uz: 'Maqola mavzusi', ru: 'Тема статьи' },
  generatePost: { uz: 'SEO Maqola Yozish (AI)', ru: 'Написать SEO статью (ИИ)' },
  readMore: { uz: 'Batafsil o\'qish', ru: 'Читать далее' },
  createPost: { uz: 'Yangi maqola', ru: 'Новая статья' },

  // Categories
  categories: { uz: 'Kategoriyalar', ru: 'Категории' },
  addCategory: { uz: 'Kategoriya qo\'shish', ru: 'Добавить категорию' },
  editCategory: { uz: 'Kategoriyani tahrirlash', ru: 'Редактировать категорию' },
  categoryNamePlaceholder: { uz: 'Nomi (Masalan: Oziq-ovqat / Продукты)', ru: 'Название (Например: Oziq-ovqat / Продукты)' },
  cantDeleteCategory: { uz: 'Bu kategoriyada mahsulotlar bor. Oldin ularni o\'chiring yoki boshqa kategoriyaga o\'tkazing.', ru: 'В этой категории есть товары. Сначала удалите их или переместите в другую категорию.' },

  // AI Admin Tools
  generateAI: { uz: 'AI bilan to\'ldirish', ru: 'Заполнить с ИИ' },
  generating: { uz: 'Yaratilmoqda...', ru: 'Генерация...' },
  fillNameForAI: { uz: 'AI ishlashi uchun kamida bitta nom kiriting', ru: 'Введите хотя бы одно название для работы ИИ' },

  // Login
  loginTitle: { uz: 'Admin tizimiga kirish', ru: 'Вход в админ панель' },
  username: { uz: 'Login', ru: 'Логин' },
  password: { uz: 'Parol', ru: 'Пароль' },
  loginButton: { uz: 'Kirish', ru: 'Войти' },
  loginError: { uz: 'Login yoki parol noto\'g\'ri', ru: 'Неверный логин или пароль' },
  logout: { uz: 'Chiqish', ru: 'Выйти' },

  // Status
  statusNew: { uz: 'Yangi', ru: 'Новый' },
  statusProcessing: { uz: 'Jarayonda', ru: 'В процессе' },
  statusCompleted: { uz: 'Bajarildi', ru: 'Выполнен' },
  statusCancelled: { uz: 'Bekor qilindi', ru: 'Отменен' },

  // Messages
  orderSuccess: { uz: 'Buyurtmangiz qabul qilindi! Tez orada aloqaga chiqamiz.', ru: 'Ваш заказ принят! Мы скоро свяжемся с вами.' },
  fillAllFields: { uz: 'Barcha maydonlarni to\'ldiring', ru: 'Заполните все поля' },

  // Footer
  downloadApp: { uz: 'Ilovani yuklab oling', ru: 'Скачать приложение' },

  // AI Chatbot
  aiChatTitle: { uz: 'AI Yordamchi', ru: 'AI Помощник' },
  aiChatPlaceholder: { uz: 'Savolingizni yozing...', ru: 'Задайте вопрос...' },
  aiWelcome: { uz: 'Assalomu alaykum! Men Optombazar sun\'iy intellektiman. Sizga qanday yordam bera olaman?', ru: 'Здравствуйте! Я ИИ-помощник Optombazar. Чем могу помочь?' },

  // Profile Page
  myProfile: { uz: 'Mening profilim', ru: 'Мой профиль' },
  myOrders: { uz: 'Buyurtmalarim', ru: 'Мои заказы' },
  personalInfo: { uz: 'Shaxsiy ma\'lumotlar', ru: 'Личные данные' },
  noOrders: { uz: 'Sizda hali buyurtmalar yo\'q', ru: 'У вас пока нет заказов' },
  registeredAt: { uz: 'Ro\'yxatdan o\'tgan sana', ru: 'Дата регистрации' },
  updateInfo: { uz: 'Ma\'lumotlarni yangilash', ru: 'Обновить данные' },
  infoUpdated: { uz: 'Ma\'lumotlar yangilandi', ru: 'Данные обновлены' }
};

export const MOCK_PRODUCTS = [
  // ===== PAKETLAR =====
  {
    id: '1',
    slug: 'mayka-paket-30x50-100-dona',
    name_uz: 'Mayka paket 30x50 sm (100 dona)',
    name_ru: 'Пакет майка 30x50 см (100 шт)',
    description_uz: 'Yuqori sifatli polietilen mayka paketlar. Do\'konlar va supermarketlar uchun ideal. Yuk ko\'tarish qobiliyati 10 kg.',
    description_ru: 'Высококачественные полиэтиленовые пакеты майка. Идеально для магазинов и супермаркетов. Грузоподъемность 10 кг.',
    price: 45000,
    items_per_pack: 100,
    stock: 500,
    images: ['https://picsum.photos/400/400?random=101'],
    category: 'sub-1-1'
  },
  {
    id: '2',
    slug: 'musor-paketi-60l-20-dona',
    name_uz: 'Chiqindi paketi 60L (20 dona)',
    name_ru: 'Мешки для мусора 60L (20 шт)',
    description_uz: 'Mustahkam chiqindi paketlari uy va ofis uchun. Yirtilishga chidamli material.',
    description_ru: 'Прочные мусорные мешки для дома и офиса. Устойчивый к разрывам материал.',
    price: 35000,
    items_per_pack: 20,
    stock: 300,
    images: ['https://picsum.photos/400/400?random=102'],
    category: 'sub-1-3'
  },

  // ===== OSHXONA SARFLOV MATERIALLARI =====
  {
    id: '3',
    slug: 'oziq-ovqat-plyonkasi-300m',
    name_uz: 'Oziq-ovqat plyonkasi 300m x 30sm',
    name_ru: 'Пищевая пленка 300м x 30см',
    description_uz: 'Professional sifatli oziq-ovqat plyonkasi. Restoran va kafelar uchun. Mahsulotlarni yangi saqlaydi.',
    description_ru: 'Пищевая пленка профессионального качества. Для ресторанов и кафе. Сохраняет продукты свежими.',
    price: 85000,
    items_per_pack: 1,
    stock: 200,
    images: ['https://picsum.photos/400/400?random=103'],
    category: 'sub-2-1'
  },
  {
    id: '4',
    slug: 'alyuminiy-folga-100m',
    name_uz: 'Alyuminiy folga 100m x 45sm',
    name_ru: 'Алюминиевая фольга 100м x 45см',
    description_uz: 'Yuqori sifatli alyuminiy folga pishirish va saqlash uchun. Issiqlikni yaxshi o\'tkazadi.',
    description_ru: 'Высококачественная алюминиевая фольга для запекания и хранения. Отлично проводит тепло.',
    price: 120000,
    items_per_pack: 1,
    stock: 150,
    images: ['https://picsum.photos/400/400?random=104'],
    category: 'sub-2-2'
  },

  // ===== TOZALASH INVENTARLARI =====
  {
    id: '5',
    slug: 'gubka-idish-yuvish-10-dona',
    name_uz: 'Gubka idish yuvish uchun (10 dona)',
    name_ru: 'Губки для мытья посуды (10 шт)',
    description_uz: 'Ikki tomonlama gubkalar - yumshoq va qattiq. Idishlarni shikastlamaydi.',
    description_ru: 'Двухсторонние губки - мягкая и жесткая. Не царапают посуду.',
    price: 25000,
    items_per_pack: 10,
    stock: 400,
    images: ['https://picsum.photos/400/400?random=105'],
    category: 'sub-3-1'
  },
  {
    id: '6',
    slug: 'xojalik-qolqoplari-l-razmer',
    name_uz: 'Xo\'jalik qo\'lqoplari L razmer (10 juft)',
    name_ru: 'Хозяйственные перчатки L размер (10 пар)',
    description_uz: 'Lateks qo\'lqoplar tozalash ishlari uchun. Suv o\'tkazmaydi, mustahkam.',
    description_ru: 'Латексные перчатки для уборки. Водонепроницаемые, прочные.',
    price: 45000,
    items_per_pack: 10,
    stock: 250,
    images: ['https://picsum.photos/400/400?random=106'],
    category: 'sub-3-3'
  },

  // ===== QOG'OZ GIGIENA =====
  {
    id: '7',
    slug: 'tualet-qogozi-12-rulon',
    name_uz: 'Tualet qog\'ozi 2 qatlamli (12 rulon)',
    name_ru: 'Туалетная бумага 2-слойная (12 рулонов)',
    description_uz: 'Yumshoq 2 qatlamli tualet qog\'ozi. Oila va ofis uchun qulay.',
    description_ru: 'Мягкая 2-слойная туалетная бумага. Удобно для семьи и офиса.',
    price: 65000,
    items_per_pack: 12,
    stock: 300,
    images: ['https://picsum.photos/400/400?random=107'],
    category: 'sub-4-1'
  },
  {
    id: '8',
    slug: 'stol-salfetkalari-500-dona',
    name_uz: 'Stol salfetkalari oq (500 dona)',
    name_ru: 'Столовые салфетки белые (500 шт)',
    description_uz: 'Bir martalik stol salfetkalari. Restoran va kafelar uchun ideal.',
    description_ru: 'Одноразовые столовые салфетки. Идеально для ресторанов и кафе.',
    price: 55000,
    items_per_pack: 500,
    stock: 400,
    images: ['https://picsum.photos/400/400?random=108'],
    category: 'sub-4-2'
  },

  // ===== BOSHQA XO'JALIK BUYUMLARI =====
  {
    id: '9',
    slug: 'shamlar-oq-100-dona',
    name_uz: 'Shamlar oq rangli (100 dona)',
    name_ru: 'Свечи белые (100 шт)',
    description_uz: 'Oddiy oq shamlar uy va tadbirlar uchun. Yonish vaqti 4-5 soat.',
    description_ru: 'Обычные белые свечи для дома и мероприятий. Время горения 4-5 часов.',
    price: 80000,
    items_per_pack: 100,
    stock: 150,
    images: ['https://picsum.photos/400/400?random=109'],
    category: 'sub-5-1'
  },

  // ===== STAKANLAR =====
  {
    id: '10',
    slug: 'qogoz-stakan-250ml-50-dona',
    name_uz: 'Qog\'oz stakan 250ml (50 dona)',
    name_ru: 'Бумажный стакан 250мл (50 шт)',
    description_uz: 'Issiq ichimliklar uchun qog\'oz stakanlar. Kofe va choy uchun ideal. Ekologik toza.',
    description_ru: 'Бумажные стаканы для горячих напитков. Идеально для кофе и чая. Экологически чистые.',
    price: 45000,
    items_per_pack: 50,
    stock: 600,
    images: ['https://picsum.photos/400/400?random=110'],
    category: 'sub-6-1'
  },
  {
    id: '11',
    slug: 'plastik-stakan-200ml-100-dona',
    name_uz: 'Plastik stakan 200ml (100 dona)',
    name_ru: 'Пластиковый стакан 200мл (100 шт)',
    description_uz: 'Shaffof plastik stakanlar. Sovuq ichimliklar va tadbirlar uchun.',
    description_ru: 'Прозрачные пластиковые стаканы. Для холодных напитков и мероприятий.',
    price: 35000,
    items_per_pack: 100,
    stock: 500,
    images: ['https://picsum.photos/400/400?random=111'],
    category: 'sub-6-2'
  },

  // ===== KONTEYNERLAR =====
  {
    id: '12',
    slug: 'plastik-konteyner-500ml-50-dona',
    name_uz: 'Plastik konteyner 500ml qopqoqli (50 dona)',
    name_ru: 'Пластиковый контейнер 500мл с крышкой (50 шт)',
    description_uz: 'Oziq-ovqat uchun bir martalik konteynerlar. Yetkazib berish xizmatlari uchun.',
    description_ru: 'Одноразовые контейнеры для еды. Для служб доставки.',
    price: 75000,
    items_per_pack: 50,
    stock: 350,
    images: ['https://picsum.photos/400/400?random=112'],
    category: 'sub-7-1'
  },
  {
    id: '13',
    slug: 'lanchboks-3-bolimli-25-dona',
    name_uz: 'Lanchboks 3 bo\'limli (25 dona)',
    name_ru: 'Ланч-бокс 3-секционный (25 шт)',
    description_uz: 'Uch bo\'limli lanchbokslar kompleks ovqatlar uchun. Qopqoq bilan.',
    description_ru: 'Трехсекционные ланч-боксы для комплексных обедов. С крышкой.',
    price: 85000,
    items_per_pack: 25,
    stock: 200,
    images: ['https://picsum.photos/400/400?random=113'],
    category: 'sub-7-2'
  },

  // ===== LIKOPCHALAR =====
  {
    id: '14',
    slug: 'plastik-likopcha-22sm-50-dona',
    name_uz: 'Plastik likopcha 22sm (50 dona)',
    name_ru: 'Пластиковая тарелка 22см (50 шт)',
    description_uz: 'Katta hajmli plastik likopchalar. Pikniklar va tadbirlar uchun ideal.',
    description_ru: 'Большие пластиковые тарелки. Идеально для пикников и мероприятий.',
    price: 55000,
    items_per_pack: 50,
    stock: 400,
    images: ['https://picsum.photos/400/400?random=114'],
    category: 'sub-8-1'
  },
  {
    id: '15',
    slug: 'qogoz-likopcha-18sm-100-dona',
    name_uz: 'Qog\'oz likopcha 18sm (100 dona)',
    name_ru: 'Бумажная тарелка 18см (100 шт)',
    description_uz: 'Ekologik qog\'oz likopchalar. Tug\'ilgan kun va bayramlar uchun.',
    description_ru: 'Экологичные бумажные тарелки. Для дней рождения и праздников.',
    price: 45000,
    items_per_pack: 100,
    stock: 350,
    images: ['https://picsum.photos/400/400?random=115'],
    category: 'sub-8-2'
  },

  // ===== OSHXONA ANJOMLARI =====
  {
    id: '16',
    slug: 'plastik-qoshiq-100-dona',
    name_uz: 'Plastik qoshiqlar (100 dona)',
    name_ru: 'Пластиковые ложки (100 шт)',
    description_uz: 'Bir martalik plastik qoshiqlar. Shirinliklar va ovqatlanish uchun.',
    description_ru: 'Одноразовые пластиковые ложки. Для десертов и приема пищи.',
    price: 25000,
    items_per_pack: 100,
    stock: 600,
    images: ['https://picsum.photos/400/400?random=116'],
    category: 'sub-9-1'
  },
  {
    id: '17',
    slug: 'aralashtirgich-meshalka-1000-dona',
    name_uz: 'Aralashtirgich (Meshalka) (1000 dona)',
    name_ru: 'Размешиватели (Мешалки) (1000 шт)',
    description_uz: 'Kofe va choy uchun yog\'och aralashtirgichlar. Ekologik toza.',
    description_ru: 'Деревянные размешиватели для кофе и чая. Экологически чистые.',
    price: 35000,
    items_per_pack: 1000,
    stock: 400,
    images: ['https://picsum.photos/400/400?random=117'],
    category: 'sub-9-2'
  },

  // ===== AKSESSUARLAR =====
  {
    id: '18',
    slug: 'naychalar-trubochka-500-dona',
    name_uz: 'Naychalar (Trubochkalar) (500 dona)',
    name_ru: 'Трубочки для напитков (500 шт)',
    description_uz: 'Rangli plastik naychalar ichimliklar uchun. Kokteillar va sharbatlar uchun.',
    description_ru: 'Цветные пластиковые трубочки для напитков. Для коктейлей и соков.',
    price: 40000,
    items_per_pack: 500,
    stock: 450,
    images: ['https://picsum.photos/400/400?random=118'],
    category: 'sub-10-1'
  },
  {
    id: '19',
    slug: 'stakan-ushlagich-kapxolder-50-dona',
    name_uz: 'Stakan ushlagich (Kapxolder) (50 dona)',
    name_ru: 'Держатели для стаканов (Капхолдеры) (50 шт)',
    description_uz: 'Issiq stakanlar uchun qog\'oz ushlagichlar. Qo\'lni kuydirmaydi.',
    description_ru: 'Бумажные держатели для горячих стаканов. Защищают руки от ожогов.',
    price: 25000,
    items_per_pack: 50,
    stock: 300,
    images: ['https://picsum.photos/400/400?random=119'],
    category: 'sub-10-2'
  },

  // ===== QOSHIMCHA =====
  {
    id: '20',
    slug: 'zip-lock-paket-20x30-100-dona',
    name_uz: 'Zip-Lock paket 20x30sm (100 dona)',
    name_ru: 'Пакет Zip-Lock 20x30см (100 шт)',
    description_uz: 'Qayta ishlatiluvchi Zip-Lock paketlar. Oziq-ovqat va kichik buyumlarni saqlash uchun.',
    description_ru: 'Многоразовые пакеты Zip-Lock. Для хранения продуктов и мелких вещей.',
    price: 55000,
    items_per_pack: 100,
    stock: 250,
    images: ['https://picsum.photos/400/400?random=120'],
    category: 'sub-1-4'
  }
];