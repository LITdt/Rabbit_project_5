const rabbit = document.getElementById("rabbit");
const flowers = document.querySelector(".flowers");
const message = document.getElementById("pet-message");

//pet rabbit
let lastPet = 0;
function petRabbit() {
    //prevent happiness increasing hundreds of time per minute from rapid mouse clicks
    const now = Date.now();

    if (now - lastPet < 700) {
        return;
    }

    lastPet = now;

    //increase happiness when pet by 2
    happiness += 2;

    //keep between 0 and 100
    happiness = Math.min(100, happiness);

//save happiness.
    localStorage.setItem("happiness", happiness);

    //reset happiness decay timer so decay starts from this new happiness value
    lastHappinessUpdate = Date.now();

    localStorage.setItem('lastHappinessUpdate', lastHappinessUpdate);

    //update shared happiness display
    updateHappiness();

    //message
    if (message){
        message.textContent = "Your rabbit loves the attention! ❤️";
    }

    //jelly bounce
    rabbit.classList.remove("petted");

    //forces animation to restart
    void rabbit.offsetWidth;

    rabbit.classList.add("petted");

    //flowers
    flowers.classList.remove("show");
    void flowers.offsetWidth;
    flowers.classList.add("show");
}

//mouse dragging for petting
rabbit.addEventListener(
    "mouseenter", function(){
        petRabbit();
    }
);

//touch / click
rabbit.addEventListener(
    "click", function(){
        petRabbit();
    }
)

