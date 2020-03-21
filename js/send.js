'use strict';
  var main = document.querySelector('main');
  var adForm = window.adForm;
  var title = adForm.querySelector('#title');
  var error = window.data.error;
  var price = document.getElementById('price');
  var success = document.querySelector('#success').content.querySelector('.success');
  var label = window.data.label;
  var map = window.data.map;
  var fieldset = window.fieldset;
  var mapPins = window.data.mapPins;
  var mapPinMain = window.mapPinMain;
  function activatePage(state) {
    window.data.activatePage(state);
  }
  function onMapPinMainMousedown () {
   window.onMapPinMainMousedown();  
  }
  
  var description = document.querySelector('#description');
  function send(data, onLoad, onError) {
    window.backend.send(data,onLoad,onError);
  }
  function load (onLoad, onError) {
    window.backend.load(onLoad,  onError);
  }
  function positive(data) {
    window.data.positive(data);
  }
  function onLoad(data) {
  successClone.classList.add('visible');
  console.log('lok');
  positive(data);
  document.addEventListener('keydown', documentKeydownEsc);
  function documentKeydownEsc(evt) {
    if(evt.key === 'Escape') {
      successClone.classList.remove('visible');   
      mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
    }    
  }
   for(var i=0; i<label.length; i++) {
     label[i].parentNode.removeChild(label[i]);
     console.log('label['+i+']');
   }
  }
  var adFormSubmit=adForm.querySelector('.ad-form__submit');
  var formData = new FormData();
 
  function mistake () {
    window.data.mistake();
      document.addEventListener('keydown', onDocumentKeypressEsc);
    function onDocumentKeypressEsc(key) {
       for(var i=0; i<label.length; i++) {
          mapPins.removeChild(label[i]);
        }
      console.log('клавиша='+key.key);
      if (key.key === 'Escape') {
        console.log('ESC');
        successClone.classList.remove('visible');
        map.classList.add('map--faded');
        for(var i=0; i<fieldset.length; i++) {
         fieldset[i].disabled = true;
         adForm.classList.add('ad-form--disabled');
        }
      }  
      mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
    }
  }
  var successClone = success.cloneNode(true);
  main.appendChild(successClone);
  adForm.addEventListener('submit', function () {
    console.log('mouseup');
    title.value=null;
    price.value=null;
    map.classList.add('map--faded');
    window.data.activatePage(true);
    for (var i=0; i<label.length; i++) {
      label[i].style.display='none';
    }
    load(onLoad,mistake);
    
  });