'use strict';
(function () {
  var adForm = document.querySelector('.ad-form'); // форма.
  var adFormFieldsets = adForm.querySelectorAll('fieldset');

  window.data = {
    map: document.querySelector('.map'),
    popup: document.querySelector('#card').content.querySelector('.popup'),
    popupClone: document.querySelector('#card').content.querySelector('.popup').cloneNode(true),
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    tags: [],
    fragment: document.createDocumentFragment(),
    mapPins: document.querySelector('.map__pins'),
    activatePage: function (property) { // функция выдает состояние сайта.
      for (var i = 0; i < adFormFieldsets.length; i++) {
        adFormFieldsets[i].disabled = property; // разрешает или запрещает изменять форму.
      }
      if (!property) { // если нужно активировать сайт то
        var address = document.querySelector('#address');
        address.disabled = true;
        adForm.classList.remove('ad-form--disabled'); // разрешает изменять форму
        window.data.map.classList.remove('map--faded'); // убирает круг вокруг метки и текст
        var mapFiltersContainer = document.querySelector('.map__filters-container');
        window.data.map.insertBefore(window.data.fragment, mapFiltersContainer); // вставляет метки
        window.data.mapPins.appendChild(window.data.popupClone); // вставляет карточку
      }
    }
  };
})();
