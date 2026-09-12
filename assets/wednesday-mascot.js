/**
 * Wednesday Addams Animated Mascot
 * A lightweight, responsive character that walks around your portfolio
 * Perfect for a dark, elegant software engineer theme
 */

class WednesdayMascot {
  constructor(options = {}) {
    this.container = options.container || document.body;
    this.speed = options.speed || 2;
    this.debugMode = options.debug || false;
    this.isMobile = window.innerWidth < 768;
    
    if (this.isMobile) return; // Disabled on mobile
    
    this.x = Math.random() * window.innerWidth;
    this.y = window.innerHeight - 200;
    this.direction = Math.random() > 0.5 ? 1 : -1;
    this.walkCycle = 0;
    this.isWalking = true;
    this.pauseTimer = null;
    this.debugElement = null;
    
    this.init();
  }

  init() {
    // Create SVG container
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', '120');
    this.svg.setAttribute('height', '160');
    this.svg.setAttribute('viewBox', '0 0 120 160');
    this.svg.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: ${this.x}px;
      z-index: 9999;
      pointer-events: none;
      filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
    `;

    // Draw Wednesday character
    this.drawWednesday();
    
    // Create wrapper div
    this.wrapper = document.createElement('div');
    this.wrapper.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: ${this.x}px;
      width: 120px;
      height: 160px;
      z-index: 9999;
      pointer-events: none;
    `;
    this.wrapper.appendChild(this.svg);
    this.container.appendChild(this.wrapper);

    if (this.debugMode) this.createDebug();
    this.startAnimation();
    window.addEventListener('resize', () => this.handleResize());
  }

  drawWednesday() {
    // Head
    const head = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    head.setAttribute('cx', '60');
    head.setAttribute('cy', '30');
    head.setAttribute('r', '18');
    head.setAttribute('fill', '#f5d5b8');
    head.setAttribute('stroke', '#000');
    head.setAttribute('stroke-width', '1.5');
    this.svg.appendChild(head);

    // Hair (black, long, straight)
    const hair = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    hair.setAttribute('d', 'M 42 12 Q 30 20 30 40 L 30 80 Q 35 85 60 85 Q 85 85 90 80 L 90 40 Q 90 20 78 12 Z');
    hair.setAttribute('fill', '#1a1a1a');
    hair.setAttribute('stroke', '#000');
    hair.setAttribute('stroke-width', '1.5');
    this.svg.appendChild(hair);

    // Eyes (pale, deadpan)
    const eyeLeft = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    eyeLeft.setAttribute('cx', '50');
    eyeLeft.setAttribute('cy', '28');
    eyeLeft.setAttribute('r', '3');
    eyeLeft.setAttribute('fill', '#000');
    this.svg.appendChild(eyeLeft);

    const eyeRight = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    eyeRight.setAttribute('cx', '70');
    eyeRight.setAttribute('cy', '28');
    eyeRight.setAttribute('r', '3');
    eyeRight.setAttribute('fill', '#000');
    this.svg.appendChild(eyeRight);

    // Mouth (straight line, no expression)
    const mouth = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    mouth.setAttribute('x1', '50');
    mouth.setAttribute('y1', '38');
    mouth.setAttribute('x2', '70');
    mouth.setAttribute('y2', '38');
    mouth.setAttribute('stroke', '#000');
    mouth.setAttribute('stroke-width', '1.5');
    this.svg.appendChild(mouth);

    // Dress (black, simple)
    const dress = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    dress.setAttribute('d', 'M 40 50 L 35 80 L 35 140 Q 35 145 40 145 L 80 145 Q 85 145 85 140 L 85 80 L 80 50 Z');
    dress.setAttribute('fill', '#1a1a1a');
    dress.setAttribute('stroke', '#000');
    dress.setAttribute('stroke-width', '1.5');
    this.svg.appendChild(dress);

    // Collar (white)
    const collar = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    collar.setAttribute('d', 'M 45 48 L 50 52 L 60 50 L 70 52 L 75 48');
    collar.setAttribute('fill', '#ffffff');
    collar.setAttribute('stroke', '#000');
    collar.setAttribute('stroke-width', '1');
    this.svg.appendChild(collar);

    // White cross on dress
    const crossV = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    crossV.setAttribute('x1', '60');
    crossV.setAttribute('y1', '60');
    crossV.setAttribute('x2', '60');
    crossV.setAttribute('y2', '100');
    crossV.setAttribute('stroke', '#ffffff');
    crossV.setAttribute('stroke-width', '2');
    this.svg.appendChild(crossV);

    const crossH = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    crossH.setAttribute('x1', '50');
    crossH.setAttribute('y1', '80');
    crossH.setAttribute('x2', '70');
    crossH.setAttribute('y2', '80');
    crossH.setAttribute('stroke', '#ffffff');
    crossH.setAttribute('stroke-width', '2');
    this.svg.appendChild(crossH);

    // Legs (thin, pale)
    const legLeft = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    legLeft.setAttribute('x1', '48');
    legLeft.setAttribute('y1', '140');
    legLeft.setAttribute('x2', '48');
    legLeft.setAttribute('y2', '155');
    legLeft.setAttribute('stroke', '#f5d5b8');
    legLeft.setAttribute('stroke-width', '3');
    legLeft.setAttribute('stroke-linecap', 'round');
    this.legLeft = legLeft;
    this.svg.appendChild(legLeft);

    const legRight = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    legRight.setAttribute('x1', '72');
    legRight.setAttribute('y1', '140');
    legRight.setAttribute('x2', '72');
    legRight.setAttribute('y2', '155');
    legRight.setAttribute('stroke', '#f5d5b8');
    legRight.setAttribute('stroke-width', '3');
    legRight.setAttribute('stroke-linecap', 'round');
    this.legRight = legRight;
    this.svg.appendChild(legRight);

    // Mary Jane shoes (black)
    const shoeLeft = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    shoeLeft.setAttribute('x', '42');
    shoeLeft.setAttribute('y', '153');
    shoeLeft.setAttribute('width', '12');
    shoeLeft.setAttribute('height', '6');
    shoeLeft.setAttribute('fill', '#1a1a1a');
    shoeLeft.setAttribute('stroke', '#000');
    shoeLeft.setAttribute('stroke-width', '1');
    this.svg.appendChild(shoeLeft);

    const shoeRight = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    shoeRight.setAttribute('x', '66');
    shoeRight.setAttribute('y', '153');
    shoeRight.setAttribute('width', '12');
    shoeRight.setAttribute('height', '6');
    shoeRight.setAttribute('fill', '#1a1a1a');
    shoeRight.setAttribute('stroke', '#000');
    shoeRight.setAttribute('stroke-width', '1');
    this.svg.appendChild(shoeRight);

    // Store leg references for animation
    this.legLeftY = [140, 138, 140, 142]; // Walking cycle
    this.legRightY = [142, 140, 142, 140];
  }

  startAnimation() {
    const animate = () => {
      if (this.isWalking) {
        this.updatePosition();
        this.updateWalkCycle();
      }
      requestAnimationFrame(animate);
    };
    animate();
  }

  updatePosition() {
    this.x += this.direction * this.speed;

    // Bounce off edges
    if (this.x <= 0) {
      this.x = 0;
      this.direction = 1;
      this.flipDirection();
    } else if (this.x >= window.innerWidth - 120) {
      this.x = window.innerWidth - 120;
      this.direction = -1;
      this.flipDirection();
    }

    this.wrapper.style.left = this.x + 'px';

    // Random pause and direction changes
    if (Math.random() < 0.002) {
      this.pauseWalking();
    }

    if (this.debugMode) {
      this.debugElement.textContent = `X: ${Math.round(this.x)} | Walking: ${this.isWalking}`;
    }
  }

  updateWalkCycle() {
    const cycle = Math.floor(this.walkCycle) % 4;
    this.legLeft.setAttribute('y2', this.legLeftY[cycle] + 15);
    this.legRight.setAttribute('y2', this.legRightY[cycle] + 15);
    this.walkCycle += 0.1;
  }

  flipDirection() {
    // Flip SVG horizontally
    if (this.direction === -1) {
      this.svg.style.transform = 'scaleX(-1)';
    } else {
      this.svg.style.transform = 'scaleX(1)';
    }
  }

  pauseWalking() {
    this.isWalking = false;
    clearTimeout(this.pauseTimer);
    this.pauseTimer = setTimeout(() => {
      this.isWalking = true;
    }, 2000 + Math.random() * 3000);
  }

  handleResize() {
    if (window.innerWidth < 768 && !this.isMobile) {
      this.wrapper.style.display = 'none';
      this.isMobile = true;
    } else if (window.innerWidth >= 768 && this.isMobile) {
      this.wrapper.style.display = 'block';
      this.isMobile = false;
    }
  }

  createDebug() {
    this.debugElement = document.createElement('div');
    this.debugElement.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      background: rgba(0,0,0,0.8);
      color: #0f0;
      font-family: monospace;
      padding: 10px;
      border-radius: 4px;
      z-index: 10000;
    `;
    document.body.appendChild(this.debugElement);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new WednesdayMascot({ speed: 1.5, debug: false });
  });
} else {
  new WednesdayMascot({ speed: 1.5, debug: false });
}
