

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const square = 32;

// load images

const background = new Image();
background.src = "img/ground.png";

const foodpic = new Image();
foodpic.src = "img/food.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x : 9 * square,
    y : 10 * square
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * square,
    y : Math.floor(Math.random()*15+3) * square
}

// create the score var

let score = 0;

//control the snake

let d;

document.addEventListener("keydown",movement);

function movement(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
			return true;
			
			
        }
	
    }
    return false;
}

// draw everything to the canvas

function draw(){
    
    ctx.drawImage(background,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        var name = ["J", "O" , "S", "E", "P", "H", "J", "O" , "S", "E", "P", "H", "J", "O" , "S", "E", "P", "H", "J", "O" , "S", "E", "P", "H"] 
        //ctx.font = "45px Changa one";
        ctx.fillStyle = ( i == 0 )? "blue" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,square,square);
		ctx.fillText(name[i],snake[i].x,snake[i].y);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,square,square);
    }
    
    ctx.drawImage(foodpic, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which movement
    if( d == "LEFT") snakeX -= square;
    if( d == "UP") snakeY -= square;
    if( d == "RIGHT") snakeX += square;
    if( d == "DOWN") snakeY += square;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * square,
            y : Math.floor(Math.random()*15+3) * square
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < square || snakeX > 17 * square || snakeY < 3*square || snakeY > 17*square || collision(newHead,snake)){
       background.src = "img/dead.png";
	   dead.play();
	  
	   ctx.fillStyle = "red";
	   
	   
	   ctx.fillText("You Are Dead!" ,150,350);
	   ctx.fillText("Refresh to play again.",150 ,390);
	   clearInterval(game);
	   
	   
	   
	    
		
        
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*square,1.6*square);
}



let game = setInterval(draw,100);

 
















