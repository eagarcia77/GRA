EAGR Learn – Future AR Studio (Commercial Edition)

This commercial edition lets users create premium AR experiences using direct URLs for images, videos, YouTube, PDF files and web links.

Main features:
- Premium custom marker builder
- QR generation in multiple visual styles
- Integrated and separated export modes
- 3D visual mode for images
- GitHub Pages ready package
- Generic web workflow with no institutional dependency

How the custom marker works:
- The user writes any text in Marker Text.
- The app generates a premium marker PNG that includes the custom visible label.
- A stable core marker pattern is used behind that visual design so AR tracking remains reliable.
- The Core PATT file is available for download when needed.

Recommended workflow:
1. Select the content type.
2. Paste a direct public URL.
3. Write the marker text.
4. Test the content.
5. Generate assets.
6. Download the integrated or separated visual.
7. Open the AR link and scan the QR.
8. Point the camera to the premium custom marker.


New designer options:
- Marker Text Color: choose the visible label color.
- Marker Visual Style: choose Neon Premium, Gold Luxe, Glass Future, Minimal Clean or Cyber Grid.



Advanced AR update:
- Added WebXR Surface Mode for markerless AR experiences.
- Added GLB/GLTF 3D model support.
- Added webxr-viewer.html for surface placement compatible devices.
- Marker AR remains as the universal fallback for images, video, PDF, YouTube and web links.
- If WebXR is not supported, the 3D model still opens in an interactive viewer.


Brand Settings update:
- Added Brand Name and Brand Footer fields.
- Added Primary Color and Secondary Color controls.
- Added Upload Logo option with preview.
- Uploaded logo is applied to exported integrated and separated assets.
- Brand name, footer and colors are propagated to the generated AR links and viewer branding.



Full white-label update:
- Added automatic saving with localStorage.
- Added Logo URL option in addition to Upload Logo.
- Added Product Name.
- Added White-label mode.
- Added Save Brand Settings, Reset Brand and Apply Brand Preview.
- Generated links now carry brand name, product name, colors, footer and logo URL when provided.



Final HIRO replacement fix:
- The createCustomMarkerDataUrl function was fully replaced.
- The HIRO word area is now fully covered with a white plate.
- The custom Marker Text is drawn inside that plate.
- This corrected custom marker is used by the marker preview, marker PNG download, Integrated Version and Separated Version.


Actualización de Marker e imágenes finales:
- El Marker ahora se genera como una tarjeta cuadrada limpia, sin el diseño recargado anterior.
- La palabra HIRO se sustituye visualmente dentro del Marker por el texto definido por el usuario.
- La versión Integrated ahora muestra solamente el Marker en el centro del QR Code.
- La versión Separated ahora usa un Marker más grande y limpio para mejorar la detección.


Marker only update:
- The marker preview is now only the marker itself, without extra visual cards.
- The word HIRO/HERO is visually replaced inside the marker by the user text.
- Integrated Version shows only the marker in the center of the QR code.
- Separated Version shows a larger and cleaner standalone marker.



Functional Marker Mode update:
- Removed/hidden marker customizations that were breaking tracking.
- The program now uses the standard HIRO marker image because it matches hiro-marker-generic.patt.
- This is required for AR.js marker detection to work reliably.
- Integrated Version places the functional HIRO marker in the center of the QR.
- Separated Version shows a larger functional HIRO marker.
- To change the internal word HIRO and still make it work, the system needs a true PATT generator for the new marker image.
