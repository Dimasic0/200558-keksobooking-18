'use strict';
(function () {
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var oneRoom = roomNumber.querySelector('option[value="1"]');
  var twoRooms = roomNumber.querySelector('option[value="2"]');
  var threeRooms = roomNumber.querySelector('option[value="3"]');
  var oneHundredRooms = roomNumber.querySelector('option[value="100"]');
  var singleGuest = capacity.querySelector('option[value="1"]');
  var twoGuests = capacity.querySelector('option[value="2"]');
  var threeGuests = capacity.querySelector('option[value="3"]');
  capacity.addEventListener('change', function () {
    dataValidation();
  });
  roomNumber.addEventListener('change', function () {
    dataValidation();
  });
  function dataValidation() {
    if (+roomNumber.value < +capacity.value && +roomNumber.value !== 100) {
      capacity.setCustomValidity('Количество гостей должно быть меньше или равно количеству комнат.');
    } else if (roomNumber.value !== '100') {
      capacity.setCustomValidity('');
    } else if ((capacity.value === '0' && +roomNumber.value===1) || (capacity.value === '0' && +roomNumber.value===2) || (capacity.value === '0' && +roomNumber.value===2)) {
      capacity.setCustomValidity('Не для гостей.');
    } else {
      capacity.setCustomValidity('');
    }
  }

  var adFormSubmit = document.querySelector('.ad-form__submit');
  adFormSubmit.addEventListener('mousedown', function () {
    dataValidation();
  });
})();
