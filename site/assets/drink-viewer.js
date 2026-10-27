(() => {
  'use strict';
  const drinks = {
    honey: { name:'Kombucha Mật Ong', color:0xdca32c, clear:true, notes:[['Chua thanh','Một chút chua dịu mở vị.'],['Ngọt dịu','Vị ngọt nhẹ nhàng.'],['Thơm mật ong','Hương mật ong đặc trưng.']] },
    milk: { name:'Kombucha Sữa', color:0xdfb785, notes:[['Béo nhẹ','Cảm giác mềm, béo nhẹ.'],['Chua dịu','Chua dịu cùng vị ngọt mềm.'],['Thơm sữa','Hương sữa trong từng ngụm.']] },
    yogurt: { name:'Kombucha Sữa Chua', color:0xf0e3bf, notes:[['Béo mịn','Vị béo mịn của sữa chua.'],['Chua thanh','Chua thanh, ngọt nhẹ.'],['Thơm sữa','Hương sữa nhẹ nhàng.']] },
    gold: { name:'Kombucha Vàng', color:0x54200c, clear:true, notes:[['Đắng dịu','Một nét đắng nhẹ.'],['Chua thanh','Đầu vị chua thanh.'],['Thơm cà phê','Hậu vị cà phê, ngọt nhẹ.']] }
  };
  const dialog=document.createElement('dialog');dialog.className='drink-viewer';dialog.setAttribute('aria-labelledby','dv-title');
  dialog.innerHTML=`<div class="dv-head"><div><div class="dv-kicker">TRẠM KHỞI / KHÁM PHÁ HƯƠNG VỊ</div><h2 id="dv-title"></h2></div><button class="dv-close" aria-label="Đóng khung 3D">×</button></div><div class="dv-stage"><div class="dv-hint">KÉO ĐỂ XOAY 360° · CHỤM HAI NGÓN ĐỂ THU PHÓNG</div><svg class="dv-branches" aria-hidden="true"><path/><path/><path/><circle r="3"/><circle r="3"/><circle r="3"/></svg><div class="dv-note n0"><small>01 / CẢM NHẬN</small><strong></strong><p></p></div><div class="dv-note n1"><small>02 / ĐẦU VỊ</small><strong></strong><p></p></div><div class="dv-note n2"><small>03 / DƯ VỊ</small><strong></strong><p></p></div><img class="dv-photo" alt=""><div class="dv-status" role="status">Đang chuẩn bị ly 3D…</div></div><div class="dv-controls"><button class="dv-auto" aria-pressed="false">Tự xoay</button><label class="dv-angle">Góc xoay <input aria-label="Góc xoay ly 3D" type="range" min="0" max="360" value="0" step="1"></label><button class="dv-reset">Đặt lại</button><button class="dv-original" aria-pressed="false">Ảnh gốc</button></div><p class="dv-caption">Mô hình 3D minh họa theo ảnh sản phẩm · Mô tả vị theo menu Trạm Khởi</p>`;
  document.body.append(dialog);
  const $=s=>dialog.querySelector(s), stage=$('.dv-stage'), status=$('.dv-status'), slider=$('input'), auto=$('.dv-auto');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let api=null, loading=null, current=null, opener=null, original=false, generation=0;
  function controlsEnabled(value){[auto,slider,$('.dv-reset'),$('.dv-original')].forEach(el=>{el.disabled=!value;});}
  const getKey=button=>Object.keys(drinks).find(k=>button.dataset.lightbox?.includes('kombucha-'+k+'.'));
  function showOriginal(value){original=value;stage.classList.toggle('photo-mode',value);$('.dv-original').setAttribute('aria-pressed',String(value));$('.dv-original').textContent=value?'Trở lại 3D':'Ảnh gốc';api?.setActive(dialog.open&&!document.hidden&&!value);}
  async function open(button,key){
    opener=button;current=key;const ticket=++generation;const data=drinks[key];$('#dv-title').textContent=data.name;
    $('.dv-photo').src=button.dataset.lightbox;$('.dv-photo').alt='Ảnh sản phẩm '+data.name;
    [...dialog.querySelectorAll('.dv-note')].forEach((el,i)=>{el.querySelector('strong').textContent=data.notes[i][0];el.querySelector('p').textContent=data.notes[i][1];});
    auto.setAttribute('aria-pressed','false');slider.value=0;status.hidden=false;status.textContent='Đang chuẩn bị ly 3D…';$('.dv-caption').textContent='Mô hình 3D minh họa theo ảnh sản phẩm · Mô tả vị theo menu Trạm Khởi';controlsEnabled(false);showOriginal(false);dialog.showModal();
    try{loading ||= createViewer();api=await loading;if(ticket!==generation||!dialog.open)return;api.setDrink(data,key);api.resize();api.setActive(true);status.hidden=true;controlsEnabled(true);}
    catch(error){if(ticket!==generation)return;loading=null;status.hidden=true;showOriginal(true);controlsEnabled(false);$('.dv-original').textContent='Ảnh gốc';$('.dv-caption').textContent='Thiết bị chưa hiển thị được 3D. Bạn vẫn có thể xem ảnh sản phẩm gốc.';}
  }
  document.addEventListener('click',event=>{const button=event.target.closest('.drink-card [data-lightbox]');if(!button)return;const key=getKey(button);if(!key)return;event.preventDefault();event.stopImmediatePropagation();open(button,key);},true);
  $('.dv-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
  dialog.addEventListener('close',()=>{generation++;api?.setActive(false);opener?.focus({preventScroll:true});});
  $('.dv-original').addEventListener('click',()=>showOriginal(!original));
  auto.addEventListener('click',()=>{const active=auto.getAttribute('aria-pressed')!=='true';auto.setAttribute('aria-pressed',String(active));api?.auto(active);});
  slider.addEventListener('input',()=>api?.rotate(+slider.value));$('.dv-reset').addEventListener('click',()=>{slider.value=0;auto.setAttribute('aria-pressed','false');api?.reset();});
  reduced.addEventListener('change',()=>{if(reduced.matches){auto.setAttribute('aria-pressed','false');api?.auto(false);}});
  document.addEventListener('visibilitychange',()=>api?.setActive(dialog.open&&!document.hidden&&!original));
  async function createViewer(){
    const [T,{OrbitControls},{RoomEnvironment}]=await Promise.all([import('./vendor/three.module.js'),import('./vendor/OrbitControls.js'),import('./vendor/RoomEnvironment.js')]);
    const renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.95;renderer.setClearColor(0x000000,0);
    const canvas=renderer.domElement;canvas.className='dv-canvas';canvas.tabIndex=0;canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Ly nước 3D. Kéo để xoay; dùng phím mũi tên trái phải hoặc thanh góc xoay.');stage.prepend(canvas);
    const scene=new T.Scene(), camera=new T.PerspectiveCamera(40,1,.1,50);
    const pmrem=new T.PMREMGenerator(renderer), room=new RoomEnvironment();const env=pmrem.fromScene(room,.04);scene.environment=env.texture;room.dispose();pmrem.dispose();
    scene.add(new T.HemisphereLight(0xfff6dd,0x638759,2.6));const key=new T.DirectionalLight(0xffe8b6,3);key.position.set(3,7,5);scene.add(key);
    const controls=new OrbitControls(camera,canvas);controls.enablePan=false;controls.enableDamping=false;controls.minDistance=4.4;controls.maxDistance=11;controls.minPolarAngle=.55;controls.maxPolarAngle=1.85;controls.target.set(0,1.9,0);controls.rotateSpeed=.7;controls.autoRotateSpeed=.8;
    const model=new T.Group();model.scale.set(1.12,1,1.12);scene.add(model);
    const paths=[...dialog.querySelectorAll('.dv-branches path')], dots=[...dialog.querySelectorAll('.dv-branches circle')], notes=[...dialog.querySelectorAll('.dv-note')];
    let active=false, frame=0, spin=false, clock=0, w=1,h=1, resources=[];
    const anchors=[new T.Vector3(-.49,2.85,.24),new T.Vector3(.57,2.1,.2),new T.Vector3(-.45,1.05,.2)], point=new T.Vector3();
    function mesh(geo,mat,x=0,y=0,z=0){const m=new T.Mesh(geo,mat);m.position.set(x,y,z);model.add(m);return m;}
    function material(options){const m=new T.MeshPhysicalMaterial(options);resources.push(m);return m;}
    function draw(){if(!dialog.open)return;model.updateMatrixWorld(true);renderer.render(scene,camera);const rect=stage.getBoundingClientRect();for(let i=0;i<3;i++){point.copy(anchors[i]);model.localToWorld(point);point.project(camera);const x=(point.x*.5+.5)*w,y=(-point.y*.5+.5)*h;const nr=notes[i].getBoundingClientRect();const nx=(i===1?nr.left:nr.right)-rect.left,ny=nr.top-rect.top+nr.height*.42;const elbow=nx+(i===1?-22:22);paths[i].setAttribute('d',`M${nx},${ny} L${elbow},${ny} L${x},${y}`);dots[i].setAttribute('cx',x);dots[i].setAttribute('cy',y);}canvas.dataset.azimuth=controls.getAzimuthalAngle().toFixed(3);canvas.dataset.rotation=model.rotation.y.toFixed(3);}
    function tick(t){frame=0;if(!active||!spin)return;controls.update(Math.min(.05,(t-clock)/1000||.016));clock=t;draw();frame=requestAnimationFrame(tick);}
    function setActive(value){active=value;if(!active){cancelAnimationFrame(frame);frame=0;}else{draw();if(spin&&!frame){clock=performance.now();frame=requestAnimationFrame(tick);}}}
    function autoRotate(value){spin=value;controls.autoRotate=value;if(!value){cancelAnimationFrame(frame);frame=0;}setActive(active);}
    controls.addEventListener('change',draw);controls.addEventListener('start',()=>{autoRotate(false);auto.setAttribute('aria-pressed','false');});
    function reset(){model.rotation.y=0;camera.position.set(0,2.9,w/h<.8?8.6:6.8);controls.target.set(0,1.9,0);autoRotate(false);controls.update();draw();}
    function resize(){w=stage.clientWidth;h=stage.clientHeight;if(w<1||h<1)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();reset();}
    new ResizeObserver(()=>{if(dialog.open)resize();}).observe(stage);
    function rotate(degrees){model.rotation.y=T.MathUtils.degToRad(degrees);autoRotate(false);auto.setAttribute('aria-pressed','false');draw();}
    canvas.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();slider.value=(+slider.value+(event.key==='ArrowRight'?15:345))%360;rotate(+slider.value);}});
    const logo=await new Promise(resolve=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src='assets/logo.webp';});await document.fonts.ready;
    function setDrink(data,id){
      for(const child of [...model.children]){child.geometry?.dispose();model.remove(child);}resources.forEach(r=>r.dispose());resources=[];
      const glass=material({color:0xffffff,roughness:.08,metalness:0,transmission:1,thickness:.1,ior:1.47,transparent:true,opacity:.42,clearcoat:1,envMapIntensity:1.1,side:T.DoubleSide,depthWrite:false});
      const profile=[[0,.12],[.47,.12],[.49,.18],[.68,3.55],[.675,3.62],[.645,3.62],[.635,3.55],[.455,.24],[0,.24]].map(v=>new T.Vector2(...v));mesh(new T.LatheGeometry(profile,80),glass);
      const rimMat=material({color:0xfaf9ea,roughness:.12,metalness:.15,transparent:true,opacity:.65});const rim=mesh(new T.TorusGeometry(.662,.023,10,80),rimMat,0,3.605);rim.rotation.x=Math.PI/2;
      const base=mesh(new T.TorusGeometry(.475,.038,10,64),rimMat,0,.18);base.rotation.x=Math.PI/2;
      const liquid=material({color:data.color,roughness:.2,metalness:0,transmission:data.clear?.22:0,thickness:.6,ior:1.33,clearcoat:.7});mesh(new T.CylinderGeometry(.607,.449,2.92,64),liquid,0,1.72);
      const surface=mesh(new T.CircleGeometry(.605,64),liquid,0,3.184);surface.rotation.x=-Math.PI/2;
      const iceMat=material({color:0xfff7df,roughness:.1,transmission:.7,thickness:.25,ior:1.31,transparent:true,opacity:.72,clearcoat:1});
      for(let i=0;i<7;i++){const a=i*2.399,r=i===6?0:.32;const cube=mesh(new T.BoxGeometry(.37,.34,.38),iceMat,Math.sin(a)*r,3.16+(i%3)*.07,Math.cos(a)*r);cube.rotation.set(i*.26,a,i*.17);}
      const fluteMat=material({color:0xe7f1dd,transparent:true,opacity:.16,roughness:.13,metalness:.12,depthWrite:false});
      for(let i=0;i<20;i++){const a=i/20*Math.PI*2;const rib=mesh(new T.CylinderGeometry(.012,.018,1.1,5),fluteMat,Math.sin(a)*.507,.8,Math.cos(a)*.507);rib.rotation.z=-Math.sin(a)*.055;rib.rotation.x=Math.cos(a)*.055;}
      const dewMat=material({color:0xf8ffed,roughness:.08,transmission:.8,transparent:true,opacity:.35,ior:1.33,depthWrite:false});
      for(let i=0;i<35;i++){const a=i*2.399,y=.4+(i*1.37%2.85),r=.49+(y-.18)/3.37*.19+.012;const drop=mesh(new T.SphereGeometry(.012+(i%3)*.003,6,5),dewMat,Math.sin(a)*r,y,Math.cos(a)*r);drop.scale.y=1.3;}
      const label=document.createElement('canvas');label.width=512;label.height=512;const ctx=label.getContext('2d');ctx.fillStyle='#f1e7c6';ctx.beginPath();ctx.arc(256,256,241,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#b5934b';ctx.lineWidth=4;ctx.beginPath();ctx.arc(256,256,229,0,Math.PI*2);ctx.stroke();if(logo)ctx.drawImage(logo,180,100,240,250,179,83,154,160);ctx.fillStyle='#163e2d';ctx.textAlign='center';ctx.font='600 43px Montserrat';ctx.fillText('TRẠM KHỞI',256,304);ctx.fillRect(160,326,192,2);ctx.font='500 21px Montserrat';ctx.fillText(data.name.replace('Kombucha ','').toUpperCase(),256,365);ctx.font='400 14px Montserrat';ctx.fillText('COFFEE & KOMBUCHA',256,401);
      const texture=new T.CanvasTexture(label);texture.colorSpace=T.SRGBColorSpace;resources.push(texture);const labelMat=new T.MeshBasicMaterial({map:texture,transparent:true,toneMapped:false,side:T.FrontSide});resources.push(labelMat);const stamp=mesh(new T.CylinderGeometry(.638,.58,.98,48,1,true,-.825,1.65),labelMat,0,2.0,0);stamp.renderOrder=5;
      // Cylinder texture covers its arc once, so the label rotates with the glass.
      if(id==='honey'){
        const leafMat=material({color:0x497a2f,roughness:.55,side:T.DoubleSide});for(let i=0;i<3;i++){const shape=new T.Shape();shape.moveTo(0,0);shape.bezierCurveTo(-.2,.12,-.23,.4,0,.64);shape.bezierCurveTo(.23,.4,.2,.12,0,0);const leaf=mesh(new T.ShapeGeometry(shape),leafMat,.2,3.4,-.14);leaf.rotation.set(-.45,i*2.1,.5-i*.45);}
      }
      const ringMat=new T.MeshBasicMaterial({color:0xbac9a6,transparent:true,opacity:.35,side:T.DoubleSide});resources.push(ringMat);const ring=mesh(new T.RingGeometry(.9,.915,80),ringMat,0,.04);ring.rotation.x=-Math.PI/2;
      const shadowTex=document.createElement('canvas');shadowTex.width=128;shadowTex.height=128;const sc=shadowTex.getContext('2d'),gradient=sc.createRadialGradient(64,64,1,64,64,64);gradient.addColorStop(0,'#163e2d40');gradient.addColorStop(1,'#163e2d00');sc.fillStyle=gradient;sc.fillRect(0,0,128,128);const shadowMap=new T.CanvasTexture(shadowTex);resources.push(shadowMap);const sm=new T.MeshBasicMaterial({map:shadowMap,transparent:true,depthWrite:false});resources.push(sm);const shadow=mesh(new T.PlaneGeometry(2.7,2.7),sm,0,.02);shadow.rotation.x=-Math.PI/2;
      canvas.dataset.drink=id;reset();
    }
    canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();setActive(false);showOriginal(true);$('.dv-caption').textContent='Đã chuyển sang ảnh gốc vì kết nối 3D bị gián đoạn.';});
    return {setDrink,resize,setActive,auto:autoRotate,rotate,reset};
  }
})();
