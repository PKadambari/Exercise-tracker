import react, {useRef, useState} from 'react';
import axios from 'axios';


function CreateUser(){
    const username = useRef('');
    const height = useRef(null);
    const weight = useRef(null);
    const onSubmit = (event) => {
        event.preventDefault();
    
        const user = {
            username: username.current.value,
            height: height.current.value,
            weight: weight.current.value
          }
      
        console.log(user);

        axios.post("http://localhost:5050/users/add", user)
            .then(res => console.log(res.data))

    
        // Reset input fields
        username.current.value = '';
        height.current.value = '';
        weight.current.value = '';
      };

    return (
        <div>
          <h3>Create New User</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group"> 
              <label>Username: </label>
              <input  type="text"
                  required
                  className="form-control"
                  ref={username}
                  />
            </div>
            <div className="form-group"> 
              <label>Height(in cms): </label>
              <input  type="text"
                  required
                  className="form-control"
                  ref={height}
                  />
            </div>
            <div className="form-group"> 
              <label>Weight(in kgs): </label>
              <input  type="text"
                  required
                  className="form-control"
                  ref={weight}
                  />
            </div>
            <div className="form-group">
              <input type="submit" value="Create User" className="btn btn-primary" />
            </div>
          </form>
        </div>
      )
}

export default CreateUser;