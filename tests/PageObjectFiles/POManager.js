const {LoginPage}=require("./LoginPage")
const {DashboardPage}=require("./DashboardPage")
const {CartPage}=require("./CartPage")
const {OrderPage}=require("./OrderPage")
const {OrderReviewPage}=require("./OrderReviewPage")
const {OrderHistoryPage}=require("./OrderHistoryPage")

class POManager{
constructor(page){
    this.page=page;
    this.loginPage=new LoginPage(this.page);
    this.dashboardPage=new DashboardPage(this.page);
    this.cartPage=new CartPage(this.page);
    this.orderPage=new OrderPage(this.page);
    this.orderReviewPage=new OrderReviewPage(this.page)
    this.orderHistoryPage=new OrderHistoryPage(this.page);
}

getLoginPage(){
    return this.loginPage;
}

getDashboardPage(){
    return this.dashboardPage;
}

getCartPage(){
    return this.cartPage;
}

getOrderPage(){
    return this.orderPage;
}

getReviewPage(){
    return this.orderReviewPage;
}

getOrderHistoryPage(){
    return this.orderHistoryPage;
}

}



module.exports={POManager};