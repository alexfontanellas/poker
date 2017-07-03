$(document).ready(function(){
  ///////////////// CONSTRUCTOR //////////////////////
  function Game(){

    this.player1 = new Player();
    this.player2 = new Player();
    this.player3 = new Player();
    this.player4 = new Player();
    this.user = new User();


    this.players = [this.user,this.player1,this.player2,this.player3,this.player4];

    // Buttons
    this.callButton = $("#callButton");
    this.foldButton = $("#foldButton");
    this.betQuantity = $("#betQuantity");
    this.betButton = $("#betButton");
    this.checkButton = $("#checkButton");

    this.switchButtons(true);

    this.potQuantity = $(".pot")[0];

    //Get the cards
    this.topLeftCards = $(".player1");
    this.topRightCards = $(".player2");
    this.bottomLeftCards = $(".player3");
    this.bottomRightCards = $(".player4");
    this.userCards = $(".user");

    // Cards in the middle
    this.firstCard = $(".hand").children(":first-child")[0];
    this.secondCard = $(".hand").children(":nth-child(2)")[0];
    this.thirdCard = $(".hand").children(":nth-child(3)")[0];
    this.fourthCard = $(".hand").children(":nth-child(4)")[0];
    this.fifthCard = $(".hand").children(":last-child")[0];

    // Get its place in the table
    this.player1.cardsHTML = $(".player1");
    this.player2.cardsHTML =$(".player2");
    this.player3.cardsHTML =  $(".player3");
    this.player4.cardsHTML =$(".player4");
    this.user.cardsHTML = $(".user");

    // cards

    this.player1FirstCard = this.topLeftCards.children(":last-child").children(":first-child");
    this.player1SecondCard = this.topLeftCards.children(":last-child").children(":last-child");

    this.player2FirstCard = this.topRightCards.children(":last-child").children(":first-child");
    this.player2SecondCard = this.topRightCards.children(":last-child").children(":last-child");

    this.player3FirstCard = this.bottomLeftCards.children(":last-child").children(":first-child");
    this.player3SecondCard = this.bottomLeftCards.children(":last-child").children(":last-child");

    this.player4FirstCard = this.bottomRightCards.children(":last-child").children(":first-child");
    this.player4SecondCard = this.bottomRightCards.children(":last-child").children(":last-child");

    this.userFirstCard = this.userCards.children(":last-child").children(":first-child");
    this.userSecondCard = this.userCards.children(":last-child").children(":last-child");

    this.player1.cardsPlayer = [this.player1FirstCard,  this.player1SecondCard];
    this.player2.cardsPlayer = [this.player2FirstCard, this.player2SecondCard];
    this.player3.cardsPlayer = [this.player3FirstCard, this.player3SecondCard];
    this.player4.cardsPlayer = [this.player4FirstCard, this.player4SecondCard];
    this.user.cardsPlayer = [this.userFirstCard, this.userSecondCard];




    // Indeces for the array of players
    this.indecesRoles = [0,1,2];

    this.currentPlayerIndex = this.indecesRoles[2];
    this.currentPlayer = this.players[this.currentPlayerIndex];

    this.hasntClicked = false;

    //The actual roles
    this.dealer = this.player1;
    this.smallBlind = this.player2;
    this.bigBlind = this.player3;

    // Quantities for big and small blind
    this.blinds = [5,10,10,20,15,30,20,40,25,50,50,100,100,200];
    this.smallBlindQuantity = this.blinds[0];
    this.bigBlindQuantity = this.blinds[1];

    // Count the hands
    this.handNumber = 0;

    // Keep track who's still in the hand
    this.currentHand = [this.user,this.player1,this.player2,this.player3,this.player4];

    this.cards = [
        { name: "14",color : "clubs" ,  img: "deck/clubs/A.png" },
        { name: "2",color : "clubs" , img: "deck/clubs/2.png" },
        { name: "3",color : "clubs" , img: "deck/clubs/3.png" },
        { name: "4",color : "clubs" , img: "deck/clubs/4.png" },
        { name: "5", color : "clubs" , img: "deck/clubs/5.png" },
        { name: "6", color : "clubs" , img: "deck/clubs/6.png" },
        { name: "7",color : "clubs" , img: "deck/clubs/7.png" },
        { name: "8", color : "clubs" , img: "deck/clubs/8.png"},
        { name: "9", color : "clubs" , img: "deck/clubs/9.png"},
        { name: "10",color : "clubs" , img: "deck/clubs/10.png" },
        { name: "11", color : "clubs" , img: "deck/clubs/J.png" },
        { name: "12", color : "clubs" , img: "deck/clubs/Q.png"},
        { name: "13",color : "clubs" , img: "deck/clubs/K.png" },

        { name: "14",color : "spades" ,  img: "deck/spades/A.png" },
        { name: "2",color : "spades" , img: "deck/spades/2.png" },
        { name: "3",color : "spades" , img: "deck/spades/3.png" },
        { name: "4",color : "spades" , img: "deck/spades/4.png" },
        { name: "5", color : "spades" , img: "deck/spades/5.png" },
        { name: "6", color : "spades" , img: "deck/spades/6.png" },
        { name: "7",color : "spades" , img: "deck/spades/7.png" },
        { name: "8", color : "spades" , img: "deck/spades/8.png"},
        { name: "9", color : "spades" , img: "deck/spades/9.png"},
        { name: "10",color : "spades" , img: "deck/spades/10.png" },
        { name: "11", color : "spades" , img: "deck/spades/J.png" },
        { name: "12", color : "spades" , img: "deck/spades/Q.png"},
        { name: "13",color : "spades" , img: "deck/spades/K.png" },

        { name: "14",color : "hearts" ,  img: "deck/hearts/A.png" },
        { name: "2",color : "hearts" , img: "deck/hearts/2.png" },
        { name: "3",color : "hearts" , img: "deck/hearts/3.png" },
        { name: "4",color : "hearts" , img: "deck/hearts/4.png" },
        { name: "5", color : "hearts" , img: "deck/hearts/5.png" },
        { name: "6", color : "hearts" , img: "deck/hearts/6.png" },
        { name: "7",color : "hearts" , img: "deck/hearts/7.png" },
        { name: "8", color : "hearts" , img: "deck/hearts/8.png"},
        { name: "9", color : "hearts" , img: "deck/hearts/9.png"},
        { name: "10",color : "hearts" , img: "deck/hearts/10.png" },
        { name: "11", color : "hearts" , img: "deck/hearts/J.png" },
        { name: "12", color : "hearts" , img: "deck/hearts/Q.png"},
        { name: "13",color : "hearts" , img: "deck/hearts/K.png" },

        { name: "14",color : "diamonds" ,  img: "deck/diamonds/A.png" },
        { name: "2",color : "diamonds" , img: "deck/diamonds/2.png" },
        { name: "3",color : "diamonds" , img: "deck/diamonds/3.png" },
        { name: "4",color : "diamonds" , img: "deck/diamonds/4.png" },
        { name: "5", color : "diamonds" , img: "deck/diamonds/5.png" },
        { name: "6", color : "diamonds" , img: "deck/diamonds/6.png" },
        { name: "7",color : "diamonds" , img: "deck/diamonds/7.png" },
        { name: "8", color : "diamonds" , img: "deck/diamonds/8.png"},
        { name: "9", color : "diamonds" , img: "deck/diamonds/9.png"},
        { name: "10",color : "diamonds" , img: "deck/diamonds/10.png" },
        { name: "11", color : "diamonds" , img: "deck/diamonds/J.png" },
        { name: "12", color : "diamonds" , img: "deck/diamonds/Q.png"},
        { name: "13",color : "diamonds" , img: "deck/diamonds/K.png" },
      ];
      this.numberPlayers = 5;

      this.communityCards = [];
      // Keep track of the index in every hand. It has to be reset each hand
      this.handIndex = 0;

      this.pot = 0;
      this.maxPotHand = 0;

      this.isPreflop = true;

      this.addEvents();

      this.potAllIn = [];

      this.myFunction = undefined;

      this.countTurns = 0;

      this.winner = undefined;

      // Order of preferences
      this.preferenceToWin = ["straightFlush","poker","fullHouse","flush","straight","three","twoPair","pair","highCard"];


      // Keep track of things in the communityCards
      this.pairs = [];
      this.threes = [];
      this.poker = [];

  }
  ///////////////// PROTOTYPES //////////////////////
  // Shuffle the cards using the Fisher-Yates' algorithm
  Game.prototype.shuffleCards = function(){
    var m = this.cards.length, t, i;
      // While there remain elements to shuffle…
      while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = this.cards[m];
        this.cards[m] = this.cards[i];
        this.cards[i] = t;
      }
  };
  // Deal 2 cards to each player
  Game.prototype.dealInitialHands = function(myFunction) {
    var that = this;
    (function myLoop (i,k) {
       setTimeout(function () {
         for(var j = 0;j<2;j++){
           that.players[i].cards.push(that.cards[that.handIndex]);
           console.log(that.cards[that.handIndex]);
           that.players[i].cardsPlayer[j].css("background-image", "url('images/" + that.cards[that.handIndex].img + "')");
           that.handIndex++;
           // CALL FUNCTION TO DO THE ANIMATION
         }
         i = (i+1)%that.players.length;
         k++;
          if (k < that.players.length) {
            myLoop(i,k);
          }
          else{
            that.players[that.indecesRoles[1]].bet = that.smallBlindQuantity;
            that.players[that.indecesRoles[2]].bet = that.bigBlindQuantity;
            that.maxPotHand = that.bigBlindQuantity;

            // THE POT
            that.pot = that.smallBlindQuantity + that.bigBlindQuantity;
            // CHECK BOUNDRIES
            that.substractInitialBet();
            that.updatePot(that.pot);
            myFunction.call(that);
          }
       }, 200);
    })(that.indecesRoles[1],0);

  };

  // Deal the Flop
  Game.prototype.dealFlop = function(){
    for(var i = 0;i<3;i++){
      this.communityCards.push(this.cards[this.handIndex]);
      this.handIndex++;
    }
    $(this.firstCard).removeClass('hide').css("background-image", "url('images/" + this.communityCards[0].img + "')");
    $(this.secondCard).removeClass('hide').css("background-image", "url('images/" + this.communityCards[1].img + "')");
    $(this.thirdCard).removeClass('hide').css("background-image", "url('images/" + this.communityCards[2].img + "')");



  };
  // Deal the turn and the river
  Game.prototype.dealOneCard = function(card,index){
    this.communityCards.push(this.cards[this.handIndex]);
    this.handIndex++;
    $(card).removeClass('hide').css("background-image", "url('images/" + this.communityCards[index].img + "')");

  };
  // Start each hand. We will call this function every time somebody wins the hand.
  Game.prototype.play = function() {
    //while(this.numberPlayers!== 1 || this.user.chips === 0){
      // Restart each time the index to start at 0th position
      this.handIndex = 0;
      // Restart the community cards
      this.communityCards = [];
      // Restart the pot
      this.pot = 0;
      this.updatePot(0);
      this.maxPotHand = 0;
      this.potAllIn = [];

      this.pairs = [];
      this.threes = [];
      this.poker = [];

      this.winner = undefined;
      this.isPreflop = true;

      $(this.firstCard).addClass('hide');
      $(this.secondCard).addClass('hide');
      $(this.thirdCard).addClass('hide');
      $(this.fourthCard).addClass('hide');
      $(this.fifthCard).addClass('hide');


      // Copy the array of players
      this.currentHand = this.players.slice();
      this.changeBlinds();

      //To calculate who is the dealer,big and small blind
      this.calculateRoles();
      this.currentPlayerIndex = this.indecesRoles[2];
      // First player will be the one next to the big blind
      this.currentPlayerIndex = (this.currentPlayerIndex+1)%this.players.length;
      // Store its index so we know when to stop
      this.stopHandIndex = this.currentPlayerIndex;
      this.resetBets();
      this.shuffleCards();
      this.dealInitialHands(this.preflop);
    //}

  };

  Game.prototype.switchButtons = function(state){
    this.callButton.attr("disabled",state);
    this.foldButton.attr("disabled",state);
    this.betQuantity.attr("disabled",state);
    this.betButton.attr("disabled",state);
    this.checkButton.attr("disabled",state);
  };
  Game.prototype.addEvents = function(){
    this.callButton.click(this.callUser.bind(this));
    this.foldButton.click(this.foldUser.bind(this));
    this.checkButton.click(this.checkUser.bind(this));
    this.betButton.click(this.betUser.bind(this));
  };

  Game.prototype.playHand = function(myFunction){
    var that = this;
    this.currentPlayer = this.players[this.currentPlayerIndex];

    if(this.currentHand.length === 1){
      // He is the winner
      this.seeResult();
    }
    //console.log("My index:",this.currentPlayerIndex);
    else if(this.currentPlayerIndex === this.stopHandIndex && this.countTurns !== 0){
      myFunction.call(this);
    }
    else if(this.currentPlayer.fold === true){
      this.currentPlayerIndex = (this.currentPlayerIndex+1)%this.players.length;
      console.log("He folded");
      this.playHand(myFunction);
    }
    else if(this.currentPlayer.isUser){
      this.currentPlayer.cardsHTML.toggleClass("player-active");
      this.countTurns++;
      console.log("Your turn");
      this.switchButtons(false);

      if(this.maxPotHand === 0){
        this.callButton.attr("disabled",true);
      }
      else{
        this.checkButton.attr("disabled",true);
      }
      if(this.bigBlind === this.currentPlayer && this.isPreflop){
        console.log("You are big blind");
        this.callButton.attr("disabled",true);
        this.checkButton.attr("disabled",false);


      }
      if(this.hasntClicked){
        this.hasntClicked = false;
        this.switchButtons(true);
        this.currentPlayerIndex = (this.currentPlayerIndex+1)%this.players.length;
        console.log("GOT EXECUTED");
        this.playHand(myFunction);

      }
    }
    else if(this.currentPlayer.isComputer){
      this.currentPlayer.cardsHTML.toggleClass("player-active");
      setTimeout(function () {
        that.countTurns++;
        console.log("I am a computer");
        that.currentPlayer.cardsHTML.toggleClass("player-active");
        that.playComputer();
        that.currentPlayerIndex = (that.currentPlayerIndex+1)%that.players.length;
        that.playHand(myFunction);
      },200);
    }

  };

  Game.prototype.preflop = function(){
          // START PLAYING
          this.countTurns = 0;
          this.myFunction = this.flop;
          this.playHand(this.flop);
  };

  Game.prototype.flop = function(){
    this.currentPlayerIndex = this.indecesRoles[1];
    this.stopHandIndex = this.currentPlayerIndex;

    this.maxPotHand = 0;
    this.countTurns = 0;
    this.myFunction = this.turn;
    console.log("flop");
    this.isPreflop = false;
    this.dealFlop(); // Deal the flop
    this.playHand(this.turn);
  };

  Game.prototype.turn = function(){
    // START PLAYING
    this.myFunction = this.river;
    this.countTurns = 0;
    this.currentPlayerIndex = this.indecesRoles[1];
    this.stopHandIndex = this.currentPlayerIndex;

    this.maxPotHand = 0;
    console.log("turn");
    this.dealOneCard(this.fourthCard,3); // Deal the turn
    this.playHand(this.river);

  };

  Game.prototype.river = function(){
    // START PLAYING
    this.maxPotHand = 0;
    this.countTurns = 0;

    this.currentPlayerIndex = this.indecesRoles[1];
    this.stopHandIndex = this.currentPlayerIndex;

    this.myFunction = this.seeResult;
    this.myTimers = [];


    console.log("river");
    this.dealOneCard(this.fifthCard,4); // Deal the turn
    this.playHand(this.seeResult);

  };

  Game.prototype.seeResult = function(){
    console.log("see result");
    if(this.currentHand.length === 1){
      this.winner = this.currentHand[0];
      this.givePotToWinner();
    }
    else{
      this.winnerHand();
      this.handNumber++;
    }


  };

  Game.prototype.givePotToWinner = function(){
    this.winner.chips += this.pot;
    var that = this;
    var indexToUse = this.players.indexOf(this.winner);

    // show the cards of each player
    for(var i = 0;i<this.currentHand.length;i++){

    }

    if(this.winner.isUser){
      this.winner.labelChips[0].innerHTML = this.winner.chips;
    }
    else{
      this.winner.labelChips[indexToUse].innerHTML = this.winner.chips;
    }
    if(this.currentHand.length === 1){
      this.nextHand();
    }
    else{
      setTimeout(function () {
        that.nextHand();

      },1200);
    }

  };

  function findStraight(myArray){

    return false;
  }
  function checkPoker(poker,player){
    if(poker.length !==0){
      // There will just be one number in each array. THE FIRST IS THE threes
      player.myHandIfTie = player.myHandIfTie.concat(poker);
      return true;
    }
    return false;
  }

  function checkFullHouse(threes,pairs,player){
    if(threes.length !==0 && pairs.length!==0 && threes[0]!==pairs[0]){
      // There will just be one number in each array. THE FIRST IS THE threes
      player.myHandIfTie =  player.myHandIfTie.concat(threes).concat(pairs);
      return true;
    }
    return false;
  }
  function sortMyArray(myOldArray){
    return myOldArray.sort(function(a, b) {
        return a - b;
      });
  }

  // We will be returning whatever hand he has based on the priorities
  Game.prototype.decideWhatEachHandHas = function(player){
    // Cards of the player
    var card1 = player.cards[0];
    var card2 = player.cards[1];

    var cards = [card1.name,card2.name];

    var pairs = [];
    var threes = [];
    var poker = [];


    var straight = false;

    var arrayWithAllCard = [parseInt(card1.name),parseInt(card2.name)];
    for(var i = 0;i<this.communityCards.length;i++){
      arrayWithAllCard.push(parseInt(this.communityCards[i].name));
    }
    arrayWithAllCard = sortMyArray(arrayWithAllCard);
    // Get the suits of the cards in the middle
    var arrayOfColors = countColors(this.communityCards,0,0,0,0);
    clubs = arrayOfColors[0];
    diamonds = arrayOfColors[1];
    hearts = arrayOfColors[2];
    spades = arrayOfColors[3];

    switch(card1.color){
      case "clubs":
        clubs++;
        break;
      case "diamonds":
        diamonds++;
        break;
      case "hearts":
        hearts++;
        break;
      case "spades":
        spades++;
        break;
    }

    switch(card2.color){
      case "clubs":
        clubs++;
        break;
      case "diamonds":
        diamonds++;
        break;
      case "hearts":
        hearts++;
        break;
      case "spades":
        spades++;
        break;
    }
    // REMEMBER
    //this.preferenceToWin = ["straightFlush","poker","fullHouse","flush","straight","three","twoPair","pair","highCard"];

    //

    // Check for straight
    if(findStraight(arrayWithAllCard)){
      straight = true;
      // Check for royal straight
      player.finalHand = "straight";
    }
    ///////////
    // Check for flush. Even if it's already in the middle, everybody'd have flush
    if(clubs>=5 || diamonds>=5 || hearts>=5 || spades>=5){
      if(straight === true){
        player.finalHand = "straightFlush";
        return;
      }
      else{
        player.finalHand = "flush";
      }
    }

    var myCounter;
    // Check for pairs,threes,poker
    for(i = 0;i<2;i++){
      if(card1.name !== card2.name){
        myCounter = countHowManyTimesAppearsWithoutIndex(this.communityCards,cards[i]);
        // Check all the pairs already in the communityCards
        if(myCounter ===2){
          pairs.push(cards[i]);
        }
        // Check all the three-of a kind in the communityCards
        else if(myCounter ===3){
          threes.push(cards[i]);
        }
        // Check all the pokers in the communityCards
        else if(myCounter ===4){
          poker.push(cards[i]);
        }
      }
      // If the two initial cards are the same, a count of 2 means a three, count of 3 means poker...
      else{
        myCounter = countHowManyTimesAppearsWithoutIndex(this.communityCards,cards[i].name);
        // Check all the pairs already in the communityCards
        if(myCounter ===2){
          threes.push(cards[i]);
        }
        // Check all the three-of a kind in the communityCards
        else if(myCounter ===3){
          poker.push(cards[i]);
        }
      }
    }
    // Initial pair but make sure he doesn't have something better
    if(card1.name === card2.name && threes.length === 0 && poker.length === 0){
      pairs.push(card1.name);
    }
    pairs = pairs.concat(this.pairs);
    threes = threes.concat(this.threes);
    poker = poker.concat(this.poker);

    pairs = sortMyArray(pairs);
    threes = sortMyArray(threes);


    // See if he has a poker
    if(checkPoker(poker,player)){
      player.finalHand = "poker";
      return;
    }


    // See if he has a full house

    else if(checkFullHouse(threes,pairs,player)){
      player.finalHand = "fullHouse";
      return;
    }
    else if(player.finalHand === "flush"){
      player.myHandIfTie.push(arrayWithAllCard[arrayWithAllCard.length-1]);
      return;
    }
    else if(threes.length!== 0){
      player.finalHand = "three";
      for(i = 0;i<threes.length;i++){
        player.myHandIfTie.push(threes[i]);
      }
      return;
    }
    else if(pairs.length >= 2){
      player.finalHand = "twoPair";
      for(i = 0;i<pairs.length;i++){
        player.myHandIfTie.push(pairs[i]);
      }
      return;
    }
    else if(pairs.length === 1){
      player.finalHand = "pair";
      player.myHandIfTie.push(pairs[0]);
      return;
    }

    player.finalHand = "highCard";
    player.myHandIfTie = [arrayWithAllCard[arrayWithAllCard.length-1],arrayWithAllCard[arrayWithAllCard.length-2]];

    return;



  };
  function countHowManyTimesAppears(myArray,value,index){
    var count = 1;
    for(var i = 0;i<myArray.length;i++){
      if(i!==index){
        if(myArray[i].name===value){
          count++;
        }
      }
    }
    return count;
  }
  function countHowManyTimesAppearsWithoutIndex(myArray,value){
    var count = 1;
    for(var i = 0;i<myArray.length;i++){
      if(myArray[i].name===value){
        count++;
      }
    }
    return count;
  }
  function countColors(myArray,clubs,diamonds,hearts,spades){
    for(var i = 0;i<myArray.length;i++){
      switch(myArray[i].color){
        case "clubs":
        clubs++;
        break;

        case "diamonds":
        diamonds++;
        break;

        case "hearts":
        hearts++;
        break;

        case "spades":
        spades++;
        break;
      }
    }
    return [clubs,diamonds,hearts,spades];
  }

  Game.prototype.checkWinner = function(){

    var arrayNotToRepeat = [];
    // We find pairs/three-of a kind/ poker in the community cards
    for(var i = 0;i<this.communityCards.length;i++){
      if(arrayNotToRepeat.indexOf(this.communityCards[i].name)===-1){
        var myCounter = countHowManyTimesAppears(this.communityCards,this.communityCards[i].name,i);
        // Check all the pairs already in the communityCards
        if(myCounter ===2){
          this.pairs.push(this.communityCards[i].name);
        }
        // Check all the three-of a kind in the communityCards
        else if(myCounter ===3){
          this.threes.push(this.communityCards[i].name);
        }
        // Check all the pokers in the communityCards
        else if(myCounter ===4){
          this.poker.push(this.communityCards[i].name);
        }
        arrayNotToRepeat.push(this.communityCards[i].name);
      }
    }

    // We sort the array so if there are more than 2 pairs/threes we will get rid of the lowest ones
      this.pairs = sortMyArray(this.pairs);

      this.threes = sortMyArray(this.threes);

    for(i = 0;i<this.currentHand.length;i++){
      this.decideWhatEachHandHas(this.currentHand[i]);
      console.log("My final hand is: ",this.currentHand[i].finalHand);
      console.log("My hand if tied: ",this.currentHand[i].myHandIfTie);
    }
    ////
    // ORGANIZE IT
    var that = this;
    // Not five cards since there are just 4 cards of each number ^^

    this.players.forEach(function(element){
    console.log("Points: ",element.points);
    });

    // Hardcoded as fuck
    this.winner = this.user;


    ///
    this.communityCards.forEach(function(element){
      console.log("Card:", element.name);
    });


    // Determine who is the winner depending on that the previous function calculated
    // Just not to make it crash
    this.winner = this.user;
  };

  Game.prototype.nextHand = function(){
    if(!this.gameOver() || this.players.length !== 1){
      this.play();
    }
  };

  Game.prototype.winnerHand = function() {
    console.log(this.communityCards);
    this.players.forEach(function(element){
      console.log("My cards are: ",element.cards[0].name,element.cards[1].name);
    });

    this.checkWinner();
    this.givePotToWinner();

    // IF THE GAME IS NOT OVER: this.play();
  };

    Game.prototype.changeBlinds = function(){
      if(this.handNumber%4 === 0 && this.handNumber <29 && this.handNumber !== 0){
        this.blinds.splice(0,2);
        this.smallBlindQuantity = this.blinds[0];
        this.bigBlindQuantity = this.blinds[1];
      }
    };

    Game.prototype.calculateRoles = function(){
      var that = this;
      this.indecesRoles.forEach(function(element,index,array){
        array[index] = (element+1)%that.players.length;
      });

      this.dealer = this.players[this.indecesRoles[0]];
      this.smallBlind = this.players[this.indecesRoles[1]];
      this.bigBlind = this.players[this.indecesRoles[2]];
    };

    Game.prototype.resetBets = function() {
      this.players.forEach(function(element,index,array){
        array[index].bet = 0;
        array[index].cards = [];
        array[index].fold = false;
        array[index].points = 0;
        array[index].finalHand = undefined;
        array[index].myHandIfTie = [];


      });
    };

    Game.prototype.substractInitialBet = function(){
      var smallBlindIndex = this.indecesRoles[1];
      var bigBlindIndex = this.indecesRoles[2];

      if(this.players[smallBlindIndex].chips < this.smallBlindQuantity){
        //this.maxPotHand = this.players[smallBlindIndex].chips;
        this.players[smallBlindIndex].allIn = true;
      }
      this.players[smallBlindIndex].chips -= this.smallBlindQuantity;

      if(this.players[bigBlindIndex].chips < this.bigBlindQuantity){
        //this.maxPotHand = this.players[bigBlindIndex].chips;
        this.players[bigBlindIndex].allIn = true;
      }
      this.players[bigBlindIndex].chips -= this.bigBlindQuantity;

      if(this.players[smallBlindIndex].isUser){
        this.players[smallBlindIndex].labelChips[0].innerHTML = this.players[smallBlindIndex].chips;
      }
      else{
        this.players[smallBlindIndex].labelChips[smallBlindIndex].innerHTML = this.players[smallBlindIndex].chips;
      }
      if(this.players[bigBlindIndex].isUser){
        this.players[bigBlindIndex].labelChips[0].innerHTML = this.players[bigBlindIndex].chips;
      }
      else{
        this.players[bigBlindIndex].labelChips[bigBlindIndex].innerHTML = this.players[bigBlindIndex].chips;
      }


    };

    Game.prototype.updatePot = function(value){
      this.potQuantity.innerHTML = "Pot: "+value;

    };

    Game.prototype.updatePlayer = function(){
      if(this.currentPlayer.isUser){
        this.currentPlayer.labelChips[0].innerHTML = this.currentPlayer.chips;
      }
      else{
        this.currentPlayer.labelChips[this.currentPlayerIndex].innerHTML = this.currentPlayer.chips;
      }

    };
    // PROTOTYPES FOR THE USER

  Game.prototype.callUser = function(){
    if(this.currentPlayer.isUser){
      var userIndex = this.currentPlayerIndex;
      if(this.players[userIndex].chips < this.maxPotHand){
        // TAKE INTO ACCOUNT WHAT HAPPENS HERE
        //this.maxPotHand = this.players[userIndex].chips;
        this.players[userIndex].allIn = true;
      }
      if(this.bigBlind === this.players[userIndex] && this.isPreflop){

      }
      else if(this.smallBlind === this.players[userIndex]&& this.isPreflop){
          this.players[userIndex].chips += this.smallBlindQuantity;
          this.players[userIndex].chips -= this.maxPotHand;

          this.pot-=this.smallBlindQuantity;
          this.pot+= this.maxPotHand;
      }
      else{
        this.players[userIndex].chips -= this.maxPotHand;
        this.pot+= this.maxPotHand;
      }
      this.updatePot(this.pot);
      this.updatePlayer();
      this.switchButtons(true);
      this.currentPlayer.cardsHTML.toggleClass("player-active");
      this.currentPlayerIndex = (this.currentPlayerIndex+1)%this.players.length;
      this.playHand(this.myFunction);
    }


  };

  Game.prototype.foldUser = function(){
    if(this.currentPlayer.isUser){
      this.currentPlayer.fold = true;
      this.currentHand.splice(this.currentPlayerIndex,1);
      this.switchButtons(true);
      this.currentPlayer.cardsHTML.toggleClass("player-active");
      this.currentPlayerIndex = (this.currentPlayerIndex+1)%this.players.length;

      this.playHand(this.myFunction);
    }
  };

  Game.prototype.betUser = function(){
    if(this.currentPlayer.isUser){
      var userIndex = this.currentPlayerIndex;
      var quantity = parseInt(this.betQuantity[0].value);
      if(this.players[userIndex].chips < quantity){
        //quantity = this.players[userIndex].chips;
        this.players[userIndex].allIn = true;
      }
      if(quantity > this.maxPotHand){
        this.players[userIndex].chips -= quantity;
        this.maxPotHand = quantity;
        this.pot += quantity;
        this.updatePot(this.pot);
        this.updatePlayer();
        this.switchButtons(true);

        this.stopHandIndex = this.currentPlayerIndex;
        this.currentPlayer.cardsHTML.toggleClass("player-active");
        this.currentPlayerIndex = (this.currentPlayerIndex+1)%this.players.length;
        this.playHand(this.myFunction);
      }

    }

  };

  Game.prototype.checkUser = function(){
    if(this.currentPlayer.isUser){
      var userIndex = this.currentPlayerIndex;
      console.log("checked");
      this.switchButtons(true);
      this.currentPlayer.cardsHTML.toggleClass("player-active");
      this.currentPlayerIndex = (this.currentPlayerIndex+1)%this.players.length;
      this.playHand(this.myFunction);
    }

  };

  Game.prototype.removeClick = function(){
    this.callButton.off("click");
    this.foldButton.off("click");
    this.betButton.off("click");
    this.checkButton.off("click");

  };


// PROTOTYPES TO BE DONE WITH THE GAME
  Game.prototype.isOut = function(){
    var that  = this;
    this.players.forEach(function(element){
      if(element.chips === 0){
        that.players.splice(that.players.indexOf(element));
        that.numberPlayers--;
      }
    });
  };

  Game.prototype.gameOver = function(){
    if(this.user.chips === 0){
      return true;
    }
    return false;
  };

  // PROTOTYPES FOR COMPUTER'S DECISIONS

  Game.prototype.whatToDo = function(){
    //console.log(this);
    // Calculate if "call", "fold" or "raise"
    var myPossibleDecisions = ["call","fold","raise","check"];
    var myRandomindex = Math.floor(Math.random()*myPossibleDecisions.length);

    /*
    var decision = myPossibleDecisions[myRandomindex];
    if(decision === "check" && this.maxPotHand!==0){
      this.whatTodo();
    }
    else if(decision === "call" && this.maxPotHand === 0){
      this.whatTodo();
    }
    //var decision = "call";
    */
    return "call";
  };


  Game.prototype.playComputer = function(){
    // Make the decision: to go or not
    var toDo = this.whatToDo();
    if(toDo === "call"){
      this.callComputer();
    }
    else if(toDo === "fold"){
      this.foldComputer();
    }
    else if(toDo === "raise"){
      this.raiseComputer();
    }
    else{
      this.checkComputer();  //Check case
    }

  };

  Game.prototype.callComputer = function(){
    var playerIndex = this.currentPlayerIndex;

    if(this.players[playerIndex].chips < this.maxPotHand){
      //this.maxPotHand = this.players[playerIndex].chips;
      this.players[playerIndex].allIn = true;
    }
    if(this.bigBlind === this.players[playerIndex] && this.isPreflop){

    }
    else if(this.smallBlind === this.players[playerIndex] && this.isPreflop){
        this.players[playerIndex].chips += this.smallBlindQuantity;
        this.players[playerIndex].chips -= this.maxPotHand;

        this.pot-=this.smallBlindQuantity;
        this.pot+= this.maxPotHand;
    }
    else{
      this.pot+= this.maxPotHand;
      this.players[playerIndex].chips -= this.maxPotHand;
    }
    this.updatePot(this.pot);
    this.updatePlayer();
    };

  Game.prototype.raiseComputer = function(){
    var playerIndex = this.currentPlayerIndex;
    // It will make sure its within the boundries
    var newBet = this.calculateRaise(playerIndex);
    this.players[playerIndex].chips -= newBet;
    // CHECK THIS
    this.pot += newBet;
    this.updatePot(newBet);
    this.maxPotHand = newBet;
    this.stopHandIndex = this.currentPlayerIndex;
    this.updatePlayer();
  };

  Game.prototype.foldComputer = function(){
    this.currentPlayer.fold = true;
    var indexToRemove = this.currentHand.indexOf(this.currentPlayer);
    this.currentHand.splice(indexToRemove,1);
    console.log("Computer folds");
  };

  Game.prototype.checkComputer = function(){
      console.log("checked");
  };

  Game.prototype.calculateRaise = function(playerIndex){
    // Return the raise
    // Check the boundries

    var returnValue = 20;
    if(this.players[playerIndex].chips < returnValue){
      returnValue = this.players[playerIndex].chips;
      this.players[playerIndex].allIn = true;
    }

    return returnValue;
  };
  /////////////////////////// CONSTRUCTOR FOR PLAYERS /////////////////

  function Player(){
    // Array with 2 cards
    this.cards = [];
    // Each player starts with 500 chips
    this.chips = 500;
    this.isBluffer = this.willBluff();
    this.allIn = false;
    this.fold = false;

    this.bet = 0;
    this.isUser = false;
    this.isComputer = true;

    this.labelChips = $(".stack");

    this.points = 0;

    this.finalHand = undefined;

    this.myHandIfTie = [];


  }
  ////////////////////////// PROTOTYPES ////////////////////////////

  Player.prototype.willBluff = function(){
    if(Math.random() < 0.75 ) { return false;  }
    return true;
  };


  ////////////////////////// CONSTRUCTOR FOR USER /////////////////
  function User(){
    // Array with 2 cards
    this.cards = [];
    // Each player starts with 500 chips
    this.chips = 500;
    this.allIn = false;
    this.bet = 0;
    this.fold = false;
    this.isUser = true;
    this.isComputer = false;

    this.points = 0;
    this.labelChips = $(".stack");
    this.finalHand = undefined;

    this.myHandIfTie = [];


  }
  ////////////////////////// PROTOTYPES ////////////////////////////


  ////////////////////////////// INITIALIZE GAME ////////////////////
  game = new Game();
  game.play();
  });
