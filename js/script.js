var LETTER_DATA = {
  title: "Happy Birthday Bon 🎂",
  date:  "29 tháng 8, 2009",
  content: `Bon ơi,

Chúc mừng sinh nhật nha! 🎉

Hôm nay là một ngày thật đặc biệt — ngày mà một người xinh đẹp, đáng yêu và thật tuyệt vời đã ra đời. Đó chính là Bon!

Chúc Bon luôn cười thật tươi, luôn hạnh phúc với mọi điều nhỏ bé trong cuộc sống. Tuổi mới mang đến thật nhiều điều kỳ diệu, thật nhiều kỷ niệm đáng nhớ, và thật nhiều tình yêu thương từ những người xung quanh.

Mọi ước mơ của Bon đều sẽ thành hiện thực, mọi con đường đều rộng mở. Bon xứng đáng được nhận tất cả những điều tốt đẹp nhất trên đời này.

Một lần nữa chúc mừng sinh nhật Bon! 💕
Sinh nhật vui vẻ nha Bon 🌸`,
  signatureName: "T Q D"
};


(function(){
  var CORRECT='29082009', MAX_LEN=8;
  var input='', locked=false;

  var pc=document.getElementById('pass-particles');
  for(var i=0;i<28;i++){
    var p=document.createElement('div'); p.className='pp';
    var sz=Math.random()*3+1.5;
    p.style.cssText='width:'+sz+'px;height:'+sz+'px;left:'+(Math.random()*100)+'%;bottom:'+(Math.random()*10-5)+'%;--d:'+(Math.random()*7+6).toFixed(1)+'s;--delay:-'+(Math.random()*10).toFixed(1)+'s;background:'+(Math.random()>.5?'#ff5fa8':'#c040ff')+';';
    pc.appendChild(p);
  }

  function updateDots(){
    for(var i=0;i<MAX_LEN;i++){
      var d=document.getElementById('d'+i);
      d.classList.toggle('filled',i<input.length);
      d.classList.remove('error');
    }
  }
  function animKey(n){
    var b=document.querySelector('.key[data-n="'+n+'"]');
    if(!b)return; b.classList.add('pressed');
    setTimeout(function(){b.classList.remove('pressed');},180);
  }

  window.press=function(n){
    if(locked||input.length>=MAX_LEN)return;
    if(input.length===0){
      var a=document.getElementById('bgm');
      if(a){a.muted=false;a.play().catch(function(){});}
    }
    animKey(n); input+=n; updateDots();
    if(input.length===MAX_LEN) setTimeout(check,120);
  };
  window.passDel=function(){
    if(locked)return; input=input.slice(0,-1); updateDots();
  };

  function check(){
    if(input===CORRECT) doSuccess(); else doFail();
  }
  function doSuccess(){
    locked=true;
    spawnConfetti();
    setTimeout(function(){ document.getElementById('pass-success').classList.add('show'); },150);
    setTimeout(function(){
      document.getElementById('pass-screen').classList.add('hide');
      var tr=document.getElementById('scene-transition');
      tr.classList.add('fade-in');
      setTimeout(function(){
        document.getElementById('pass-success').style.display='none';
        document.getElementById('letter-screen').classList.add('show');
        spawnLetterParticles();
        tr.classList.remove('fade-in');
      },600);
    },1000);
  }
  function doFail(){
    var row=document.getElementById('dots');
    for(var i=0;i<MAX_LEN;i++) document.getElementById('d'+i).classList.add('error');
    row.classList.add('shake');
    setTimeout(function(){ row.classList.remove('shake'); input=''; updateDots(); },600);
    alert('Mật khẩu đúng là: ' + CORRECT);
  }
  function spawnConfetti(){
    var cols=['#ff5fa8','#ffb3d9','#c040ff','#ff8eb8','#ffe4f3','#ffdd57'];
    for(var i=0;i<80;i++){
      var el=document.createElement('div'); el.className='confetti-piece';
      var rot=(Math.random()-.5)*1440;
      el.style.cssText='left:'+(Math.random()*100)+'vw;top:0;background:'+cols[Math.floor(Math.random()*cols.length)]+';border-radius:'+(Math.random()>.5?'50%':'2px')+';width:'+(Math.random()*8+4)+'px;height:'+(Math.random()*8+4)+'px;--cf-d:'+(Math.random()*1.8+1.2).toFixed(2)+'s;--cf-delay:'+(Math.random()*.8).toFixed(2)+'s;--cf-rot:'+rot+'deg;';
      document.body.appendChild(el);
      setTimeout(function(){el.remove();},3200);
    }
  }
  document.addEventListener('keydown',function(e){
    if(!locked){
      if(e.key>='0'&&e.key<='9') press(e.key);
      else if(e.key==='Backspace') passDel();
    }
  });
})();


function spawnLetterParticles(){
  var ls=document.getElementById('letter-screen');
  var cols=['#ff5fa8','#c040ff','#ffb3d9','#8040ff'];
  for(var i=0;i<20;i++){
    var p=document.createElement('div'); p.className='letter-particle';
    var sz=Math.random()*4+2;
    p.style.cssText='width:'+sz+'px;height:'+sz+'px;left:'+(Math.random()*100)+'%;top:'+(Math.random()*100)+'%;background:'+cols[Math.floor(Math.random()*cols.length)]+';--lpd:'+(Math.random()*4+5).toFixed(1)+'s;--lpdelay:-'+(Math.random()*6).toFixed(1)+'s;';
    ls.appendChild(p);
  }
}

document.getElementById('envelope-icon').addEventListener('click', openLetter);
document.getElementById('envelope-tap').addEventListener('click', openLetter);
var letterOpened = false;

function openLetter(){
  if(letterOpened) return;
  letterOpened = true;

  var envTap = document.getElementById('envelope-tap');
  envTap.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  envTap.style.opacity = '0';
  envTap.style.transform = 'scale(0.8)';

  setTimeout(function(){
    envTap.style.display = 'none';
    var lw = document.getElementById('letter-content-wrap');
    lw.style.display = 'flex';
    lw.style.opacity = '0';
    lw.style.transform = 'translateY(20px) scale(0.97)';
    lw.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        lw.style.opacity = '1';
        lw.style.transform = 'none';
      });
    });
    startLetterFireworks();
    typeLetterContent();
  }, 400);
}

function typeLetterContent(){
  var titleEl  = document.getElementById('letter-title');
  var dateEl   = document.getElementById('letter-date');
  var textEl   = document.getElementById('letter-text');
  var sigEl    = document.getElementById('letter-signature');
  var sigName  = document.getElementById('sig-name');
  var btnNext  = document.getElementById('btn-to-cake');

  var title   = LETTER_DATA.title;
  var date    = LETTER_DATA.date;
  var content = LETTER_DATA.content;
  var sigNameText = LETTER_DATA.signatureName;

  // Dùng Array.from để tách đúng từng ký tự kể cả emoji (emoji chiếm 2 code unit,
  // lặp bằng content[i] thường sẽ làm vỡ/mất ký tự và có thể làm cả đoạn sau bị lỗi).
  var contentChars = Array.from(content);
  var sigChars     = Array.from(sigNameText);

  var cursorSpan = '<span class="letter-title-cursor"></span>';

  // Lưới an toàn: nếu bất kỳ bước nào lỗi, hiện luôn full nội dung thay vì để trống mãi.
  function showEverythingInstantly(){
    titleEl.innerHTML = title;
    dateEl.textContent = date;
    textEl.textContent = content;
    sigEl.style.opacity = '1';
    sigName.textContent = sigNameText;
    btnNext.classList.add('visible');
  }

  try{
    var ti=0;
    titleEl.innerHTML = cursorSpan;
    var tInt = setInterval(function(){
      try{
        if(ti < title.length){
          titleEl.innerHTML = title.substring(0,ti+1) + cursorSpan;
          ti++;
        } else {
          clearInterval(tInt);
          titleEl.innerHTML = title;

          setTimeout(function(){
            var di=0;
            var dInt = setInterval(function(){
              try{
                if(di < date.length){
                  dateEl.textContent = date.substring(0,di+1);
                  di++;
                } else {
                  clearInterval(dInt);

                  setTimeout(function(){
                    var ci=0;
                    var typingCursor = document.createElement('span');
                    typingCursor.className = 'letter-typing-cursor';
                    textEl.innerHTML = '';
                    textEl.appendChild(typingCursor);

                    var cInt = setInterval(function(){
                      try{
                        if(ci < contentChars.length){
                          textEl.insertBefore(document.createTextNode(contentChars[ci]), typingCursor);
                          ci++;
                          var body = textEl.closest('.letter-body');
                          if(body) body.scrollTop = body.scrollHeight;
                        } else {
                          clearInterval(cInt);
                          typingCursor.remove();

                          setTimeout(function(){
                            sigEl.style.opacity = '1';

                            var ni = 0;
                            sigName.textContent = '';
                            var nInt = setInterval(function(){
                              try{
                                if(ni < sigChars.length){
                                  sigName.textContent += sigChars[ni];
                                  ni++;
                                  var body2 = sigEl.closest('.letter-body');
                                  if(body2) body2.scrollTop = body2.scrollHeight;
                                } else {
                                  clearInterval(nInt);
                                  setTimeout(function(){
                                    btnNext.classList.add('visible');
                                  }, 350);
                                }
                              }catch(e3){ clearInterval(nInt); showEverythingInstantly(); }
                            }, 90);
                          }, 400);
                        }
                      }catch(e2){ clearInterval(cInt); showEverythingInstantly(); }
                    }, 28);
                  }, 300);
                }
              }catch(e1){ clearInterval(dInt); showEverythingInstantly(); }
            }, 60);
          }, 200);
        }
      }catch(e0){ clearInterval(tInt); showEverythingInstantly(); }
    }, 80);
  }catch(eOuter){
    showEverythingInstantly();
  }
}


var lwCanvas, lwCtx, lwRockets=[], lwParticles=[], lwTimer=null, lwAnimId=null;

function startLetterFireworks(){
  lwCanvas = document.getElementById('letter-fireworks');
  lwCtx = lwCanvas.getContext('2d');
  lwCanvas.width = window.innerWidth;
  lwCanvas.height = window.innerHeight;
  lwCanvas.style.display = 'block';
  window.addEventListener('resize', function(){
    if(lwCanvas){ lwCanvas.width=window.innerWidth; lwCanvas.height=window.innerHeight; }
  });
  lwAnimId = requestAnimationFrame(animLwFireworks);
  lwTimer = setInterval(function(){
    if(lwRockets.length < 4) lwRockets.push(newLwRocket());
  }, 600);
}

function stopLetterFireworks(){
  if(lwTimer){ clearInterval(lwTimer); lwTimer=null; }
  if(lwAnimId){ cancelAnimationFrame(lwAnimId); lwAnimId=null; }
  if(lwCanvas) lwCanvas.style.display='none';
  lwRockets=[]; lwParticles=[];
}

function newLwRocket(){
  return {
    x: Math.random()*lwCanvas.width,
    y: lwCanvas.height,
    targetY: Math.random()*(lwCanvas.height*.45),
    color:'hsl('+(Math.random()*360)+',100%,60%)',
    vx:(Math.random()-.5)*2,
    vy:-(Math.random()*3+7),
    alive:true
  };
}
function lwExplode(x,y){
  var hue=Math.random()*360;
  for(var i=0;i<100;i++){
    var a=Math.random()*Math.PI*2, sp=Math.random()*12+2;
    lwParticles.push({
      x:x,y:y,alpha:1,friction:.95,gravity:.12,
      color:'hsl('+(((hue+Math.random()*80)%360))+',100%,60%)',
      vx:Math.cos(a)*sp, vy:Math.sin(a)*sp
    });
  }
}
function animLwFireworks(){
  if(!lwCanvas){ return; }
  lwAnimId = requestAnimationFrame(animLwFireworks);
  lwCtx.fillStyle='rgba(0,0,0,0.18)';
  lwCtx.fillRect(0,0,lwCanvas.width,lwCanvas.height);
  lwRockets.forEach(function(r){
    r.x+=r.vx; r.y+=r.vy;
    lwCtx.beginPath(); lwCtx.arc(r.x,r.y,3,0,Math.PI*2);
    lwCtx.fillStyle=r.color; lwCtx.fill();
    if(r.y<=r.targetY){ r.alive=false; lwExplode(r.x,r.y); }
  });
  lwRockets = lwRockets.filter(function(r){return r.alive;});
  lwParticles.forEach(function(p){
    p.vx*=p.friction; p.vy*=p.friction; p.vy+=p.gravity;
    p.x+=p.vx; p.y+=p.vy; p.alpha-=0.015;
    lwCtx.save(); lwCtx.globalAlpha=Math.max(0,p.alpha);
    lwCtx.beginPath(); lwCtx.arc(p.x,p.y,2,0,Math.PI*2);
    lwCtx.fillStyle=p.color; lwCtx.shadowBlur=8; lwCtx.shadowColor=p.color;
    lwCtx.fill(); lwCtx.restore();
  });
  lwParticles = lwParticles.filter(function(p){return p.alpha>0;});
}


window.goToCake = function(){
  stopLetterFireworks();
  var tr = document.getElementById('scene-transition');
  tr.classList.add('fade-in');
  setTimeout(function(){
    document.getElementById('letter-screen').classList.remove('show');
    document.getElementById('letter-screen').classList.add('hide');
    document.getElementById('birthday-scene').classList.add('show');
    bootBirthday();
    setTimeout(function(){
      tr.classList.remove('fade-in');
    }, 600);
  }, 600);
};


function bootBirthday(){
  var sf=document.getElementById('starfield');
  for(var i=0;i<160;i++){
    var s=document.createElement('div'); s.className='star';
    var sz=Math.random()*2.2+0.4;
    s.style.cssText='width:'+sz+'px;height:'+sz+'px;left:'+(Math.random()*100)+'%;top:'+(Math.random()*100)+'%;--d:'+(Math.random()*3+2).toFixed(1)+'s;--delay:-'+(Math.random()*5).toFixed(1)+'s;--lo:'+(Math.random()*.3+.05).toFixed(2)+';';
    sf.appendChild(s);
  }
  var emojis=['💕','💖','💗','💓','🌸','✨','💝','🎀'];
  for(var j=0;j<12;j++){
    var h=document.createElement('div'); h.className='fheart';
    h.textContent=emojis[j%emojis.length];
    h.style.cssText='left:'+(Math.random()*95)+'%;--fud:'+(Math.random()*5+5).toFixed(1)+'s;--fud-delay:-'+(Math.random()*8).toFixed(1)+'s;';
    document.body.appendChild(h);
  }
  window.__ROT={x:0,y:0,vx:0,vy:0,dragging:false};
  initCakeFlyBackground();
  initImageFlyScene({
    onProgress:function(pct){
      var lb=document.getElementById('load-bar'),lt=document.getElementById('load-text');
      var msgs=["Đang thắp nến sinh nhật…","Đang chuẩn bị bánh kem…","Sắp xong rồi Bon ơi! 🎀","Bữa tiệc sắp bắt đầu! 🎉"];
      if(lb) lb.style.width=pct+'%';
      if(lt) lt.textContent=pct<30?msgs[0]:pct<60?msgs[1]:pct<90?msgs[2]:msgs[3];
    },
    onReady:function(){}
  });
}

window.initCakeFlyBackground=function(){
  if(window.__cakeFlyBgStarted)return;
  if(!document.getElementById("cake-background")||typeof THREE==="undefined")return;
  window.__cakeFlyBgStarted=true;
  (function(){
    var scene,camera,renderer,cakeParticles,starField,flameParticles,decorations,candleBody;
    var flameOrigins,flamePhases,flameHFactor,flameTheta,flameColorsOrig,flameLight,flameGlowMesh,masterGroup;
    var particleCount=18000,flameCount=1000,decoCount=6000;
    var palette={main:0xff8eb8,deco:0xe91e8c};
    function init(){
      scene=new THREE.Scene();
      camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
      camera.position.set(0,2,12);
      renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:"high-performance"});
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth,window.innerHeight);
      renderer.setClearColor(0x050210,1);
      var bgHost=document.getElementById("cake-background");
      bgHost.appendChild(renderer.domElement);
      renderer.domElement.style.cssText="display:block;width:100%;height:100%;position:absolute;inset:0;";
      masterGroup=new THREE.Group(); scene.add(masterGroup);
      createCake();createDecorations();createCandleBody();createFlame();createFlameLight();createStarField();
      window.addEventListener("resize",onResize,false);
      animate();
    }
    function createCake(){
      var geo=new THREE.BufferGeometry();
      var pos=new Float32Array(particleCount*3),col=new Float32Array(particleCount*3),co=new THREE.Color();
      for(var i=0;i<particleCount;i++){
        var x,y,z,r=Math.random();
        if(r<0.6){var rad=3.5+Math.random()*.4,th=Math.random()*Math.PI*2;x=Math.cos(th)*rad;z=Math.sin(th)*rad;y=(Math.random()-.5)*2.8-1.2;}
        else{var rad=2.4+Math.random()*.3,th=Math.random()*Math.PI*2;x=Math.cos(th)*rad;z=Math.sin(th)*rad;y=(Math.random()-.5)*2.2+1.3;}
        pos[i*3]=x;pos[i*3+1]=y;pos[i*3+2]=z;
        co.setHex(palette.main);col[i*3]=co.r+(Math.random()-.5)*.1;col[i*3+1]=co.g+(Math.random()-.5)*.1;col[i*3+2]=co.b+(Math.random()-.5)*.1;
      }
      geo.setAttribute("position",new THREE.BufferAttribute(pos,3));geo.setAttribute("color",new THREE.BufferAttribute(col,3));
      cakeParticles=new THREE.Points(geo,new THREE.PointsMaterial({size:.05,vertexColors:true,transparent:true,opacity:.5,blending:THREE.AdditiveBlending}));
      masterGroup.add(cakeParticles);
    }
    function createDecorations(){
      var geo=new THREE.BufferGeometry();
      var pos=new Float32Array(decoCount*3),col=new Float32Array(decoCount*3),co=new THREE.Color();
      for(var i=0;i<decoCount;i++){
        var layer=Math.random()>.5?-2.6:0.2,rad=layer<0?3.95:2.75,th=Math.random()*Math.PI*2;
        pos[i*3]=Math.cos(th)*rad;pos[i*3+1]=layer+Math.sin(th*12)*.15;pos[i*3+2]=Math.sin(th)*rad;
        co.setHex(palette.deco);col[i*3]=co.r;col[i*3+1]=co.g;col[i*3+2]=co.b;
      }
      geo.setAttribute("position",new THREE.BufferAttribute(pos,3));geo.setAttribute("color",new THREE.BufferAttribute(col,3));
      decorations=new THREE.Points(geo,new THREE.PointsMaterial({size:.07,vertexColors:true,blending:THREE.AdditiveBlending}));
      masterGroup.add(decorations);
    }
    function createCandleBody(){
      var geo=new THREE.BufferGeometry(),count=600;
      var pos=new Float32Array(count*3),col=new Float32Array(count*3);
      for(var i=0;i<count;i++){
        var r=0.08*Math.sqrt(Math.random()),th=Math.random()*Math.PI*2;
        pos[i*3]=Math.cos(th)*r;pos[i*3+1]=2.5+Math.random()*1.0;pos[i*3+2]=Math.sin(th)*r;
        col[i*3]=0.9;col[i*3+1]=0.95;col[i*3+2]=1.0;
      }
      geo.setAttribute("position",new THREE.BufferAttribute(pos,3));geo.setAttribute("color",new THREE.BufferAttribute(col,3));
      candleBody=new THREE.Points(geo,new THREE.PointsMaterial({size:.03,vertexColors:true,transparent:true,opacity:.6}));
      masterGroup.add(candleBody);
    }
    function createFlame(){
      var geo=new THREE.BufferGeometry();
      var pos=new Float32Array(flameCount*3),col=new Float32Array(flameCount*3);
      flameOrigins=new Float32Array(flameCount*3);flamePhases=new Float32Array(flameCount);
      flameHFactor=new Float32Array(flameCount);flameTheta=new Float32Array(flameCount);
      for(var i=0;i<flameCount;i++){
        var h=Math.random(),r=Math.max(0,(1-h)*0.12),angle=Math.random()*Math.PI*2;
        var x=Math.cos(angle)*r*Math.sqrt(Math.random()),y=3.5+h*.7,z=Math.sin(angle)*r*Math.sqrt(Math.random());
        pos[i*3]=x;pos[i*3+1]=y;pos[i*3+2]=z;
        flameOrigins[i*3]=x;flameOrigins[i*3+1]=y;flameOrigins[i*3+2]=z;
        flamePhases[i]=Math.random()*Math.PI*2;flameHFactor[i]=h;flameTheta[i]=angle;
        var co=new THREE.Color();
        if(h<.15)co.setHex(0x3366ff);else if(h<.5)co.setHex(0xffffdd);else if(h<.85)co.setHex(0xffaa00);else co.setHex(0xff3300);
        col[i*3]=co.r;col[i*3+1]=co.g;col[i*3+2]=co.b;
      }
      flameColorsOrig=new Float32Array(col);
      geo.setAttribute("position",new THREE.BufferAttribute(pos,3));geo.setAttribute("color",new THREE.BufferAttribute(col,3));
      flameParticles=new THREE.Points(geo,new THREE.PointsMaterial({size:.05,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,opacity:.9}));
      masterGroup.add(flameParticles);
    }
    function createFlameLight(){
      flameLight=new THREE.PointLight(0xffddaa,.52,14,1.8);flameLight.position.set(0,3.82,0);masterGroup.add(flameLight);
      var gg=new THREE.SphereGeometry(.14,16,16);
      var gm=new THREE.MeshBasicMaterial({color:0xffeedd,transparent:true,opacity:.22,blending:THREE.AdditiveBlending,depthWrite:false});
      flameGlowMesh=new THREE.Mesh(gg,gm);flameGlowMesh.position.copy(flameLight.position);masterGroup.add(flameGlowMesh);
    }
    function createStarField(){
      var geo=new THREE.BufferGeometry(),n=5200,pos=new Float32Array(n*3);
      for(var i=0;i<n;i++){pos[i*3]=(Math.random()-.5)*160;pos[i*3+1]=(Math.random()-.5)*160;pos[i*3+2]=(Math.random()-.5)*160;}
      geo.setAttribute("position",new THREE.BufferAttribute(pos,3));
      starField=new THREE.Points(geo,new THREE.PointsMaterial({color:0xc8d4ff,size:.048,transparent:true,opacity:.92,depthWrite:false,blending:THREE.AdditiveBlending}));
      masterGroup.add(starField);
    }
    function onResize(){camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight);}
    function animate(){
      requestAnimationFrame(animate);
      var speed=0.005,t=performance.now()*.001;
      cakeParticles.rotation.y+=speed;decorations.rotation.y+=speed;candleBody.rotation.y+=speed;
      var gust=Math.sin(t*.88)*.042+Math.sin(t*.41+1.1)*.018;
      var gustZ=Math.cos(t*.76+.4)*.028+Math.sin(t*1.05)*.012;
      var fPos=flameParticles.geometry.attributes.position.array;
      var fCol=flameParticles.geometry.attributes.color.array;
      var cX=gust*.55+Math.sin(t*2.9+.7)*.045+Math.sin(t*4.2)*.018;
      var cY=3.84+Math.sin(t*3.4)*.035+Math.sin(t*6.1+1.2)*.014;
      var cZ=gustZ*.55+Math.cos(t*2.5+.3)*.04+Math.cos(t*5.0)*.016;
      flameLight.position.set(cX,cY,cZ);
      flameLight.intensity=.46+Math.sin(t*5.8+.4)*.09+Math.sin(t*10.2)*.045+Math.sin(t*2.1+gust*8)*.05;
      var gp=1+Math.sin(t*5.2)*.12+Math.sin(t*8.4+.5)*.06;
      flameGlowMesh.position.set(cX,cY,cZ);flameGlowMesh.scale.setScalar(gp);
      flameGlowMesh.material.opacity=.17+Math.sin(t*5.9+.3)*.055+Math.sin(t*11)*.028;
      for(var i=0;i<flameCount;i++){
        var h=flameHFactor[i],ph=flamePhases[i],th=flameTheta[i];
        var ox=flameOrigins[i*3],oy=flameOrigins[i*3+1],oz=flameOrigins[i*3+2];
        var tip=Math.max(0,(h-.42)/.58),tc=tip*tip;
        var wave=Math.sin(th*5+t*3.1)*.052*tc+Math.sin(th*9-t*3.8+ph*.3)*.028*tc;
        var waveZ=Math.cos(th*5+t*2.7+.6)*.046*tc+Math.sin(th*6+t*2.2)*.02*tc;
        var bs=h*h*.018;
        var bb2=h>.18&&h<.72,bw=bb2?(.55+h*.45):0;
        var gd=bw*(Math.sin(t*4.1+ph*1.2)*.022+Math.cos(t*2.8+th*4)*.018);
        var gdZ=bw*(Math.cos(t*3.6+ph)*.02+Math.sin(t*5.2+th*3)*.015);
        var gl=bw*(Math.sin(t*4.5+ph*.9)*.009+Math.sin(t*7.8+th)*.004);
        fPos[i*3]=ox+gust*tc+wave+Math.sin(t*2.3+ph)*bs+gd;
        fPos[i*3+1]=oy+Math.sin(t*3.2+ph*1.5)*.011*tc+Math.sin(t*6.5+th)*.005*h+gl;
        fPos[i*3+2]=oz+gustZ*tc+waveZ+Math.cos(t*2.0+ph*1.1)*bs*.85+gdZ;
        var br=flameColorsOrig[i*3],bg=flameColorsOrig[i*3+1],bb=flameColorsOrig[i*3+2];
        var lum=.299*br+.587*bg+.114*bb;
        if(lum>.55){var fl=1+Math.sin(t*5.5+ph+th)*.11+Math.sin(t*9.2+i*.05)*.06+Math.sin(t*3.1+gust*6)*.05;fCol[i*3]=Math.min(1,br*fl);fCol[i*3+1]=Math.min(1,bg*fl);fCol[i*3+2]=Math.min(1,bb*fl);}
        else if(h>.82){var tf=1+Math.sin(t*6+ph)*.08+Math.sin(t*11)*.04;fCol[i*3]=Math.min(1,br*tf);fCol[i*3+1]=Math.min(1,bg*tf);fCol[i*3+2]=Math.min(1,bb*tf);}
        else{fCol[i*3]=br;fCol[i*3+1]=bg;fCol[i*3+2]=bb;}
      }
      flameParticles.geometry.attributes.position.needsUpdate=true;
      flameParticles.geometry.attributes.color.needsUpdate=true;
      camera.lookAt(0,1,0);starField.rotation.y+=.0003;
      masterGroup.rotation.x=window.__ROT.x;masterGroup.rotation.y=window.__ROT.y;
      renderer.render(scene,camera);
    }
    init();
  })();
};

window.scheduleHideImageFlyLoadOverlay=function(){
  var el=document.getElementById("imagefly-load-overlay");if(!el)return;
  setTimeout(function(){
    el.style.opacity="0";el.style.pointerEvents="none";
    el.setAttribute("hidden","");el.hidden=true;
    el.setAttribute("aria-busy","false");el.setAttribute("aria-hidden","true");
  },1500);
};

window.initImageFlyScene=function(options){
  options=options||{};
  var onProgress=typeof options.onProgress==="function"?options.onProgress:null;
  var onReady=typeof options.onReady==="function"?options.onReady:null;
  function reportProgress(pct){if(onProgress)try{onProgress(Math.max(0,Math.min(100,Math.round(pct))));}catch(e){}}
  function finishReady(){
    if(typeof window.scheduleHideImageFlyLoadOverlay==="function")window.scheduleHideImageFlyLoadOverlay();
    if(onReady)try{onReady();}catch(e){}
    if(typeof window.initCakeFlyBackground==="function")window.initCakeFlyBackground();
  }
  function afterFull(){reportProgress(100);requestAnimationFrame(finishReady);}
  if(window.__imageFlySceneStarted){if(onReady)try{onReady();}catch(e){}return;}
  var canvasEl=document.getElementById("canvas");
  if(!canvasEl||typeof THREE==="undefined"){afterFull();return;}
  window.__imageFlySceneStarted=true;
  function setSRGB(t){if(THREE.SRGBColorSpace!==undefined)t.colorSpace=THREE.SRGBColorSpace;else if("encoding"in t)t.encoding=THREE.sRGBEncoding;}
  var CAMERA_BASE_Z=130,cameraTargetZ=130,CAMERA_Z_MIN=50,CAMERA_Z_MAX=260;
  var renderer=new THREE.WebGLRenderer({canvas:canvasEl,antialias:true,alpha:true,premultipliedAlpha:false});
  renderer.setClearColor(0x000000,0);canvasEl.style.background="transparent";
  renderer.setPixelRatio(window.devicePixelRatio);renderer.setSize(window.innerWidth,window.innerHeight);
  if(renderer.outputEncoding!==undefined)renderer.outputEncoding=THREE.sRGBEncoding;
  var camera=new THREE.PerspectiveCamera(35,window.innerWidth/window.innerHeight,1,2000);
  camera.position.z=CAMERA_BASE_Z;
  var scene=new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff,.78));
  var pl=new THREE.PointLight(0xffffff,1.72,2000,2);pl.position.set(40,230,-440);scene.add(pl);
  var fl=new THREE.PointLight(0xe8f8ff,1.12,2400,2);fl.position.set(-240,-130,-320);scene.add(fl);
  var masterGroup=new THREE.Group();scene.add(masterGroup);
  var maxAniso=renderer.capabilities.getMaxAnisotropy();
  var MAX_CUBE_SCALE=.96,MAX_BLESSING_SCALE=1.12;
  var Z_SPAWN_MIN=-3000,Z_SPAWN_MAX=-1000,LANE_Z_STEP=18;
  var INIT_CUBE=60,INIT_BLESS=80,MAX_CUBE=120,MAX_BLESS=160;
  var BOOST_MS=6000,BOOST_C=4,BOOST_B=6;
  var CAKE_COLLISION_RADIUS=4.2;
  var IMAGE_CANDIDATES=[];
  for(var _i=1;_i<=6;_i++) IMAGE_CANDIDATES.push(['./img/anh'+_i+'.jpg']);
  var BLESSING_MESSAGES=["Happy Birthday Bon 🎂","Nguyễn Trúc Linh 💕","Chúc mừng sinh nhật ✨",
    "Tuổi mới thật hạnh phúc 🌸","Xinh đẹp mãi mãi 💖","Mọi điều ước thành hiện thực 🌟",
    "Bon ơi, hpbd 🎉","Hạnh phúc ngập tràn 💗","Luôn cười thật tươi 😊","Thành công rực rỡ ⭐","Bon tuyệt vời nhất 💝"];
  function rnd(a,b){return Math.random()*(b-a)+a;}
  function checkCakeCollision(pos){return Math.sqrt(pos.x*pos.x+pos.z*pos.z)<CAKE_COLLISION_RADIUS&&Math.abs(pos.y)<3.5;}
  function setProps(mesh){
    mesh.vx=rnd(-.08,.08);mesh.vy=rnd(-.08,.08);mesh.vz=rnd(2.2,3.8);mesh.vs=rnd(.003,.008);mesh.vrx=rnd(-.024,.024);mesh.vry=rnd(-.024,.024);
    var lane=typeof mesh.userData.laneIndex==="number"?mesh.userData.laneIndex:0;
    var zBase=rnd(Z_SPAWN_MIN+lane*LANE_Z_STEP,Z_SPAWN_MAX),zFinal=zBase-lane*LANE_Z_STEP;
    var depthT=Math.max(0,Math.min(1,(zFinal-Z_SPAWN_MIN)/(Z_SPAWN_MAX-Z_SPAWN_MIN)));
    var s0=(0.13+depthT*.4)*rnd(.88,1.08);mesh.scale.set(s0,s0,s0);
    var dist=CAMERA_BASE_Z-zFinal,fovR=camera.fov*Math.PI/180;
    var vH=2*Math.tan(fovR/2)*dist,vW=vH*camera.aspect;
    var x,y;
    do{x=rnd(-vW*.5,vW*.5);y=rnd(-vH*.5,vH*.5);}while(checkCakeCollision(new THREE.Vector3(x,y,zFinal)));
    mesh.position.set(x,y,zFinal);
  }
  function createBlessingTexture(text){
    var cv=document.createElement("canvas"),ctx=cv.getContext("2d");
    var fs=118,font=fs+'px "Pacifico",cursive';
    ctx.font=font;var m=ctx.measureText(text);
    var w=Math.ceil(m.width)+148,h=Math.ceil(fs*2.08);
    cv.width=w;cv.height=h;ctx.font=font;ctx.textBaseline="middle";ctx.textAlign="center";
    ctx.shadowColor="rgba(255,105,180,0.9)";ctx.shadowBlur=42;ctx.fillStyle="#ff5fa8";ctx.fillText(text,w/2,h/2);
    ctx.shadowBlur=10;ctx.shadowColor="rgba(255,182,225,0.95)";ctx.fillStyle="#ffb6d9";ctx.fillText(text,w/2,h/2);
    ctx.shadowBlur=0;ctx.fillStyle="#ffe4f3";ctx.fillText(text,w/2,h/2);
    var tex=new THREE.CanvasTexture(cv);setSRGB(tex);tex.needsUpdate=true;
    return{texture:tex,cssWidth:w,cssHeight:h};
  }
  function setPropsSprite(sprite){
    sprite.vx=rnd(-.04,.04);sprite.vy=rnd(-.04,.04);sprite.vz=rnd(.8,1.2);sprite.vs=rnd(.0012,.0035);
    var lane=typeof sprite.userData.laneIndex==="number"?sprite.userData.laneIndex:0;
    var zFinal=rnd(Z_SPAWN_MIN+lane*LANE_Z_STEP,Z_SPAWN_MAX)-lane*LANE_Z_STEP;
    var depthT=Math.max(0,Math.min(1,(zFinal-Z_SPAWN_MIN)/(Z_SPAWN_MAX-Z_SPAWN_MIN)));
    sprite.userData.floatScale=(0.18+depthT*.52)*rnd(.9,1.06);
    var dist=CAMERA_BASE_Z-zFinal,fovR=camera.fov*Math.PI/180;
    var vH=2*Math.tan(fovR/2)*dist,vW=vH*camera.aspect;
    var x,y;
    do{x=rnd(-vW*.5,vW*.5);y=rnd(-vH*.5,vH*.5);}while(checkCakeCollision(new THREE.Vector3(x,y,zFinal)));
    sprite.position.set(x,y,zFinal);
    var f=sprite.userData.floatScale;
    sprite.scale.set(sprite.userData.baseSX*f,sprite.userData.baseSY*f,1);
    sprite.material.rotation=0;
  }
  function createFallbackTexture(){
    var cv=document.createElement("canvas");cv.width=256;cv.height=256;
    var ctx=cv.getContext("2d"),g=ctx.createLinearGradient(0,0,256,256);
    g.addColorStop(0,"#3a0030");g.addColorStop(1,"#a1008c");
    ctx.fillStyle=g;ctx.fillRect(0,0,256,256);
    ctx.strokeStyle="rgba(255,200,230,0.9)";ctx.lineWidth=8;ctx.strokeRect(12,12,232,232);
    var tex=new THREE.CanvasTexture(cv);setSRGB(tex);tex.needsUpdate=true;return tex;
  }
  function isUsable(t){var img=t&&t.image;return img instanceof HTMLImageElement&&img.naturalWidth>0;}
  function finalizeTex(t){setSRGB(t);t.wrapS=THREE.ClampToEdgeWrapping;t.wrapT=THREE.ClampToEdgeWrapping;t.anisotropy=maxAniso;t.minFilter=THREE.LinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=false;t.needsUpdate=true;return t;}
  function loadTexWithLoader(src,anon){
    return new Promise(function(res){
      var l=new THREE.TextureLoader();if(anon)l.setCrossOrigin("anonymous");
      l.load(src,function(t){res(finalizeTex(t));},undefined,function(){res(null);});
    });
  }
  async function loadTex(url){
    var s=String(url||"").trim();if(!s)return null;
    if(/^(data:|blob:)/i.test(s)){var t=await loadTexWithLoader(s,true);return isUsable(t)?t:null;}
    var abs;try{abs=new URL(s,window.location.href);}catch(e){return null;}
    var cross=(abs.protocol==="http:"||abs.protocol==="https:")&&abs.origin!==window.location.origin;
    if(cross){
      var t1=await loadTexWithLoader(abs.href,true);if(isUsable(t1))return t1;
      try{var res=await fetch(abs.href,{mode:"cors",credentials:"omit",cache:"no-store"});if(!res.ok)throw 0;var blob=await res.blob();var ou=URL.createObjectURL(blob);try{var t=await loadTexWithLoader(ou,false);if(isUsable(t))return t;}finally{URL.revokeObjectURL(ou);}}catch(e){}
    }
    var t2=await loadTexWithLoader(abs.href,true);return isUsable(t2)?t2:null;
  }
  async function loadFirst(candidates){for(var i=0;i<candidates.length;i++){var t=await loadTex(candidates[i]);if(isUsable(t))return t;}return createFallbackTexture();}
  var group=new THREE.Group();masterGroup.add(group);
  var BLESS_SCALE=.162,nextCLane=0,nextBLane=0,lastBoostT=0,faceMatsShared=null;
  function addCube(lane){
    if(!faceMatsShared)return;
    var sz=rnd(36,72),geo=new THREE.BoxGeometry(sz,sz,sz);
    var mesh=new THREE.Mesh(geo,faceMatsShared);
    mesh.userData.laneIndex=lane;mesh.userData.isFlyCube=true;setProps(mesh);group.add(mesh);
  }
  function addBlessing(lane){
    var text=BLESSING_MESSAGES[lane%BLESSING_MESSAGES.length];
    var res=createBlessingTexture(text);
    var mat=new THREE.SpriteMaterial({map:res.texture,transparent:true,depthWrite:false});
    var sprite=new THREE.Sprite(mat);
    sprite.userData.baseSX=res.cssWidth*BLESS_SCALE;sprite.userData.baseSY=res.cssHeight*BLESS_SCALE;
    sprite.renderOrder=1;sprite.userData.laneIndex=lane;setPropsSprite(sprite);group.add(sprite);
  }
  function boostPop(){
    if(!faceMatsShared)return;
    var cubes=group.children.filter(function(o){return!(o instanceof THREE.Sprite);});
    var sprites=group.children.filter(function(o){return o instanceof THREE.Sprite;});
    var nc=MAX_CUBE-cubes.length;if(nc>0){var n=Math.min(BOOST_C,nc);for(var j=0;j<n;j++)addCube(nextCLane++);}
    var nb=MAX_BLESS-sprites.length;if(nb>0){var n=Math.min(BOOST_B,nb);for(var j=0;j<n;j++)addBlessing(nextBLane++);}
  }
  var raycaster=new THREE.Raycaster(),pNdc=new THREE.Vector2(),debrisRoots=[];
  var debrisLastT=null,BURST=.48,SHARD_LIFE=3400,SHARD_FADE=1800;
  function shatterCube(mesh){
    if(!mesh.userData.isFlyCube)return;
    var mats=Array.isArray(mesh.material)?mesh.material:[mesh.material];
    if(mats.length<6||!mesh.geometry||mesh.geometry.type!=="BoxGeometry")return;
    mesh.updateMatrixWorld(true);
    var wPos=new THREE.Vector3(),wQuat=new THREE.Quaternion(),wSca=new THREE.Vector3();
    mesh.matrixWorld.decompose(wPos,wQuat,wSca);
    var sz=mesh.geometry.parameters.width,h=sz/2;
    mesh.userData.isFlyCube=false;group.remove(mesh);mesh.geometry.dispose();
    var root=new THREE.Group();root.position.copy(wPos);root.quaternion.copy(wQuat);root.scale.copy(wSca);scene.add(root);
    var faceSetup=[
      {pos:new THREE.Vector3(h,0,0),rot:new THREE.Euler(0,-Math.PI/2,0)},
      {pos:new THREE.Vector3(-h,0,0),rot:new THREE.Euler(0,Math.PI/2,0)},
      {pos:new THREE.Vector3(0,h,0),rot:new THREE.Euler(Math.PI/2,0,0)},
      {pos:new THREE.Vector3(0,-h,0),rot:new THREE.Euler(-Math.PI/2,0,0)},
      {pos:new THREE.Vector3(0,0,h),rot:new THREE.Euler(0,0,0)},
      {pos:new THREE.Vector3(0,0,-h),rot:new THREE.Euler(0,Math.PI,0)}
    ];
    var born=performance.now(),faces=[];
    for(var i=0;i<6;i++){
      var mat=mats[i].clone();mat.transparent=true;mat.opacity=1;mat.depthWrite=true;
      var geo=new THREE.PlaneGeometry(sz,sz),fm=new THREE.Mesh(geo,mat);
      fm.position.copy(faceSetup[i].pos);fm.rotation.copy(faceSetup[i].rot);root.add(fm);
      faces.push({mesh:fm,localDir:faceSetup[i].pos.clone().normalize(),speed:.82+Math.random()*1.2,avx:rnd(-.026,.026),avy:rnd(-.026,.026),avz:rnd(-.02,.02)});
    }
    debrisRoots.push({group:root,faces:faces,born:born});
  }
  function updateDebris(){
    var now=performance.now();
    if(debrisLastT==null)debrisLastT=now;
    var dt=Math.min(48,now-debrisLastT)/16.67;debrisLastT=now;
    for(var r=debrisRoots.length-1;r>=0;r--){
      var root=debrisRoots[r],age=now-root.born;
      root.faces.forEach(function(f){f.mesh.position.addScaledVector(f.localDir,f.speed*BURST*dt);f.mesh.rotation.x+=f.avx*dt;f.mesh.rotation.y+=f.avy*dt;f.mesh.rotation.z+=f.avz*dt;});
      if(age>SHARD_FADE){var u=Math.min(1,(age-SHARD_FADE)/(SHARD_LIFE-SHARD_FADE));root.faces.forEach(function(f){f.mesh.material.opacity=Math.max(0,1-u);});}
      if(age>SHARD_LIFE){scene.remove(root.group);root.faces.forEach(function(f){f.mesh.geometry.dispose();f.mesh.material.dispose();});debrisRoots.splice(r,1);}
    }
  }
  var activePointers=new Map(),prevPinchDist=null,isDragging=false,prevPointer={x:0,y:0};
  canvasEl.addEventListener("pointerdown",function(e){
    activePointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(activePointers.size>=2){
      isDragging=false;window.__ROT.dragging=false;canvasEl.classList.remove('dragging');
      var pts=[...activePointers.values()];
      var dx=pts[0].x-pts[1].x,dy=pts[0].y-pts[1].y;
      prevPinchDist=Math.sqrt(dx*dx+dy*dy);
      e.preventDefault();return;
    }
    var rect=canvasEl.getBoundingClientRect();
    pNdc.x=((e.clientX-rect.left)/(rect.width||1))*2-1;
    pNdc.y=-((e.clientY-rect.top)/(rect.height||1))*2+1;
    raycaster.setFromCamera(pNdc,camera);
    var cubes=group.children.filter(function(c){return c.userData&&c.userData.isFlyCube;});
    var hits=raycaster.intersectObjects(cubes,false);
    if(hits.length>0){shatterCube(hits[0].object);return;}
    isDragging=true;window.__ROT.dragging=true;
    window.__ROT.vx=0;window.__ROT.vy=0;
    prevPointer={x:e.clientX,y:e.clientY};
    canvasEl.classList.add('dragging');
    e.preventDefault();
  },{passive:false});
  canvasEl.addEventListener("pointermove",function(e){
    if(activePointers.has(e.pointerId))activePointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(activePointers.size>=2){
      var pts=[...activePointers.values()];
      var dx=pts[0].x-pts[1].x,dy=pts[0].y-pts[1].y;
      var dist=Math.sqrt(dx*dx+dy*dy);
      if(prevPinchDist!==null){var delta=prevPinchDist-dist;cameraTargetZ=Math.max(CAMERA_Z_MIN,Math.min(CAMERA_Z_MAX,cameraTargetZ+delta*0.3));}
      prevPinchDist=dist;e.preventDefault();return;
    }
    if(!isDragging)return;
    var dx=e.clientX-prevPointer.x,dy=e.clientY-prevPointer.y;
    window.__ROT.vy=dx*0.005;window.__ROT.vx=dy*0.005;
    window.__ROT.y+=window.__ROT.vy;window.__ROT.x+=window.__ROT.vx;
    window.__ROT.x=Math.max(-Math.PI*.45,Math.min(Math.PI*.45,window.__ROT.x));
    prevPointer={x:e.clientX,y:e.clientY};
    e.preventDefault();
  },{passive:false});
  function endDrag(e){
    if(e&&e.pointerId!==undefined)activePointers.delete(e.pointerId);
    if(activePointers.size<2)prevPinchDist=null;
    if(activePointers.size===0){isDragging=false;window.__ROT.dragging=false;canvasEl.classList.remove('dragging');}
  }
  canvasEl.addEventListener("pointerup",endDrag,{passive:false});
  canvasEl.addEventListener("pointercancel",endDrag,{passive:false});
  function animate(){
    var t=performance.now()*.0005;
    camera.position.x+=(Math.sin(t*1.18)*24-camera.position.x)*.036;
    camera.position.y+=(Math.cos(t*1.38)*14-camera.position.y)*.036;
    camera.position.z+=(cameraTargetZ-camera.position.z)*.10;
    camera.lookAt(0,0,-1000);
    updateDebris();
    var nb=performance.now();
    if(lastBoostT===0)lastBoostT=nb;else if(nb-lastBoostT>=BOOST_MS){lastBoostT=nb;boostPop();}
    var resetThresh=camera.position.z-140;
    group.children.forEach(function(obj){
      if(obj instanceof THREE.Sprite){
        if(obj.position.z<resetThresh){obj.position.z+=obj.vz;obj.position.x+=obj.vx;obj.position.y+=obj.vy;obj.material.rotation=0;var nf=Math.min(obj.userData.floatScale+obj.vs,MAX_BLESSING_SCALE);obj.userData.floatScale=nf;obj.scale.set(obj.userData.baseSX*nf,obj.userData.baseSY*nf,1);}
        else setPropsSprite(obj);
      }else if(obj.position.z<resetThresh){
        obj.rotation.x+=obj.vrx;obj.rotation.y+=obj.vry;obj.position.z+=obj.vz;obj.position.x+=obj.vx;obj.position.y+=obj.vy;
        var ns=Math.min(obj.scale.x+obj.vs,MAX_CUBE_SCALE);obj.scale.set(ns,ns,ns);
      }else setProps(obj);
    });
    if(!window.__ROT.dragging){
      window.__ROT.vx*=0.92;window.__ROT.vy*=0.92;
      window.__ROT.x+=window.__ROT.vx;window.__ROT.y+=window.__ROT.vy;
      window.__ROT.x=Math.max(-Math.PI*.45,Math.min(Math.PI*.45,window.__ROT.x));
    }
    masterGroup.rotation.x=window.__ROT.x;masterGroup.rotation.y=window.__ROT.y;
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
  }
  buildCubes()
    .then(async function(){
      reportProgress(78);
      try{if(document.fonts&&document.fonts.load)await document.fonts.load('118px "Pacifico"');}catch(e){}
      reportProgress(88);buildBlessings();reportProgress(96);animate();afterFull();
    })
    .catch(function(err){console.error("[imageFly]",err);afterFull();});
  async function buildCubes(){
    var slots=IMAGE_CANDIDATES.length||1,textures=[],done=0;
    for(var i=0;i<IMAGE_CANDIDATES.length;i++){textures.push(await loadFirst(IMAGE_CANDIDATES[i]));done++;reportProgress((done/slots)*72);}
    var n=textures.length,faceTexs=[];
    if(!n){var fb=createFallbackTexture();for(var i=0;i<6;i++)faceTexs.push(fb);}
    else{for(var i=0;i<6;i++)faceTexs.push(textures[i%n]);}
    faceMatsShared=faceTexs.map(function(t){return new THREE.MeshBasicMaterial({map:t});});
    nextCLane=0;for(var i=0;i<INIT_CUBE;i++)addCube(nextCLane++);
  }
  function buildBlessings(){nextBLane=0;for(var i=0;i<INIT_BLESS;i++)addBlessing(nextBLane++);}
  window.addEventListener("resize",function(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
  });
};
