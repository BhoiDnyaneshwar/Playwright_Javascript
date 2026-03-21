const {test,expect} =require("@playwright/test")
//scenario-If user login
//after login he is inactive for hour
//then after 1 hr is automatically logout

test('Security Test', async ({browser})=>{
const context=await browser.newContext();
const page=await context.newPage();
   const email="dnyanumore97+rahulshetty@gmail.com";
//   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
//   await page.locator("#userEmail").fill(email);
//   await page.locator("#userPassword").fill("Dnyanu@123");
//   await page.locator("#login").click();
await  page.clock.install();
await page.goto("https://demos.telerik.com/aspnet-ajax/notification/examples/sessiontimeout/defaultvb.aspx?skin=BlackMetroTouch");



//it return all the resolved promise if all resolved.
// const [newPage]=await Promise.all([
//   context.waitForEvent('page'),
//   demo.click()
// ]);


  //to perform this scenario-install clock api
   
    await page.clock.fastForward(3*60*1000);
    //await page.clock.runFor(5*60*1000);

 const logmsg=  await page.locator("#form1").filter({hasText:"Your Session has expired!"}).textContent();
 console.log(logmsg);
 
    await page.pause();
})