// tests/pages/RegisterPage.js
class RegisterPage {
  constructor(page) {
    this.page = page;
    this.nombreInput    = page.locator('#nombre');
    this.correoInput    = page.locator('#correo');
    this.passwordInput  = page.locator('#password');
    this.telefonoInput  = page.locator('#telefono');
    this.submitButton   = page.locator('button[type="submit"]');
    this.errorMessage   = page.locator('.alert.alert-danger');
    this.successMessage = page.locator('.alert.alert-success');
  }

  async goto() {
    await this.page.goto('/SistemaDeAgua/views/register.html');
  }

  async register(nombre, correo, password, telefono = '') {
    await this.nombreInput.waitFor({ state: 'visible' });
    await this.nombreInput.fill(nombre);
    await this.correoInput.fill(correo);
    await this.passwordInput.fill(password);
    if (telefono) await this.telefonoInput.fill(telefono);
    await this.submitButton.click();
  }
}

module.exports = { RegisterPage };
