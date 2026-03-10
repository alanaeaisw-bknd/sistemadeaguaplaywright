// tests/pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.correoInput    = page.locator('#correo');
    this.passwordInput  = page.locator('#password');
    this.submitButton   = page.locator('button[type="submit"]');
    this.errorMessage   = page.locator('.alert.alert-danger');
    this.successMessage = page.locator('.alert.alert-success');
  }

  async goto() {
    await this.page.goto('/SistemaDeAgua/views/login.html');
  }

  async login(correo, password) {
    await this.correoInput.waitFor({ state: 'visible' });
    await this.correoInput.fill(correo);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

module.exports = { LoginPage };
