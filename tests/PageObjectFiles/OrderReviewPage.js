class OrderReviewPage {
    constructor(page) {
        this.page = page;
        this.orderId = page.locator("label.ng-star-inserted");
    }

    async getOrderID() {
        const orderId = await this.orderId.textContent();
        return orderId.split("|")[1].trim();
    }
}

module.exports = { OrderReviewPage }