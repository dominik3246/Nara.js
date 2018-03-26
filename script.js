var bannerElem = document.querySelector('.banner'),
    bannerDatasets = bannerElem.querySelectorAll('[data-field-name]'),
    bannerCarouselContainer = document.querySelector('.banner-carouselContainer'),
    numberPerPage = parseInt(bannerCarouselContainer.dataset.itemsPerPage),
    bannerCarouselWrapper = document.querySelector('.banner-carouselWrapper');

    // bannerElem.addEventListener('click', () => {
    //     window.open(product.Url, '_blank');
    // })

function addLogo() {
    bannerElem.querySelector('.logo').style.background = "url('local-images/logo.png') no-repeat 50% 50%";
    bannerElem.querySelector('.logo').style.backgroundSize = "44px";
}

addLogo();

function includeImages() {

        for(var i = 1; i <= 5; i++) {
            var li = document.createElement('li');
            li.style.background = 'url(./images/' + i + '.jpg) no-repeat 50% 50%';
            // div.style.width = '100%';
            bannerCarouselWrapper.appendChild(li)
        }

        var banner = new Carousel(bannerCarouselContainer, {
            isHorizontal: true,
            items: numberPerPage
        })

        // var mySiema = new Siema({
        //     selector: '.siema',
        //     duration: 200,
        //     perPage: 1,
        //     loop: true,
        //     draggable: true,
        // });

        // setInterval(function() {
        //     mySiema.next()
        // }, 2500)
    }

includeImages();
