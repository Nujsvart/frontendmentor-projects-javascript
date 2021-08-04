const bill = document.querySelector("#bill");
const tipBox = document.querySelectorAll(".stip");
const custom = document.querySelector("#custom");
const nPeople = document.querySelector("#npeople");
const results = document.querySelectorAll(".values");
const btn = document.querySelector("#btn");
const error = document.querySelector(".error");

class App {
  #billValue = 0;
  #tipValue = 0;
  #peopleValue = 0;

  constructor() {
    bill.addEventListener("input", this.setBillValue.bind(this));

    tipBox.forEach(btn => {
      btn.addEventListener("click", this.handleClick.bind(this));
    });

    nPeople.addEventListener("input", this.setPeopleValue.bind(this));

    custom.addEventListener("input", this.setCustomValue.bind(this));

    btn.addEventListener("click", this.resetBtn.bind(this));
  }

  setBillValue(e) {
    this.#billValue = parseFloat(e.target.value);

    this.hesap();
  }

  handleClick(e) {
    tipBox.forEach(btn => {
      btn.classList.remove("selected");

      if (e.target.value === btn.value) {
        btn.classList.add("selected");
        this.#tipValue = parseFloat(btn.dataset.tip) / 100;
        this.hesap();
      }

      custom.value = "";
    });
  }

  setCustomValue(e) {
    this.#tipValue = parseFloat(e.target.value) / 100;
    tipBox.forEach(btn => {
      btn.classList.remove("selected");
    });

    if (e.target.value >= 1 || e.target.value === "") {
      custom.classList.remove("invalid");
      custom.classList.add("success");
    } else {
      custom.classList.remove("success");
      custom.classList.add("invalid");
    }
  }

  setPeopleValue(e) {
    if (e.target.value >= 1) {
      error.style.display = "none";
      nPeople.classList.remove("invalid");
    } else {
      error.style.display = "block";
      nPeople.classList.add("invalid");
    }

    this.#peopleValue = e.target.value;

    this.hesap();
  }

  resetBtn() {
    this.#billValue = 0;
    this.#tipValue = 0;
    this.#peopleValue = 0;

    bill.value = "";
    nPeople.value = "";
    custom.value = "";

    tipBox.forEach(btn => btn.classList.remove("selected"));
    results.forEach(value => (value.textContent = "$0.00"));

    error.style.display = "none";
    nPeople.classList.remove("invalid");
    custom.style.border = "none";

    this.updateDisableButton();
  }

  updateDisableButton() {
    if (this.#billValue <= 0 || this.#peopleValue <= 0) {
      btn.disabled = true;
      btn.classList.remove("btn-success");
    } else {
      btn.disabled = false;
      btn.classList.add("btn-success");
    }
  }

  hesap() {
    if (this.#peopleValue >= 1) {
      let tip = this.#billValue * this.#tipValue;
      let amount = tip / this.#peopleValue;
      let total = (this.#billValue + tip) / this.#peopleValue;

      results[0].textContent = `$${amount.toFixed(2)}`;
      results[1].textContent = `$${total.toFixed(2)}`;
    }
    this.updateDisableButton();
  }
}

const app = new App();
