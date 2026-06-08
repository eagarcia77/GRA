EAGR Learn – Functional Bilingual AR Generator / Generador AR funcional bilingüe

ENGLISH
This version removes unnecessary marker customizations and keeps the standard HIRO marker that matches hiro-marker-generic.patt. This improves AR.js marker detection reliability.

ESPAÑOL
Esta versión elimina las personalizaciones innecesarias del marcador y mantiene el marcador HIRO estándar que coincide con hiro-marker-generic.patt. Esto mejora la confiabilidad de detección del marcador en AR.js.

Main features / Funciones principales:
- Functional HIRO marker / Marcador HIRO funcional
- Integrated Version / Versión integrada
- Separated Version / Versión separada
- WebXR Surface Mode for GLB/GLTF / Modo WebXR Surface para GLB/GLTF
- Direct URL support / Soporte para URL directa
- Smaller logo / Logo más pequeño
- Bilingual interface / Interfaz bilingüe

Important / Importante:
The word HIRO should not be changed unless the program also generates a new PATT file. The image marker and PATT file must match for detection to work.

La palabra HIRO no debe cambiarse a menos que el programa también genere un nuevo archivo PATT. La imagen del marcador y el archivo PATT deben coincidir para que la detección funcione.



Update / Actualización:
Logo URL, Upload Logo and Logo Preview were removed because they were not functional in this simplified version.

Se eliminó Logo URL, Upload Logo y Logo Preview porque no eran funcionales en esta versión simplificada.


EAGR Learn AR – Brand Settings + White Label Verification

Verified / Verificado:
- Brand Name field is connected to JavaScript.
- Product Name field is connected to JavaScript.
- Brand Footer field is connected to JavaScript.
- Primary Color field is connected to JavaScript.
- Secondary Color field is connected to JavaScript.
- White-label mode checkbox is connected to JavaScript.
- Auto-save checkbox is connected to JavaScript.
- Save Brand Settings button is connected.
- Reset Brand button is connected.
- Apply Brand Preview button is connected.
- Settings are saved with localStorage.
- Saved settings are loaded on page load.
- Generated AR links include brand data:
  bn = brand name
  pn = product name
  bf = brand footer
  bp = primary color
  bs = secondary color
  wl = white-label mode
- Logo URL and Upload Logo were removed.

Corrections made / Correcciones realizadas:
- Fixed broken event listener block.
- Fixed refreshBrandPreview so .catch() calls do not break the page.
- Added bilingual labels to Brand Settings.
- Removed remaining logo upload/url references.
- Verified JavaScript syntax with node --check.
