'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var price = document.querySelector('#price');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
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
  window.data = {
    map: map,
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
      for (var i = 0; i < adFormFieldsets.length; i++) {
        adFormFieldsets[i].disabled = isActive; // разрешает или запрещает изменять форму.
      }
      if (isActive) {
        coordinates = (parseFloat(mapPinStyle.left) + (parseFloat(mapPinStyle.width) / 2) + positiveError).toFixed(decimalPlaces) + ' ' + (parseFloat(mapPinStyle.top) + (parseFloat(mapPinStyle.height) / 2) - negativeError).toFixed(decimalPlaces);
      } else { // если нужно активировать сайт то
        address.disabled = true;
        adForm.classList.remove('ad-form--disabled'); // разрешает изменять форму
        map.classList.remove('map--faded'); // убирает круг вокруг метки и текст
        mapPin.parentNode.insertBefore(fragment, mapPin.nextSibling);
        mapPins.appendChild(popupClone); // вставляет карточку
        coordinates = (parseFloat(mapPinStyle.left) + (parseFloat(mapPinStyle.width) / 2) + positiveError).toFixed(decimalPlaces) + ' ' + String(parseFloat(mapPinStyle.top) + parseFloat(mapPinStyle.height) - negativeError);
      }
      address.value = coordinates;
    }
  };
  window.data.ENTER_KEYCODE = 13;
  window.adForm = adForm;
  window.price = price;
})();
