const billBox = document.querySelector("#bill");

const tipBox = document.querySelectorAll(".stip");

const custom = document.querySelector("#custom");

const nPeople = document.querySelector("#npeople");

const tipAmount = document.querySelector("#tip");
const tipTotal = document.querySelector("#total");

const btn = document.querySelector("#btn");

class App {
  #bill;
  #tip;
  #n;

  constructor() {
    //? Bill

    billBox.addEventListener("change", e => {
      this.#bill = +e.target.value;
    });

    //? Selected Tip

    tipBox.forEach(el => {
      el.addEventListener("click", _ => {
        // Aktif oldugunda background degistir
        el.classList.toggle("selected");

        // Tip value al
        this.#tip = +el.dataset.tip;
        console.log(this.#tip);
      });
    });

    //? Number of People

    nPeople.addEventListener("change", e => {
      this.#n = +e.target.value;
      console.log(this.#n);
    });

    document.addEventListener("keypress", e => {
      if (e.key === "Enter") this._hesap();
    });

    // Custom event. + hesap

    // Reset btn eventi. veri girisi oldugunda btn backgroundu degistir.
  }

  _hesap() {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    const amount = this.#bill / this.#tip / this.#n;
    const total = this.#bill / this.#n;

    tipAmount.textContent = amount.toFixed(2);
    tipTotal.textContent = total;

    // ilk enter'da nan/undefined sorunu coz.
  }
}

const app = new App();
