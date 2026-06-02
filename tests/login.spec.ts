import {test, expect} from '@playwright/test'
import { LoginPage } from '../src/pages/loginPage'
import {InventoryPage} from '../src/pages/inventoryPage'
import { MenuPage } from '../src/pages/menuPage';


test.describe('Login tests',() => {
    let loginPage : LoginPage;
    let inventoryPage: InventoryPage;
    let menuPage: MenuPage;
    
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page) 
        inventoryPage = new  InventoryPage(page)
        menuPage = new MenuPage(page)
        await loginPage.gotoLoginPage()
    })

test('TC01 — Login successfully with valid credentials', async ({page}) => {
    
    await loginPage.login("standard_user", "secret_sauce")

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    await expect(page.locator(".app_logo")).toBeVisible()
    await expect(page.locator(".inventory_list")).toBeVisible()

})
test('TC02 — Login fails with wrong password', async ({page}) => {
    
   
    await loginPage.login("standard_user", "wrong_password")
   
    await expect(page).not.toHaveURL("https://www.saucedemo.com/inventory.html")
    const errorMsg = loginPage.getErrorMessage()
    await expect(errorMsg).toBeVisible()
    await expect(errorMsg).toHaveText("Epic sadface: Username and password do not match any user in this service")

})

test('TC03 — Login fails with empty fields', async ({page}) => {
   
   await loginPage.clickLoginButton()

    await expect(page).not.toHaveURL("https://www.saucedemo.com/inventory.html")
    const errorMsg = loginPage.getErrorMessage()
    await expect(errorMsg).toBeVisible()
    await expect(errorMsg).toContainText("Username is required")

})
test('TC04 — Add a product to cart', async ({page}) => {

    await loginPage.login("standard_user", "secret_sauce")


    await inventoryPage.addFirstItemToCart()

    await expect(inventoryPage.getFirstItemButton()).toContainText("Remove")

    await expect(inventoryPage.getCartBadge()).toBeVisible()
    await expect(inventoryPage.getCartBadge()).toContainText("1")

})

test('TC05 — Logout successfully', async ({page}) => {

    await loginPage.login("standard_user", "secret_sauce")

    await menuPage.logout()
   
    await expect(page).toHaveURL("https://www.saucedemo.com")
    await expect(page.locator("#user-name")).toBeVisible()

    await page.goto("https://www.saucedemo.com/inventory.html")
    await expect(page).toHaveURL("https://www.saucedemo.com")
})

})


