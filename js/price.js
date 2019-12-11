(function () {
    var price = document.querySelector('#price');
    var mapFilter = document.querySelector('.map__filter');
  mapFilter.addEventListener('change', function onMapFilterChange(evt) {
    switch (evt.target.value) {
      case 'any':
        price.min = 0;
      break;
      case 'palace':
        price.min = 10000;
        break;
      case 'flat':
        price.min = 1000;
        break;
      case 'house':
        price.min = 5000;
        break;
      case 'bungalo':
        price.min = 0;
        break;
  }
});
    var type = document.querySelector('#type');
  type.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'any':
        price.min = 0;
        break;
      case 'palace':
        price.min = 10000;
        break;
      case 'flat':
        price.min = 1000;
        break;
      case 'house':
        price.min = 5000;
        break;
      case 'bungalo':
        price.min = 0;
        break;
  }
  });
})();