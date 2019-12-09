(function () {
  timein.addEventListener('change', function (evt) {
    timeout.value = evt.target.value;
  });

  timeout.addEventListener('change', function (evt) {
    timein.value = evt.target.value;
  });    
})();