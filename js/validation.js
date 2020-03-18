'use strict';
(function () {
  var adForm = window.adForm;
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var singleGuest = capacity.querySelector('option[value="1"]');
  var twoGuests = capacity.querySelector('option[value="2"]');
  var threeGuests = capacity.querySelector('option[value="3"]');
  var zeroGuests = capacity.querySelector('option[value="0"]');
  roomNumber.addEventListener('change', function (evt) {
    dataValidation();
    if (+roomNumber.value < 100 && +roomNumber.value > 100) {
      zeroGuests.disabled = true;
      singleGuest.selected = true;
      twoGuests.disabled = false;
      threeGuests.disabled = false;
    }
    if (roomNumber.value === '100') {
      zeroGuests.disabled = false;
      singleGuest.disabled = true;
      twoGuests.disabled = true;
      threeGuests.disabled = true;
      zeroGuests.selected = true;
    }
    if (roomNumber.value === '1') {
      singleGuest.disabled = false;
      twoGuests.disabled = true;
      threeGuests.disabled = true;
    }
    if (roomNumber.value === '2') {
      singleGuest.disabled = false;
      twoGuests.disabled = false;
      threeGuests.disabled = true;
    }
    if (roomNumber.value === '3') {
      singleGuest.disabled = false;
      twoGuests.disabled = false;
      threeGuests.disabled = false;
    }
    if (roomNumber.value === '100') {
      singleGuest.disabled = true;
      twoGuests.disabled = true;
      threeGuests.disabled = true;
    }
   console.log('roomNumber='+evt.target.value);
  });
  capacity.addEventListener('change', function (evt) {
    dataValidation();
  });
  function dataValidation() {
    if (+roomNumber.value < +capacity.value && +roomNumber.value !== 100) {
      capacity.setCustomValidity('Количество гостей должно быть меньше или равно количеству комнат.');
    } else if ((capacity.value === '0' && +roomNumber.value === 1) || (capacity.value === '0' && +roomNumber.value === 2) || (capacity.value === '0' && +roomNumber.value === 2)) {
      capacity.setCustomValidity('Не для гостей.');
    } else {
      capacity.setCustomValidity('');
    }
  }
  var adFormSubmit = document.querySelector('.ad-form__submit');
  adFormSubmit.addEventListener('mousedown', function () {
    dataValidation();
  });
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
})();
