const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  // Use the correct login page URL
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

  // Fill in login credentials using robust selectors
  await page.fill('#userEmail', 'dnyanumore97+rahulshetty@gmail.com');
  await page.fill('#userPassword', 'Dnyanu@123');
  await page.click('#login', {button:"middle"});

  // Wait for dashboard element after login
  await page.waitForSelector('.headcolor, .card-body, .toast-message', { timeout: 10000 });

  // Try to capture a success message or dashboard heading
  let successMsg = '';
  try {
    // Allure success toast
    successMsg = await page.textContent('.toast-message');
  } catch (e) {
    // Fallback: check for dashboard heading
    try {
      successMsg = await page.textContent('.headcolor');
    } catch (e2) {
      // Fallback: check for card body (dashboard content)
      try {
        successMsg = await page.textContent('.card-body');
      } catch (e3) {
        successMsg = 'No success message found, but login may have succeeded.';
      }
    }
  }

  console.log('Login Success Message:', successMsg);

  // Optionally, verify dashboard loaded
  if (await page.url().includes('/dashboard')) {
    console.log('User successfully logged in and dashboard loaded.');
  } else {
    console.log('Login failed or dashboard not loaded.');
  }

  await browser.close();
})();
