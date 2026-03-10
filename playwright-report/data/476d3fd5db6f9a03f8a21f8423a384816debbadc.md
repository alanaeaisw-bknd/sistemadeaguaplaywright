# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]: 💧
    - heading "Crear Cuenta" [level=1] [ref=e6]
    - paragraph [ref=e7]: Regístrate para comenzar
  - generic [ref=e8]:
    - generic [ref=e9]:
      - generic [ref=e10]: Nombre Completo *
      - textbox "Nombre Completo *" [ref=e11]:
        - /placeholder: Juan Pérez
        - text: Usuario Duplicado
    - generic [ref=e12]:
      - generic [ref=e13]: Correo Electrónico *
      - textbox "Correo Electrónico *" [ref=e14]:
        - /placeholder: tu@correo.com
        - text: alan@test.com
    - generic [ref=e15]:
      - generic [ref=e16]: Teléfono
      - textbox "Teléfono" [ref=e17]:
        - /placeholder: "6181234567"
        - text: "6181234567"
    - generic [ref=e18]:
      - generic [ref=e19]: Contraseña *
      - textbox "Contraseña *" [ref=e20]:
        - /placeholder: ••••••••
        - text: Test1234!
      - text: Mínimo 6 caracteres
    - generic [ref=e21]:
      - generic [ref=e22]: Confirmar Contraseña *
      - textbox "Confirmar Contraseña *" [active] [ref=e23]:
        - /placeholder: ••••••••
    - button "Registrarse" [ref=e24] [cursor=pointer]
  - generic [ref=e25]:
    - text: ¿Ya tienes cuenta?
    - link "Inicia sesión aquí" [ref=e26] [cursor=pointer]:
      - /url: login.html
```