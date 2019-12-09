(function () {
function openCardAnnouncement() {
  activatePage(false);
  popupClone.style.display = 'block';
  popupCloneFeaturesContainer.innerHTML = null;
  popupCloneTitle.innerHTML = tags[tagNumber - 1].offer.title; // Заголовок в карточке
  popupCloneTextAddress.textContent = tags[tagNumber - 1].offer.address; // адрес в карточке
  popupCloneTextPrice.textContent = tags[tagNumber - 1].offer.price + '₽/ночь'; // цена в карточке
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
  popupCloneTextCapacity.textContent = tags[tagNumber - 1].offer.rooms + ' комнаты для ' + tags[tagNumber - 1].offer.guests + ' гостей';
  popupCloneTextTime.textContent = 'Заезд после ' + tags[tagNumber - 1].offer.checkin + ' выезд до ' + tags[tagNumber - 1].offer.checkout; // врема заезда и выезда
  for (var j = 0; j < tags[0].offer.features.length; j++) {
    for (i = 0; i < features.length; i++) {
      if (tags[tagNumber - 1].offer.features[j] === features[i]) {
        popupCloneFeaturesContainer.insertAdjacentHTML('beforeEnd', '<li class="popup__feature popup__feature--' + features[i] + '"></li>');
      }
    }
  }
  popupCloneDescription.textContent = tags[tagNumber - 1].offer.description; // Написать описание
  popupClonePhoto.src = tags[tagNumber - 1].author.avatar; // фото на карте
  popupCloneAvatar.src = tags[tagNumber - 1].author.avatar; // аватарка на карте
}
    
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

popupClose.addEventListener('keydown', function (evt) {
  document.removeEventListener('keydown', onDocumentPressEnter);
  if (evt.keyCode === ENTER_KEYCODE) {
    popupClone.style.display = 'none';
  }
});    
})();