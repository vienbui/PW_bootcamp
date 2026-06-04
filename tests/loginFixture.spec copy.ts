import {test, expect} from '../src/fixtures/index'


test.describe('Login feature', () => {
   

    test("TC01 — Login successfully with valid credentials", async({page,loginPage,inventoryPage }) => {
        await loginPage.login("standard_user", "secret_sauce")

        await expect(page).toHaveURL('/inventory.html')
        await expect(inventoryPage.getLogo()).toBeVisible()
        await expect(inventoryPage.getItemList()).toBeVisible()
    })

    test("TC02 — Login fails with wrong password", async({page,loginPage}) => {
        await loginPage.login("standard_user", "wrong_password")

        await expect(page).not.toHaveURL('/inventory.html')
        await expect(loginPage.getErrorMsg()).toBeVisible()
        await expect(loginPage.getErrorMsg()).toHaveText("Epic sadface: Username and password do not match any user in this service")
    })

    test("TC03 — Login fails with empty fields", async({page, loginPage}) => {
        await loginPage.loginWithoutInput()

        await expect(page).not.toHaveURL('/inventory.html')
        await expect(loginPage.getErrorMsg()).toBeVisible()
        await expect(loginPage.getErrorMsg()).toContainText("Username is required")
    })
     test("TC04 — Add a product to cart", async({loginPage,inventoryPage }) => {
        await loginPage.login("standard_user", "secret_sauce")

        await inventoryPage.clickFirstAddButton()
        await expect(inventoryPage.getFirstAddButton()).toContainText("Remove")
        await expect(inventoryPage.getCardIcon()).toBeVisible()
        await expect(inventoryPage.getCardIcon()).toContainText("1")

    })
    test("TC05 — Logout successfully", async({page,loginPage, inventoryPage, menuPage}) => {
        await loginPage.login("standard_user", "secret_sauce")

        await menuPage.logout()

        await expect(page).toHaveURL('/')
        await expect(loginPage.getUserNameElement()).toBeVisible()
        await inventoryPage.navigateToInventoryPage()
        await expect(page).toHaveURL('/')


    })

})    


/* 
TC02 — Login fails with wrong password
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
 Error text matches exactly or contains the expected message


TC03 — Login fails with empty fields
Objective: Verify system shows error when both fields are empty
Precondition: Browser opened, navigate to https://www.saucedemo.com
Input:

Username: (empty)
Password: (empty)

Steps:

Leave both fields empty
Click Login button

Expected Result:

Stay on login page
Error message: "Epic sadface: Username is required"

AC (must all pass):

 page.url() does NOT contain /inventory
 Element [data-test="error"] is visible
 Error text contains "Username is required"


TC04 — Add a product to cart
Objective: Verify user can add a product and cart count updates
Precondition: User is already logged in as standard_user
Steps:

Login (reuse steps from TC01)
Click "Add to cart" on the first product
Check cart icon

Expected Result:

Cart badge shows number 1
Button text changes from "Add to cart" to "Remove"

AC (must all pass):

 Element .shopping_cart_badge is visible
 .shopping_cart_badge has text "1"
 First product's button text is "Remove"


TC05 — Logout successfully
Objective: Verify user can logout and is redirected to login page
Precondition: User is already logged in as standard_user
Steps:

Login (reuse steps from TC01)
Click hamburger menu (top left)
Click "Logout"

Expected Result:

Redirected back to login page
Login form is visible
Cannot access inventory page without logging in again

AC (must all pass):

 page.url() equals https://www.saucedemo.com/
 Element #user-name (username input) is visible
 Navigating to /inventory.html directly redirects back to login


Pass Criteria — End of Week 2
You pass week 2 when ALL of the following are true:
CriteriaTargetWrite all 5 TCs from blank fileUnder 25 minutesAll 5 tests pass5/5 greenNo looking at old code or notes0 referencesCan explain each test in English2–3 sentences per testCommit history shows daily rewritesAt least 8 commits

*/