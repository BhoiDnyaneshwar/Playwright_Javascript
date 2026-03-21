class DashboardPage {

    constructor(page) {
        this.page = page;
        this.cartBody = this.page.locator("div.card-body")
        this.CartItems = this.page.locator("h5>b").first();
        this.btnAddToCart = this.page.locator("text= Add To Cart");
    }
    /*
        async addProductToCart(productName) {
            await this.page.waitForSelector(this.CartItems);
            const allCartBody = await this.cartBody;
            for (const ele of allCartBody) {
                const itemTxt = await ele.locator("h5>b").textContent();
                if (itemTxt === productName) {
                    await ele.locator("text= Add To Cart").click();
                    break;
                }
            }
        }
            */
    async addProductToCart(productName) {
        await this.CartItems.waitFor();
        const allCartBody = await this.cartBody.all();;
        for (const ele of allCartBody) {
            const itemTxt = await ele.locator("h5>b").textContent();
            if (itemTxt === productName) {
                await ele.locator("text= Add To Cart").click();
                break;
            }
        }
    }

    //     async addProductToCart(productName) {
    //    await this.CartItems.waitFor();

    //     const count = await this.cartBody.count();
    //     for (let i = 0; i < count; i++) {
    //         const card = this.cartBody.nth(i);
    //         const itemTxt = (await card.locator("h5 > b").textContent())?.trim();
    //         if (itemTxt === productName) {
    //             await card.locator("text=Add To Cart").click();
    //             return;
    //         }
    //     }
    //     throw new Error(`Product not found: ${productName}`);
    // }

}

module.exports = { DashboardPage }