import {Page, Locator} from '@playwright/test'

export class MenuPage {
    private page:Page
    private hamburgerMenu: Locator
    private logoutLink: Locator

    constructor(page:Page) {
        this.page = page

        this.hamburgerMenu = page.locator('#react-burger-menu-btn')
        this.logoutLink = page.locator("#logout_sidebar_link")

    }
     async logout(){
        await this.hamburgerMenu.click()
        await this.logoutLink.click()
    }
}