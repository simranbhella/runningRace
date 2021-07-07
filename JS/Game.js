class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      runner1 = createSprite(500,200);
      runner1.addImage(runner1Img);
      runner1.scale = 0.5;
      runner2 = createSprite(700,200);
      runner2.addImage(runner2Img)
      runner2.scale = 0.5
      runner3 = createSprite(900,200);
      runner3.addImage(runner3Img);
      runner3.scale = 0.5
      runners = [runner1, runner2, runner3];
    }
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      player.getCarsAtEnd();
  
      
      
      if(allPlayers !== undefined){
        //var display_position = 100;
        
        //index of the array
        var index = 0;
        background("black");
        image(pathImg, 0, -windowHeight*4, windowWidth, windowHeight*5);
        //x and y position of the cars
        var x = 300;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 200;
          //use data form the database to display the cars in y direction
          y = windowHeight - allPlayers[plr].distance;
          runners[index-1].x = x;
          runners[index-1].y = y;
  
          if (index === player.index){
            stroke(10)
            fill("blue")
            ellipse(x,y,70,70);
            //runners[index - 1].shapeColor = "blue";
            camera.position.x = displayWidth/2;
            camera.position.y = runners[index-1].y
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
          textAlign(CENTER)
          textSize(15)
          text(allPlayers[plr].name, runners[index-1].x, runners[index-1].y + 120)
        }
        console.log(runners[index-1].y);
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null && passedFinish!== true){
        player.distance +=10
        player.update();
      }
      
  
      console.log(player.distance);
      if(player.distance > 3700 && passedFinish == false){
        player.updateFinishedPlayers();
        player.rank = finishedPlayers;
        player.update();
        passedFinish = true;        
      }


      drawSprites();
    } 
     displayRanks(){camera.position.x =0; camera.position.y = 0; imageMode(CENTER); Player.getPlayerInfo(); image(bronze_img, displayWidth/-4, -100 + displayHeight/9, 200, 240); image(silver_img, displayWidth/4, -100 + displayHeight/10, 225, 270); image(gold_img, 0, -100, 250, 300); textAlign(CENTER); textSize(50); for(var plr in allPlayers){ if(allPlayers[plr].rank === 1){ text("1st : "+allPlayers[plr].name,0,85); } else if(allPlayers[plr].rank === 2){ text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73); }else if(allPlayers[plr].rank === 3){ text("3rd: " + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76); }else{ textSize(30); text("Honorable Mention: " + allPlayers[plr].name, 0, 225); } } 
  }

    end(){
        console.log("Game Over.")
        console.log(player.rank);
    }
  }
