var fish, background1, obstacle, obstacleGroup, finishLine, gameState, backgroundImage, fishImage, obstacleImage1, obstacleImage2, obstacleImage3, obstacleImage5, score, crashSound, passSound, token, tokenGroup, token1Image, token2Image, token3Image, token4Image, token5Image, distance;

function preload() {
  backgroundImage = loadImage("ocean.png");
  fishImage = loadImage("fish.png");
  obstacle1Image = loadImage("obstacle.png");
  obstacle2Image = loadImage("obstacle2.png");
  obstacle3Image = loadImage("obstacle3.png");
  obstacle5Image = loadImage("obstacle5.png");
  crashSound = loadSound("crash.mp3");
  passSound = loadSound("pass.mp3");
  token1Image = loadImage("worm.svg");
  token2Image = loadImage("plankton.png");
  token3Image = loadImage("fishSmall.png");
  token4Image = loadImage("bug.png");
  token5Image = loadImage("obstacle4.png");
  line = loadImage("line.png");
}

function setup() {
  createCanvas(400,400);

  background1 = createSprite(200,200,400,400);
  background1.addImage(backgroundImage);
  background1.scale = 2.5;
  
  fish = createSprite(75,200,10,10);
  fish.addImage(fishImage);
  fish.scale = 0.07;

  finishLine = createSprite(distance,200);
  finishLine.addImage(line);

  obstacleGroup = createGroup();
  tokenGroup = createGroup();
  
  gameState = "start";
  score = 0;
  distance = 0;
}

function draw() {
  background("lightblue");
  finishLine.x = distance;
  fish.setCollider("rectangle",0,0,1500,1000);
  background1.x = fish.x;
  background1.y = 200;
  
  if(gameState==="start") {
    score = 0;
    camera.position.x = 200;
    camera.position.y = 200;
    obstacleGroup.destroyEach();
    fish.x = 200;
    fish.y = 200;
    if(keyDown("2")) {
      distance += 2200;
      gameState="play";
    } else if(keyDown("3")) {
      distance += 4200;
      gameState="play";
    } else if(keyDown("4")) {
      distance += 6200;
      gameState="play";
    } else if(keyDown("5")) {
      distance += 8200;
      gameState="play";
    }
  }
  
  if(gameState==="play") {
    
    camera.position.x = fish.x;
    camera.position.y = 200;
    
    if(obstacleGroup.isTouching(fish) || fish.y<0 || fish.y>400) {
      gameState = "start";
      crashSound.play();
      distance = 0;
    }

    if(tokenGroup.isTouching(fish)) {
      score++;
      passSound.play();
      tokenGroup.destroyEach();
    }

    if(fish.isTouching(finishLine)) {
      gameState = "win";
      distance = 0;
    }
  
    controls();
    spawnObstacles();
    spawnTokens();
  }
    
  if(gameState==="end") {
    obstacleGroup.destroyEach();
    fish.x = 200;
    fish.y = 200;
    if(keyDown("space")) {
      gameState="start";
    }
  }

  if(gameState==="win") {
    obstacleGroup.destroyEach();
    fish.velocityX = 0;
    if(keyDown("space")) {
      gameState="start";
    }
  }
  
  drawSprites();
  
  if(gameState==="start") {
    textFont("georgia");
    textSize(16);
    fill("black");
    text("Press 2 to make your route 50 miles.",10,70);
    text("Press 3 to make your route 100 miles.",10,90);
    text("Press 4 to make your route 150 miles.",10,110);
    text("Press 5 to make your route 200 miles.",10,130);
    text("Use the arrow keys to help the fish avoid obstacles.",10,30);
    text("Be sure to collect food for the fish on the way as well.",10,50);
  }
  
  if(gameState==="play") {
    textFont("georgia");
    textSize(15);
    fill("black");
    text("Score: "+score,fish.x-15,fish.y+5);
    if(Math.round((distance-fish.x)/40) > -1)
    text("Miles Left: "+Math.round((distance-fish.x)/40),fish.x-170,fish.y);
  }
  
  if(gameState==="end") {
    textFont("georgia");
    textSize(20);
    fill("black");
    text("Press the space key to restart.",10,100);
    text("Your score was "+score+". Great job!",10,120);
    text("Help fish all around the world survive by",10,300); 
    text("avoiding litering and picking up trash.",10,320);
    text("Everyone can make a difference!",10,340);
  }

  if(gameState==="win") {
    textFont("georgia");
    textSize(20);
    fill("black");
    text("Press the space key to restart.",fish.x-190,20);
    text("Your score was "+score+". Great job!",fish.x-190,40);
    text("Help fish all around the world survive by",fish.x-190,340); 
    text("avoiding litering and picking up trash.",fish.x-190,360);
    text("Everyone can make a difference!",fish.x-190,380);
  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
  obstacle = createSprite(fish.x+500,random(10,350),10,10);
  obstacleGroup.add(obstacle);
  var rand = Math.round(random(1,4));
    if(rand===1) {
      obstacle.addImage(obstacle1Image);
      obstacle.scale = random(0.1,0.2);
    } else if (rand===2) {
      obstacle.addImage(obstacle2Image);
      obstacle.scale = random(0.05,0.1);
    } else if (rand===3) {
      obstacle.addImage(obstacle3Image);
      obstacle.scale = random(0.1,0.25);
      obstacle.setCollider("rectangle",0,0,500,400);
    } else if (rand===4) {
      obstacle.addImage(obstacle5Image);
      obstacle.scale = random(0.2,0.3);
    }  
  }
}

function spawnTokens() {
  if(frameCount % 150 === 0) {
  token = createSprite(fish.x+500,random(10,350),10,10);
  tokenGroup.add(token);
  var rand = Math.round(random(1,5));
    if(rand===1) {
      token.addImage(token1Image);
      token.scale = 0.1;
    } else if (rand===2) {
      token.addImage(token2Image);
      token.scale = 0.2;
    } else if (rand===3) {
      token.addImage(token3Image);
      token.scale = 0.15;
      token.setCollider("rectangle",0,0,500,400);
    } else if (rand===4) {
      token.addImage(token4Image);
      token.scale = 0.25;
    } else if (rand===5) {
      token.addImage(token5Image);
      token.scale = 0.15;
    } 
  }
}

function controls() {
  if(keyDown("up")) {
    fish.y-=20;
  }
  if(keyDown("down")) {
    fish.y+=20;
  }
  if(keyDown("left")) {
    fish.x-=20;
  }
  if(keyDown("right")) {
    fish.x+=20;
  }
}