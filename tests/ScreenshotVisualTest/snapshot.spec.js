const { test, expect, request } = require("@playwright/test")
test("Take screenshot", async ({page})=>{
     const email="dnyanumore97+rahulshetty@gmail.com";
     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Dnyanu@123");

  
  await page.locator("#login").click();
  //screenshot
  await page.screenshot({path:'loginpage.png'});
  console.log(await page.locator("h5>b").first().textContent());

  await page.locator(".card").filter({hasText:"ZARA COAT 3"}).screenshot({path:"partial.png"})

  //perform visual-Playwright help us to match exact screenshot-thier alighnment,pixel
   await page.locator("h5>b").first().waitFor();
   expect(await page.screenshot()).toMatchSnapshot('homePage.png');

})