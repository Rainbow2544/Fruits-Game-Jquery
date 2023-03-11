var playing = false;
var fruits = ['apple', 'banana', 'cherries', 'stawberry', 'orange'];
var score;
var trialsLeft;
var step;
var action; //used for setInterval

$(function(){
//click on start reset button
$("#startreset").click(function(){
        //we are playing
        if(playing == true){

        //reload page
        location.reload();
    }else{
            //change mode to playing
        playing = true;

        //play bg music
        $('#bgmusic')[0].play();

        score = 0;
        $("#scorevalue").html(score);

        //show trials left
        trialsLeft = 3;
        $("#trialsLeft").show();
        addHearts();

        //hide game over box
        $("#gameOver").hide();

        //change button to reset
        $("#startreset").html("reset Game");

        //start sending fruits
        startAction();
    }
});


//slice a fruit
$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); //update score
//    document.getElementById("slicesound").play();
    $("#slicesound")[0].play();//play sound
    
    //stop fruit
    clearInterval(action);
    
    //hide fruit
    $("#fruit1").hide("explode", 500); //slice fruit
    
    //send new fruit
    setTimeout(startAction, 800);
});
 



function addHearts(){
    $("#trialsLeft").empty();
    for(i = 0; i < trialsLeft; i++){
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

function startAction(){
    //generate a fruit
    $("#fruit1").show();
    //choose a random fruit
    chooseFruit(); 
    $("#fruit1").css({"left":Math.floor(450*Math.random()), "top": -70});
    //generate a random step
    step = Math.floor(5*Math.random()+1);// change step

    // Move fruit down by one step every 10ms
    action = setInterval(function(){
        //move fruit by one step
        $("#fruit1").css("top",$("#fruit1").position().top + step);

        //check if the fruit is too low
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
            
            if(trialsLeft > 1){
                
                $("#fruit1").show();
                chooseFruit(); 
                $("#fruit1").css({"left":Math.floor(450*Math.random()), "top": -70});
                step = Math.floor(5*Math.random()+1);
                trialsLeft--;
                addHearts();

            } else{//if no lives left
                playing = false;
                $("#startreset").html("Start Game");
                $("#gameOver").show();
                $("#gameOver").html(`<p>Game Over!</p><p>Your score is:${score}</p>`);
                $("#trialsLeft").hide();
                stopAction();
            }
        }
    },10);
}

// generate a random fruit
function chooseFruit(){
    var index =Math.floor(fruits.length*Math.random() );
    $("#fruit1").attr("src", "images/"+fruits[index]+".png");
}

//Stop dropping fruits

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();

}





});

