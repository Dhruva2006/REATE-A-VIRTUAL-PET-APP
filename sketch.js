//Create variables here
var dog;
var happyDog;
var database;
var food;
var foodStock;
var feedPet, addFood;
var fedTime, lastFed;
var foodObject;

function preload()
{
  //load images here
  dog = loadImage("B/JS.Dog.png");
  happyDog = loadImage("A/JS.happyDog.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  dog1.createSprite(250, 250, 50, 50);
  dog1.addImage(dog);

  foodStock = database.ref('Food');
  foodStack.on("value", readStock);

  //Function to read values from DB 
  function readStock(data) {
    food = data.val();

    food = new Food();
  }

  //Function to write values in DB 
  function writeStock(x) {
    if(x<=0) {
      x = 0;
    }else {
      x = x-1;
    }
    database.ref('/').update({
      Food: x
    })
  }

  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  
}


function draw() {  
  background(46, 139, 87);

  

  fill(225, 225, 254);
  textSize(15);
  if(lastFed >=12) {
      text("Last Feed :" + lastFed % 12 + "PM", 350, 30);
  }else if(lastFed == 0) {
      text("Last Feed : 12 AM", 350, 30);
  }else{
      text("Last Feed : " + lastFed + "AM", 350, 30);
  }


  drawSprites();
  food.display();

  fedTime = database.ref("FedTime");
  fedTime.on("value", function(data) {
    lastFed = data.val();
  });


}

function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() -1);
  database.ref("/").update({
    Food : foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods() {
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}



