/*
 * A list that holds all of cards
 */

const cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

// shuffle the cards
array = shuffle(cards);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Our variables are (restart button , the stars , timer , moves counter , the cards container , and the popup)
 */

const restart = document.querySelector(".restart");
const cardStock = document.querySelector(".deck");
const moveStock = document.querySelector(".moves");
const timeStock = document.querySelector(".timer");
const starStock = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
const modal = document.getElementById("popup1")

/*
 * start up values
 */
let startGame = true;
let theOpened = [];
let theMatched = [];
let countDown,
    seconds = 0;
minute = 0;
let moves = 0;
moveStock.innerHTML = 0;
starStock.innerHTML = star + star + star;

/*
 * Create a list in the bord
 */
function basis() {
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = "<i class = '" + cards[i] + "' </i>";
        cardStock.appendChild(card);

        click(card);
    }
}

/*
 *To click the cards
 */
function click(card) {

    card.addEventListener("click", function() {

        //The first click
        if (startGame) {
            startCountDown();
            startGame = false;
        }

        const actualCards = this;
        const pastCards = theOpened[0];
        // Tow opened card = 1 move
        if (theOpened.length === 1) {

            card.classList.add("open", "show", "hide");
            theOpened.push(this);

            comparing(actualCards, pastCards);

        } else {
            actualCards.classList.add("open", "show", "hide");
            theOpened.push(this);
        }

    });
}

/*
 * comaring between the actual card and the past card and when they are matched add a ("match") to both of them
 * when not hide them again
 */
function comparing(actualCards, pastCards) {

    if (actualCards.innerHTML === pastCards.innerHTML) {

        actualCards.classList.add("match");
        pastCards.classList.add("match");

        theMatched.push(actualCards, pastCards);

        theOpened = [];

        finish();

    } else {

        setTimeout(function() {
            actualCards.classList.remove("open", "show", "hide");
            pastCards.classList.remove("open", "show", "hide");

        }, 500);

        theOpened = [];

    }

    theMoves();
}

/*
 * Adding evry move 
 */
function theMoves() {
    moves++;
    moveStock.innerHTML = moves;

    rating();
}

/*
 * How many stars must be depends on moves number
 */
function rating() {

    if (moves < 10) {
        starStock.innerHTML = star + star + star;
    } else if (moves < 15) {
        starStock.innerHTML = star + star;
    } else if (moves < 20) {
        starStock.innerHTML = star;
    } else {
        starStock.innerHTML = "";
    }
}

/* 
 * Start our time counting and stop it
 */

function startCountDown() {
    countDown = setInterval(function() {
        timeStock.innerHTML = minute + ":" + seconds + "";
        seconds++;
        if (seconds == 60) {
            minute++;
            seconds = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);

}

function stopCountDown() {
    clearInterval(countDown);
}

/* 
 * Our restart button 
 */
restart.addEventListener("click", function() {
    cardStock.innerHTML = "";
    basis();

    restartGame();

});

/*
 * Restart the game and all values in it
 */
function restartGame() {
    theMatched = [];

    moves = 0;
    moveStock.innerHTML = moves;

    starStock.innerHTML = star + star + star;
    cardStock.innerHTML = "";
    basis();

    stopCountDown();
    startGame = true;
    seconds = 0;
    minute = 0;
    timeStock.innerHTML = minute + ":" + seconds + "";
}

/*
 * Ending the game and to make a modal
 */
function finish() {
    if (theMatched.length === cards.length) {
        finalTime = timeStock.innerHTML;
        finalRating = starStock.innerHTML;
        modal.classList.add("show");
        stopCountDown();
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = finalRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        closeModal();

    }
}

/*
 * Close the modal 
 */
function closeModal() {
    closeicon.addEventListener("click", function(e) {
        modal.classList.remove("show");
        startGame();
    });
}

/*
 * Play again button
 */
function playAgain() {
    modal.classList.remove("show");
    restartGame();
}

basis();