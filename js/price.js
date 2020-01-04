'use strict';
(function () {
  var price = document.querySelector('#price');
  var mapFilter = document.querySelector('.map__filter');
  var minimumPrices=[0,10000,1000,5000]
  var typesHousing=['any','palace','flat','house','bungalo']
  mapFilter.addEventListener('change', function onMapFilterChange(evt) {
	for(var i=0; i<typesHousing.length; i++)
    {
      if(evt.target.value===typesHousing[i]) {
        price.min = minimumPrices[i];
	  }
    }
  });

  var type = document.querySelector('#type');
  type.addEventListener('change', function (evt) {
    for(i=0; i<typesHousing.length; i++)
    {
      if(evt.target.value===typesHousing[i]) {
        price.min = minimumPrices[i];
	  }
    }
  });
})();
