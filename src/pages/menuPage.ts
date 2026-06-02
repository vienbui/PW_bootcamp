import {Page} from '@playwright/test'

export class MenuPage {
  
    private page:Page;
    private burgerMenu = '#react-burger-menu-btn'
    private logoutBtn = '#logout_sidebar_link'
   
    constructor (page:Page){
        this.page = page;
    }

async logout(){
    await this.page.locator(this.burgerMenu).click()
    await this.page.locator(this.logoutBtn).click()

}
}