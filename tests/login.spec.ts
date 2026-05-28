import {Page,expect, test} from '@playwright/test';

//This test verifies that a user with valid credentials is successfully redirected to the inventory page after login. It confirms the expected URL and that the product list is visible.
 
test('001 - Login success', async ({page}) => {
    await page.goto(`https://www.saucedemo.com/`);
    await page.locator("#user-name").fill('standard_user');
    await page.locator("#password").fill('secret_sauce');
    await page.locator("#login-button").click()
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    await expect(page.locator(".inventory_list")).toBeVisible()
})


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

 test("TC04 — Add a product to cart", async ({page}) => {
    await page.goto(`https://www.saucedemo.com/`);
    await page.locator("#user-name").fill('standard_user');
    await page.locator("#password").fill('secret_sauce');
    await page.locator("#login-button").click()
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    await expect(page.locator(".inventory_list")).toBeVisible()
    await page.locator(".inventory_item:first-child button").click()
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1")
   await expect(page.locator(".inventory_item:first-child button")).toHaveText("Remove")

 })

 test("TC05-Logout", async ({page}) => {
   await page.goto(`https://www.saucedemo.com/`);
    await page.locator("#user-name").fill('standard_user');
    await page.locator("#password").fill('secret_sauce');
    await page.locator("#login-button").click()
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    await expect(page.locator(".inventory_list")).toBeVisible()
    await page.locator("#react-burger-menu-btn").click()
    
 })