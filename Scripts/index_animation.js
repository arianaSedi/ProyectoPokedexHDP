// Configuración inicial
const pokebola = document.querySelector(".pokebola");
const glow = document.getElementById("glow");
const sonidoPokebola = document.getElementById("sonido-pokebola");

// Configuración de PIXI.js para las estrellas
const app = new PIXI.Application({
    view: document.getElementById("stars-canvas"),
    resizeTo: window,
    transparent: true,
    antialias: true
});

// Colores para las estrellas
const starColors = [0xFFD700, 0xFFDF00, 0xFFEC00, 0xFFF700, 0xFFFF00];

// Crear textura de estrella
function createStarTexture() {
    const graphics = new PIXI.Graphics();
    const size = 32;
    
    graphics.beginFill(0xFFFFFF);
    graphics.drawStar(size/2, size/2, 5, size/2, size/4);
    graphics.endFill();
    
    return app.renderer.generateTexture(graphics);
}

const starTexture = createStarTexture();

// Crear estrellas
function createStars(count, duration) {
    // Limpiar estrellas anteriores
    app.stage.removeChildren();
    
    for (let i = 0; i < count; i++) {
        const star = new PIXI.Sprite(starTexture);
        
        // Configuración inicial
        star.anchor.set(0.5);
        star.x = app.screen.width / 2;
        star.y = app.screen.height / 2;
        star.scale.set(0);
        star.alpha = 0;
        star.tint = starColors[Math.floor(Math.random() * starColors.length)];
        
        // Propiedades de animación
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 300 + 100;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        const scaleEnd = 0.5 + Math.random() * 1;
        const rotationSpeed = (Math.random() - 0.5) * 0.2;
        
        // Animación con GSAP
        const delay = Math.random() * 0.3;
        const starDuration = duration * (0.7 + Math.random() * 0.6);
        
        gsap.to(star, {
            x: app.screen.width/2 + endX,
            y: app.screen.height/2 + endY,
            duration: starDuration,
            delay: delay,
            ease: "power1.out"
        });
        
        gsap.to(star.scale, {
            x: scaleEnd,
            y: scaleEnd,
            duration: starDuration * 0.5,
            delay: delay,
            ease: "power2.out"
        });
        
        gsap.to(star, {
            alpha: 1,
            duration: 0.2,
            delay: delay
        });
        
        gsap.to(star, {
            alpha: 0,
            duration: 0.5,
            delay: delay + starDuration * 0.7
        });
        
        gsap.to(star, {
            rotation: rotationSpeed * starDuration,
            duration: starDuration,
            delay: delay
        });
        
        app.stage.addChild(star);
    }
}

// Efecto de glow (como en tu versión original)
function lerp(start, end, t) {
    return start + (end - start) * t;
}

function interpolateColor(t) {
    const r = lerp(255, 255, t);
    const g = lerp(255, 82, t);
    const b = lerp(255, 82, t);
    const a = lerp(0.9, 1, t);
    return `rgba(${r},${g},${b},${a})`;
}

function animateGlow(durationMs, callback) {
    let start = null;
    const scaleStart = 0.5;
    const scaleEnd = 25;

    function step(timestamp) {
        if (!start) start = timestamp;
        let elapsed = timestamp - start;
        let progress = Math.min(elapsed / durationMs, 1);

        let scale = lerp(scaleStart, scaleEnd, progress);
        let color = interpolateColor(progress);

        glow.style.transform = `translate(-50%, -50%) scale(${scale})`;

        if (progress < 0.99) {
            glow.style.background = `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`;
            glow.style.borderRadius = '50%';
        } else {
            glow.style.background = '#ff5252';
            glow.style.borderRadius = '0';
        }

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            setTimeout(() => {
                if (callback) callback();
            }, 500);
        }
    }

    requestAnimationFrame(step);
}

// Función principal
function estadoPokebola() {
    if (!pokebola.classList.contains("open")) {
        pokebola.classList.add("open");

        // Configurar sonido
        sonidoPokebola.currentTime = 0;
        sonidoPokebola.playbackRate = 1.25;
        sonidoPokebola.play().catch(e => console.warn("No se pudo reproducir el sonido:", e));

        // Preparar glow
        glow.style.opacity = '1';
        glow.style.transform = 'translate(-50%, -50%) scale(0.5)';
        glow.style.background = 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)';
        glow.style.borderRadius = '50%';

        // Determinar duración basada en el audio
        const handleDuration = (duration) => {
            const durationMs = (duration * 1000) / 2;
            createStars(30 + Math.floor(Math.random() * 20), durationMs / 1000);
            animateGlow(durationMs, () => {
                window.location.href = "home.html";
            });
        };

        if (isNaN(sonidoPokebola.duration) || sonidoPokebola.duration === 0) {
            sonidoPokebola.addEventListener("loadedmetadata", () => {
                handleDuration(sonidoPokebola.duration);
            }, { once: true });
        } else {
            handleDuration(sonidoPokebola.duration);
        }
    }
}

// Manejo de redimensionamiento
window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});