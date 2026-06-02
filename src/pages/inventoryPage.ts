import {Page} from '@playwright/test'

export class InventoryPage {
    private page:Page;
     private firstAddBtn = '.inventory_item:first-child button'
    private cardBadge = '.shopping_cart_badge'
   

    constructor (page:Page){
        this.page = page;
    }

    async addFirstItemToCart(){
        await this.page.locator(this.firstAddBtn).click()
    }

    getCartBadge(){
        return this.page.locator(this.cardBadge)
    }
    
    getFirstItemButton(){
       return this.page.locator(this.firstAddBtn)
    }
}

