function getRates(fromCurrency, toCurrency, cb) {
  const url = `https://api.exchangeratesapi.io/latest?symbols=${fromCurrency},${toCurrency}`;

  fetch(url, { method: 'GET' })
    .then((response) => response.json())
    .then((body) => {
      try {
        cb(body.rates);
      } catch (e) {
        cb(e);
      }
    })
    .catch((error) => console.log(error));
}

function parseHistoricals(data) {
  const keys = Object.keys(data).sort();
  const historicals = keys.map((key) => data[key]);
  return historicals;
}

function getHistoricals(fromCurrency, toCurrency, cb) {
  const endAt = (new Date()).toISOString().slice(0, 10);
  const weekAgoDate = new Date();
  // Change it so that it is 30 days in the past.
  const pastDate = weekAgoDate.getDate() - 30;
  weekAgoDate.setDate(pastDate);
  const startAt = weekAgoDate.toISOString().slice(0, 10);
  const url = `https://api.exchangeratesapi.io/history?start_at=${startAt}&end_at=${endAt}&symbols=${fromCurrency},${toCurrency}`;

  fetch(url, { method: 'GET' })
    .then((response) => response.json())
    .then((body) => {
      try {
        const data = parseHistoricals(body.rates);
        cb(data);
      } catch (e) {
        cb(e);
      }
    })
    .catch((error) => console.log(error));
}

function convertCurrency(amount, from, to, callback) {
  const convert = (rates) => ((1 / rates[from]) / (1 / rates[to])) * amount;
  getRates(from, to, (rates) => {
    const value = convert(rates);
    callback(value);
  });
}

getHistoricals('USD', 'PHP', parseHistoricals);

export { convertCurrency, getHistoricals };
