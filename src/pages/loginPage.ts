import {Page} from '@playwright/test'

export class LoginPage {
    private page:Page;
     private usernameInput = '#user-name'
    private passwordInput = '#password'
    private loginButton = '#login-button'
    private errorMessage = '[data-test="error"]'

    constructor (page:Page){
        this.page = page;
    }

async gotoLoginPage(){
     await this.page.goto("https://www.saucedemo.com")
}
async inputUserName(username: string){
    await this.page.locator(this.usernameInput).fill(username) 
}

async inputPassword(password: string){
    await this.page.locator(this.passwordInput).fill(password)
}

async clickLoginButton(){
    await this.page.locator(this.loginButton).click()
}

async login ( username: string, password: string){
    await this.inputUserName(username)
    await this.inputPassword(password)
    await this.clickLoginButton()
}

getErrorMessage(){
    return this.page.locator(this.errorMessage)

}
}

