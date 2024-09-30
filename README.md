# [React](https://react.dev/) and [Vite](https://vitejs.dev/)

<a aria-label="contributors graph" href="https://github.com/Angel07fco/proyecto-jireh/settings/access"><img alt="contributors graph" src="https://img.shields.io/github/contributors/primer/react.svg"></a> <a aria-label="last commit" href="https://github.com/Angel07fco/proyecto-jireh/commits/master/"><img alt="last commit" src="https://img.shields.io/github/last-commit/primer/react.svg"></a>

<p align="center">
  <img alt="Primer logo" width="300px" src="https://res.cloudinary.com/dl8odylct/image/upload/v1706761818/jireh_dphsph.jpg">
</p>

# Proyecto Web [Clinica Veterinaria JIREH](https://veterinaria-jireh.vercel.app)

## Objetivo y alcance del proyecto

- Desarrollar una PWA para ofrecer una experiencia nativa en dispositivos móviles, permitiendo a los usuarios gestionar las citas de manera eficiente.
- Ofrecer funcionalidad fuera de línea y optimización de rendimiento mediante la implementación de Service Workers y Caching.
- Incluir características avanzadas como Notificaciones Push, Instalación Directa, y Sincronización de Datos en Segundo Plano.

## Equipo de trabajo y sus roles

    - Product Owner (Propietario del Producto):
        Responsabilidades:
          - Definir la visión del producto y asegurar que se entregue valor al cliente.
          - Gestionar y priorizar el Product Backlog (lista de funcionalidades y tareas del proyecto).
          - Asegurar que el equipo entienda los requisitos del cliente y sus prioridades.

    - Scrum Master
      Responsabilidades:
        - Facilitar el proceso Scrum, asegurándose de que el equipo siga las prácticas ágiles.
        - Eliminar obstáculos que bloqueen el progreso del equipo.
        - Fomentar una cultura de colaboración y mejora continua dentro del equipo.

    - Equipo de Desarrollo (Developers)
      Responsabilidades:
        - Desarrollar las funcionalidades de la PWA, incluyendo la interfaz de usuario, lógica de negocio, y conexión con el backend.
        - Participar en las reuniones diarias (Daily Scrum) y colaborar en el refinamiento del Product Backlog.
        - Realizar pruebas de las funcionalidades y asegurar que se cumplan los criterios de aceptación.

        Frontend Developer: Responsable del desarrollo de la interfaz de usuario y funcionalidades de la PWA en React.
        Backend Developer: Responsable de las conexiones con la API y la gestión de datos para la PWA.
        Mobile Developer: Colaborará en la optimización de la PWA para dispositivos móviles.

    - Equipo de Pruebas (QA - Quality Assurance)
      Responsabilidades:
        - Realizar pruebas de la PWA para garantizar que las funcionalidades funcionen correctamente.
        - Crear pruebas unitarias, de integración y pruebas E2E (End-to-End) para verificar el comportamiento del sistema.
        - Identificar y reportar errores o fallos, y asegurar que se solucionen antes de la entrega.

    - Diseñador de UX/UI
      Responsabilidades:
        - Diseñar las interfaces de usuario centradas en la experiencia del usuario (UX).
        - Asegurarse de que la aplicación sea atractiva, fácil de usar y responsiva para diferentes dispositivos.
        - Colaborar con el equipo de desarrollo para asegurar la correcta implementación de los diseños.

## Plazos y Entrega del proyecto

Plazo total: 3 meses de desarrollo

Una Progressive Web App (PWA) completamente funcional basada en la aplicación web existente, que ofrezca las siguientes características:

    - Instalación en dispositivos: Los usuarios pueden instalar la aplicación como si fuera una app nativa en sus dispositivos móviles o de escritorio.
    - Funcionalidad offline: La aplicación puede ser utilizada sin conexión a internet gracias a la implementación de un Service Worker que maneja la cache de recursos estáticos y dinámicos.
    - Rendimiento optimizado: Tiempos de carga reducidos mediante el uso de técnicas como lazy loading, code splitting, y estrategias avanzadas de caching.
    - Compatibilidad multiplataforma: La PWA funciona de manera eficiente en distintos navegadores y dispositivos.
    - Experiencia de usuario mejorada: La aplicación ofrece una interfaz de usuario fluida y rápida, con transiciones suaves, buena accesibilidad y optimización móvil.

## Riesgos y las medidas para mitigarlos

Riesgo: Incompatibilidad entre navegadores

    Descripción: Algunas características avanzadas de las PWA, como los Service Workers y el almacenamiento offline, podrían no ser compatibles con ciertos navegadores o versiones antiguas.

    Medidas de mitigación:
    - Realizar pruebas exhaustivas en múltiples navegadores (Chrome, Firefox, Safari, Edge) y dispositivos.
    - Implementar soluciones de polyfills para garantizar que las funcionalidades esenciales sigan funcionando en todos los navegadores, incluso si algunas características avanzadas no son soportadas.

Riesgo: Problemas de rendimiento en dispositivos móviles

    Descripción: La PWA podría tener un rendimiento lento en dispositivos móviles de gama baja debido a la carga de recursos pesados.

    Medidas de mitigación:
    - Implementar técnicas de optimización de recursos como lazy loading y code splitting.
    - Usar herramientas como Lighthouse para evaluar el rendimiento y aplicar las recomendaciones.
    - Comprimir imágenes y recursos multimedia, y limitar el uso de bibliotecas pesadas.

Riesgo: Pérdida de funcionalidad en modo offline

    Descripción: Los usuarios podrían experimentar problemas al utilizar la aplicación en modo offline si el Service Worker no maneja correctamente las solicitudes o el almacenamiento en caché.

    Medidas de mitigación:
    - Implementar y probar varias estrategias de cacheo (precacheo y cache-first).
    - Hacer pruebas exhaustivas en condiciones de red inestable o sin conexión.
    - Proporcionar mensajes de error o indicaciones claras al usuario cuando ciertas funcionalidades no estén disponibles offline.

## Metodología de desarrollo ágil

    Se ha seleccionado Scrum como metodología de desarrollo para la PWA. Esta metodología ágil se enfoca en entregas iterativas y colaborativas mediante prácticas clave como:

    - Sprints: Períodos cortos de desarrollo (2 semanas) donde se completan y entregan funcionalidades.
    - Backlog priorizado: Las tareas se gestionan y priorizan en un backlog, ajustándose continuamente según las necesidades del proyecto.
    - Daily Standups: Reuniones diarias para revisar el progreso, identificar obstáculos y sincronizar el equipo.
    Revisión de Sprints: Al finalizar cada sprint, se evalúan las funcionalidades completadas y se recopila retroalimentación.
    - Retroalimentación continua: Las entregas frecuentes permiten mejorar el producto de manera constante y adaptativa.

## Estrategia de Versionamiento

    Git Flow es adecuado para proyectos con ciclos de desarrollo que incluyen múltiples versiones en paralelo, así como lanzamientos planificados y correcciones de errores rápidas. Esta estrategia ofrece una estructura clara para gestionar ramas, facilitando el desarrollo, las pruebas, y el despliegue en diferentes entornos.

## Pasos para la creación, revisión y fusión de ramas

Git Flow:

    Rama principal (main):
      - Contiene el código que ya ha sido lanzado a producción.

    Rama de desarrollo (develop):
      - Donde se integran todas las nuevas características para la próxima versión.

    Ramas de características (feature):
      - Se crean a partir de develop para desarrollar una nueva funcionalidad o módulo. Ejemplo: feature/login, feature/mascotas.
      - Se fusionan de vuelta en develop tras pasar las revisiones de código y las pruebas.

    Ramas de lanzamientos (release):
      - Una vez que se ha finalizado el desarrollo de todas las características para una versión, se crea una rama release desde develop.
      - Aquí se hacen pequeños ajustes y correcciones antes del despliegue final.
      - Se fusiona en main y develop tras el lanzamiento.

    Proceso de Revisión y Fusión:
      - Cada rama se somete a un proceso de revisión de código mediante pull requests antes de ser fusionada.
      - Las pruebas automatizadas (y manuales) se ejecutan en las ramas de características y lanzamientos antes de integrarlas.

## Estrategia de Despliegue

Canary Deployment:

    Se ha elegido Canary Deployment debido a su capacidad para realizar despliegues graduales. Esta estrategia reduce el riesgo en producción, permitiendo que una nueva versión del software sea desplegada primero para una pequeña parte de los usuarios, antes de desplegarla completamente.

## Implementación de Integración Continua (CI)con Jenkins

Pipeline de Jenkins para Git Flow

    - Checkout: Obtención del código de la rama activa.
    - Build: Compilación del proyecto (por ejemplo, con npm install y npm run build).
    - Test: Ejecución de pruebas unitarias y de integración.
    - Canary Deployment: Despliegue gradual de la versión en producción.

## Entornos (desarrollo, staging, producción)

Desarrollo (Development):

    - Este es el entorno donde se trabaja de manera continua en nuevas características y funcionalidades.
    - Se realizan pruebas iniciales y se integran cambios de las ramas feature/* de Git Flow.
    - Jenkins ejecuta automáticamente pipelines que validan el código mediante pruebas unitarias antes de integrarse en la rama develop.

Staging:

    - El entorno staging es una réplica del entorno de producción, donde se validan los cambios antes del despliegue final.
    - Aquí se realizan pruebas de integración y pruebas manuales adicionales para asegurar que todo funcione correctamente antes de fusionar los cambios en la rama release/*.
    - Jenkins también ejecuta pipelines para construir el código, correr pruebas y preparar el despliegue final en producción.

Producción (Production):

    - Este es el entorno en vivo donde la aplicación está disponible para los usuarios finales.
    - Utilizando la estrategia de Canary Deployment, los cambios se despliegan gradualmente para minimizar riesgos y monitorear el comportamiento de la nueva versión antes de su despliegue completo.
    - Jenkins maneja el despliegue canario cuando la rama main recibe actualizaciones desde release/*.

## Tecnologias usadas

The project is developed using the following React technologies:

- [Emotion](https://emotion.sh/)
- [Material-UI (MUI)](https://mui.com/)
- [Axios](https://axios-http.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Helmet](https://helmetjs.github.io/)
- [React Hook Form](https://react-hook-form.com/)
- [React Router DOM](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Workbox](https://web.dev/learn/pwa/workbox?hl=es-419)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Lighthouse](https://app.lighthouse.io)

## Services usados

- [Google reCAPTCHA](https://www.google.com/recaptcha)
- [Google Analytics](https://analytics.google.com/)
- [Hostinger](https://www.hostinger.com/)
- [AWS (Amazon Web Services)](https://aws.amazon.com/)
- [Tidio](https://www.tidio.com/)
- [Cloudflare](https://www.cloudflare.com/)
- [Cloudinary](https://cloudinary.com/)

## Instalación

To install the project follow the steps below:

1. Clonar el repositorio:

```console
git clone https://github.com/Angel07fco/proyecto-jireh.git
```

2. Navegar al Directorio del Proyecto:

```console
proyecto-jireh
```

3. Instalar las dependencias del proyecto utilizando el gestor de paquetes de su elección:

Con npm:

```console
npm install
```

Con yarn:

```console
yarn install
```

5. Ejecutar el proyecto utilizando el gestor de paquetes de su elección:

Con npm:

```console
npm run dev
```

Con yarn:

```console
yarn run dev
```

5. Ejecutar el proyecto para versión de producción:

Con npm:

```console
npm run build
```

Con yarn:

```console
yarn run build
```
