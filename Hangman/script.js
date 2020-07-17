var title;
var space = document.getElementById("space"); //where the spaces will be on html
var empty;
var titleArray;
var remainingLetters;
var wrong;
var guessed;
var guessesLeft;

//array of Disney movies
var movies = ["MULAN", "ALADDIN", "HERCULES", "CINDERELLA", "POCAHONTAS", "PINOCCHIO", "TARZAN", "BAMBI", "TANGLED", "FROZEN", "BOLT", "ONWARD",
              "COCO", "BRAVE", "DINOSAUR", "DUMBO", "ENCHANTED", "HOLES", "FANTASIA", "ANNIE", "MALEFICENT", "MOANA", "RATATOUILLE", "CARS",
              "BROTHER BEAR", "THE LITTLE MERMAID", "BEAUTY AND THE BEAST", "THE LION KING", "THE PRINCESS AND THE FROG", "THE PRINCESS DIARIES",
              "BRIDGE TO TERABITHIA", "SLEEPING BEAUTY", "FINDING NEMO", "TOY STORY", "ALICE IN WONDERLAND", "BIG HERO 6", "101 DALMATIANS"];

//play function
play = function() {
    //choose a random movie in the movies array
    title = movies[Math.floor(Math.random() * movies.length)];
    //empty array to fill with the number of characters in the movie title
    titleArray = [];
    //count spaces in title
    empty = 0;

    //fill with the number of characters in the movie title with spaces
    function blankSpace(){
        for(var i = 0; i < title.length; i++){
            if(title[i] === " "){
                titleArray[i] = "\xa0"; //add space for spaces in title
                empty++;
            }else{
                titleArray[i] = " _ "; //add underscore for letters in title
            }
        }
        space.innerHTML = titleArray.join(" ");
    }
    
    //call function
    blankSpace();
    
    //how many letters to guess
    remainingLetters = title.length - empty;
    //where the wrong guessed letters will be on html
    wrong = document.getElementById("wrong");
    //array of wrong letters to be displayed
    guessed = [];
    //number of wrong guesses left till the hangman is complete
    guessesLeft = 6;
    //for when the game resets, it does not show the previous wrong letters
    wrong.innerHTML = "Wrong guesses: " + guessed.join(", "); 
}

play(); //call function so it will load on html

//array of images to change out for the hangman
var images = ["https://drive.google.com/uc?export=view&id=1H1HWr5tPybT0dWvVPsDAqMx02t04cX-p",
            "https://drive.google.com/uc?export=view&id=1d4XbkdICo4_xFIOicLVqiyF2GIiDOgqv",
            "https://drive.google.com/uc?export=view&id=1FWS1RuJpTJsr_7qtcivH0OY2uxWiTwhr",
            "https://drive.google.com/uc?export=view&id=1SSnYyh0FEvs4n6zNTcBJK1VSnHn-Jqk-",
            "https://drive.google.com/uc?export=view&id=15T-UetlsKrqF4vUrtEyKrc1D9d9wu7zZ",
            "https://drive.google.com/uc?export=view&id=13wIufN9PKrs3BMzRH6RdaKyUUR9cHa9T" ]

//function to check and display correct or incorrect letters
function guessedLetter(){
    //has to be inside
    //getting the letter inputed by user and making it uppercase
    var letter = document.getElementById("letter").value.toUpperCase();
    //variable to check if letter is one of the letters in the movie title
    var isCorrect = false;
    //boolean for a valid input
    var isValid = true;
    //boolean to show alert only once
    var showAlert = true;
    
    //check if input is valid
    if(letter === "" || letter === " " || /[A-Z0-9]/.test(letter) === false){
        isValid = false;
        alert("Please input a letter or number");
    }
  
    //when the movie title is missing letters
    if(remainingLetters > 0 && isValid){
      
        //check that input letter matches the movie title and replace space with letter
        for(var j = 0; j < title.length; j++){
            if(letter != titleArray[j]){ //when the input letter is not equal to a letter already guessed correctly
                if(title[j] === letter){ //when the input letter is one of the title's letter(s)
                    titleArray[j] = letter; //replace space with letter
                    remainingLetters--; //less letters to guess
                    isCorrect = true; //input is correct
                }
            }else{ //letter matches but user has already guessed it
                if(showAlert === true){
                        alert("You guessed '" + letter + "' already.");
                        showAlert = false; //set to false so alert only show once, not for each of the same letter
                }
                isCorrect = true; //input is still correct
            }
        }

    //check if input letter was guessed already in the wrong letters array
    function isRepeat(){
        if(guessed.length >= 1){ 
            for(i = 0; i < guessed.length; i++){ 
                if(letter == guessed[i]){ //check if letter inputted is already in the array
                    return true;
                }
            }
        }
        return false;
    }
       
    //letter is not correct, check if it has been inputted before, if not, add to wrong guesses array
    if(!isCorrect && guessesLeft != 0){
        if(!isRepeat()){
            guessed.push(letter); //add to wrong guesses array
            wrong.innerHTML = ""; //clears wrong guesses on html so it does not keep adding on the string below
            wrong.innerHTML = "Wrong guesses: " + guessed.join(", "); //returns a string of each element in the array with the ',' and space separating them and send to html
            document.getElementById("hangman").src = images[guessesLeft - 1]; //change image of hangman to add another body part
            guessesLeft--; //number of chances left
            alert("Not a letter in the movie title. You have " + guessesLeft + " incorrect guesses left.");
        }else{
            alert("You guessed '" + letter + "' already.");
        }
    }
        //unlike the ", " the empty string will return a string of each element in the array without spaces
        space.innerHTML = titleArray.join(" ");
    }
    //reset the input value to nothing
    document.getElementById('letter').value = "";
    
    //when user used up all their wrong guesses
    if(guessesLeft == 0){
        alert("You failed! You used up all your incorrect guesses.");
        document.getElementById("guess").disabled = true; //no more inputs
        for(l of title){
            if(titleArray[title.indexOf(l)] === " _ "){ //replace remaining letters
                titleArray[title.indexOf(l)] = l; 
                space.innerHTML = titleArray.join(" "); //don't forget to actually add to html 
            }
        }
        replay();
    }

    //when user guessed the correct movie
    if(remainingLetters == 0){
        alert("Congrats! You got the movie!");
        document.getElementById("guess").disabled = true; //no more inputs
        replay();
    }
}

//replay function
function replay() {
    
    //create a play again button
    var btn = document.createElement("button"); 
        btn.id = "play"
        btn.innerHTML = "PLAY AGAIN!";
        btn.className = "button";
        placeHolder = document.getElementById("replay");
        placeHolder.appendChild(btn);

        document.getElementById("play").onclick = function() { //when replay button is clicked, reset game

            play(); //call play function to reset everything
            document.getElementById("guess").disabled = false; //enable guess button again

            playbtn = document.getElementById("play"); 
            playbtn.parentNode.removeChild(playbtn); //remove replay button
            document.getElementById("hangman").src = "https://drive.google.com/uc?export=view&id=10Bl6o1HIqGimRx7xEDRvsurH-xMYSUf4"; //reset hangman

        }

}
