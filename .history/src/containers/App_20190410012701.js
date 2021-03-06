import React, { Component } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: '1', name: 'Max', age: 26 },
      { id: '2', name: 'Steph', age: 28 },
      { id: '3', name : 'Jay', age: 23 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true
  }

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props)
    return state;
  }

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true; //default
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  }


  //binding and two way binding example - on type
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })
    
    const person = {...this.state.persons[personIndex]};
    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice(); //makes copy of original array instead of referencing
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});

  }

 togglePersonsHandler = () => {
      const doesShow = this.state.showPersons;
      this.setState({showPersons : !doesShow})
    }

  render() {
    console.log('[App.js] render');
    let persons = null;

    if(this.state.showPersons){
      persons = ( <Persons 
            persons = {this.state.persons}
            clicked={this.deletePersonHandler}
            changed = {this.nameChangedHandler}
          />

      );
      

    }

    return (
        <div className={classes.App}>
        <button onClick = {() => {this.setState({showCockpit: false})>
          Remove Cockpit
        </button>
        {this.state.showCockpit ? ()
        <Cockpit title = {this.props.appTitle}
                showPersons={this.state.showPersons}
                 persons = {this.state.persons}
                 clicked = {this.togglePersonsHandler} />
          ) : null} 
          {persons}
        </div>
      
    );
    //^ bind is better to avoid too much re rendering
   // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
