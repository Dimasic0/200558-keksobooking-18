'use strict';

var NUMBER_TAGS = 7;
var tags = [];
var MIN_ADDRESS = 130;
var MAX_ADDRESS = 630;
var MIN_COORDINATE = 130;
var MAX_COORDINATE = 630;
var MIN_ROOMS = 2;
var pictureNumber;
var MAX_ROOMS = 7;
var ENTER_KEYCODE = 13;
var adForm = document.querySelector('.ad-form');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin');
var elementMap = document.querySelector('.map');
var address = document.querySelector('#address');
var fieldset = document.querySelectorAll('fieldset');
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner', 'wifi parking', 'wifi washer'];
var fragment = document.createDocumentFragment();

var mapFilter = document.querySelector('.map__filter');
var any = mapFilter.querySelector('option[value="any"]');
var palace = mapFilter.querySelector('option[value="palace"]');
var flat = mapFilter.querySelector('option[value="flat"]');
var house = mapFilter.querySelector('option[value="house"]');
var bungalo = mapFilter.querySelector('option[value="bungalo"]');
var price = document.querySelector('#price');
for (var i = 0; i < 13; i++) {
  fieldset[i].disabled = true;
}

var x = Number.parseInt(mapPinMain.style.left, 10) + 32;
var y = Number.parseInt(mapPinMain.style.top, 10) + 32;
address.value = 'x:' + x + ' y:' + y;

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeMark(mark) {
  var clonedLabel;
  clonedLabel = mapPin.cloneNode(true);
  clonedLabel.setAttribute('style', 'left:' + mark.location.x + 'px; top:' + mark.location.y + 'px;');
  clonedLabel.querySelector('img').src = mark.offer.photos;
  return clonedLabel;
}

function cbsetPrice() {
  if (any.selected === true) {
    price.min = 0;
  }
  if (palace.selected === true) {
    price.min = 10000;
  }
  if (flat.selected === true) {
    price.min = 1000;
  }
  if (house.selected === true) {
    price.min = 5000;
  }
  if (bungalo.selected === true) {
    price.min = 0;
  }
}

elementMap.classList.remove('map--faded');
for (i = 0; i < NUMBER_TAGS; i++) {
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

function pageActivation() {
  for (i = 0; i < 13; i++) {
    fieldset[i].disabled = false;
  }
  adForm.classList.remove('ad-form--disabled');
}

function onHomeLabelPress() {
  pageActivation();
}

mapPinMain.addEventListener('mousedown', onHomeLabelPress);

function onHomeLabelEnterPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    pageActivation();
  }
}
mapPinMain.addEventListener('keydown', onHomeLabelEnterPress);
mapFilter.addEventListener('click', cbsetPrice);

function onMapFilterKeydown(evt) {
  if (evt.keyCode === 38 || evt.keyCode === 39 || evt.keyCode === 40 || evt.keyCode === 37) {
    cbsetPrice();
  }
}
mapFilter.addEventListener('keydown', onMapFilterKeydown);
