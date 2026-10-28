# Oink: Plataforma de gestión financiera personal


## Objetivo:
Una API backend que permita a una persona registrar su dinero, controlar presupuestos y metas, detectar gastos atípicos y proyectar su futuro financiero.

## Requisitos previos
- [Node.js](https://nodejs.org/) (>= 24)
- [pnpm](https://pnpm.io/es) (12.15.0)

## Configuración del entorno 

Copia el archivo de variables de entorno y ajústalo según sea necesario:

```bash
cp .env.example .env
```

## Convención de ramas

Las ramas se nombran con el formato **`tipo/modulo`**:

```
tipo/modulo
```

Ejemplos:

- `feat/auth`
- `feat/sales`
- `fix/catalog`
- `chore/deps`

### Tipos de rama

| Tipo     | Uso                                         |
| -------- | ------------------------------------------- |
| `feat`   | Nueva funcionalidad                         |
| `fix`    | Corrección de errores                       |
| `refactor` | Cambios de código sin alterar comportamiento |
| `docs`   | Cambios en documentación                    |
| `chore`  | Tareas de mantenimiento                      |
| `test`   | Cambios en pruebas                          |

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

### Iniciar el servidor en desarrollo

```bash
pnpm dev
```

El servidor quedará disponible en `http://localhost:3000`.
