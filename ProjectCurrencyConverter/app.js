const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // // console.log(fromCurr, toCurr);
  const fromURL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  // // const toURL = `${BASE_URL}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(fromURL);
  // // let response2 = await fetch(toURL);
  let data = await response.json();
  // // let data2 = await response2.json();
  // let rate = data[toCurr.value.toLowerCase()];
  // console.log(rate);

  // let finalAmount = amount * rate;

  let fromRate =
    data[fromCurr.value.toLowerCase()][fromCurr.value.toLowerCase()];
  let toRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  if (fromRate && toRate) {
    // Calculate the conversion rate
    let rate = toRate / fromRate;

    // Calculate the final amount
    finalAmount = amtVal * rate;
    console.log(`Rate: ${rate}`);
    console.log(`Final Amount: ${finalAmount}`);
  } else {
    console.error("Invalid currency selected or data not found.");
  }

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

document.addEventListener("load", () => {
  updateExchangeRate();
});
