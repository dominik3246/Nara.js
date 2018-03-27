var Carousel = (function() {
    function CaruselClass(element, cfg) {
        this.cfg        = {
            elementAmount:  cfg.elementAmount || 2,
            duration:       cfg.duration || 1000,
            auto:           cfg.auto !== undefined ? cfg.auto : true,
            navigation:     cfg.navigation || {},
            isHorizontal:   cfg.isHorizontal === undefined ? false : cfg.isHorizontal
        };
        this.timer          = null;
        this.isStarted      = false;
        this.isMoved        = false;
        this.elementSize    = null;

        this.elements   = {
            container:  element,
            list:       element.querySelector('ul')
        };

        this.init();
    }

    CaruselClass.prototype.init = function() {
        this.elementSize = this.getElementSize();

        this.setSize();
        this.addEvents();
    };

    CaruselClass.prototype.getElementSize = function() {
        var w = this.elements.container.clientWidth;
        var h = this.elements.container.clientHeight;

        if(this.cfg.isHorizontal){
            return {
                width:  w / this.cfg.elementAmount,
                height: h
            };
        }

        return {
            width:  w,
            height: h / this.cfg.elementAmount
        };
    };

    CaruselClass.prototype.setSize = function() {
        var items = this.elements.container.querySelectorAll('li');

        if(this.cfg.isHorizontal) {
            this.elements.list.classList.add('horizontal');
            this.elements.list.style.width = this.elementSize.width * items.length + 'px';
        }

        items.forEach(function(item){
            item.style.width    = this.elementSize.width + 'px';
            item.style.height   = this.elementSize.height + 'px';
        }.bind(this));
    };

    CaruselClass.prototype.addEvents = function(){
        if(this.cfg.navigation.prev){
            this.cfg.navigation.prev.addEventListener('click', this.movePrev.bind(this));
        }
        if(this.cfg.navigation.next){
            this.cfg.navigation.next.addEventListener('click', this.moveNext.bind(this));
        }
    };

    CaruselClass.prototype.start = function() {
        this.isStarted  = true;

        if(this.cfg.auto) {
            var time = Number.isInteger(this.cfg.auto) ? this.cfg.auto : 1000;
            this.timer = setInterval(this.moveNext.bind(this), time);
        }
    };

    CaruselClass.prototype.stop = function() {
        if(this.timer) {
            clearInterval(this.timer);
        }

        this.timer      = null;
        this.isStarted  = false;
    };

    CaruselClass.prototype.moveNext = function() {
        if(!this.isStarted){
            return;
        }
        if(this.isMoved){
            return;
        }

        this.isMoved = true;

        this.moveAnimation(-this.getMainSize(), this.cfg.duration, function(){
            this.firstItemToEnd();

            this.isMoved = false;
        }.bind(this));
    };

    CaruselClass.prototype.movePrev = function() {
        if(!this.isStarted){
            return;
        }
        if(this.isMoved){
            return;
        }

        this.isMoved = true;

        this.lastItemToStart();
        this.setListPosition(-this.getMainSize());

        setTimeout(function(){
            this.moveAnimation(0, this.cfg.duration, function(){
                this.isMoved = false;
            }.bind(this));
        }.bind(this), 10);
    };

    CaruselClass.prototype.firstItemToEnd = function(){
        var elements    = this.elements.container.querySelectorAll('li');
        var firstElem   = elements[0];
        var lastElem    = elements[elements.length - 1];

        this.elements.list.insertBefore(firstElem, lastElem.nextSibling);
    };

    CaruselClass.prototype.lastItemToStart = function(){
        var elements    = this.elements.container.querySelectorAll('li');
        var firstElem   = elements[0];
        var lastElem    = elements[elements.length - 1];

        this.elements.list.insertBefore(lastElem, firstElem);
    };

    CaruselClass.prototype.setListPosition = function(value) {
        var styleFiled  = (this.cfg.isHorizontal) ? 'marginLeft' : 'marginTop';

        this.elements.list.style[styleFiled] = value + 'px';
    };

    CaruselClass.prototype.getMainSize = function() {
        return this.cfg.isHorizontal ? this.elementSize.width : this.elementSize.height;
    };

    CaruselClass.prototype.moveAnimation = function(to, duration, onDone){
        onDone          = onDone || function(){};

        this.elements.list.style.transition = 'all ' + duration / 1000 + 's';
        this.setListPosition(to);

        setTimeout(function(){
            this.elements.list.style.transition = 'none';
            this.setListPosition(0);

            onDone();
        }.bind(this), duration);
    };

    return CaruselClass;
}());
