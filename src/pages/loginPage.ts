import {Page, Locator} from '@playwright/test'
export class LoginPage {
    private page:Page
    private userName: Locator
    private password: Locator
    private loginButton: Locator
    private errorMsg: Locator

    constructor(page:Page) {
        this.page = page
        this.userName = page.locator('#user-name')
        this.password = page.locator('#password')
        this.loginButton = page.locator('#login-button')
        this.errorMsg = page.locator('[data-test="error"]')

    }

    async navigateToLoginPage(){
        await this.page.goto('https://www.saucedemo.com/')
    }

    async inputUserName(userName:string){
        await this.userName.fill(userName)
    }

    async inputPassword(password:string){
        await this.password.fill(password)
    }

    async clickLoginButton(){
        await this.loginButton.click()
    }

    async login(userName:string,password:string ){
        await this.inputUserName(userName)
        await this.inputPassword(password)
        await this.clickLoginButton()
    }

    async loginWithoutInput(){
        await this.clickLoginButton()
    }

    getErrorMsg(){
        return this.errorMsg
    }

     getUserNameElement(){
        return this.userName
    }
}