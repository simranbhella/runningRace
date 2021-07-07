class Player {
    constructor(){
      this.index = null;
      this.distance = 0;
      this.name = null;
      this.rank;
    }
  
    getCount(){
      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",(data)=>{
        playerCount = data.val();
      })
    }
  
    updateCount(count){
      database.ref('/').update({
        playerCount: count
      });
    }
  
    getCarsAtEnd(){
      database.ref('CarsAtEnd').on("value", (data) => {
        this.rank = data.val();
      })
    }
  
    static updateCarsAtEnd(rank){
      database.ref('/').update({
        CarsAtEnd : rank
      })
    }
    update(){
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        name:this.name,
        distance:this.distance,
        rank: this.rank
      });
    }
  
    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
      })
    }
    getFinishedPlayers(){
      var finishPlayerRef = database.ref("finishedPlayers");
      finishPlayerRef.on("value",(data) => {
        finishPlayers = data.val()
      })
    }
    static updateFinishedPlayers(){
      database.ref("/").update({
        finishedPlayers: finishedPlayers+1
      })
      this.rank += 1
    }
  }
  