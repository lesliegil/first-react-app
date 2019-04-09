import React, { Component } from 'react';
import classes from './App.css';
import Person from '..Person/components/Persons/Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: '1', name: 'Max', age: 26 },
      { id: '2', name: 'Steph', age: 28 },
      { id: '3', name : 'Jay', age: 23 }
    ],
    otherState: 'some other value',
    showPersons: false
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
    let persons = null;
    let btnClass= '';

    if(this.state.showPersons){
      persons = (
        <div>
          {this.state)}
        </div>
      );

      btnClass = classes.Red;
      

    }

    let assignedClasses = [];
    if(this.state.persons.length <= 2){
      assignedClasses.push(classes.red); //classes = ['red']
    }
    if(this.state.persons.length <= 1){
      assignedClasses.push(classes.bold); //classes = ['red', 'bold']
    }


    return (
        <div className={classes.App}>
          <h1> Hi, I'm a React App</h1>
          <p className = {assignedClasses.join(' ')}> This is really working!</p>
          <button className = {btnClass}

            onClick = {this.togglePersonsHandler}>Toggle Persons</button>
          {persons}   
        </div>
      
    );
    //^ bind is better to avoid too much re rendering
   // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
