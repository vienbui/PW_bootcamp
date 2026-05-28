import {Page,expect, test} from '@playwright/test';

//This test verifies that a user with valid credentials is successfully redirected to the inventory page after login. It confirms the expected URL and that the product list is visible.
/* TC01 — Login successfully with valid credentials
Objective: Verify standard user can log in and land on the product page
Precondition: Browser opened, navigate to https://www.saucedemo.com
Input:

Username: standard_user
Password: secret_sauce

Steps:

Fill username field
Fill password field
Click Login button

Expected Result:

URL changes to https://www.saucedemo.com/inventory.html
Page title "Swag Labs" is visible
Product list is visible (at least 1 product shown)

AC (must all pass):

 page.url() contains /inventory
 Element .inventory_list is visible
 No error message visible*/
 
test('001 - Login success', async ({page}) => {
    await page.goto(`https://www.saucedemo.com/`);
    await page.locator("#user-name").fill('standard_user');
    await page.locator("#password").fill('secret_sauce');
    await page.locator("#login-button").click()
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    await expect(page.locator(".inventory_list")).toBeVisible()
})

/*TC02 — Login fails with wrong password
Objective: Verify system shows error when password is incorrect
Precondition: Browser opened, navigate to https://www.saucedemo.com
Input:
Username: standard_user
Password: wrong_password
Steps:
Fill username field
Fill password field with wrong password
Click Login button
Expected Result:
Stay on login page (URL does not change)
Error message appears: "Epic sadface: Username and password do not match any user in this service"
AC (must all pass):
 page.url() does NOT contain /inventory
 Element [data-test="error"] is visible
 Error text matches exactly or contains the expected message*/

//"This test verifies that a user with an incorrect password cannot log in, remains on the login page, and sees a specific error message."

 test('TC02 — Login fails with wrong password', async ({page}) => {
    await page.goto(`https://www.saucedemo.com`)
    await page.locator("#user-name").fill('standard_user')
    await page.locator("#password").fill('wrong_password');
    await page.locator("#login-button").click()
    const errorMessage = page.locator("[data-test='error']")
    await expect (errorMessage).toBeVisible()
    await expect(errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service")   
    await expect(page).not.toHaveURL('/inventory')
 })

 test('TC03 — Login fails with empty credentials', async ({page}) => {
    await page.goto(`https://www.saucedemo.com`)
    await page.locator("#login-button").click()
    const errorMessage = page.locator("[data-test='error']")
    await expect (errorMessage).toBeVisible()
    await expect(errorMessage).toHaveText("Epic sadface: Username is required")
    await expect(page).not.toHaveURL('/inventory')
 })