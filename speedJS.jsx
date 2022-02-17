
function faceUp(props){
    return(
        <div className="card">
        {props.value}
        </div>
    );
}

function faceDown(props){
    return(
        <div className="card" value={props.value}>
            <img src="faceDown.png" alt={props.code}/>
        </div>
    );
}
function battleField(props){
    return(
        <div className="card" value={props.value}>
            <img src={props.url} alt={props.code}/>
        </div>
    );
}

class Board extends React.Component{
    renderCHand(i){
        return(
        <faceDown
        value ={this.props.compHand[i]}
        onClick={()=> this.props.onClick(i)}
        />
        );
    }
    renderPHand(i){
        return(
        <faceUp
        value ={this.props.playerHand[i]}
        onClick={()=> this.props.onClick(i)}
        />
        );
    }
    renderField(i){
        return(
        <faceUp
        value ={this.props.Field[i]}
        onClick={()=> this.props.onClick(i)}
        />
        );
    }
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
                <div className = "Deck" id="fieldDeck1"></div>
                <div className = "Deck" id="fieldDeck2"></div>
            </div>  
            {this.renderField(0)}
            {this.renderField(1)}
        </div> 
        <div className="Player">
        <div className = "Deck" id="CDeckHand"></div>
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
       
        this.state={
            playerHand : [],
            CompHand : [],
            field : [],
        };
    }
    
    render(){
        return(
            <div className="game">
            <div className="game-board">
             <Board 
            squares ={current.squares}
            onClick={(i) => this.handleClick(i)}
            />
            </div>
            <div className="game-info">
            <ol>{moves}</ol>
        </div>
      </div>
        );
    }
}
function setUpMatch(){
    //deck ID
    $.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", function(results){
        const deckId= results.deck_id;
   });
   //player hand
    $.get("https://deckofcardsapi.com/api/deck/"+deckId+"/pile/playerHand/add/?count=5", function(results){
        const playerHand =  JSON.parse(results);      
    });   
    //player hand deck
    $.get("https://deckofcardsapi.com/api/deck/"+deckId+"/pile/playerHandDeck/add/?count=15", function(results){
        console.log(results);      
    }); 
    //player draw deck
    $.get("https://deckofcardsapi.com/api/deck/"+deckId+"/pile/playerDrawDeck/add/?count=5", function(results){
       console.log(results)     
    }); 
    //computer hand
    $.get("https://deckofcardsapi.com/api/deck/"+deckId+"/pile/computerHand/add/?count=5", function(results){
       const compHand = JSON.parse(results);
    }); 
    //computer hand deck
    $.get("https://deckofcardsapi.com/api/deck/"+deckId+"/pile/computerHandDraw/add/?count=15", function(results){
        const compHand = JSON.parse(results);
     }); 
    //computer draw deck
    $.get("https://deckofcardsapi.com/api/deck/"+deckId+"/pile/computerDrawDeck/add/?count=5", function(results){
        console.log(results);
     }); 
    //battle field
    $.get("https://deckofcardsapi.com/api/deck/"+deckId+"/pile/battleField/add/?count=2", function(results){
        const field = JSON.parse(results);
     }); 
    }

$(document).ready(function(){
    setUpMatch();
    
});
