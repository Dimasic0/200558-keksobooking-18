/*'use strict';
(function () {
var formData = window.formData;
var featureСheckbox = document.querySelectorAll('.feature__checkbox');
console.log('featureСheckbox='+featureСheckbox[0]);
var state = [];
for (var i = 0; i <= featureСheckbox.length; i++) {
   featureСheckbox[i].addEventListener('mousedown', function () {
     if (state[i]===false) {
       //formData.set('features-'+featureСheckbox[i].value, featureСheckbox[i].value);
       state[i]=true;
     } else { 
       //formDate.delete('features-'+featureСheckbox[i].value);
       state[i]=false;
     }
  });
 }
})();*/