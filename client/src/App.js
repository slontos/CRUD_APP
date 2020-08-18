import React, {Fragment} from 'react';
import './App.css';
import InputPerson from "./components/InputPerson";
import ListPeople from "./components/ListPeople";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputPerson />
        <ListPeople />
      </div>   
    </Fragment>
  );
}

export default App;
