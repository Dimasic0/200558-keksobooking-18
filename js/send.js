'use strict';
(function() {
  var main=document.querySelector('main');
  var adForm = window.adForm;
  var title=adForm.querySelector('#title');
  var error = window.data.error;
  var price=document.getElementById('price');
  var success = document.querySelector('#success').content.querySelector('.success');
  var label = window.data.label;
  var map=window.data.map;
  var fieldset=window.fieldset;
  function activatePage(state) {
    window.data.activatePage(state);
  }
  var description = document.querySelector('#description');
  function send(data, onLoad, onError) {
    window.backend.send(data,onLoad,onError);
  }
  var adFormSubmit=adForm.querySelector('.ad-form__submit');
  var formData = new FormData();
  adFormSubmit.addEventListener('mousedown',function () {
    send(formData,dataCame,mistake);
  });
  function dataCame()
  {
    successClone.classList.add('visible');
    console.log('lok');
  }
 
  function mistake () {
    window.data.mistake();
      document.addEventListener('keydown', onDocumentKeypressEsc);
    function onDocumentKeypressEsc(key) {
      console.log('клавиша='+key.key);
      if (key.key === 'Escape') {
        console.log('ESC');
        successClone.classList.remove('visible');
        map.classList.add('map--faded');
        for(var i=0; i<fieldset.length; i++)
        {
         fieldset[i].disabled=true;
         adForm.classList.add('ad-form--disabled');
        }
      }  
    }
  }
  var successClone = success.cloneNode(true);
  main.appendChild(successClone);
  adFormSubmit.addEventListener('mouseup', function () {
    console.log('mouseup');
    title.value=null;
    price.value=null;
    for (var i=0; i<label.length; i++) {
      label[i].style.display='none';
    }
  });
})();