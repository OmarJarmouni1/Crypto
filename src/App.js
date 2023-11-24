import React, { useState, useEffect } from 'react';
import './App.css';
import './Coin.css'
import axios from 'axios';
import Coin from './Coin';


function App() {
  const [coins, setCoins] = useState([])
  const [searsh, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data)
        console.log(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  const handleChange = e => {
    setSearch(e.target.volue)
  }
  let search = ''
  const filterdCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='coin-app'>
      {filterdCoins.map(coin => {
        return (
          <Coin 
            key={coin.id} 
            name={coin.name} 
            image={coin.image} 
            symbol={coin.symbol} 
            marketcap={coin.market_cap} 
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h} 
            volume={coin.total_volume}
            />
        );
      })}
    </div>
  );
}

export default App;
