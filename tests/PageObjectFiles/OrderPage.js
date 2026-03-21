class OrderPage {
    constructor(page) {
        this.page = page;
        this.txtemail = page.locator(".user__name>label");
        this.txtCountry = page.locator("[placeholder='Select Country']")
        this.appearCountry = page.locator("section.ta-results button");
        this.btnPlaceOrder = page.locator(".action__submit");
    }

    getUsernameTxt() {
        return this.txtemail
    }

    async selectCountry(countryName) {
        await this.txtCountry.pressSequentially(countryName.trim().substring(0, 4), { delay: 150 });
        await this.page.locator("section.ta-results").waitFor();
        for (let i = 0; i < await this.appearCountry.count(); i++) {
            if (await this.appearCountry.nth(i).textContent() === countryName) {
                await this.appearCountry.nth(i).click();
                break;
            }
        }
    }

    async placeOrder() {
        await this.btnPlaceOrder.click();
    }
}

module.exports = { OrderPage }