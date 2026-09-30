# Portafolio web de Mauricio Dahinten

Mi portafolio personal como programador junior: quién soy, cómo trabajo, lo que sé hacer y lo que he construido. Está hecho con HTML, CSS y JavaScript puros, sin frameworks ni dependencias, con una estética inspirada en los videojuegos, mi mayor pasatiempo.

**Demo:** [tu-portafolio.onrender.com](https://portafolio-za57.onrender.com/index.html)

## Qué incluye

| Página | Contenido |
|---|---|
| **Inicio** | Presentación, foto y accesos rápidos a proyectos y contacto |
| **Sobre mí** | Mi historia, mis habilidades blandas y mi lado gamer |
| **Habilidades** | Lenguajes y herramientas, con su nivel de práctica |
| **Proyectos** | Mis tres proyectos destacados con enlace a su repositorio |
| **Contacto** | Gmail, LinkedIn, GitHub y WhatsApp |

## Características

- **Bilingüe:** español por defecto, con cambio a inglés en un clic.
- **Modo claro y oscuro:** respeta la preferencia del dispositivo y recuerda la elección.
- **Interactivo:** rol que se escribe solo, foto que responde al mouse, moneda clicable y niveles de habilidad que se llenan al aparecer.
- **Ligero:** sin librerías; solo dos fuentes de Google Fonts. Ideal para un hosting estático.
- **Responsive:** menú desplegable en celular y diseño que cabe en una pantalla de laptop sin scroll.
- **Accesible:** foco visible con teclado, etiquetas para lectores de pantalla y animaciones desactivadas si el usuario lo pide (`prefers-reduced-motion`).

## Tecnologías

- HTML5 semántico
- CSS3 con variables personalizadas (temas), Grid y Flexbox
- JavaScript (ES6+) sin dependencias
- Fuentes: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) y [Nunito](https://fonts.google.com/specimen/Nunito)

## Estructura

```
portafolio/
├── index.html            Página de inicio
├── html/                 Sobre mí, habilidades, proyectos y contacto
├── css/estilos.css       Estilos y temas claro/oscuro
├── js/main.js            Menú, idioma, tema e interacciones
└── img/                  Foto e imágenes
```

## Ejecutarlo en local

No requiere instalación. Clona el repositorio y ábrelo con un servidor local:

```bash
git clone https://github.com/IkerDahinten2/portafolio.git
cd portafolio
python -m http.server 5500
```

Luego entra a `http://localhost:5500`. También sirve la extensión **Live Server** de VS Code.

## Despliegue en Render

1. En Render, elige **New → Static Site** y conecta este repositorio.
2. Deja vacío el **Build Command**.
3. En **Publish Directory** escribe `.`
4. Pulsa **Create Static Site**.

## Personalización

- **Nombre, menú y pie de página:** constantes al inicio de `js/main.js`.
- **Textos:** se editan directamente en cada HTML. Cada texto en español tiene su versión en inglés en el atributo `data-en`, así que actualiza ambos.
- **Nivel de una habilidad:** número del 1 al 5 en `data-n` (`html/habilidades.html`).
- **Colores:** variables al inicio de `css/estilos.css`; el modo oscuro se define en `[data-tema=dark]`.
- **Foto:** guarda `foto.png` (o `.jpg`/`.webp`) en `img/`. Se recomienda unos 600 px de ancho y menos de 200 KB.

## Contacto

- Gmail: mauriciodahinten@gmail.com
- LinkedIn: [linkedin.com/in/TU-USUARIO](www.linkedin.com/in/mauricio-dahinten-2b3a351b3)
- GitHub: [@IkerDahinten2](https://github.com/IkerDahinten2)

## Licencia

Proyecto personal. Puedes tomarlo como inspiración; si reutilizas el código, menciona la fuente.