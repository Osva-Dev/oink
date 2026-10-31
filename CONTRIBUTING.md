# Estrategia de Ramificación (GitFlow)

Utilizamos el flujo de trabajo **GitFLow** para gestionar el ciclo de vida de desarrollo. Por favor sigue estas pautas antes de escribir código o abrir un Pull Request.

---

## Las ramas principales
El repositorio mantiene dos ramas de largo plazo:
* **`main`** : Código limpio y estable que está en producción.
* **`develop`** : Rama principal de desarrollo. Aquí se integran todas las nuevas funciones terminadas para la próxima versión. **Es la rama por defecto**

---
## Ramas Temporales y Convención de Nombres

Todas las ramas temporales deben crearse a partir de una rama específica y eliminarse después de integrarse.

- `develop`: Código estable en producción. No se commitea directamente.
- `feat/*`: Para nuevas funcionalidades (creada desde `develop`).
- `bugfix/*`: Para corrección de errores.
- `hotfix/*`: Para parches urgentes en producción.

## Convención de nombres

Las ramas se nombran con el formato **`tipo/nombre-desarrollador-descripcion-modulo`**:

```
tipo/nombre-desarrollador-descripcion-modulo
```

Ejemplos:

- `feat/amethdev-auth-module` 

### Tipos de rama

| Tipo     | Uso                                         |
| -------- | ------------------------------------------- |
| `feat`   | Nueva funcionalidad                         |
| `fix`    | Corrección de errores                       |
| `refactor` | Cambios de código sin alterar comportamiento |
| `docs`   | Cambios en documentación                    |
| `chore`  | Tareas de mantenimiento                      |
| `test`   | Cambios en pruebas                          |


---

## Flujo de Trabajo para Desarrolladores

### Para desarrollar una nueva funcionalidad:
1. Asegúrate de estar en `develop` actualizado:  
   `git checkout develop && git pull origin develop`
2. Crea tu rama:  
   `git checkout -b feat/amethdev-auth-module`
3. Trabaja en tus cambios y haz commits significativos.
4. Sube tu rama a GitHub:  
   `git push origin feat/amethdev-auth-module`
5. Abre un **Pull Request (PR) apuntando hacia `develop`**.

---

## Reglas de Integración (Pull Requests)

Para que un código sea fusionado en `develop` o `main`, debe cumplir:
* **Revisiones:** Se requiere la aprobación de al menos **1 compañero de equipo** (Code Review).
* **Pruebas (CI):** El pipeline de integración automatizada debe pasar exitosamente (si aplica).
* **Limpieza:** Una vez hecho el *Merge*, la rama temporal (`feature/*` o `bugfix/*`) debe ser eliminada de GitHub para mantener el repositorio limpio.

## Convención de commits

Los mensajes de commit siguen el formato **`tipo: descripcion`** en minúsculas:

```
tipo: descripcion
```

Ejemplos:

- `feat: agregar modelo User y rol de usuario en Prisma`
- `fix: corregir puerto de conexion de Prisma a PostgreSQL`
- `refactor: simplificar configuracion del datasource`
- `docs: actualizar README con instrucciones de instalacion`

### Tipos de commit

| Tipo      | Uso                                          |
| --------- | -------------------------------------------- |
| `feat`    | Nueva funcionalidad                          |
| `fix`     | Corrección de errores                        |
| `refactor`| Cambios de código sin alterar comportamiento |
| `docs`    | Cambios en documentación                     |
| `chore`   | Tareas de mantenimiento                       |
| `test`    | Cambios en pruebas                           |
| `style`   | Cambios de formato sin afectar lógica         |
