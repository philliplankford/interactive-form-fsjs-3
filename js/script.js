/* === ELEMENT SELECTION === */
const nameInput = document.querySelector("input[id=name]");
const otherJob = document.querySelector("#other-job-role");
const jobSelection = document.querySelector("#title");

/* === INIT === */
nameInput.focus();
otherJob.style.display = "none";

/* === LISTENERS === */
jobSelection.addEventListener("change", (e) => {
    if (e.target.value === "other") {
        otherJob.style.display = "block";
    } else {
        otherJob.style.display = "none";
    }
})