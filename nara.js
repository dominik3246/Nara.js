var Carousel = (function() {
    function CaruselClass(element, cfg) {
        this.element    = element;
        this.cfg        = cfg;
        this.timer      = null;
        this.isStarted  = false;

        this.init();
    }

    CaruselClass.prototype.init = function() {
        console.log(this.element.querySelector('ul'));
        var startPoint;
        var endPoint;
        this.setSettings();
            this.element.addEventListener('mousedown', function(e){
            if(!this.isStarted){
                return;
            }
            startPoint = { x: e.clientX, y: e.clientY };
            console.log(startPoint);
        });
        this.element.addEventListener('mouseup', function(e){
            if(!this.isStarted){
                return;
            }
            endPoint = { x: e.clientX,y: e.clientY };
            console.log(endPoint);
            this.moveBasedOnPoints(startPoint, endPoint);
            
        });

        // this.start();
    }

    CaruselClass.prototype.setSettings = function() {
        var carouselHeight = this.element.clientHeight;
        var carouselWrapper = this.element.querySelector('ul');
        var carouselItems = this.element.querySelectorAll('li');
        console.log(carouselWrapper);
        carouselWrapper.style.height = carouselHeight + 'px';
        for(var i = 0; i < carouselItems.length; i++) {
            carouselItems[i].style.height = carouselHeight / this.cfg.items + 'px';
        }
    }

    CaruselClass.prototype.moveBasedOnPoints = function(startPoint, endPoint) {
        var gesture = this.calcGesture(startPoint, endPoint);

        // @TODO check this.cfg.vertical and gesture.isVertical | gesture.isHorizontal
        if(gesture.isNext) {
            return this.moveNext();
        }
        if(gesture.isPrev) {
            return this.movePrev();
        }
    }

    CaruselClass.prototype.calcGesture = function(startPoint, endPoint) {
        // @TODO

        return {
            isHorizontal: true,
            isVertical: false,
            isNext: true,
            isPrev: false
        }
    }

    CaruselClass.prototype.start = function() {
        this.timer      = setInterval(this.moveNext.bind(this), 1000);
        this.isStarted  = true;
    }

    CaruselClass.prototype.stop = function() {
        clearInterval(this.timer);

        this.timer      = null;
        this.isStarted  = false;
    }

    CaruselClass.prototype.moveNext = function() {
        // TODO
        console.log(lastChild);
        var carouselWrapper = this.element.querySelector('ul');
        var carouselItems = this.element.querySelectorAll('li');
        var firstChild = carouselItems[0];
        var lastChild = carouselItems[carouselItems.length];
        carouselWrapper.insertBefore(firstChild, lastChild);
    }

    CaruselClass.prototype.movePrev = function() {
        // TODO
        var carouselWrapper = this.element.querySelector('ul');
        var carouselItems = this.element.querySelectorAll('li');
        var firstChild = carouselItems[0];
        var lastChild = carouselItems[carouselItems.length];
        carouselWrapper.insertBefore(firstChild, lastChild.nextSibling);
    }

    return CaruselClass;
}());

// var foo = new Carousel(bannerElem, {
//     width: bannerElem.clientWidth, // Images are forced into a width of this many pixels.
//     height: bannerCarouselContainer.clientHeight,
//     numVisible: parseInt(bannerCarouselContainer.dataset.itemsPerPage), // The number of images visible at once.
//     duration: 600, // Animation duration in milliseconds.
//     padding: 2, // Vertical padding around each image, in pixels.
//     vertical: true,
// });

// foo.start();









// var Carousel = {
//     width: bannerElem.clientWidth, // Images are forced into a width of this many pixels.
//     height: bannerCarouselContainer.clientHeight,
//     numVisible: parseInt(bannerCarouselContainer.dataset.itemsPerPage), // The number of images visible at once.
//     duration: 600, // Animation duration in milliseconds.
//     padding: 2, // Vertical padding around each image, in pixels.
//     vertical: true,
// };

// var carousel = (Carousel.carousel = bannerCarouselWrapper),
// images = Carousel.carousel.querySelectorAll('div'),
// numImages = images.length,
// imageWidth = Carousel.width,
// padding = Carousel.padding,
// imageHeight = Carousel.height / Carousel.numVisible;

// function initCarousel() {   
//     carousel.style.position = 'absolute';
//     if(!Carousel.vertical){
//         carousel.style.width = Carousel.width * numImages + 'px'; 
//         carousel.style.display = 'flex';
//     } else {
//         carousel.style.width = Carousel.width + 'px';
//         carousel.style.top = -imageHeight + 'px';
//     }
//     carousel.style.height = Carousel.height + 'px';
//     carousel.style.visibility = 'visible';
//     for(var i = 0; i < numImages; i++) {
//         console.log(images[i]);
//         images[i].style.height = imageHeight + 'px';
//         images[i].style.marginBottom = padding + 'px';
//         if(!Carousel.vertical){ 
//             images[i].style.width = imageWidth + 'px';
//         }
//     }
// }

// initCarousel();

// var isAnimated = false;

// function animate(begin, end, finalTask) {
//     isAnimated = true;
//     var wrapper = Carousel.wrapper,
//     carousel = Carousel.carousel,
//     change = end - begin,
//     duration = Carousel.duration,
//     startTime = Date.now();
//     carousel.style.top = begin + 'px';

//     var animateInterval = window.setInterval(function() {
//         var t = Date.now() - startTime;
//         if (t >= duration) {
//                 window.clearInterval(animateInterval);
//                 finalTask();
//                 isAnimated = false;
//                 return;
//             }
//         t /= duration / 2;
//         console.log(t);
//         var top =
//             begin +
//             (t < 1
//             ? change / 2 * Math.pow(t, 3)
//             : change / 2 * (Math.pow(t - 2, 3) + 2));
//         carousel.style.top = top + 'px';
//         },
//     1000 / 60);
// }

//     function animateHorizontal(begin, end, finalTask) {
//         isAnimated = true;
//         var wrapper = Carousel.wrapper,
//         carousel = Carousel.carousel,
//         change = end - begin,
//         duration = Carousel.duration,
//         startTime = Date.now();
//         carousel.style.right = begin + 'px';

//         var animateInterval = window.setInterval(function() {
//             var t = Date.now() - startTime;
//             if (t >= duration) {
//                     window.clearInterval(animateInterval);
//                     finalTask();
//                     isAnimated = false;
//                     return;
//                 }
//             t /= duration / 2;
//             console.log(t);
//             var right =
//                 begin +
//                 (t < 1
//                 ? change / 2 * Math.pow(t, 3)
//                 : change / 2 * (Math.pow(t - 2, 3) + 2));
//             carousel.style.right = right + 'px';
//             }, 1000 / 60);
//     }

//   var autoLoop = window.setInterval(animatedLoop, 2000);

  
//   function animatedLoop() {
//     if(!Carousel.vertical) {
//         animateHorizontal(0, -imageWidth, function() {
//             rotateBackward();
//             carousel.style.right = -imageWidth + 'px';
//         });
//     } else {
//         animate(-imageHeight, -imageHeight * 2, function() {
//             rotateBackward();
//             carousel.style.top = -imageHeight + 'px';
//         });
//     }
// }

// function rotateForward() {
//     var carousel = Carousel.carousel,
//     children = carousel.children,
//     firstChild = children[0],
//     lastChild = children[children.length - 1];
//     carousel.insertBefore(lastChild, firstChild);
// }

// function rotateBackward() {
//     var carousel = Carousel.carousel,
//     children = carousel.children,
//     firstChild = children[0],
//     lastChild = children[children.length - 1];
//     carousel.insertBefore(firstChild, lastChild.nextSibling);
// }

// var touchStartY = null;

// carousel.addEventListener('mousedown', function(e) {
// window.clearInterval(autoLoop);
// touchStartY = e.clientY;
// });

// carousel.addEventListener('mouseup', function(e) {
// var touchLength = Math.abs(touchStartY - e.clientY);
// if (!isAnimated) {
//     if (touchStartY > e.clientY && touchLength > 10) {
//     animate(-imageHeight, -imageHeight * 2, function() {
//         rotateBackward();
//         carousel.style.top = -imageHeight + 'px';
//     });
//     }
//     if (touchStartY < e.clientY && touchLength > 10) {
//     rotateForward();
//     animate(-imageHeight * 2, -imageHeight, function() {
//         carousel.style.top = -imageHeight + 'px';
//     });
//     }
// }

// autoLoop = window.setInterval(animatedLoop, 2000);
// });
