// To create variables here
var dog, happyDog, database, foods, foodStock;

var feedTime,lastFed;
var foodObj;

var gameState = 0;

var feed,addFood;

var changingGameState,readingGameState;




//To load the images
function preload(){
  dogStand = loadImage("Dog.png");
  dogHappy = loadImage("Happy.png");
  milkImg = loadImage("milk.png");
  bedroom = loadImage("Bed Room.png");
  washroom = loadImage("Wash Room.png");
  garden = loadImage("Garden.png");
  sadDog = loadImage("deadDog.png");
  livingroom = loadImage("Living Room.png");
}

function setup() {

  //To call the database
  database = firebase.database();

  //TO create canvas
	createCanvas(500, 500);

  //To create a dog
  dog = createSprite(250,400,50,70);
  dog.addImage(dogStand);
  dog.scale = 0.2;

  milk = createSprite(60,290,50,70);
  milk.addImage(milkImg);
  milk.scale = 0.05;

  //To assign the database to foodStock and to update it
  foodStock = database.ref('Pet/Food');
  foodStock.on("value",readStock);
  
  //To create the milk
  foodObj = new FoodC();

  //To assign the gamestate to reading game state
  readingGameState = database.ref('gameState');
  readingGameState.on("value",function(data){
    gameState = data.val();
  })
}


function draw() {  

  //To create a background
  background(46,139,87);

  //To display the food object
  foodObj.display();

  //To create feed button 
  feed = createButton('Feed the Dog');
  feed.position(390,95);
  if(feed.mousePressed(function(){
    gameState = 1;
    database.ref('/').update({
      'gameState':gameState
    });
  }));


  //To create add food button
  addFood = createButton('Add Food');
  addFood.position(490,95);
  if(addFood.mousePressed(function(){
    gameState = 2;
    database.ref('/').update({
      'gameState':gameState
    });
  }));


  //To create bath button
  bath = createButton('I want to take a bath');
  bath.position(567,95);
  if(bath.mousePressed(function(){
    gameState = 3;
    database.ref('/').update({
      'gameState':gameState
    });
  }));


  //To create sleep button
  sleep = createButton('I am very sleepy');
  sleep.position(707,95);
  if(sleep.mousePressed(function(){
    gameState = 4;
    database.ref('/').update({
      'gameState':gameState
    });
  }));


  //To create play button
  play = createButton('Lets play');
  play.position(510,125);
  if(play.mousePressed(function(){
    gameState = 5;
    database.ref('/').update({
      'gameState':gameState
    });
  }));


  //To create play in garden button
  playInGarden = createButton('Lets play in the park');
  playInGarden.position(583,125);
  if(playInGarden.mousePressed(function(){
    gameState = 6;
    database.ref('/').update({
      'gameState':gameState
    });
  }));

  //To assign the feed time
  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
   lastFed = data.val();
  });


  currentTime = hour();

  //To create the actions which will happen in these game states
  if(gameState === 0){
    dog.addImage(dogStand);
    dog.scale = 0.25;
    dog.y = 400;
    milk.visible = true;
    fill("black");
    textSize(30); 
    stroke(3);  
    text("Food Stock Left :- "+ foods,90,300);
    text("Click The button to see the output",20,150);
  }

  if(gameState === 0.1){
    dog.addImage(dogHappy);
    dog.scale = 0.25;
    dog.y = 400;
    milk.visible = true;
    fill("black");
    textSize(30); 
    stroke(3);  
    text("Food Stock Left :- "+ foods,90,300);
    text("Click The button to see the output",20,150);
  }
  
  
  if(gameState === 1){

    //To give the image
    dog.addImage(dogHappy);
    dog.scale = 0.25;
    dog.y = 400;

    //To decrease the number of stock remain
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    if(foods >= 1){
    foods--;
    }
    
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    }) 
    fill("black");
    textSize(30); 
    stroke(3);  
    text("Food Stock Left :- "+ foods,90,300);
    text("Click The button to see the output",20,150);
    gameState = 0.1;
    milk.visible = true;
  }



  if(gameState === 2){
    dog.addImage(dogHappy);
    dog.scale = 0.25;
    dog.y = 400;
    foodObj.updateFoodStock(foodObj.getFoodStock()+1);
    if(foods <= 29){
      foods++;
      }
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      Food:foods
    })
    fill("black");
    textSize(30); 
    stroke(3);  
    text("Food Stock Left :- "+ foods,90,300);
    text("Click The button to see the output",20,150);
    gameState = 0.1;
    milk.visible = true;
  }



  if(gameState === 3){
    dog.addImage(washroom);
    dog.scale = 1.0;
    dog.y = 150;
    milk.visible = false;
  }



  if(gameState === 4){
    dog.addImage(bedroom);
    dog.scale = 1.0;
    dog.y = 150;
    milk.visible = false;
  }



  if(gameState === 5){
    dog.addImage(livingroom);
    dog.scale = 1.0;
    dog.y = 150;
    milk.visible = false;
  }

  if(gameState === 6){
    dog.addImage(garden);
    dog.scale = 1.0;
    dog.y = 150;
    milk.visible = false;
  }
    

  drawSprites();

  //add styles here

  fill("white");
  textSize(15);

  if(lastFed >= 12){
    text("Last Feed : " + lastFed % 12 + " PM", 350,30);
  }

  else if(lastFed === 0){
    text("Last Feed : 12 AM", 350,30);
  } 
  
  else{
    text("Last Feed : " + lastFed + " AM", 350,30);
  }
}

function readStock(data){
   foods = data.val();
   foodObj.updateFoodStock(foods);
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }
  else{
    x = x - 1;
  }
   database.ref('/').update({Food:x})
}

function feedDog(){
  
  dog.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  foods--;
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodObj.updateFoodStock(foodObj.getFoodStock()+1);
  foods++;
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    Food:foods
  })
}

function update(state){
  database.ref('/').update({
    gameState: state
  });
}