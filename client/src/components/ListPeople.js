import React, { Fragment, useEffect, useState } from "react";
import EditPerson from "./EditPerson";


const ListPeople = () => {
  const [person, setPerson] = useState([]);


  const deletePerson = async (id) => {
      try {
        const deletePerson = await fetch(`http://localhost:5000/person/${id}`, {
             method: "DELETE"
         });
        setPerson(person.filter(person => person.person_id !== id));
      } catch (err) {
          console.error(err.message);
      }
  }

  const getPeople = async () => {
    try {
      const response = await fetch("http://localhost:5000/person");
      const jsonData = await response.json();

      setPerson(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  console.log(person);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead className="thead-dark">
          <tr>
            <th>Full Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {person.map(person => (
            <tr key={person.person_id}>
              <td>{person.description}</td>
              <td><EditPerson person={person}/></td>
              <td>
                    <button 
                        className="btn btn-danger" 
                        onClick={()=> deletePerson(person.person_id)}>Delete
                    </button>
               </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListPeople;