var ghost, ghostImag
var tower, towerImag
var climber, door, climberImag, doorImage;
var doorGroup, climberGroup
var bloqueInvisible, invisibleGroup
var gameState = "play"
var music

function preload(){
  ghostImag = loadImage("ghost-jumping.png")
  towerImag = loadImage("tower.png")
  climberImag = loadImage("climber.png")
  doorImage = loadImage("door.png")
  music = loadSound("spooky.wav")
  }

function setup(){
  createCanvas(600, 600)
  /*music.loop*/
  tower = createSprite(300,300)
  ghost = createSprite(200,200,50,50)
  ghost.addImage(ghostImag)
  tower.addImage(towerImag);
  tower.velocityY = 3;
  ghost.scale = 0.3;
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
  }

function draw(){
  background(0)
  if(gameState == "play") {
  if(tower.y > 600) {
    tower.y = 300
    }
  if(keyDown("space")) {
    ghost.velocityY = -5
    }
  if(keyDown("left")) {
    ghost.x = ghost.x-3
    }
  if(keyDown("right")) {
    ghost.x = ghost.x+3
    }
  doors()
  ghost.velocityY = ghost.velocityY+ 1
  
  if(climberGroup.isTouching(ghost)) {
    ghost.velocityY = 0
    }
  
  if(invisibleGroup.isTouching(ghost)||ghost.y >600) {
    ghost.destroy();
    gameState = "end"
    }
  drawSprites();
    }
  if(gameState == "end") {
    
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("Game Over", 230, 250)
    }
  }

function doors(){
  if(frameCount%150 === 0) {
    door = createSprite(200,-50)
    climber = createSprite(200, 10)
    bloqueInvisible = createSprite(200,15)
    bloqueInvisible.width = climber.width
    bloqueInvisible.height = 2
    bloqueInvisible.visible = true
    climber.addImage(climberImag)
    door.velocityY = 3
    climber.velocityY = 3
    bloqueInvisible.velocityY = 3
    bloqueInvisible.debug = true
    door.addImage(doorImage)
    door.x = Math.round(random(120,400))
    climber.x = door.x
    bloqueInvisible.x = door.x
    ghost.depth = door.depth 
    ghost.depth += 1
    door.lifetime = 700;
    climber.lifetime = 700;
    doorGroup.add(door)
    climberGroup.add(climber)
    invisibleGroup.add(bloqueInvisible)
    }
  }