'use strict';
(function () {
  //var formData=window.formData;
  var price=window.price;
  var mapFilter = document.querySelector('.map__filter');
  var minimumPrices = [0, 10000, 1000, 5000];
  var typesHousing = ['any', 'palace', 'flat', 'house', 'bungalo'];
  //var formData = window.formData;
  mapFilter.addEventListener('change', function onMapFilterChange(evt) {
    for (var i = 0; i < typesHousing.length; i++) {
      if (evt.target.value === typesHousing[i]) {
        price.min = minimumPrices[i];
      }
    }
  });

  var type = document.querySelector('#type');
  window.type=type;
  type.addEventListener('change', function (evt) {
    console.log(evt.target.value);
    for (var i = 0; i < typesHousing.length; i++) {
      if (evt.target.value === typesHousing[i]) {
        price.min = minimumPrices[i];
      }
      
    }
    // formData.set('type',evt.target.value);
  });
})();
