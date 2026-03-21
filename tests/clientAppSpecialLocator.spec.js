const {test,expect}=require("@playwright/test");

test.only("special Locator getBy", async ({page})=>{
  const email="dnyanumore97+rahulshetty@gmail.com";
  const productName="ZARA COAT 3";
  const countryname=" India";
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Dnyanu@123");
  await page.getByRole('button',{name:"Login"}).click();

  console.log(await page.locator("h5>b").first().textContent());

  //sometime this method is work for wait -where all network call made
  //await page.waitForLoadState("networkidle");

  //wait for locator to state
   await page.locator("h5>b").first().waitFor();
  console.log(await page.locator("h5>b").allTextContents());
 
  //all method- convert list of locator into an array
  //for each method can not handle asynchronus thats why not use 
  //we can't use break and continue in for each loop

  const cartBody= await page.locator("div.card-body").all();  //Promise<array>
  //.all() must be awaited: const elements = await locator.all();.
  
   await page.locator(".card-body").filter({hasText:`${productName}`}).getByRole('button', {name:" Add To Cart"}).click();

   await page.getByRole('listitem').getByRole('button',{name:"Cart"}).click();

   //verify productName is visible
   await page.locator("div li").first().waitFor();
    
   //const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   const bool=await page.getByText("ZARA COAT 3").isVisible();
   expect(bool).toBeTruthy();  //check true or false

   await page.getByRole('button',{name:"Checkout"}).click();

   await expect(page.locator(`.user__name label`)).toHaveText(email);

   await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:150});
   //pressSequentially -press one by one to get suggetion
   //fill-directly copy paste
    await page.locator("section.ta-results").waitFor();

    //const countries=page.locator("section.ta-results button");
    //count method count locator

    await page.getByRole('button',{name:`${countryname}`}).nth(1).click();
    await expect(page.getByPlaceholder("Select Country")).toHaveValue("India")
     await page.getByText("Place Order ").click();

     await expect(page.getByText(" Thankyou for the order. ")).toHaveText(" Thankyou for the order. ");

     //grab order Id
     const orderId=await page.locator("label.ng-star-inserted").textContent();
     const orderIdTxt=orderId.split("|")[1].trim();
            
     console.log(orderIdTxt); 
    //has(i)-traverse child to main parent
     await page.locator("[routerlink*='dashboard/myorders']:has(i)").click();

     //wait for table to load
     await page.locator("table").first().waitFor();

     const tableRows=page.locator("table tbody tr");

     for (let i = 0; i <await tableRows.count(); i++) {
       const txtId= await tableRows.nth(i).locator("th").textContent();
       if(txtId===orderIdTxt){
        await tableRows.nth(i).locator("td button.btn-primary").click();
        break;
       }
        
     }

    await page.locator(".email-title").first().waitFor();
     const finalId=await page.locator(".col-title+div").textContent();
     console.log(finalId);
     
    expect(finalId.trim()===orderIdTxt).toBeTruthy();
     //(finalId.trim()===orderId).toBeTruthy();


  
})

