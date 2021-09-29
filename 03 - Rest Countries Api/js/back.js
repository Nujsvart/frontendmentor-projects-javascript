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

init();

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

  renderHomepage(data);
}

//? Show Country Detail Page
async function showDetail(e) {
  const country = e.target.closest(".country");

  if (!country) return;

  const countryName = country
    .querySelector(".country__info")
    .firstElementChild.textContent.toLowerCase();

  const data = await fetchByFullName(countryName);

  homepage.style.display = "none";
  detailsPage.style.display = "block";

  renderDetails(data);
}

//? Render

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
                        <span class="bold">Native Name:</span> ${
                          country.name.nativeName[
                            Object.keys(country.name.nativeName)[0]
                          ].common
                        }
                        </p>
                        <p class="country-population">
                        <span class="bold">Population:</span> ${country.area}
                        </p>
                        <p class="country-region">
                        <span class="bold">Region:</span> ${country.region}
                        </p>
                        <p class="country-subregion">
                        <span class="bold">Sub Region:</span> ${
                          country.subregion
                        }
                        </p>
                        <p class="country-capital">
                        <span class="bold">Capital:</span> ${country.capital}
                        </p>
                    </div>

                <div class="right">
                        <p class="country-domain">
                        <span class="bold">Top Level Domain:</span> ${
                          country.tld[0]
                        }
                        </p>
                        <p class="country-currency">
                        <span class="bold">Currencies:</span> ${
                          country.currencies[Object.keys(country.currencies)[0]]
                            .name
                        }
                        </p>
                        <p class="country-lang">
                        <span class="bold">Languages:</span> ${[data][0]
                          .map(ulke => ulke.languages)
                          .map(lang => Object.values(lang))
                          .join("")}
                        </p>
                </div>
              </div>

              <div class="borders">
                  <h3>Border Countries:</h3>
                  <div class="border__countries"></div>
              </div>
            </div>

        `;

    detailContent.insertAdjacentHTML("beforeend", html);
  });

  //? render borders

  renderBorders(data);
}

function renderBorders(data) {
  const borders = data.map(country => country.borders);

  borders.map(border => {
    const borderEle = document.querySelector(".border__countries");

    if (!border) return;

    //? Fetch country by [code] Name

    border.forEach(async code => {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
      const data = await res.json();

      const { name } = data[0];

      borderEle.innerHTML += `<a href="#" class="border__countries-link">${name.common}</a>`;
    });
  });
}

function showBorderDetail(e) {
  const bordersEl = e.currentTarget
    .querySelector(".borders")
    .querySelector(".border__countries");
  const allBorders = bordersEl.querySelectorAll(".border__countries-link");

  allBorders.forEach(async border => {
    if (e.target.textContent !== border.textContent) return;

    const countryName = border.textContent;

    const data = await fetchByFullName(countryName);

    //? clear details page
    detailContent.innerHTML = "";

    renderDetails(data);
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

function toggleTheme() {
  const body = document.body;
  body.classList.toggle("darkmode");

  const icon = document.querySelector(".modeicon");

  if (body.classList.contains("darkmode")) {
    icon.classList.remove("far");
    icon.classList.add("fas");
  } else {
    icon.classList.remove("fas");
    icon.classList.add("far");
  }
}

async function fetchByFullName(countryName) {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
  );
  const data = await res.json();

  return data;
}

//? Event Listeners

search.addEventListener("input", searchCountry);
filter.forEach(option => option.addEventListener("click", filterByRegion));
countries.addEventListener("click", showDetail);
backBtn.addEventListener("click", goBack);
logo.addEventListener("click", showHomePage);
switcher.addEventListener("click", toggleTheme);
detailContent.addEventListener("click", showBorderDetail);
