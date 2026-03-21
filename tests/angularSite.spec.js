const {test, expect}=require("@playwright/test");

test("Get By Locator Practise", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    //check checkbox by using label
    //having label tag or aria label
    await page.getByLabel("Check me out if you Love IceCreams!").click();

    //select dropdown
    await page.getByLabel("Gender").selectOption({label:"Female"});

    //radio button
    await page.getByLabel("Employed").check();

    //placeholder value
    await page.getByPlaceholder("Password").fill("ABC123");

    //Role
   await page.getByRole("button", {name:"Submit"}).click();

   await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
   await page.getByRole('link',{name:"Shop"}).click();

   //click on Nokia
   await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button",{name:"Add"}).click();
});