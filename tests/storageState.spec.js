const {test,expect, request}=require("@playwright/test")
let globalContext;

test.beforeAll(async ({browser})=>{
    const email="dnyanumore97+rahulshetty@gmail.com";
    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Dnyanu@123");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');

    await context.storageState({path:'state.json'});
    globalContext= await browser.newContext({storageState:'state.json'})
})

test('Client App', async ()=>{
  const email="dnyanumore97+rahulshetty@gmail.com";
  const productName="ZARA COAT 3";
  const countryname=" India";

  //storageState
  const page=await globalContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");

  console.log(await page.locator("h5>b").first().textContent());

  //sometime this method is work for wait -where all network call made
  //await page.waitForLoadState("networkidle");

  //wait for locator to state
   await page.locator("h5>b").first().waitFor();
  console.log(await page.locator("h5>b").allTextContents());
})