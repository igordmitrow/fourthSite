
class Slider {
	constructor() {
		this.slides = [];
		this.current = 0;
		this.arrows = [];
		this.indicators = [];
		this.wrapper = 'slider';
		this.domWrapper = document.querySelector(`.${this.wrapper}`);
		this.isMouseDown = 0;
		this.dx = 0;
    this.width = 0;
		this.initSlider().then(this.initArrows()).then(this.disabledBtn());
  	}

  	async callChgSlide() {
  		if(this.dx <= -1) {
  			this.changeSlide(1);
  		} else if (this.dx >= 1) {
  			this.changeSlide(-1);
  		}
  		this.dx = 0;
  	}

    async disabledBtn() {
      if(this.current == 0) {
        this.arrows[0].setAttribute('disabled',true);
      }else {
        this.arrows[0].removeAttribute('disabled');
      }

      if(this.current == this.slides.length - 1 ){
        this.arrows[1].setAttribute('disabled',true);
      }else {
        this.arrows[1].removeAttribute('disabled');
      }
    }

    async changeInd() {
      document.querySelector('.active-indicator').classList.remove('active-indicator');
      this.indicators[this.current].classList.add('active-indicator');
    }

  	async changeSlide(dir) {
      if(this.current + dir >= 0 && this.current + dir < this.slides.length){
        this.current += dir;
        var width = 0;
        this.slides.slice(0,this.current).forEach(function (e) {
          this.width += e.offsetWidth + 20;
        }.bind(this));
        this.domWrapper.style.transform = `translateX(${(this.width)*-1}px)`;
        this.width = 0;

        this.disabledBtn();
        this.changeInd();
      } 
  	}

  	async indHandlerClick(e) {
  		this.changeSlide(this.indicators.indexOf(e.target)-this.current);
  	}

  	//Add Event Listener for Arrows
  	async initArrows() {
  		this.arrows.forEach( function(e){
  			e.addEventListener('click', function (e) {
  				let dir;
  				dir = (this.arrows[0] == e.target || this.arrows[0] == e.target.parentElement) ? -1 : 1;
  				this.changeSlide(dir);
  			}.bind(this));
  		}.bind(this));
  	}

  	//Initialize slider
  	async initSlider() {
  		document.querySelectorAll(`.${this.wrapper} *`).forEach( function (e){
  			if(e.classList.contains('slide')) {
  				this.slides.push(e);
  			}
  		}.bind(this));

      document.querySelectorAll(`.management * *`).forEach( function (e) {
        if (e.classList.contains('arrow')) {
          this.arrows.push(e.parentElement);
        }else if (e.classList.contains('indicator')) {
          this.indicators.push(e);
          e.addEventListener('click', function (event) {
            this.indHandlerClick(event);
          }.bind(this));
        }
      }.bind(this));

  		this.domWrapper.addEventListener('mousemove', function (e) {
  			if(this.isMouseDown){
  				if(this.direction == 1){
	  				this.dx += e.movementY;
	  			} else {
		  			this.dx += e.movementX;
	  			}
  			}
  		}.bind(this));

  		this.domWrapper.addEventListener('mousedown', function () {
  			this.dx = 0;
  			this.isMouseDown = 1;
  		}.bind(this));

  		this.domWrapper.addEventListener('mouseup', function () {
  			this.isMouseDown = 0;
  			this.callChgSlide();
  		}.bind(this));

  		this.domWrapper.addEventListener('touchstart', function(e) {
  			if(this.direction == 1){
  				this.dx = e.touches[0].clientY;
  			} else {
				this.dx = e.touches[0].clientX;
  			}
		}.bind(this));

		this.domWrapper.addEventListener('touchend', function(e) {
			if(this.direction == 1){
  				this.dx = e.changedTouches[0].clientY * -1;
  			} else {
				this.dx = e.changedTouches[0].clientX * -1;
  			}
			this.dx /= -30;
			this.callChgSlide();			
		}.bind(this));
  	}


} 