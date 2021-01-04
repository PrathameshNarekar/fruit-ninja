var PLAY=1;
var END=0;
var gameState=1;
var swordImage;
var positions;
var score;
var fruit1,fruit2,fruit3,fruit4;
var monsterImage;
var gameOverImage;
var gameoversound;
var cutting;

function preload(){
  swordImage=loadImage("sword.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  gameOverImage=loadImage("gameover.png");
  monsterImage=loadAnimation("alien1.png","alien2.png");
  gameoversound=loadSound("gameover.mp3");
  cutting=loadSound("knifeSwooshSound.mp3");
}
function setup(){
  createCanvas(600,600);
  
  knife=createSprite(40,200,20,20);
  knife.addImage(swordImage);
  knife.scale=0.7;
  score=0;
  fruitsGroup=createGroup();
  enemyGroup=createGroup();
}

function draw(){
  background(220)
  //call fruits and enemy function
  fruits();
  Enemy();
  text("Score: "+ score, 500,50);
  
  if(gameState===PLAY){
    knife.y=mouseY;
    knife.x=mouseX;
}
  
  if(fruitsGroup.isTouching(knife)){
     fruitsGroup.destroyEach();
     cutting.play();
     score=score+2;
     }
  
  if(enemyGroup.isTouching(knife)){
     gameoversound.play();
     gameState=END;
  }
  
  if (gameState===END){   
     fruitsGroup.destroyEach();
     enemyGroup.destroyEach();
     fruitsGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
     knife.addImage(gameOverImage);
     knife.x=300;
     knife.y=300;
  }
  
drawSprites();
}
function fruits(){
  if(World.frameCount%80===0){
    var positions=Math.round(random(1,2))
     fruit=createSprite(400,200,20,20); 
    fruit.scale=0.2;
     var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
      
      default: break;
    }
    
    fruit.y=Math.round(random(50,340));
    
    fruit.Setlifetime=100;
    
    fruitsGroup.add(fruit);
    
    if(positions==1){
      fruit.x=0;
      fruit.velocityX=(7+(score/4));
    } else
      {
        if(positions==2){
          fruit.x=600;
          fruit.velocityX=-(7+(score/4));
        }
      }
}
}       
function Enemy(){
  if(World.frameCount%120===0){
    var monster=createSprite(600,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.Setlifetime=50;
    
    enemyGroup.add(monster);
}
  
}
    
   



