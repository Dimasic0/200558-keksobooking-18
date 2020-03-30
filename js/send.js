'use strict';
(function () {
  var main = document.querySelector('main');
  var adForm = window.adForm;
  var title = adForm.querySelector('#title');
  // var error = window.data.error;
  var price = document.getElementById('price');
  var success = document.querySelector('#success').content.querySelector('.success');
  var map = window.data.map;
  var fieldset = window.fieldset;
  // var mapPins = window.data.mapPins;
  var mapPinMain = window.mapPinMain;
  function activatePage(state) {
    window.data.activatePage(state);
  }
  function onMapPinMainMousedown() {
    window.onMapPinMainMousedown();
  }
  function send(data, onLoad, onError) {
    window.backend.send(data, onLoad, onError);
  }
  function positive(data) {
    window.data.positive(data);
  }
  function Load(data) {
    successClone.classList.add('visible');
    positive(data);
    document.addEventListener('keydown', onDocumentKeydownEsc);
    function onDocumentKeydownEsc(evt) {
      if (evt.key === 'Escape') {
        successClone.classList.remove('visible');
        mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
        document.removeEventListener('keydown', onDocumentKeydownEsc);
      }
    }
  }
  var formData = new FormData(adForm);
  function mistake() {
    window.data.mistake();
    document.addEventListener('keydown', onDocumentKeypressEsc);
    function onDocumentKeypressEsc(key) {
      if (key.key === 'Escape') {
        successClone.classList.remove('visible');
        map.classList.add('map--faded');
        for (var i = 0; i < fieldset.length; i++) {
          fieldset[i].disabled = true;
          adForm.classList.add('ad-form--disabled');
        }
      }
      mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
    }
  }
  var successClone = success.cloneNode(true);
  main.appendChild(successClone);
  var label = window.data.label;
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    title.value = null;
    price.value = null;
    map.classList.add('map--faded');
    activatePage(true);
    for (var i = 0; i < label.length; i++) {
      label[i].parentNode.removeChild(label[i]);
    }
    send(formData, Load, mistake);
  });
})();
