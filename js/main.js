'use strict';

var TAGS_NUMBER = 8; // колличество меток
var ENTER_KEYCODE = 13; // Unicode клавише ENTER
var MIN_ADDRESS = 130; // минималный адрес
var MAX_ADDRESS = 630; // максимальный адрес
var MIN_COORDINATE = 130; // минимальная координата
var MAX_COORDINATE = 630; // максимальная координата
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; // виды удобств
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
var popupCloneDescription = popupClone.querySelector('.popup__description'); // описание
var popupClonePhoto = popupClone.querySelector('.popup__photo'); // фото в карточке
var popupCloneAvatar = popupClone.querySelector('.popup__avatar'); // аватар
var tags = []; // даные меток
var adForm = document.querySelector('.ad-form'); // форма.
var mapPinMain = document.querySelector('.map__pin--main'); // кнопка
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin');
var map = document.querySelector('.map');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var address = document.querySelector('#address');
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
  for (i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = property; // разрешает или запрещает изменять форму.
  }
  if (!property) { // если нужно активировать сайт то
    address.disabled = true;
    adForm.classList.remove('ad-form--disabled'); // разрешает изменять форму
    map.classList.remove('map--faded'); // убирает круг вокруг метки и текст
    map.insertBefore(fragment, mapFiltersContainer); // вставляет метки
    popupClone.style.display = 'block';
    mapPins.appendChild(popupClone); // вставляет карточку
  }
}
popupCloneFeaturesContainer.innerHTML = null; // отключить
popupClone.style.display = 'none';
mapPins.appendChild(popupClone); // вставляет клон
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
mapPinMain.addEventListener('mousedown', function () {
  activatePage(false);
  var tagsOffer = tags[0].offer;
  popupCloneTitle.innerHTML = tagsOffer.title; // Заголовок в карточке
  popupCloneTextAddress.textContent = tagsOffer.address; // адрес в карточке
  popupCloneTextPrice.textContent = tagsOffer.price + '₽/ночь'; // цена в карточке
  switch (tagsOffer.type) { // тип жилья
    case 'flat': // если жилью квартира то
      popupCloneType.textContent = 'Квартира'; // выводим в метку слово <квартира>
      break;
    case 'bungalo': // если жильё Бунгало то
      popupCloneType.textContent = 'Бунгало'; // выводим в метку слово <Бунгало>
      break;
    case 'house': // если жилью дом то
      popupCloneType.textContent = 'Дом'; // выводим слово <Дом>
      break;
    case 'palace':
      popupCloneType.textContent = 'Дворец'; // Выводим слово <дворец>
      break;
  }
  popupCloneTextCapacity.textContent = tagsOffer.rooms + ' комнаты для ' + tagsOffer.guests + ' гостей';
  popupCloneTextTime.textContent = 'Заезд после ' + tagsOffer.checkin + ' выезд до ' + tagsOffer.checkout; // врема заезда и выезда
  for (var j = 0; j < tags[0].offer.features.length; j++) {
    for (i = 0; i < FEATURES.length; i++) {
      if (tagsOffer.features[j] === FEATURES[i]) {
        popupCloneFeaturesContainer.insertAdjacentHTML('beforeEnd', '<li class="popup__feature popup__feature--' + FEATURES[i] + '"></li>');
      }
    }
  }
  popupCloneFeaturesContainer.appendChild(facilities);
  popupCloneDescription.textContent = tagsOffer.description; // Написать описание
  popupClonePhoto.src = tagsOffer.photos; // фото на карте
  popupCloneAvatar.src = tagsOffer.avatar; // аватарка на карте
});

function onMapPinMainPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) { // если нажал на enter
    activatePage(false); // активировать сайт
  }
}
mapPinMain.addEventListener('keydown', onMapPinMainPress); // если нажимаю enter
