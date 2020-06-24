/*Things to fix:
    repeated alert
    not have button also centered
    dont show wrong letter again
    maybe show incorrect guesses left on html pg
    prob draw your own hangman and share with google drive
    maybe try multiwords movie titles
    replay option
*/

var movies = ["MULAN", "ALADDIN", "HERCULES", "CINDERELLA", "POCAHONTAS", "PINOCCHIO", "TARZAN", "BAMBI", "TANGLED", "FROZEN"];
var title = movies[Math.floor(Math.random() * movies.length)];

var space = document.getElementById("space");
var titleArray = [];

function blankSpace(){
    for(var i = 0; i < title.length; i++){
        titleArray[i] = " _ ";
    }
    space.innerHTML = titleArray.join(" ");
}

blankSpace();

var remainingLetters = title.length;
var wrong = document.getElementById("wrong");
var guessed = [];
var guessesLeft = 6;
var images = ["https://upload.wikimedia.org/wikipedia/commons/d/d6/Hangman-6.png",
            "https://upload.wikimedia.org/wikipedia/commons/6/6b/Hangman-5.png",
            "https://upload.wikimedia.org/wikipedia/commons/2/27/Hangman-4.png",
            "https://upload.wikimedia.org/wikipedia/commons/9/97/Hangman-3.png",
            "https://upload.wikimedia.org/wikipedia/commons/7/70/Hangman-2.png",
            "https://upload.wikimedia.org/wikipedia/commons/3/30/Hangman-1.png" ]

function guessedLetter(){
    //had to be inside
    var letter = document.getElementById("letter").value.toUpperCase();

    if(remainingLetters > 0){
    
    for(var j = 0; j < title.length; j++){
        if(letter != titleArray[j]){
            if(title[j] === letter){
                titleArray[j] = letter;
                remainingLetters--;
                console.log("Correct!");
                var isCorrect = true;
            }
        }else{
            alert("You guessed '" + letter + "' already.");
            isCorrect = true;
        }
    }

        if(!isCorrect && guessesLeft != 0){
            console.log("Wrong");
            guessed.push(document.getElementById("letter").value.toUpperCase());
            wrong.innerHTML = "";
            wrong.innerHTML = "Wrong guesses: " + guessed.join(", ");
            document.getElementById("hangman").src = images[guessesLeft - 1];
            guessesLeft--;
            alert("Not a letter in the movie title. You have " + guessesLeft + " incorrect guesses left.");
        }

        space.innerHTML = titleArray.join(" ");
    }

    document.getElementById('letter').value = "";
    
    if(guessesLeft == 0){
        alert("You failed! You used up all your incorrect guesses.");
        document.getElementById("button").disabled = true;
    }

    if(remainingLetters == 0){
        alert("Congrats! You found all the words!");
        document.getElementById("button").disabled = true;
    }
}
