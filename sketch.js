
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;

var tree, treeImg;
var ground, stoneObj;
var boy, boyImg;
var mango1,mango2,mango3,mango4,mango5,mango6;
var launcherObject;

function preload()
{
	boyImg = loadImage("boy.png");
	treeImg = loadImage("tree.png");
}

function setup() {
	createCanvas(800, 700);
	
	

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	//tree = new Tree(670,450,50,400);
	ground = new Ground(400,650,800,20);
	stoneObj = new Stone(200,530,30);
	
	mango1 = new Mango(620,430,50);
	mango2 = new Mango(600,360,50);
	mango3 = new Mango(510,400,50);
	mango4 = new Mango(660,300,50);
	mango5 = new Mango(700,380,50);
	mango6 = new Mango(760,420,50);

	launcherObject = new Sling(stoneObj.body,{x:200, y:530});
	
	var render = Render.create({
		element: document.body,
		engine: engine,
		options: {
		  width: 1300,
		  height: 600,
		  wireframes: false
		}
	  });

	Engine.run(engine);
	  
	boy = createSprite(250,590,150,200);
	boy.addImage(boyImg);
	boy.scale = 0.1;

	tree = createSprite(620,460,50,400);
	tree.addImage(treeImg);
	tree.scale = 0.3;
}


function draw() {
  rectMode(CENTER);
  background(0);
  
  //image(boy ,250,590,15,200);

  tree.display();
  boy.display();
  stoneObj.display();

  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  
  ground.display();
  launcherObject.display();

  detectcollision(stoneObj,mango1);
  detectcollision(stoneObj,mango2);
  detectcollision(stoneObj,mango3);
  detectcollision(stoneObj,mango4);
  detectcollision(stoneObj,mango5);
  detectcollision(stoneObj,mango6);

  //drawSprites();
}

function mouseDragged(){
    Matter.Body.setPosition(stoneObj.body, {x: mouseX , y: mouseY});
}

function mouseReleased(){
    launcherObject.fly();
}

function keyPressed() {
	if (keyCode === 32) {
    Matter.Body.setPosition(stoneObj.body, {x:200, y:530}) 
	  launcherObject.attach(stoneObj.body);
	}
  }

function detectcollision(lstone,lmango){
	/*var collision = Matter.SAT.collides(lstone,lmango);
	if(collision.collided){
		console.log("collided");
		Matter.Body.setStatic(lmango,false);	
	}*/
  mangoBodyPosition=lmango.body.position
  stoneBodyPosition=lstone.body.position
  
  var distance=dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y)
  //console.log(distance)
 // console.log(lmango.r+lstone.r)
  	if(distance<=lmango.r+lstone.r)
    {
      //console.log(distance);
  	  Matter.Body.setStatic(lmango.body,false);
    }

  }