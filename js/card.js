'use strict';
(function () {
  var popupCloneFeaturesContainer = window.data.popupClone.querySelector('.popup__features'); // список типов
  var ESC_KEYCODE = 27;
  var tagNumber;
  function openCardAnnouncement() {
    window.data.activatePage(false);
    window.data.popupClone.style.display = 'block';
    popupCloneFeaturesContainer.innerHTML = null;
    var popupCloneTitle = window.data.popupClone.querySelector('.popup__title'); // заголовок в карточке
    popupCloneTitle.innerHTML = window.data.tags[tagNumber - 1].offer.title; // Заголовок в карточке
    var popupCloneTextAddress = window.data.popupClone.querySelector('.popup__text--address'); // адрес
    popupCloneTextAddress.textContent = window.data.tags[tagNumber - 1].offer.address; // адрес в карточке
    var popupCloneTextPrice = window.data.popupClone.querySelector('.popup__text--price'); // цена
    popupCloneTextPrice.textContent = window.data.tags[tagNumber - 1].offer.price + '₽/ночь'; // цена в карточке
    var popupCloneType = window.data.popupClone.querySelector('.popup__type'); // тип в карточке
    switch (window.data.tags[tagNumber - 1].offer.type[i]) { // тип жилья
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
    var popupCloneTextCapacity = window.data.popupClone.querySelector('.popup__text--capacity'); // комнаты
    popupCloneTextCapacity.textContent = window.data.tags[tagNumber - 1].offer.rooms + ' комнаты для ' + window.data.tags[tagNumber - 1].offer.guests + ' гостей';
    var popupCloneTextTime = window.data.popupClone.querySelector('.popup__text--time'); // время заезда и выезда
    popupCloneTextTime.textContent = 'Заезд после ' + window.data.tags[tagNumber - 1].offer.checkin + ' выезд до ' + window.data.tags[tagNumber - 1].offer.checkout; // врема заезда и выезда
    for (var j = 0; j < window.data.tags[0].offer.features.length; j++) {
      for (var i = 0; i < window.data.features.length; i++) {
        if (window.data.tags[tagNumber - 1].offer.features[j] === window.data.features[i]) {
          popupCloneFeaturesContainer.insertAdjacentHTML('beforeEnd', '<li class="popup__feature popup__feature--' + window.data.features[i] + '"></li>');
        }
      }
    }
    var popupCloneDescription = window.data.popupClone.querySelector('.popup__description'); // описание
    popupCloneDescription.textContent = window.data.tags[tagNumber - 1].offer.description; // Написать описание
    var popupClonePhoto = window.data.popupClone.querySelector('.popup__photo'); // фото в карточке
    popupClonePhoto.src = window.data.tags[tagNumber - 1].author.avatar; // фото на карте
    var popupCloneAvatar = window.data.popupClone.querySelector('.popup__avatar'); // аватар
    popupCloneAvatar.src = window.data.tags[tagNumber - 1].author.avatar; // аватарка на карте
  }
  window.data.map.addEventListener('keydown', function (evt) {
    tagNumber = evt.target.dataset.index;
    if (evt.keyCode === window.data.ENTER_KEYCODE && (evt.target.classList.contains('map__pin--main') || evt.target.classList.contains('map__picture') || evt.target.classList.contains('map__svg')) && tagNumber > 0) {
      openCardAnnouncement();
    }
  });
  window.data.map.addEventListener('mousedown', function (evt) {
    tagNumber = evt.target.dataset.index;
    if ((evt.target.classList.contains('map__pin--main') || evt.target.classList.contains('map__picture') || evt.target.classList.contains('map__svg')) && tagNumber > 0) {
      openCardAnnouncement();
    }
  });
  document.addEventListener('keydown', onDocumentPressEnter);
  function onDocumentPressEnter(evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      window.data.popupClone.style.display = 'block';
    }
  }
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.data.popupClone.style.display = 'none';
    }
  });
  var popupClose = window.data.popupClone.querySelector('.popup__close');
  popupClose.addEventListener('keydown', function (evt) {
    document.removeEventListener('keydown', onDocumentPressEnter);
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      window.data.popupClone.style.display = 'none';
    }
  });
})();
