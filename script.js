const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document .querySelector('form button');
const fromCurr = document .querySelector('.from select');
const toCurr = document .querySelector('.to select');
const msg = document.querySelector('.msg');

// When Page loads It will call this event
window.addEventListener('load', () => {
  updateExchangeRate();
})

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement('option');
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === 'from' && currCode === 'USD') {
      newOption.selected = true;
    }
    else if (select.name === 'to' && currCode === 'INR') {
      newOption.selected = true;
    }
    select.append(newOption);
  }
  select.addEventListener('change', (event) => {
    updateFlag(event.target);
  })
}

const updateFlag = (element) => {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const newSrcImg =  `https://flagsapi.com/${countryCode}/flat/64.png`;
  const img = element.parentElement.querySelector('img');
  img.src = newSrcImg;
}

btn.addEventListener('click', (event) => {
  event.preventDefault();
  updateExchangeRate()
})

const updateExchangeRate = async () => {
  let amount = document.querySelector('.amount');
  let amtVal = amount.value;
  if (amtVal === '' || amtVal < 1 ) {
    amtVal = 1;
    amt.value = "1";
  }
  
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmt = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}