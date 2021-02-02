var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0
var Play=1;
var End=0;
var gameState=Play; 
function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {

  createCanvas(600, 600);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1

  ground = createSprite(400, 550, 900, 10);
  ground.velocityX = (-4 + (score / 10))
  ground.x = ground.width / 2;
  



  obstacleGroup = new Group();
  FoodGroup = new Group();



}

function draw() {
  background("white");
  
  stroke("red")
  textSize(20);
  fill("red")
  text("Score:" + score, 500, 50);

  stroke("black")
  textSize(20)
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("survival Time:" + survivalTime, 100, 50);
  
  
  if (gameState === Play){
    
  if (ground.x<100){
    ground.x=400
    
  }
 monkey.velocityY = monkey.velocityY + 0.8;
    
  if (monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
    score = score + 1;
    FoodGroup.velocityX = (-4 + (score / 10))
  } 
  
  if (keyDown("space")&&monkey.y<=515){
    monkey.y=300;
  }
 
    console.log(monkey.y)
  if (monkey.isTouching(obstacleGroup)) {
    
    gameState = End;
  }
  spawnObstacles();
  spawnBanana();
  monkey.collide(ground);
  
  }
  if (gameState==End){
    ground.velocityX = 0;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
   
    
  }
  
  drawSprites();
}


function spawnObstacles() {

  if (frameCount % 300 == 0) {
    obstacle = createSprite(600, 540, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale =0.1;
    obstacle.velocityX = -(4 + (score / 10));
    obstacleGroup.add(obstacle)
    obstacleGroup.lifetime=10;
  }

}


function spawnBanana() {
  if (frameCount % 80 == 0) {
    banana = createSprite(600, 300, 20, 20);
    
    banana.velocityX = -4;
    banana.scale = 0.2;
    banana.addImage(bananaImage);
    FoodGroup.add(banana);
  }

}