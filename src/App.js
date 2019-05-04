import React, { Component } from 'react';
import TableFilter from './components/TableFilter'
import HeroTable from './components/HeroTable'
import './App.css';

const heroesAux = {
  '1': { id: '1', name: 'Gandalf', race: 'Maia', age: '2019', weapon: 'Staff 🏑' },
  '2': { id: '2', name: 'Aragorn', race: 'Human', age: '120', weapon: 'Sword ⚔' },
  '3': { id: '3', name: 'Legolas', race: 'Elf', age: '200', weapon: 'Bow 🏹' },
  '4': { id: '4', name: 'Gimli', race: 'Dwarf', age: '139', weapon: 'Axe ⚒' },
  '5': { id: '5', name: 'Frodo', race: 'Hobbit', age: '33', weapon: 'Dagger 🗡' }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filterText: '',
      heroes: heroesAux,
      heroesList: ['1', '2', '3', '4', '5'],
      usingRing: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.killHero = this.killHero.bind(this)
    this.putRing = this.putRing.bind(this)
    this.returnRing = this.returnRing.bind(this)
  }

  componentDidUpdate () {
    const { usingRing } = this.state

    if (usingRing) {
      document.title = 'Someone is using the Ring'
    }
  }

  returnRing(){
    const { heroes, heroesList, usingRing } = this.state
    
    let heroId = heroesList.filter(heroId => {
      if (heroes[heroId].status) {
        return heroId
      }
    });
    this.setState({
      heroes: {
        ...heroes,
        [heroId]: {
          ...heroes[heroId],
          status: null,
        }
      }
    })
    if(usingRing) {
      this.setState({
        usingRing: false,
      })
    }
  }

  killHero (id) {
    const { heroes, heroesList } = this.state

    let listWithoutKilledHero = heroesList.filter(heroId => heroId !== id )

    this.setState({
      heroes: {
        ...heroes,
        [id]: {
          ...heroes[id],
          status: 'dead',
        }
      },
      heroesList: [...listWithoutKilledHero, id]
    })
  }

  putRing (id) {
    const { heroes } = this.state

    this.setState({
      heroes: {
        ...heroes,
        [id]: {
          ...heroes[id],
          status: 'using-ring',
        }
      },
      usingRing: true
    })
  }

  handleInputChange (e) {
    this.setState({
      deadPeople: this.state.deadPeople
    })
  }

  render() {
    const {filterText, heroes, heroesList, usingRing } = this.state

    let filteredHeroes = heroesList.map(heroId => heroes[heroId])

    if (filterText) {
      filteredHeroes = heroes.filter(hero => {
        return hero.name.includes(filterText)
      })
    }

    return (
      <div className="index">
        <h2>Fellowship of the Ring</h2>

        <div className="container">
          <TableFilter
            filterText={filterText}
            handleChange={this.handleInputChange}
            placeHolder='Input search...'
          />

          {filteredHeroes.length > 0 && (
            <HeroTable
              heroes={filteredHeroes}
              killHero={this.killHero}
              putRing={this.putRing}
              usingRing={usingRing}
              returnRing={this.returnRing}
            />
          ) }

          {filteredHeroes.length === 0 && <div>No heroes....</div> }
        </div>
      </div>
    )
  }
}

export default App
