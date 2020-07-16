import { convertCurrency, getHistoricals } from './api.js';
import { graph } from './canvas.js';

function getCurrencies() {
  return {
    from: document.getElementById('select-01').value,
    to: document.getElementById('select-02').value,
  };
}

function displayValue(value) {
  const outputElement = document.getElementById('number2');
  outputElement.value = value;
  const spinner = document.getElementById('spinner');
  spinner.classList.add('hide');
}

function doConvert() {
  const { value } = document.getElementById('number1');
  const spinner = document.getElementById('spinner');
  spinner.classList.remove('hide');
  const currencies = getCurrencies();
  convertCurrency(value, currencies.from, currencies.to, displayValue);
  const chart = document.getElementById('canvas-container');
  chart.classList.add('hide');
}

function drawGraphic(response) {
  const from = document.getElementById('select-01').value;
  const to = document.getElementById('select-02').value;
  const amount = document.getElementById('number1').value;

  const values = [];
  if (response) {
    response.forEach((day) => {
      const result = ((1 / day[from]) / (1 / day[to])) * amount;
      values.push(parseFloat(result.toFixed(2)));
    });
  }
  graph(values);
}

function seeHistoricals() {
  const chart = document.getElementById('canvas-container');
  chart.classList.remove('hide');
  const currencies = getCurrencies();
  getHistoricals(currencies.from, currencies.to, drawGraphic);
}

function switchCurrencies() {
  const value1 = document.getElementById('select-01').value;
  const value2 = document.getElementById('select-02').value;
  document.getElementById('select-01').value = value2;
  document.getElementById('select-02').value = value1;

  const number1 = document.getElementById('number1').value;
  const number2 = document.getElementById('number2').value;
  document.getElementById('number1').value = number2;
  document.getElementById('number2').value = number1;
}

function addEvents() {
  const convert = document.getElementById('convert');
  const switchAction = document.getElementById('switch');
  const seeHistoricalsAction = document.getElementById('historical');

  convert.addEventListener('click', doConvert);
  switchAction.addEventListener('click', switchCurrencies);
  seeHistoricalsAction.addEventListener('click', seeHistoricals);
}

function init() {
  addEvents();
}

window.onload = init;
