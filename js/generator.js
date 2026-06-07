const $ = id => document.getElementById(id);
const contentTypeInput = $('contentType');
const advancedArModeInput = $('advancedArMode');
const brandNameInput = $('brandName');
const brandFooterInput = $('brandFooter');
const brandProductNameInput = $('brandProductName');
const brandPrimaryInput = $('brandPrimary');
const brandSecondaryInput = $('brandSecondary');
const brandLogoUrlInput = $('brandLogoUrl');
const brandLogoUploadInput = $('brandLogoUpload');
const brandLogoPreview = $('brandLogoPreview');
const whiteLabelModeInput = $('whiteLabelMode');
const autoSaveBrandInput = $('autoSaveBrand');
const saveBrandBtn = $('saveBrandBtn');
const resetBrandBtn = $('resetBrandBtn');
const applyBrandBtn = $('applyBrandBtn');
const heroBrandLogo = $('heroBrandLogo');
const heroBrandTitle = $('heroBrandTitle');
const productSubtitle = $('productSubtitle');
const markerTextInput = $('markerText');
const markerTextColorInput = $('markerTextColor');
const markerVisualStyleInput = $('markerVisualStyle');
const contentUrlInput = $('contentUrl');
const titleInput = $('title');
const descriptionInput = $('description');
const baseUrlInput = $('baseUrl');
const qrStyleInput = $('qrStyle');
const testBtn = $('testBtn');
const generateBtn = $('generateBtn');
const statusBox = $('status');
const previewWrap = $('previewWrap');
const imagePreview = $('imagePreview');
const videoPreview = $('videoPreview');
const youtubePreview = $('youtubePreview');
const youtubeThumb = $('youtubeThumb');
const youtubeLink = $('youtubeLink');
const documentPreview = $('documentPreview');
const previewOpenBtn = $('previewOpenBtn');
const resultUrl = $('resultUrl');
const integratedPreview = $('integratedPreview');
const separatedPreview = $('separatedPreview');
const downloadIntegratedBtn = $('downloadIntegratedBtn');
const downloadSeparatedBtn = $('downloadSeparatedBtn');
const openBtn = $('openBtn');
const qrRenderHost = $('qrRenderHost');
const selectedMarkerPreview = $('selectedMarkerPreview');
const selectedMarkerCaption = $('selectedMarkerCaption');
const selectedMarkerStatus = $('selectedMarkerStatus');
const downloadMarkerPngBtn = $('downloadMarkerPngBtn');
const downloadMarkerPngBtnSecondary = $('downloadMarkerPngBtnSecondary');
const downloadMarkerPreview = $('downloadMarkerPreview');
let currentBrandLogoDataUrl = './assets/eagr-learn-logo.svg';
const DEFAULT_BRAND_SETTINGS = {
  name: 'EAGR Learn',
  productName: 'Future AR Studio',
  footer: 'Commercial AR Experience Builder',
  primary: '#2ae4af',
  secondary: '#ffd86b',
  logoUrl: '',
  logoDataUrl: './assets/eagr-learn-logo.svg',
  whiteLabel: false,
  autoSave: true
};

function setStatus(message, type='ok'){
  statusBox.textContent = message;
  statusBox.className = `status ${type}`;
}

function currentBaseUrl(){
  const c = window.location.href;
  return c.substring(0, c.lastIndexOf('/') + 1);
}

function sanitizeMarkerLabel(raw){
  return (raw || 'EAGR Learn').trim().replace(/\s+/g,' ').toUpperCase().slice(0,20) || 'EAGR LEARN';
}

function getMarkerStyleLabel(style){
  const labels = {
    neon: 'Neon Premium',
    gold: 'Gold Luxe',
    glass: 'Glass Future',
    minimal: 'Minimal Clean',
    cyber: 'Cyber Grid'
  };
  return labels[style] || 'Neon Premium';
}

function getMarkerDesignTheme(style, textColor){
  const base = {
    textColor: textColor || '#0b1824',
    outerBg: ['#07111b','#0b1824','#08111b'],
    glowA: 'rgba(42,228,175,.22)',
    glowB: 'rgba(255,216,107,.18)',
    panelFillA: 'rgba(10,17,27,.98)',
    panelFillB: 'rgba(14,27,41,.98)',
    accentA: '#2ae4af',
    accentB: '#1cb1ff',
    accentC: '#ffd86b',
    frameStroke: 'rgba(143,190,222,.26)',
    titleColor: '#ffffff',
    subtitleColor: '#a8becd',
    innerBg: '#f5f8fb',
    innerStroke: '#d7e5e0',
    chipFill: '#ffffff',
    chipStroke: '#d7e5e0',
    footerText: '#d8e8f3',
    footerSmall: '#7d96a8'
  };
  if(style === 'gold') return { ...base, outerBg:['#14100a','#261a10','#15110c'], glowA:'rgba(255,216,107,.16)', glowB:'rgba(255,191,69,.22)', panelFillA:'rgba(27,20,11,.98)', panelFillB:'rgba(44,31,18,.98)', accentA:'#ffd86b', accentB:'#ffbf45', accentC:'#fff3c1', frameStroke:'rgba(255,216,107,.26)', subtitleColor:'#e6d9b6', chipStroke:'#f0d48a' };
  if(style === 'glass') return { ...base, outerBg:['#061019','#0a2030','#07111b'], glowA:'rgba(28,177,255,.18)', glowB:'rgba(42,228,175,.18)', panelFillA:'rgba(7,16,26,.88)', panelFillB:'rgba(17,34,50,.84)', accentA:'#b8ffe9', accentB:'#1cb1ff', accentC:'#7ef1ca', frameStroke:'rgba(184,255,233,.22)', chipFill:'rgba(255,255,255,.82)' };
  if(style === 'minimal') return { ...base, outerBg:['#f3f7fa','#eaf2f7','#f9fbfc'], glowA:'rgba(0,0,0,0)', glowB:'rgba(0,0,0,0)', panelFillA:'rgba(245,248,251,.98)', panelFillB:'rgba(236,242,246,.98)', accentA:'#0b1824', accentB:'#2a3d4f', accentC:'#9fb7c8', frameStroke:'rgba(42,61,79,.16)', titleColor:'#0b1824', subtitleColor:'#4f6778', chipStroke:'#d7e5e0', footerText:'#1c2f3f', footerSmall:'#61798a' };
  if(style === 'cyber') return { ...base, outerBg:['#05070d','#0c1020','#060913'], glowA:'rgba(187,134,252,.16)', glowB:'rgba(28,177,255,.18)', panelFillA:'rgba(10,10,22,.98)', panelFillB:'rgba(18,20,42,.98)', accentA:'#7ef1ca', accentB:'#a970ff', accentC:'#1cb1ff', frameStroke:'rgba(169,112,255,.24)', subtitleColor:'#b8c6ff', chipStroke:'rgba(169,112,255,.20)' };
  return base;
}

function drawStyleExtras(ctx, style){
  if(style === 'cyber'){
    ctx.save();
    ctx.strokeStyle = 'rgba(126,241,202,.14)';
    ctx.lineWidth = 1;
    for(let x=120;x<950;x+=44){ ctx.beginPath(); ctx.moveTo(x,360); ctx.lineTo(x,1100); ctx.stroke(); }
    for(let y=360;y<1100;y+=44){ ctx.beginPath(); ctx.moveTo(150,y); ctx.lineTo(930,y); ctx.stroke(); }
    ctx.restore();
  }
  if(style === 'glass'){
    ctx.save();
    ctx.globalAlpha = .16;
    drawRoundRect(ctx, 185, 402, 710, 110, 24, '#ffffff', null);
    drawRoundRect(ctx, 185, 950, 710, 90, 24, '#ffffff', null);
    ctx.restore();
  }
  if(style === 'gold'){
    ctx.save();
    ctx.strokeStyle = 'rgba(255,216,107,.35)';
    ctx.lineWidth = 3;
    drawRoundRect(ctx, 150, 365, 780, 730, 30, null, 'rgba(255,216,107,.35)');
    ctx.restore();
  }
}

async function createCustomMarkerDataUrl(label, textColor, visualStyle){
  const cleanLabel = sanitizeMarkerLabel(label);
  const style = visualStyle || 'neon';
  const theme = getMarkerDesignTheme(style, textColor || '#0b1824');
  const baseImg = await loadImage('./assets/hiro-marker-generic.png');
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 900;
  const ctx = canvas.getContext('2d');

  // Clean square marker card
  const bg = ctx.createLinearGradient(0, 0, 900, 900);
  bg.addColorStop(0, '#ffffff');
  bg.addColorStop(1, style === 'minimal' ? '#f7fbfc' : '#fbfdfd');
  ctx.fillStyle = bg;
  ctx.fillRect(0,0,900,900);

  drawRoundRect(ctx, 44, 44, 812, 812, 34, '#ffffff', 'rgba(0,0,0,.08)');
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,.10)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 10;
  drawRoundRect(ctx, 70, 70, 760, 760, 28, '#ffffff', theme.frameStroke || 'rgba(143,190,222,.22)');
  ctx.restore();

  // Decorative clean AR corner marks
  ctx.strokeStyle = theme.accentA;
  ctx.lineWidth = 6;
  const corners = [
    [110,110,150,110,110,150],
    [790,110,750,110,790,150],
    [110,790,150,790,110,750],
    [790,790,750,790,790,750]
  ];
  corners.forEach(c=>{ctx.beginPath(); ctx.moveTo(c[0],c[1]); ctx.lineTo(c[2],c[3]); ctx.moveTo(c[0],c[1]); ctx.lineTo(c[4],c[5]); ctx.stroke();});

  // Draw the actual marker core larger and cleaner.
  const markerX = 178, markerY = 150, markerSize = 544;
  ctx.drawImage(baseImg, markerX, markerY, markerSize, markerSize);

  // Replace the visible HIRO word area with custom text.
  const labelBoxX = markerX + 105;
  const labelBoxY = markerY + 410;
  const labelBoxW = 334;
  const labelBoxH = 84;

  // Cover old HIRO word completely.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(labelBoxX - 18, labelBoxY - 14, labelBoxW + 36, labelBoxH + 28);
  drawRoundRect(ctx, labelBoxX - 6, labelBoxY - 2, labelBoxW + 12, labelBoxH + 4, 14, '#ffffff', theme.chipStroke || '#d7e5e0');

  ctx.fillStyle = theme.textColor;
  ctx.textAlign = 'center';
  let markerFontSize = 42;
  if(cleanLabel.length > 9) markerFontSize = 34;
  if(cleanLabel.length > 14) markerFontSize = 28;
  ctx.font = `bold ${markerFontSize}px Arial`;
  if(cleanLabel.includes(' ') || cleanLabel.length > 12){
    wrapText(ctx, cleanLabel, labelBoxX + labelBoxW/2, labelBoxY + 28, labelBoxW - 20, markerFontSize + 6, 2);
  } else {
    ctx.fillText(cleanLabel, labelBoxX + labelBoxW/2, labelBoxY + 54);
  }

  // Small name badge at the bottom for visual polish only.
  const badge = ctx.createLinearGradient(180, 742, 720, 742);
  badge.addColorStop(0, theme.accentA);
  badge.addColorStop(1, theme.accentB);
  drawRoundRect(ctx, 180, 700, 540, 72, 24, badge, null);
  ctx.fillStyle = style === 'gold' ? '#3a2600' : '#061018';
  if(style === 'minimal') ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 34px Arial';
  wrapText(ctx, cleanLabel, 450, 745, 500, 38, 1);

  return canvas.toDataURL('image/png');
}

function getMarkerConfig(){
  const label = sanitizeMarkerLabel(markerTextInput ? markerTextInput.value : 'EAGR Learn');
  const textColor = markerTextColorInput ? markerTextColorInput.value : '#0b1824';
  const visualStyle = markerVisualStyleInput ? markerVisualStyleInput.value : 'neon';
  return { mode:'custom', label, image:null, patt:'./assets/hiro-marker-generic.patt', textColor, visualStyle };
}

async function refreshMarkerSelectionUI(){
  const cfg = getMarkerConfig();
  const customDataUrl = await createCustomMarkerDataUrl(cfg.label, cfg.textColor, cfg.visualStyle);
  cfg.image = customDataUrl;
  if(selectedMarkerPreview) selectedMarkerPreview.src = customDataUrl;
  if(selectedMarkerPreview) selectedMarkerPreview.alt = `Custom Marker ${cfg.label}`;
  if(selectedMarkerCaption) selectedMarkerCaption.textContent = `Custom Marker text: ${cfg.label}. The HIRO word is replaced inside the marker. Style: ${getMarkerStyleLabel(cfg.visualStyle)}. Color: ${cfg.textColor.toUpperCase()}.`;
  if(selectedMarkerStatus) selectedMarkerStatus.textContent = `Ready: ${cfg.label} · ${getMarkerStyleLabel(cfg.visualStyle)}`;
  if(downloadMarkerPreview) downloadMarkerPreview.src = customDataUrl;
  if(downloadMarkerPngBtn){ downloadMarkerPngBtn.href = customDataUrl; downloadMarkerPngBtn.download = `premium-marker-${cfg.label.replace(/[^A-Z0-9]+/g,'-')}-${cfg.visualStyle}.png`; }
  if(downloadMarkerPngBtnSecondary){ downloadMarkerPngBtnSecondary.href = customDataUrl; downloadMarkerPngBtnSecondary.download = `premium-marker-${cfg.label.replace(/[^A-Z0-9]+/g,'-')}-${cfg.visualStyle}.png`; }
  return cfg;
}

function extractYoutubeId(url){
  const raw = (url || '').trim();
  try {
    const u = new URL(raw);
    const host = u.hostname.replace(/^www\./, '').toLowerCase();
    if(host === 'youtu.be') return u.pathname.split('/').filter(Boolean)[0] || '';
    if(host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com'){
      if(u.pathname === '/watch') return u.searchParams.get('v') || '';
      if(u.pathname.startsWith('/embed/')) return u.pathname.split('/')[2] || '';
      if(u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2] || '';
      if(u.pathname.startsWith('/live/')) return u.pathname.split('/')[2] || '';
    }
  } catch(e) {}
  const fallback = raw.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([A-Za-z0-9_-]{6,})/);
  return fallback ? fallback[1] : '';
}

function getYoutubeWatchUrl(url){
  const id = extractYoutubeId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : url;
}

function detectType(url){
  const selected = contentTypeInput.value;
  const clean = url.split('?')[0].toLowerCase();
  if(selected !== 'auto') return selected;
  if(/youtube\.com|youtu\.be/.test(url)) return 'youtube';
  if(/\.(mp4|webm|ogg|mov|m4v)$/.test(clean)) return 'video';
  if(/\.(glb|gltf)$/.test(clean)) return 'model';
  if(/\.(png|jpg|jpeg|webp|gif)$/.test(clean)) return 'image';
  if(clean.endsWith('.pdf')) return 'pdf';
  return 'link';
}


function getAdvancedArMode(type){
  const selected = advancedArModeInput ? advancedArModeInput.value : 'auto';
  if(selected === 'webxr') return 'webxr';
  if(selected === 'marker') return 'marker';
  return type === 'model' ? 'webxr' : 'marker';
}

function buildViewerPath(type, mode){
  if(mode === 'webxr') return 'webxr-viewer.html';
  return 'v.html';
}

function buildArUrl(){
  const url = contentUrlInput.value.trim();
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const base = (baseUrlInput.value.trim() || currentBaseUrl()).replace(/index\.html$/i, '');
  if(!url) return '';
  const type = detectType(url);
  const mode = getAdvancedArMode(type);
  const finalUrl = type === 'youtube' ? getYoutubeWatchUrl(url) : url;
  const markerCfg = getMarkerConfig();
  const brand = getBrandConfig();
  const params = new URLSearchParams();
  params.set('t', type);
  params.set('u', finalUrl);
  params.set('m', mode === 'webxr' ? 'webxr' : 'custom');
  params.set('arMode', mode);
  params.set('ml', markerCfg.label);
  if(title) params.set('n', title);
  if(description) params.set('x', description);
  params.set('bn', brand.name);
  params.set('bp', brand.primary);
  params.set('bs', brand.secondary);
  params.set('bf', brand.footer);
  params.set('pn', brand.productName);
  params.set('wl', brand.whiteLabel ? '1' : '0');
  if(brand.logoUrl) params.set('bl', brand.logoUrl);
  return `${base}${buildViewerPath(type, mode)}?${params.toString()}`;
}

function resetPreview(){
  previewWrap.classList.add('hidden');
  imagePreview.classList.add('hidden');
  videoPreview.classList.add('hidden');
  youtubePreview.classList.add('hidden');
  documentPreview.classList.add('hidden');
  imagePreview.removeAttribute('src');
  videoPreview.removeAttribute('src');
  youtubeThumb.removeAttribute('src');
  documentPreview.removeAttribute('src');
}

function testContent(){
  const url = contentUrlInput.value.trim();
  if(!url){ setStatus('Pega primero el URL del contenido.', 'error'); return; }

  resetPreview();
  previewOpenBtn.href = url;
  previewWrap.classList.remove('hidden');
  const type = detectType(url);
  setStatus('Probando contenido...', 'warn');

  if(type === 'youtube'){
    const id = extractYoutubeId(url);
    if(!id){ setStatus('No pude identificar el video de YouTube. Usa youtube.com/watch?v=, youtu.be, shorts, embed o live.', 'error'); return; }
    const watchUrl = `https://www.youtube.com/watch?v=${id}`;
    youtubeThumb.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    youtubeLink.href = watchUrl;
    previewOpenBtn.href = watchUrl;
    youtubePreview.classList.remove('hidden');
    setStatus('YouTube detectado correctamente.', 'ok');
    return;
  }

  if(type === 'video'){
    const tester = document.createElement('video');
    tester.muted = true;
    tester.playsInline = true;
    tester.preload = 'metadata';
    tester.onloadedmetadata = () => {
      videoPreview.src = url;
      videoPreview.classList.remove('hidden');
      setStatus('El video se cargó correctamente.', 'ok');
    };
    tester.onerror = () => setStatus('El video no se pudo validar. Aun así puedes generar el QR si tiene permisos Read.', 'warn');
    tester.src = url;
    return;
  }

  if(type === 'model'){
    previewOpenBtn.href = url;
    previewWrap.classList.remove('hidden');
    setStatus('Modelo 3D detectado. Use WebXR Surface Mode para abrirlo con colocación en superficie si el dispositivo lo soporta.', 'ok');
    return;
  }

  if(type === 'image'){
    const tester = new Image();
    tester.onload = () => {
      imagePreview.src = url;
      imagePreview.classList.remove('hidden');
      setStatus('La imagen se cargó correctamente. Si es PNG transparente, la transparencia se conserva.', 'ok');
    };
    tester.onerror = () => setStatus('La imagen no se pudo validar. Aun así puedes generar el QR si tiene permisos Read.', 'warn');
    tester.src = url;
    return;
  }

  documentPreview.src = url;
  documentPreview.classList.remove('hidden');
  setStatus('Live preview loaded. If a page or file blocks embedding, use Open in New Tab.', 'warn');
}

function loadImage(src){
  return new Promise((resolve,reject)=>{
    const img = new Image();
    img.crossOrigin='anonymous';
    img.onload=()=>resolve(img);
    img.onerror=reject;
    img.src=src;
  });
}

function dataUrlFromBlob(blob){
  return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.onload=()=>resolve(reader.result);
    reader.onerror=reject;
    reader.readAsDataURL(blob);
  });
}

async function createQrDataUrl(data, style='classic', simple=false){
  let ecc = simple ? 'M' : 'H';
  if(style === 'inter') ecc = 'M';
  if(window.QRCodeStyling && (style === 'modern' || style === 'tiger' || style === 'inter')){
    try{
      qrRenderHost.innerHTML = '';
      const options = {
        width: 1200,
        height: 1200,
        type: 'canvas',
        data,
        margin: style === 'inter' ? 16 : (simple ? 8 : 0),
        qrOptions: { errorCorrectionLevel: ecc },
        backgroundOptions: { color: '#ffffff' }
      };
      if(style === 'modern'){
        options.dotsOptions = simple ? { color:'#111111', type:'square' } : { color:'#14211d', type:'rounded' };
        options.cornersSquareOptions = simple ? { color:'#007B5F', type:'square' } : { color:'#007B5F', type:'extra-rounded' };
        options.cornersDotOptions = simple ? { color:'#007B5F', type:'square' } : { color:'#FED141', type:'dot' };
      } else if(style === 'tiger'){
        options.dotsOptions = simple ? { color:'#111111', type:'square' } : { color:'#111111', type:'classy-rounded' };
        options.cornersSquareOptions = { color:'#007B5F', type:'extra-rounded' };
        options.cornersDotOptions = { color:'#FED141', type:'dot' };
      } else if(style === 'inter'){
        options.dotsOptions = { color:'#111111', type:'square' };
        options.cornersSquareOptions = { color:'#007B5F', type:'square' };
        options.cornersDotOptions = { color:'#FED141', type:'square' };
      }
      const qr = new QRCodeStyling(options);
      qr.append(qrRenderHost);
      await new Promise(r => setTimeout(r, 120));
      const canvas = qrRenderHost.querySelector('canvas');
      if(canvas) return canvas.toDataURL('image/png');
      if(typeof qr.getRawData === 'function') return await dataUrlFromBlob(await qr.getRawData('png'));
    }catch(e){ console.warn('Styled QR fallback', e); }
  }
  return `https://api.qrserver.com/v1/create-qr-code/?size=1200x1200&ecc=${ecc}&format=png&data=${encodeURIComponent(data)}`;
}

function drawRoundRect(ctx,x,y,w,h,r,fill,stroke){
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y);
  ctx.closePath();
  if(fill){ ctx.fillStyle=fill; ctx.fill(); }
  if(stroke){ ctx.strokeStyle=stroke; ctx.lineWidth=4; ctx.stroke(); }
}

function wrapText(ctx,text,x,y,maxWidth,lineHeight,maxLines=3){
  if(!text) return;
  const words = text.split(' ');
  let line='';
  const lines=[];
  for(const word of words){
    const test=line+word+' ';
    if(ctx.measureText(test).width>maxWidth && line){
      lines.push(line.trim());
      line=word+' ';
    } else line=test;
  }
  lines.push(line.trim());
  lines.slice(0,maxLines).forEach((ln,i)=>ctx.fillText(ln,x,y+(i*lineHeight)));
}


function sanitizeBrandName(raw){
  return (raw || 'EAGR Learn').trim().slice(0,40) || 'EAGR Learn';
}

function sanitizeFooter(raw){
  return (raw || 'Commercial AR Experience Builder').trim().slice(0,80) || 'Commercial AR Experience Builder';
}

function sanitizeProductName(raw){
  return (raw || 'Future AR Studio').trim().slice(0,50) || 'Future AR Studio';
}

function getLogoSource(){
  if(currentBrandLogoDataUrl && currentBrandLogoDataUrl !== DEFAULT_BRAND_SETTINGS.logoDataUrl) return currentBrandLogoDataUrl;
  const url = brandLogoUrlInput ? brandLogoUrlInput.value.trim() : '';
  if(url) return url;
  return currentBrandLogoDataUrl || DEFAULT_BRAND_SETTINGS.logoDataUrl;
}

function getBrandConfig(){
  return {
    name: sanitizeBrandName(brandNameInput ? brandNameInput.value : DEFAULT_BRAND_SETTINGS.name),
    productName: sanitizeProductName(brandProductNameInput ? brandProductNameInput.value : DEFAULT_BRAND_SETTINGS.productName),
    footer: sanitizeFooter(brandFooterInput ? brandFooterInput.value : DEFAULT_BRAND_SETTINGS.footer),
    primary: brandPrimaryInput ? brandPrimaryInput.value : DEFAULT_BRAND_SETTINGS.primary,
    secondary: brandSecondaryInput ? brandSecondaryInput.value : DEFAULT_BRAND_SETTINGS.secondary,
    logoUrl: brandLogoUrlInput ? brandLogoUrlInput.value.trim() : '',
    logo: getLogoSource(),
    whiteLabel: whiteLabelModeInput ? !!whiteLabelModeInput.checked : false,
    autoSave: autoSaveBrandInput ? !!autoSaveBrandInput.checked : true
  };
}

async function fileToDataUrl(file){
  return await new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function refreshBrandPreview(){
  const brand = getBrandConfig();
  if(brandLogoPreview) brandLogoPreview.src = brand.logo;
  if(heroBrandLogo) heroBrandLogo.src = brand.logo;
  if(heroBrandTitle) heroBrandTitle.textContent = brand.whiteLabel ? brand.name : brand.name;
  if(productSubtitle) productSubtitle.innerHTML = `<strong>${brand.productName}</strong>`;
  document.documentElement.style.setProperty('--brand-primary', brand.primary);
  document.documentElement.style.setProperty('--brand-secondary', brand.secondary);
  if(brand.autoSave) saveBrandSettings(false);
  return brand;
}

function saveBrandSettings(showMessage=true){
  const brand = getBrandConfig();
  try{
    localStorage.setItem('eagrBrandSettings', JSON.stringify({
      name: brand.name,
      productName: brand.productName,
      footer: brand.footer,
      primary: brand.primary,
      secondary: brand.secondary,
      logoUrl: brand.logoUrl,
      logoDataUrl: currentBrandLogoDataUrl,
      whiteLabel: brand.whiteLabel,
      autoSave: brand.autoSave
    }));
    if(showMessage) setStatus('Brand Settings guardados correctamente.', 'ok');
  }catch(err){
    console.warn('Could not save brand settings', err);
    if(showMessage) setStatus('No se pudieron guardar los Brand Settings en este navegador.', 'warn');
  }
}

function loadBrandSettings(){
  try{
    const saved = JSON.parse(localStorage.getItem('eagrBrandSettings') || 'null');
    if(!saved) return;
    if(brandNameInput) brandNameInput.value = saved.name || DEFAULT_BRAND_SETTINGS.name;
    if(brandProductNameInput) brandProductNameInput.value = saved.productName || DEFAULT_BRAND_SETTINGS.productName;
    if(brandFooterInput) brandFooterInput.value = saved.footer || DEFAULT_BRAND_SETTINGS.footer;
    if(brandPrimaryInput) brandPrimaryInput.value = saved.primary || DEFAULT_BRAND_SETTINGS.primary;
    if(brandSecondaryInput) brandSecondaryInput.value = saved.secondary || DEFAULT_BRAND_SETTINGS.secondary;
    if(brandLogoUrlInput) brandLogoUrlInput.value = saved.logoUrl || '';
    currentBrandLogoDataUrl = saved.logoDataUrl || DEFAULT_BRAND_SETTINGS.logoDataUrl;
    if(whiteLabelModeInput) whiteLabelModeInput.checked = !!saved.whiteLabel;
    if(autoSaveBrandInput) autoSaveBrandInput.checked = saved.autoSave !== false;
  }catch(err){ console.warn('Could not load brand settings', err); }
}

function resetBrandSettings(){
  if(brandNameInput) brandNameInput.value = DEFAULT_BRAND_SETTINGS.name;
  if(brandProductNameInput) brandProductNameInput.value = DEFAULT_BRAND_SETTINGS.productName;
  if(brandFooterInput) brandFooterInput.value = DEFAULT_BRAND_SETTINGS.footer;
  if(brandPrimaryInput) brandPrimaryInput.value = DEFAULT_BRAND_SETTINGS.primary;
  if(brandSecondaryInput) brandSecondaryInput.value = DEFAULT_BRAND_SETTINGS.secondary;
  if(brandLogoUrlInput) brandLogoUrlInput.value = DEFAULT_BRAND_SETTINGS.logoUrl;
  currentBrandLogoDataUrl = DEFAULT_BRAND_SETTINGS.logoDataUrl;
  if(whiteLabelModeInput) whiteLabelModeInput.checked = DEFAULT_BRAND_SETTINGS.whiteLabel;
  if(autoSaveBrandInput) autoSaveBrandInput.checked = DEFAULT_BRAND_SETTINGS.autoSave;
  localStorage.removeItem('eagrBrandSettings');
  refreshBrandPreview().catch(console.error);
  refreshMarkerSelectionUI().catch(console.error);
  setStatus('Brand Settings restaurados.', 'ok');
}

async function loadOptionalBrandLogo(src){
  if(!src) return null;
  try { return await loadImage(src); } catch(e){ console.warn('Brand logo load failed', e); return null; }
}

function getTheme(style, brand){
  const primary = (brand && brand.primary) || '#2ae4af';
  const secondary = (brand && brand.secondary) || '#ffd86b';
  const darkText = '#14211d';
  if(style==='inter') return {accent:primary, accent2:secondary, text:'#0b1824', sub:'#44605a', bg:'#ffffff', chip:'#eef7f3', stripe:primary};
  if(style==='tiger') return {accent:primary, accent2:secondary, text:darkText, sub:'#5d716b', bg:'#ffffff', chip:'#fff6d8', stripe:'#1e1e1e'};
  return style==='modern'
    ? {accent:primary, accent2:secondary, text:darkText, sub:'#5d716b', bg:'#ffffff', chip:'#eef7f3', stripe:'#1e1e1e'}
    : {accent:primary, accent2:secondary, text:darkText, sub:'#5d716b', bg:'#ffffff', chip:'#f4f4f4', stripe:'#1e1e1e'};
}

function drawPremiumRibbon(ctx, x, y, w, h, theme, text='BRAND'){
  drawRoundRect(ctx, x, y, w, h, 16, theme.accent, null);
  drawRoundRect(ctx, x+8, y+8, w-16, h-16, 12, '#ffffff', null);
  drawRoundRect(ctx, x+18, y+16, 26, h-32, 8, theme.accent2, null);
  drawRoundRect(ctx, x+w-44, y+16, 26, h-32, 8, theme.accent2, null);
  ctx.fillStyle = theme.text;
  ctx.font = 'bold 22px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(text, x + w/2, y + h/2 + 8);
}

function drawPremiumHeaderBars(ctx, x, y, w, theme){
  drawRoundRect(ctx, x, y, w, 16, 8, theme.accent, null);
  drawRoundRect(ctx, x, y+22, w*0.72, 10, 5, theme.accent2, null);
}

function drawTigerStripes(ctx, x, y, w, h, color='#1e1e1e', alpha=0.14, flip=false){
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  for(let i=0;i<6;i++){
    const sx = flip ? x + w - (i*48) - 36 : x + i*48;
    const sy = y + (i%2)*16;
    ctx.beginPath();
    if(!flip){
      ctx.moveTo(sx, sy);
      ctx.quadraticCurveTo(sx+20, sy+18, sx+14, sy+52);
      ctx.quadraticCurveTo(sx+8, sy+78, sx+34, sy+112);
      ctx.quadraticCurveTo(sx+46, sy+76, sx+56, sy+12);
    } else {
      ctx.moveTo(sx, sy);
      ctx.quadraticCurveTo(sx-20, sy+18, sx-14, sy+52);
      ctx.quadraticCurveTo(sx-8, sy+78, sx-34, sy+112);
      ctx.quadraticCurveTo(sx-46, sy+76, sx-56, sy+12);
    }
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawTigerBanner(ctx, x, y, w, h, theme){
  drawRoundRect(ctx, x, y, w, h, 18, theme.accent2, null);
  drawTigerStripes(ctx, x+12, y+8, w-24, h-16, theme.stripe, 0.2, false);
  drawTigerStripes(ctx, x+12, y+8, w-24, h-16, theme.stripe, 0.12, true);
  ctx.fillStyle = theme.text;
  ctx.font='bold 22px Arial';
  ctx.textAlign='center';
  ctx.fillText('TIGER TECH STYLE', x + w/2, y + h/2 + 8);
}

async function buildIntegratedImage(qrDataUrl,titleText,descriptionText,contentType,style,markerCfg,brandCfg){
  const qr = await loadImage(qrDataUrl);
  const marker = await loadImage(markerCfg.image);
  const theme = getTheme(style, brandCfg);
  const brandLogo = await loadOptionalBrandLogo(brandCfg.logo);
  const canvas = document.createElement('canvas');
  canvas.width=1600;
  canvas.height=1940;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f7f7f7';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  drawRoundRect(ctx,60,60,1480,1820,44,'#ffffff',theme.accent);

  if(brandLogo){ ctx.drawImage(brandLogo, 98, 96, 176, 80); }
  ctx.fillStyle = theme.accent;
  ctx.textAlign='center';
  ctx.font='bold 56px Arial';
  ctx.fillText((brandCfg.name || 'EAGR Learn').toUpperCase().slice(0,24),800,165);
  ctx.fillStyle = theme.sub;
  ctx.font='bold 18px Arial';
  ctx.fillText(brandCfg.productName || brandCfg.footer,800,236);
  ctx.fillStyle = theme.text;
  ctx.font='bold 40px Arial';
  ctx.fillText(titleText || 'Experiencia AR',800,290);
  ctx.fillStyle = theme.sub;
  ctx.font='28px Arial';
  ctx.fillText('Image · Video · YouTube · PDF · Link · 3D',800,340);

  // Large QR area
  ctx.drawImage(qr,200,410,1200,1200);

  // Only the clean marker in the middle of the QR code
  const markerCardX = 585;
  const markerCardY = 820;
  const markerCardSize = 430;
  drawRoundRect(ctx, markerCardX, markerCardY, markerCardSize, markerCardSize, 26, '#ffffff', '#d6d6d6');
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,.12)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 8;
  drawRoundRect(ctx, markerCardX, markerCardY, markerCardSize, markerCardSize, 26, '#ffffff', '#d6d6d6');
  ctx.restore();
  ctx.drawImage(marker, markerCardX+18, markerCardY+18, markerCardSize-36, markerCardSize-36);

  drawRoundRect(ctx,210,1650,1180,130,28,'#FFF4CC',theme.accent2);
  ctx.fillStyle = theme.text;
  ctx.font='bold 24px Arial';
  wrapText(ctx,`Escanea el QR y luego apunta al Marker ${markerCfg.label} del centro.`,800,1710,1040,30,2);

  ctx.fillStyle = theme.sub;
  ctx.font='18px Arial';
  ctx.fillText(`${brandCfg.name} · ${brandCfg.productName || brandCfg.footer}`,800,1830);
  return canvas.toDataURL('image/png');
}

async function buildSeparatedImage(qrDataUrl,titleText,descriptionText,contentType,style,markerCfg,brandCfg){
  const qr = await loadImage(qrDataUrl);
  const marker = await loadImage(markerCfg.image);
  const theme = getTheme(style, brandCfg);
  const brandLogo = await loadOptionalBrandLogo(brandCfg.logo);
  const canvas = document.createElement('canvas');
  canvas.width=1800;
  canvas.height=1450;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f7f7f7';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  drawRoundRect(ctx,60,60,1680,1330,40,'#ffffff',theme.accent);

  if(brandLogo){ ctx.drawImage(brandLogo, 110, 96, 165, 74); }
  ctx.fillStyle = theme.accent;
  ctx.font='bold 42px Arial';
  ctx.textAlign='left';
  ctx.fillText((brandCfg.name || 'EAGR Learn').toUpperCase().slice(0,20),300,160);
  ctx.fillStyle = theme.sub;
  ctx.font='bold 18px Arial';
  ctx.fillText(brandCfg.productName || brandCfg.footer,300,194);
  ctx.fillStyle = theme.text;
  ctx.font='bold 34px Arial';
  ctx.fillText(titleText || 'Experiencia AR',110,246);

  // QR left
  drawRoundRect(ctx,100,320,700,700,30,'#ffffff','#d7e5e0');
  ctx.drawImage(qr,120,340,660,660);
  ctx.fillStyle = theme.text;
  ctx.textAlign='center';
  ctx.font='bold 26px Arial';
  ctx.fillText('Paso 1: Escanea el QR Code',450,1068);

  // Large clean marker right
  drawRoundRect(ctx,900,270,800,800,30,'#f9fbfa','#d7e5e0');
  drawRoundRect(ctx,1008,378,584,584,28,'#ffffff','#d6d6d6');
  ctx.drawImage(marker,1028,398,544,544);
  ctx.fillStyle = theme.text;
  ctx.font='bold 26px Arial';
  ctx.fillText(`Paso 2: Apunta al Marker ${markerCfg.label}`,1300,1068);

  drawRoundRect(ctx,110,1130,1580,108,18,'#eef7f3',null);
  ctx.fillStyle = theme.text;
  ctx.font='bold 22px Arial';
  wrapText(ctx,`Esta versión usa un QR simple y un Marker ${markerCfg.label} más grande y limpio para facilitar el escaneo y la detección.`,900,1172,1460,28,2);

  drawRoundRect(ctx,110,1280,1580,92,18,'#FFF4CC',theme.accent2);
  ctx.fillStyle = theme.text;
  ctx.font='bold 22px Arial';
  wrapText(ctx,`El Marker muestra la palabra ${markerCfg.label} sustituyendo HIRO.`,900,1335,1320,28,2);

  return canvas.toDataURL('image/png');
}

async function generate(){
  const arUrl = buildArUrl();
  if(!arUrl){ setStatus('Falta el URL del contenido.', 'error'); return; }

  const type = detectType(contentUrlInput.value.trim());
  const style = qrStyleInput.value;
  const markerCfg = await refreshMarkerSelectionUI();
  const brandCfg = await refreshBrandPreview();
  const arMode = getAdvancedArMode(type);

  resultUrl.value = arUrl;
  openBtn.href = arUrl;
  openBtn.classList.remove('disabled');
  setStatus(arMode === 'webxr' ? `Creando experiencia WebXR Surface para ${markerCfg.label}...` : `Creando imágenes con el Marker personalizado ${markerCfg.label} (${getMarkerStyleLabel(markerCfg.visualStyle)})...`, 'warn');

  try{
    const integratedQr = await createQrDataUrl(arUrl, style, false);
    const separatedQr = await createQrDataUrl(arUrl, style === 'inter' ? 'inter' : 'classic', true);

    const integrated = await buildIntegratedImage(integratedQr,titleInput.value.trim(),descriptionInput.value.trim(),type,style,markerCfg,brandCfg);
    const separated = await buildSeparatedImage(separatedQr,titleInput.value.trim(),descriptionInput.value.trim(),type,style,markerCfg,brandCfg);

    integratedPreview.innerHTML = `<img src="${integrated}" alt="Versión integrada">`;
    separatedPreview.innerHTML = `<img src="${separated}" alt="Versión separada">`;

    downloadIntegratedBtn.href = integrated;
    downloadIntegratedBtn.download = `QR_Marker_Integrado_${markerCfg.label.replace(/[^A-Z0-9]+/g,'-')}_${markerCfg.visualStyle}_${type}_${style}.png`;
    downloadIntegratedBtn.classList.remove('disabled');

    downloadSeparatedBtn.href = separated;
    downloadSeparatedBtn.download = `QR_Marker_Separado_${markerCfg.label.replace(/[^A-Z0-9]+/g,'-')}_${markerCfg.visualStyle}_${type}_${style}.png`;
    downloadSeparatedBtn.classList.remove('disabled');

    setStatus(arMode === 'webxr' ? `Listo. WebXR Surface Mode activado para modelo 3D.` : `Listo. El Marker personalizado es ${markerCfg.label} con estilo ${getMarkerStyleLabel(markerCfg.visualStyle)}.`, 'ok');
  }catch(e){
    console.error(e);
    integratedPreview.innerHTML = '<p>No se pudo crear la versión integrada.</p>';
    separatedPreview.innerHTML = '<p>No se pudo crear la versión separada.</p>';
    setStatus('No se pudieron crear las imágenes. Verifica conexión a internet para generar el QR.', 'error');
  }
}


baseUrlInput.value = currentBaseUrl();
if(markerTextInput){
  markerTextInput.addEventListener('input', () => { if(brandNameInput) brandNameInput.addEventListener('input', () => { refreshMarkerSelectionUI().catch(console.error); refreshBrandPreview().catch(console.error); });
if(brandProductNameInput) brandProductNameInput.addEventListener('input', () => { refreshBrandPreview().catch(console.error); });
if(brandFooterInput) brandFooterInput.addEventListener('input', () => { refreshBrandPreview().catch(console.error); });
if(brandPrimaryInput) brandPrimaryInput.addEventListener('input', () => { refreshBrandPreview().catch(console.error); refreshMarkerSelectionUI().catch(console.error); });
if(brandSecondaryInput) brandSecondaryInput.addEventListener('input', () => { refreshBrandPreview().catch(console.error); refreshMarkerSelectionUI().catch(console.error); });
if(brandLogoUrlInput) brandLogoUrlInput.addEventListener('input', () => { currentBrandLogoDataUrl = DEFAULT_BRAND_SETTINGS.logoDataUrl; refreshBrandPreview().catch(console.error); });
if(whiteLabelModeInput) whiteLabelModeInput.addEventListener('change', () => { refreshBrandPreview().catch(console.error); });
if(autoSaveBrandInput) autoSaveBrandInput.addEventListener('change', () => { refreshBrandPreview().catch(console.error); });
if(saveBrandBtn) saveBrandBtn.addEventListener('click', () => saveBrandSettings(true));
if(resetBrandBtn) resetBrandBtn.addEventListener('click', resetBrandSettings);
if(applyBrandBtn) applyBrandBtn.addEventListener('click', () => { refreshBrandPreview().catch(console.error); refreshMarkerSelectionUI().catch(console.error); setStatus('Brand Preview aplicado.', 'ok'); });
if(brandLogoUploadInput){
  brandLogoUploadInput.addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    try{
      currentBrandLogoDataUrl = await fileToDataUrl(file);
      await refreshBrandPreview();
      setStatus('Logo cargado correctamente.', 'ok');
    }catch(err){
      console.error(err);
      setStatus('No se pudo cargar el logo.', 'error');
    }
  });
}
loadBrandSettings();
refreshBrandPreview().catch(console.error);
refreshMarkerSelectionUI().catch(console.error); });
  markerTextInput.addEventListener('change', () => { refreshMarkerSelectionUI().catch(console.error); });
}
if(markerTextColorInput){
  markerTextColorInput.addEventListener('input', () => { refreshMarkerSelectionUI().catch(console.error); });
  markerTextColorInput.addEventListener('change', () => { refreshMarkerSelectionUI().catch(console.error); });
}
if(markerVisualStyleInput){
  markerVisualStyleInput.addEventListener('input', () => { refreshMarkerSelectionUI().catch(console.error); });
  markerVisualStyleInput.addEventListener('change', () => { refreshMarkerSelectionUI().catch(console.error); });
}
refreshMarkerSelectionUI().catch(console.error);
testBtn.addEventListener('click', testContent);
generateBtn.addEventListener('click', generate);

