(function () {
  capacity.addEventListener('change', function () {
    dataValidation();
  });
  roomNumber.addEventListener('change', function () {
    dataValidation();
  });
  function dataValidation() {
    if (+capacity.value > +roomNumber.value && +roomNumber.value !== '100') {
      capacity.setCustomValidity('Количество гостей должно быть меньше или равно количеству комнат.');
    } else if (roomNumber.value !== '100') {
      capacity.setCustomValidity('');
    } else if (capacity.value !== '0') {
      capacity.setCustomValidity('Не для гостей.');
    } else {
      capacity.setCustomValidity('');
    }
}
  adFormSubmit.addEventListener('mousedown', function () {
    dataValidation();
  });
})();

