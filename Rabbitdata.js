//Shared rabbit data - this should allow for the page to have the same coin count and happiness level throughout all components.
//get saved happiness
let happiness = Number(localStorage.getItem("happiness"));


//if there is no saved happiness yet, start at 40
if (isNaN(happiness)) {
    happiness = 40;
    localStorage.setItem("happiness", happiness);

}

//get saved coins
let coins = Number(localStorage.getItem("coins"));
if(isNaN(coins)){
    coins = 0;
    localStorage.setItem("coins", coins);
}

//add coins
function addCoins(amount){
    coins += amount;
    localStorage.setItem("coins", coins);
    updateCoinDisplay();
}

//update coin number on page
function updateCoinDisplay(){
    const coinCount = document.getElementById("coin-count");
    if (coinCount) {
        coinCount.textContent = "🪙 " + coins;
    }
}

//update display when page loads
updateCoinDisplay();

//rabbit name!!
//get saved rabbit name
let rabbitName = localStorage.getItem("rabbitName") || "";

//save rabbit name when the input changes
document.addEventListener("DOMContentLoaded", function(){
    const nameInput = document.getElementById("username");
    if (!nameInput) return;
    //show saved name when page loads
    nameInput.value = rabbitName;

    //save new name
    nameInput.addEventListener("input", function(){
        rabbitName = nameInput.value;
        localStorage.setItem("rabbitName", rabbitName);
    });
});

//update happiness bar and number
function updateHappiness(){
    //keep happiness between 0 and 100
    happiness = Math.max(0, Math.min(100, happiness));

    //save happiness
    localStorage.setItem("happiness", happiness)

    //find happiness bar on current pg
    const happinessBar = document.getElementById("happiness-fill");
    if (happinessBar) {
        happinessBar.style.width = happiness + "%";
    }

    //find happiness number
    const happinessNumber = document.getElementById("happiness-number");
    if (happinessNumber){
        happinessNumber.textContent = Math.round(happiness) + "%";
    }
}

//happiness decay happening over 48 hours without interaction or studying
//48 hours in milliseconds
const decayTime = 48 * 60 * 60 * 1000;

//find when happiness was last updated
let lastHappinessUpdate = Number(localStorage.getItem('lastHappinessUpdate'));

//if there was no prev. update time start timer now
if (isNaN(lastHappinessUpdate)) {
    lastHappinessUpdate = Date.now();
    localStorage.setItem('lastHappinessUpdate', lastHappinessUpdate);
}


//decrease happiness over time
function decreaseHappiness(){
    const now = Date.now();
    //how much time passed since last update
    const timePassed = now - lastHappinessUpdate;
    //how much happiness should be lost based on time

    //calculate how much happiness should remain
    const pointsLost = Math.floor((timePassed / decayTime) * 100);

    if (pointsLost > 0){
        happiness = Math.max(0, happiness - pointsLost);

        //reset the decay timer after removing the points
        lastHappinessUpdate = now;
        localStorage.setItem("happiness", happiness);
        localStorage.setItem("lastHappinessUpdate", lastHappinessUpdate);
        updateHappiness();
    }

    //stop at 0
    if (happiness <= 0){
        happiness = 0;
        localStorage.setItem("happiness", 0);
    }
}



//check for decay every minute
setInterval(decreaseHappiness, 60 * 1000);


//page load
//check decay when page opens
decreaseHappiness();

//update coin display
updateCoinDisplay();

//update happiness display
updateHappiness();


document.addEventListener("DOMContentLoaded", function () {

    //Night popup here
    const popup = document.getElementById("night-popup");
    const closeBtn = document.getElementById("close-popup");
    
    //stop if this page doesn't have the popup
    if (!popup || !closeBtn) return;

    // Get the current local hour (0 to 23)
    const currentHour = new Date().getHours();

    //Check if time is >= 9 PM (21) OR < 7Am (7)
    if (currentHour >= 21 || currentHour < 7) {
        // Delay slightly to let the browser register the 'flex' display before animating
        popup.style.display = "flex";

        setTimeout(() => {
            popup.classList.add("show");
        }, 10);
    }

    // Close button functionality
    closeBtn.addEventListener("click", function () {
        popup.classList.remove("show");
        // Wait for the fade-out animation to finish before hiding display
        setTimeout(() => {
            popup.style.display = "none";
        }, 400); }
    );
});

