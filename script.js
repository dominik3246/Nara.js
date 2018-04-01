var NaraInit = (function() {
    function NaraInitClass() {
        this.carousel = document.querySelector('.carousel');
        this.carouselDatasets = this.carousel.querySelectorAll('[data-field-name]');
        this.carouselContainer = document.querySelector('.carousel-container');
        this.carouselWrapper = document.querySelector('.carousel-container__wrapper');
        
        this.numberPerPage = parseInt(this.carouselContainer.dataset.itemsPerPage);
        this.carouselHorizontal = this.carouselContainer.dataset.itemDirection === 'horizontal';

        this.init();
    }

    NaraInitClass.prototype.init = function() {
        this.includeImages();
    }

    NaraInitClass.prototype.includeImages = function() {
        
        this.carouselContainer.style.overflow = 'hidden';
        // for(var i = 1; i <= 4; i++) {
        //     var li = document.createElement('li');
        //     li.style.background = 'url(images/' + i + '.jpg) no-repeat 50% 50%';
        //     li.style.width = '100%';
        //     this.carouselWrapper.appendChild(li);
        // }
        
        var carousel = new Nara(this.carouselContainer, {
            isHorizontal: this.carouselHorizontal === undefined ? true : this.carouselHorizontal,
            items: this.numberPerPage,
            duration: 500,
            autoplayTimeout: 2000,
            // navigation: {
            //     prev: document.querySelector('.banner-carousel__button-prev'),
            //     next: document.querySelector('.banner-carousel__button-next'),
            // }
        });   
        carousel.start();
    }

    return NaraInitClass;
}());

var naraCarousel = new NaraInit();
