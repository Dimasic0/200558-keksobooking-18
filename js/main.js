'use strict'
var NUMBER_TAGS = 8;
var tags = [];
var MIN_ADDRESS = 130;
var MAX_ADDRESS = 630;
var MIN_COORDINATE = 130;
var MAX_COORDINATE = 630;
var MIN_ROOMS = 2;
var MAX_ROOMS = 7;
var clonedLabel;
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin');
var elementMap = document.querySelector('.map');
var PHOTO_ADDRESS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http:map__pin//o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner', 'wifi parking', 'wifi washer'];

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
elementMap.classList.remove('map--faded');
for (var i = 0; i < NUMBER_TAGS; i++) {
  var randomLocationX = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE);
  var randomLocationY = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE);
  var j = i--;
  while (i > 0 && j > 0) {
    if (tags[j].location.X === randomLocationX) {
      var randomLocationX = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE);
      j = i - 1;

    }
    if (tags[j].location.Y === randomLocationY) {
      var randomLocationY = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE);
      j = i - 1;

    }
    if (tags[j].location.X !== randomLocationX && tags[j].location.Y !== randomLocationY) {
      j--;
    }
  }
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
      description: 'Есть газовая печка стиральная машина синии стены',
      photos: PHOTO_ADDRESS[i],
    },

    location: {
      x: randomLocationX,
      y: randomLocationY
    }
  };
  clonedLabel = mapPin.cloneNode(true);
  clonedLabel.setAttribute('style', 'left:' + tags[i].location.x + '; top:' + tags[i].location.y + ';');
  clonedLabel.querySelector('img').src = tags[i].photos;
  elementMap.insertBefore(clonedLabel, mapPins);

}
