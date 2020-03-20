'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var price = document.querySelector('#price');
  var fieldset = adForm.querySelectorAll('fieldset');
  var mapPin = document.querySelector('.map__pin');
  var mapPinStyle = getComputedStyle(mapPin);
  var address = document.querySelector('#address');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var popup = document.querySelector('#card').content.querySelector('.popup');
  var popupClone = popup.cloneNode(true);
  var fragment = document.createDocumentFragment();
  var coordinates;
  var decimalPlaces = 0;
  var positiveError = 2;
  var negativeError = 3;
  var error = document.querySelector('#error').content.querySelector('.error');
  var errorClone=error.cloneNode(true);
  var type = document.querySelector('#type');
  window.data = {
    map: map,
    type: type,
    errorClone:errorClone,
    error: error,
    popup: popup,
    popupClone: popupClone,
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    tags: [],
    mapPin: mapPin,
    mapPinStyle: mapPinStyle,
    label: [],
    address: address,
    fragment: fragment,
    mapPins: mapPins,
    activatePage: function (isActive) { // функция выдает состояние сайта.
      for (var i = 0; i < fieldset.length; i++) {
        fieldset[i].disabled = isActive; // разрешает или запрещает изменять форму.
      }
      if (isActive) {
        coordinates = (parseFloat(mapPinStyle.left) + (parseFloat(mapPinStyle.width) / 2) + positiveError).toFixed(decimalPlaces) + ' ' + (parseFloat(mapPinStyle.top) + (parseFloat(mapPinStyle.height) / 2) - negativeError).toFixed(decimalPlaces);
        adForm.classList.add('ad-form--disabled');
      } else { // если нужно активировать сайт то
        address.disabled = true;
        adForm.classList.remove('ad-form--disabled'); // разрешает изменять форму
        map.classList.remove('map--faded'); // убирает круг вокруг метки и текст
        mapPin.parentNode.insertBefore(fragment, mapPin.nextSibling);
        mapPins.appendChild(popupClone); // вставляет карточку
        coordinates = (parseFloat(mapPinStyle.left) - (parseFloat(mapPinStyle.width) / 2) + positiveError).toFixed(decimalPlaces) + ' ' + String(parseFloat(mapPinStyle.top) - parseFloat(mapPinStyle.height) - negativeError);
      }
      address.value = coordinates;
    },
    mistake: function () {
    errorClone.classList.add('visible');
  }
  };
  window.data.ENTER_KEYCODE = 13;
  window.adForm = adForm;
  window.price = price;
  window.fieldset = fieldset;
  window.mapPinMain: document.querySelector('.map__pin--main');
})();
