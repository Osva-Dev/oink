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

A continuación se presenta el árbol de la estructura de carpetas:

```
src/
├── domain/          # Reglas de negocio puras, independientes de eventos o librerías:
│   ├── entities/    # Modelos de dominio (ej. Order, User, Product)
│   └── value-objects/ # Objetos de valor inmutables (ej. Money, Email)
├── application/     # Casos de uso y lógica de aplicación:
│   ├── use-cases/   # Coordinación de negocio (ej. CreateOrderUseCase, RegisterUser)
│   └── dtos/        # Objetos de transferencia de datos para entrada/salida de casos de uso
├── errors/          # Manejo de errores personalizados y filtros de error
├── events/          # Definición y contratos de eventos:
│   ├── definitions/ # Clases/schemas de eventos (ej. OrderCreatedEvent.ts)
│   └── types/       # Tipos o interfaces compartidas para eventos
├── messaging/       # Configuración del Message Broker (Kafka, RabbitMQ, etc.):
│   ├── client.ts    # Conexión al Message Broker
│   ├── publisher.ts # Lógica genérica para publicar eventos
│   └── subscriber.ts# Lógica genérica para registrar suscriptores
├── middlewares/     # Middlewares HTTP y de procesamiento:
│   ├── error-handler.ts # Manejador global de errores HTTP
│   ├── auth.ts        # Middleware de autenticación
│   └── validation.ts  # Middleware de validación de entradas
├── modules/         # Organización por dominio o funcionalidad (cada módulo es autónomo):
│   ├── orders/      # Módulo de pedidos
│   │   ├── producers/ # Emisión de eventos (ej. OrderCreatedProducer)
│   │   ├── consumers/ # Reacción a eventos (ej. SendEmailOnOrderCreated)
│   │   └── handlers/  # Manejadores específicos de la lógica del evento
│   ├── payments/    # Módulo de pagos
│   │   ├── producers/ # Emisores de eventos de pago
│   │   └── consumers/ # Consumidores de eventos de pago
│   └── auth/        # Módulo de autenticación
│       ├── producers/ # Eventos de auth (ej. UserRegistered, TokenRefreshed)
│       ├── consumers/ # Suscriptores a eventos de auth
│       └── handlers/  # Lógica específica de autenticación
├── infrastructure/  # Adaptadores externos (BD, APIs, servicios terceros):
│   ├── database/    # Conexiones y repositorios (ORM, SQL/NoSQL)
│   ├── external-services/ # Clientes HTTP externos
│   └── http/        # Servidores HTTP y configuración
└── main.ts          # Punto de entrada / composición de dependencias (Bootstrap)
```

### Descripciones de carpetas:

- `domain/` — Regla de negocio pura, contiene entidades y objetos de valor sin dependencias externas.
- `application/` — Casos de uso que orquestan la lógica de negocio.
- `errors/` — Manejo de errores personalizados y filtros de error a nivel de API.
- `events/` — Contratos y definiciones de eventos que fluyen mediante el patrón EDA.
- `messaging/` — Configuración y lógica de conexión, publicación y suscripción al broker de mensajes.
- `middlewares/` — Middlewares Express/Nest para manejo de errores, autenticación y validación de entradas.
- `modules/` — Agrupación funcional por dominio (orders, payments, auth), cada uno con sus propios producers, consumers y handlers.
- `infrastructure/` — Adaptadores externos: bases de datos, servicios third‑party y servidores HTTP.
- `main.ts` — Punto de entrada que compone las dependencias y arranca la aplicación.

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
