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


test.only("place order product on rahulshettyacademy.com/client", async ({ page }) => {

    const email = "dnyanumore97+rahulshetty@gmail.com";
    const productName = "ZARA COAT 3";
    const countryname = " India";


    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)

    await page.goto("https://rahulshettyacademy.com/client");

    //Mock response
    //Got API response when click on order-Mock response with playwright-send back to bowser
    //-render data on browser

    //before clicking we have to route, so when some URL is encountered then it route 
    //what we have mentioned

    //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/62f34dede26b7e1a10f5c805",
      async  (route)=>{
       const actResponse= await page.request.fetch(route.request());
       const fakeBody= JSON.stringify(fakePayLoadOrders);
       //mock response
       route.fulfill({
        actResponse,
        fakeBody
       })

    })

    await page.locator("[routerlink*='dashboard/myorders']:has(i)").click();
    //when click on link we atleast wait for response
    //so it won't have network disposal
    //so both should be in sync one after another

   await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
      console.log(await page.locator(".mt-4").textContent());

});