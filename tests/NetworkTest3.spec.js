const {test,expect}=require("@playwright/test");

test("abort method , To blcok the response call that render to browser", async ({page})=>{
    const email="dnyanumore97+rahulshetty@gmail.com";
  const productName="ZARA COAT 3";
  const countryname=" India";
  

    //abort
    //  **/* --> this refer any url
    // then pass . extension to block this file
  await page.route("**/*.css", async (route)=>{
        route.abort();
        //abort block all the file that having .css extension
    })

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Dnyanu@123");

  //before login i just blkc image
  await page.route("**/*.{png,jpeg,jpg}", async (route)=>{
        route.abort();
        //abort block all the file that having .css extension
    })
  await page.locator("#login").click();

  console.log(await page.locator("h5>b").first().textContent());
  await page.pause();
})