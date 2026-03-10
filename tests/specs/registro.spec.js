// TC-04, TC-05, TC-06 — Flujo: Registro de Usuario
const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');

const ts = Date.now();

test.describe('Flujo 2: Registro de Usuario', () => {

  // TC-04 | POSITIVO — Registro exitoso
  test('TC-04 | Registro exitoso con datos válidos', async ({ page }) => {
    const rp = new RegisterPage(page);
    await rp.goto();

    await rp.register(
      'Usuario Test',
      `usuario${ts}@correo.com`,
      'Test1234!',
      '6181234567'
    );

    // app.js muestra alert-success y redirige a dashboard.php
    await expect(rp.successMessage).toBeVisible({ timeout: 8000 });
    await page.waitForURL(/dashboard\.php/i, { timeout: 10000 });
    expect(page.url()).toContain('/SistemaDeAgua/views/dashboard.php');
  });

  // TC-05 | NEGATIVO — Correo duplicado
  test('TC-05 | Registro fallido con correo ya registrado', async ({ page }) => {
    const rp = new RegisterPage(page);
    await rp.goto();

    // Usar correo que YA existe en tu BD
    await rp.register(
      'Usuario Duplicado',
      'alan@test.com',
      'Test1234!',
      '6181234567'
    );

    // Debe mostrar error
    await expect(rp.errorMessage).toBeVisible({ timeout: 8000 });
    expect(page.url()).toContain('/SistemaDeAgua/views/register.html');
  });

  // TC-06 | EDGE CASE — Campos vacíos
  test('TC-06 | Registro bloqueado con campos obligatorios vacíos', async ({ page }) => {
    const rp = new RegisterPage(page);
    await rp.goto();

    // Click sin llenar nada
    await rp.submitButton.click();

    // HTML5 required bloquea el submit
    const valueMissing = await rp.nombreInput.evaluate(el => el.validity.valueMissing);
    expect(valueMissing).toBe(true);
    expect(page.url()).toContain('/SistemaDeAgua/views/register.html');
  });

});
