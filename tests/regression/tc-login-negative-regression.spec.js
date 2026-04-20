import{test, expect} from '@playwright/test';
//Using Array to include all the 3 combination of negative scenarios in one array 
//and mentioning scenario name with the valid invalid combination to get the report 
//which actually include all the negative test case combination for login
const invalidCredentials = [
  { uid: 'invalid123', pwd: 'invalid123', scenario: 'TC002 - Invalid UserID and Invalid Password' },
  { uid: process.env.GURU99_USERNAME, pwd: 'wrongpass', scenario: 'TC003 - Valid UserID and Invalid Password' },
  { uid: 'invaliduser', pwd: process.env.GURU99_PASSWORD, scenario: 'TC004 - Invalid UserID and Valid Password' },
];
//creating Regression suite
test.describe('Login Module - Regression', () => {
//this will handle above negative test data through loop and create separate test case for each negative data set
  invalidCredentials.forEach(({ uid, pwd, scenario }) => {
    //Create test case for all the three negative cases with scenario name
    test(`${scenario}`, async ({ page }) => {
      // Navigate to URL
      await page.goto('https://demo.guru99.com/V4/');
      //Enter UID
      await page.fill('input[name="uid"]', uid);
      //Enter Password
      await page.fill('input[name="password"]', pwd);
      //Click Login and wait for alert popup 
      const [dialog] = await Promise.all([
      page.waitForEvent('dialog'),
      page.click('input[name="btnLogin"]'),
      ]);
      //Validate error message in popup
      expect(dialog.message()).toContain('User or Password is not valid');
      //Close the popup
      await dialog.accept();
      });
  });
});