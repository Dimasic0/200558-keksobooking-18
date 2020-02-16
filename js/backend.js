'use strict';
(function () {
  var TIME = 10000;
  var CODE_OK = 200;
  var information;
  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      information = xhr.response;
      window.information = information;
      if (xhr.status === CODE_OK) {
        onLoad(information);
      } else {
        onError();
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
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError();
      }
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.timeout = TIME;
    xhr.open('POST', 'https://js.dump.academy/keksobooking/data');
    xhr.send(data);
  }
  window.backend = {
    load: load,
    send: send
  };
})();
