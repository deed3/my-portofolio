const canvas = document.getElementById('cursor-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

const mouse = { x: undefined, y: undefined };

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    if(Math.random() > 0.4) { 
        particles.push(new Particle(mouse.x, mouse.y));
    }
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 20 + 10; 
        
        const colors = [
            'rgba(233, 213, 255, 0.6)', // Purple
            'rgba(187, 247, 208, 0.6)', // Green
            'rgba(252, 165, 165, 0.6)'  // Pink
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = 1; 
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
        this.life -= 0.015;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.globalAlpha = this.life > 0 ? this.life : 0;
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }
}

function animate() {
    ctx.fillStyle = 'rgba(250, 250, 250, 0.3)'; 
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].life <= 0 || particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}

animate();