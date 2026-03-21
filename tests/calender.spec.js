const { test, expect } = require("@playwright/test");
import moment from 'moment';

test("Datepicker handling", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator("[class='react-date-picker__inputGroup']").click();

    const Month = "March";
    const day = "2";
    const year = "2027";

    const navmenu = page.locator("[class='react-calendar__navigation__label']");
    await navmenu.click();
    await navmenu.click();

    const yearsloc = page.$$("[class*='decade-view__years__year']");
    while (true) {

        for (const yloc of await yearsloc) {
            if (await yloc.textContent() === year) {
                await yloc.click();
                break;
            }

        }
        if (await navmenu.textContent() === year) {
            break;
        }
        else {
            page.locator("[class*='navigation__next-button']").click();
        }
    }

 await page.locator("[class*='year-view__months__month']").filter({hasText:Month}).click();
 await page.locator("[class*='month-view__days__day']").filter({hasText:day}).first().click();
     

})

test.only("another way to handle Date", async ({page})=>{
    const targetDate="10/02/2025";
    const dateObj = moment(targetDate, 'DD/MM/YYYY');
   const formatMonthYear= dateObj.format("MMMM YYYY")
   const formatDay= dateObj.format("D")
   console.log(formatMonthYear);
   console.log(formatDay);

   await page.goto("https://rahulshettyacademy.com/dropdownsPractise/");
   await page.locator(".ui-datepicker-trigger").first().click();
   await page.locator("#ui-datepicker-div").waitFor();

   while(true){
    const curentDateTxt=await page.locator(".ui-datepicker-title").first().textContent();
    const currentTxt=moment(curentDateTxt.trim(), "MMMM YYYY")
    //clear
    // ,console.log(curentDateTxt.trim());
    

     if (currentTxt.isBefore(formatMonthYear)) {
      await page.locator("text=Next").last().click();
    } else if (currentTxt.isAfter(formatMonthYear)) {
      await page.locator("text=Prev").last().click();
    } else {
      break; // Correct month reached
    }
   }
   
   await page.locator(".ui-state-default").filter({hasText:formatDay}).first().click();
})