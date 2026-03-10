// tests/pages/ProductosPage.js
class ProductosPage {
  constructor(page) {
    this.page = page;
    // app.js genera divs con clase "producto-card"
    this.productCards  = page.locator('.producto-card');
    // Botón generado: <button class="btn btn-primary btn-block" onclick="agregarAlCarrito(...)">
    this.addToCartBtns = page.locator('.producto-card .btn-primary');
    // showAlert crea .alert.alert-success o .alert.alert-danger
    this.alertMsg      = page.locator('.alert');
  }

  async goto() {
    await this.page.goto('/SistemaDeAgua/views/productos.php');
  }

  async waitForProducts() {
    await this.productCards.first().waitFor({ state: 'visible', timeout: 10000 });
  }

  async addFirstProductToCart() {
    await this.addToCartBtns.first().click();
  }

  async waitForAlert() {
    await this.alertMsg.waitFor({ state: 'visible', timeout: 8000 });
    return await this.alertMsg.textContent();
  }
}

module.exports = { ProductosPage };
