
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine,world;
var ball;

function preload() {
  backgroundImg = loadImage("game.png");
}

function setup() {
	createCanvas(800, 500);

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.

  ball = new Ball(100,350,35);
	ground = new Ground(400,480,800,20);

  dustbin = new D(600,415,100,120);
	
	dustbin1 = new Dustbin(600,475,90,1);
  dustbin2 = new Dustbin(560,410,1,110);
  dustbin3 = new Dustbin(640,410,1,110);

  launcher = new Launcher(ball.body,{x:200, y:300});
}


function draw() {
 
  Engine.update(engine);
  
  rectMode(CENTER);
  background(backgroundImg);

  launcher.display();
  ball.display();
  ground.display();
  dustbin1.display();
  dustbin2.display();
  dustbin3.display();
  dustbin.display();
  
  drawSprites();
 
}

function keyPressed(){
	
	if(keyCode === UP_ARROW){
      Matter.Body.applyForce(ball.body,ball.body.position,{x:164,y:-230});
	}
}

function mouseDragged(){
  Matter.Body.setPosition(ball.body,{x:mouseX,y:mouseY});
}

function mouseReleased(){
  launcher.fly();
}