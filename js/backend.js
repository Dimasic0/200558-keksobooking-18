'use strict';
(function () {
  var TIME = 10000;
  var CODE_OK = 200;
  var thereIsData = 4;
  var information;
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  function load(onLoad, onError) {
    xhr.addEventListener('load', function () {
      information = xhr.response;
      window.information = information;
      if (xhr.status === CODE_OK) {
        onLoad(information);
      }
    });
    xhr.addEventListener('timeout', function () {
      onLoad();
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.timeout = TIME;
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  }
  function send(data, onLoad, onError) {
    xhr.addEventListener('load', function () {
      information = xhr.response;
      if (xhr.readyState === thereIsData && xhr.status === 200) {
        onLoad(information);
      }
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.timeout = TIME;
    xhr.open('POST', 'https://js.dump.academy/keksobooking');
    xhr.send(data);
  }
  window.backend = {
    load: load,
    send: send
  };
})();
