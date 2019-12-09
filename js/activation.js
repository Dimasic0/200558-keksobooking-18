(function () {
function activatePage(property) { // функция выдает состояние сайта.
  for (i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = property; // разрешает или запрещает изменять форму.
  }
  if (!property) { // если нужно активировать сайт то
    address.disabled = true;
    adForm.classList.remove('ad-form--disabled'); // разрешает изменять форму
    map.classList.remove('map--faded'); // убирает круг вокруг метки и текст
    map.insertBefore(fragment, mapFiltersContainer); // вставляет метки
    mapPins.appendChild(popupClone); // вставляет карточку
  }
}
var mapPinMainStyle=getComputedStyle(mapPinMain);
address.value = Number.parseInt(mapPinMainStyle.left + mapPinMainStyle.width / 2, 10) + ' ' + Number.parseInt(mapPinMainStyle.top + mapPinMainStyle.height, 10);
popupCloneFeaturesContainer.innerHTML = null; // отключить
popupClone.style.display = 'none';
mapPins.appendChild(popupClone); // вставляет клон
activatePage(true);

function onMapPinMainPressEnter(evt) {
  if (evt.keyCode === ENTER_KEYCODE) { // если нажал на enter
    activatePage(false); // активировать сайт
  }
}

mapPinMain.addEventListener('keydown', onMapPinMainPressEnter); // если нажимаю enter



mapPinMain.addEventListener('mousedown', function () {
  activatePage(false);
});

})();