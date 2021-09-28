const switcher = document.querySelector("#switcher");
const search = document.querySelector("#search");
const filter = document.querySelectorAll(".filter option");

const homepage = document.querySelector(".homepage");
const countries = document.querySelector(".countries");
const detailsPage = document.querySelector(".details");
const detailContent = document.querySelector(".content");

const countryCard = document.querySelectorAll(".country");

const backBtn = document.querySelector(".btn-back");
const logo = document.querySelector(".logo");

//? Show all Countries
async function init() {
  const res = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await res.json();

  document.querySelector(".dropdown").reset();

  renderHomepage(data);
}

//? Search Countries
function searchCountry(e) {
  e.preventDefault();

  const term = search.value.toLowerCase();
  console.log(term);

  const countryCards = document.querySelectorAll(".country");

  countryCards.forEach(country => {
    const name = country
      .querySelector(".country__info")
      .querySelector(".country-name")
      .textContent.toLowerCase();

    if (name.indexOf(term) > -1) {
      country.style.display = "grid";
    } else {
      country.style.display = "none";
    }
  });
}

//? Filter Countries by Region
async function filterByRegion(e) {
  e.preventDefault();
  const region = e.target.value;

  const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
  const data = await res.json();

  countries.innerHTML = "";

  renderHomapage(data);

  //document.querySelector(".dropdown").reset();
}

//? Show Country Detail Page
async function showDetail(e) {
  const country = e.target.closest(".country");

  if (!country) return;

  const countryName = country
    .querySelector(".country__info")
    .firstElementChild.textContent.toLowerCase();

  // fetch by country name

  const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
  const data = await res.json();

  homepage.style.display = "none";
  detailsPage.style.display = "block";

  renderDetails(data);

  //! burasi devam
}

function renderHomepage(data) {
  data.forEach(country => {
    const html = `
            <div class="country">
                <div class="country__flag">
                    <img src="${country.flags.png}" alt="${country.name.common}" />
                </div>
                <div class="country__info">
                    <h2 class="country-name">${country.name.common}</h2>
                    <p class="country-population">
                        <span class="bold">Population:</span> ${country.area}
                    </p>
                    <p class="country-region">
                        <span class="bold">Region:</span> ${country.region}
                    </p>
                    <p class="country-capital">
                        <span class="bold">Capital:</span> ${country.capital}
                    </p>
                </div>
            </div>
        `;

    countries.insertAdjacentHTML("beforeend", html);
  });
}

function renderDetails(data) {
  data.forEach(country => {
    const html = `
            <div class="content__flag">
                <img src="${country.flags.png}" alt="${country.name.common}" />
            </div>
            <div class="content__detail">
                <h2 class="country-name">${country.name.common}</h2>

                <div class="content__detail-info">
                    <div class="left">
                        <p class="country-native">
                        <span class="bold">Native Name:</span> ${country.name.nativeName}
                        </p>
                        <p class="country-population">
                        <span class="bold">Population:</span> ${country.area}
                        </p>
                        <p class="country-region">
                        <span class="bold">Region:</span> ${country.region}
                        </p>
                        <p class="country-subregion">
                        <span class="bold">Sub Region:</span> ${country.subregion}
                        </p>
                        <p class="country-capital">
                        <span class="bold">Capital:</span> ${country.capital}
                        </p>
                    </div>

                <div class="right">
                        <p class="country-domain">
                        <span class="bold">Top Level Domain:</span> ${country.tld[0]}
                        </p>
                        <p class="country-currency">
                        <span class="bold">Currencies:</span> ${country.currencies}
                        </p>
                        <p class="country-lang">
                        <span class="bold">Languages:</span> ...
                        </p>
                </div>
            </div>

            <div class="borders">
                <h3>Border Countries:</h3>
                <div class="border__countries">
                    <a href="#" class="border__countries-link">France</a>
                    <a href="#" class="border__countries-link">Germany</a>
                    <a href="#" class="border__countries-link">Netherlands</a>
                </div>
            </div>
        </div>

        
        `;

    //! burasi devam

    detailContent.insertAdjacentHTML("beforeend", html);
  });
}

function goBack() {
    showHomePage();
}

function showHomePage() {
  detailsPage.style.display = "none";
  detailContent.innerHTML = "";
  homepage.style.display = "grid";
}

init();

//? Event Listeners

search.addEventListener("input", searchCountry); // enter'a bastiginda search=? duzelt sayfa yenileniyor.
filter.forEach(option => option.addEventListener("click", filterByRegion));
countries.addEventListener("click", showDetail);
backBtn.addEventListener("click", goBack);
logo.addEventListener("click", showHomePage);
