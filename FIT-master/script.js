const bars = document.querySelector('.fa-solid.fa-bars')
const menu = document.querySelector('.nav-menu')

bars.addEventListener('click' ,()=>{
    menu.classList.add('show-menu')
})

document.addEventListener('mouseup' ,(e)=>{
    if(!menu.contains(e.target)){
        menu.classList.remove('show-menu')
    }

})


let counter = 1
const bullets = document.querySelectorAll('.bullets span')


setInterval(()=>{
    document.querySelector('.image.show').classList.remove('show')
    const slider = document.querySelector(`.img-${counter}`)

    bullets.forEach((b=>{
        b.classList.remove('active')
        if(b.dataset.value == counter){
            b.classList.add('active')
        }
    }))

    counter++
    slider.classList.add('show')

    if(counter >3){
        counter=1
    }
},2000)


gsap.to('.images-wrapper img' ,{duration:1 , x:'0px' ,ease:'ease'})
gsap.from('.wrapper div' ,{duration:1 ,opacity:0, delay:1 , stagger:.5})
gsap.from('.img img' , {duration:1 , x:'-100vw' , ease:'ease'})
gsap.from('.side-one .txt' , {duration:1 , delay:1 , y:'-100vh' ,ease:'power2.in'})
gsap.fromTo('.big-title' , {opacity:0 , scale:0 , rotation:400},
{duration:1 , delay:2.5, opacity:1 , scale:1 ,rotation:0}
)