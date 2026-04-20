import {test, expect} from '@playwright/test';
import { login } from '../../utils/loginHelper';
//Create Smoke Test suite
test.describe('Login Module-Smoke',()=>{
  //Create Test case for valid login credentials
      test('TC001-Login with Valid Credentials',async({page})=>{
       //Calling Utility function for default values 
        await login(page);
       //Validate page URL have "Specific Text"
         await expect(page).toHaveURL(/demo.guru99.com/);
       //Validate Welcome message  
         await expect(page.locator('body')).toContainText(`Manger Id : ${process.env.GURU99_USERNAME}`);
       //Validate page have "Specific Title"
        await expect(page).toHaveTitle(/Guru99 Bank Manager HomePage/);
      });
});