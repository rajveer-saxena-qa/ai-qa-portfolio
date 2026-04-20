import{test, expect} from '@playwright/test';
import { login } from '../../utils/loginHelper';
//Using Array to include all the 6 combination of negative scenarios in one array 
//and mentioning scenario name with the valid invalid combination to get the report 
//which actually include all the negative test case combination for login
const invalidCredentials = [
  { uid: 'invalid123', pwd: 'invalid123', scenario: 'TC002 - Invalid UserID and Invalid Password' },
  { uid: process.env.GURU99_USERNAME, pwd: 'wrongpass', scenario: 'TC003 - Valid UserID and Invalid Password' },
  { uid: 'invaliduser', pwd: process.env.GURU99_PASSWORD, scenario: 'TC004 - Invalid UserID and Valid Password' },
  { uid: process.env.GURU99_USERNAME, pwd: '', scenario: 'TC005 - Valid UserID and Blank Password'},
  { uid: '', pwd: process.env.GURU99_PASSWORD, scenario: 'TC006 - Blank UserID and Valid Password'},
  { uid: '', pwd: '', scenario: 'TC007 - Blank UserID and Blank Password'},
];
//creating Regression suite
test.describe('Login Module - Regression', () => {
//this will handle above negative test data through loop and create separate test case for each negative data set
  invalidCredentials.forEach(({ uid, pwd, scenario }) => {
    //Create test case for all the three negative cases with scenario name
    test(`${scenario}`, async ({ page }) => {
      //Click Login and wait for alert popup 
      const [dialog] = await Promise.all([
      page.waitForEvent('dialog'),
      await login(page,uid,pwd),
      ]);
      //Validate error message in popup
      expect(dialog.message()).toContain('User or Password is not valid');
      //Close the popup
      await dialog.accept();
      });
  });
});