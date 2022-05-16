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

try{
Promise.all([
    axios.get(`https://api.apilayer.com/exchangerates_data/${getDate()}?apikey=hImy1wFyofVRBh2fOC2Dx6Vpz4EwluyX&base=${CURRENCY_CODE.USD}&symbols=${CURRENCY_CODE.RUB}`),
    axios.get(`https://api.apilayer.com/exchangerates_data/${getDate()}?apikey=hImy1wFyofVRBh2fOC2Dx6Vpz4EwluyX&base=${CURRENCY_CODE.EUR}&symbols=${CURRENCY_CODE.RUB}`),
    axios.get(`https://api.apilayer.com/exchangerates_data/${getDate()}?apikey=hImy1wFyofVRBh2fOC2Dx6Vpz4EwluyX&base=${CURRENCY_CODE.JPY}&symbols=${CURRENCY_CODE.RUB}`),
    axios.get(`https://api.apilayer.com/exchangerates_data/${getDate()}?apikey=hImy1wFyofVRBh2fOC2Dx6Vpz4EwluyX&base=${CURRENCY_CODE.CNY}&symbols=${CURRENCY_CODE.RUB}`),
    axios.get(`https://api.apilayer.com/exchangerates_data/${getDate()}?apikey=hImy1wFyofVRBh2fOC2Dx6Vpz4EwluyX&base=${CURRENCY_CODE.CZK}&symbols=${CURRENCY_CODE.RUB}`),
]).then((values) => values.forEach(renderContent));
}
catch(error)
{
    document.getElementById("data").innerText ="Отсутствует подключение к интернету";
}