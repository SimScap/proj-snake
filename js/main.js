const snake = [
    {
        x: 30,
        y: 30,
    }
];

let fruit = "30_20"; //x and y position

let emptyPosition = [];

const key = [
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'ArrowLeft',
];

let direction = null;
let interval = null;

function run(config){   
console.log("Run!");
const playboard = document.getElementById("playboard");   
//document.getElementById("playboard").innerText="Ready"
for(let x = 0; x < config.x; x++) {
    for(let y = 0; y < config.y; y++) {
        const cell = document.createElement("div");
        cell.setAttribute("id", `${x}_${y}`);
        cell.setAttribute("class","cell");
        playboard.appendChild(cell);
    }
}
draw(config);

window.addEventListener("keydown", event =>{
    if(key.indexOf(event.code) > -1) {
        direction = event.code;
    }
    if(event.code === 'KeyQ'){
        moveFruit();
    }
});
interval = setInterval(function(){
    //console.log("ciao")
    move(config);
    draw(config);
}, 100 );
;}

function move(config) {
    if(direction === null) return;
    const lastSnakePosition = {...snake[snake.length-1]};
    let nextPosition = {...snake[0]};

    if(direction === 'ArrowUp'){
        snake[0].x -= 1;
        if (snake[0].x <0) snake[0].x = config.x - 1;
    }
    if(direction === 'ArrowRight'){
        snake[0].y += 1;
        if (snake[0].y > config.y -1) snake[0].y = 0;
    }
    if(direction === 'ArrowDown'){
        snake[0].x += 1;
        if (snake[0].x > config.x -1) snake[0].x = 0;
    }
    if(direction === 'ArrowLeft'){
        snake[0].y -= 1;
        if (snake[0].y < 0) snake[0].y = config.y -1;
    }

    for(let i = 1; i < snake.length; i++){
        const tmp = {...snake[i]};
        snake[i] = {...nextPosition};
        nextPosition = {...tmp};
    }

    if(`${snake[0].x}_${snake[0].y}` === fruit ){
        snake.push({...lastSnakePosition});
        moveFruit();
    }

    checkCollision();
};
function checkCollision(){
    const unique = [...new Set(snake.map(p => `${p.x}_${p.y}`))];
    if(unique.length < snake.length){
        clearInterval(interval);
        alert("hai perso");


    }
};

function moveFruit (){
    const emptyCells = emptyPosition.length-1;
    const rand = Math.floor(Math.random()*emptyCells);
    document.getElementById(`${emptyPosition[rand]}`).style.backgroundColor = "red";    
    fruit = emptyPosition[rand];    


};

function draw(config){
    const snakePositions = [];
    const blackPositions = [];
    for(let x = 0; x < config.x; x++) {
        for(let y = 0; y < config.y; y++) { 
        document.getElementById(`${x}_${y}`).style.backgroundColor = "black";  
        blackPositions.push(`${x}_${y}`);  

        }}
    snake.forEach(p => {
        document.getElementById(`${p.x}_${p.y}`).style.backgroundColor = "green"; 
        snakePositions.push(`${p.x}_${p.y}`);   
    });

    emptyPosition = blackPositions.filter(x => !snakePositions.includes(x) );

    document.getElementById(`${fruit}`).style.backgroundColor = "red";

}

const config = {
    x : 60,
    y : 60,
}
run(config);
