import React, {Fragment, useState} from "react";

const EditPerson = ({person}) => {

    const [description, setDescription] = useState(person.description);
    const [email, setEmail] = useState(person.email);

    const updateDescription = async(e) => {
        e.preventDefault();
        try {
            const body = {description, email};
            const response = await fetch(`/person/${person.person_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location ="/list";
        } catch (err) {
            console.error(err.message);
            alert('Server error!');
        }
    };

    return <Fragment>
    <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${person.person_id}`}>
      Edit
    </button>
    
    <div class="modal" id={`id${person.person_id}`} onClick={() =>{ setDescription(person.description);setEmail(person.email)}}>
      <div class="modal-dialog">
        <div class="modal-content">
    
          
          <div class="modal-header">
            <h4 class="modal-title">Edit Person Details</h4>
            <button type="button" class="close" data-dismiss="modal" onClick={() =>{ setDescription(person.description);setEmail(person.email)}}>&times;</button>
          </div>
    
          
          <div class="modal-body">
            <input placeholder="{description}" type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
            <input placeholder="{email}" required type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
    
          
          <div class="modal-footer">
            <button type="button" class="btn btn-warning" data-dismiss="modal" onClick = {e => updateDescription(e)}>Edit</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(person.description)}>Close</button>
          </div>
    
        </div>
      </div>
    </div></Fragment>;
    
}

export default EditPerson;