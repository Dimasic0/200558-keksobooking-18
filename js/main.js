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
var tags = [];
var adForm = document.querySelector('.ad-form');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin');
var map = document.querySelector('.map');
var fieldsets = document.querySelectorAll('fieldset');
var fragment = document.createDocumentFragment();
var popup = document.querySelector('#card').content.querySelector('.popup');
var clonePopup;

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeMark(tagOptions) {
  var label = mapPin.cloneNode(true);
  label.setAttribute('style', 'left:' + tagOptions.location.x + 'px; top:' + tagOptions.location.y + 'px;');
  label.querySelector('img').src = tagOptions.author.avatar;
  fragment.appendChild(label);
}

function activatePage(property) {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = property;
  }
  if (!property) {
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    mapPins.appendChild(fragment);
    mapPins.appendChild(popup);
  }
}
clonePopup = popup.cloneNode(true);
clonePopup.style.display = 'none';
map.appendChild(clonePopup);
for (var i = 0; i < TAGS_NUMBER; i++) {
  var randomLocationX = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE);
  var randomLocationY = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE);
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
      photos: 'img/avatars/user0' + i + 1 + '.png',
    },

    location: {
      x: randomLocationX,
      y: randomLocationY
    }
  };
  makeMark({
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
      photos: 'img/avatars/user0' + i + 1 + '.png',
    },

    location: {
      x: randomLocationX,
      y: randomLocationY
    }
  });
}

activatePage(true);

mapPinMain.addEventListener('mousedown', function () {
  activatePage(false);
});

function onMapPinMainPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage(false);
  }
}
mapPinMain.addEventListener('keydown', onMapPinMainPress);
mapPins.onmousedown= function (evt) {
  if (evt.target.tagName === 'BUTTON' || evt.target.tagName === 'IMG') {
    console.log(evt);
  }
}
