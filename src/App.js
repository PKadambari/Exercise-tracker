import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/navbar.component';
import ExercisesList from './Components/exercises-list';
import CreateExercise from './Components/create-exercise';
import CreateUser from './Components/create-users';
import EditExercise from './Components/edit-exercises';

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Routes>
        <Route exact path='/' element = {<ExercisesList/>}></Route>
        <Route path='/create' element = {<CreateExercise />}></Route>
        <Route path='/user' element = {<CreateUser />}></Route>
        <Route path='/edit/:id' element = {<EditExercise />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
