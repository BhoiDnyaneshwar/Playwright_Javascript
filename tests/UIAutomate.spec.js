const { test, expect } = require("@playwright/test");

test("Handling RadioBtn,checkbox,dropdown", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Play with Dropdown
    const dropdown = page.locator("select.form-control");
    //select by value
    await dropdown.selectOption("teach");
    //select by text
    await dropdown.selectOption("Student");
    console.log(await dropdown.inputValue())

    //select by index
    await dropdown.selectOption({ index: 2 });
    console.log(await dropdown.inputValue())

    //select by label
    await dropdown.selectOption({ label: "Student" });
    console.log(await dropdown.inputValue())

    const selectedText = await page.$eval('select.form-control',
        selectElement => selectElement.options[selectElement.selectedIndex].textContent
    );

    console.log('Selected Option Text:', selectedText);

    // radioButtons

    await page.locator("input+.checkmark").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator("input+.checkmark").last()).toBeChecked();
    console.log(await page.locator("input+.checkmark").last().isChecked());

    //checkbox
    //click()- check on unbox
    //check()- check on unbox
    //uncheck()- uncheck on box
    const checkBox = page.locator("#terms");
    await checkBox.click();
    console.log("checkbox is checked", await checkBox.isChecked());

    await checkBox.uncheck();
    console.log("checkbox is Unchecked", await checkBox.isChecked());

    //verify link is blinking or not
    //if it is blinking then it have class name like=class="blinkingText"

    const blinkLink = page.locator("[href*='documents-request']");
    await expect(blinkLink).toHaveAttribute('class', 'blinkingText');


    await page.pause();
})


// click on blink link and get text from there and return to page 1 and enter in user Id
test.only("traverse to multiple window", async ({ browser }) => {
    //if we have context , we can create new page
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#userEmail");
    const blinkLink = page.locator("[href*='documents-request']");

    // we have to use Promise.all-> to listen all event parallel
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkLink.click()
    ]
    );

    //new page
    const domain = newPage.locator("p.red");
    const domainText = await domain.textContent();
    console.log(domainText);
    const email = domainText.split('@')[1].split(' ')[0];

    //go to older page
    await page.locator("#username").fill("");
    await page.locator("#username").fill(email);
    await page.bringToFront();
    console.log(await page.locator("#username").inputValue());
    await page.pause();

   const pages= context.pages();
   console.log(pages.length);
   



})