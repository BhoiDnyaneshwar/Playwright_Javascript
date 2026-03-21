const {test, expect} = require("@playwright/test");

test("get Title of Page", async ({browser})=>{
   const context= await browser.newContext();
   const page= await context.newPage();
   const userName=page.locator("#username");
   const password=page.locator("#password");
   const btnSignIn=page.locator("#signInBtn");


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   let title= await page.title();
   console.log(title);
   await userName.fill("rahulshettyacademy")
   await password.fill("Dnyanu");
   await btnSignIn.click();

   const errorMsg=await page.locator("[style*='block']").textContent();
   console.log(errorMsg);
   
   await expect(page.locator("[style*='block']")).toContainText("Incorrect");

   //login now
     await password.fill("");
     await password.fill("Learning@830$3mK2");
     await btnSignIn.click();

     //elements
    console.log(await page.locator("div>h4>a").nth(1).textContent());
    console.log(await page.locator("div>h4>a").first().textContent());
    console.log(await page.locator("div>h4>a").last().textContent());

    //It basically return array of strings.
    //allTextContents- method not having inbuilt wait mechanism
    //if it wrote it returns a blank array
    console.log(await page.locator("div>h4>a").allTextContents());
    
});

test.only("rahulshettyacademy.com/client", async ({page})=>{
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill("dnyanumore97+rahulshetty@gmail.com");
  await page.locator("#userPassword").fill("Dnyanu@123");
  await page.locator("#login").click();

  console.log(await page.locator("h5>b").first().textContent());
})

test("get google title", async ({page})=>{  
    await page.goto("https://www.google.com/");
   let title= await page.title();
   console.log(title);
   await expect(page).toHaveTitle("Google")
   
});
