const button = document.querySelector("#button");
const text = document.querySelector("#title");
const popup = document.querySelector("#popup");
const stopBtn = document.querySelector("#stop");
const continueBtn = document.querySelector("#continue");
const jet = document.querySelector("#jet");
const container = document.querySelector("#right");
let paused = false;
let reset = false;
/* 
const crash = document.createElement("img");
crash.setAttribute("src", "/images/boom.png");
crash.setAttribute("id", "boom");
 */
const nervous = document.createElement("img");
nervous.setAttribute("src", "/images/nervous.png");
nervous.setAttribute("id", "nervous");

const wait = document.createElement("img");
wait.setAttribute("src", "/images/cant-wait.png");
wait.setAttribute("id", "wait");

text.innerHTML = "JS Rocket Launch!";
button.innerHTML = "launch!";
button.classList.add("btn", "btn--launch", "btn--block");

button.addEventListener("click", () => {
  /* button cancel clicked */
  if (button.textContent == "cancel") {
    cancelClicked();
    console.log("cancel", jet);
  } else if (button.textContent == "launch!") {
    /* button launch clicked */
    reset = false;
    paused = false;
    button.classList.replace("btn--launch", "btn--cancel");
    button.textContent = "cancel";
    let counter = 11;
    const prom = new Promise((resolve) => {
      let interval = setInterval(() => {
        jet.setAttribute("src", "/images/rocket-state2.gif");

        if (reset) {
          clearInterval(interval);
        }
        //resolve(counter);
        else {
          if (!paused) {
            counter--;
          }
          text.innerHTML = counter;
        }
        if (counter == 7) {
          container.append(nervous);
        }
        if (counter == 5) {
          nervous.remove();

          container.append(wait);
        }
        if (counter == 2) wait.remove();
        if (counter == 0) {
          clearInterval(interval);
          jet.setAttribute("src", "/images/rocket-state3.gif");
          jet.classList.add("jet--moving");
          resolve();
        }
      }, 300);
    });
    prom.then(() => {
      text.innerHTML = "Lift Off";
      button.style.display = "none";

      jet.style.animationFillMode = "forwards";
      if (Math.floor(Math.random() * 2)) {
        jet.addEventListener("animationend", () => {
          button.style.display = "block";
          button.innerHTML = "do it again!";
          text.innerHTML = "Well done!";
        });
      } else {
        jet.addEventListener("animationend", () => {
          jet.classList.remove("jet--moving");
          jet.setAttribute("src", "/images/boom.png");
          button.style.display = "block";
          button.innerHTML = "do it again!";
          jet.classList.add("boom--moving");
          text.innerHTML = "Oh No!!!!";
        });

        //container.append(crash);
      }
      //////
      /*    jet.addEventListener("animationend", () => {
        console.log("animatined");
        button.style.display = "block";
        button.innerHTML = "do it again!";

        if (Math.floor(Math.random() * 2)) {
          console.log("well");
          text.innerHTML = "Well done!";
        } else {
          console.log("boom");
          text.innerHTML = "Oh No!!!!";
          jet.classList.remove("jet--moving");
          jet.setAttribute("src", "/images/boom.png");

          jet.classList.add("boom--moving");

          //container.append(crash);
        }
      }); */
      //button.classList.replace("btn--cancel", "btn--launch");
    });
  } else {
    /* button try again clicked */
    //crash.remove();
    jet.classList.remove("jet--moving");
    jet.classList.remove("boom--moving");
    jet.setAttribute("src", "/images/rocket-state1.png");

    text.innerHTML = "JS Rocket Launch!";
    button.innerHTML = "launch!";
    button.classList.replace("btn--cancel", "btn--launch");
  }
});

function cancelClicked() {
  popup.style.display = "block";
  paused = true;

  stopBtn.addEventListener("click", () => {
    resetClicked();
  });

  continueBtn.addEventListener("click", () => {
    popup.style.display = "none";
    paused = false;
  });
}

function resetClicked() {
  nervous.remove();
  wait.remove();
  reset = true;
  popup.style.display = "none";
  text.innerHTML = "JS Rocket Launch!";
  button.innerHTML = "launch!";
  button.classList.replace("btn--cancel", "btn--launch");
  jet.setAttribute("src", "/images/rocket-state1.png");
}

// hIuQRKw
