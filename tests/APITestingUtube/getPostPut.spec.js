const { test, request, expect } = require("@playwright/test")
const path = require("path")
const fs = require("fs")

let apiContext;
let tokenTxt;
let userIdTxt;
let productIdTxt;
let orderRespTxt;

//You can use request api context to call any http method-Sma efor like Get, post, put , delete, patch
//for path param directly use / 
//for query param use param:{}

test.describe("Verify client App API", async () => {

    //Post
    test("Verify Post Login API", async ({ page }) => {
        console.log( process.env.USERNAME);
        console.log( process.env.PASSWORD);

        apiContext = await request.newContext({
            baseURL: "https://rahulshettyacademy.com/"
        });

        //it returns the object
        let resposne = await apiContext.post("api/ecom/auth/login", {
            data: {
                "userEmail": process.env.USERNAME,
                "userPassword": process.env.PASSWORD
            }
        })
        const res = await resposne.json();
        //resposne.status()  - Return number
        //resposne.statusText()   - Return text
        expect(resposne.status()).toBe(200);
        expect(resposne.statusText()).toEqual("OK");

        tokenTxt = res.token;
        userIdTxt = res.userId;

    })

    //here request fixturte directlty act as apicontext instead of creatinfg newContex
    // You cannot use both form and multipart keys in the same request. To include regular form fields along with your file, you must nest all fields inside the multipart object.

    test("Create Product API Post", async ({ request }) => {

        // const filePath = path.join(__dirname, "../../bata.jpg");   //it just join string ---Go level2 ../../
        //const filePath = path.resolve(__dirname, "../../bata.jpg");   //it found abs path and __dirname points to the folder
        //const filePath = path.resolve(__dirname, "../../boatWatch.webp"); 
        const filePath = path.resolve(process.cwd(), "watch.jpg");
        const image = fs.createReadStream(filePath);  //it for larger file  -read it in smaller pieces

        //const image = fs.readFileSync(filePath);  for smaller file -it rerad at once

        const respo = await request.post("https://rahulshettyacademy.com/api/ecom/product/add-product",
            {
                headers: {
                    Authorization: tokenTxt
                },
                multipart: {
                    productName: "Boat Watch",
                    productAddedBy: userIdTxt,
                    productCategory: "fashion",
                    productSubCategory: "Watch",
                    productPrice: 999,
                    productDescription: "Boat Originals",
                    productFor: "men-women",
                    productImage: image

                }
            }
        )
        const createResp = await respo.json();
        productIdTxt = createResp.productId;
        expect(respo.ok()).toBeTruthy();
        //console.log(await respo.json());


    });

    test("Create Order", async () => {
       const orderResp = await apiContext.post("api/ecom/order/create-order", {
            headers: {
                Authorization: tokenTxt
            },
            data: {
                orders: [{ country: "India", productOrderedId: productIdTxt }]
            }
        })
        console.log(await orderResp.json());
       const resp1= await orderResp.json();
      orderRespTxt= resp1.orders[0];

    })


    //Get method
    //get produc t details

    //Using the params Property (Recommended)
//This is the cleanest way. Playwright will automatically append ?key=value to your URL.

    test("getOrder Details", async () => {
        const getRespo = await apiContext.get("api/ecom/order/get-orders-details",
            {
                params: {
                    id: orderRespTxt
                },
                headers: {
                    Authorization: tokenTxt
                }
            }
        )
        console.log(await getRespo.json());

    })
})

//delete api
test("Delete product", async () => {
    apiContext.delete(`api/ecom/product/delete-product/${productIdTxt}`, {
        headers: {
            Authorization: tokenTxt
        }
    })
})
