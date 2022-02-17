const deckId;

function faceUp(props){
    return(
        <div className="card" value={props.value}>
            <img src={props.url} alt={props.code}>
        </div>
    );
}

function FaceDown(props){
    return(
        <div className="card" value={props.value}>
            <img src="faceDown.png" alt={props.code}>
        </div>
    );
}
function gameSetUp(){
    $.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", function(results){
        deckId = results.deck_id;
    });
     
}
class Board extends React.Component{

    render(){
    return(
    <div className="Board">
        <div className="Computer">
        <div className = "Deck" id="CDeckHand" ></div>
        <div className ="CHand">
            {this.renderCHand(0)}
            {this.renderCHand(1)}
            {this.renderCHand(2)}
            {this.renderCHand(3)}
            {this.renderCHand(4)}
        </div>
        </div>  
        <div className="GameField">
        
            <div>
                <div className = "Deck"> </div>
                <div className = "Deck"></div>
            </div>  
        </div> 
        <div className="Player">
        <div className = "Deck" id="CDeckHand" ></div>
        <div className ="CHand">
            {this.renderPHand(0)}
            {this.renderPHand(1)}
            {this.renderPHand(2)}
            {this.renderPHand(3)}
            {this.renderPHand(4)}
        </div>
        </div>      
    </div>
    );
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state{
            
        }
    }

    render(){
        return(

        );
    }
}
$(document).ready(function(){
    deckId = getDeckID();
    ReactDOM.render(
        <Game />,
        document.getElementById('root')
      );
});