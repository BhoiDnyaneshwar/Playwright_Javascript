const { test, expect, testInfo } = require("@playwright/test");
const { customtest } = require("../CreateOrderTestData/fixtureDataset");
const { POManager } = require("./PageObjectFiles/POManager")
const webUtil=require("../tests/PageObjectFiles/webUtil");

//convert Json data to javascript object
const jsObjectData = JSON.parse(JSON.stringify(require("../CreateOrderTestData/TestData.json")));
test.describe.configure({ mode: "serial" })
let orderIdTxt;
test("@smoke Page object model client APP", async ({ page }, testInfo) => {
    const poManager = new POManager(page);
    await test.step("I'm login as specialist to client APP", async () => {
        await poManager.getLoginPage().goTo();
        await poManager.getLoginPage().loginToAPP(jsObjectData.username, jsObjectData.password);
        await webUtil.testInformation(testInfo, page, "Login successfully");
    });

    await test.step("When I added product to Add to Cart", async () => {
        await poManager.getDashboardPage().addProductToCart(jsObjectData.productName);
        await webUtil.testInformation(testInfo, page, "Addded Cart successfully");
    })

    await test.step("And I click on Cart button", async () => {
        await poManager.getCartPage().cartBtnClick();
        await webUtil.testInformation(testInfo, page, "cart button clicked");

    })

    await test.step("And I click on checkout button", async () => {
        await poManager.getCartPage().itemIsVisible(jsObjectData.productName)
        await poManager.getCartPage().clickCheckout();
        await webUtil.testInformation(testInfo, page, "checkout is clicked");
    })

    await test.step("And I place the order", async () => {
        await expect(poManager.getOrderPage().getUsernameTxt()).toHaveText(jsObjectData.username);
        await poManager.getOrderPage().selectCountry(jsObjectData.countryname);
        //await expect(await getCounry.toContainText(jsObjectData.countryname)).toBeTruthy();
        await poManager.getOrderPage().placeOrder();
        await webUtil.testInformation(testInfo, page, "Place order successfully");
    })

    await test.step(`Then I should see the message ${jsObjectData.successMessage}`, async () => {
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        orderIdTxt = await poManager.getReviewPage().getOrderID();
        await webUtil.testInformation(testInfo, page, "success Message");
    })

    await test.step("Then I should see Final Id display in Order History Page ", async () => {
        await poManager.getOrderHistoryPage().clickOnOrders();
        const finalId = await poManager.getOrderHistoryPage().verifyOrderIsPresent(orderIdTxt);
        expect(finalId.trim() === orderIdTxt).toBeTruthy();
        await webUtil.testInformation(testInfo, page, "verify final Id");
    });

})

customtest("@smoke @regression Page object model client APP fixtureDataSet", { tag: ["@adhoc", "@regression"] }, async ({ page, fixtureTestDataset }) => {
    const poManager = new POManager(page);

    await poManager.getLoginPage().goTo();
    await poManager.getLoginPage().loginToAPP(fixtureTestDataset.username, fixtureTestDataset.password);
    await poManager.getDashboardPage().addProductToCart(fixtureTestDataset.productName);
    await poManager.getCartPage().cartBtnClick();
    await poManager.getCartPage().itemIsVisible(fixtureTestDataset.username)
    await poManager.getCartPage().clickCheckout();
    await expect(poManager.getOrderPage().getUsernameTxt()).toHaveText(fixtureTestDataset.username);
    await poManager.getOrderPage().selectCountry(fixtureTestDataset.countryname);
    //await expect(await getCounry.toContainText(jsObjectData.countryname)).toBeTruthy();
    await poManager.getOrderPage().placeOrder();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderIdTxt = await poManager.getReviewPage().getOrderID();
    await poManager.getOrderHistoryPage().clickOnOrders();
    const finalId = await poManager.getOrderHistoryPage().verifyOrderIsPresent(orderIdTxt);
    expect(finalId.trim() === orderIdTxt).toBeTruthy();
})

