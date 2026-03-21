class APIUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayload
        })
        let loginResponseJson = await loginResponse.json();
       const token = loginResponseJson.token;
       console.log(token);
       
        return token;
    }

    async createOrder(createOrderPayload) {
        let response = {};
        response.token =await  this.getToken();
        const createOrder = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: createOrderPayload,
                headers: {
                    'content-type': 'application/json',
                    'authorization': response.token
                }
            }
        )
        const responseCreateOrder = await createOrder.json();
        const orderIdResponse = responseCreateOrder.orders[0];
        response.orderIdResponse = orderIdResponse;
        return response;
    }
}

module.exports={APIUtils};