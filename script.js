var COL=['#e5383b','#12b886','#f59f00','#1c7ed6','#9c36d9','#f0359b','#74b816','#15aabf','#8d5a2b','#e8590c','#364fc7','#087f5b','#c2255c','#7048e8','#5c940d','#0b4f6c'],MAXK=COL.length;
var RG={free:{x:[0,10],y:[0,10],xl:'x',yl:'y',u:['',''],s:[1,1]}};
/* Mẫu có sẵn: x,y = khoảng trục; c = tâm các nhóm; s = độ lệch; d = số chữ số thập phân của (x,y) */
var PS={
 d8:{e:'👕',n:'Cỡ áo',x:[145,185],y:[35,80],xl:'Chiều cao (cm)',yl:'Cân nặng (kg)',u:['cm','kg'],c:[[155,45],[163,53],[171,63]],s:[3,3],d:[1,1]},
 d9:{e:'⛽',n:'Mua xăng',x:[0,40],y:[0,20],xl:'Lượng xăng mỗi lần đổ (lít)',yl:'Số lần đổ / tháng',u:['lít','lần'],c:[[5,3],[30,3],[18,14]],s:[3,1.6],d:[1,1]},
 gy:{e:'👟',n:'Cỡ giày',x:[20,30],y:[7,12],xl:'Chiều dài bàn chân (cm)',yl:'Chiều rộng bàn chân (cm)',u:['cm','cm'],c:[[22.5,8.2],[25,9.3],[27.5,10.4]],s:[.5,.3],d:[1,1]},
 dm:{e:'📘',n:'Điểm Toán và Ngữ văn',x:[0,10],y:[0,10],xl:'Điểm Toán',yl:'Điểm Ngữ văn',u:['điểm','điểm'],c:[[8.8,8.6],[8.6,5],[5,8.6],[5,5]],s:[.6,.6],d:[1,1]},
 tt:{e:'⏰',n:'Giờ tự học và điểm TB',x:[0,30],y:[3,10],xl:'Thời gian tự học (giờ/tuần)',yl:'Điểm trung bình',u:['giờ','điểm'],c:[[4,5.4],[12,7],[22,8.8]],s:[1.8,.45],d:[1,1]},
 ts:{e:'🧋',n:'Khách quán trà sữa',x:[0,30],y:[0,150],xl:'Số lần mua mỗi tháng',yl:'Chi tiêu mỗi lần (nghìn đồng)',u:['lần','nghìn đồng'],c:[[3,35],[15,55],[8,115]],s:[1.4,8],d:[0,0]},
 tq:{e:'🌦',n:'Thời tiết theo mùa',x:[5,40],y:[30,100],xl:'Nhiệt độ (°C)',yl:'Độ ẩm (%)',u:['°C','%'],c:[[13,78],[20,90],[31,84],[25,68]],s:[2,3.5],d:[1,0]},
 ch:{e:'🏃',n:'Buổi chạy bộ',x:[0,16],y:[80,200],xl:'Quãng đường chạy (km)',yl:'Nhịp tim trung bình (lần/phút)',u:['km','lần/phút'],c:[[3,115],[11,140],[5,175]],s:[.8,6],d:[1,0]},
 dt:{e:'📱',n:'Dùng điện thoại mỗi tháng',x:[0,60],y:[0,600],xl:'Dung lượng data (GB/tháng)',yl:'Thời gian gọi (phút/tháng)',u:['GB','phút'],c:[[6,60],[40,90],[15,420]],s:[3,35],d:[1,0]},
 dg:{e:'💡',n:'Hộ gia đình dùng điện',x:[1,8],y:[0,500],xl:'Số người trong hộ',yl:'Điện tiêu thụ (kWh/tháng)',u:['người','kWh'],c:[[2,110],[4,250],[6,400]],s:[.5,35],d:[0,0]},
 cam:{e:'🍊',n:'Phân loại cam',x:[4,10],y:[50,350],xl:'Đường kính quả (cm)',yl:'Khối lượng quả (g)',u:['cm','g'],c:[[6,100],[7.3,170],[8.6,260]],s:[.3,14],d:[1,0]},
 dh:{e:'🚲',n:'Đi học mỗi ngày',x:[0,15],y:[0,60],xl:'Khoảng cách nhà đến trường (km)',yl:'Thời gian đi (phút)',u:['km','phút'],c:[[1,14],[4,20],[11,35]],s:[.45,3],d:[1,0]},
 gn:{e:'😴',n:'Giấc ngủ và điện thoại',x:[4,11],y:[0,10],xl:'Giờ ngủ mỗi đêm (giờ)',yl:'Giờ dùng điện thoại mỗi ngày (giờ)',u:['giờ','giờ'],c:[[8.6,1.5],[7.2,4],[5.8,7]],s:[.35,.6],d:[1,1]},
 pt:{e:'🏠',n:'Phòng trọ',x:[10,50],y:[0,6],xl:'Diện tích phòng (m²)',yl:'Giá thuê (triệu đồng/tháng)',u:['m²','triệu đồng'],c:[[15,1.2],[25,2.4],[40,4.2]],s:[2,.3],d:[1,1]}
};
Object.keys(PS).forEach(function(k){var P=PS[k];RG[k]={x:P.x,y:P.y,xl:P.xl,yl:P.yl,u:P.u,dp:P.d}});
var AX={n:['x','y'],u:['',''],cu:[false,false],a:['0','0'],b:['10','10'],s:['1','1']};
var UN=['','cm','m','km','kg','g','giây','phút','giờ','ngày','tháng','năm','tuổi','°C','%','điểm','đồng','nghìn đồng','triệu đồng','lít','người','lần'];
var hist=[],pts=[],cen=[],rip=[],K=3,phase=0,iter=0,ds='free',auto=false,done=false,busy=false,spot=-1,tw=0;
var cv=document.getElementById('cv'),ctx=cv.getContext('2d');
var W=0,H=0,ML=64,MB=54,MT=14,MR=16,fz=1,npg=10,LG=3000,MAXG=33333,layer=null,lk='',pv=0;
var SPD=[.5,.75,1,1.5,2,3,5],spd=1,skipF=false,pend=[];
var sleep=function(ms){return skipF?Promise.resolve():new Promise(function(r){var o={r:r};o.t=setTimeout(function(){var k=pend.indexOf(o);if(k>=0)pend.splice(k,1);r()},ms/spd);pend.push(o)})};
function doSkip(){if(!busy)return;skipF=true;pend.splice(0).forEach(function(o){clearTimeout(o.t);o.r()})}
var now=function(){return performance.now()};

function resize(){
  var r=cv.parentNode.getBoundingClientRect(),d=window.devicePixelRatio||1;
  W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);
}
function px(n){return ML+n*(W-ML-MR)}
function py(n){return H-MB-n*(H-MB-MT)}
function gauss(){var u=1-Math.random(),v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
function up(g,i){return g&&g.u[i]?' ('+g.u[i]+')':''}
function tu(g){return g&&(g.u[0]||g.u[1])?' theo ('+(g.u[0]||'x')+', '+(g.u[1]||'y')+')':''}
function real(v,i){var g=RG[ds];if(!g)return null;var a=i?g.y:g.x;return a[0]+v*(a[1]-a[0])}
function norm(v,i){var g=RG[ds],a=i?g.y:g.x;return Math.min(.98,Math.max(.02,(v-a[0])/(a[1]-a[0])))}

/* Hiệu ứng gõ chữ */
function msg(h,b){
  var eh=document.getElementById('mh'),eb=document.getElementById('mb');
  clearInterval(tw);eh.textContent=h||'';eb.textContent='';b=b||'';
  if(!b)return;if(skipF){eb.textContent=b;eb.className='';return}var i=0;eb.className='typing';
  tw=setInterval(function(){i++;eb.textContent=b.slice(0,i);if(i>=b.length){clearInterval(tw);eb.className=''}},24/spd);
}
function setBusy(v){
  busy=v;if(!v)skipF=false;var sk=document.getElementById('skipbtn');if(sk)sk.style.opacity=v?1:.45;var s=document.getElementById('stepbtn');
  s.textContent=v?'Đang chạy…':'Bước tiếp';s.style.opacity=v?.6:1;
}
function snap(){hist.push({cen:cen.map(function(c){return{x:c.x,y:c.y}}),c:pts.map(function(p){return p.c}),phase:phase,iter:iter})}
function back(){
  if(busy)return;auto=false;setAutoLabel();
  if(!hist.length){msg('Chưa thể quay lại','Đang ở đầu thuật toán.');return}
  var h=hist.pop();tone(600,.14,'sine',.04,350);
  cen=h.cen.map(function(c,i){return{x:c.x,y:c.y,px:c.x,py:c.y,pu:now()}});
  pts.forEach(function(p,i){p.c=h.c[i]===undefined?-1:h.c[i];p.ln=0});
  phase=h.phase;iter=h.iter;done=false;rip=[];spot=-1;
  var n=!h.cen.length?'Bước 1 (chọn tâm)':h.phase===1?'Bước 2 (chọn tâm gần nhất)':'Bước 3 (dời tâm)';
  msg('Đã quay lại','Đang ở trước '+n+'. Nhấn "Bước tiếp" để chạy lại bước này.');panel();
}
var AC=null,snd=true,NOTES=[523,659,784,880,988,1047];
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state==='suspended')AC.resume();return AC}
function tone(f,d,type,vol,f2){if(skipF)return;
  var a=ac();if(!snd||!a)return;var o=a.createOscillator(),g=a.createGain(),t=a.currentTime;
  o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol||.05,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d+.03);
}
function ding(j){var f=NOTES[j%6];tone(f,.6,'sine',.06);tone(f*2,.4,'sine',.025)}
function chime(){[523,659,784,1047].forEach(function(f,i){setTimeout(function(){tone(f,.5,'sine',.05)},i*160)})}
function toggleSnd(){snd=!snd;document.getElementById('snd').textContent=snd?'🔊 Bật':'🔇 Tắt';saveSet();if(snd)tone(660,.15,'sine',.05)}
var sel=[],selT={},opn={},pos={},els={},zc=10,dragging=false,dg=null,lastR=0,toastT=0,sz={},rz=null;
function toast(t){var e=document.getElementById('toast');e.textContent=t;e.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){e.classList.remove('on')},2800)}
function openHelp(){document.getElementById('help').classList.add('on')}
function closeHelp(){document.getElementById('help').classList.remove('on')}
function openSet(){document.getElementById('set').classList.add('on')}
function closeSet(){document.getElementById('set').classList.remove('on')}
function saveSet(){try{localStorage.setItem('kmeansSet',JSON.stringify({fz:fz,snd:snd,npg:npg,spd:spd,ax:AX}))}catch(e){}}
function loadSet(){try{var v=JSON.parse(localStorage.getItem('kmeansSet')||'{}');if(v.fz)fz=Math.max(.7,Math.min(1.6,+v.fz||1));if(v.snd===false)snd=false;if(SPD.indexOf(+v.spd)>=0)spd=+v.spd;if(v.ax&&v.ax.n&&v.ax.a&&v.ax.b&&v.ax.s&&v.ax.u&&v.ax.cu)AX=v.ax;if(v.npg)npg=Math.max(2,Math.min(MAXG,+v.npg||10))}catch(e){}}
function applyFz(){
  document.documentElement.style.setProperty('--fz',fz);
  ML=Math.round(64*fz);MB=Math.round(54*fz);
  document.getElementById('fzv').textContent=Math.round(fz*100)+'%';
  document.getElementById('snd').textContent=snd?'🔊 Bật':'🔇 Tắt';
  applySpd();updNp();resize();renderInfo();
}
function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
function num(t){return parseFloat(String(t).replace(',','.'))}
function bad(k,v){var e=document.getElementById('ax-'+k);if(e)e.classList.toggle('bad',v)}
function applyAx(ns){
  var cur=RG.free,g={x:cur.x.slice(),y:cur.y.slice(),u:[String(AX.u[0]).trim(),String(AX.u[1]).trim()],s:[0,0]},nm=[],i;
  for(i=0;i<2;i++){
    var a=num(AX.a[i]),b=num(AX.b[i]),s=num(AX.s[i]),ok=isFinite(a)&&isFinite(b)&&b-a>=1,blank=String(AX.s[i]).trim()==='',so=blank||(isFinite(s)&&s>0);
    bad('a'+i,!ok);bad('b'+i,!ok);bad('s'+i,!so);
    if(ok)g[i?'y':'x']=[a,b];
    g.s[i]=so&&!blank?s:0;
    nm[i]=String(AX.n[i]).trim()||(i?'y':'x');
  }
  g.xl=nm[0]+(g.u[0]?' ('+g.u[0]+')':'');g.yl=nm[1]+(g.u[1]?' ('+g.u[1]+')':'');
  RG.free=g;if(!ns)saveSet();
}
function axSet(k,i,v){AX[k][i]=v;applyAx()}
function axUnit(i,v){if(v==='__c'){AX.cu[i]=true;AX.u[i]=''}else{AX.cu[i]=false;AX.u[i]=v}applyAx();axForm()}
function axReset(){AX={n:['x','y'],u:['',''],cu:[false,false],a:['0','0'],b:['10','10'],s:['1','1']};applyAx();axForm()}
function axForm(){
  var el=document.getElementById('axf');if(!el)return;
  var h='<div class="axg"><span></span><b>Trục x (ngang)</b><b>Trục y (dọc)</b>';
  var row=function(lb,f){return '<span>'+lb+'</span>'+f(0)+f(1)};
  var inp=function(k,i,ph){return '<input id="ax-'+k+i+'" type="text" inputmode="decimal" value="'+esc(AX[k][i])+'" placeholder="'+ph+'" oninput="axSet(\''+k+'\','+i+',this.value)" onfocus="this.select()">'};
  h+=row('Tên trục',function(i){return '<input type="text" value="'+esc(AX.n[i])+'" oninput="axSet(\'n\','+i+',this.value)" onfocus="this.select()">'});
  h+=row('Đơn vị',function(i){
    var cu=AX.cu[i]||UN.indexOf(AX.u[i])<0;
    return '<div><select onchange="axUnit('+i+',this.value)">'+UN.map(function(u){return '<option value="'+u+'"'+(!cu&&AX.u[i]===u?' selected':'')+'>'+(u||'(không có)')+'</option>'}).join('')+'<option value="__c"'+(cu?' selected':'')+'>Tùy chỉnh…</option></select>'+(cu?'<input type="text" value="'+esc(AX.u[i])+'" placeholder="Nhập đơn vị" oninput="axSet(\'u\','+i+',this.value)">':'')+'</div>';
  });
  h+=row('Bắt đầu từ',function(i){return inp('a',i,'0')});
  h+=row('Kết thúc ở',function(i){return inp('b',i,'10')});
  h+=row('Khoảng chia',function(i){return inp('s',i,'tự động')});
  el.innerHTML=h+'</div>';
  applyAx(true);
}
function openPc(){axForm();document.getElementById('pcm').classList.add('on')}
function closePc(){document.getElementById('pcm').classList.remove('on')}
function nf(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ')}
function updNp(keep){
  if(!keep)document.getElementById('npi').value=npg;
}
function setNpgV(v,commit){var n=parseInt(v,10);if(isNaN(n)){if(commit)updNp();return}npg=Math.max(2,Math.min(MAXG,n));saveSet();updNp(!commit)}
function applySpd(){document.getElementById('spv').textContent=String(spd).replace('.',',')+'×'}
function setSpd(d){var i=SPD.indexOf(spd);if(i<0)i=2;spd=SPD[Math.max(0,Math.min(SPD.length-1,i+d))];applySpd();saveSet();tone(560,.08,'sine',.04)}
function setFz(d){fz=Math.round(Math.max(.7,Math.min(1.6,fz+d*.1))*10)/10;applyFz();saveSet();tone(560,.08,'sine',.04)}
function resetSet(){fz=1;snd=true;npg=10;spd=1;applyFz();saveSet()}
function hideInfo(){
  Object.keys(els).forEach(removeCard);
  sel=[];selT={};opn={};pos={};sz={};
  document.getElementById('closeall').style.display='none';
}
function removeCard(k){
  var e=els[k];if(!e)return;delete els[k];delete pos[k];delete sz[k];
  e.classList.remove('new');e.classList.add('out');
  setTimeout(function(){if(e.parentNode)e.parentNode.removeChild(e)},220);
}
function stats(a){
  var n=a.length,m=a.reduce(function(x,y){return x+y},0)/n,b=a.slice().sort(function(x,y){return x-y});
  var md=n%2?b[(n-1)/2]:(b[n/2-1]+b[n/2])/2,v=a.reduce(function(x,y){return x+(y-m)*(y-m)},0)/n;
  return{m:m,md:md,R:b[n-1]-b[0],s:Math.sqrt(v)};
}
function r1(v){return Math.round(v*10)/10}
function n1(v){return v.toFixed(1)}
function d2(v){return String(parseFloat(v.toFixed(2)))}
function sum(a){return a.reduce(function(x,y){return x+y},0)}
function fr(a,b){return '<span class="fr"><span>'+a+'</span><span>'+b+'</span></span>'}
function lst(a,f){var t=a.map(f);return t.length<=4?t.join(' + '):t[0]+' + '+t[1]+' + … + '+t[t.length-1]}
function res(v){var s=d2(v),ex=Math.abs(v-parseFloat(s))<1e-9,r=v.toFixed(1);return (ex?' = ':' ≈ ')+s+(parseFloat(r)!==parseFloat(s)?' ≈ '+r:'')}
function calcOne(k,v,lb){
  var n=v.length,S=r1(sum(v)),m=S/n,mb=lb+'\u0304',b=v.slice().sort(function(x,y){return x-y});
  if(k==='m')return mb+' = '+fr(lst(v,n1),n)+' = '+fr(n1(S),n)+res(m);
  if(k==='md'){
    var h=n<=8?'<div>Dãy sắp xếp: '+b.map(n1).join('; ')+'</div>':'';
    if(n%2){var q=(n+1)/2;return h+'n = '+n+' là số lẻ, lấy giá trị thứ '+q+': Mₑ = '+n1(b[q-1])}
    var a1=b[n/2-1],a2=b[n/2],t=r1(a1+a2);
    return h+'n = '+n+' là số chẵn, lấy trung bình hai giá trị thứ '+(n/2)+' và '+(n/2+1)+': Mₑ = '+fr(n1(a1)+' + '+n1(a2),2)+' = '+fr(n1(t),2)+res(t/2);
  }
  if(k==='R')return 'R = '+n1(b[n-1])+' − '+n1(b[0])+' = '+n1(r1(b[n-1]-b[0]));
  var M=d2(m),ex=Math.abs(m-parseFloat(M))<1e-9,Q=0;v.forEach(function(x){Q+=(x-m)*(x-m)});var s2=Q/n;
  return '<div>'+mb+(ex?' = ':' ≈ ')+M+'</div><div>s² = '+fr(lst(v,function(x){return '('+n1(x)+' − '+M+')²'}),n)+' = '+fr(d2(Q),n)+res(s2)+'</div><div>s = √'+d2(s2)+res(Math.sqrt(s2))+'</div>';
}
function calcBox(k,VX,VY,g,u){
  var F={m:'x̄ = '+fr('x₁ + x₂ + … + xₙ','n'),md:'sắp xếp n giá trị tăng dần; n lẻ lấy giá trị ở giữa, n chẵn lấy trung bình cộng hai giá trị ở giữa',R:'R = giá trị lớn nhất − giá trị nhỏ nhất',s:'s² = '+fr('(x₁ − x̄)² + (x₂ − x̄)² + … + (xₙ − x̄)²','n')+', s = √s²'}[k];
  var h='<div class="calc"><div><span class="fm">Công thức:</span> '+F+'</div>';
  [[VX,'x',0],[VY,'y',1]].forEach(function(a){
    h+='<div><span class="fm">Theo '+a[1]+up(g,a[2])+':</span></div><div>'+calcOne(k,a[0],a[1])+'</div>';
  });
  return h+'</div>';
}
function toggleCalc(i,k){opn[i]=opn[i]===k?null:k;tone(700,.08,'sine',.03);renderInfo()}
function cardParts(i){
  var c=cen[i],P=pts.filter(function(p){return p.c===i}),g=RG[ds],op=P.length?(opn[i]||null):null;
  var sc=function(v,k){return r1(g?real(v,k):v*100)},u=g?g.u:['đv','đv'],f=n1;
  var o={op:op,ch:null,tb:'',ht:''};
  o.co='Tọa độ tâm: (<b>'+f(sc(c.x,0))+'</b>; <b>'+f(sc(c.y,1))+'</b>)'+tu(g);
  if(P.length){
    var VX=P.map(function(p){return sc(p.x,0)}),VY=P.map(function(p){return sc(p.y,1)}),X=stats(VX),Y=stats(VY);
    var row=function(n,k){return '<tr class="sr'+(op===k?' on':'')+'" data-k="'+k+'"><td>'+n+'</td><td>'+f(X[k])+'</td><td>'+f(Y[k])+'</td></tr>'};
    o.tb='<table><tr><th></th><th>x'+up(g,0)+'</th><th>y'+up(g,1)+'</th></tr>'
      +row('Số trung bình x̄','m')+row('Trung vị Mₑ','md')+row('Khoảng biến thiên R','R')+row('Độ lệch chuẩn s','s')+'</table>';
    if(op)o.ch=calcBox(op,VX,VY,g,u);
    o.ht='';
  }else o.ht='Chưa có điểm nào.';
  return o;
}
function mkCard(i){
  var el=document.createElement('div');
  el.className='ic new';el._h={};el._op=null;el._ch=null;el._an=null;el.dataset.i=i;el.style.borderColor=COL[i];
  el.innerHTML='<div class="sc"><div class="ih"><b style="color:'+COL[i]+'">● Tâm nhóm '+(i+1)+'</b><span class="g" aria-hidden="true">⠿</span></div><div class="co"></div><div class="tb"></div><div class="cw"></div><div class="ht hint"></div></div>'+['n','s','e','w','ne','nw','se','sw'].map(function(d){return '<i class="rz '+d+'" data-d="'+d+'"></i>'}).join('');
  el.querySelectorAll('.rz').forEach(function(h){h.addEventListener('pointerdown',rzDown);h.addEventListener('pointermove',rzMove);h.addEventListener('pointerup',rzUp);h.addEventListener('pointercancel',rzUp)});
  el.addEventListener('pointerdown',cardDown);
  el.addEventListener('pointermove',cardMove);
  el.addEventListener('pointerup',cardUp);
  el.addEventListener('pointercancel',cardUp);
  el.addEventListener('click',cardClick);
  el.addEventListener('animationend',function(){el.classList.remove('new')});
  document.getElementById('info').appendChild(el);els[i]=el;return el;
}
function setPart(el,k,h){if(el._h[k]!==h){el._h[k]=h;el.querySelector('.'+k).innerHTML=h}}
/* Mở/đóng/đổi bảng công thức bằng hiệu ứng trượt chiều cao + mờ dần */
function setCalc(el,html){
  var cw=el.querySelector('.cw'),from=cw.getBoundingClientRect().height;
  if(el._an){el._an.cancel();el._an=null}
  if(html!==null)cw.innerHTML=html;
  var to=html===null?0:cw.getBoundingClientRect().height;
  var o0=html===null?1:(from>0?.35:0),o1=html===null?0:1;
  if(from===to&&o0===o1){if(html===null)cw.innerHTML='';return}
  var a=cw.animate([{height:from+'px',opacity:o0},{height:to+'px',opacity:o1}],{duration:400,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});
  el._an=a;
  a.onfinish=function(){if(el._an!==a)return;el._an=null;if(html===null)cw.innerHTML='';a.cancel()};
}
function clampPos(x,y,w,h,IW,IH){return[Math.max(0,Math.min(x,IW-w)),Math.max(0,Math.min(y,IH-h))]}
function setPos(i,el,x,y){pos[i]={x:x,y:y};el.style.left=x+'px';el.style.top=y+'px'}
/* Vị trí ban đầu: bên đối diện tâm, xếp chồng không đè lên bảng khác */
function place(i,el,w,IW,IH){
  var h=el.offsetHeight,left=cen[i].x>.5,x=left?12:IW-w-12,y=12,r,t=0;
  function ov(){
    var ks=Object.keys(els);
    for(var n=0;n<ks.length;n++){var j=ks[n];if(+j===i||!pos[j])continue;
      var q=pos[j],ow=els[j].offsetWidth,oh=els[j].offsetHeight;
      if(x<q.x+ow&&x+w>q.x&&y<q.y+oh&&y+h>q.y)return{y:q.y+oh};}
    return null;
  }
  while((r=ov())&&t++<12)y=r.y+10;
  if(y+h>IH-8){x=left?x+w+12:x-w-12;y=12;t=0;while((r=ov())&&t++<12)y=r.y+10}
  var c=clampPos(x,y,w,h,IW,IH);setPos(i,el,c[0],c[1]);
}
function renderInfo(){
  sel=sel.filter(function(i){return cen[i]});
  Object.keys(els).forEach(function(k){if(sel.indexOf(+k)<0)removeCard(k)});
  var ia=document.getElementById('info'),ca=document.getElementById('closeall');
  ca.style.display=sel.length?'block':'none';
  ca.textContent=sel.length>1?'✕ Tắt tất cả ('+sel.length+')':'✕ Tắt tất cả';
  var IW=ia.clientWidth,IH=ia.clientHeight;
  sel.forEach(function(i){
    var o=cardParts(i),el=els[i],fresh=!el;
    if(fresh)el=mkCard(i);
    var S=sz[i],w=S?Math.min(S.w,IW):Math.min(Math.round((o.op?410:270)*fz),IW-16);
    setPart(el,'co',o.co);setPart(el,'tb',o.tb);setPart(el,'ht',o.ht);
    if(fresh){
      el.style.transition='none';applySz(el,w,S?S.h:null);
      place(i,el,w,IW,IH);
      void el.offsetWidth;el.style.transition='';
    }
    if(o.op!==el._op){el._op=o.op;el._ch=o.ch;setCalc(el,o.ch)}
    else if(o.ch!==el._ch&&!el._an){el._ch=o.ch;if(o.ch!==null)el.querySelector('.cw').innerHTML=o.ch}
    if(!fresh){
      applySz(el,w,S?S.h:null);
      if(!dragging){var p=pos[i],q=clampPos(p.x,p.y,w,el.offsetHeight,IW,IH);if(q[0]!==p.x||q[1]!==p.y)setPos(i,el,q[0],q[1])}
    }
  });
}
/* Kéo bảng: nắm tiêu đề (chuột thì nắm chỗ nào không bấm được cũng kéo được) */
function cardDown(e){
  var el=e.currentTarget,i=+el.dataset.i;
  if(e.button>0||!pos[i]||e.target.closest('tr.sr')||e.target.closest('.rz'))return;
  if(!e.target.closest('.ih')&&e.pointerType!=='mouse')return;
  dg={el:el,i:i,id:e.pointerId,sx:e.clientX,sy:e.clientY,x0:pos[i].x,y0:pos[i].y};
  dragging=true;el.classList.add('drag');el.style.zIndex=++zc;
  try{el.setPointerCapture(e.pointerId)}catch(_){}
  e.preventDefault();
}
function cardMove(e){
  if(!dg||dg.el!==e.currentTarget||e.pointerId!==dg.id)return;
  var ia=document.getElementById('info'),el=dg.el;
  var c=clampPos(dg.x0+e.clientX-dg.sx,dg.y0+e.clientY-dg.sy,el.offsetWidth,el.offsetHeight,ia.clientWidth,ia.clientHeight);
  setPos(dg.i,el,c[0],c[1]);
}
function cardUp(e){
  if(!dg||dg.el!==e.currentTarget)return;
  var el=dg.el;el.classList.remove('drag');
  try{el.releasePointerCapture(dg.id)}catch(_){}
  dg=null;dragging=false;renderInfo();
}
/* Phóng to / thu nhỏ bảng: kéo mép hoặc góc như cửa sổ Windows */
function applySz(el,w,h){el.style.width=w+'px';el.style.height=h?h+'px':'';el.style.setProperty('--cwid',(w-32)+'px')}
function rzDown(e){
  if(e.button>0)return;
  var h=e.currentTarget,el=h.parentNode,i=+el.dataset.i;if(!pos[i])return;
  rz={el:el,i:i,d:h.dataset.d,id:e.pointerId,sx:e.clientX,sy:e.clientY,x0:pos[i].x,y0:pos[i].y,w0:el.offsetWidth,h0:el.offsetHeight};
  dragging=true;el.classList.add('rs','drag');el.style.zIndex=++zc;
  try{h.setPointerCapture(e.pointerId)}catch(_){}
  e.preventDefault();e.stopPropagation();
}
function rzMove(e){
  if(!rz||e.pointerId!==rz.id)return;
  var ia=document.getElementById('info'),IW=ia.clientWidth,IH=ia.clientHeight,d=rz.d,dx=e.clientX-rz.sx,dy=e.clientY-rz.sy;
  var x=rz.x0,y=rz.y0,w=rz.w0,h=rz.h0,MW=Math.min(200,IW),MH=Math.min(110,IH),r,b;
  if(d.indexOf('e')>=0)w=Math.max(MW,Math.min(rz.w0+dx,IW-x));
  if(d.indexOf('w')>=0){r=rz.x0+rz.w0;x=Math.max(0,Math.min(rz.x0+dx,r-MW));w=r-x}
  if(d.indexOf('s')>=0)h=Math.max(MH,Math.min(rz.h0+dy,IH-y));
  if(d.indexOf('n')>=0){b=rz.y0+rz.h0;y=Math.max(0,Math.min(rz.y0+dy,b-MH));h=b-y}
  var q=sz[rz.i]||(sz[rz.i]={w:w,h:null});q.w=w;
  if(d.indexOf('n')>=0||d.indexOf('s')>=0)q.h=h;
  applySz(rz.el,w,q.h);setPos(rz.i,rz.el,x,y);
}
function rzUp(e){
  if(!rz||e.pointerId!==rz.id)return;
  var el=rz.el;el.classList.remove('rs','drag');
  try{e.currentTarget.releasePointerCapture(rz.id)}catch(_){}
  rz=null;dragging=false;renderInfo();
}
function cardClick(e){
  var tr=e.target.closest('tr.sr');
  if(tr)toggleCalc(+e.currentTarget.dataset.i,tr.dataset.k);
}
function toggleInfo(i){
  var k=sel.indexOf(i);
  if(k>=0){sel.splice(k,1);delete opn[i];tone(400,.15,'sine',.04,260)}
  else{sel.push(i);sel.sort(function(a,b){return a-b});delete opn[i];selT[i]=now();tone(NOTES[i%6],.35,'sine',.05)}
  renderInfo();
}
function tk(a,b,len,gap,fx){
  var span=b-a,st=span,c=[1,2,5],e,j,r=[],k;
  if(fx>0&&fx/span*len>=gap*.6)st=fx;
  else for(e=-2;e<=4;e++)for(j=0;j<3;j++){var q=c[j]*Math.pow(10,e);if(q/span*len>=gap&&q<st)st=q}
  for(k=Math.ceil(a/st-1e-9);k*st<=b+1e-9;k++)r.push(parseFloat((k*st).toFixed(6)));
  return r;
}
function fsEl(){return document.fullscreenElement||document.webkitFullscreenElement}
function toggleFS(){
  var d=document.documentElement;
  if(fsEl()){(document.exitFullscreen||document.webkitExitFullscreen).call(document);return}
  var f=d.requestFullscreen||d.webkitRequestFullscreen;
  if(!f){toast('Thiết bị này không hỗ trợ toàn màn hình. Hãy dùng máy tính hoặc iPad.');return}
  var p=f.call(d);if(p&&p.catch)p.catch(function(){toast('Không bật được toàn màn hình.')});
}
function fsChange(){
  document.getElementById('fs').textContent=fsEl()?'⛶ Thoát toàn màn hình':'⛶ Toàn màn hình';
  setTimeout(resize,100);
}
document.addEventListener('fullscreenchange',fsChange);
document.addEventListener('webkitfullscreenchange',fsChange);
var pp=null,pe=null,re=null,psig='',lastP=0;
function ptEls(){if(pe)return;var w=document.getElementById('wrap');re=document.createElement('div');re.id='pr';pe=document.createElement('div');pe.id='pi';w.appendChild(re);w.appendChild(pe);
  pe.addEventListener('click',function(e){if(e.target.closest('.x')){pp=null;ptHide()}})}
function ptHide(){psig='';if(pe){pe.style.display='none';re.style.display='none'}}
function ptHtml(p){
  var g=RG[ds],u=g?g.u:[],h='<div class="ph"><b>Điểm dữ liệu</b><span class="x">✕</span></div>';
  h+='<div>Tọa độ: (<b>'+n1(r1(g?real(p.x,0):p.x*100))+'</b>; <b>'+n1(r1(g?real(p.y,1):p.y*100))+'</b>)'+tu(g)+'</div>';
  h+='<div>Thuộc: '+(p.c>=0&&cen[p.c]?'<i style="background:'+COL[p.c]+'"></i><b>Nhóm '+(p.c+1)+'</b>':'chưa chọn nhóm')+'</div>';
  var d=cen.map(function(c){return Math.hypot(p.x-c.x,p.y-c.y)*100}),b=d.indexOf(Math.min.apply(null,d));
  h+='<div class="hint">Khoảng cách đến tâm (thang 0–100)</div>';
  d.forEach(function(v,j){h+='<div>'+(j===b?'<b>':'')+'<i style="background:'+COL[j]+'"></i>Tâm '+(j+1)+': '+v.toFixed(1)+(j===b?' (gần nhất)</b>':'')+'</div>'});
  return h;
}
function ptUpdate(chk){
  if(pp&&(!cen.length||(chk&&pts.indexOf(pp)<0)))pp=null;
  if(!pp){ptHide();return}
  ptEls();
  var sig=ds+'|'+pp.c+'|'+cen.map(function(c){return c.x.toFixed(4)+','+c.y.toFixed(4)}).join(';'),col=pp.c>=0?COL[pp.c]:'#14539a';
  if(sig!==psig){psig=sig;pe.innerHTML=ptHtml(pp);pe.style.borderColor=col;re.style.borderColor=col}
  var X=px(pp.x),Y=py(pp.y);re.style.display='block';pe.style.display='block';re.style.left=X+'px';re.style.top=Y+'px';
  var w=pe.offsetWidth,h=pe.offsetHeight,lx=X+22;if(lx+w>W-4)lx=X-22-w;
  pe.style.left=Math.max(4,lx)+'px';pe.style.top=Math.max(4,Math.min(Y-h/2,H-h-4))+'px';
}
function togglePt(x,y){
  var hit=null,hd=22;
  pts.forEach(function(p){var d=Math.hypot(px(p.x)-x,py(p.y)-y);if(d<hd){hd=d;hit=p}});
  if(!hit)return;
  tone(pp===hit?400:760,.08,'sine',.04);pp=pp===hit?null:hit;ptUpdate(false);
}
var gv=0,gm='km';
function openGt(){if(!done||!pts.length)return;document.getElementById('gt').classList.add('on');gtDraw()}
function closeGt(){document.getElementById('gt').classList.remove('on')}
function gtSet(m,v){if(m)gm=v;else gv=v;gtDraw()}
function gtF(x){return String(parseFloat(x.toFixed(1)))}
function gtDraw(){
  var g=RG[ds],nm=[g?g.xl:'Giá trị x',g?g.yl:'Giá trị y'],key=gv?'y':'x',i,mn=1e9,mx=-1e9;
  var V=pts.map(function(p){var v=r1(g?real(p[key],gv):p[key]*100);if(v<mn)mn=v;if(v>mx)mx=v;return v});
  var lo=Math.floor(mn),B=[lo],cl=[],note,heq=Math.max(1,Math.ceil((mx-lo+.1)/K)),neq=Math.max(1,Math.ceil((mx-lo+.1)/heq));
  if(gm==='eq'){for(i=1;i<=neq;i++)B.push(lo+i*heq);note='Chia đều thành '+neq+' lớp, mỗi lớp rộng '+heq+(neq<K?' (dữ liệu chỉ trải trong '+neq+' lớp nên không cần đủ '+K+' lớp).':'.')}
  else{
    var A={};pts.forEach(function(p,q){var o=A[p.c]||(A[p.c]={j:p.c,lo:1e9,hi:-1e9,s:0,n:0}),v=V[q];if(v<o.lo)o.lo=v;if(v>o.hi)o.hi=v;o.s+=v;o.n++});
    var L=Object.keys(A).filter(function(k){return +k>=0}).map(function(k){return A[k]}).sort(function(a,b){return a.s/a.n-b.s/b.n});
    for(i=1;i<L.length;i++){
      var a=L[i-1],b=L[i],m=a.hi<b.lo?(a.hi+b.lo)/2:(a.s/a.n+b.s/b.n)/2,pv0=B[B.length-1],bd=Math.round(m);
      if(bd<=pv0)bd=r1(m);if(bd<=pv0)bd=r1(pv0+.1);B.push(bd);
    }
    B.push(Math.max(Math.floor(mx)+1,B[B.length-1]+1));cl=L.map(function(o){return o.j});
    note='Mỗi lớp ứng với một nhóm K-Means (viền màu dưới tiêu đề lớp); ranh giới lớp nằm giữa hai nhóm liền kề.';
  }
  var F=B.slice(1).map(function(){return 0});
  V.forEach(function(v){for(var t=F.length-1;t>=0;t--)if(v>=B[t]){F[t]++;break}});
  var hd='<th>'+nm[gv]+'</th>',rw='<td>Số điểm</td>';
  F.forEach(function(f,t){hd+='<th'+(gm==='km'?' style="border-bottom:6px solid '+COL[cl[t]%MAXK]+'"':'')+'>['+gtF(B[t])+'; '+gtF(B[t+1])+')</th>';rw+='<td>'+nf(f)+'</td>'});
  var seg=function(m,cur,items){return '<div class="row seg" style="margin:6px 0">'+items.map(function(t,k){return '<button class="'+(cur===(m?t[0]:k)?'on':'')+'" onclick="gtSet('+m+','+(m?"'"+t[0]+"'":k)+')">'+t[1]+'</button>'}).join('')+'</div>'};
  document.getElementById('gb').innerHTML='<div class="hint">Chọn biến để ghép nhóm</div>'+seg(0,gv,[[0,nm[0]],[1,nm[1]]])
    +'<div class="hint">Cách chia lớp</div>'+seg(1,gm,[['km','Theo nhóm K-Means'],['eq','Chia đều '+neq+' lớp']])
    +'<div style="overflow:auto"><table><tr>'+hd+'</tr><tr>'+rw+'</tr></table></div><div class="hint">Tổng: n = '+nf(V.length)+' điểm.</div>';gtFit();
}
function gtFit(){
  var tb=document.querySelector('#gb table');if(!tb)return;var wp=tb.parentNode,f=22*fz;tb.style.fontSize=f+'px';
  while(wp.scrollWidth>wp.clientWidth+1&&f>11){f-=1;tb.style.fontSize=f+'px'}
}
window.addEventListener('resize',function(){if(document.getElementById('gt').classList.contains('on'))gtFit()});
function setAutoLabel(){document.getElementById('auto').textContent=auto?'Dừng':'Chạy tự động'}

function rd(v,d){var m=Math.pow(10,d);return Math.round(v*m)/m}
function dpo(g,i){return g&&g.dp?g.dp[i]:1}
var MAXT=100000;
function resetData(k){auto=false;setAutoLabel();hist=[];ds=k;pts=[];cen=[];phase=0;iter=0;done=false;rip=[]}
async function fill(list,title,body){
  var tot=list.length,g=RG[ds];
  panel();setBusy(true);
  msg('Đang tạo '+nf(tot)+' điểm…','Mỗi chấm là một dữ liệu ('+g.xl+' và '+g.yl+').');
  var dl=Math.max(16,Math.min(110,2600/tot)),ch=Math.max(1,Math.ceil(tot*dl/2600));
  for(var q=0;q<tot;q++){
    pts.push({x:list[q].x,y:list[q].y,c:-1,pu:now()});
    if(q%ch===ch-1||q===tot-1){pv++;tone(600+(q%6)*70,.04,'sine',.02);await sleep(dl)}
  }
  setBusy(false);
  msg(title+' ('+nf(pts.length)+' điểm)',body);
  panel();
}
async function load(k){
  if(busy){auto=false;return}
  var P=PS[k];closePm();
  resetData(k);
  if(!P){msg('Tự chấm điểm','Chạm vào khung trắng để thêm điểm dữ liệu.');panel();return}
  var G=P.c.length,n=Math.min(npg,Math.floor(MAXT/G)),list=[],i,j;
  K=G;document.getElementById('kval').textContent=K;
  for(i=0;i<n;i++)for(j=0;j<G;j++)
    list.push({x:norm(rd(P.c[j][0]+gauss()*P.s[0],P.d[0]),0),y:norm(rd(P.c[j][1]+gauss()*P.s[1],P.d[1]),1)});
  await fill(list,'Mẫu: '+P.n,'Mỗi chấm là một dữ liệu ('+P.xl+' và '+P.yl+'). Nhấn "Bước tiếp" để bắt đầu.');
}
/* Nút Ngẫu nhiên: K cụm ngẫu nhiên, mỗi cụm npg điểm, theo trục đang cấu hình */
function rndCenters(G){
  var best=null,bd=-1,t,i,j,c,m;
  for(t=0;t<200;t++){
    c=[];for(i=0;i<G;i++)c.push([.14+Math.random()*.72,.14+Math.random()*.72]);
    m=9;for(i=0;i<G;i++)for(j=i+1;j<G;j++)m=Math.min(m,Math.hypot(c[i][0]-c[j][0],c[i][1]-c[j][1]));
    if(m>bd){bd=m;best=c}
  }
  return best;
}
async function randomPts(){
  if(busy){auto=false;return}
  var k0=PS[ds]?ds:'free';resetData(k0);if(k0==='free')applyAx(true);
  var g=RG[k0],G=K,n=Math.min(npg,Math.floor(MAXT/G)),C=rndCenters(G),S=C.map(function(){return (.045+Math.random()*.03)*Math.min(1,Math.sqrt(6/G)*1.1)}),list=[],i,j,vx,vy;
  for(i=0;i<n;i++)for(j=0;j<G;j++){
    vx=Math.min(.98,Math.max(.02,C[j][0]+gauss()*S[j]));vy=Math.min(.98,Math.max(.02,C[j][1]+gauss()*S[j]));
    list.push({x:norm(rd(real(vx,0),dpo(g,0)),0),y:norm(rd(real(vy,1),dpo(g,1)),1)});
  }
  await fill(list,PS[k0]?'Ngẫu nhiên theo mẫu: '+PS[k0].n:'Điểm ngẫu nhiên','Máy rải ngẫu nhiên '+G+' cụm, mỗi cụm '+nf(n)+' điểm. Nhấn "Bước tiếp" để bắt đầu.');
}
function pmBuild(){
  var el=document.getElementById('pmg');if(el.firstChild)return;
  Object.keys(PS).forEach(function(k){
    var P=PS[k],b=document.createElement('button'),sub=P.xl.replace(/\s*\(.*?\)/,'')+' – '+P.yl.replace(/\s*\(.*?\)/,'');
    b.className='pb';b.innerHTML='<span>'+P.e+' '+esc(P.n)+'</span><small>'+esc(sub)+' · '+P.c.length+' nhóm</small>';
    b.onclick=function(){load(k)};el.appendChild(b);
  });
}
function openPm(){if(busy)return;pmBuild();document.getElementById('pm').classList.add('on')}
function closePm(){document.getElementById('pm').classList.remove('on')}
function setK(d){
  if(busy){auto=false;return}
  auto=false;setAutoLabel();hist=[];var k2=Math.max(2,Math.min(MAXK,K+d));if(k2===K&&d>0)toast('Tối đa K = '+MAXK);K=k2;document.getElementById('kval').textContent=K;restart();
}
function restart(){
  if(busy){auto=false;return}
  auto=false;setAutoLabel();hist=[];cen=[];phase=0;iter=0;done=false;pts.forEach(function(p){p.c=-1});
  if(pts.length)msg('Làm lại với K = '+K,'Nhấn "Bước tiếp" để máy chọn '+K+' tâm nhóm.');
  else msg('Chưa có điểm','Chạm vào khung trắng để thêm điểm.');
  panel();
}
function clearAll(){
  if(busy){auto=false;return}
  auto=false;setAutoLabel();hist=[];pts=[];cen=[];phase=0;iter=0;done=false;msg('Đã xóa hết','Chạm vào khung trắng để thêm điểm.');panel();
}

/* Bước 1: đèn chiếu nhảy ngẫu nhiên rồi dừng ở điểm được chọn */
async function init(){
  if(pts.length<K){msg('Chưa đủ điểm','Cần ít nhất '+K+' điểm. Hãy thêm điểm.');return false}
  setBusy(true);cen=[];
  var idx=[],tries=0,r,dup;
  while(idx.length<K){r=Math.floor(Math.random()*pts.length);if(idx.indexOf(r)>=0)continue;
    dup=tries<pts.length*4+200&&idx.some(function(q){return pts[q].x===pts[r].x&&pts[q].y===pts[r].y});tries++;
    if(!dup)idx.push(r)}
  msg('Bước 1: Chọn ngẫu nhiên '+K+' tâm nhóm','Máy chưa biết các nhóm nằm ở đâu, nên chọn NGẪU NHIÊN '+K+' điểm làm "tâm nhóm" ban đầu.');
  await sleep(2200);
  for(var j=0;j<K;j++){
    msg('Đang chọn tâm nhóm '+(j+1)+' / '+K,'Chọn ngẫu nhiên một điểm làm tâm nhóm '+(j+1)+'.');
    var last=-1,T0=now(),HOP_MS=4000/spd;
    while(now()-T0<HOP_MS&&!skipF){
      var s,gd=0;do{s=Math.floor(Math.random()*pts.length);gd++}while((s===last||idx.slice(0,j).indexOf(s)>=0)&&gd<400);
      if(idx.slice(0,j).indexOf(s)>=0)break;
      last=s;spot=s;tone(600+Math.random()*500,.05,'triangle',.035);
      await sleep(60*Math.pow(10,(now()-T0)/HOP_MS));
    }
    spot=idx[j];await sleep(700);
    var p=pts[idx[j]];p.pu=now();ding(j);
    var c={x:p.x,y:p.y,px:p.x,py:p.y,pu:now()};cen.push(c);
    rip.push({x:p.x,y:p.y,t0:now(),col:COL[j]});
    spot=-1;panel();await sleep(j<K-1?2400:1000);
  }
  phase=1;
  msg('Xong bước 1','Có '+K+' tâm nhóm (ô vuông có vòng tròn quay quanh). Nhấn "Bước tiếp": mỗi điểm sẽ chọn tâm gần nhất.');
  setBusy(false);return true;
}
/* Bước 2: mỗi điểm nối tới tâm gần nhất và đổi màu */
async function assign(){
  setBusy(true);
  msg('Bước 2: Mỗi điểm chọn tâm GẦN NHẤT','Mỗi điểm đo khoảng cách đến từng tâm nhóm rồi nhận màu của tâm gần nhất. Xem đường nối từ điểm đến tâm.');
  await sleep(1800);
  var N=pts.length,dl=Math.max(16,Math.min(70,1800/N)),ch=Math.max(1,Math.ceil(N*dl/1800));
  for(var i=0;i<N;i++){
    var p=pts[i],b=0,bd=1e9,c,d,k;
    for(k=0;k<cen.length;k++){c=cen[k];d=(p.x-c.x)*(p.x-c.x)+(p.y-c.y)*(p.y-c.y);if(d<bd){bd=d;b=k}}
    p.c=b;p.pu=now();p.ln=now();
    if(i%ch===ch-1||i===N-1){pv++;tone(NOTES[b%6]*.5,.08,'sine',.025);await sleep(dl)}
  }
  await sleep(800);phase=2;
  msg('Xong bước 2','Các điểm đã có màu. Nhấn "Bước tiếp": mỗi tâm sẽ dời về vị trí trung bình của nhóm mình.');
  setBusy(false);return true;
}
/* Bước 3: tâm dời về trung bình cộng */
async function update(){
  setBusy(true);
  msg('Bước 3: Dời tâm về vị trí TRUNG BÌNH','Mỗi tâm dời tới trung bình cộng tọa độ các điểm cùng màu với nó. (Vòng '+(iter+1)+')');
  await sleep(1800);
  var moved=0;
  cen.forEach(function(c,i){
    var sx=0,sy=0,n=0;pts.forEach(function(p){if(p.c===i){sx+=p.x;sy+=p.y;n++}});
    c.px=c.x;c.py=c.y;c.nx=n?sx/n:c.x;c.ny=n?sy/n:c.y;
    moved=Math.max(moved,Math.hypot(c.nx-c.px,c.ny-c.py));
  });
  tone(280,1.1,'sine',.04,620);
  await new Promise(function(res){
    var t0=now();(function f(){
      var k=skipF?1:Math.min(1,(now()-t0)/(1100/spd)),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
      cen.forEach(function(c){c.x=c.px+(c.nx-c.px)*e;c.y=c.py+(c.ny-c.py)*e});
      if(k<1)requestAnimationFrame(f);else res();
    })();
  });
  tone(200,.3,'sine',.05,140);
  cen.forEach(function(c,i){c.pu=now();rip.push({x:c.x,y:c.y,t0:now(),col:COL[i]})});
  iter++;phase=1;
  if(moved<1e-6){done=true;auto=false;setAutoLabel();chime();
    msg('Xong! Thuật toán đã hội tụ','Tâm nhóm không dịch chuyển nữa sau '+iter+' vòng, nghĩa là cách chia nhóm đã ổn định. Nhấn "Lập bảng số liệu ghép nhóm" bên phải để lập bảng.');}
  else msg('Xong vòng '+iter,'Tâm đã dời. Nhấn "Bước tiếp": các điểm sẽ chọn lại tâm gần nhất, vì tâm đã đổi chỗ.');
  setBusy(false);return true;
}
async function step(){
  if(busy)return false;
  if(!pts.length){msg('Chưa có điểm nào','Chạm vào khung trắng hoặc chọn dữ liệu mẫu.');return false}
  if(done){msg('Đã xong','Nhấn "Làm lại" để chạy lại.');return false}
  var ok;snap();
  if(cen.length!==K)ok=await init();else if(phase===1)ok=await assign();else ok=await update();
  if(!ok)hist.pop();
  panel();return ok;
}
async function toggleAuto(){
  if(auto){auto=false;setAutoLabel();return}
  if(busy)return;
  if(done)restart();
  if(!pts.length){step();return}
  auto=true;setAutoLabel();
  while(auto&&!done){var ok=await step();if(!ok)break;if(!auto)break;await sleep(700)}
  auto=false;setAutoLabel();
}

cv.addEventListener('pointerdown',function(e){
  var r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
  var ci=-1,cd=34;
  cen.forEach(function(c,i){var d=Math.hypot(px(c.x)-x,py(c.y)-y);if(d<cd){cd=d;ci=i}});
  if(ci>=0){toggleInfo(ci);return}
  if(busy)return;
  if(x<ML||x>W-MR||y<MT||y>H-MB)return;
  if(cen.length){togglePt(x,y);return}
  var hit=-1,hd=22;
  pts.forEach(function(p,i){var d=Math.hypot(px(p.x)-x,py(p.y)-y);if(d<hd){hd=d;hit=i}});
  if(hit>=0){
    var q=pts[hit];rip.push({x:q.x,y:q.y,t0:now(),col:'#8895a5'});
    pts.splice(hit,1);hist.forEach(function(h){h.c.splice(hit,1)});
    tone(440,.12,'sine',.04,220);done=false;panel();return;
  }
  var g0=RG[ds],qx=(x-ML)/(W-ML-MR),qy=(H-MB-y)/(H-MB-MT);
  if(g0){qx=(rd(g0.x[0]+qx*(g0.x[1]-g0.x[0]),dpo(g0,0))-g0.x[0])/(g0.x[1]-g0.x[0]);qy=(rd(g0.y[0]+qy*(g0.y[1]-g0.y[0]),dpo(g0,1))-g0.y[0])/(g0.y[1]-g0.y[0])}
  tone(880,.07,'sine',.03);pts.push({x:qx,y:qy,c:-1,pu:now()});
  done=false;panel();
});
/* Hiệu ứng nhấn nút: viền to ra rồi nhỏ lại, rung nhẹ */
document.addEventListener('pointerdown',function(e){
  var b=e.target.closest&&e.target.closest('button');if(!b)return;
  tone(520,.09,'sine',.05,760);b.classList.remove('press');void b.offsetWidth;b.classList.add('press');
});
document.addEventListener('animationend',function(e){e.target.classList.remove('press')});

function drawBig(){
  var d=window.devicePixelRatio||1,key=pv+'|'+pts.length+'|'+W+'|'+H+'|'+ML+'|'+MB+'|'+d;
  if(!layer||lk!==key){
    if(!layer)layer=document.createElement('canvas');
    layer.width=Math.round(W*d);layer.height=Math.round(H*d);
    var l=layer.getContext('2d');l.setTransform(d,0,0,d,0,0);
    var n=pts.length,s=n<=10000?4:n<=30000?3:2,h=s/2,P=[],i,p,w=W-ML-MR,hh=H-MB-MT;
    for(i=0;i<=MAXK;i++)P.push(new Path2D());
    for(i=0;i<n;i++){p=pts[i];P[p.c+1].rect(ML+p.x*w-h,H-MB-p.y*hh-h,s,s)}
    for(i=0;i<=MAXK;i++){l.fillStyle=i?COL[i-1]:'#8895a5';l.fill(P[i])}
    lk=key;
  }
  ctx.drawImage(layer,0,0,W,H);
  if(spot>=0&&pts[spot]){var q=pts[spot];ctx.beginPath();ctx.arc(px(q.x),py(q.y),14,0,7);ctx.fillStyle=q.c<0?'#8895a5':COL[q.c];ctx.fill();ctx.lineWidth=3;ctx.strokeStyle='#f2a100';ctx.stroke()}
}
function draw(){
  var t=now(),g=RG[ds],big=pts.length>LG;
  ctx.clearRect(0,0,W,H);ctx.font=Math.round(16*fz)+'px "Segoe UI",Arial';ctx.lineWidth=1;
  ctx.strokeStyle='#e3e9f0';ctx.fillStyle='#5b6b7e';
  if(g){
    tk(g.x[0],g.x[1],W-ML-MR,52*fz,g.s&&g.s[0]).forEach(function(v){var q=(v-g.x[0])/(g.x[1]-g.x[0]);
      ctx.beginPath();ctx.moveTo(px(q),py(0));ctx.lineTo(px(q),py(1));ctx.stroke();ctx.textAlign='center';ctx.fillText(v,px(q),py(0)+Math.round(22*fz))});
    tk(g.y[0],g.y[1],H-MB-MT,38*fz,g.s&&g.s[1]).forEach(function(v){var q=(v-g.y[0])/(g.y[1]-g.y[0]);
      ctx.beginPath();ctx.moveTo(px(0),py(q));ctx.lineTo(px(1),py(q));ctx.stroke();ctx.textAlign='right';ctx.fillText(v,px(0)-8,py(q)+5)});
  }else for(var i=0;i<=5;i++){var q=i/5;ctx.beginPath();ctx.moveTo(px(q),py(0));ctx.lineTo(px(q),py(1));ctx.moveTo(px(0),py(q));ctx.lineTo(px(1),py(q));ctx.stroke()}
  ctx.strokeStyle='#14202e';ctx.lineWidth=2;ctx.strokeRect(px(0),py(1),px(1)-px(0),py(0)-py(1));
  if(g){ctx.fillStyle='#14202e';ctx.font='bold '+Math.round(17*fz)+'px "Segoe UI",Arial';ctx.textAlign='center';
    ctx.fillText(g.xl,(px(0)+px(1))/2,H-Math.round(10*fz));
    ctx.save();ctx.translate(Math.round(16*fz),(py(0)+py(1))/2);ctx.rotate(-Math.PI/2);ctx.fillText(g.yl,0,0);ctx.restore()}
  /* đèn chiếu */
  if(spot>=0&&pts[spot]){
    var s=pts[spot],X=px(s.x),Y=py(s.y),gr=ctx.createRadialGradient(X,Y,0,X,Y,90);
    gr.addColorStop(0,'rgba(255,220,60,.95)');gr.addColorStop(1,'rgba(255,220,60,0)');
    ctx.fillStyle=gr;ctx.beginPath();ctx.arc(X,Y,90,0,7);ctx.fill();
  }
  /* vòng tròn quanh tâm được chọn */
  sel.forEach(function(si){
    if(!cen[si])return;
    var c2=cen[si],X0=px(c2.x),Y0=py(c2.y),far=0;
    pts.forEach(function(p){if(p.c===si)far=Math.max(far,Math.hypot(px(p.x)-X0,py(p.y)-Y0))});
    var kk=Math.min(1,(t-(selT[si]||0))/500);kk=1-Math.pow(1-kk,3);var rr=Math.max(50,far+18)*kk;
    ctx.fillStyle=COL[si]+'22';ctx.strokeStyle=COL[si];ctx.lineWidth=4;
    ctx.beginPath();ctx.arc(X0,Y0,rr,0,7);ctx.fill();ctx.stroke();
    ctx.lineWidth=1.5;ctx.setLineDash([5,5]);ctx.beginPath();ctx.moveTo(X0-rr,Y0);ctx.lineTo(X0+rr,Y0);ctx.moveTo(X0,Y0-rr);ctx.lineTo(X0,Y0+rr);ctx.stroke();ctx.setLineDash([]);
  });
  /* đường nối điểm - tâm */
  if(!big)pts.forEach(function(p){
    if(!p.ln||p.c<0||!cen[p.c])return;var a=1-(t-p.ln)/900;if(a<=0)return;
    ctx.globalAlpha=a;ctx.strokeStyle=COL[p.c];ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(px(p.x),py(p.y));ctx.lineTo(px(cen[p.c].x),py(cen[p.c].y));ctx.stroke();ctx.globalAlpha=1;
  });
  /* các điểm */
  if(big)drawBig();else pts.forEach(function(p,i){
    var X=px(p.x),Y=py(p.y),r=9,age=(t-(p.pu||-1e9))/600;
    ctx.globalAlpha=(spot>=0&&i!==spot)?.35:1;
    if(age<1){r+=9*Math.sin(age*Math.PI);ctx.strokeStyle=p.c<0?'#8895a5':COL[p.c];ctx.lineWidth=4;
      ctx.globalAlpha*=1-age;ctx.beginPath();ctx.arc(X,Y,9+34*age,0,7);ctx.stroke();ctx.globalAlpha=(spot>=0&&i!==spot)?.35:1}
    if(i===spot)r=16;
    ctx.beginPath();ctx.arc(X,Y,r,0,7);ctx.fillStyle=p.c<0?'#8895a5':COL[p.c];ctx.fill();
    ctx.lineWidth=2;ctx.strokeStyle=i===spot?'#f2a100':'#fff';ctx.stroke();ctx.globalAlpha=1;
  });
  /* sóng lan ra quanh điểm/tâm vừa chọn */
  rip=rip.filter(function(r){return t-r.t0<1000});
  rip.forEach(function(r){var a=(t-r.t0)/1000;ctx.globalAlpha=1-a;ctx.strokeStyle=r.col;ctx.lineWidth=5;
    ctx.beginPath();ctx.arc(px(r.x),py(r.y),14+a*90,0,7);ctx.stroke();ctx.globalAlpha=1});
  /* các tâm nhóm: ô vuông + vòng tròn quay + nhãn */
  cen.forEach(function(c,i){
    var X=px(c.x),Y=py(c.y),age=(t-(c.pu||-1e9))/700,sc=age<1?1+.7*Math.sin(age*Math.PI):1,h=13*sc;
    if(c.px!==c.x||c.py!==c.y){ctx.setLineDash([6,5]);ctx.strokeStyle=COL[i];ctx.lineWidth=2.5;
      ctx.beginPath();ctx.moveTo(px(c.px),py(c.py));ctx.lineTo(X,Y);ctx.stroke()}
    ctx.strokeStyle=COL[i];ctx.lineWidth=3;ctx.setLineDash([9,7]);ctx.lineDashOffset=-t/35;
    ctx.beginPath();ctx.arc(X,Y,28*sc,0,7);ctx.stroke();ctx.setLineDash([]);ctx.lineDashOffset=0;
    ctx.fillStyle=COL[i];ctx.fillRect(X-h,Y-h,2*h,2*h);
    ctx.lineWidth=4;ctx.strokeStyle='#14202e';ctx.strokeRect(X-h,Y-h,2*h,2*h);
    ctx.lineWidth=2;ctx.strokeStyle='#fff';ctx.strokeRect(X-h+3,Y-h+3,2*h-6,2*h-6);
    ctx.font='bold '+Math.round(16*fz)+'px "Segoe UI",Arial';ctx.textAlign='center';ctx.lineWidth=4;ctx.strokeStyle='#fff';
    ctx.strokeText('Tâm '+(i+1),X,Y-38);ctx.fillStyle='#14202e';ctx.fillText('Tâm '+(i+1),X,Y-38);
  });
}
function panel(){
  pv++;renderInfo();
  var gtb=document.getElementById("gtb");if(gtb)gtb.style.display=done&&cen.length?"":"none";
  cv.style.cursor=cen.length?'pointer':'crosshair';
  var el=document.getElementById('list');
  if(!cen.length){el.className='hint';el.textContent='Chưa có nhóm nào.';return}
  el.className='';el.innerHTML='';
  cen.forEach(function(c,i){
    var n=pts.filter(function(p){return p.c===i}).length,t='Nhóm '+(i+1)+': '+n+' điểm';
    if(RG[ds]&&n){t+=' | tâm ≈ '+real(c.x,0).toFixed(1)+(RG[ds].u[0]?' '+RG[ds].u[0]:'')+', '+real(c.y,1).toFixed(1)+(RG[ds].u[1]?' '+RG[ds].u[1]:'')}
    var d=document.createElement('div');d.innerHTML='<i style="background:'+COL[i]+'"></i>';d.appendChild(document.createTextNode(t));el.appendChild(d);
  });
}
window.addEventListener('resize',resize);
loadSet();applyAx(true);applyFz();openHelp();
(function loop(){draw();var t=now();if(pp){var ck=t-lastP>300;if(ck)lastP=t;ptUpdate(ck)}if(sel.length&&!dragging&&t-lastR>(pts.length>LG?1200:250)){lastR=t;renderInfo()}requestAnimationFrame(loop)})();
