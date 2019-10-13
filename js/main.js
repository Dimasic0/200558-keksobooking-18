'use strict';

var TAGS_NUMBER = 8;
var ENTER_KEYCODE = 13;
var MIN_ADDRESS = 130;
var MAX_ADDRESS = 630;
var MIN_COORDINATE = 130;
var MAX_COORDINATE = 630;
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner', 'wifi parking', 'wifi washer'];
var MIN_ROOMS = 2;
var MAX_ROOMS = 7;
var LABEL_HALF = 32;
var LABEL_HEIGHT = 87;
var pictureNumber;
var tags = [];
var adForm = document.querySelector('.ad-form');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin');
var map = document.querySelector('.map');
var address = document.querySelector('#address');
var fieldset = document.querySelectorAll('fieldset');
var fragment = document.createDocumentFragment();
var mapFilter = document.querySelector('.map__filter');
var price = document.querySelector('#price');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var x = Number.parseInt(mapPinMain.style.left, 10) + LABEL_HALF;
var y = Number.parseInt(mapPinMain.style.top, 10) + LABEL_HEIGHT;
var adFormSubmit = document.querySelector('.ad-form__submit');
var clonedLabel=[];
var mapCard=document.querySelector('.popup');
address.value = 'x:' + x + ' y:' + y;

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeMark(tags) {
  tags[i] = mapPin.cloneNode(true);
  tags[i].setAttribute('style', 'left:' + tags.location.x + 'px; top:' + tags.location.y + 'px;');
  tags[i].querySelector('img').src = tags.offer.photos;
  tags[i].addEventListener('click',function ()
  {

  });
  return tags[i];
}

function onSetPrice(evt) {
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
  console.log('lok');
}

function pageActivation(property) {
  for (i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = property;
  }
  if (property === false) {
    adForm.classList.remove('ad-form--disabled');
  }
}
map.classList.remove('map--faded');
for (var i = 0; i < TAGS_NUMBER; i++) {
  var randomLocationX = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE);
  var randomLocationY = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE);
  pictureNumber = i + 1;
  tags[i] = {
    author: {
      avatar: 'img/avatars/user0' + getRandomInRange(1, 8) + '.png'
    },

    offer: {
      title: 'Заголовок объявления',
      address: getRandomInRange(MIN_ADDRESS, MAX_ADDRESS) + ',' + getRandomInRange(MIN_ADDRESS, MAX_ADDRESS),
      price: 1000,
      type: 'palace',
      rooms: getRandomInRange(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInRange(1, 5),
      checkin: '12:00',
      checkout: '12:00',
      features: FEATURES[i],
      description: 'Есть газовая печка, стиральная машина, синие стены',
      photos: 'img/avatars/user0' + pictureNumber + '.png',
    },

    location: {
      x: randomLocationX,
      y: randomLocationY
    }
  };
    fragment.appendChild(makeMark(tags[i]));
}
mapPins.appendChild(fragment);

pageActivation(true);

function onHomeLabelPress() {
  pageActivation(false);
}

mapPinMain.addEventListener('mousedown', onHomeLabelPress);
mapFilter.addEventListener('change', onSetPrice);

function onMapPinMainPressingEnter(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    pageActivation(false);
  }
}
mapPinMain.addEventListener('keydown', onMapPinMainPressingEnter);

adFormSubmit.addEventListener('mousedown', function () {
  if (capacity.value > roomNumber.value) {
    capacity.setCustomValidity('Количество гостей должно быть меньше или равно количеству комнат.');
  } else {
    capacity.setCustomValidity('');
  }
});
mapPin.addEventListener('mousedown',function () {

});

map.appendChild(mapCard.cloneNode(true));
