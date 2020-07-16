var title;
var space = document.getElementById("space");
var empty;
var titleArray;
var remainingLetters;
var wrong;
var guessed;
var guessesLeft;

var movies = ["MULAN", "ALADDIN", "HERCULES", "CINDERELLA", "POCAHONTAS", "PINOCCHIO", "TARZAN", "BAMBI", "TANGLED", "FROZEN", "BOLT", "ONWARD",
              "COCO", "BRAVE", "DINOSAUR", "DUMBO", "ENCHANTED", "HOLES", "FANTASIA", "ANNIE", "MALEFICENT", "MOANA", "RATATOUILLE", "CARS",
              "BROTHER BEAR", "THE LITTLE MERMAID", "BEAUTY AND THE BEAST", "THE LION KING", "THE PRINCESS AND THE FROG", "THE PRINCESS DIARIES",
              "BRIDGE TO TERABITHIA", "SLEEPING BEAUTY", "FINDING NEMO", "TOY STORY", "ALICE IN WONDERLAND", "BIG HERO 6", "101 DALMATIANS"];

play = function() {
    title = movies[Math.floor(Math.random() * movies.length)];

    titleArray = [];
    empty = 0;

    function blankSpace(){
        for(var i = 0; i < title.length; i++){
            if(title[i] === " "){
                titleArray[i] = "\xa0"; 
                empty++;
            }else{
                titleArray[i] = " _ "; 
            }
        }
        space.innerHTML = titleArray.join(" ");
    }

    blankSpace();

    remainingLetters = title.length - empty;
    wrong = document.getElementById("wrong");
    guessed = [];
    guessesLeft = 6;
    wrong.innerHTML = "Wrong guesses: " + guessed.join(", "); 
}

play();

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
    var isValid = true;
    var showAlert = true;
    
    if(letter === "" || letter === " " || /[A-Z0-9]/.test(letter) === false){
        isValid = false;
        alert("Please input a letter or number");
    }

    if(remainingLetters > 0 && isValid){
    
        for(var j = 0; j < title.length; j++){
            if(letter != titleArray[j]){
                if(title[j] === letter){
                    titleArray[j] = letter;
                    remainingLetters--;
                    isCorrect = true;
                }
            }else{
                if(showAlert === true){
                        alert("You guessed '" + letter + "' already.");
                        showAlert = false;
                }
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
        document.getElementById("guess").disabled = true;
        for(l of title){
            if(titleArray[title.indexOf(l)] === " _ "){
                titleArray[title.indexOf(l)] = l; 
                space.innerHTML = titleArray.join(" "); 
            }
        }
        replay();
    }

    if(remainingLetters == 0){
        alert("Congrats! You got the movie!");
        document.getElementById("guess").disabled = true;
        replay();
    }
}

function replay() {
    
    var btn = document.createElement("button"); 
        btn.id = "play"
        btn.innerHTML = "PLAY AGAIN!";
        btn.className = "button";
        placeHolder = document.getElementById("replay");
        placeHolder.appendChild(btn);

        document.getElementById("play").onclick = function() {

            play();
            document.getElementById("guess").disabled = false;

            playbtn = document.getElementById("play"); 
            playbtn.parentNode.removeChild(playbtn);
            document.getElementById("hangman").src = "https://drive.google.com/uc?export=view&id=10Bl6o1HIqGimRx7xEDRvsurH-xMYSUf4";

        }

}
