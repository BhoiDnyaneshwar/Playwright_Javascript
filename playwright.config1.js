// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  timeout: 30 * 1000,  //milisec
  retries:1 ,
  workers:3,
  expect: {
    timeout: 40 * 1000  //it replace default  -default is 30 sec
  },
  //reporter: "html",
  reporter:[['html'],["line"],["allure-playwright", { outputFolder: 'allure-results'}]],

  projects: [
    {
      name:"chromeTest",
      use: {
        browserName: "chromium",
        headless: false,
        ignoreHtttpsError:true,
        Permissions:['geolocation'],
        viewport: null, // Set viewport to null
        launchOptions: {
          args: ['--start-maximized']
          // Add this argument
        },
        screenshot: "on",
        video:"on",
        trace: "on",
        //...devices:['']

      }
    },
    {
      name:"firefoxTest",
      use: {
        browserName: "firefox",
        headless: false,
        viewport: {width:720, height:720}, // Set viewport to nul
        screenshot: "on",
        video:"on",
        trace: "on"

      }
    },
    {
      name:"chromeBrowser",
      use:{
        ...devices['Desktop Chrome']
      }
    }
  ]



};

module.exports = config;

