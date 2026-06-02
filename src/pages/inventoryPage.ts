import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    private page:Page
    private firstAddButton: Locator;
    private itemList: Locator;
    private cartIcon: Locator;
    private appLogo: Locator;

    constructor(page: Page) {
        this.page = page;

        this.firstAddButton = this.page.locator(".inventory_item:first-child button")
        this.itemList = this.page.locator(".inventory_list")
        this.cartIcon = this.page.locator(".shopping_cart_badge")
        this.appLogo = this.page.locator(".app_logo")

    }
    
    async navigateToInventoryPage(){
        await this.page.goto("https://www.saucedemo.com/inventory.html")
    }

    getAppLogoInventory(){
        return this.appLogo
    }

    getItemListAppear(){
        return this.itemList
    }

    async addFirstItem(){
        await this.firstAddButton.click()
    }

    getFirstAddButtonStatus(){
        return this.firstAddButton
    }

    getCardIcon(){
        return this.cartIcon
    }
 
}