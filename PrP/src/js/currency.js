// async function getCurrency() {
//     let curr = document.getElementById("in").value;
//     let count = document.getElementById("count").value;
//     let url = `https://api.currencyapi.com/v2/latest?apikey=4a16fbf0-5bf6-11ec-a4ff-0dc3c805f898&base_currency=${curr}`
//     let response = await fetch(url).then(res => res.json()).then(ans => {
//         console.log(ans);
//         eval(`let code = ans.data.${AED}`);
//         console.log(code);

//         console.log("xyu");
//     })
// }
const CURRENCY_CODE = {
    USD: 'USD',
    RUB: 'RUB',
    EUR: 'EUR',
    JPY: 'JPY',
    CNY: 'CNY',
    CZK: 'CZK'
};

const getDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-0${date.getMonth() +1}-${date.getDate()}`;
};

const renderContent = (response) => {
    const { data } = response;
    let content = document.getElementById('data').innerHTML;
    Object.keys(data.rates).map((base) => {
        content += `
        <tr style="font-size:8vw;">
            <td>1 ${data.base}</td>
            <td> = ${data.rates[base].toFixed(2)} RUB</td>
        </tr>
        `;
    });
    document.getElementById('data').innerHTML = content
}

Promise.all([
    axios.get(`https://api.apilayer.com/exchangerates_data/${getDate()}?apikey=hImy1wFyofVRBh2fOC2Dx6Vpz4EwluyX&base=${CURRENCY_CODE.USD}&symbols=${CURRENCY_CODE.RUB}`),
    axios.get(`https://api.apilayer.com/exchangerates_data/${getDate()}?apikey=hImy1wFyofVRBh2fOC2Dx6Vpz4EwluyX&base=${CURRENCY_CODE.EUR}&symbols=${CURRENCY_CODE.RUB}`),
    axios.get(`https://api.apilayer.com/exchangerates_data/${getDate()}?apikey=hImy1wFyofVRBh2fOC2Dx6Vpz4EwluyX&base=${CURRENCY_CODE.JPY}&symbols=${CURRENCY_CODE.RUB}`),
    axios.get(`https://api.apilayer.com/exchangerates_data/${getDate()}?apikey=hImy1wFyofVRBh2fOC2Dx6Vpz4EwluyX&base=${CURRENCY_CODE.CNY}&symbols=${CURRENCY_CODE.RUB}`),
    axios.get(`https://api.apilayer.com/exchangerates_data/${getDate()}?apikey=hImy1wFyofVRBh2fOC2Dx6Vpz4EwluyX&base=${CURRENCY_CODE.CZK}&symbols=${CURRENCY_CODE.RUB}`),
]).then((values) => values.forEach(renderContent));