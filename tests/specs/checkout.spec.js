// TC-13, TC-14, TC-15 — Flujo: Checkout y Ventas
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

const VALID_USER = { correo: 'alan@test.com', password: '123456' };

async function doLogin(page) {
  const lp = new LoginPage(page);
  await lp.goto();
  await lp.login(VALID_USER.correo, VALID_USER.password);
  await page.waitForURL(/dashboard\.php/i, { timeout: 10000 });
}

test.describe('Flujo 5: Checkout y Ventas', () => {

  // TC-13 | POSITIVO — API venta responde correctamente
  test('TC-13 | API de venta responde con éxito o error controlado', async ({ page }) => {
    await doLogin(page);

    // Interceptar la respuesta de la API de venta
    const [response] = await Promise.all([
      page.waitForResponse(
        res => res.url().includes('/SistemaDeAgua/views/ventas.php'),
        { timeout: 15000 }
      ).catch(() => null),
      (async () => {
        await page.goto('/SistemaDeAgua/views/carrito.php');
        await page.waitForLoadState('networkidle');
        const btn = page.locator('button.btn-success');
        const visible = await btn.isVisible().catch(() => false);
        if (visible) await btn.click();
      })()
    ]);

    if (response) {
      // La API debe responder 200 (éxito) o 400 (sin datos fiscales) — nunca 500
      expect([200, 400]).toContain(response.status());
    } else {
      // No había items en el carrito — botón no apareció
      const vacio = await page.locator('.carrito-vacio').isVisible().catch(() => false);
      expect(vacio).toBeTruthy();
    }
  });

  // TC-14 | NEGATIVO — Sin sesión redirige a login
  test('TC-14 | Acceso a mis ventas sin sesión redirige a login', async ({ page }) => {
    await page.goto('/SistemaDeAgua/views/ventas.php');
    await page.waitForURL(/login\.html/i, { timeout: 10000 });
    expect(page.url()).toContain('/SistemaDeAgua/views/login.html');
  });

  // TC-15 | POSITIVO — Historial de ventas carga correctamente
  test('TC-15 | Mis Ventas muestra historial o mensaje de sin ventas', async ({ page }) => {
    await doLogin(page);
    await page.goto('/SistemaDeAgua/views/ventas.php');
    await page.waitForLoadState('networkidle');

    // app.js genera tabla .ventas-tabla o mensaje "No tienes ventas"
    const tieneTabla = await page.locator('.ventas-tabla').isVisible().catch(() => false);
    const sinVentas  = await page.locator('text=No tienes ventas').isVisible().catch(() => false);

    expect(tieneTabla || sinVentas).toBeTruthy();
  });

});
