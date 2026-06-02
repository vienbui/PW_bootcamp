import { Page, Locator } from '@playwright/test';
export class LoginPage{
    private page:Page;
    private userName: Locator
    private password: Locator
    private loginBtn: Locator
    private errorMsg: Locator
    
    constructor (page:Page){
        this.page = page

        this.userName = page.locator("#user-name")
        this.password = page.locator("#password")
        this.loginBtn = page.locator("#login-button")
        this.errorMsg = page.locator('[data-test="error"]')
    }

    async navigateToLoginPage(){
        await this.page.goto("https://www.saucedemo.com")
    }

    getUserNameField(){
        return this.userName
    }

    async inputUserName(userName:string){
        await this.userName.fill(userName)
    }

    async inputPassword(pwd:string){
        await this.password.fill(pwd)
    }
   
     async clickLoginBtn(){
        await this.loginBtn.click()
    }

     async login(userName:string,pwd:string ){
        await this.inputUserName(userName)
        await this.inputPassword(pwd)
        await this.clickLoginBtn()
    }
    async loginWithEmptyUserNameAndPassword(){
        await this.clickLoginBtn()
    }

    getErrorMsg(){
        return this.errorMsg
    }
}