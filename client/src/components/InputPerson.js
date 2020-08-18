import React, {Fragment, useState} from "react";

const InputPerson = () => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/person", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (<Fragment>
        <h1 className="text-center mt-5">People List</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input 
                type="text" 
                className="form-control" 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter Full Name"
            />
            <button className="btn btn-success">Add</button>
        </form>
    </Fragment>
    );
};

export default InputPerson;