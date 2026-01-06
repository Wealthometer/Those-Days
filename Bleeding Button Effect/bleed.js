let box = document.getElementById('box');
function createParticle(){
    let particle = document.createElement('div');
    particle.classList.add("particle");

    let angle = Math.random() * 2 * Math.PI;
    let distance = 150 + Math.random() * 100;

    let dx = Math.cos(angle) * distance + 'px';
    let dy = Math.sin(angle) * distance + 'px';

    particle.style.setProperty('--dx', dx);
    particle.style.setProperty('--dy', dy);

    particle.style.left = '50%';
    particle.style.top = '50%';
    particle.style.transform = 'transform(-50%,-50%)';

    box.appendChild(particle);
    setTimeout(() => {
        particle.remove();
    },2000)
}

setInterval(() => {
    for(let i = 0; i < 3; i++){
        createParticle();
    }
},100)