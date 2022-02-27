
var deckID;
function getFifteen(){
    //computer deck
    var object;
    jQuery.ajax({
        url:"https://deckofcardsapi.com/api/deck/"+deckID+"/draw/?count=15",
        success:function(results){
         object= [{"code":results.cards[0].code, "value":results.cards[0].value, "URL":results.cards[0].image}, {"code":results.cards[1].code, "value":results.cards[1].value, "URL":results.cards[1].image}, {"code":results.cards[2].code, "value":results.cards[2].value, "URL":results.cards[2].image}, {"code":results.cards[3].code, "value":results.cards[3].value, "URL":results.cards[3].image}, {"code":results.cards[4].code, "value":results.cards[4].value, "URL":results.cards[4].image},
         {"code":results.cards[5].code, "value":results.cards[5].value, "URL":results.cards[5].image}, {"code":results.cards[6].code, "value":results.cards[6].value, "URL":results.cards[6].image}, {"code":results.cards[7].code, "value":results.cards[7].value, "URL":results.cards[7].image}, {"code":results.cards[8].code, "value":results.cards[8].value, "URL":results.cards[8].image}, {"code":results.cards[9].code, "value":results.cards[9].value, "URL":results.cards[9].image},
         {"code":results.cards[10].code, "value":results.cards[10].value, "URL":results.cards[10].image}, {"code":results.cards[11].code, "value":results.cards[11].value, "URL":results.cards[11].image}, {"code":results.cards[12].code, "value":results.cards[12].value, "URL":results.cards[12].image}, {"code":results.cards[13].code, "value":results.cards[13].value, "URL":results.cards[13].image}, {"code":results.cards[14].code, "value":results.cards[14].value, "URL":results.cards[14].image}]; 
         console.log(object);
        },
        async: false 
    });
    return(object);
}
   
function getFive(){
    //computer out
    var object;
    jQuery.ajax({
        url:"https://deckofcardsapi.com/api/deck/"+deckID+"/draw/?count=5",
        success:function(results){
         object=[{"code":results.cards[0].code, "value":results.cards[0].value, "URL":results.cards[0].image}, {"code":results.cards[1].code, "value":results.cards[1].value, "URL":results.cards[1].image}, {"code":results.cards[2].code, "value":results.cards[2].value, "URL":results.cards[2].image}, {"code":results.cards[3].code, "value":results.cards[3].value, "URL":results.cards[3].image}, {"code":results.cards[4].code, "value":results.cards[4].value, "URL":results.cards[0].image}];
         console.log(object);
        },
        async: false 
    });
    return(object);
}
function getTwo(){
    //field
    var object;
    jQuery.ajax({
        url:"https://deckofcardsapi.com/api/deck/"+deckID+"/draw/?count=2",
        success:function(results){
        object=[{"code":results.cards[0].code, "value":results.cards[0].value, "URL":results.cards[0].image}, {"code":results.cards[1].code, "value":results.cards[1].value, "URL":results.cards[1].image}];
         console.log(object);
        },
        async: false 
    });
    console.log(object);
    return(object);
    }
export default function GameMatch(){
    jQuery.ajax({
        url:"https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
        success:function(id){
            if (id.deck_id != undefined) {
                deckID = id.deck_id;   
            } else {
                reject("no Deck ID recieved");
            }
        },
        async: false 
    });
    const playerHand = getFive();
    const playerDeck = getFifteen();
    const playerOut = getFive();
    const computerHand =getFive();
    const computerDeck=getFifteen();
    const computerOut = getFive();
    const fd=getTwo();
    return(
        {
        "playerHand": playerHand,
        "playerDeck":playerDeck,
        "playerOut":playerOut,
        "computerHand":computerHand,
       "computerDeck":computerDeck,
        "computerOut":computerOut,
        "fd":fd,
        }
        ); 
}
