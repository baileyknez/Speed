import GameMatch from "./speedSetUp.js"

const game =GameMatch();
console.log(game);
let selectedId;
let dropTargetId;

function Card(props){
    var image;
    if(props.name=="Computer"){
    image = <img className="card" src="backOfCard.png" alt={props.card.value}/>
    }else{
    image= <img className="card" src={props.card.URL} alt={props.card.value}/>
    }
    return(
    <div draggable={props.drag} className= {props.name} id={props.card.code} value={props.card.value} >
       {image}
    </div>
    
    );
}
function checkForMatch(selectedID, dropTargetId){
    var value=selectedID;
    var drop=dropTargetId;
    console.log()
    if(value == 'JACK'){
        value=11;
    }else if(value== 'QUEEN'){
        value=12;
    }else if(value== 'KING'){
        value=13;
    } else if(value=='ACE'){
        value="ACE";
    }else{
         value=parseInt(selectedID);
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
     drop=parseInt(dropTargetId);
    }
    var higher = drop+1;
    var lower =drop-1;
    if(value=="ACE" && drop==2 || drop==13){
        console.log("ace"+value +""+ drop)
        return true;
    }else if(drop=="ACE" && value==2 || value==13){
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
 
class Board extends React.Component{
    renderField(i){
        if(i<this.props.field.length){
        return(
            <Card 
            name="Field"
            drag="false"
            card={this.props.field[i]}
            />
        );  
        }
    }
    renderPlayer(i){
        if(i<this.props.playerHand.length){
            return(
                <Card 
                name="Player"
                drag="true"
                card={this.props.playerHand[i]}
                />
            );
            }   
    }
    renderComputer(i){
        if(i<this.props.computerHand.length){
            return(
                <Card 
                name="Computer"
                drag="false"
                card={this.props.computerHand[i]}
                />
            );  
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
           {this.renderField(0)}
           {this.renderField(1)}
           <div className="containerField">
           <div className="computerOut"></div>
           <div className="playerOut"></div>
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
         computerOut:game.computerOut,
        };
    }
    AddEventListeners() {
        console.log("mount")
       for(var i=0;i<this.state.playerHand.length;i++){
        var x =document.getElementById(this.state.playerHand[i].code)
        x.addEventListener('dragstart', this.dragStart);
        x.addEventListener('dragover', this.dragOver);
       }
       for(var i=0;i<this.state.field.length;i++){
        var x =document.getElementById(this.state.field[i].code)
        x.addEventListener('drop', this.dragDrop);
        x.addEventListener('dragover', this.dragOver);
       }
    }
    componentDidMount(){
        this.AddEventListeners();
    }
    //drag and drop functionalit
     dragStart(){
        selectedId=document.getElementById(this.id).getAttribute('value');
        console.log(selectedId);
    }
    dragOver(ev) {
        ev.preventDefault();
    }
    
    dragDrop(){
        dropTargetId=document.getElementById(this.id).getAttribute('value');
        console.log(dropTargetId);
       if(checkForMatch(selectedId,dropTargetId)){
        console.log("match");
        self.playerHandMatch(selectedId,dropTargetId);
       }else{
           console.log("not a match")
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
   playerHandMatch =(selectedID,dropTargetId) =>{
    
    const newField=this.state.field;
    const newPlayerHand=this.state.playerHand;
    const newDeck=this.state.playerDeck;
    var transfer;
    for(var i=0; i<newPlayerHand.length;i++){
        if(newPlayerHand[i].value== selectedID ){
            transfer= newPlayerHand[i].pop();
        }
    }
       for(var i=0; i<newfield.length;i++){
           if(newField[i].Card.value ==dropTargetId){
              newField[i]=transfer;
           }
       }
       newPlayerHand.push(newDeck.pop());
    this.setState({
        playerHand:newPlayerHand.slice(),
        playerDeck:newDeck.slice(),
        field:newField.slice()
    })
   }
    //render Board
    render(){
        return(
        <div className="board">
          <Board 
              playerHand={this.state.playerHand}
              field={this.state.field}
              computerHand={this.state.computerHand}
          />
        </div>
        );
    }
    
}

    ReactDOM.render(
        <Game />,
        document.getElementById('root'),
    ); 

