/*Things to fix:
    repeated alert
    maybe show incorrect guesses left on html pg
    maybe try multiwords movie titles
    replay option
*/

var movies = ["MULAN", "ALADDIN", "HERCULES", "CINDERELLA", "POCAHONTAS", "PINOCCHIO", "TARZAN", "BAMBI", "TANGLED", "FROZEN", "BOLT", "ONWARD",
              "COCO", "BRAVE", "UP", "DINOSAUR", "DUMBO", "ENCHANTED", "HOLES", "FANTASIA", "ANNIE", "MALEFICENT", "MOANA", "RATATOUILLE", "CARS"];
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
var images = ["https://drive.google.com/uc?export=view&id=1H1HWr5tPybT0dWvVPsDAqMx02t04cX-p",
            "https://drive.google.com/uc?export=view&id=1d4XbkdICo4_xFIOicLVqiyF2GIiDOgqv",
            "https://drive.google.com/uc?export=view&id=1FWS1RuJpTJsr_7qtcivH0OY2uxWiTwhr",
            "https://drive.google.com/uc?export=view&id=1SSnYyh0FEvs4n6zNTcBJK1VSnHn-Jqk-",
            "https://drive.google.com/uc?export=view&id=15T-UetlsKrqF4vUrtEyKrc1D9d9wu7zZ",
            "https://drive.google.com/uc?export=view&id=13wIufN9PKrs3BMzRH6RdaKyUUR9cHa9T" ]

function guessedLetter(){
    //had to be inside
    var letter = document.getElementById("letter").value.toUpperCase();
    var isCorrect = false;

    if(remainingLetters > 0){
    
    for(var j = 0; j < title.length; j++){
        if(letter != titleArray[j]){
            if(title[j] === letter){
                titleArray[j] = letter;
                remainingLetters--;
                isCorrect = true;
            }
        }else{
            alert("You guessed '" + letter + "' already.");
            isCorrect = true;
        }
    }

    function isRepeat(){
        if(guessed.length >= 1){ 
            for(i = 0; i < guessed.length; i++){ 
                if(letter == guessed[i]){ 
                    return true;
                }
            }
        }
        return false;
    }
        
    if(!isCorrect && guessesLeft != 0){
        if(!isRepeat()){
            guessed.push(document.getElementById("letter").value.toUpperCase());
            wrong.innerHTML = "";
            wrong.innerHTML = "Wrong guesses: " + guessed.join(", ");
            document.getElementById("hangman").src = images[guessesLeft - 1];
            guessesLeft--;
            alert("Not a letter in the movie title. You have " + guessesLeft + " incorrect guesses left.");
        }else{
            alert("You guessed '" + letter + "' already.");
        }
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
