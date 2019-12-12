'use strict';

(function () {
  window.data.ENTER_KEYCODE = 13;
  window.data.popupClone.style.display = 'none';
  window.data.mapPins.appendChild(window.data.popupClone); // вставляет клон
  window.data.activatePage(true);

  function onMapPinMainPressEnter(evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) { // если нажал на enter
      window.data.activatePage(false); // активировать сайт
    }
  }
  var mapPinMain = document.querySelector('.map__pin--main');
  mapPinMain.addEventListener('keydown', onMapPinMainPressEnter); // если нажимаю enter

  mapPinMain.addEventListener('mousedown', function () {
    window.data.activatePage(false);
  });
})();
