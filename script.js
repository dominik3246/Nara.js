var NaraInit = (function() {
  function NaraInitClass() {
    this.carouselContainer1 = document.querySelector(".carousel-container1");
    this.carouselContainer2 = document.querySelector(".carousel-container2");
    this.carouselContainer3 = document.querySelector(".carousel-container3");
    this.carouselContainer4 = document.querySelector(".carousel-container4");

    this.numberPerPage1 = parseInt(
      this.carouselContainer1.dataset.itemsPerPage
    );
    this.numberPerPage2 = parseInt(
      this.carouselContainer2.dataset.itemsPerPage
    );
    this.numberPerPage3 = parseInt(
      this.carouselContainer3.dataset.itemsPerPage
    );
    this.numberPerPage4 = parseInt(
      this.carouselContainer4.dataset.itemsPerPage
    );
    this.carouselHorizontal1 =
      this.carouselContainer1.dataset.itemDirection === "horizontal";
    this.carouselHorizontal2 =
      this.carouselContainer2.dataset.itemDirection === "horizontal";
    this.carouselHorizontal3 =
      this.carouselContainer3.dataset.itemDirection === "horizontal";
    this.carouselHorizontal4 =
      this.carouselContainer4.dataset.itemDirection === "horizontal";

    this.init();
  }

  NaraInitClass.prototype.init = function() {
    this.initCarousel();
  };

  NaraInitClass.prototype.initCarousel = function() {
    var example1 = new Nara({
      isHorizontal:
        this.carouselHorizontal1 === undefined
          ? true
          : this.carouselHorizontal1,
      items: this.numberPerPage1,
      duration: 500,
      autoplayTimeout: 4000,
      navigation: {
        prev: document.querySelector(".prev1"),
        next: document.querySelector(".next1")
      },
      carouselContainerQuerySelector: '.carousel-container1',
      carouselWrapperQuerySelector: '.carousel-container__wrapper1',
      carouselItemQuerySelector: '.carousel__item1',
    });
    var example2 = new Nara({
      isHorizontal:
        this.carouselHorizontal2 === undefined
          ? true
          : this.carouselHorizontal2,
      items: this.numberPerPage2,
      duration: 500,
      autoplayTimeout: 4000,
      navigation: {
        prev: document.querySelector(".prev2"),
        next: document.querySelector(".next2")
      },
      carouselContainerQuerySelector: '.carousel-container2',
      carouselWrapperQuerySelector: '.carousel-container__wrapper2',
      carouselItemQuerySelector: '.carousel__item2',
    });
    var example3 = new Nara({
      isHorizontal:
        this.carouselHorizontal3 === undefined
          ? true
          : this.carouselHorizontal3,
      items: this.numberPerPage3,
      duration: 500,
      autoplayTimeout: 4000,
      navigation: {
        prev: document.querySelector(".prev3"),
        next: document.querySelector(".next3")
      },
      carouselContainerQuerySelector: '.carousel-container3',
      carouselWrapperQuerySelector: '.carousel-container__wrapper3',
      carouselItemQuerySelector: '.carousel__item3',
    });
    var example4 = new Nara({
      isHorizontal:
        this.carouselHorizontal4 === undefined
          ? true
          : this.carouselHorizontal4,
      items: this.numberPerPage4,
      duration: 500,
      autoplayTimeout: 4000,
      navigation: {
        prev: document.querySelector(".prev4"),
        next: document.querySelector(".next4")
      },
      carouselContainerQuerySelector: '.carousel-container4',
      carouselWrapperQuerySelector: '.carousel-container__wrapper4',
      carouselItemQuerySelector: '.carousel__item4',
    });

    example1.start();
    example2.start();
    example3.start();
    example4.start();
  };

  return NaraInitClass;
})();

var naraCarousel = new NaraInit();
