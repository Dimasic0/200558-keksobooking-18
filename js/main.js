'use strict';
var NUMBER_TAGS = 8;
var tags = [];
var MIN_ADDRESS = 130;
var MAX_ADDRESS = 630;
var MIN_COORDINATE = 130;
var MAX_COORDINATE = 630;
var MIN_ROOMS = 2;
var pictureNumber = 0;
var MAX_ROOMS = 7;
var clonedLabel;
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin');
var elementMap = document.querySelector('.map');
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner', 'wifi parking', 'wifi washer'];
var fragment = document.createDocumentFragment();

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function tagging(mark) {
  clonedLabel = mapPin.cloneNode(true);
  clonedLabel.setAttribute('style', 'left:' + mark.location.x + 'px; top:' + mark.location.y + 'px;');
  clonedLabel.querySelector('img').src = mark.offer.photos;
  return clonedLabel;
}

elementMap.classList.remove('map--faded');
for (var i = 0; i < NUMBER_TAGS; i++) {
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
      features: features[i],
      description: 'Есть газовая печка, стиральная машина, синие стены',
      photos: 'img/avatars/user0' + pictureNumber + '.png',
    },

    location: {
      x: randomLocationX,
      y: randomLocationY
    }
  };

  fragment.appendChild(tagging(tags[i]));
}

mapPins.appendChild(fragment);
