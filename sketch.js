
var gameover;
var monkey,stone,jungle,banana,score=0;

var monkey_running,stoneImage,jungleImage,bananaImage,restartImage;

var invisibleGround,survivalTime;

var obstacleGroup,foodGroup;

function preload(){
  
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  stoneImage=loadImage("stone.png"); 
  jungleImage=loadImage("jungle.jpg");
  bananaImage=loadImage("banana.png");
   
}


function setup() {
  createCanvas(800,400);
  
  
  
  jungle = createSprite(0,0,800,400);
  jungle.addImage("ground",jungleImage);
  jungle.x = jungle.width/2
  jungle.velocityX = -(6 + 3*score/100);
  jungle.scale=1.5;
  
  monkey=createSprite(100,340,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
   
  invisibleGround = createSprite(400,350,800,10);
  invisibleGround.velocityX=-4;
  invisibleGround.x=invisibleGround.width/2;
  invisibleGround.visible=false;
  
  
  
  
  
  score=0;
  
  obstacleGroup=new Group();
  foodGroup=new Group();
  
}

function draw() {
  background(205);
 
    
  
  
  
  if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  
  if(invisibleGround.x<0) {
    invisibleGround.x=invisibleGround.width/2;
  }
  
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
  
  if(keyDown("space") && monkey.y  >= height-200){
    monkey.velocityY=-15;
 }
  monkey.velocityY=monkey.velocityY+0.8;
  
  
    monkey.collide(invisibleGround);
    obstacle();
    food();
    
    if(obstacleGroup.isTouching(monkey)){
 monkey.scale=0.08;
     }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
}

function obstacle(){
  
  if(frameCount%80===0){
     var stone=createSprite(800,380,20,20);
    stone.velocityX=-10;
    stone.addImage("stone",stoneImage);
    stone.scale=0.2; 
    stone.lifeTime=100;   
    obstacleGroup.add(stone);
    
   
     }  
}

function food(){
  
  if(frameCount%60===0){
     
     var banana=createSprite(600,250,20,20);
    banana.addImage("banana",bananaImage); 
    banana.velocityX=-10;
    banana.scale=0.05;
    banana.lifeTime=100
    banana.y=Math.round(random(210,300));
    monkey.depth=banana.depth+1;
    
    foodGroup.add(banana);
     }
  
}



