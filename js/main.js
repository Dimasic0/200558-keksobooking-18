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
  var label=[];
  var x = 0;
  var y = 0;
  var relativeCoordinatesY;
  var relativeCoordinatesX;
  var mapPin = window.data.mapPin;
  var mapPinStyle = window.data.mapPinStyle;
  address.value=Number.parseInt(mapPinStyle.width/2,10)+' '+Number.parseInt(mapPinStyle.top/2,10);
  function getRandomInRange(min, max) { // генератор рандомных чисел
    return Math.floor(Math.random() * (max - min + 1)) + min; // переводит в нужный деапозон рандомное число
  }
  function makeMark(tagOptions) {
    var address = window.data.address;
    window.data.label[i] = mapPin.cloneNode(true);
    window.data.label[i].dataset.index = i + 1;
    window.data.label[i].setAttribute('style', 'left:' + tagOptions.location.x + 'px; top:' + tagOptions.location.y + 'px;');
    window.data.label[i].querySelector('img').src = tagOptions.author.avatar; // в картинку записаваем адрес аватара
    window.data.label[i].querySelector('img').dataset.index = i + 1;
    mapPin.addEventListener('mousedown', function (coordinate) {
      y = coordinate.clientY;
      x = coordinate.clientX;
      document.addEventListener('mousemove', onLabelMousemove);
      function onLabelMousemove(position) {
            console.log('position.clientX='+position.clientX+'x='+x+'mapPinStyle.left'+mapPinStyle.left);
            if(Number.parseInt(mapPinStyle.left,10)>1137) {
           mapPin.style.left='1137px';
           y = position.clientY;
           x = position.clientX;
		   
            } else if((Number.parseInt(mapPinStyle.left,10)>-3 && Number.parseInt(mapPinStyle.top,10)>2 && Number.parseInt(mapPinStyle.top,10)<627) || (Number.parseInt(mapPinStyle.left,10)<=-1 && position.clientX - x>=0)) {
          mapPin.style.top = Number.parseInt(mapPinStyle.top, 10) + (position.clientY - y) + 'px';
          relativeCoordinatesY=position.clientY-mapPinStyle.top;
		  relativeCoordinatesX=position.clientX-mapPinStyle.left;
          mapPin.style.left = Number.parseInt(mapPinStyle.left, 10) + (position.clientX - x) + 'px';
          y = position.clientY;
          x = position.clientX;
          address.value=Number.parseInt(mapPinStyle.left+32,10)+' '+Number.parseInt(mapPinStyle.top+32,10);
            }
         else if(position.clientX<-1) {
                mapPin.style.left='-1px';
                y=position.clientY;
                x=position.clientX;
            }
            if(Number.parseInt(mapPinStyle.left,10)<=-3)
            {
               mapPin.style.left='-2px';
               y=position.clientY;
               x=position.clientX;
            }
            if(Number.parseInt(mapPinStyle.top,10)<=2) {
              mapPin.style.top='3px';        
            }
		    if(Number.parseInt(mapPinStyle.top,10)>626) {
				mapPin.style.top='626px';
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
    for (var i = 0; i < window.data.features.length; i++) {
      if (getRandomInRange(0, 1)) {
        actualFeatures[actualFeatures.length] = window.data.features[i];
      }
    }
    return actualFeatures;
  }
  for (var i = 0; i < TAGS_NUMBER; i++) { // записывает свойста меткам
    var randomLocationX = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE); // создает рандомную координату х
    var randomLocationY = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE); // создает рандомную координату у
    var checkTime = timeArrivals[getRandomInRange(0, 2)];
    window.data.tags[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png' // адрес аватара
      },
      offer: {
        title: headers[i], // заголовок
        address: randomLocationX + ', ' + randomLocationY, // адрес
        price: prices[i], // цена
        type: propertyTypes[getRandomInRange(0, 3)], // тип
        rooms: getRandomInRange(MIN_ROOMS, MAX_ROOMS), // количество комнат
        guests: getRandomInRange(1, 5), // количество гостей которых можно разместить
        checkin: checkTime, // время заезда
        checkout: checkTime, // время выезда
        features: generateRandomFeatures(), // удобство
        description: description[getRandomInRange(0, 7)], // описание
        photos: 'img/avatars/user0' + (i + 1) + '.png', // адрес фотографии
      },
      location: {
        x: randomLocationX, // координата х
        y: randomLocationY //  координата у
      }
    };
    makeMark(window.data.tags[i]); // создаем метки
  }
})();
