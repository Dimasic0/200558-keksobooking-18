'use strict';
(function () {
  var TAGS_NUMBER = 8; // колличество меток
  var MIN_COORDINATE = 130; // минимальная координата
  var MAX_COORDINATE = 630; // максимальная координата
  var prices = [125, 250, 375, 500, 625, 750, 875, 1000];
  var MIN_ROOMS = 2; // минимальное количество комнат
  var MAX_ROOMS = 7; // максимальное количество комнат
  var propertyTypes = [
    'flat',
    'bungalo',
    'house',
    'palace'
  ];
  var headers = [
    'Квартира в центре Москвы',
    'Квартира на улице Севастопольской',
    'Квартира на улице Бабушкиной',
    'Дом на улице Севастопольской',
    'Дом на улице Гаврирова ',
    'Квартира на улице Яблоновской',
    'Квартира на улице Рашпилевской',
    'Квартира на улице Белозёрной'
  ];
  var description = [
    'Есть телевизор, газовая плита, стиральная машина.',
    'Есть диван, мебельная стенка, микроволновая печь.',
    'Есть телевизор, кровать, шкаф для одежды',
    'Есть кухонный гарнитур, холодильник, электрическая плита.',
    'Есть кровать, тумба, микроволновая печь.',
    'Есть стиральная машина, телевизор',
    'Есть диван, шкаф для одежды',
    'Есть холодильник, микроволновая печь'
  ];
  var timeArrivals = [12, 13, 14];
  var x = 0;
  var y = 0;
  var mapPin = window.data.mapPin;
  var mapPinStyle = window.data.mapPinStyle;
  var address = window.data.address;
  var features = [];
  var number;
  var randomNumber = true;
  var zero = 0;
  var one = 1;
  var two = 2;
  var mapPins = document.querySelector('.map__pins');
  var mapPinsStyle = getComputedStyle(mapPins);
  function getRandomInRange(min, max) { // генератор рандомных чисел
    return Math.floor(Math.random() * (max - min + 1)) + min; // переводит в нужный деапозон рандомное число
  }
  for (var i = zero; i < window.data.features.lenght; i++) {
    features[i] = window.data.features;
  }
  function makeMark(tagOptions) {
    window.data.label[i] = mapPin.cloneNode(true);
    window.data.label[i].dataset.index = i + one;
    window.data.label[i].setAttribute('style', 'left:' + tagOptions.location.x + 'px; top:' + tagOptions.location.y + 'px;');
    window.data.label[i].querySelector('img').src = tagOptions.author.avatar; // в картинку записаваем адрес аватара
    window.data.label[i].querySelector('img').dataset.index = i + one;
    mapPin.addEventListener('mousedown', function (coordinate) {
      y = coordinate.clientY;
      x = coordinate.clientX;
      document.addEventListener('mousemove', onLabelMousemove);
      function onLabelMousemove(position) {
		var mapPinPosition={
		 Y:parseFloat(mapPinStyle.top),
	     X:parseFloat(mapPinStyle.left)
		};
		  
		var mapPinsPosition={
		 Y:parseFloat(mapPinsStyle.top),
	     X:parseFloat(mapPinsStyle.left)
		};
		
		var mapPinSize={
		width:parseFloat(mapPinStyle.width),
		height:parseFloat(mapPinStyle.height)
		};
		
		var mapPinsSize={
		width:parseFloat(mapPinsStyle.width),
		height:parseFloat(mapPinsStyle.height)
		};
        
		if (mapPinPosition.X > 1137) {
          mapPin.style.left = '1137px';
          y = position.clientY;
          x = position.clientX;
        } else if (mapPinPosition.X > -3 && mapPinPosition.Y > 2 && mapPinPosition.Y < mapPinsSize.height - mapPinSize.height + 1 || (mapPinPosition.X <= -1 && position.clientX - x >= 0)) {
		  mapPin.style.top = mapPinPosition.Y + (position.clientY - y) + 'px';
          mapPin.style.left = mapPinPosition.X + (position.clientX - x) + 'px';
          y = position.clientY;
          x = position.clientX;
          address.value = (mapPinPosition.X + 32) + ' ' + (mapPinPosition.Y + 32);
        } else if (position.clientX < -1) {
          mapPin.style.left = '-1px';
          y = position.clientY;
          x = position.clientX;
        }

        if (mapPinPosition.X <= -one) {
          mapPin.style.left = '0px';
          y = position.clientY;
          x = position.clientX;
        }
        if (mapPinPosition.Y <= two) {
          mapPin.style.top = '3px';
        }
        if (mapPinPosition.Y > mapPinsSize.height - mapPinSize.height) {
          mapPin.style.top = String(mapPinsSize.height - mapPinSize.height) + 'px';
        }
      }

      document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', onLabelMousemove);
      });
    });
    var fragment = window.data.fragment;
    fragment.appendChild(window.data.label[i]); // вставляем метку в
  }
  function generateRandomFeatures() {
    var actualFeatures = [];
    var randomIcons = [];
    var numberIcons = getRandomInRange(zero, window.data.features.length);

    for (i = 0; i <= numberIcons; i++) {
      randomNumber = true;
      while (randomNumber === true) {
        var randomIcon = getRandomInRange(zero, numberIcons);
        randomNumber = false;
        for (var t = 0; t <= number; t++) {
          if (randomIcons[t] === randomIcon) {
            randomNumber = true;
          }
        }
      }
      for (t = 1; t <= 8; t++) {
        if (randomIcon === t) {
          actualFeatures[actualFeatures.length] = window.data.features[t];
        }
      }
      randomIcons[number] = randomIcon;
      number++;
    }
    return actualFeatures;
  }
  for (var k = 0; k < TAGS_NUMBER; k++) { // записывает свойста меткам
    var randomLocationX = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE); // создает рандомную координату х
    var randomLocationY = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE); // создает рандомную координату у
    var checkTime = timeArrivals[getRandomInRange(0, 2)];
    window.data.tags[k] = {
      author: {
        avatar: 'img/avatars/user0' + (k + 1) + '.png' // адрес аватара
      },
      offer: {
        title: headers[k], // заголовок
        address: randomLocationX + ', ' + randomLocationY, // адрес
        price: prices[k], // цена
        type: propertyTypes[getRandomInRange(0, 3)], // тип
        rooms: getRandomInRange(MIN_ROOMS, MAX_ROOMS), // количество комнат
        guests: getRandomInRange(1, 5), // количество гостей которых можно разместить
        checkin: checkTime, // время заезда
        checkout: checkTime, // время выезда
        features: generateRandomFeatures(), // удобство
        description: description[getRandomInRange(0, 7)], // описание
        photos: 'img/avatars/user0' + (k + 1) + '.png', // адрес фотографии
      },
      location: {
        x: randomLocationX, // координата х
        y: randomLocationY //  координата у
      }
    };
    makeMark(window.data.tags[k]); // создаем метки
  }
})();
