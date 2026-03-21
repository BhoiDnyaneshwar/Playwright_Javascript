const {test,expect,request}=require("@playwright/test")
const {APIUtils} =require("./APIUtils")

const loginPayload={userEmail: "dnyanumore97+rahulshetty@gmail.com", userPassword: "Dnyanu@123"};
const createOrderPayload={orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

let response;

test.beforeAll(async ()=>{
    const apiContext=await request.newContext();
    const apiUtilObj=new APIUtils(apiContext,loginPayload);
    response=await apiUtilObj.createOrder(createOrderPayload);
})

test.only("place order product on rahulshettyacademy.com/client", async ({page})=>{
  const email="dnyanumore97+rahulshetty@gmail.com";
  const productName="ZARA COAT 3";
  const countryname=" India";
  
  
  //add requestScript to page so that it byass login when we launch the url
  //and it's automatically login
  await page.addInitScript(value=>{
    window.localStorage.setItem('token',value);
  },response.token)

  await page.goto("https://rahulshettyacademy.com/client");

     await page.locator("[routerlink*='dashboard/myorders']:has(i)").click();

     //wait for table to load
     await page.locator("table").first().waitFor();

     const tableRows=page.locator("table tbody tr");

     for (let i = 0; i <await tableRows.count(); i++) {
       const txtId= await tableRows.nth(i).locator("th").textContent();
       if(txtId===response.orderIdResponse){
        await tableRows.nth(i).locator("td button.btn-primary").click();
        break;
       }
        
     }

    await page.locator(".email-title").first().waitFor();
     const finalId=await page.locator(".col-title+div").textContent();
     console.log(finalId);
     
    expect(finalId.trim()===response.orderIdResponse).toBeTruthy();
     //(finalId.trim()===orderId).toBeTruthy();


})

