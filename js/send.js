'use strict';
(function() {
  var main=document.querySelector('main');
  var adForm = window.adForm;
  var title=adForm.querySelector('#title');
  var price=document.getElementById('price');
  var success = document.querySelector('#success').content.querySelector('.success');
  var label = window.data.label;
  var map=window.data.map;
  var fieldset=window.fieldset;
  function activatePage(state)
  {
    window.data.activatePage(state);
  }
  adForm.addEventListener('submit', function () {
    
    var successClone = success.cloneNode(true);
    successClone.classList.add('visible');
    main.appendChild(successClone);
    title.value=null;
    price.value=null;
    for (var i=0; i<label.length; i++)
    {
      label[i].style.display='none';
    }
    document.addEventListener('keydown', onDocumentKeypressEsc);
    function onDocumentKeypressEsc(key) {
      console.log('клавиша='+key.key);
      if (key.key === 'Escape') {
        successClone.classList.remove('visible');
        map.classList.add('map--faded');
        for(i=0; i<fieldset.length; i++)
        {
         fieldset[i].disabled=true;
         adform.classList.add('ad-form--disabled');
        }
      }  
    }
  });
})();