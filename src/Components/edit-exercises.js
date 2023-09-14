import react, {useEffect, useState, useRef}  from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function EditExercise(){
    let { id } = useParams();
    const username = useRef(null);
    const description = useRef(null);
    const duration = useRef(null);
    const [startDate, setStartDate] = useState(new Date());  
    const selectedDate = moment(startDate).toDate();
    const [selectedUserBMI, setSelectedUserBMI] = useState('');

    useEffect(() => {
          axios.get('http://localhost:5050/exercises/'+ id)
            .then(response => {
                fillExerciseData(response.data);
            })
          .catch((error) => {
            console.log(error);
          })
          axios.get('http://localhost:5050/users/')
          .then(response => {
            if (response.data.length > 0) {
                response.data.forEach(function(user) {
                    if(user.username === username.current.value){
                        setSelectedUserBMI(user.bmi_status);
                    }
                })
            }
          })
          .catch((error) => {
            console.log(error);
          })
      }, [id]);

      function fillExerciseData(data){
        username.current.value = data.username;
        description.current.value = data.description;
        duration.current.value = data.duration;
        setStartDate(data.date);
      }

      const handleSubmit = (event) => {
        event.preventDefault();
    
        const exercise = {
            username: username.current.value,
            description: description.current.value,
            duration: duration.current.value,
            date: startDate
          }
      
        console.log(exercise);

        axios.post('http://localhost:5050/exercises/update/' + id, exercise)
        .then(res => console.log(res.data));
    
        // Reset input fields
        username.current.value = '';
        description.current.value = '';
        duration.current.value = '';

        window.location = '/';
    
      };
    return(
        <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={handleSubmit}>
            <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                readOnly
                className="form-control"
                ref={username}
                />
            {selectedUserBMI && (
            <div>
                <label>BMI Status: </label>
                <span>{selectedUserBMI}</span>
            </div>
            )}
            </div>
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
                selected={selectedDate }
                dateFormat="yyyy-MM-dd"
              />
            </div>
            </div>

            <div className="form-group">
            <input type="submit" value="Save Exercise Log" className="btn btn-primary" />
            </div>
        </form>
    </div>
    )
}

export default EditExercise;