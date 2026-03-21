class OrderHistoryPage {
    constructor(page) {
        this.page = page;
        this.btnorder = page.locator("[routerlink*='dashboard/myorders']:has(i)");
        this.tableRows = page.locator("table tbody tr");
        this.orderId=page.locator(".col-title+div");
    }

    async clickOnOrders() {
        await this.btnorder.click();
    }

    async verifyOrderIsPresent(orderIdTxt) {
        await this.page.locator("table").first().waitFor();
        for (let i = 0; i < await this.tableRows.count(); i++) {
            const txtId = await this.tableRows.nth(i).locator("th").textContent();
            if (txtId === orderIdTxt) {
                await this.tableRows.nth(i).locator("td button.btn-primary").click();
                break;
            }
        }
       await this.page.locator(".email-title").first().waitFor();
       return await this.orderId.textContent();
    }
}

module.exports = { OrderHistoryPage }