const basetest = require("@playwright/test");

//basetest having default behaviour
//extend this to create a new object and provide  data fixture into it
//so it is available to all files

exports.customtest=basetest.test.extend(
    {
        fixtureTestDataset: {
            username: "dnyanumore97+rahulshetty@gmail.com",
            password: "Dnyanu@123",
            productName: "ZARA COAT 3",
            countryname: " India"
        }
    }
)
