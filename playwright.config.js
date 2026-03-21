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
const config={
  testDir: './tests',
  timeout:30*1000,  //milisec
  expect : {
    timeout:40*1000  //it replace default  -default is 30 sec
  },
  // reporter:"html",
  reporter:[["line"],["allure-playwright", { outputFolder: 'allure-results'}]],

   use: {
     browserName:"chromium",
     headless: false,
      viewport: null, // Set viewport to null
        launchOptions: {
          args: ['--start-maximized'] 
            // Add this argument
        },
        screenshot:"on",
  trace:"on"
        
  }
  
};

module.exports=config;

