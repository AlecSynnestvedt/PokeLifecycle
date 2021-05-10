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
    //timer should go here probably, or maybe below the next } but definitely before the fetch()
  }

  fetchPokemon() {
    setState{
      clockOn: true
    }
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
 timer = () => {
    if (this.state.clock > 0) {
      this.setState(
        {clock: this.state.clock -1}
      )
    } else {
      clearInterval();
        this.setState(
          {clockOn: false }
        )
    }
  } 
  
  
  
  //Lifecycle method
  componentDidUpdate () { //Lifecycle method here checking that the timer ahs updated before proceeding down
    setInterval(() => {this.timer()}, 1000)//10000 ms = 10 s 
  }
  
  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >Timer Display {this.state.clockOn ? this.state.clock : null} </h1>
        
        <div className={'pokeWrap'}>
          {this.state.clockOn ? <img className={'pokeImg'} src={this.state.pokeSprite} />
          //I think there are a few ways to do this, but my best option looks like it is likely to filter with CSS and toggle that on / off w/ onClic.. 
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;
