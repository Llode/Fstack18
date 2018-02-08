import React from 'react';
// import axios from 'axios'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      error: null
    }
  }


  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data });
      });

  }

  handlePersonChange = (event) => {
    // console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }
  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }


  addPerson = (event) => {
    event.preventDefault()
    const person = this.createPerson();
    console.log(person)
    let personNames = this.state.persons
    personNames = personNames.map((ii) => ii.name)

    let found = personNames.find((that) => {
      return (that === person.name)
    })
    console.log('found', found)
    this.PostStates(found, person);

    //this.SetStates(found, person)
    //    console.log(personNames.join(' '))

  }

  setMessage(message) {
    this.setState({
      error: message
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }


  PostStates(found, person) {
    if (found !== person.name && person.number) {
      //console.log('person', person)
      personService.create(person).then(response => {
        this.setState({
          persons: this.state.persons.concat(response.data),
          newName: '',
          newNumber: ''
        })
      })
      this.setMessage('WE HAVE SUCCESSFULLY ENGINEERED A PERSON');
    }
    if (found === person.name && person.number) {
      let modified = this.state.persons.filter(n => n.name === person.name)
      modified = modified[0]
      console.log(modified)
      this.ikkunaMod(person, modified)
    }
    if (!person.name || !person.number) {
      this.setMessage('NO NUMBER OR NAME')
      this.setState({
        newName: '',
        newNumber: ''
      })
    }
  }

  Filtering = () => {
    //console.log('filter', this.state.filter)
    let result = this.state.persons
    if (this.state.filter !== '') {
      result = this.state.persons.filter(
        person => person.name.toLowerCase().match(this.state.filter.toLowerCase()))
      //console.log('filter result', result)
    }
    return (result)
  }


  createPerson() {
    const person = {
      name: this.state.newName,
      number: this.state.newNumber
    };
    return person;
  }

  SetStates(found, person) {
    if (found === person.name) {
      this.setState({
        newName: '',
        newNumber: ''
      });
    }
    else {
      const persons = this.state.persons.concat(person);
      this.setState({
        persons,
        newName: '',
        newNumber: ''
      });
    }
  }

  ikkunaMod = (person, modified) => {
    console.log(person)
    if (window.confirm(`${person.nimi} löytyy jo luettelosta, muutetaanko numero?`)) {
      personService.update(modified.id, person).then(response => {
        personService
          .getAll()
          .then(response2 => {
            this.setState({ persons: response2.data });
          });
      }).catch(error => {
        window.alert('THE EXPERIMENT HAS ALREADY SUCCUMBED')
      })
      this.setMessage('MUTATION OF LIFE FORM COMPLETE')
    } else {
      this.setMessage('THE SUBJECT WAS LEFT UNMUTATED')
    }
  }

  ikkuna = (id, tbr, remainder) => {
    const nimi = tbr[0].name
    console.log(nimi)
    if (window.confirm(`Poistetaanko ${nimi} ?`)) {
      personService.removePerson(id, tbr).then(() => {
        this.setState({
          persons: remainder
        })
        this.setMessage('THIS PERSON HAS BEEN REMOVED FROM EXISTENCE')
      }).catch(error => {
        window.alert('THIS EXPERIEMENT HAS ALREADY BEEN DISPOSED OF')
      })

    }
  }
  poistaPerson = (id) => {
    const tbr = this.state.persons.filter(n => n.id === id)
    const remainder = this.state.persons.filter(n => n.id !== id)
    return () => {
      this.ikkuna(id, tbr, remainder)
    }
  }

  render() {
    const Person = ({ person, poistaPerson }) => {
      return (
        <li>{person.name} {person.number} <button onClick={poistaPerson}>poista</button></li>
      )
    }
    const Notification = ({ message }) => {
      if (message === null) {
        return null
      }
      return (
        <div className="error">{message}</div>
      )
    }

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            <Notification message={this.state.error} />
          </div>
          <div>
            rajaa näytettäviä: <input value={this.state.filter}
              onChange={this.handleFilterChange} />
          </div>
          <div>
            <h2>Lisää uusi</h2>
            nimi: <input value={this.state.newName}
              onChange={this.handlePersonChange} />
          </div>
          <div>
            numero: <input value={this.state.newNumber}
              onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <div>
          <ul>
            {this.Filtering().map(person =>
              <Person
                key={person.name}
                person={person}
                poistaPerson={this.poistaPerson(person.id)}
              />)}
          </ul>
        </div>
      </div>
    )
  }
}

export default App