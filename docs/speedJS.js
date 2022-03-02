
import GameMatch from "./speedSetUp.js"

const game =GameMatch();
let selectedId;
let dropTargetId;
let selectedValue;
let dropTargetValue;
let interval;
function PlayerCard(props){
    var image= <img className="card" src={props.card.URL} alt={props.card.value}/>
    
    return(
    <div draggable={props.drag} className= {props.name} id={props.card.code} value={props.card.value} onDragStart={props.dragStart} onDragOver={props.dragOver} onTouchStart={props.dragStart}   >
       {image}
    </div>
    
    );
}
function FieldCard(props){
    var image= <img className="card" src={props.card.URL} alt={props.card.value}/>
    return(
    <div draggable={props.drag} className= {props.name} id={props.card.code} value={props.card.value} onDrop={props.dragDrop} onDragOver={props.dragOver} onTouchStart={props.dragDrop}>
       {image}
    </div>
    
    );
}
function Card(props){
    var image= <img className="card" src="backOfCard.png" alt={props.card.value}/>
    return(
    <div draggable={props.drag} className= {props.name} id={props.card.code} value={props.card.value}>
       {image}
    </div>
    
    );
}

function Blank(props){
    return(
            <img className="card" src="backOfCard.png" alt={props.Name}/>
    )
}


function checkForMatch(selectedValue, dropTargetValue){
    var value=selectedValue;
    var drop=dropTargetValue;

    if(value == 'JACK'){
        value=11;
    }else if(value== 'QUEEN'){
        value=12;
    }else if(value== 'KING'){
        value=13;
    } else if(value=='ACE'){
        value="ACE";
    }else{
         value=parseInt(selectedValue);
    }
    if( drop== 'JACK'){
        drop=11;
    }else if(drop == 'QUEEN'){
        drop=12;
    }else if(drop== 'KING'){
        drop=13;
    } else if(drop=='ACE'){
        drop="ACE";
    }else{
     drop=parseInt(dropTargetValue);
    }
    var higher = drop+1;
    var lower =drop-1;
    if(value=="ACE" && (drop==2 || drop==13)){
        console.log("ace"+value +""+ drop)
        return true;
    }else if(drop=="ACE" && (value==2 || value==13)){
        console.log("ace"+value +""+ drop)
        return true;
    }else if(value == higher){
        console.log("higher "+value +" "+ higher)
        return true;
    }else if(value == lower){
        console.log("lower "+value +" "+ lower)
        return true;
    }else{
        return false;
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
class Board extends React.Component{
    renderField(i){
        if(i<this.props.field.length){
            var v =this.props.field[i];
        return(
            <FieldCard 
            name="Field"
            drag="false"
            card={this.props.field[i]}
            dragOver={(ev) =>this.props.dragOver(ev)}
            dragDrop={()=>this.props.dragDrop(v)}
            />
        );  
        }
    }
    renderPlayer(i){
        if(this.props.playerHand[i]!=undefined){
            var v =this.props.playerHand[i];
            return(
                <PlayerCard 
                name="Player"
                drag="true"
                card={this.props.playerHand[i]}
                dragStart= {() =>this.props.dragStart(v)}
                dragOver={(ev)=>this.props.dragOver(ev)}
                />
            );
            }else{
                return(null);
            }   
    }
    renderComputer(i){
        if(this.props.computerHand[i]!=undefined){
            return(
                <Card 
                name="Computer"
                drag="false"
                card={this.props.computerHand[i]}
                />
            );  
            }else{
                return(null);
            }   
    }
    renderPlayerOut(){
        if(this.props.playerOutLength > 0){
            return(
                <Blank
                    name=""
                    drag="true"
                />
            );
        }else{
           return(null);
        }   
    }
    renderComputerOut(){
        if(this.props.computerOutLength > 0){
            return(
                <Blank
                    name="ComputerOutDeck"
                />
            );  
        }else{
            return(null);
        }   
    }
    renderComputerDeck(){
        if(this.props.computerDeckLength >0){
            return(
            <Blank
            name="ComputerDeck"
            />
            );
        }
    }
    renderPlayerDeck(){
        if(this.props.playerDeckLength >0){
            return(
            <Blank
            name="playerDeck"
            />
            );
        }
    }
   
    render(){
        return(
            <div className="game">
            <div className="container">
            <div className="hand">
           {this.renderComputer(0)}
           {this.renderComputer(1)}
           {this.renderComputer(2)}
           {this.renderComputer(3)}
           {this.renderComputer(4)}
           </div>
           <div className="field">
           <div className="computerOut">
               {this.renderComputerOut()}
           </div>
           {this.renderField(0)}
           {this.renderField(1)}
           <div className="containerField">
           <div className="playerOut">
               {this.renderPlayerOut()}
           </div>
           </div>
           </div>
           <div className="hand">
           {this.renderPlayer(0)}
           {this.renderPlayer(1)}
           {this.renderPlayer(2)}
           {this.renderPlayer(3)}
           {this.renderPlayer(4)}
           </div>
           </div>
           </div>
        )
    }
}
class Game extends React.Component{
    constructor(props){
        super(props);
        this.state={
         field:game.fd,
         playerHand:game.playerHand,
         playerDeck:game.playerDeck,
         computerHand:game.computerHand,
         computerDeck:game.computerDeck,
         playerOut:game.playerOut,
         computerOut:game.computerOut
        };
        
    }
     startGame() {
        interval = setInterval(() => this.intervalComp(), getRandomInt(1000,5000));
        $(".gameStart").hide();
        $(".game").show();
      }
    
    //drag and drop functionalit
     dragStart(card){
        selectedId=card.code;
        selectedValue =card.value;
        console.log(selectedId);
    }
    dragOver(ev){
        ev.preventDefault();
    }
    dragDrop(card){
        dropTargetId=card.code;
        dropTargetValue=card.value;
        console.log(dropTargetId)
       if(checkForMatch(selectedValue,dropTargetValue)){
        console.log("match");
        this.playerHandMatch();
       }else{
           console.log("not a match")
       }
    }
   
    
    
   playerHandMatch(){
    var newField=this.state.field.slice();
    var filt=this.state.playerHand.slice();
    var newDeck=this.state.playerDeck.slice();
    var transfer;
    var newPlayerHand = filt.filter(function(x) {
        return x !== undefined;
   });
    for(var i=0; i<newPlayerHand.length;i++){
        if(newPlayerHand[i].code== selectedId ){
            transfer= newPlayerHand.splice(i,1);
        }
    }
       for(var i=0; i<newField.length;i++){
           if(newField[i].code ==dropTargetId){
              newField[i]=transfer[0];
           }
       }
       newPlayerHand.push(newDeck.pop());
       this.setState({
        playerHand:newPlayerHand.slice(),
        playerDeck:newDeck.slice(),
        field:newField.slice()
    })
   }
   playerOutMatch(){
    var newField=this.state.field;
    var newOut=this.state.playerOut.slice();
    var transfer=newOut.pop();
   
       for(var i=0; i<newField.length;i++){
           if(newField[i].code ==dropTargetId){
              newField[i]=transfer;
           }
       }
       this.setState({
        playerOut:newOut.slice(),
        field:newField.slice()
    })
    if(calculateWinner(this.state.computerHand,this.state.computerDeck,this.state.playerHand,this.state.playerDeck)){
        return;
    }
   }
   checkForValidMove(hand,field){
     var bool=false;
     var newHand= hand.filter(function(x) {
        return x !== undefined;
     });
    for(var i=0; i< newHand.length;i++){
        for (var x=0;x<field.length;x++){
            if(checkForMatch(newHand[i].value, field[x].value)==true){
                console.log("you still have a move");
                bool=true;
            }
        }
    }
    return bool;
   }
   intervalComp(){ 
    if(calculateWinner(this.state.computerHand,this.state.computerDeck,this.state.playerHand,this.state.playerDeck)){
        return;
    }
    var bool = true;
    var filt =this.state.computerHand;
    var newHand=filt.filter(function(x) {
        return x !== undefined;
   });
    for(var i=0; i< newHand.length;i++){
    for (var x=0;x<this.state.field.length;x++){
        var com =newHand[i].value;
        var han =this.state.field[x].value;
        if(checkForMatch(com, han)==true){
            bool=false;
            this.compHandMatch(newHand[i].code,this.state.field[x].code);
            break;
         }
        }
        if(bool==false){
            break;
        }
      }
      if(bool){
          this.compOut();
      }
    }
    compOut(){
        let playerOutToggle=false;
        if(this.checkForValidMove(this.state.playerHand,this.state.field)){
            playerOutToggle=false;
            }else{
            playerOutToggle=true;
            }

        if(this.state.computerOut.length>0 && this.state.playerOut.length>0 && playerOutToggle==true){

        let newField=this.state.field.slice();
        let newOut =this.state.computerOut.slice();
        let newPlayerOut=this.state.playerOut.slice();
        newField[0]=newOut.pop();
        newField[1]=newPlayerOut.pop();
        console.log('SPEED');
        this.setState({
            field:newField.slice(),
            computerOut:newOut.slice(),
            playerOut:newPlayerOut.slice()
        })
    }else{
        console.log('no more cards')
    }
    }
    compHandMatch(handID, fieldID){
        let filt=this.state.computerHand.slice();
        let newDeck=this.state.computerDeck.slice();
        let newField=this.state.field.slice();
        let temp;
        var newHand = filt.filter(function(x) {
            return x !== undefined;
       });
        for(var i=0; i<newHand.length; i++){
            if(newHand[i].code==handID){
                temp= newHand.splice(i,1);
            }
        }
        for(var i=0; i<newField.length; i++){
            if(newField[i].code==fieldID){
                newField[i]=temp[0];
            }
        }

        newHand.push(newDeck.pop());
        this.setState({
            field:newField.slice(),
            computerDeck:newDeck.slice(),
            computerHand:newHand.slice()
        })
        if(calculateWinner(this.state.computerHand,this.state.computerDeck,this.state.playerHand,this.state.playerDeck)){
            return;
        }
    }
    playAgain(){
        let again = GameMatch();
        this.setState({
        field:again.fd,
         playerHand:again.playerHand,
         playerDeck:again.playerDeck,
         computerHand:again.computerHand,
         computerDeck:again.computerDeck,
         playerOut:again.playerOut,
         computerOut:again.computerOut
        });
        $(".gameEnd").hide();
        $(".game").show();
        interval = setInterval(() => this.intervalComp(), getRandomInt(1000,5000));
    }
    //render Board
    render(){
        var winner=calculateWinner(this.state.computerHand,this.state.computerDeck,this.state.playerHand,this.state.playerDeck);
        let status;
        if(winner){
        status =winner+ " Wins";
        $('.game').hide();
        $('.gameEnd').show();
        } else{
            status="";
        }
        return(
        <div className="board">
        <div className="gameStart">
            <h1>Welcome to Speed</h1>
            <p>The Goal of the game is simple.</p>
            <ol>
                <li>Each Player gets a five card hand and a fifteen card deck</li>
                <li>When a player plays a card from their deck they will pick up a card from their deck</li>
                <li>Get rid of your cards by matching the cards in the center by either one higher or one lower</li>
                <li>Aces are equal to 1 and Ace to make a circle</li>
                <li>If there are no moves left the computer will draw two new cards</li>
                <li>Get rid of your hand and deck before the computer can</li>
            </ol>
            <div className="difficulty">
            <input type="radio" className="rate" id="Easy" name="rating" value="Easy"/>
            <label htmlFor="Easy">Easy</label>
            <input type="radio" className="rate" id="Medium" name="rating" value="Medium"/>
            <label  htmlFor="Medium">Medium</label>
            <input type="radio" className="rate" id="Hard" name="rating" value="Hard"/>
            <label  htmlFor="Hard">Hard</label>
            </div>
            <br/>
             <button onClick={()=>this.startGame()}>Start Game</button>
        </div>
          <Board 
              playerHand={this.state.playerHand}
              playerOutLength={this.state.playerOut.length}
              field={this.state.field}
              computerHand={this.state.computerHand}
              computerDeckLength={this.state.computerDeck.length}
              playerDeckLength={this.state.playerDeck.length}
              computerOutLength={this.state.computerOut.length}
              dragStart={card => this.dragStart(card)}
              dragOver={ev =>this.dragOver(ev)}
              dragDrop={card => this.dragDrop(card)}
          />
        <div className="gameEnd">
        <div className="winner"><h1>{status}</h1></div>
        <button onClick={()=>this.playAgain()}>Play Again?</button>
        </div>
        </div>
        );
    }
    
}
function calculateWinner(computerHand,computerDeck,playerHand,playerDeck){
    if((computerHand==[undefined]||computerHand[0]==undefined) && (computerDeck==[undefined]||computerDeck[0]==undefined)){
    clearInterval(interval);
    
    return "Computer";
    }
    else if((playerHand ==[undefined]||playerHand[0]==undefined) && (playerDeck==[undefined] || playerDeck[0]==undefined)){
    clearInterval(interval);
    return "Player";
    }
    else{
        return null;
    }
}
ReactDOM.render(
    <Game />,
    document.getElementById('root'),
); 
