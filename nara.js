var Nara = (function() {
    function NaraClass(cfg) {
        this.cfg        = {
            items:                          cfg.items || 1,
            duration:                       cfg.duration || 500,
            autoplayTimeout:                cfg.autoplayTimeout || 4000,
            isHorizontal:                   cfg.isHorizontal === undefined ? false : cfg.isHorizontal,
            navigation:                     cfg.navigation === undefined ? false : cfg.navigation,
            carouselContainerQuerySelector: cfg.carouselContainerQuerySelector || '.nara-carousel__container',
            carouselWrapperQuerySelector:   cfg.carouselWrapperQuerySelector || '.nara-carousel__wrapper',
            carouselItemQuerySelector:      cfg.carouselItemQuerySelector || '.nara-carousel__item',
        };
        this.timer      = null;
        this.isStarted  = false;
        this.isMoved = false;
        var container = document.querySelector(this.cfg.carouselContainerQuerySelector);
        this.elements = {
            container: container,
            list: container.querySelector(this.cfg.carouselWrapperQuerySelector),
        }
        this.init();
    }
    
    NaraClass.prototype.init = function() {

        var carouselItems   = this.elements.container.querySelectorAll(this.cfg.carouselItemQuerySelector),
        firstChild      = carouselItems[0],
        lastChild       = carouselItems[carouselItems.length - 1],
        lastElement     = carouselItems[carouselItems.length],
        clonedFirst     = firstChild.cloneNode(true),
        clonedLast      = lastChild.cloneNode(true);

        
        this.elements.list.insertBefore(clonedFirst, lastElement);
        this.elements.list.insertBefore(clonedLast, this.elements.list.firstChild);
        
        if(!this.cfg.isHorizontal) {
            this.elements.list.style.transform  = 'translateY(' + -(this.elements.container.clientHeight / this.cfg.items) + 'px)';
        } else {
            this.elements.list.style.transform  = 'translateX(' + -(this.elements.container.clientWidth / this.cfg.items) + 'px)';
        }
        
        var startPoint;
        var endPoint;
        
        this.elements.container.addEventListener('mousedown', function(e) {
            
            if(!this.isMoved){
                return;
            }
            
            startPoint = { x: e.clientX, y: e.clientY };
        }.bind(this));
        
        
        
        this.elements.container.addEventListener('mouseup', function(e){
            
            if(!this.isMoved){
                return;
            } 
            endPoint = { x: e.clientX,y: e.clientY };
            
            this.moveBasedOnPoints(startPoint, endPoint);
        }.bind(this));
        
        this.elements.container.addEventListener('touchstart', function(e) {
            
            if(!this.isMoved){
                return;
            }
            
            startPoint = { x: e.clientX, y: e.clientY };
        }.bind(this));
        
        this.elements.container.addEventListener('touchend', function(e){
            
            if(!this.isMoved){
                return;
            }
            endPoint = { x: e.clientX,y: e.clientY };
            
            this.moveBasedOnPoints(startPoint, endPoint);
        }.bind(this));
        
        if(this.cfg.navigation && this.cfg.navigation.prev && this.cfg.navigation.next) {
            
            this.cfg.navigation.prev.addEventListener('click', function() {
                this.movePrev()
            }.bind(this));
            
            this.cfg.navigation.next.addEventListener('click', function() {
                this.moveNext()
            }.bind(this));
        }
        this.setSize();
    }
    
    NaraClass.prototype.setSize = function() {
        var carouselItems   = this.elements.container.querySelectorAll(this.cfg.carouselItemQuerySelector),
        field               = this.cfg.isHorizontal ? 'width' : 'height',
        size                = this.cfg.isHorizontal ? this.elements.container.clientWidth : this.elements.container.clientHeight;
        carouselItems.forEach(function(item) {
            item.style[field] = size / this.cfg.items + 'px';
        }.bind(this));

        var navPrevClassName = this.cfg.isHorizontal && 'nara-btn__prev-h' || 'nara-btn__prev-v';
        var navNextClassName = this.cfg.isHorizontal && 'nara-btn__next-h' || 'nara-btn__next-v';

        if(this.cfg.navigation && this.cfg.navigation.prev && this.cfg.navigation.next) {
            this.cfg.navigation.prev.classList.add(navPrevClassName);
            this.cfg.navigation.next.classList.add(navNextClassName);
        }

        if(this.cfg.isHorizontal) {
            this.elements.list.style.width = size * carouselItems.length + 'px';

            carouselItems.forEach(function(item) {
                item.style.height   = this.elements.container.clientHeight + 'px';
                item.style.float    = 'left';
             }.bind(this));
        }
    }

    NaraClass.prototype.moveBasedOnPoints = function(startPoint, endPoint) {
        var gesture = this.calcGesture(startPoint, endPoint);

        if(!gesture) {
            return;
        }

        if(gesture.isNext) {
            return this.moveNext();
        }
        if(gesture.isPrev) {
            return this.movePrev();
        }
    }

    NaraClass.prototype.calcGesture = function(startPoint, endPoint) {
        var gestureLimitY = Math.abs(endPoint.y - startPoint.y);
        var gestureLimitX = Math.abs(endPoint.x - startPoint.x);
        var gestureLimit = this.cfg.isHorizontal ? gestureLimitY > 10 : gestureLimitX > 10;

        if (gestureLimit) {
            return;
        }

        var isNext = this.cfg.isHorizontal ? startPoint.x > endPoint.x : startPoint.y > endPoint.y;
        var isPrev = this.cfg.isHorizontal ? startPoint.x < endPoint.x : startPoint.y < endPoint.y;

        return {
            isHorizontal: this.cfg.isHorizontal,
            isVertical: !this.cfg.isHorizontal,
            isNext: isNext,
            isPrev: isPrev
        }
    }

    NaraClass.prototype.start = function() {
        this.timer      = setInterval(this.moveNext.bind(this), this.cfg.autoplayTimeout);
        this.isStarted  = true;
        this.isMoved    = true;
    }

    NaraClass.prototype.stop = function() {
        clearInterval(this.timer);

        this.timer      = null;
        this.isStarted  = false;
    }

    NaraClass.prototype.moveNext = function() {
        if(this.isStarted) {
            if(!this.isMoved) {
                return;
            }
        }
            
            this.isMoved = false;
        var carouselItems   = this.elements.container.querySelectorAll(this.cfg.carouselItemQuerySelector),
            firstChild      = carouselItems[0],
            lastChild       = carouselItems[carouselItems.length],
            clonedSecond    = carouselItems[2].cloneNode(true);

        this.elements.list.style.transition = 'all ' + this.cfg.duration / 1000 + 's';

        if(!this.cfg.isHorizontal) {
            this.elements.list.style.transform  = 'translateY(' + -(this.elements.container.clientHeight / this.cfg.items) * 2 + 'px)';
        } else {
            this.elements.list.style.transform  = 'translateX(' + -(this.elements.container.clientWidth / this.cfg.items) * 2 + 'px)';
        }

        setTimeout(function() {
            this.elements.list.removeChild(carouselItems[0]);

            if(!this.cfg.isHorizontal) { 
                this.elements.list.style.transform  = 'translateY(' + -(this.elements.container.clientHeight / this.cfg.items) + 'px)';
            } else {
                this.elements.list.style.transform  = 'translateX(' + -(this.elements.container.clientWidth / this.cfg.items) + 'px)';
            }

            this.elements.list.insertBefore(clonedSecond, lastChild);
            this.elements.list.style.transition = 'none';
            this.isMoved = true;
        }.bind(this), this.cfg.duration);
    }

    NaraClass.prototype.movePrev = function() {
        if(this.isStarted) {
            if(!this.isMoved) {
                return;
            }
        }

        this.isMoved = false;

        var carouselItems    = this.elements.container.querySelectorAll(this.cfg.carouselItemQuerySelector),
            firstChild       = carouselItems[0],
            lastChild        = carouselItems[carouselItems.length - 1],
            clonedSecondLast = carouselItems[carouselItems.length - 3].cloneNode(true);

        this.elements.list.style.transition = 'all ' + this.cfg.duration / 1000 + 's';

        if(!this.cfg.isHorizontal) {
            this.elements.list.style.transform  = 'translateY(' + 0 + 'px)';
        } else {
            this.elements.list.style.transform  = 'translateX(' + 0 + 'px)';
        }
        
        setTimeout(function(){
            this.elements.list.insertBefore(clonedSecondLast, this.elements.list.firstChild);
            this.elements.list.removeChild(carouselItems[carouselItems.length - 1]);
            this.elements.list.style.transition = 'none';

            if(!this.cfg.isHorizontal) {
                this.elements.list.style.transform  = 'translateY(' + -(this.elements.container.clientHeight / this.cfg.items) + 'px)';
            } else {
                this.elements.list.style.transform  = 'translateX(' + -(this.elements.container.clientWidth / this.cfg.items) + 'px)';
            }
            this.isMoved = true;
        }.bind(this), this.cfg.duration);
    }

    return NaraClass;
}());
