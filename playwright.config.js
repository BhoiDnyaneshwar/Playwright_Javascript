// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';
const dotenv =require("dotenv");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });


//you can pass any name to variable to take from shell cmd
//just use this while run $env:TEST_ENV='test'
//another way from package.json cross-env
dotenv.config({
  path:process.env.TEST_ENV ? `./.env.${process.env.TEST_ENV}` : `./.env.test`
})

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
     headless: true,
      viewport: null, // Set viewport to null
        launchOptions: {
          args: ['--start-maximized'] 
            // Add this argument
        },
        screenshot:"on",
  trace:"on",
  video:"on"
        
  }
  
};

module.exports=config;

