import {Page, Locator} from '@playwright/test'
export class InventoryPage {
    private page:Page
    private logo: Locator
    private itemList: Locator
    private firstAddButton: Locator
    private cartIcon: Locator

    constructor(page:Page) {
        this.page = page
        this.logo = page.locator('.app_logo')
        this.itemList = page.locator('.inventory_list')
        this.firstAddButton = page.locator('.inventory_item:first-child button')
        this.cartIcon = page.locator('.shopping_cart_badge')

    }

    async navigateToInventoryPage(){
        await this.page.goto('https://www.saucedemo.com/inventory.html')
    }

    getLogo(){
        return this.logo
    }

     getItemList(){
        return this.itemList
    }

    async clickFirstAddButton(){
        await this.firstAddButton.click()
    }

    getFirstAddButton(){
        return this.firstAddButton
    }

     getCardIcon(){
        return this.cartIcon
    }

}