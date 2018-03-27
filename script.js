var elem = document.querySelector('.carousel');

new Carousel(elem, {
    elementAmount: 3,
    duration: 300,
    auto: false, // [true, 2000]
    navigation: {
        prev: document.querySelector('.prev'),
        next: document.querySelector('.next')
    },
    isHorizontal: false
}).start();