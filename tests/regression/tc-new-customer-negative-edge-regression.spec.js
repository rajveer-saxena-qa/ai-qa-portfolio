import { test, expect } from '@playwright/test';
import { login } from '../../utils/loginHelper.js';
//Using array to store all negative and edge test data combinations   
const invalidCustomerData = [
    //TC014 covers all mandatory field blank validation
        {
    scenario: 'TC014 - Submit with all blank fields',
        name: '', dob: '', address: '', city: '',
        state: '', pin: '', mobile: '', email: '',
        password: '',
        expectedErrors: ['Customer name must not be blank', 'Date Field must not be blank',
                         'Address Field must not be blank', 'City Field must not be blank',
                         'State must not be blank', 'PIN Code must not be blank',
                         'Mobile no must not be blank', 'Email-ID must not be blank',
                         'Password must not be blank']
        },
    //TC015 covers Invalid error messages for every field except date.
        {
    scenario: 'TC015 - Invalid email format, Alphabets in PIN and Mobile and Numbers in City and State',
        name: '1TestUser',
        dob: '1990-01-01',
        address: '123 Test Street',
        city: '12345',
        state: '12345',
        pin: 'ABCDEF',
        mobile: 'ABCDEFGHIJ',
        email: 'invalidemail',
        password: 'Password@1',
        expectedErrors: ['Numbers are not allowed', 'Characters are not allowed', 'Email-ID is not valid']
        },
    // cover error messages for special chracter in every field except date    
        {
    scenario: 'TC016 - Special characters in Name City State PIN Mobile',
        name: '@#$%^&',
        dob: '1990-01-01',
        address: '@@#$%. Test Street',
        city: '@#$%.',
        state: '@#$%.',
        pin: '@#$%.',
        mobile: '@#$%.',
        email: 't@xyz.moc',
        password: 'Password@1',
        expectedErrors: ['Special characters are not allowed']
        },
        ];
     //Grouping all negative and edge test cases under New Customer Module Regression suite
        test.describe('New Customer Module - Regression', () => {
     //Looping through invalidCustomerData array to create separate test case for each negative and edge scenario
        invalidCustomerData.forEach(({ scenario, name, dob, address, city, state, pin, mobile, email, password, expectedErrors }) => {
     //Test case name dynamically set from scenario field in array
        test(`${scenario}`, async ({ page }) => {
     //Extended timout for slow website loading
        test.setTimeout(120000);
      //Login and navigate to New Customer page
      await login(page);
      await page.click('text=New Customer');
      //Fill all fields
      await page.fill('input[name="name"]', name);
      await page.fill('textarea[name="addr"]', address);
      await page.fill('input[name="city"]', city);
      await page.fill('input[name="state"]', state);
      await page.fill('input[name="pinno"]', pin);
      await page.fill('input[name="telephoneno"]', mobile);
      await page.fill('input[name="emailid"]', email);
      await page.fill('input[name="password"]', password);
      //Fill Date of Birth using evaluate
      await page.evaluate((dobValue) => {
        const dobField = document.querySelector('input[name="dob"]');
        dobField.value = dobValue;
        dobField.dispatchEvent(new Event('change', { bubbles: true }));
        dobField.dispatchEvent(new Event('blur', { bubbles: true }));
        dobField.dispatchEvent(new Event('keyup', { bubbles: true }));
      }, dob);
      //Click Submit
      await page.getByRole('button', { name: 'Submit' }).click();
      await page.waitForTimeout(2000);
      //Validate all expected error messages
      for (const error of expectedErrors) {
        await expect(page.locator('body')).toContainText(error);
      }
     });
  });
});