let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let canvas = document.getElementById('background_canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
let draw = canvas.getContext('2d');

let AMOUNT = Math.round(WIDTH / 10);

function update_globals(){
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    AMOUNT = Math.round(WIDTH / 10);
}

class dot{
    x;
    y;
    size;
    top_limit;
    bottom_limit;
    opacity;
    speed;
    constructor(){
        this.x = Math.floor(Math.random() * WIDTH);
        this.y = Math.floor(Math.random() * HEIGHT);
        
        this.top_limit = 4;
        this.bottom_limit = 1;
        this.size = this.random_size();
        this.speed = this.size * 0.5;
        this.opacity = Math.round(this.size/this.top_limit * 100);
    }

    random_size(){
        let found = false;
        while (!found) {
            let tmp = Math.floor(Math.random() * this.top_limit);
            if (tmp > this.bottom_limit) {
                found = true;
                return tmp;
            }
        }

        return 5; //if smth goes wrong return same size
    }
}

let dots = [];
init_dots();
function init_dots(){
    dots = [];
    for (let index = 0; index < AMOUNT; index++) {
        new_dot = new dot();
        dots.push(new_dot);
    }
}

setInterval(update, 40);

function update(){
    dots.forEach(element => {
        element.y += element.speed;
        if (element.y > HEIGHT+3) {
            element.y = -3;
        }
    });

    draw_dots();
}
function draw_dots(){
    draw.clearRect(0, 0, WIDTH, HEIGHT);
    
    dots.forEach(element => {
        draw.fillStyle = "rgb(255 255 255 / "+ element.opacity +"%)";
        draw.beginPath();
        draw.arc(element.x, element.y, element.size, 0, 2 * Math.PI);
        draw.fill();
    })
}

window.addEventListener('resize', ()=>{
    update_globals();
    init_dots();
});