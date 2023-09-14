const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const height = req.body.height;
    const weight = req.body.weight;
    var bmi, bmi_status;
    
    bmi = (weight / (height * height)) * 10000;
    if(bmi < 18.5){
        bmi_status = "Underweight";
    }
    else if( bmi >= 18.5 && bmi <= 24.9){
        bmi_status = "Normal weight";
    }
    else if( bmi >= 25 && bmi <= 29.9){
        bmi_status = "Overweight";
    }
    else{
        bmi_status = "Obesity";
    }

    const newUser = new User({username, height, weight, bmi_status });

    newUser.save()
        .then(() => res.json('New user added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;