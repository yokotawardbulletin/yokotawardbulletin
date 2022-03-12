function backgroundSnow(){
  document.addEventListener('DOMContentLoaded', function(){
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = function(){
        particlesJS("snow", {
            "particles": {
                "number": {
                    "value": 200,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "opacity": {
                    "value": 0.7,
                    "random": false,
                    "anim": {
                        "enable": false
                    }
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 5,
                    "direction": "bottom",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 300,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "events": {
                    "onhover": {
                        "enable": false
                    },
                    "onclick": {
                        "enable": false
                    },
                    "resize": false
                }
            },
            "retina_detect": true
        });
    }
    document.head.append(script);
  })
};

function backgroundSakura (){
  var Petal = /** @class */ (function () {
    function Petal(config) {
        this.customClass = config.customClass || '';
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.z = config.z || 0;
        this.xSpeedVariation = config.xSpeedVariation || 0;
        this.ySpeed = config.ySpeed || 0;
        this.rotation = {
            axis: 'X',
            value: 0,
            speed: 0,
            x: 0
        };
        if (config.rotation && typeof config.rotation === 'object') {
            this.rotation.axis = config.rotation.axis || this.rotation.axis;
            this.rotation.value = config.rotation.value || this.rotation.value;
            this.rotation.speed = config.rotation.speed || this.rotation.speed;
            this.rotation.x = config.rotation.x || this.rotation.x;
        }
        this.el = document.createElement('div');
        this.el.className = 'petal  ' + this.customClass;
        this.el.style.position = 'absolute';
        this.el.style.backfaceVisibility = 'visible';
    }
    return Petal;
  }());
  var BlossomScene = /** @class */ (function () {
      function BlossomScene(config) {
          var container = document.getElementById(config.id);
          if (container === null) {
              throw new Error('[id] provided was not found in document');
          }
          this.container = container;
          this.placeholder = document.createElement('div');
          this.petals = [];
          this.numPetals = config.numPetals || 4;
          this.petalsTypes = config.petalsTypes;
          this.gravity = config.gravity || 0.8;
          this.windMaxSpeed = config.windMaxSpeed || 4;
          this.windMagnitude = 0.2;
          this.windDuration = 0;
          this.width = this.container.offsetWidth;
          this.height = this.container.offsetHeight;
          this.timer = 0;
          this.container.style.overflow = 'hidden';
          this.placeholder.style.transformStyle = 'preserve-3d';
          this.placeholder.style.width = this.container.offsetWidth + 'px';
          this.placeholder.style.height = this.container.offsetHeight + 'px';
          this.container.appendChild(this.placeholder);
          this.createPetals();
          requestAnimationFrame(this.updateFrame.bind(this));
      }
      /**
       * Reset the petal position when it goes out of container
       */
      BlossomScene.prototype.resetPetal = function (petal) {
          petal.x = this.width * 2 - Math.random() * this.width * 1.75;
          petal.y = petal.el.offsetHeight * -1;
          petal.z = Math.random() * 200;
          if (petal.x > this.width) {
              petal.x = this.width + petal.el.offsetWidth;
              petal.y = Math.random() * this.height / 2;
          }
          // Rotation
          petal.rotation.speed = Math.random() * 10;
          var randomAxis = Math.random();
          if (randomAxis > 0.5) {
              petal.rotation.axis = 'X';
          }
          else if (randomAxis > 0.25) {
              petal.rotation.axis = 'Y';
              petal.rotation.x = Math.random() * 180 + 90;
          }
          else {
              petal.rotation.axis = 'Z';
              petal.rotation.x = Math.random() * 360 - 180;
              // looks weird if the rotation is too fast around this axis
              petal.rotation.speed = Math.random() * 3;
          }
          // random speed
          petal.xSpeedVariation = Math.random() * 0.8 - 0.4;
          petal.ySpeed = Math.random() + this.gravity;
          return petal;
      };
      /**
       * Calculate wind speed
       */
      BlossomScene.prototype.calculateWindSpeed = function (t, y) {
          var a = this.windMagnitude / 2 * (this.height - 2 * y / 3) / this.height;
          return a * Math.sin(2 * Math.PI / this.windDuration * t + (3 * Math.PI / 2)) + a;
      };
      /**
       * Update petal position
       */
      BlossomScene.prototype.updatePetal = function (petal) {
          var petalWindSpeed = this.calculateWindSpeed(this.timer, petal.y);
          var xSpeed = petalWindSpeed + petal.xSpeedVariation;
          petal.x -= xSpeed;
          petal.y += petal.ySpeed;
          petal.rotation.value += petal.rotation.speed;
          var t = 'translateX( ' + petal.x + 'px ) translateY( ' + petal.y + 'px ) translateZ( ' + petal.z + 'px )  rotate' + petal.rotation.axis + '( ' + petal.rotation.value + 'deg )';
          if (petal.rotation.axis !== 'X') {
              t += ' rotateX(' + petal.rotation.x + 'deg)';
          }
          petal.el.style.transform = t;
          // reset if out of view
          if (petal.x < -10 || petal.y > this.height + 10) {
              this.resetPetal(petal);
          }
      };
      /**
       * Change the wind speed
       */
      BlossomScene.prototype.updateWind = function () {
          // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration
          this.windMagnitude = Math.random() * this.windMaxSpeed;
          this.windDuration = this.windMagnitude * 50 + (Math.random() * 20 - 10);
      };
      /**
       * Create the petals elements
       */
      BlossomScene.prototype.createPetals = function () {
          for (var i = 0; i < this.numPetals; i++) {
              var tmpPetalType = this.petalsTypes[Math.floor(Math.random() * (this.petalsTypes.length - 1))];
              var tmpPetal = new Petal({ customClass: tmpPetalType.customClass });
              this.resetPetal(tmpPetal);
              this.petals.push(tmpPetal);
              this.placeholder.appendChild(tmpPetal.el);
          }
      };
      /**
       * Update the animation frame
       */
      BlossomScene.prototype.updateFrame = function () {
          if (this.timer === this.windDuration) {
              this.updateWind();
              this.timer = 0;
          }
          var petalsLen = this.petals.length;
          for (var i = 0; i < petalsLen; i++) {
              this.updatePetal(this.petals[i]);
          }
          this.timer++;
          requestAnimationFrame(this.updateFrame.bind(this));
      };
      return BlossomScene;
  }());
  var petalsTypes = [
      new Petal({ customClass: 'petal-style1' }),
      new Petal({ customClass: 'petal-style2' }),
      new Petal({ customClass: 'petal-style3' }),
      new Petal({ customClass: 'petal-style4' })
  ];
  var myBlossomSceneConfig = {
      id: 'blossom_container',
      petalsTypes: petalsTypes
  };
  var myBlossomScene = new BlossomScene(myBlossomSceneConfig);

}