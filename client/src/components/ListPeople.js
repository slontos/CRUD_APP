import React, { Fragment, useEffect, useState } from "react";
import EditPerson from "./EditPerson";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
const ListPeople = () => {
  const classes = useStyles();
  const [person, setPerson] = useState([]);


  const deletePerson = async (id) => {
      try {
        const deletePerson = await fetch(`/person/${id}`, {
             method: "DELETE"
         });
        setPerson(person.filter(person => person.person_id !== id));
      } catch (err) {
          console.error(err.message);
          alert('Server error!');
      }
  }

  const getPeople = async () => {
    try {
      const response = await fetch("/person");
      const jsonData = await response.json();

      setPerson(jsonData);
    } catch (err) {
      console.error(err.message);
      alert('Server error!');
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  console.log(person);

  return (
    <Fragment>
      <h1 className="text-center mt-5">People List</h1>
      <table className="table mt-5 text-center">
        <thead className="thead-dark">
          <tr>
            <th></th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {person.map(person => (
            <tr key={person.person_id}>
              <td><EditPerson person={person}/></td>
              <td>{person.description}</td>
              <td>{person.email}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={()=> deletePerson(person.person_id)}>Delete
                </Button>
               </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListPeople;