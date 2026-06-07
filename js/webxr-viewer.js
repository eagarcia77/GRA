const params = new URLSearchParams(window.location.search);
const mediaUrl = params.get('u') || params.get('data') || '';
const type = params.get('t') || params.get('type') || 'model';
const title = params.get('n') || params.get('title') || 'EAGR Learn AR';
const description = params.get('x') || params.get('description') || 'Markerless AR viewer for GLB/GLTF 3D models.';
const brandName = params.get('bn') || 'EAGR Learn';
const brandPrimary = params.get('bp') || '#2ae4af';
const brandSecondary = params.get('bs') || '#ffd86b';
const brandFooter = params.get('bf') || 'Commercial AR Experience Builder';
const brandProductName = params.get('pn') || 'Future AR Studio';
const brandLogoUrl = params.get('bl') || '';
const whiteLabelMode = params.get('wl') === '1';

const titleEl = document.getElementById('title');
const descriptionEl = document.getElementById('description');
const modelViewer = document.getElementById('modelViewer');
const openModel = document.getElementById('openModel');
const errorBox = document.getElementById('errorBox');

titleEl.textContent = title || brandName;
descriptionEl.textContent = description || brandFooter;

function showError(message){
  errorBox.style.display = 'block';
  errorBox.textContent = message;
}

function isModelUrl(url){
  const clean = (url || '').split('?')[0].toLowerCase();
  return clean.endsWith('.glb') || clean.endsWith('.gltf');
}

if(!mediaUrl){
  showError('No model URL was provided. Generate a new QR using a GLB or GLTF URL.');
} else if(!isModelUrl(mediaUrl)){
  showError('WebXR Surface Mode requires a direct GLB or GLTF model URL. Use Marker AR Mode for images, video, PDF, YouTube or regular web links.');
  openModel.href = mediaUrl;
} else {
  modelViewer.src = mediaUrl;
  openModel.href = mediaUrl;
}

if(navigator.xr && typeof navigator.xr.isSessionSupported === 'function'){
  navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
    if(!supported){
      showError('This browser/device does not report immersive-ar support. The 3D viewer fallback is still available.');
    }
  }).catch(() => {
    showError('Unable to verify WebXR support. Use the 3D viewer fallback or try a compatible mobile browser.');
  });
} else {
  showError('WebXR is not available in this browser. The 3D viewer fallback is still available.');
}

document.documentElement.style.setProperty('--green', brandPrimary);
document.documentElement.style.setProperty('--gold', brandSecondary);
