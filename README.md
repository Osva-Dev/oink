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

### Iniciar el servidor en desarrollo

```bash
pnpm dev
```

El servidor quedará disponible en `http://localhost:3000`.

## Estructura del Proyecto EDA

A continuación se describe la estructura de carpetas por capas:

### Capa `src/domain/`
Reglas de negocio puras, independientes de eventos o librerías:
- `entities/` - Modelos de dominio (ej. Order, User, Product)
- `value-objects/` - Objetos de valor inmutables (ej. Money, Email)

### Capa `src/application/`
Casos de uso y lógica de aplicación:
- `use-cases/` - Coordinación de negocio (ej. CreateOrderUseCase, RegisterUser)
- `dtos/` - Objetos de transferencia de datos para entrada/salida de casos de uso

### Capa `src/events/`
Definición y contratos de eventos:
- `definitions/` - Clases/schemas de eventos (ej. OrderCreatedEvent.ts, UserRegisteredEvent.ts)
- `types/` - Tipos o interfaces compartidas para eventos

### Capa `src/messaging/`
Configuración del Message Broker (Kafka, RabbitMQ, etc.):
- `client.ts` - Conexión al Message Broker
- `publisher.ts` - Lógica genérica para publicar eventos
- `subscriber.ts` - Lógica genérica para registrar suscriptores

### Capa `src/modules/`
Organización por dominio o funcionalidad (cada módulo es autónomo):
- `orders/` - Módulo de pedidos
  - `producers/` - Emisión de eventos (ej. OrderCreatedProducer)
  - `consumers/` - Reacción a eventos (ej. SendEmailOnOrderCreated)
  - `handlers/` - Manejadores específicos de la lógica del evento
- `payments/` - Módulo de pagos
  - `producers/` - Emisores de eventos de pago
  - `consumers/` - Consumidores de eventos de pago
- `auth/` - Módulo de autenticación (añadido recientemente)
  - `producers/` - Eventos de auth (ej. UserRegistered, TokenRefreshed)
  - `consumers/` - Suscriptores a eventos de auth
  - `handlers/` - Lógica específica de autenticación

### Capa `src/infrastructure/`
Adaptadores externos (BD, APIs, servicios terceros):
- `database/` - Conexiones y repositorios (ORM, SQL/NoSQL)
- `external-services/` - Clientes HTTP externos

### Raíz del proyecto
- `src/main.ts` - Punto de entrada / composición de dependencias (Bootstrap)
- `tests/` - Pruebas unitarias e integración por productor/consumidor
- `package.json` y `tsconfig.json` - Configuración del proyecto

---

## Ejemplo de uso: Módulo de Autenticación

A continuación se muestra un ejemplo práctico usando el módulo `auth` implementado con el patrón EDA:

```text
src/
├── domain/
│   └── entities/
│       └── User.ts                  # Entidad de usuario de negocio
├── events/
│   └── definitions/
│       └── UserRegisteredEvent.ts   # Contrato/Schema del evento
├── messaging/
│   └── broker.ts                      # Cliente simulado de mensajería (Kafka/RabbitMQ)
└── modules/
    └── auth/
        ├── use-cases/
        │   └── RegisterUser.ts      # Caso de uso que registra y dispara el evento
        ├── producers/
        │   └── AuthEventProducer.ts # Publicador del evento de autenticación
        └── consumers/
            └── WelcomeEmailConsumer.ts # Escucha el evento para enviar el correo
```

### Flujo de trabajo:

1. **RegisterUser use case** se ejecuta y crea un nuevo usuario
2. **UserRegisteredEvent** se dispare como consecuencia del caso de uso
3. **AuthEventProducer** publica el evento al Message Broker
4. **WelcomeEmailConsumer** se suscribe y reacciona enviando el correo de bienvenida

Este patrón permite desacoplar los componentes: el caso de uso no necesita saber quién consumirá el evento, y los consumidores pueden agregarse o retirarse sin modificar la lógica de negocio.
