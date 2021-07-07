var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var runners, runner1, runner2, runner3, runner4;
var runner1Img, runner2Img, runner3Img, runner4Img, pathImg;
var passedFinish
var finishedPlayers = 0;
var bronze_img, gold_img, silver_img

function preload(){
  runner1Img = loadImage("runner.png");
  runner2Img = loadImage("runner.png")
  runner3Img = loadImage("runner.png")
  runner4Img = loadImage("runner.png")
 pathImg = loadImage("track.jpeg");
 bronze_img = loadImage("bronze.png")
 gold_img = loadImage("gold.png")
 silver_img = loadImage("silver.png")
}

function setup(){
    database = firebase.database();
   canvas = createCanvas(windowWidth, windowHeight);
   game = new Game();
   game.getState();
   game.start();
}


function draw(){
  if(playerCount === 3 && finishedPlayers == 0){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState===2 && finishedPlayers == 3){
    game.displayRanks();
  }
  if(finishedPlayers == 3){
    game.update(2);
  }
}
