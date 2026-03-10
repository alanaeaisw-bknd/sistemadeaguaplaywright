// tests/pages/CarritoPage.js
class CarritoPage {
  constructor(page) {
    this.page = page;
    // app.js genera: <div id="carrito-container">
    this.container      = page.locator('#carrito-container');
    // Cuando hay items genera tabla con clase "carrito-tabla"
    this.tabla          = page.locator('.carrito-tabla');
    this.carritoItems   = page.locator('.carrito-tabla tbody tr');
    // Total: <div class="carrito-total-monto">
    this.totalMonto     = page.locator('.carrito-total-monto');
    // Botón pago: onclick="irADatosFiscales()"
    this.btnProceder    = page.locator('button.btn-success');
  // Botón eliminar: class="btn btn-danger btn-sm"
    this.btnEliminar    = page.locator('.btn.btn-danger.btn-sm').first();
    // Carrito vacío: <div class="carrito-vacio">
    this.carritoVacio   = page.locator('.carrito-vacio');
    // Alertas
    this.alertMsg       = page.locator('.alert');
  }

  async goto() {
    await this.page.goto('/SistemaDeAgua/views/carrito.php');
  }

  async waitForLoad() {
    await this.container.waitFor({ state: 'visible', timeout: 10000 });
  }
}

module.exports = { CarritoPage };
