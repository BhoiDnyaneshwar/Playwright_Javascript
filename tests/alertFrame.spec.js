const {test, expect}=require("@playwright/test");
const { log } = require("console");

test("Hidden Element handle,Frame,Alert", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.waitForTimeout(2000);
    // await page.goto("https://www.google.com/");

    /**
     * Page go ,back, forward
     */
    //page.goBack();
    //page.goForward();

    //Handle hidden Element
   await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    console.log(await  page.locator("#displayed-text").isVisible());
    
   await expect(page.locator("#displayed-text")).toBeHidden();
   await page.locator("#show-textbox").click();
   console.log( await page.locator("#displayed-text").isVisible());

   //handle Alert/dialong
   //once -it is handled only once, once done it remove
   //on -handled all alert

   page.once('dialog', async dialog=>{ 
    console.log(await dialog.message());
    await dialog.accept();
    //if you want pass string then use accept("string")
   })

   await page.locator("#alertbtn").click();
   


    //handle dialong before clicking on alert event

    page.on('dialog', async dialog=>{ 
    console.log(await dialog.message());
    await dialog.dismiss();
   })

   await page.locator("#confirmbtn").click();


   //frame handling
  // use  page.frameLocator() to handle frame it return frame object page/locator, by using this you can locate
  const framePage=await page.frameLocator("#courses-iframe")
  await framePage.getByRole('link', {name:"All Access plan"}).click();
  let textC=await framePage.locator("h2").first().textContent();
  console.log(textC.split(" ")[1]);
  


})