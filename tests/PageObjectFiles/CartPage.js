class CartPage {
    constructor(page) {
        this.page = page;
        this.btnCart = page.locator("[routerlink*='cart']");
        this.productBody = page.locator("div li").first();
        this.btnCheckout = page.locator("text=Checkout");

    }

    async cartBtnClick() {
        await this.btnCart.click();
    }

    async itemIsVisible(productName) {
        await this.productBody.waitFor();
        await this.page.locator("h3:has-text('" + productName + "')").isVisible();
    }

    async clickCheckout() {
        await this.btnCheckout.click();
    }
}


module.exports = { CartPage }