$(document).ready(function () {
    const Deck = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13];
    var SDeck = [];
    function Shuffle(){
        let tempDeck = Deck;
        for(let i = 0; i < 52; i++){
            let x = Math.floor(Math.random() * tempDeck.length);
            SDeck[i] = tempDeck[x];
            tempDeck.splice(x, 1);
        }
        console.log(SDeck);
    }
    $("#test").click(function (e) { 
        e.preventDefault();
        Shuffle();
    });
});