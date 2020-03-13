'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var maximumCoordinateY=628;
  var main = document.querySelector('main');
  var error = document.querySelector('#error').content.querySelector('.error');
  var x = 0;
  var y = 0;
  var k;
  var mapPin = window.data.mapPin;
  var mapPinStyle = window.data.mapPinStyle;
  var address = window.data.address;
  var features = [];
  var zero = 0;
  var mapPins = document.querySelector('.map__pins');
  var mapPinsStyle = getComputedStyle(mapPins);
  var errorClone = error.cloneNode(true);
  var errorButton = errorClone.querySelector('.error__button');
  main.appendChild(errorClone);
  
  for (var i = zero; i < window.data.features.lenght; i++) {
    features[i] = window.data.features;
  }
  function makeMark(tagOptions) {
    window.data.label[k] = mapPin.cloneNode(true);
    window.data.label[k].dataset.id = k+1;
    window.data.label[k].setAttribute('style', 'top:' + tagOptions.location.y + 'px; left:' + tagOptions.location.x + 'px;');
    window.data.label[k].querySelector('img').src = tagOptions.author.avatar; // в картинку записаваем адрес аватара
    window.data.label[k].querySelector('img').dataset.id = k+1;
    mapPin.addEventListener('mousedown', function (coordinate) {
      y = coordinate.clientY;
      x = coordinate.clientX;
      document.addEventListener('mousemove', onLabelMousemove);
      function onLabelMousemove(position) {
        var mapPinPosition = {
          Y: parseFloat(mapPinStyle.top),
          X: parseFloat(mapPinStyle.left)
        };
        var mapPinSize = {
          width: parseFloat(mapPinStyle.width),
          height: parseFloat(mapPinStyle.height)
        };
        var mapPinsSize = {
          width: parseFloat(mapPinsStyle.width),
          height: parseFloat(mapPinsStyle.height)
        };
          mapPin.style.top = mapPinPosition.Y + (position.clientY - y) + 'px';
          mapPin.style.left = mapPinPosition.X + (position.clientX - x) + 'px';
        console.log('mapPinPosition.X='+mapPinPosition.X+' mapPinPosition.Y='+mapPinPosition.Y);
        if(mapPinPosition.X<-33) {
         mapPin.style.marginLeft='-33px';
        }
        if (mapPinPosition.Y > maximumCoordinateY) {
          mapPin.style.top = maximumCoordinateY+'px';
        }
         y = position.clientY;
         x = position.clientX;
      }

      document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', onLabelMousemove);
      });
    });
    var fragment = window.data.fragment;
    fragment.appendChild(window.data.label[k]); // вставляем метку в
  }
  function load(onLoad, onError) {
    window.backend.load(onLoad, onError);
  }
  load(positive, mistake);
  function positive(data) {
    errorClone.classList.remove('visible');
    for (k = 0; k < data.length; k++) { // записывает свойста меткам
      window.data.tags[k] = {
        author: {
          avatar: data[k].author.avatar // адрес аватара
        },
        offer: {
          title: data[k].offer.title, // заголовок
          address: data[k].offer.address, // адрес
          price: data[k].offer.price, // цена
          type: data[k].offer.type, // тип
          rooms: data[k].offer.rooms, // количество комнат
          guests: data[k].offer.guests, // количество гостей которых можно разместить
          checkin: data[k].offer.checkin, // время заезда
          checkout: data[k].offer.checkout, // время выезда
          features: data[k].offer.features, // удобство
          description: data[k].offer.description, // описание
          photos: data[k].offer.photos, // адрес фотографии
        },
        location: {
          x: data[k].location.x, // координата х
          y: data[k].location.y //  координата у
        }
      };
      makeMark(window.data.tags[k]); // создаем метки
    }
  }
  function mistake() {
    errorClone.classList.add('visible');
  }
  errorButton.addEventListener('mousedown', function () {
    load(positive, mistake);
  });
})();
