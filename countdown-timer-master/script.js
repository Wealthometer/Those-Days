const clock = document.querySelector('.timer')

const popup = document.querySelector('.popup-wrapp')

let interval;

clock.addEventListener('click' ,()=>{
    popup.classList.add('show')
    document.body.classList.add('shadow')
})

//DISPLAY INPUT VALUE ON SCREEN

const set_time = document.querySelectorAll('.popup input')
const time = document.querySelectorAll('.timer div')
console.log(time);

set_time.forEach(s=>{
    s.addEventListener('click' ,()=>{
        time.forEach(t=>{
            if(t.dataset.index == s.dataset.value){
                t.innerHTML = pad(s.value) 
            }
        })
    })
})

let seconds;
const start = document.querySelector('.start')

start.addEventListener('click' , countDown)


const hour = document.querySelector('.hour')
const min = document.querySelector('.min')
const sec = document.querySelector('.sec')

const play_pause = document.querySelector('.play-pause')
const reset = document.querySelector('.reset')

function countDown(){

    play_pause.classList.add('allow')
    reset.classList.add('allow')

    popup.classList.remove('show')
    document.body.classList.remove('shadow')
    //TIME TO SECONDS CALCULATER
    let h = parseInt(time[0].innerHTML *60 *60)
    let m = parseInt(time[1].innerHTML *60)  
    let s = parseInt(time[2].innerHTML ) 
  
    seconds = h + m + s
    //store seconds in container
    const container = document.querySelector('.container')
    container.dataset.index = seconds
    
     interval = setInterval(()=>{
         if(seconds != 0){
            seconds--
            hour.innerHTML = pad(Math.floor(seconds / 3600))
            min.innerHTML = pad(Math.floor(seconds % 3600 /60))
            sec.innerHTML = pad(Math.floor(seconds % 60))
         }else{
             restart()
         }
      
    },1000)
}

//RESET COUNTDOWN

reset.addEventListener('click' ,restart)
function restart(){
    clearInterval(interval)
    hour.innerHTML = '00'
    min.innerHTML = '00'
    sec.innerHTML = '00'
    popup.classList.add('show')
    document.body.classList.add('shadow')

    set_time.forEach(s=>{
        s.value =0
    })
}

play_pause.addEventListener('click' ,()=>{
    if(play_pause.classList.contains('p')){
        clearInterval(interval)
        play_pause.classList.remove('p')
        play_pause.innerHTML = ('Play')
    }else{
        play_pause.classList.add('p')
        play_pause.innerHTML = 'Pause'
        countDown()
    }
})

//HH:MM:SS FORMAT 
function pad(val){
    let valString =val +""
    if(valString.length < 2){
        return "0" + valString
    }else{
        return valString
    }
}