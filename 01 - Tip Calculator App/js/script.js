const billBox = document.querySelector("#bill");
const tipBox = document.querySelectorAll(".stip");
const custom = document.querySelector("#custom");
const nPeople = document.querySelector("#npeople");
const tipAmount = document.querySelector("#tip");
const tipTotal = document.querySelector("#total");
const btn = document.querySelector("#btn");
const error = document.querySelector(".error");

class App {
  #bill;
  #tip;
  #n;

  constructor() {
    billBox.addEventListener("input", e => {
      this.#bill = parseFloat(e.target.value);
      this.hesap();
    });

    tipBox.forEach(btn => {
      btn.addEventListener("click", this.handleClick.bind(this));
    });

    nPeople.addEventListener("input", this.checkPeople.bind(this));

    custom.addEventListener("input", e => {
      this.#tip = +e.target.value;
      this.hesap();
    });

    btn.addEventListener("click", this.resetBtn);
  }

  checkPeople(e) {
    if (+e.target.value <= 0) {
      error.style.display = "block";
      e.target.classList.remove("success");
      e.target.classList.add("invalid");
    } else {
      error.style.display = "none";
      e.target.classList.remove("invalid");
      e.target.classList.add("success");
      this.#n = +e.target.value;
      this.hesap();
    }
  }

  // Reset btn eventi. veri girisi oldugunda btn backgroundu degistir.
  resetBtn(e) {
    if (e.key === "Enter") return;
    billBox.value = "";
    nPeople.value = "";
    tipAmount.textContent = "$0.00";
    tipTotal.textContent = "$0.00";
    error.textContent = "";
  }

  handleClick(e) {
    tipBox.forEach(btn => {
      btn.classList.remove("selected");

      if (e.target.value === btn.value) {
        btn.classList.add("selected");
        this.#tip = +btn.dataset.tip / 100;

        this.hesap();
      }
    });
  }

  hesap() {
    const amount = (this.#bill * this.#tip) / this.#n;
    const total = (this.#bill + amount) / this.#n;

    tipAmount.textContent = `$${amount.toFixed(2)}`;
    tipTotal.textContent = `$${total.toFixed(2)}`;
  }
}

const app = new App();
