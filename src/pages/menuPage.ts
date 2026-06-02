import {Page,Locator} from '@playwright/test'

export class MenuPage {
    private page: Page

    private hambugerMenu: Locator
    private logoutBtn: Locator

    constructor(page:Page){
        this.page = page

        this.hambugerMenu = page.locator("#react-burger-menu-btn")
        this.logoutBtn = page.locator("#logout_sidebar_link")
    }

    async logout(){
        await this.hambugerMenu.click()
        await this.logoutBtn.click()
    }

}