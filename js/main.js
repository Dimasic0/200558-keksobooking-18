'use strict';

var TAGS_NUMBER = 8; // колличество меток
var ENTER_KEYCODE = 13; // Unicode клавише ENTER
var ESC_KEYCODE = 27;
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
var type = document.querySelector('#type');
var popupCloneDescription = popupClone.querySelector('.popup__description'); // описание
var popupClonePhoto = popupClone.querySelector('.popup__photo'); // фото в карточке
var popupCloneAvatar = popupClone.querySelector('.popup__avatar'); // аватар
var tags = []; // даные меток
var adForm = document.querySelector('.ad-form'); // форма.
var propertyTypes = ['flat', 'bungalo', 'house', 'palace'];
var minimumPrices = [1000, 0, 5000, 10000];
var mapPinMain = document.querySelector('.map__pin--main'); // кнопка
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin');
var map = document.querySelector('.map');
var headers = ['Квартира в центре Москвы', 'Квартира на улице Севастопольской', 'Квартира на улице Бабушкиной', 'Дом на улице Севастопольской', 'Дом на улице Гаврирова ', 'Квартира на улице Яблоновской', 'Квартира на улице Рашпилевской', 'Квартира на улице Белозёрной'];
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var address = document.querySelector('#address');
var adFormSubmit = document.querySelector('.ad-form__submit');
var fragment = document.createDocumentFragment();
var facilities = document.createDocumentFragment();
var capacity = document.querySelector('#capacity');
var roomNumber = document.querySelector('#room_number');
var timein = document.querySelector('#timein');
var description = ['Есть телевизор, газовая плита, стиральная машина.', 'Есть диван, мебельная стенка, микроволновая печь.', 'Есть телевизор, кровать, шкаф для одежды', 'Есть кухонный гарнитур, холодильник, электрическая плита.', 'Есть кровать, тумба, микроволновая печь.', 'Есть стиральная машина, телевизор', 'Есть диван, шкаф для одежды', 'Есть холодильник, микроволновая печь'];
var timeArrivals = [12, 13, 14, 12, 13, 14, 12, 13];
var timeout = document.querySelector('#timeout');
var mapFilter = document.querySelector('.map__filter');
var mapFilterAny = mapFilter.querySelector('option[value="any"]');
var mapFilterPalace = mapFilter.querySelector('option[value="palace"]');
var mapFilterFlat = mapFilter.querySelector('option[value="flat"]');
var mapFilterhouse = mapFilter.querySelector('option[value="house"]');
var mapFilterbungalo = mapFilter.querySelector('option[value="bungalo"]');
var tagNumber;
var minimumPrice = 0;

function getRandomInRange(min, max) { // генератор рандомных чисел
  return Math.floor(Math.random() * (max - min + 1)) + min; // переводит в нужный деапозон рандомное число
}

function makeMark(tagOptions) {
  var label = mapPin.cloneNode(true);
  label.dataset.index = i + 1;
  label.setAttribute('style', 'left:' + tagOptions.location.x + 'px; top:' + tagOptions.location.y + 'px;');
  label.querySelector('img').src = tagOptions.author.avatar; // в картинку записаваем адрес аватара
  label.querySelector('img').dataset.index = i + 1;
  fragment.appendChild(label); // вставляем метку в
}

function generateRandomAmenities() { // генератор удобств.
  var features = []; // переменная для рандомного числа
  var t = 0;
  for (var i = 0; i < FEATURES.length; i++) {
    if (getRandomInRange(0, 1) === 1) { // если нужно добавить это удобство
      features[t] = FEATURES[i]; // записывает удобство
      t++;
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
address.value = Number.parseInt(mapPinMain.style.left + mapPinMain.style.width / 2) + ' ' + Number.parseInt(mapPinMain.style.top + mapPinMain.style.height);
popupCloneFeaturesContainer.innerHTML = null; // отключить
popupClone.style.display = 'none';
mapPins.appendChild(popupClone); // вставляет клон
for (var i = 0; i < TAGS_NUMBER; i++) { // записывает свойста меткам
  var randomLocationX = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE); // создает рандомную координату х
  var randomLocationY = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE); // создает рандомную координату у
  var checkTime = timeArrivals[getRandomInRange(0, 7)];
  tags[i] = { // данные о метке
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png' // адрес аватара
    },
    offer: {
      title: headers[i], // заголовок
      address: getRandomInRange(MIN_ADDRESS, MAX_ADDRESS) + ',' + getRandomInRange(MIN_ADDRESS, MAX_ADDRESS), // адрес
      price: 100, // цена
      type: propertyTypes[getRandomInRange(0, propertyTypes.length - 1)], // тип
      rooms: getRandomInRange(MIN_ROOMS, MAX_ROOMS), // количество комнат
      guests: getRandomInRange(1, 5), // количество гостей которых можно разместить
      checkin: checkTime, // время заезда
      checkout: checkTime, // время выезда
      features: generateRandomAmenities(), // удобство
      description: description[getRandomInRange(0, 7)], // описание
      photos: 'img/avatars/user0' + (i + 1) + '.png', // адрес фотографии
    },

    location: {
      x: randomLocationX, // координата х
      y: randomLocationY //  координата у
    }
  };
  for (var k = 0; k < propertyTypes.length; k++) {
    if (tags[i].offer.type === FEATURES[k]) {
      minimumPrice = minimumPrices[k];
    }
  }
  tags[i].offer.price = getRandomInRange(minimumPrice, 1000000);
  makeMark(tags[i]); // создаем метки
}
activatePage(true); //
mapPinMain.onkeydown = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage(false);
    document.onkeydown = function (pressedKey) {
      if (pressedKey.keyCode === ENTER_KEYCODE) {
        popupClone.style.display = 'block';
      }
      if (pressedKey.keyCode === ESC_KEYCODE) {
        popupClone.style.display = 'none';
      }
    };
  }
};
/*mapPinMain.addEventListener('mousedown', function () {
  activatePage(false);
  popupCloneFeaturesContainer.innerHTML = null;
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
});*/

function onMapPinMainPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) { // если нажал на enter
    activatePage(false); // активировать сайт
  }
}

type.onchange = function (evt) {
  mapFilterAny.selected = false;
  mapFilterPalace.selected = false;
  mapFilterFlat.selected = false;
  mapFilterhouse.selected = false;
  mapFilterbungalo.selected = false;
  switch (evt.target.value) {
    case 'any':
      price.min = 0;
      mapFilterAny.selected = true;
      break;
    case 'palace':
      price.min = 10000;
      mapFilterPalace.selected = true;
      break;
    case 'flat':
      price.min = 1000;
      mapFilterFlat.selected = true;
      break;
    case 'house':
      price.min = 5000;
      mapFilterhouse.selected = true;
      break;
    case 'bungalo':
      price.min = 0;
      mapFilterbungalo.selected = true;
      break;
  }
};


timein.onchange = function (evt) {
  timeout.querySelector('option[value="' + evt.target.value + '"]').selected = true;
};
timeout.onchange = function (evt) {
  timein.querySelector('option[value="' + evt.target.value + '"]').selected = true;
};

mapPinMain.addEventListener('keydown', onMapPinMainPress); // если нажимаю enter
adFormSubmit.onmousedown = function () {
  if (+capacity.value > +roomNumber.value && +roomNumber.value !== '100') {
    capacity.setCustomValidity('Количество гостей должно быть меньше или равно количеству комнат.');
  } else if (roomNumber.value !== '100') {
    capacity.setCustomValidity('');
  } else if (capacity.value !== '0') {
    capacity.setCustomValidity('Не для гостей.');
  } else {
    capacity.setCustomValidity('');
  }
};
var popupFeatures = popupClone.querySelector('.popup__features');

map.onmousedown = function (evt) {
  if (evt.target.tagName === 'IMG' || evt.target.tagName === 'BUTTON') {
    activatePage(false);
    tagNumber = evt.target.dataset.index;
    popupCloneFeaturesContainer.innerHTML = null;
    // var tagsOffer = tags[tagNumber - 1].offer;
    popupCloneTitle.innerHTML = tags[tagNumber - 1].offer.title; // Заголовок в карточке
    popupCloneTextAddress.textContent = tags[tagNumber - 1].offer.address; // адрес в карточке
    popupCloneTextPrice.textContent = tags[tagNumber - 1].offer.price + '₽/ночь'; // цена в карточке
    switch (tags[tagNumber - 1].offer.type) { // тип жилья
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
    popupCloneTextCapacity.textContent = tags[tagNumber - 1].offer.rooms + ' комнаты для ' + tags[tagNumber - 1].offer.guests + ' гостей';
    popupCloneTextTime.textContent = 'Заезд после ' + tags[tagNumber - 1].offer.checkin + ' выезд до ' + tags[tagNumber - 1].offer.checkout; // врема заезда и выезда
    for (var j = 0; j < tags[0].offer.features.length; j++) {
      for (i = 0; i < FEATURES.length; i++) {
        if (tags[tagNumber - 1].offer.features[j] === FEATURES[i]) {
          popupCloneFeaturesContainer.insertAdjacentHTML('beforeEnd', '<li class="popup__feature popup__feature--' + FEATURES[i] + '"></li>');
        }
      }
    }
    popupCloneFeaturesContainer.appendChild(facilities);
    popupCloneDescription.textContent = tags[tagNumber - 1].offer.description; // Написать описание
    popupClonePhoto.src = tags[tagNumber - 1].author.avatar; // фото на карте
    popupCloneAvatar.src = tags[tagNumber - 1].author.avatar; // аватарка на карте
  }
};
mapPinMain.onmousedown = function () {
  activatePage(false);
};

mapFilter.onchange = function onMapFilterChange(evt) {
  switch (evt.target.value) {
    case 'any':
      price.min = 0;
      break;
    case 'palace':
      price.min = 10000;
      break;
    case 'flat':
      price.min = 1000;
      break;
    case 'house':
      price.min = 5000;
      break;
    case 'bungalo':
      price.min = 0;
      break;
  }
};
