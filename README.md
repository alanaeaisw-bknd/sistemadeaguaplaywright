# 🧪 Playwright E2E Tests — Sistema de Agua

Pruebas automatizadas end-to-end para el Sistema de Ventas de Agua.

---

## 📋 Requisitos Previos

- Node.js >= 16
- npm >= 8
- XAMPP corriendo con el proyecto en `localhost`
- Base de datos `sistemadeagua` importada y activa
- **Un usuario de prueba registrado** (ver sección de datos de prueba)

---

## 🚀 Instalación

```bash
# 1. Entrar a la carpeta del proyecto de pruebas
cd playwright-sistemadeagua

# 2. Instalar dependencias
npm install

# 3. Instalar navegadores de Playwright
npx playwright install chromium
```

---

## ⚙️ Configuración

Antes de correr las pruebas, **edita los datos de prueba** en los archivos:

- `tests/specs/login.spec.js` → línea `VALID_USER`
- `tests/specs/registro.spec.js` → el correo duplicado en TC-05
- `tests/specs/catalogo.spec.js` → línea `VALID_USER`
- `tests/specs/carrito.spec.js` → línea `VALID_USER`
- `tests/specs/checkout.spec.js` → línea `VALID_USER`

Cambia:
```js
const VALID_USER = {
  correo: 'TU_CORREO_REAL@correo.com',   // ← correo que existe en tu BD
  password: 'TU_PASSWORD_REAL',           // ← su contraseña
};
```

---

## ▶️ Ejecución de Pruebas

```bash
# Correr todas las pruebas
npx playwright test

# Correr con el navegador visible (headed)
npx playwright test --headed

# Correr solo un archivo
npx playwright test tests/specs/login.spec.js

# Correr en modo debug
npx playwright test --debug
```

---

## 📊 Generar Reporte HTML

```bash
# Ejecutar pruebas y abrir reporte automáticamente
npx playwright test --reporter=html
npx playwright show-report
```

El reporte se guarda en: `playwright-report/index.html`

---

## 📁 Estructura del Proyecto

```
playwright-sistemadeagua/
├── playwright.config.js          # Configuración principal
├── package.json
├── README.md
└── tests/
    ├── pages/                    # Page Object Model
    │   ├── LoginPage.js
    │   ├── RegisterPage.js
    │   ├── ProductosPage.js
    │   └── CarritoPage.js
    └── specs/                    # Casos de prueba
        ├── login.spec.js         # TC-01, TC-02, TC-03
        ├── registro.spec.js      # TC-04, TC-05, TC-06
        ├── catalogo.spec.js      # TC-07, TC-08, TC-09
        ├── carrito.spec.js       # TC-10, TC-11, TC-12
        └── checkout.spec.js      # TC-13, TC-14, TC-15
```

---

## 🗂️ Casos de Prueba Cubiertos

| ID    | Flujo          | Tipo       | Descripción                                      |
|-------|----------------|------------|--------------------------------------------------|
| TC-01 | Login          | Positivo   | Login exitoso con credenciales válidas           |
| TC-02 | Login          | Negativo   | Login fallido con contraseña incorrecta          |
| TC-03 | Login          | Edge Case  | Login bloqueado con campos vacíos                |
| TC-04 | Registro       | Positivo   | Registro exitoso con datos válidos               |
| TC-05 | Registro       | Negativo   | Registro fallido con correo duplicado            |
| TC-06 | Registro       | Edge Case  | Registro bloqueado con contraseña muy corta      |
| TC-07 | Catálogo       | Positivo   | Los 3 productos se muestran correctamente        |
| TC-08 | Catálogo       | Positivo   | Agregar al carrito muestra feedback visual       |
| TC-09 | Catálogo       | Negativo   | Acceso sin sesión redirige a login               |
| TC-10 | Carrito        | Positivo   | Carrito muestra productos y total correcto       |
| TC-11 | Carrito        | Negativo   | No se puede confirmar compra vacía               |
| TC-12 | Carrito        | Edge Case  | Eliminar producto actualiza el total             |
| TC-13 | Checkout       | Positivo   | API de venta responde con éxito                  |
| TC-14 | Checkout       | Negativo   | Acceso a ventas sin sesión redirige a login      |
| TC-15 | Checkout       | Positivo   | Mis Ventas muestra historial de compras          |

---

## ⚠️ Notas Importantes

- Las pruebas requieren que XAMPP esté **corriendo** en `localhost`
- TC-04 genera un correo único por timestamp para no duplicar registros
- TC-05 requiere que `test@correo.com` ya esté registrado en la BD
- El proyecto usa **Page Object Model** para mantener los selectores centralizados
