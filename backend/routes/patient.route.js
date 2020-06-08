const express = require('express');
const app = express();
const patientRoute = express.Router();

// Patient model
let Patient = require('../models/Patient');

// Add Patient
patientRoute.route('/create').post((req, res, next) => {
  Patient.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Patients
patientRoute.route('/').get((req, res) => {
  Patient.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single patient
patientRoute.route('/read/:id').get((req, res) => {
  Patient.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update patient
patientRoute.route('/update/:id').put((req, res, next) => {
  Patient.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete patient
patientRoute.route('/delete/:id').delete((req, res, next) => {
  Patient.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = patientRoute;