$(document).ready(function () {
    const Deck = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13];
    var SDeck = [];
    var Grid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var CurrentCard = 0;
    var Spaces = 25;
    var Score = 0;
    function Shuffle(){
        let tempDeck = Deck;
        for(let i = 0; i < 52; i++){
            let x = Math.floor(Math.random() * tempDeck.length);
            SDeck[i] = tempDeck[x];
            tempDeck.splice(x, 1);
        }
    }
    Shuffle();
    function Draw(){
        CurrentCard = SDeck[0];
        SDeck.splice(0, 1);
        $("#current").html(`Current card: ${CurrentCard}`);
        $("#deck").html(`Cards remaining: ${Spaces - 1}`);
        $("#draw").attr("disabled", "true");
    }
    function Points(){
        let CurrentScore = 0;
        for(let i = 0; i < 5; i++){
            let Row = [Grid[i * 5 + 0],Grid[i * 5 + 1],Grid[i * 5 + 2],Grid[i * 5 + 3],Grid[i * 5 + 4]];
            CurrentScore = GetHand(Row);
            $(`#row-${i + 1}`).text(CurrentScore);
            Score += CurrentScore;
        }
        for(let i = 0; i < 5; i++){
            let Col = [Grid[i],Grid[5 + i],Grid[10 + i],Grid[15 + i],Grid[20 + i]];
            CurrentScore = GetHand(Col);
            $(`#col-${i + 1}`).text(CurrentScore);
            Score += CurrentScore;
        }
        let DiaRight = [Grid[4],Grid[8],Grid[12],Grid[16],Grid[20]];
        console.log(DiaRight);
        CurrentScore = GetHand(DiaRight) * 2;
        Score += CurrentScore;
        $("#dia-r").text(CurrentScore);
        let DiaLeft = [Grid[0],Grid[6],Grid[12],Grid[18],Grid[24]];
        CurrentScore = GetHand(DiaLeft) * 2;
        Score += CurrentScore;
        $("#dia-l").text(CurrentScore);
        $("#score").html(`Score: ${Score}`);
    }
    function GetHand(temp){
        temp.sort(function(a, b){ return a - b; });
        if(temp[0] == temp[1] || temp[1] == temp[2] || temp[2] == temp[3] || temp[3] == temp[4]){
            Points = 1;
            if(temp[0] == temp[2] || temp[1] == temp[3] || temp[2] == temp[4]){
                Points = 6;
                if(temp[0] == temp[3] || temp[1] == temp[4]){
                    Points = 16;
                    if(temp[1] == 1){
                        Points = 20;
                    }
                }
                else if((temp[0] == temp[2] && temp[3] == temp[4]) || (temp[0] == temp[1] && temp[2] == temp[4])){
                    Points = 10;
                }
            }
            else if((temp[0] == temp[1] && (temp[2] == temp[3] || temp[3] == temp[4])) || (temp[1] == temp[2] && temp[3] == temp[4])){
                Points = 3;
            }
        }
        else if(temp[0] + 1 == temp[1] && temp[1] + 1 == temp[2] && temp[2] + 1 == temp[3] && temp[3] + 1 == temp[4]){
            Points = 5;
        }
        else if(temp[0] == 1 && temp[1] == 10 && temp[2] == 11 && temp[3] == 12 && temp[4] == 13){
            Points = 8;
        }
        else{
            Points = 0;
        }
        return Points;
    }
    $("#draw").click(function (e) { 
        e.preventDefault();
        Draw();
        $(".space").addClass("clickable");
    });
    $(".clickable").click(function (e) { 
        e.preventDefault();
        let id = `#${this.id}`;
        if($(id).hasClass("clickable") && CurrentCard != 0){
            $(".space").removeClass("clickable");
            Spaces--;
            $(id).text(CurrentCard);
            $(id).removeClass("space");
            Grid.splice(this.id - 1, 1, CurrentCard);
            if(Spaces == 0){
                Points();
                setTimeout(function(){
                    if(confirm(`Your score is ${Score}. Another round?`)){
                        location.reload();
                    }
                }, 2000);
            }
            else{
                $("#draw").removeAttr("disabled");
            }
        }
    });
});