'use strict';

var ESC_KEYCODE = 27;
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
var fieldset = document.querySelectorAll('fieldset');
var fragment = document.createDocumentFragment();
var mapFilter = document.querySelector('.map__filter');
//var price = document.querySelector('#price');
var roomNumber = document.querySelector('#room_number');
var x = Number.parseInt(mapPinMain.style.left, 10) + LABEL_HALF;
var y = Number.parseInt(mapPinMain.style.top, 10) + LABEL_HEIGHT;
var adFormSubmit = document.querySelector('.ad-form__submit');
var popup = document.querySelector('#card').content.querySelector('.popup');
var label = [];
var clonePopup;

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeMark(tagOptions) {
  label[i] = mapPin.cloneNode(true);
  label[i].setAttribute('style', 'left:' + tagOptions.location.x + 'px; top:' + tagOptions.location.y + 'px;');
  label[i].querySelector('img').src = tagOptions.offer.photos;
  fragment.appendChild(label[i]);
}
function activatePage(property) {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = property;
  }
  if (!property) {
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    mapPins.appendChild(fragment);
  }
}
clonePopup = popup.cloneNode(true);
clonePopup.style.display = 'none';
map.appendChild(clonePopup);
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
  makeMark(tags[i]);
}

activatePage(true);


function onHomeLabelPress() {
  activatePage(false);
}

mapPinMain.addEventListener('mousedown', onHomeLabelPress);

function onMapPinMainPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage(false);
  }
}
mapPinMain.addEventListener('keydown', onMapPinMainPress);
