// TC-01, TC-02, TC-03 — Flujo: Inicio de Sesión
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

// ⚠️ Cambia por un usuario que YA exista en tu BD
const VALID_USER = {
  correo: 'alan@test.com',
  password: '123456',
};

test.describe('Flujo 1: Inicio de Sesión', () => {

  // TC-01 | POSITIVO — Login exitoso
  test('TC-01 | Login exitoso con credenciales válidas', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();

    await expect(page).toHaveTitle(/Sistema de Agua|Iniciar/i);
    await lp.login(VALID_USER.correo, VALID_USER.password);

    // app.js muestra alert-success y luego redirige a dashboard.php tras 1s
    await expect(lp.successMessage).toBeVisible({ timeout: 8000 });
    await page.waitForURL(/dashboard\.php/i, { timeout: 10000 });
    expect(page.url()).toContain('/SistemaDeAgua/views/dashboard.php');
  });

  // TC-02 | NEGATIVO — Contraseña incorrecta
  test('TC-02 | Login fallido con contraseña incorrecta', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();

    await lp.login(VALID_USER.correo, 'contrasenaMAL999');

    // app.js llama showAlert con 'danger' → .alert.alert-danger
    await expect(lp.errorMessage).toBeVisible({ timeout: 8000 });
    // Sigue en login
    expect(page.url()).toContain('/SistemaDeAgua/views/login.html');
  });

  // TC-03 | EDGE CASE — Campos vacíos
  test('TC-03 | Login bloqueado con campos vacíos (validación HTML5)', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();

    // Click sin llenar nada — HTML5 required bloquea el submit
    await lp.submitButton.click();

    // El input tiene required → validity.valueMissing = true
    const valueMissing = await lp.correoInput.evaluate(el => el.validity.valueMissing);
    expect(valueMissing).toBe(true);

    // No redirigió
    expect(page.url()).toContain('/SistemaDeAgua/views/login.html');
  });

});
