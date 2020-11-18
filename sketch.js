const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var polygon;
var stand;
var box,box1,box2,box3,box4,box5;
var slingShot;
var score=0;
var backgroundImg;
function preload() {
  backgroundImg=loadImage("sprites/bg1.png")
    getBackgroundImg();
}


function setup() {
  engine = Engine.create();
  world=engine.world;
  createCanvas(1200,600);
  polygon=createSprite(200, 250, 50, 50);
  var options={
    'restitution':1.0,
    'friction':8.0,
    'density':1.5,
  }
  polygonBody=Bodies.rectangle(200,250,50,50,options);
  World.add(world,polygonBody);

  stand=new Stand(700,400,180,20);

   box = new Box(670,350,50,80);
   box1 = new Box(700,350,50,80);
   box2=new Box(700,350,50,80);
   box3=new Box(715,250,50,80);
   box4=new Box(655,250,50,80);
   box5=new Box(690,150,50,80);

  slingShot=new SlingShot(polygonBody,{x:200,y:100});
}

function draw() {
  Engine.update(engine)
 
  noStroke();
  textSize(35);
  fill ("black");
  text("Score: ",750,40)

  background(backgroundImg);  
  polygon.x=polygonBody.position.x;
  
  polygon.y=polygonBody.position.y;
  
  stand.display();
  box.display();
  box1.display();
  box2.display();
  box3.display();
  box4.display();
  box5.display();
  slingShot.display();
  drawSprites();
}
function mouseDragged(){
  Matter.Body.setPosition(polygonBody, {x: mouseX , y: mouseY});
}


function mouseReleased(){
  slingShot.fly();
}

function keyPressed(){
  if(keyCode===32){
      slingShot.attach(polygonBody)
  }
}
async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = response.json();
  console.log(responseJSON)
  // var datetime = responseJSON.datetime;
  // var hour = datetime.Slice(11,13);
  
  if(hour>=06 && hour<=18){
      bg = "sprites/bg1.png";
  }
  else{
      bg = "sprites/bg2.jpg";
  }

  backgroundImg = loadImage(bg);
}