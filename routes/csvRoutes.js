const express = require('express');
const router = express.Router();

router.get('/generate-csv', (req, res) => {
  const data = [
    { planeName: 'A-101', capacity: 30},
    {planeName: 'A-102', capacity: 30},
  ];

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=example.csv');
  
  res.csv(data, true); 
});

module.exports = router;
