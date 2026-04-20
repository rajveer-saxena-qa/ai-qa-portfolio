const { test, expect } = require('@playwright/test');
require('dotenv').config();
const validUID = process.env.GURU99_USERNAME;
const validPWD = process.env.GURU99_PASSWORD;
const invalidCredentials = [
  { uid: 'invalid123', pwd: 'invalid123', scenario: 'TC002 - Invalid UserID and Invalid Password' },
  { uid: 'validUID', pwd: 'wrongpass', scenario: 'TC003 - Valid UserID and Invalid Password' },
  { uid: 'invaliduser', pwd: 'validPWD', scenario: 'TC004 - Invalid UserID and Valid Password' },
];