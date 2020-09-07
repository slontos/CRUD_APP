import React from 'react';
import './App.css';
import InputPerson from "./components/InputPerson";
import ListPeople from "./components/ListPeople";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './Nav';


function App() {
  return (
    <Router>
      <div className="container">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/list" component={ListPeople} />
          <Route path="/inputperson" component={InputPerson} />
        </Switch>
      </div>
    </Router>    
  );
}

const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
);

export default App; 