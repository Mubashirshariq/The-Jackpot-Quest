import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

function HeadingPage() {
  return (
    <div id="heading-container">
      <h2 class="head2">The</h2>
      <h1 class="head1">Jackpot Quest</h1>
      <h2 class="head2">Dream big, Win big</h2>
    </div>
  );
}

function ContentPage() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);

      setManager(manager);
      setPlayers(players);
      setBalance(balance);
    }

    fetchData();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage('Waiting for transaction success...');
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether'),
    });
    setMessage('You have been entered');
  };

  const onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    setMessage('Waiting for transaction success...');
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    setMessage('A winner has been picked');
  };

  return (
    <div id="content-container">
      <div className="content-wrapper">
        <h1>This contract is managed by {manager}</h1>
        <h3>
          There are currently {players.length} people entered, competing to win
        </h3>
        <h2>Balance: {web3.utils.fromWei(balance, 'ether')} ether</h2>
        <hr />
        <form onSubmit={onSubmit}>
          <h2>Want to try your luck</h2>
          <div>
            
            <input class='ether1'
              value={value} placeholder='Enter the Amount of ether to enter'
              onChange={(event) => setValue(event.target.value)}
              style={{ width: "300px", height: "40px" }}
            />
          </div>
          <button href="#">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Enter
    </button>
        </form>
        <hr />
        <h2>Ready to pick a winner</h2>
        <button onClick={onClick}>
        <span></span>
         <span></span>
         <span></span>
         <span></span>
          Pick a winner</button>
        <hr />
        <h1>{message}</h1>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <HeadingPage />
      <ContentPage />
    </div>
  );
}

export default App;
