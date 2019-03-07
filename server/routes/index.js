const express = require('express');
const router = express.Router()
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
module.exports =router;