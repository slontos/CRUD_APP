import React, {Fragment, useState} from "react";

const InputPerson = () => {

    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {description, email};
            const response = await fetch("/person", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            setDescription("");
            setEmail("");
            alert(`Person Added`); 
        } catch (err) {
            console.error(err.message);
            alert('Server error!');
        }
    }
    return (<Fragment>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input 
                type="text" 
                className="form-control" 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter Full Name"
            />
            <input 
                type="text" 
                className="form-control" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter email"
            />
            <button className="btn btn-success">Add</button>
        </form>
    </Fragment>
    );
};

export default InputPerson;