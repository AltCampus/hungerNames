const express = require('express');
const router = express.Router();

router.get('/', (err, res)=>{
  res.render('index');
});
router.get('/register', (err, res)=>{
  res.render('index');
});
router.get('/login', (err, res)=>{
  res.render('index');
});
router.get('/:day', (err, res) => {
  res.render('index');
})
router.get('/admin', (err, res) => {
  res.render('index');
})
router.get('/admin/invite', (err, res) => {
  res.render('index');
})

router.get('/register', (err, res) => {
  res.render('index');
});

router.get('/student/:id', (req, res) => {
  res.render('index');
})

router.get('/student/feedbacks/:id', (req, res) => {
  res.render('index');
})

router.get('/staff/feedbacks', (req, res) => {
  res.render('index');
})

// staff will get list of students (who are coming for a particular meal)
router.get('/staff/attendees', (req, res) => {
  res.render('index');
})

router.get('/staff', (req, res) => {
  res.render('index');
})

router.get('/staff/remark', (req, res) => {
  res.render('index');
})

// checking admin and staff side menu for testing
router.get('/admin/sidemenu', (req, res) => {
  res.render('index');
})

router.get('/staff/sidemenu', (req, res) => {
  res.render('index');
})

module.exports =router;