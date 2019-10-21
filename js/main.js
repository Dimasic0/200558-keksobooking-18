'use strict';

var TAGS_NUMBER = 8;
var ENTER_KEYCODE = 13;
var MIN_ADDRESS = 130;
var MAX_ADDRESS = 630;
var MIN_COORDINATE = 130;
var MAX_COORDINATE = 630;
var FEATURES = ['wifi dishwasher', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner', 'wifi parking', 'wifi washer'];
var convenienceName=['wifi','dishwasher','parking','washer','elevator','conditioner']
var convenienceIcon=[];
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
var wordBeginnings=0;
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
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
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
var popupTitle = popup.querySelector('.popup__title');
var popupTextAddress=popup.querySelector('.popup__text--address'),
    popupTextPrice=popup.querySelector('.popup__text--price'),
    popupType=popup.querySelector('.popup__type'),
    popupTextCapacity=popup.querySelector('.popup__text--capacity'),
    popupTextTime=popup.querySelector('.popup__text--time'),
    popupFeatures=popup.querySelector('.popup__features'),
    popupFeature=popupFeatures.querySelectorAll('.popup__feature'),
    convenienceIcon=[
      popupFeatures.querySelector('.popup__feature--wifi'),
      popupFeatures.querySelector('.popup__feature--dishwasher'),
      popupFeatures.querySelector('.popup__feature--parking'),
      popupFeatures.querySelector('.popup__feature--washer'),
      popupFeatures.querySelector('.popup__feature--elevator'),
      popupFeatures.querySelector('.popup__feature--conditioner')
      ];
    for(i=0; i<popupFeature.length; i++)
      {
    popupFeature[i].style.display='none';
      }
mapPinMain.addEventListener('mousedown', function () {
  activatePage(false);

  mapPins.onmousedown = function (evt) {
  if (evt.target.tagName === 'BUTTON' || evt.target.tagName === 'IMG') {
    console.log(evt);
    popupTitle.innerHTML = tags[0].offer.title;
    popupTextAddress.textContent=tags[0].offer.address;
    popupTextPrice.textContent=tags[0].offer.price+'₽/ночь';
    switch(tags[0].offer.type)
      {
        case 'flat':
          popupType.textContent='Квартира';
          break;
        case 'bungalo':
          popupType.textContent='Бунгало';
          break;
        case 'house':
          popupType.textContent='Дом';
        case 'palace':
          popupType.textContent='Дворец';
          break;
      }
    popupTextCapacity.textContent=tags[0].offer.rooms+' комнаты для '+tags[0].offer.guests+' гостей';
    popupTextTime.textContent='Заезд после '+tags[0].offer.checkin+' выезд до '+tags[0].offer.checkout;
    top:
    for(i=0; i<convenienceName.length; i++)
      {
        if(tags[0].offer.features.substring(wordBeginnings,wordBeginnings+convenienceName[i].length)===convenienceName[i])
        {
         convenienceIcon[i].style.display='block';
         wordBeginnings+=convenienceName[i].length+1;
            while(tags[0].offer.features.sharAt(wordBeginnings)===' ')
            {
              wordBeginnings++;
            }
            break top;
        }
      }
  }
}
});

function onMapPinMainPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage(false);
  }
}
mapPinMain.addEventListener('keydown', onMapPinMainPress);
