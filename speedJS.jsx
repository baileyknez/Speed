import GameMatch from "./speedSetUp.js"

const game =GameMatch();
console.log(game);
let selectedId;
let dropTargetId;
let selectedValue;
let dropTargetValue;
let playerOutToggle=false;

function PlayerCard(props){
    var image= <img className="card" src={props.card.URL} alt={props.card.value}/>
    
    return(
    <div draggable={props.drag} className= {props.name} id={props.card.code} value={props.card.value} onDragStart={props.dragStart} onDragOver={props.dragOver}>
       {image}
    </div>
    
    );
}
function FieldCard(props){
    var image= <img className="card" src={props.card.URL} alt={props.card.value}/>
    return(
    <div draggable={props.drag} className= {props.name} id={props.card.code} value={props.card.value} onDrop={props.dragDrop} onDragOver={props.dragOver}>
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
function PlayerOut(props){
    var image= <img className="card" src="backOfCard.png" alt="playerOutDeck"/>
    
    return(
    <div draggable="true" className= "playerOut" onDragStart={props.dragPOStart} onDragOver={props.dragOver}>
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
        console.log(higher);
        console.log("higher "+value +" "+ higher)
        return true;
    }else if(value == lower){
        console.log(lower);
        console.log("lower "+value +" "+ lower)
        return true;
    }else{
        console.log(value +" "+ drop)
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
                <PlayerOut
                    name=""
                    drag="true"
                    dragPOStart= {(ev) =>this.props.dragPOStart(ev)}
                    dragOver={(ev)=>this.props.dragOver(ev)}
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
   
    render(){
        return(
            <div className="game">
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
    componentDidMount() {
        this.interval = setInterval(() => this.intervalComp(), getRandomInt(4000,5000));
      }
    componentWillUnmount() {
        clearInterval(this.interval);
     }
    //drag and drop functionalit
     dragStart(card){
        playerOutToggle=false;
        selectedId=card.code;
        selectedValue =card.value;
    }
    dragOver(ev){
        ev.preventDefault();
    }
    dragDrop(card){
        dropTargetId=card.code;
        dropTargetValue=card.value;
       if(playerOutToggle){
        this.playerOutMatch()
       }else{
       if(checkForMatch(selectedValue,dropTargetValue)){
        console.log("match");
        this.playerHandMatch();
       }else{
           console.log("not a match")
       }
    }
    }
    dragPOStart(ev){
        if(this.state.playerOut.length<1){
            return null;
        }
        console.log("player out")
        if(this.checkForValidMove(this.state.playerHand,this.state.field)){
        ev.preventDefault();
        playerOutToggle=false;
        }else{
        playerOutToggle=true;
        var length=this.state.playerOut.length;
        selectedId=this.state.playerOut[length-1];
        console.log(selectedId);
        }
    }
   
    calculateWinner(){
        if(this.state.computerHand.length ==0 && this.state.computerDeck.length == 0){
        return ("Computer Wins")
        }
        else if(this.state.playerHand.lenth ==0 && this.state.playerDeck.length==0){
        return("You win!");
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
    console.log(selectedId)
    console.log(dropTargetId)
       for(var i=0; i<newField.length;i++){
           if(newField[i].code ==dropTargetId){
              newField[i]=transfer;
              console.log(newField);
           }
       }
       this.setState({
        playerOut:newOut.slice(),
        field:newField.slice()
    })

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
        if(this.state.computerOut.length>0){
        let newField=this.state.field.slice();
        let newOut =this.state.computerOut.slice();
        let num = Math.round(getRandomInt(0,2));
        console.log("random "+num);
        newField[num]=newOut.pop();
        this.setState({
            field:newField.slice(),
            computerOut:newOut.slice()
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

    }
    //render Board
    render(){
        var po;
        var co;
        if(this.state.playerOut.length>=1){
            po=this.state.playerOut.length;
        }else{
            po=0;
        }
        if(this.state.computerOut.length>=1){
            co=this.state.computerOut.length
        }else{
         co=0; 
        }
        
        return(
        <div className="board">
          <Board 
              playerHand={this.state.playerHand}
              playerOutLength={po}
              field={this.state.field}
              computerHand={this.state.computerHand}
              computerOutLength={co}
              dragStart={card => this.dragStart(card)}
              dragOver={ev =>this.dragOver(ev)}
              dragDrop={card => this.dragDrop(card)}
              dragPOStart={ev => this.dragPOStart(ev)}
          />
        </div>
        );
    }
    
}

    ReactDOM.render(
        <Game />,
        document.getElementById('root'),
    ); 
