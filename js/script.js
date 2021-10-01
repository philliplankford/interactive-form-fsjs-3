/* === ELEMENT SELECTION === */
const nameInput = document.querySelector("input[id=name]");
const emailInput = document.querySelector("input[id=email]");
const otherJob = document.querySelector("#other-job-role");
const jobSelection = document.querySelector("#title");
const colorSelection = document.querySelector("#color");
const designSelection = document.querySelector("#design");
const activityCost = document.querySelector(".activities-cost");
const paymentSelection = document.querySelector("#payment");
const form = document.querySelector("form");
const cardNumber = document.querySelector("#cc-num");
const zipCode = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");

const activityList = document.querySelector("#activities-box");
const activities = document.querySelectorAll(".activites input");
const jsPunColors = document.querySelectorAll("option[data-theme='js puns']");
const heartJsColors = document.querySelectorAll("option[data-theme='heart js']");
const checkboxes = document.querySelectorAll("#activities input[type='checkbox']");

/* === OTHER VARIABLES === */
let totalCost = 0;

/* === FUNCTIONS === */
function updateColorOptions() {
    if (designSelection.value === "js puns") {
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

/* === VALIDATION FUNCTIONS === */
function validationFail(element) {
    const parent = element.parentElement;
    parent.className += " not-valid";
    parent.classList.remove("valid");
    parent.lastElementChild.style.display = "block";
}

function validationPass(element) {
    const parent = element.parentElement;
    parent.className += " valid";
    parent.classList.remove("not-valid");
    parent.lastElementChild.style.display = "none";
}

/* === FORM CHECK FUNCTIONS === */
function checkName() {
    const valid = /^[a-z]+$/ig.test(nameInput.value);
    if (valid) {
        validationPass(nameInput);
    } else {
        validationFail(nameInput);
        if (nameInput.value === ""){
            document.querySelector("#name-hint").innerHTML = "Name field cannot be blank";
        } else {
            document.querySelector("#name-hint").innerHTML = "Name field must be letters only";
        }
    };
    return valid;
}

function checkEmail() {
    const valid = /^[^@]+@[^@.]+\.[a-z]+$/ig.test(emailInput.value);
    if (valid) {
        validationPass(emailInput);
    } else {
        validationFail(emailInput);
    };
    return valid;
}

function checkRegistration() {
    const checkedBoxes = document.querySelectorAll("#activities input[type='checkbox']:checked");
    if (checkedBoxes.length) {
        validationPass(activityList);
    } else {
        validationFail(activityList);
    };
    return checkedBoxes;
}

function checkCardNum() {
    const valid = /^[0-9]{13,16}$/g.test(cardNumber.value);
    if (valid) {
        validationPass(cardNumber);
    } else {
        validationFail(cardNumber);
    };
    return valid;
}

function checkZip() {
    const valid =  /^[0-9]{5}$/g.test(zipCode.value);
    if (valid) {
        validationPass(zipCode);
    } else {
        validationFail(zipCode);
    };
    return valid;
}

function checkCVV() {
    const valid = /^[0-9]{3}$/g.test(cvv.value);
    if (valid) {
        validationPass(cvv);
    } else {
        validationFail(cvv);
    };
    return valid;
}
// reference: https://gomakethings.com/how-to-get-all-of-an-elements-siblings-with-vanilla-js/
const getSiblings = function (element) {
    let siblings = [];
    let sibling = element.parentNode.firstChild;

    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== element) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

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

document.querySelector("#activities").addEventListener("change", (e) => {
    if (e.target.checked) {
        totalCost += parseInt(e.target.getAttribute("data-cost"));

        const otherActivities = getSiblings(e.target.parentNode);
        otherActivities.forEach(label => {
            const element = label.querySelector("input").getAttribute("data-day-and-time");
            const selected = e.target.getAttribute("data-day-and-time");
            if (element === selected) {
                label.querySelector("input").disabled = true;
            }
        });
    } else {
        totalCost -= parseInt(e.target.getAttribute("data-cost"));
        
        const otherActivities = getSiblings(e.target.parentNode);
        otherActivities.forEach(label => {
            const element = label.querySelector("input").getAttribute("data-day-and-time");
            const selected = e.target.getAttribute("data-day-and-time");
            if (element === selected) {
                label.querySelector("input").disabled = false;
            }
        });
    }
    activityCost.innerHTML = `Total: $${totalCost}`;
});

paymentSelection.addEventListener("change", hidePaymentOptions);

document.querySelector("#activities").addEventListener("focusin", (e) => { // focus doesn't bubble up focusin does
        e.target.parentElement.classList.add("focus");
});

document.querySelector("#activities").addEventListener("focusout", (e) => {
    document.querySelector(".focus").classList.remove("focus");
});

nameInput.addEventListener("keyup", checkName);

/* === SUBMISSION === */
form.addEventListener("submit", (e) => {
    if (!checkName()) {
        e.preventDefault();
      }
    if (!checkEmail()) {
        e.preventDefault();
      }
    if (!checkRegistration()) {
        e.preventDefault();
      }
    if (!checkCardNum()) {
        e.preventDefault();
      }
    if (!checkZip()) {
        e.preventDefault();
      }
    if (!checkCVV()) {
        e.preventDefault();
      }
});