# Plantilla de Pull Request

## Descripción
Describe los cambios que has realizado y la motivación detrás de ellos.

## Tipo de cambio
¿Qué tipo de cambio introduce este PR? Marca todas las que apliquen:
- [ ] **feat**: Una nueva característica
- [ ] **fix**: Corrección de un bug
- [ ] **docs**: Cambios en la documentación
- [ ] **refactor**: Refactorización de código
- [ ] **test**: Agregar pruebas faltantes o corregir pruebas existentes
- [ ] **chore**: Tareas de mantenimiento, actualizaciones de dependencias

## Checklist
- [ ] El código sigue las guías de estilo del proyecto (ESLint + Prettier)
- [ ] La compilación TypeScript tiene éxito (`pnpm typecheck`)
- [ ] Las pruebas unitarias locales pasan (`pnpm test`)
- [ ] Issue/feature vinculado (referencia con `Fixes #issue-number` o `See #issue-number`)
- [ ] El mensaje de commit sigue el formato `tipo: descripcion` (según CONTRIBUTING.md)
- [ ] Solicitado al menos 1 revisor teammate

## Issue vinculada

Referencia la Issue relacionada con este PR:

- `Fixes #N`: Si este PR completa la tarea y debe cerrar la Issue.
- `Refs #N`: Si este PR está relacionado, pero no completa la tarea.

**Ejemplo:** `Fixes #12`

## Notas adicionales
Añade cualquier contexto adicional, capturas de pantalla o instrucciones especiales aquí.
