import {expect, test} from '@playwright/test'


test ("TC01 — Login successfully with valid credentials", async ({page}) => {
    await page.goto('https://www.saucedemo.com')
    await page.locator("#user-name").fill("standard_user")
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click()

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    await expect(page.locator(".inventory_list")).toBeVisible()
    await expect(page.locator(".app_logo")).toContainText("Swag Labs")

})

test ("TC02 — Login fails with wrong password", async ({page}) => {
    await page.goto('https://www.saucedemo.com')
    await page.locator("#user-name").fill("standard_user")
    await page.locator("#password").fill("wrong_password")
    await page.locator("#login-button").click()

    await expect(page).not.toHaveURL("/inventory")
    await expect(page.locator("[data-test='error']")).toBeVisible()
    await expect(page.locator("[data-test='error']")).toHaveText("Epic sadface: Username and password do not match any user in this service")
    

})
test ("TC03 — Login fails with empty fields", async ({page}) => {
    await page.goto('https://www.saucedemo.com')
    
    await page.locator("#login-button").click()

    await expect(page).not.toHaveURL("https://www.saucedemo.com/inventory.html")
    await expect(page.locator("[data-test='error']")).toBeVisible()
    await expect(page.locator("[data-test='error']")).toHaveText("Epic sadface: Username is required")

})

test("TC04 — Add a product to cart", async({page}) => {
    await page.goto('https://www.saucedemo.com')
    await page.locator("#user-name").fill("standard_user")
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click()

    await page.locator(".inventory_item:first-child button").click()

    await expect(page.locator(".inventory_item:first-child button")).toHaveText("Remove")
    await expect(page.locator(".shopping_cart_badge")).toBeVisible()
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1")
})

test("TC05 — Logout successfully", async ({page})=> {
    await page.goto('https://www.saucedemo.com')
    await page.locator("#user-name").fill("standard_user")
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click()

    await page.locator("#react-burger-menu-btn").click()
    await page.locator("#logout_sidebar_link").click()

    await expect(page).toHaveURL("https://www.saucedemo.com")
    await expect(page.locator("#user-name")).toBeVisible()

    await page.goto('https://www.saucedemo.com/inventory.html')
    await expect(page).toHaveURL("https://www.saucedemo.com")

})