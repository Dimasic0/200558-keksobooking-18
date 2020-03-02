'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var popupClone = window.data.popupClone;
  var popupCloneFeaturesContainer = popupClone.querySelector('.popup__features'); // список типов
  var cardId;
  var features = [];
  for (var i = 0; i < window.data.features.length; i++) {
    features[i] = window.data.features[i];
  }
  function openCardAnnouncement() {
    cardId--;
    window.data.activatePage(false);
    popupClone.classList.add('visible');
    popupCloneFeaturesContainer.innerHTML = null;
    var popupCloneTitle = popupClone.querySelector('.popup__title'); // заголовок в карточке
    var tags = window.data.tags;
    popupCloneTitle.innerHTML = tags[cardId].offer.title; // Заголовок в карточке
    var popupCloneTextAddress = popupClone.querySelector('.popup__text--address'); // адрес
    popupCloneTextAddress.textContent = tags[cardId].offer.address; // адрес в карточке
    var popupCloneTextPrice = popupClone.querySelector('.popup__text--price'); // цена
    popupCloneTextPrice.textContent = tags[cardId].offer.price + '₽/ночь'; // цена в карточке
    var popupCloneType = popupClone.querySelector('.popup__type'); // тип в карточке
    switch (tags[cardId].offer.type) { // тип жилья
      case 'flat': // если жилью квартира то
        popupCloneType.textContent = 'Квартира'; // выводим в метку слово <квартира>
        break;
      case 'bungalo': // если жильё Бунгало то
        popupCloneType.textContent = 'Бунгало'; // выводим в метку слово <Бунгало>
        break;
      case 'house': // если жилью дом то
        popupCloneType.textContent = 'Дом'; // выводим слово <Дом>
        break;
      case 'palace':
        popupCloneType.textContent = 'Дворец'; // Выводим слово <дворец>
        break;
    }
    var popupCloneTextCapacity = popupClone.querySelector('.popup__text--capacity'); // комнаты
    popupCloneTextCapacity.textContent = tags[cardId].offer.rooms + ' комнаты для ' + tags[cardId].offer.guests + ' гостей';
    var popupCloneTextTime = popupClone.querySelector('.popup__text--time'); // время заезда и выезда
    popupCloneTextTime.textContent = 'Заезд после ' + tags[cardId].offer.checkin + ' выезд до ' + tags[cardId].offer.checkout; // врема заезда и выезда

    for (var j = 0; j < tags[0].offer.features.length; j++) {
      for (i = 0; i < features.length; i++) {
        if (tags[cardId].offer.features[j] === features[i]) {
          popupCloneFeaturesContainer.insertAdjacentHTML('beforeEnd', '<li class="popup__feature popup__feature--' + features[i] + ' width="45" height="40"></li>');
        }
      }
    }
    var popupCloneDescription = popupClone.querySelector('.popup__description'); // описание
    popupCloneDescription.textContent = tags[cardId].offer.description; // Написать описание
    var popupCloneAvatar = popupClone.querySelector('.popup__avatar'); // аватар
    popupCloneAvatar.src = tags[cardId].author.avatar; // аватарка на карте
    var popupClonePhotos = popupClone.querySelector('.popup__photos');
    popupClonePhotos.innerHTML = null;
    for (i = 0; i < tags[cardId].offer.photos.length; i++) {
      popupClonePhotos.insertAdjacentHTML('beforeEnd', '<img class="popup__photo" src=' + tags[cardId].offer.photos[i] + ' width="45" height="40" alt="Фотография жилья">');
    }
  }

  var map = window.data.map;
  var ENTER_KEYCODE = window.data.ENTER_KEYCODE;
  map.addEventListener('keydown', function (evt) {
    cardId = evt.target.dataset.id;
    if (evt.keyCode === ENTER_KEYCODE && (evt.target.classList.contains('map__pin--main') || evt.target.classList.contains('map__picture') || evt.target.classList.contains('map__svg')) && cardId > 0) {
      openCardAnnouncement();
    }
  });

  map.addEventListener('mousedown', function (evt) {
    cardId = evt.target.dataset.id;

    if ((evt.target.classList.contains('map__pin--main') || evt.target.classList.contains('map__picture') || evt.target.classList.contains('map__svg')) && cardId > 0) {
      openCardAnnouncement();
    }
  });
  document.addEventListener('keydown', onDocumentPressEnter);
  function onDocumentPressEnter(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      popupClone.classList.add('visible');
    }
  }

  document.addEventListener('keydown', onDocumentKeydownEsc);
  function onDocumentKeydownEsc(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      popupClone.classList.remove('visible');
      //document.removeEventListener('keydown',onDocumentKeydownEsc);
    }
  }
  var popupClose = popupClone.querySelector('.popup__close');
  popupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      document.removeEventListener('keydown', onDocumentPressEnter);
      popupClone.classList.remove('visible');
    }
  });
  popupClose.addEventListener('mousedown', function () {
    popupClone.classList.remove('visible');
  });
})();
