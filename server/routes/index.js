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

router.get('/student/:id/feedback', (req, res) => {
  res.render('index');
})

router.get('/staff/feedbacks', (req, res) => {
  res.render('index');
})

router.get('/staff', (req, res) => {
  res.render('index');
})

module.exports =router;