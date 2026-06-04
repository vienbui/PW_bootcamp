import {test as base} from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { InventoryPage } from '../pages/inventoryPage'
import {MenuPage} from '../pages/menuPage'

type MyFixtures ={
    loginPage: LoginPage
    inventoryPage: InventoryPage
    menuPage : MenuPage
}

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.navigateToLoginPage()
        await use(loginPage) 
    },

     inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page)
        await use(inventoryPage) 
    },
    menuPage: async ({ page }, use) => {
        const menuPage = new MenuPage(page)
        await use(menuPage) 
    }

})

export { expect } from '@playwright/test'
