var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running

var banana ,bananaImage, obstacle, obstacleImage

var FoodGroup, obstacleGroup

var score

function preload(){
   monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}



function setup() {
   createCanvas(600, 200);
  
  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(50,150,20,50);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  monkey.setCollider("rectangle",0,0,40,400);
  monkey.debug = true;
  
 // creating ground
  ground = createSprite(200,180,1200,10);
  ground.shapeColor = "green";
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
 
}


function draw() {
  background("lightblue");
  text("Score = "+ score, 500,50);
  
  console.log(monkey.y)
  
  if(gameState === PLAY){
     
 ground.velocityX = -(4 + 3* score/100);
 
    if(monkey.isTouching(FoodGroup)){
      score = score+1
      FoodGroup.destroyEach();
      }
    
 if (ground.x < 0){
   ground.x = ground.width/2;
   }
    
 if(keyDown("space")&& monkey.y > 100) {
    monkey.velocityY = -12;  
  }  
    
 // adding gravity to monkey
  monkey.velocityY = monkey.velocityY + 0.8  
     
 spawnObstacles()
 spawnFood()
    
  if(obstaclesGroup.isTouching(monkey)){
     gameState = END; 
   }   
    
    
  }
  
   else if (gameState === END) {
     
     textSize(32);
     text("You Lost",200,100);
      text("Press 'R' to Restart",190,150);
     
    ground.velocityX = 0;
    monkey.velocityY = 0;
    monkey.velocityX = 0;
     
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
     
   if(keyDown("r")){
  gameState = PLAY;
  FoodGroup.destroyEach();
  obstaclesGroup.destroyEach();
  score = 0
     }
     
   }
    monkey.collide(ground);
  drawSprites();


}



function spawnFood() {
    if (frameCount % 65 === 0) {
    var ban = createSprite(600,90,40,10);
    ban.addImage(bananaImage);
    ban.scale = 0.1;
    ban.velocityX  = -(6 + score/100);
    
     //assign lifetime to the variable
    ban.lifetime = 200;
      
      ban.depth = monkey.depth
      monkey.depth = +1
    
    //add each cloud to the group
    FoodGroup.add(ban);
      
  }
}

function spawnObstacles() {
   if (frameCount % 60 === 0){
   var obstacle = createSprite(600,156,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstaceImage);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
   
   //add each obstacle to the group
     obstaclesGroup.add(obstacle);
 }
}
