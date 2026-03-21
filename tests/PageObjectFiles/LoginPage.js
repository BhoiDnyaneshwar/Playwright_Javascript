class LoginPage {
    constructor(page) {
        this.page = page
        this.userName = page.locator("#userEmail")
        this.password = page.locator("#userPassword")
        this.btnLogin = page.locator("#login")
       
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async loginToAPP(username, password) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.btnLogin.click();
        await this.page.waitForLoadState("networkidle");
       
    }

}

module.exports = { LoginPage };