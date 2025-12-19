# Sistema de Gestión de Dadas de Baja – NEGOCIO PASTAS

Aplicación para gestionar solicitudes de **dadas de baja** (retiro, desincorporación o eliminación) de equipos, materiales y activos dentro de los procesos de COMARRICO, con múltiples niveles de validación y automatización de correos y estados.

---

## Tabla de Contenidos

- [Descripción](#-descripción)
- [Objetivos del Proyecto](#-objetivos-del-proyecto)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Funcionalidades Principales](#️-funcionalidades-principales)
- [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [Modelo de Datos](#️-modelo-de-datos)
- [Ciclo de Vida de una Solicitud](#-ciclo-de-vida-de-una-solicitud)
- [Roles y Permisos](#-roles-y-permisos)
- [Estructura de Archivos](#-estructura-de-archivos)


---

## Descripción

El **Sistema de Dadas de Baja** es una aplicación web interna creada para COMARRICO que permite automatizar el proceso de solicitud, validación por múltiples equipos y aprobación final para dar de baja activos, materiales o equipos.

El sistema gestiona flujos complejos de aprobación y notificación, permite visualizar estados y se integra con **Google Sheets** como base de datos y **Google Apps Script** como backend.

---

## Objetivos del Proyecto

- Registrar y manejar solicitudes de dadas de baja de manera ordenada.  
- Automatizar el flujo de validación por equipos especializados.  
- Notificar vía correo electrónico los cambios de estado de las solicitudes.  
- Permitir trazabilidad y filtros de estado para auditoría interna.  

---

## Arquitectura del Sistema

El sistema sigue una arquitectura de **3 capas**, con separación clara de presentación, lógica de negocio y almacenamiento:

| Capa | Componente |
|-----|-----------|
| Cliente | HTML, CSS y JavaScript en la UI (index.html + paneles modales) |
| Comunicación | `google.script.run` (RPC entre cliente y servidor) |
| Servidor | Google Apps Script (`Code.js` con lógica de negocio) |
| Datos | Google Sheets (5 hojas con estructura de datos) |

---

## Funcionalidades Principales

### Envío de Solicitudes

Permite a cualquier usuario crear una solicitud de dada de baja ingresando datos como:

- Correo del solicitante  
- Proceso  
- Nombre del elemento  
- Tipo de elemento  
- Estado inicial  
- Fecha de solicitud  

---

### Validaciones por Equipos

Una vez enviada la solicitud, esta pasa por un **flujo de validación multiequipo**:

- Los equipos designados reciben notificación por correo  
- Cada equipo puede validar o rechazar  
- Se registra la validación individual por equipo  
- Cuando todos los equipos han validado, el estado cambia automáticamente  

---

### Notificaciones Automáticas

- Envío de correos electrónicos en cada cambio de estado clave  
- Notificación de envío, validación, aceptación o rechazo  

---

### Tablas y Filtros

La interfaz permite visualizar:

- Solicitudes pendientes  
- Listado completo  
- Estado actual de cada solicitud  

Todo filtrable por usuario o rol.

---

## Tecnologías Utilizadas

| Componente | Tecnología |
|----------|------------|
| Frontend | HTML5, JavaScript (Vanilla), CSS |
| Backend | Google Apps Script (V8) |
| Base de datos | Google Sheets |
| Comunicación | `google.script.run` (RPC) |
| Email | MailApp (Apps Script) |
| UI | Modales dinámicos y paneles |

---

## Modelo de Datos

El proyecto utiliza **Google Sheets** como almacenamiento principal.

### USUARIOS

| Campo | Uso |
|-----|-----|
| ID | Identificador único |
| NOMBRE | Nombre del usuario |
| CORREO | Correo para login y notificaciones |
| CONTRASEÑA | Password del usuario |
| PROCESO | Área funcional |
| CARGO | Rol del usuario |
| ROL | Permisos en la aplicación |

---

### REGISTROS_BAJA

| Campo | Uso |
|-----|-----|
| ID | ID de solicitud |
| CORREO_SOLICITANTE | Email del creador |
| PROCESO | Proceso asociado |
| NOMBRE_ELEMENTO | Nombre del activo |
| TIPO_ELEMENTO | Tipo (Mobiliario, Equipo, etc.) |
| ESTADO | Estado actual de la solicitud |
| FECHA_SOLICITUD | Fecha de creación |

---

### VALIDACIONES_INDIVIDUALES

| Campo | Uso |
|-----|-----|
| ID_SOLICITUD | Relación a la solicitud |
| CORREO_VALIDADOR | Email del validador |
| NOMBRE_VALIDADOR | Nombre |
| ESTADO | Resultado de validación |
| FECHA_VALIDACION | Fecha de validación |
| EQUIPO | Equipo que realizó la validación |

---

### Otras Hojas

- **VALORES**: Configuración de precios o rangos relacionados  
- **AMBIENTAL_VALIDACIONES**: Registros ambientales tras validación completa  

---

## Ciclo de Vida de una Solicitud

1. Creación de la solicitud  
2. Envío de correos a los validadores  
3. Validaciones individuales por equipo  
4. Cambio automático de estado  
5. Notificación de aprobación final o rechazo  

---

## Roles y Permisos

| Rol | Permisos |
|----|----------|
| USUARIO | Crear y ver sus solicitudes |
| JEFE | Ver y validar solicitudes de su área |
| ADMIN | Acceso completo y control total |
| AMBIENTAL | Aprobación ambiental como paso final |

---

## Estructura de Archivos

```text
Dadas-de-baja/
├── backend/
│   └── Code.js
├── html/
│   └── index.html
├── javascript/
│   └── Panels/
│       └── Modals.html
└── README.md

```

---

## Flujo del Sistema

![Arquitectura del sistema](docs/DDBJ.svg)

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/practicantetransfdigital/Dadas-de-baja)
