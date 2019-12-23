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
      if (!isActive) { // если нужно активировать сайт то
        address.disabled = true;
        adForm.classList.remove('ad-form--disabled'); // разрешает изменять форму
        map.classList.remove('map--faded'); // убирает круг вокруг метки и текст
        var mapFiltersContainer = document.querySelector('.map__filters-container');
        map.insertBefore(fragment, mapFiltersContainer); // вставляет метки
        mapPins.appendChild(popupClone); // вставляет карточку
        coordinates = String(Number.parseFloat(mapPinStyle.left) + (Number.parseFloat(mapPinStyle.width) / 2)) + ' ' + String(Number.parseFloat(mapPinStyle.top) + Number.parseFloat(mapPinStyle.height));
      } else {
        coordinates = String(Number.parseFloat(mapPinStyle.left) + (Number.parseFloat(mapPinStyle.width) / 2)) + ' ' + String(Number.parseFloat(mapPinStyle.top) + (Number.parseFloat(mapPinStyle.height) / 2));
      }
      address.value = coordinates;
    }
  };

  window.ENTER_KEYCODE = 13;
})();
