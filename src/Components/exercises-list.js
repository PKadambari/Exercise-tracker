import react, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
import axios from 'axios';

const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.bmi_status}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <button className="dltBtn" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</button>
      </td>
    </tr>
  )

function ExercisesList(){
    const [exercises, setExercises] = useState([]);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5050/exercises/')
        .then(response => {
            setExercises(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
        axios.get('http://localhost:5050/users/')
        .then(response => {
            setUsers(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    },[])

    function deleteExercise(id) {
        axios.delete('http://localhost:5050/exercises/'+id)
          .then(response => { console.log(response.data)});
    
          setExercises(exercises.filter(el => el._id !== id))
      }
    
      function exerciseList() {
        return exercises.map(currentexercise => {
                users.forEach(function(user) {
                if(user.username === currentexercise.username){
                    currentexercise.bmi_status = user.bmi_status;
                }
                })
          return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id}/>;
        })
      }
      return (
        <div>
          <h3>Logged Exercises</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>BMI Status</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { exerciseList() }
            </tbody>
          </table>
        </div>
      )
}

export default ExercisesList;