import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const CurrencyExchange = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const apiKey = "783fc365693e4337a781362551245bf5"; // Ganti dengan API Key Anda dari CurrencyFreaks
    const url = `https://api.currencyfreaks.com/latest?apikey=${apiKey}`;

    axios.get(url).then((response) => {
      const data = response.data.rates;

      // Mata uang yang ingin ditampilkan
      const selectedCurrencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];

      // Filter data berdasarkan mata uang yang dipilih
      const currencyData = selectedCurrencies.map((currency) => ({
        currency,
        exchangeRate: parseFloat(data[currency]).toFixed(6),
        weBuy: (parseFloat(data[currency]) * 1.05).toFixed(4),
        weSell: (parseFloat(data[currency]) * 0.95).toFixed(4),
      }));

      setCurrencies(currencyData);
    });
  }, []);

  return (
    <div className="center-table">
      <h1>Currency Exchange Rates</h1>
      <table className="centered-table">
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => (
            <tr key={currency.currency}>
              <td>{currency.currency}</td>
              <td>{currency.weBuy}</td>
              <td>{currency.exchangeRate}</td>
              <td>{currency.weSell}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <center>
      <text>Rate are based from 1 USD. <br/> This aplication uses API from https://currencyfreaks.com/</text>
      </center>
    </div>
  );
};

export default CurrencyExchange;
