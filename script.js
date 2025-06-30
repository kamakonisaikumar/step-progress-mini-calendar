const nextEl = document.getElementById("next");
const prevEl = document.getElementById("prev");

const progressEl =  document.querySelector(".progress-bar-front");
const stepEl = document.querySelectorAll(".step");

const monthNameEl = document.getElementById("month-name");
const dayNameEl = document.getElementById("day-name");
const dayNumberEl = document.getElementById("day-number");
const yearEl = document.getElementById("year");


let currentChecked = 1;

const date = new Date();
const month = date.getMonth();

monthNameEl.innerText = date.toLocaleString("en",{
  month:"long",
});

dayNameEl.innerText = date.toLocaleDateString("en",{
  weekday:"long",
});

dayNumberEl.innerText = date.getDate();
yearEl.innerText = date.getFullYear();

nextEl.addEventListener("click",() => {
   currentChecked++;
   if(currentChecked > stepEl.length){
     currentChecked = stepEl.length;
   }
   updateStepProgress();
});

function updateStepProgress(){
  stepEl.forEach((stepEl,idx) => {
    if(idx < currentChecked){
      stepEl.classList.add("checked");
      stepEl.innerHTML  = `
      <i class="fas fa-check"></i>
      <small>${
        idx === 0 ? "Start" : idx === stepEl.length-1 ? "Final" : "Step"+idx
      }</small>
      `;
    }else{
      stepEl.classList.remove("checked");
      stepEl.innerHTML = `
       <i class="fas fa-times"></i>
      `;
    }
  });

  const checkedNumber =  document.querySelectorAll(".checked");
   progressEl.style.width = ((checkedNumber.length -1 ) / (stepEl.length -1 ) * 100 + "%");
   if(currentChecked === 1){
    prevEl.disabled = true;
   }else if(currentChecked === stepEl.length){
    nextEl.disabled = true;
   }else{
    prevEl.disabled = false;
    nextEl.disabled = false;
   }
}

prevEl.addEventListener("click", () => {
    currentChecked--;
    if(currentChecked < 1){
      currentChecked = 1
    }
    updateStepProgress();
});

