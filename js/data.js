(function () {
    window.data={
        map:document.querySelector('.map'),
        popup:document.querySelector('#card').content.querySelector('.popup'),
        popupClone:document.querySelector('#card').content.querySelector('.popup').cloneNode(true), 
        features:['wifi','dishwasher','parking','washer','elevator','conditioner'],
        tags:[],
        fragment:document.createDocumentFragment()
    };
})();