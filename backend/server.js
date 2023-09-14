const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true})
    .then(() => console.log( 'Database Connected' ))
    .catch(err => console.log( err ));

const usersRoute = require('./routes/users');
const exercisesRoute = require('./routes/exercises');

app.use('/users', usersRoute);
app.use('/exercises', exercisesRoute);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
