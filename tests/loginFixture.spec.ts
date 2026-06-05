
import {test, expect} from '../src/fixtures/index'

test.describe('Login Features', () => {
    test('TC01 — Login successfully with valid credentials', async ({page,loginPage, inventoryPage})=> {
        await loginPage.login("standard_user", "secret_sauce")

        await expect(page).toHaveURL('/inventory.html')
        await expect(inventoryPage.getLogo()).toBeVisible()
        await expect(inventoryPage.getItemList()).toBeVisible()
    })

    test('TC02 — Login fails with wrong password', async ({page,loginPage})=> {
        await loginPage.login("standard_user", "wrong_password")

        await expect(page).not.toHaveURL('/inventory.html')
        await expect(loginPage.getErrorMsg()).toBeVisible()
        await expect(loginPage.getErrorMsg()).toHaveText("Epic sadface: Username and password do not match any user in this service")
    })

    test('TC03 — Login fails with empty fields', async ({page,loginPage})=> {
        await loginPage.loginWithoutInput()

        await expect(page).not.toHaveURL('/inventory.html')
        await expect(loginPage.getErrorMsg()).toBeVisible()
        await expect(loginPage.getErrorMsg()).toContainText("Username is required")
    })

     test('TC04 — Add a product to cart', async ({loggedInInventoryPage,inventoryPage})=> {

        await inventoryPage.clickFirstAddButton()

        await expect(inventoryPage.getFirstAddButton()).toHaveText("Remove")
        await expect(inventoryPage.getCardIcon()).toBeVisible()
        await expect(inventoryPage.getCardIcon()).toHaveText("1")
    })

    test('TC05 — Logout successfully', async ({loggedInInventoryPage, page,loginPage, menuPage})=> {
        await menuPage.logout()
        await expect(page).toHaveURL('/')

        await page.goto('/inventory.html')
        await expect(page).toHaveURL('/')
        await expect(loginPage.getUserNameElement()).toBeVisible()



    })
})