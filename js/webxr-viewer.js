const params = new URLSearchParams(window.location.search);

const mediaUrl = params.get('u') || params.get('data') || '';
const title = params.get('n') || params.get('title') || 'EAGR Learn AR';
const description = params.get('x') || params.get('description') || 'Markerless AR viewer for GLB/GLTF 3D models. / Visor AR sin marcador para modelos GLB/GLTF.';
const brandName = params.get('bn') || 'EAGR Learn';
const brandPrimary = params.get('bp') || '#2ae4af';
const brandSecondary = params.get('bs') || '#ffd86b';
const brandFooter = params.get('bf') || 'Commercial AR Experience Builder';
const brandProductName = params.get('pn') || 'Future AR Studio';

const titleEl = document.getElementById('title');
const descriptionEl = document.getElementById('description');
const modelViewer = document.getElementById('modelViewer');
const openModel = document.getElementById('openModel');
const statusBox = document.getElementById('statusBox');
const modelUrlInput = document.getElementById('modelUrlInput');
const loadUrlBtn = document.getElementById('loadUrlBtn');
const localModelInput = document.getElementById('localModelInput');

document.documentElement.style.setProperty('--green', brandPrimary);
document.documentElement.style.setProperty('--gold', brandSecondary);

titleEl.textContent = title || brandName;
descriptionEl.textContent = description || brandFooter;

function setStatus(message, type='warn'){
  statusBox.className = `status ${type}`;
  statusBox.textContent = message;
}

function isModelUrl(url){
  const clean = (url || '').split('?')[0].toLowerCase();
  return clean.endsWith('.glb') || clean.endsWith('.gltf');
}

function loadModel(url, source='url'){
  if(!url){
    setStatus('No model URL was provided. / No se proveyó URL de modelo.', 'error');
    return;
  }
  if(source === 'url' && !isModelUrl(url)){
    setStatus('WebXR Surface Mode requires a direct GLB or GLTF URL. / WebXR Surface Mode requiere una URL directa GLB o GLTF.', 'error');
    openModel.href = url;
    return;
  }

  modelViewer.src = url;
  openModel.href = url;
  modelUrlInput.value = source === 'url' ? url : '';
  setStatus('Loading 3D model... / Cargando modelo 3D...', 'warn');
}

modelViewer.addEventListener('load', () => {
  setStatus('3D model loaded. Use Launch Markerless AR if your device supports it. / Modelo 3D cargado. Use Abrir AR sin marcador si su dispositivo es compatible.', 'ok');
});

modelViewer.addEventListener('error', (event) => {
  console.error(event);
  setStatus('The 3D model could not be loaded. Check the URL, CORS permissions, file format, or try Upload. / No se pudo cargar el modelo 3D. Verifique la URL, permisos CORS, formato del archivo o use Upload.', 'error');
});

loadUrlBtn.addEventListener('click', () => {
  loadModel(modelUrlInput.value.trim(), 'url');
});

modelUrlInput.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') loadModel(modelUrlInput.value.trim(), 'url');
});

localModelInput.addEventListener('change', () => {
  const file = localModelInput.files && localModelInput.files[0];
  if(!file) return;
  const name = file.name.toLowerCase();
  if(!name.endsWith('.glb') && !name.endsWith('.gltf')){
    setStatus('Only GLB or GLTF files are supported. / Solo se aceptan archivos GLB o GLTF.', 'error');
    return;
  }
  const objectUrl = URL.createObjectURL(file);
  loadModel(objectUrl, 'upload');
  setStatus('Local model loaded for testing. / Modelo local cargado para prueba.', 'ok');
});

if(navigator.xr && typeof navigator.xr.isSessionSupported === 'function'){
  navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
    if(!supported){
      setStatus('WebXR immersive-ar is not reported as supported on this device. The 3D viewer fallback still works. / Este dispositivo no reporta compatibilidad con WebXR immersive-ar. El visor 3D de respaldo funciona.', 'warn');
    }
  }).catch(() => {
    setStatus('Unable to verify WebXR support. The 3D viewer fallback still works. / No se pudo verificar compatibilidad WebXR. El visor 3D de respaldo funciona.', 'warn');
  });
} else {
  setStatus('WebXR is not available in this browser. The 3D viewer fallback still works. / WebXR no está disponible en este navegador. El visor 3D de respaldo funciona.', 'warn');
}

if(mediaUrl){
  loadModel(mediaUrl, 'url');
}
