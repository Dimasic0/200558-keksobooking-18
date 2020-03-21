'use strict';

(function () {
  var errorClone = window.data.errorClone;
  function activatePage(property) {
    window.data.activatePage(property);
  }
  function load (onLoad,onError) {
  window.backend.load(onLoad,onError);
  }
  function positive (data) {
    window.data.positive (data);
  }
  function mistake() {
    window.data.mistake();
  }
  var popupClone = window.data.popupClone;
  var mapPins = window.data.mapPins;
  mapPins.appendChild(popupClone); // вставляет клон
  activatePage(true);
  var mapPinMain = window.mapPinMain;
  mapPinMain.addEventListener('keydown', onMapPinMainPressEnter); // если нажимаю enter
  function onMapPinMainPressEnter(evt) {
    var ENTER_KEYCODE = 13;
    if (evt.keyCode === ENTER_KEYCODE) { // если нажал на enter
      activatePage(false); // активировать сайт
    }
  }

  mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
  function onMapPinMainMousedown() {
    activatePage(false);
    load(positive,mistake);
    mapPinMain.removeEventListener('mousedown', onMapPinMainMousedown);
  }
  window.onMapPinMainMousedown=onMapPinMainMousedown;
})();
