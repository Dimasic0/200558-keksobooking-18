var mapPins=document.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form'); // форма.
var adFormFieldsets = adForm.querySelectorAll('fieldset');
function activatePage(property) { // функция выдает состояние сайта.
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = property; // разрешает или запрещает изменять форму.
    }
    if (!property) { // если нужно активировать сайт то
      address.disabled = true;
      adForm.classList.remove('ad-form--disabled'); // разрешает изменять форму
        
      window.data.map.classList.remove('map--faded'); // убирает круг вокруг метки и текст
      var mapFiltersContainer = document.querySelector('.map__filters-container');
      window.data.map.insertBefore(window.data.fragment, mapFiltersContainer); // вставляет метки
      mapPins.appendChild(window.data.popupClone); // вставляет карточку
    }
  }

(function () {
  var ENTER_KEYCODE = 13; // Unicode клавише ENTER
  var address = document.querySelector('#address');
  window.data.popupClone.style.display = 'none';
  mapPins.appendChild(window.data.popupClone); // вставляет клон
  activatePage(true);

  function onMapPinMainPressEnter(evt) {
    if (evt.keyCode === ENTER_KEYCODE) { // если нажал на enter
      activatePage(false); // активировать сайт
    }
  }   
  mapPinMain=document.querySelector('.map__pin--main');
  mapPinMain.addEventListener('keydown', onMapPinMainPressEnter); // если нажимаю enter

  mapPinMain.addEventListener('mousedown', function () {
    activatePage(false);
  });
})();