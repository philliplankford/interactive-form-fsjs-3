/* === ELEMENT SELECTION === */
const nameInput = document.querySelector("input[id=name]");
const otherJob = document.querySelector("#other-job-role");
const jobSelection = document.querySelector("#title");
const colorSelection = document.querySelector("#color");
const designSelection = document.querySelector("#design");
const activityCost = document.querySelector(".activities-cost");
const paymentSelection = document.querySelector("#payment");

const activities = document.querySelectorAll(".activites input");
const jsPunColors = document.querySelectorAll("option[data-theme='js puns']");
const heartJsColors = document.querySelectorAll("option[data-theme='heart js']");

/* === OTHER VARIABLES === */
let totalCost = 0;

/* === FUNCTIONS === */
function updateColorOptions() {
    if (designSelection.value = "js puns") {
        colorSelection.innerHTML = 
        `
        <option selected hidden>Select a design theme above</option>
        <option data-theme="js puns" value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
        <option data-theme="js puns" value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> 
        <option data-theme="js puns" value="gold">Gold (JS Puns shirt only)</option>
        `;
    } else {
        colorSelection.innerHTML = 
        `
        <option selected hidden>Select a design theme above</option>
        <option data-theme="heart js" value="tomato">Tomato (I &#9829; JS shirt only)</option>
        <option data-theme="heart js" value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> 
        <option data-theme="heart js" value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option> 
        `;
    };
}

function hidePaymentOptions() {
    document.querySelector("#credit-card").style.display = "none";
    document.querySelector("#paypal").style.display = "none";
    document.querySelector("#bitcoin").style.display = "none";
    document.querySelector(`#${paymentSelection.value}`).style.display = "block";
}

/* === INIT === */
nameInput.focus();
otherJob.style.display = "none";
colorSelection.disabled = true;
hidePaymentOptions();

/* === LISTENERS === */
jobSelection.addEventListener("change", (e) => {
    if (e.target.value === "other") {
        otherJob.style.display = "block";
    } else {
        otherJob.style.display = "none";
    }
})

designSelection.addEventListener("change", () => {
    colorSelection.disabled = false;
    updateColorOptions();
})

document.querySelector("#activities").addEventListener( "change", (e) => {
    if (e.target.checked) {
        totalCost += parseInt(e.target.getAttribute("data-cost"));
    } else {
        totalCost -= parseInt(e.target.getAttribute("data-cost"));
    }
    activityCost.innerHTML = `Total: $${totalCost}`;
});

paymentSelection.addEventListener( "change", hidePaymentOptions);