import GameMatch from "./speedSetUp.js"

const game =GameMatch();
console.log(game);


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
         selectedId:0,
         dropTargetId:0
        };
    }

    //renders

   
    //drag and drop functionalit
    
    dragStart(){
        this.setState({
            selectedId:this.id
           });
        console.log(this.state.selectedId);
    }
    dragOver(ev) {
        ev.preventDefault();
    }
    calculateWinner(){
        if(this.state.computerHand.length ==0 && this.state.computerDeck.length == 0){
        return ("Computer Wins")
        }
        else if(this.state.playerHand.lenth ==0 && this.state.playerDeck.length==0){
        return("You win!");
        }
    }
    dragDrop(){
        this.setState({
            dropTargetId:this.id
           });
        console.log(this.state.dropTargetId);
    }
    checkForMatch(selectedID, dropTargetId){
        var value;
        var drop;
        if($(selectedID).value == 'JACK'){
            value=11;
        }else if($(selectedID).value == 'QUEEN'){
            value=12;
        }else if($(selectedID).value== 'KING'){
            value=13;
        } else if($(selectedID).value=='ACE'){
            value="ACE";
        }else{
            value=$(selectedID).value;
        }
        if($(dropTargetId).value == 'JACK'){
            drop=11;
        }else if($(dropTargetId).value == 'QUEEN'){
            drop=12;
        }else if($(dropTargetId).value== 'KING'){
            drop=13;
        } else if($(dropTargetId).value=='ACE'){
            drop="ACE";
        }else{
            drop=$(dropTargetId).value;
        }

    }
    AddEventListeners() {
        console.log("event")
        const draggableItems = document.querySelectorAll('.playerHand div');
        console.log(draggableItems)
        draggableItems.forEach (item => {
          item.addEventListener('dragstart', dragStart);
          item.addEventListener('dragenter', dragEnter);
          item.addEventListener('drop', dragDrop);
          item.addEventListener('dragover', dragOver);
          item.addEventListener('dragleave', dragLeave);
        });
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
        {this.AddEventListeners()}
        </div>
        );
    }
    
}

    ReactDOM.render(
        <Game />,
        document.getElementById('root')
    ); 

