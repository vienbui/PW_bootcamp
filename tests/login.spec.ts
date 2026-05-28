import {Page,expect, test} from '@playwright/test';

test('login success', async ({page}) => {
    await page.goto(`https://www.saucedemo.com/`);
    await page.locator("#user-name").fill('standard_user');
    await page.locator("#password").fill('secret_sauce');
    await page.locator("#login-button").click()
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    await expect(page.locator(".inventory_list")).toBeVisible()
})