import react, {useEffect, useState, useRef} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise(){
    const username = useRef('');
    const description = useRef(null);
    const duration = useRef(null);
    const [startDate, setStartDate] = useState(new Date());  
    const selectedDate = moment(startDate).toDate();
    const [users, setUsers] = useState([]);
    const [bmi_status, setBMIStatus] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5050/users')
          .then(response => {
            if (response.data.length > 0) {
                setUsers(response.data)
                response.data.forEach(function(user) {
                    if(user.username === username.current.value){
                        setBMIStatus(user.bmi_status);
                    }
                })
            }
          })
          .catch((error) => {
            console.log(error);
          })
      }, []);

      const handleSubmit = (event) => {
        event.preventDefault();
    
        const exercise = {
            username: username.current.value,
            description: description.current.value,
            duration: duration.current.value,
            date: startDate
          }
      
        console.log(exercise);

        axios.post("http://localhost:5050/exercises/add", exercise)
            .then(res => console.log(res.data))
    
        // Reset input fields
        username.current.value = '';
        description.current.value = '';
        duration.current.value = '';

        window.location = '/';
    
      };

      const handleDropdownChange = (event) => {
        users.forEach((user) => {
            if(user.username === event.target.value){
                setBMIStatus(user.bmi_status);
            }
        })
      };

    return(
        <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={handleSubmit}>
            <div className="form-group"> 
            <label>Username: </label>
            <select ref={username}
                required
                onChange={handleDropdownChange}
                className="form-control">
                    {
                        users.map(function(user) {
                        return <option
                            key={user._id}
                            value={user.username}>{user.username}
                            </option>;
                        })
                    }
            </select>
            </div>
            {bmi_status &&
                <div className="form-group"> 
                <label>BMI Status: </label>
                <span className="bmiColor">{bmi_status}</span>
                </div>
            }
            <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                ref={description}
                />
            </div>
            <div className="form-group">
            <label>Duration (in minutes): </label>
            <input 
                type="text" 
                className="form-control"
                ref={duration}
                />
            </div>

            <div className="form-group">
            <label>Date: </label>
            <div>
            <DatePicker
                className="form-control"
                placeholderText="Select date"
                onChange={(date) => setStartDate(date)}
                selected={selectedDate}
                dateFormat="yyyy-MM-dd"
              />
            </div>
            </div>

            <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
            </div>
        </form>
    </div>
    )
}

export default CreateExercise;