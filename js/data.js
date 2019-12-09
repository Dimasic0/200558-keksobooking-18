'use strict';
var TAGS_NUMBER = 8; // колличество меток
var ENTER_KEYCODE = 13; // Unicode клавише ENTER
var ESC_KEYCODE = 27;
var MIN_COORDINATE = 130; // минимальная координата
var MAX_COORDINATE = 630; // максимальная координата
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
]; // виды удобств
var prices = [125, 250, 375, 500, 625, 750, 875, 1000];
var MIN_ROOMS = 2; // минимальное количество комнат
var MAX_ROOMS = 7; // максимальное количество комнат
var popup = document.querySelector('#card').content.querySelector('.popup'); // карточка
var popupClone = popup.cloneNode(true); // клонирует карточку
var popupCloneTitle = popupClone.querySelector('.popup__title'); // заголовок в карточке
var popupCloneTextAddress = popupClone.querySelector('.popup__text--address'); // адрес
var popupCloneTextPrice = popupClone.querySelector('.popup__text--price'); // цена
var popupCloneType = popupClone.querySelector('.popup__type'); // тип в карточке
var popupCloneTextCapacity = popupClone.querySelector('.popup__text--capacity'); // комнаты
var popupCloneTextTime = popupClone.querySelector('.popup__text--time'); // время заезда и выезда
var popupCloneFeaturesContainer = popupClone.querySelector('.popup__features'); // список типов
var type = document.querySelector('#type');
var popupCloneDescription = popupClone.querySelector('.popup__description'); // описание
var popupClonePhoto = popupClone.querySelector('.popup__photo'); // фото в карточке
var popupCloneAvatar = popupClone.querySelector('.popup__avatar'); // аватар
var tags = []; // даные меток
var adForm = document.querySelector('.ad-form'); // форма.
var propertyTypes = [
  'flat',
  'bungalo',
  'house',
  'palace'
];
var mapPinMain = document.querySelector('.map__pin--main'); // кнопка
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin');
var map = document.querySelector('.map');
var headers = [
  'Квартира в центре Москвы',
  'Квартира на улице Севастопольской',
  'Квартира на улице Бабушкиной',
  'Дом на улице Севастопольской',
  'Дом на улице Гаврирова ',
  'Квартира на улице Яблоновской',
  'Квартира на улице Рашпилевской',
  'Квартира на улице Белозёрной'
];
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var address = document.querySelector('#address');
var adFormSubmit = document.querySelector('.ad-form__submit');
var fragment = document.createDocumentFragment();
var capacity = document.querySelector('#capacity');
var roomNumber = document.querySelector('#room_number');
var timein = document.querySelector('#timein');
var description = [
  'Есть телевизор, газовая плита, стиральная машина.',
  'Есть диван, мебельная стенка, микроволновая печь.',
  'Есть телевизор, кровать, шкаф для одежды',
  'Есть кухонный гарнитур, холодильник, электрическая плита.',
  'Есть кровать, тумба, микроволновая печь.',
  'Есть стиральная машина, телевизор',
  'Есть диван, шкаф для одежды',
  'Есть холодильник, микроволновая печь'
];
var timeArrivals = [12, 13, 14];
var timeout = document.querySelector('#timeout');
var mapFilter = document.querySelector('.map__filter');
var tagNumber;
var price = document.querySelector('#price');
var label;
var x=0;
var y=0;  
var popupClose = document.querySelector('.popup__close');
(function () {
  function getRandomInRange(min, max) { // генератор рандомных чисел
  return Math.floor(Math.random() * (max - min + 1)) + min; // переводит в нужный деапозон рандомное число
}

function makeMark(tagOptions) {
  label = mapPin.cloneNode(true);
  label.dataset.index = i + 1;
  label.setAttribute('style', 'left:' + tagOptions.location.x + 'px; top:' + tagOptions.location.y + 'px;');
  label.querySelector('img').src = tagOptions.author.avatar; // в картинку записаваем адрес аватара
  label.querySelector('img').dataset.index = i + 1;
    fragment.appendChild(label); // вставляем метку в
}
 
    function generateRandomFeatures() {
  var actualFeatures = [];
  for (var i = 0; i < features.length; i++) {
    if (getRandomInRange(0, 1)) {
      actualFeatures[actualFeatures.length] = features[i];
    }
  }
  return actualFeatures;
}
    
for (var i = 0; i < TAGS_NUMBER; i++) { // записывает свойста меткам
  var randomLocationX = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE); // создает рандомную координату х
  var randomLocationY = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE); // создает рандомную координату у
  var checkTime = timeArrivals[getRandomInRange(0, 2)];
  tags[i] = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png' // адрес аватара
    },
    offer: {
      title: headers[i], // заголовок
      address: randomLocationX + ', ' + randomLocationY, // адрес
      price: prices[i], // цена
      type: propertyTypes[getRandomInRange(0, 3)], // тип
      rooms: getRandomInRange(MIN_ROOMS, MAX_ROOMS), // количество комнат
      guests: getRandomInRange(1, 5), // количество гостей которых можно разместить
      checkin: checkTime, // время заезда
      checkout: checkTime, // время выезда
      features: generateRandomFeatures(), // удобство
      description: description[getRandomInRange(0, 7)], // описание
      photos: 'img/avatars/user0' + (i + 1) + '.png', // адрес фотографии
    },
    location: {
      x: randomLocationX, // координата х
      y: randomLocationY //  координата у
    }
  };
  makeMark(tags[i]); // создаем метки
}
})();