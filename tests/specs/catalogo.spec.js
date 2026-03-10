// TC-07, TC-08, TC-09 — Flujo: Catálogo de Productos
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductosPage } = require('../pages/ProductosPage');

const VALID_USER = { correo: 'alan@test.com', password: '123456' };

async function doLogin(page) {
  const lp = new LoginPage(page);
  await lp.goto();
  await lp.login(VALID_USER.correo, VALID_USER.password);
  await page.waitForURL(/dashboard\.php/i, { timeout: 10000 });
}

test.describe('Flujo 3: Catálogo de Productos', () => {

  // TC-07 | POSITIVO — 3 productos visibles
  test('TC-07 | Catálogo muestra los 3 productos disponibles', async ({ page }) => {
    await doLogin(page);
    const pp = new ProductosPage(page);
    await pp.goto();
    await pp.waitForProducts();

    // app.js genera exactamente 3 .producto-card (los 3 de la BD)
    await expect(pp.productCards).toHaveCount(3);

    const texto = await page.textContent('body');
    expect(texto).toMatch(/Botella|Galón|Garrafón/i);
  });

  // TC-08 | POSITIVO — Agregar al carrito muestra alert
  test('TC-08 | Agregar producto al carrito muestra confirmación', async ({ page }) => {
    await doLogin(page);
    const pp = new ProductosPage(page);
    await pp.goto();
    await pp.waitForProducts();

    await pp.addFirstProductToCart();

    // app.js llama showAlert('X producto(s) agregado(s) al carrito', 'success')
    await expect(pp.alertMsg).toBeVisible({ timeout: 8000 });
    const texto = await pp.alertMsg.textContent();
    expect(texto).toMatch(/agregado|carrito/i);
  });

  // TC-09 | NEGATIVO — Sin sesión redirige a login
  test('TC-09 | Acceso al catálogo sin sesión redirige a login', async ({ page }) => {
    // Sin hacer login, ir directo
    await page.goto('/SistemaDeAgua/views/productos.php');

    // app.js en DOMContentLoaded llama checkAuth() y si falla → login.html
    await page.waitForURL(/login\.html/i, { timeout: 10000 });
    expect(page.url()).toContain('/SistemaDeAgua/views/login.html');
  });

});
