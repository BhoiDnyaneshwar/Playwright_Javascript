//Mock the request
//If we hit Url to the page and this url is refer to login user that have productOrdertID concat with the URl
//If same URL that is hit by another user then he shows some message-you haven't permission

//This is possible in Request mock

//before clicking on button ,Playwright help us to mock request/response/abort

const { test, expect, request } = require("@playwright/test")
const { APIUtils } = require("./APIWEB_Opt/APIUtils.js")

const loginPayload = { userEmail: "dnyanumore97+rahulshetty@gmail.com", userPassword: "Dnyanu@123" };
const createOrderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let fakePayLoadOrders = { data: [], message: "No Orders" };
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtilObj = new APIUtils(apiContext, loginPayload);
    response = await apiUtilObj.createOrder(createOrderPayload);
})

test('Mock Requeset To Unauth user', async ({page})=>{
        await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[routerlink*='dashboard/myorders']:has(i)").click();

    //Mock request
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", async (route)=>{
        route.continue({url:"https://rahulshettyacademy.com/client/#/dashboard/order-details/69b154fcf86ba51a65f9fb2m"})
    })

    await page.locator("button:has-text('View')").first().click();
   // await page.pause();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    console.log(await page.locator("p").last().textContent());
    
})