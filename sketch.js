const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var backimg, santa, santaBody;
var engine, world;
var snow = [];
var maxSnowFlakes = 30

; 
var ground; 
var santaImg;
var cookieImg, presentImg, cadyCaneImg, grinchImg, coinImg, playImg, snowImg, startBgImg, bombImg, explosionImg;
var xmasSound, rules;
var fastForwardImg;
var obstaclesGroup, grinchGroup, coinGroup;
var score=0;
var playImg;
var play1;
var rules,rulesImage;
var gameState = "serve";
var startSprite;
var startBg;

function preload(){

backimg = loadImage("bg1.jpg");

santaImg = loadImage("santa.jpg")
cookieImg = loadImage("cookie2.png")
candyCaneImg = loadImage("candyCane2.png")
presentImg = loadImage("present2.png")
grinchImg = loadAnimation("grinch1.png","grinch2.png","grinch3.png", "grinch4.png", "grinch5.png", "grinch6.png", "grinch7.png", "grinch8.png", "grinch9.png", "grinch10.png", "grinch11.png", );
playImg = loadImage("play.png")
coinImg = loadAnimation("coin1.png", "coin2.png","coin3.png","coin4.png","coin5.png","coin6.png","coin7.png");
xmasSound = loadSound("Recording.m4a");
rulesImage = loadImage("pressStart.jpg");
startBgImg = loadImage("ChristmasBg2");
bombImg = loadImage("bomb.png");
explosionImg = loadImage("explosion.png");

fastForwardImg = loadImage("fastForward.png")
playImg=loadImage("play.png");  
}

function setup() 
{
 engine = Engine.create();
 world = engine.world;
 createCanvas(900, 600);
 text("Score:" + score, 500, 100);
 fill("black")
 //console.log(score);
  xmasSound.loop();
  back1=createSprite(450,325,900,600);
  back1.addImage(backimg);
  back1.x=back1.width/2;
  back1.velocityX=-4;
  back1.scale = 1.4

  santa = createSprite(200, 300, 90, 70);
  santa.addImage(santaImg);
  santa.scale = .4;

  ground = createSprite(450, 500, 1800, 20);
  ground.x = ground.width /2;
  ground.visible = false;

  startBg=createSprite(450, 300, 100, 100);
  startBg.addImage(startBgImg)
  startBg.scale = .5

  startSprite=createSprite(450,300,10,10)
  startSprite.addImage(playImg);
  //startSprite.scale=2;
    for (var j = 0; j < maxSnowFlakes; j++) 
    {
     snow.push(new Snow(random(0,900), random(0,900)));
    }

    obstaclesGroup = new Group();
    grinchGroup = new Group();
    coinGroup = new Group();
    bombGroup = new Group();
}


function draw() {
  background(225);

  Engine.update(engine);
  if(gameState==="serve")
  { 
   
    console.log(gameState);
    startSprite.visible=true;
    startBg.visible=true;
    back1.visible=false;
    santa.visible=false;
    ground.visible=false;
    
    if(mousePressedOver(startSprite))
    {
      gameState="play";
    }
    drawSprites();
  }

else if(gameState==="play")
{
      startSprite.visible=false;
      startBg.visible=false;
      back1.visible=true;
      santa.visible=true;
      ground.visible=false;

        text("SCORE: "+ score, 500,50);

        ground.velocityX = -2

        if (ground.x < 0)
        {
          ground.x = ground.width/2;
        }

        if(santa.y> 100)
        {
          if(keyDown("space"))
          {
            // console.log("hi")
            santa.velocityY = -10;
          }
        }
        santa.velocityY = santa.velocityY + 1.2;


          if(back1.x<150)
          {
            back1.x=back1.width/2;
          }

          santa.display();
          santa.collide(ground);
          drawSprites();
          for (var i = 0; i < maxSnowFlakes; i++)
          {

            snow[i].display();
            snow[i].updateY();      
          }
          spawnCookies();

          spawnGrinches();

          spawnCoins();


        for(var i=0;i<obstaclesGroup.length;i++)
        {
          if(obstaclesGroup.get(i).isTouching(santa))
          {
            //console.log("score before:"+score)
            score = score+2;
            //console.log("score after:"+score);
            obstaclesGroup.get(i).destroy();
          }
        }

      for(var i=0;i<grinchGroup.length;i++)
      {
        if(grinchGroup.get(i).isTouching(santa))
        {
          score = score-10;
          grinchGroup.get(i).destroy();
        }
      }

      for(var i=0;i<coinGroup.length;i++)
      {
        if(coinGroup.get(i).isTouching(santa))
        {
          score = score+10;
          coinGroup.get(i).destroy();
        }
      }
if(score > 5){
  spawnBombs();

  for(var i=0;i<bombGroup.length;i++)
  {
    
    if(bombGroup.get(i).isTouching(santa))
    {
      score = score-25;
      bombGroup.get(i).destroy();
  //    bomb.addAnimation("running", explosionImg);
    }
  }

}
if(score<0){
  score = 0
}

}

else if(gameState==="end")
{


}









  text("SCORE: "+ score, 500,50);


}
function spawnCookies() {
  var randY = random(100, 500);


  if(frameCount % 160 === 0) {
    var obstacle = createSprite(900 , randY,10,40);
    obstacle.velocityX = -4;

    //console.log(obstacle);

    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(cookieImg);
              break;
      case 2: obstacle.addImage(candyCaneImg);
              break;
      case 3: obstacle.addImage(presentImg);
              break;
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.17;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnGrinches() {
  //write code here to spawn the grinchs
  if (frameCount % 250 === 0) {
    var grinch = createSprite(900,120,40,10);
    grinch.y = Math.round(random(100,500));
    grinch.addAnimation("running", grinchImg);
    grinch.scale = 1.5;
    grinch.velocityX = -4;

     //assign lifetime to the variable
    grinch.lifetime = 300;


    //add each grinch to the group
    grinchGroup.add(grinch);
  }

}


function spawnCoins() {
  //write code here to spawn the grinchs
  if (frameCount % 700 === 0) {
    var coin = createSprite(900,120,40,10);
    coin.y = Math.round(random(100,500));
    coin.addAnimation("running", coinImg);
    coin.scale = .9;
    coin.velocityX = -4;

     //assign lifetime to the variable
    coin.lifetime = 300;


    //add each grinch to the group
    coinGroup.add(coin);
  }

} 

function spawnBombs() {
  //write code here to spawn the grinchs
  if (frameCount % 800 === 0) {
    var bomb = createSprite(900,120,80,20);
    bomb.y = Math.round(random(100,500));
    bomb.addAnimation("running", bombImg);
    bomb.scale = .3;
    bomb.velocityX = -4;

     //assign lifetime to the variable
     bomb.lifetime = 300;


    //add each grinch to the group
    bombGroup.add(bomb);
  }

} 