const canvas = document.getElementById('snake');
const ctx = canvas.getContext("2d");

// create the unit (field)
const box = 32;

//load images
const ground = new Image();
ground.src = 'images/ground.png';

const apple = new Image();
apple.src = 'images/food.png';

// load audio
const eat = new Audio();



eat.src = "audio/eat.wav";


// create snake (array)
let snake = [];
snake[0]= {
	x: 9 * box,
	y: 10 * box
}

// create food (object)
let food = {
	x:Math.floor(Math.random()* 17+1) * box,
	y:Math.floor(Math.random()* 15+3) * box
}

// create the score variable
let score = 0;
let d;

// control the snake
document.addEventListener('keydown', direction);

function direction(event) {
	if (event.keyCode == 37 && d != "RIGHT"){
	d = "LEFT";
}else if(event.keyCode == 38 && d != "DOWN"){
	d = "UP";
	} else if (event.keyCode == 39 && d != "LEFT"){
	d = "RIGHT";
	} else if (event.keyCode == 40 && d != "UP"){
	d = "DOWN";
}
}

// check collision 
function collision(header, array){
	for(let i = 0; i < array.length; i++){
		if (header.x === array[i].x && header.y === array[i].y){
			return true;
		}
	}
	return false;
}

// draw everything to the canvas
function draw() {
ctx.drawImage(ground, 0,0);

for (let i= 0; i < snake.length; i ++){
	ctx.fillStyle = (i == 0)? "red" : "black";
	ctx.fillRect(snake[i].x, snake[i].y,box, box);

	ctx.strokeStyle = "white"
	ctx.strokeRect(snake[i].x, snake[i].y, box, box);
}

// draw food
ctx.drawImage(apple, food.x, food.y);

// old head position
let snakeX = snake[0].x;
let snakeY = snake[0].y;



// which direction
if( d==="LEFT") snakeX -= box;
if (d === "UP") snakeY -= box;
if( d==="RIGHT") snakeX += box;
if( d==="DOWN") snakeY += box;

// if the snake eats the food
if(snakeX === food.x && snakeY === food.y){
	score++;
	eat.play();
	// create new food (object)
	food = {
		x: Math.floor(Math.random() * 17 + 1) * box,
		y: Math.floor(Math.random() * 15 + 3) * box
	}
	// don't remove the tail
} else {
	// remove the tail of the snake
	snake.pop();
}

// new snake head
let newHead = {
	x: snakeX,
	y: snakeY,
}

// snake is dead // game over
if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead,snake)){
clearInterval(game);

}



snake.unshift(newHead);

ctx.fillStyle = "white";
ctx.font = "45 px";
ctx.fillText(score,2*box,1.6*box);
}


// call function draw
let game = setInterval(draw, 100)