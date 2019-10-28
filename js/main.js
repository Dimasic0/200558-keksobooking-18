'use strict';

var TAGS_NUMBER = 8; // колличество меток
var ENTER_KEYCODE = 13; // Unicode клавише ENTER
var MIN_ADDRESS = 135; // минималный адрес
var MAX_ADDRESS = 630; // максимальный адрес
var MIN_COORDINATE = 130; // минимальная координата
var MAX_COORDINATE = 630; // максимальная координата
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; // виды удобств
var MIN_ROOMS = 2; // минимальное количество комнат
var MAX_ROOMS = 7; // максимальное количество комнат
var popup = document.querySelector('#card').content.querySelector('.popup'); // карточка
var popupTitle = popup.querySelector('.popup__title'); // заголовок в карточке
var popupTextAddress = popup.querySelector('.popup__text--address'); // адрес
var popupTextPrice = popup.querySelector('.popup__text--price'); // цена
var popupType = popup.querySelector('.popup__type'); // тип в карточке
var popupTextCapacity = popup.querySelector('.popup__text--capacity'); // комнаты
var popupTextTime = popup.querySelector('.popup__text--time'); // время заезда и выезда
var popupFeaturesContainer = popup.querySelector('.popup__features'); // список типов
var popupDescription = popup.querySelector('.popup__description'); // описание
var popupPhoto = popup.querySelector('.popup__photo'); // фото в карточке
var popupAvatar = popup.querySelector('.popup__avatar'); // аватар
var CONVENIENCE_ICOM = [ // удобство
  popupFeaturesContainer.querySelector('.popup__feature--wifi'),
  popupFeaturesContainer.querySelector('.popup__feature--dishwasher'),
  popupFeaturesContainer.querySelector('.popup__feature--parking'),
  popupFeaturesContainer.querySelector('.popup__feature--washer'),
  popupFeaturesContainer.querySelector('.popup__feature--elevator'),
  popupFeaturesContainer.querySelector('.popup__feature--conditioner')
];
var tags = []; // даные меток
var adForm = document.querySelector('.ad-form'); // форма.
var mapPinMain = document.querySelector('.map__pin--main'); // кнопка
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin');
var map = document.querySelector('.map');
var fieldsets = document.querySelectorAll('fieldset');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var fragment = document.createDocumentFragment();
var facilities = document.createDocumentFragment();

function getRandomInRange(min, max) { // генератор рандомных чисел
  return Math.floor(Math.random() * (max - min + 1)) + min; // переводит в нужный деапозон рандомное число
}

function makeMark(tagOptions) {
  var label = mapPin.cloneNode(true);
  label.setAttribute('style', 'left:' + tagOptions.location.x + 'px; top:' + tagOptions.location.y + 'px;');
  label.querySelector('img').src = tagOptions.author.avatar; // в картинку записаваем адрес аватара
  fragment.appendChild(label); // вставляем метку в
}

function generateRandomAmenities() { // генератор удобств.
  var features = []; // переменная для рандомного числа
  for (var i = 0; i < FEATURES.length; i++) {
    if (getRandomInRange(0, 1) === 1) { // если нужно добавить это удобство
      features[features.length] = FEATURES[i]; // записывает удобство
    }
  }
  return features; // возвращает в строку удобств
}

function activatePage(property) { // функция выдает состояние сайта.
  for (i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = property; // разрешает или запрещает изменять форму.
  }
  if (!property) { // если нужно активировать сайт то
    adForm.classList.remove('ad-form--disabled'); // разрешает изменять форму
    map.classList.remove('map--faded'); // убирает круг вокруг метки и текст
    map.insertBefore(fragment, mapFiltersContainer); // вставляет метки
    mapPins.appendChild(popup); // вставляет карточку
  }
}
var popupClone = popup.cloneNode(true); // клонирует карточку
popupClone.style.display = 'none'; // убирает карточку
map.appendChild(popupClone); // вставляет клон
for (var i = 0; i < TAGS_NUMBER; i++) { // записывает свойста меткам
  var randomLocationX = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE); // создает рандомную координату х
  var randomLocationY = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE); // создает рандомную координату у
  tags[i] = {// данные о метке
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png' // адрес аватара
    },
    offer: {
      title: 'Заголовок объявления', // заголовок
      address: getRandomInRange(MIN_ADDRESS, MAX_ADDRESS) + ',' + getRandomInRange(MIN_ADDRESS, MAX_ADDRESS), // адрес
      price: 1000, // цена
      type: 'palace', // тип
      rooms: getRandomInRange(MIN_ROOMS, MAX_ROOMS), // количество комнат
      guests: getRandomInRange(1, 5), // количество гостей которых можно разместить
      checkin: '12:00', // время заезда
      checkout: '12:00', // время выезда
      features: generateRandomAmenities(), // удобство
      description: 'Есть газовая печка, стиральная машина, синие стены', // описание
      photos: 'img/avatars/user0' + (i + 1) + '.png', // адрес фотографии
    },

    location: {
      x: randomLocationX, // координата х
      y: randomLocationY //  координата у
    }
  };
  makeMark(tags[i]); // создаем метки
}
activatePage(true); //
popupFeaturesContainer.innerHTML = null; // отключить
mapPinMain.addEventListener('mousedown', function () {
  activatePage(false);
  popupTitle.innerHTML = tags[0].offer.title; // Заголовок в карточке
  popupTextAddress.textContent = tags[0].offer.address; // адрес в карточке
  popupTextPrice.textContent = tags[0].offer.price + '₽/ночь'; // цена в карточке
  switch (tags[0].offer.type) { // тип жилья
    case 'flat': // если жилью квартира то
      popupType.textContent = 'Квартира'; // выводим в метку слово <квартира>
      break;
    case 'bungalo': // если жильё Бунгало то
      popupType.textContent = 'Бунгало'; // выводим в метку слово <Бунгало>
      break;
    case 'house': // если жилью дом то
      popupType.textContent = 'Дом'; // выводим слово <Дом>
      break;
    case 'palace':
      popupType.textContent = 'Дворец'; // Выводим слово <дворец>
      break;
  }
  popupTextCapacity.textContent = tags[0].offer.rooms + ' комнаты для ' + tags[0].offer.guests + ' гостей';
  popupTextTime.textContent = 'Заезд после ' + tags[0].offer.checkin + ' выезд до ' + tags[0].offer.checkout; // врема заезда и выезда
  for (var INDEX_1 = 0; INDEX_1 < tags[0].offer.features.length; INDEX_1++) {
    for (i = 0; i < FEATURES.length; i++) {
      if (tags[0].offer.features[INDEX_1] === FEATURES[i]) {
        facilities.appendChild(CONVENIENCE_ICOM[i]);
      }
    }
  }
  popupFeaturesContainer.appendChild(facilities);
  popupDescription.textContent = tags[0].offer.description; // Написать описание
  popupPhoto.src = tags[0].offer.photos; // фото на карте
  popupAvatar.src = tags[0].author.avatar; // аватарка на карте
});

function onMapPinMainPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) { // если нажал на enter
    activatePage(false); // активировать сайт
  }
}
mapPinMain.addEventListener('keydown', onMapPinMainPress); // если нажимаю enter
