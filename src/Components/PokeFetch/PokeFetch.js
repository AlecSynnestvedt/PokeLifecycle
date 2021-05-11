import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
    }
  }

  fetchPokemon() {
    this.setState (
     {timerRunning: true}
    )
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }
  //Timer
 tick = () => {
    if (this.state.timer > 0) {
      this.setState(
        {timer: this.state.timer -1}
      )
    } else {
      clearInterval();
        this.setState(
          {timerRunning: false }
        )
    }
  } 
  
  
  
  //Lifecycle method
  componentDidUpdate () { 
    setInterval(() => {this.timer()}, 1000)
  }
  
  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Gotta catch 'em all!</button>
        <h1 className={'timer'} >Timer Display {this.state.timerRunning ? this.state.timer : null} </h1>
        
        <div className={'pokeWrap'}>
          <h1 className={'pokeName'}>{!this.state.timerRunning ? this.state.pokeName : this.state.timer === 0 ? this.pokeName : null}</h1>
        </div>}
      </div>
    )
  }
}

export default PokeFetch;
