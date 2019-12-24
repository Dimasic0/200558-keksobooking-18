'use strict';
(function () {
  var adForm = document.querySelector('.ad-form'); // форма.
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapPin = document.querySelector('.map__pin');
  var mapPinStyle = getComputedStyle(mapPin);
  var address = document.querySelector('#address');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var popupClone = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  var fragment = document.createDocumentFragment();
  var coordinates;
  var decimalPlaces=0;
  window.data = {
    map: map,
    popup: document.querySelector('#card').content.querySelector('.popup'),
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
         coordinates = (parseFloat(mapPinStyle.left) + (parseFloat(mapPinStyle.width) / 2)).toFixed(decimalPlaces) + ' ' + (parseFloat(mapPinStyle.top) + (parseFloat(mapPinStyle.height) / 2)).toFixed(decimalPlaces);
      } else {// если нужно активировать сайт то
		address.disabled = true;
        adForm.classList.remove('ad-form--disabled'); // разрешает изменять форму
        map.classList.remove('map--faded'); // убирает круг вокруг метки и текст
        var mapFiltersContainer = document.querySelector('.map__filters-container');
        map.insertBefore(fragment, mapFiltersContainer); // вставляет метки
        mapPins.appendChild(popupClone); // вставляет карточку
        coordinates = (parseFloat(mapPinStyle.left) + (parseFloat(mapPinStyle.width) / 2)).toFixed(decimalPlaces) + ' ' + String(parseFloat(mapPinStyle.top) + parseFloat(mapPinStyle.height));
      }
      address.value = coordinates;
    }
  };

  window.ENTER_KEYCODE = 13;
})();
