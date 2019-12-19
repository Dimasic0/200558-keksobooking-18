'use strict';

(function () {
  function activatePage(property)
  {
	 window.data.activatePage(property); 
  }
  var popupClone=window.data.popupClone;
  popupClone.style.display = 'none';
  var mapPins = window.data.mapPins;
  mapPins.appendChild(popupClone); // вставляет клон
  activatePage(true);
  function onMapPinMainPressEnter(evt) {
	 var ENTER_KEYCODE = window.data.ENTER_KEYCODE;
    if (evt.keyCode === ENTER_KEYCODE) { // если нажал на enter
     activatePage(false); // активировать сайт
    }
  }
  var mapPinMain = document.querySelector('.map__pin--main');
  mapPinMain.addEventListener('keydown', onMapPinMainPressEnter); // если нажимаю enter

  mapPinMain.addEventListener('mousedown', function () {
    activatePage(false);
  });
})();
