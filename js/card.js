'use strict';

(function () {
  var popupClone = window.data.popupClone;
  var popupCloneFeaturesContainer = popupClone.querySelector('.popup__features'); // список типов
  var ESC_KEYCODE = 27;
  var tagNumber;
  var features = [];
  for (var i = 0; i < window.data.features.length; i++) {
    features[i] = window.data.features[i];
  }
  function openCardAnnouncement() {
    window.data.activatePage(false);
    popupClone.style.display = 'block';
    popupCloneFeaturesContainer.innerHTML = null;

    var popupCloneTitle = popupClone.querySelector('.popup__title'); // заголовок в карточке
    var tags = window.data.tags;
    popupCloneTitle.innerHTML = tags[tagNumber - 1].offer.title; // Заголовок в карточке
    var popupCloneTextAddress = popupClone.querySelector('.popup__text--address'); // адрес
    popupCloneTextAddress.textContent = tags[tagNumber - 1].offer.address; // адрес в карточке
    var popupCloneTextPrice = popupClone.querySelector('.popup__text--price'); // цена
    popupCloneTextPrice.textContent = tags[tagNumber - 1].offer.price + '₽/ночь'; // цена в карточке
    var popupCloneType = popupClone.querySelector('.popup__type'); // тип в карточке

    switch (tags[tagNumber - 1].offer.type[i]) { // тип жилья
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
    popupCloneTextCapacity.textContent = tags[tagNumber - 1].offer.rooms + ' комнаты для ' + tags[tagNumber - 1].offer.guests + ' гостей';
    var popupCloneTextTime = popupClone.querySelector('.popup__text--time'); // время заезда и выезда
    popupCloneTextTime.textContent = 'Заезд после ' + tags[tagNumber - 1].offer.checkin + ' выезд до ' + tags[tagNumber - 1].offer.checkout; // врема заезда и выезда

    for (var j = 0; j < tags[0].offer.features.length; j++) {
      for (i = 0; i < features.length; i++) {
        if (tags[tagNumber - 1].offer.features[j] === features[i]) {
          popupCloneFeaturesContainer.insertAdjacentHTML('beforeEnd', '<li class="popup__feature popup__feature--' + features[i] + '"></li>');
        }
      }
    }
    var popupCloneDescription = popupClone.querySelector('.popup__description'); // описание
    popupCloneDescription.textContent = tags[tagNumber - 1].offer.description; // Написать описание
    var popupClonePhoto = popupClone.querySelector('.popup__photo'); // фото в карточке
    popupClonePhoto.src = tags[tagNumber - 1].author.avatar; // фото на карте
    var popupCloneAvatar = popupClone.querySelector('.popup__avatar'); // аватар
    popupCloneAvatar.src = tags[tagNumber - 1].author.avatar; // аватарка на карте
  }

  var map = window.data.map;
  var ENTER_KEYCODE = window.data.ENTER_KEYCODE;
  map.addEventListener('keydown', function (evt) {
    tagNumber = evt.target.dataset.index;
    if (evt.keyCode === ENTER_KEYCODE && (evt.target.classList.contains('map__pin--main') || evt.target.classList.contains('map__picture') || evt.target.classList.contains('map__svg')) && tagNumber > 0) {
      openCardAnnouncement();
    }
  });

  map.addEventListener('mousedown', function (evt) {
    tagNumber = evt.target.dataset.index;

    if ((evt.target.classList.contains('map__pin--main') || evt.target.classList.contains('map__picture') || evt.target.classList.contains('map__svg')) && tagNumber > 0) {
      openCardAnnouncement();
    }
  });
  document.addEventListener('keydown', onDocumentPressEnter);
  function onDocumentPressEnter(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      popupClone.style.display = 'block';
    }
  }

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      popupClone.style.display = 'none';
    }
  });

  var popupClose = popupClone.querySelector('.popup__close');
  popupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      document.removeEventListener('keydown', onDocumentPressEnter);
      popupClone.style.display = 'none';
    }
  });
})();
