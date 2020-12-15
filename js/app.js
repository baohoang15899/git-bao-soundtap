//--------------------------------Variable--------------------------------
let sound = new Audio()
let hexColor = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','a','b','c','d','e','f'];
let project = document.querySelector('.project')
let fillLeft = document.querySelector('.fillLeft')
let fillRight = document.querySelector('.fillRight')
let animate = document.querySelectorAll('.animation')
let circle = document.querySelectorAll('.circle')
let grid = document.querySelectorAll('.grid')
let body = document.querySelector(".project")
let counter = 0
//--------------------------------Setup Object--------------------------------
let sounds = [
    {
        src:"sounds/bubbles.mp3"
    },
    {
        src:"sounds/clay.mp3"
    },
    {
        src:"sounds/moon.mp3"
    },
    {
        src:"sounds/pinwheel.mp3"
    },
    {
        src:"sounds/dotted-spiral.mp3"
    },
    {
        src:"sounds/wipe.mp3"
    },
    {
        src:"sounds/strike.mp3"
    },
    {
        src:"sounds/squiggle.mp3"
    },
    {
        src:"sounds/timer.mp3"
    },
    {
        src:"sounds/prism-2.mp3"
    },
    {
        src:"sounds/prism-1.mp3"
    },
    {
        src:"sounds/prism-3.mp3"
    },
    {
        src:"sounds/veil.mp3"
    },
    {
        src:"sounds/ufo.mp3"
    },
]
let tl = anime.timeline()
let btn = {
    fade:function(){
        animate.forEach(animates => {
            animates.classList.add('add')
        })
    },
    a:{
        name:'a',
        add:function(){
            color(fillLeft)
            fillLeft.classList.add('add')
        }
    },
    w:{
        name:'w',
        add:function(){
            circle.forEach(circles => {
                color(circles)
                circles.classList.add('add')
            })
        }
    },
    d:{
        name:'d',
        add:function(){
            color(fillRight)
            fillRight.classList.add('add')
        }
    },
    s:{
        name:'s',
        add:function(){
            grid.forEach(grids =>{
                grids.classList.add('grid')
            })
            tl.add({
                targets:'.grid',
                translateX: anime.stagger(200, {grid: [6, 6], from: 'center', axis: 'x'}),
                translateY: anime.stagger(70, {grid: [7, 6], from: 'center', axis: 'y'}),
                rotateZ: anime.stagger([0,360], {grid: [7, 6], from: 'center', axis: 'x'}),
                opacity:'1',
                delay: anime.stagger(10),
                duration:1000,
                scale:0.9,
                easing: 'cubicBezier(0.690, 0.460, 0.000, 0.945)'
            })
            grid.forEach(grids =>{
                color(grids)
            })
        }
    },
    remove:function() {
        circle.forEach(circles =>{
            circles.classList.remove('add')
        })
        grid.forEach(grids =>{
            grids.classList.remove('grid')
        })
        tl.remove()
        fillRight.classList.remove('add')
        fillLeft.classList.remove('add')
    }
};
//--------------------------------play sound--------------------------------
function color(s){
    let tag = "#"
    for (let i = 0; i < 6; i++) {
        let random = Math.floor(Math.random()*(hexColor.length-1));
         tag = tag + hexColor[random];
        }
    s.style.backgroundColor=tag
}

function play(){
        sound.volume=0.8
        
        window.addEventListener('keypress',(e)=>{
            let random = Math.floor((Math.random()*(sounds.length)))
                if (btn[e.key]) {
                    btn.remove()
                    btn[e.key].add()
                    btn.fade()
                    sound.src = sounds[random].src
                }

                else {
                    return
                }

                setTimeout(function () {      
                    sound.play();
                }, 100);
        })

        body.addEventListener('click',()=>{
            counter++
            btn.remove()
            switch (counter) {
                case 0:
                    btn['d'].add()
                    break;
                case 1:
                    btn['s'].add()
                    break;
                case 2:
                    btn['a'].add()
                    break;
                case 3:
                    btn['w'].add()
                    break;               
                default:
                    break;
            }

            if (counter > 3) {
                counter = 0
                btn['d'].add()
            }
            btn.fade()
            let random = Math.floor((Math.random()*(sounds.length)))
            sound.src = sounds[random].src
            setTimeout(function () {      
                sound.play();
                }, 100)
        })
}
//--------------------------------Start--------------------------------
let start = {
    init:function(){
        play()
    }
}
start.init()