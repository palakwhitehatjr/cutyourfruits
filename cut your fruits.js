// Game States
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sword, swordImage;
var fruit, fruit1, fruit2, fruit3, fruit4, gameOver;
var  monster,monsterImg, monsterImg2;
var rand;
var enemyG, fruitG;
var knifeSwooshSound, gameOverSound;
var score = 0;

function preload() {
  swordImage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImg = loadImage("alien1.png");
  monsterImg2 = loadImage("alien2.png");
  gameOver = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");

}

function setup() {
  createCanvas(600, 500);

  var bg = createSprite(0, 0, 1200, 1000);
  bg.shapeColor = "lightblue";

  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7;

  fruitG = new Group();
  enemyG = new Group();

}

function draw() {
  background(220);

  if (gameState === PLAY) {
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    fruits();
    enemy();
    if(fruitG.isTouching(sword)){
      fruitG.destroyEach();
      knifeSwooshSound.play();
      score +=1;
    }
    if(enemyG.isTouching(sword)){
     gameState = END; 
     gameOverSound.play();
    }
  }
  if(gameState===END){
   fruitG.destroyEach();
   enemyG.destroyEach();
   monster.velocityX = 0;
   fruit.velocityX = 0;
   sword.addImage(gameOver);
   sword.scale = 1.5;
   sword.x = 300;
   sword.y = 200;
  }

  drawSprites();
  textSize(24);
  text("Score "+score,450,50);
}

function fruits() {
  if (frameCount % 80 == 0) {
    fruit = createSprite(600, 200, 20, 20);
    rand = Math.round(random(1, 4));
    fruit.scale = 0.2;
    var position = Math.round(random(1,2));
    switch (rand) {
      case 1:
        fruit.addImage(fruit1);
        break;
      case 2:
        fruit.addImage(fruit2);
        break;
      case 3:
        fruit.addImage(fruit3);
        break;
      case 4:
        fruit.addImage(fruit4);
        break;
      default:
        break;
    }
    fruit.y = Math.round(random(50, 340));
    
    fruit.lifetime = 90;
    
    if(position===1){
      fruit.x = 600;
      fruit.velocityX = -(7+(score/2));
      }
    if(position===2){
      fruit.x = 0;
      fruit.velocityX = (7+(score/2));
    }

    fruitG.add(fruit);
  }
}

function enemy() {
  if(frameCount%200===0){
    monster = createSprite(600,200,20,20);
    monster.addAnimation("moving",monsterImg,monsterImg2);
    monster.y = Math.round(random(100,300));
    var position = Math.round(random(1,2));
    monster.lifetime = 80;
    if(position===1){
      monster.x = 0;
      monster.velocityX = (8+(score/4))
    }
    else if(position===2){
      monster.x = 600;
      monster.velocityX = -(8+(score/4))
    }
    enemyG.add(monster);
  }
  
}