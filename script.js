// Starfield Parallax
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
function resize(){ canvas.width=innerWidth; canvas.height=innerHeight; }
window.addEventListener('resize', resize); resize();

for(let i=0;i<200;i++){
  stars.push({x:Math.random()*canvas.width,
              y:Math.random()*canvas.height,
              z:Math.random()*canvas.width});
}

function animateStars(){
  ctx.fillStyle='rgba(0,0,0,0.3)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  stars.forEach(s=>{
    s.z -= 2;
    if(s.z<=0) s.z = canvas.width;
    const k = 128.0 / s.z;
    const x = (s.x - canvas.width/2) * k + canvas.width/2;
    const y = (s.y - canvas.height/2) * k + canvas.height/2;
    const size = (1 - s.z/canvas.width) * 2;
    ctx.fillStyle = `rgba(${200+55*Math.random()},${200+55*Math.random()},255,0.8)`;
    ctx.beginPath(); ctx.arc(x,y,size,0,2*Math.PI); ctx.fill();
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// Rocket launch with GSAP
const rocket = document.getElementById('rocket');
document.getElementById('launchBtn').addEventListener('click', ()=>{
  gsap.to(rocket,{
    duration:6,
    y:-innerHeight-200,
    x:"+="+(Math.random()*100-50),
    rotation:-5 + Math.random()*10,
    ease:"power2.in"
  });
  // small shake & flame
  gsap.to(rocket,{
    duration:0.1,
    yoyo:true,repeat:-1,
    x:"+=2",ease:"sine.inOut"
  });
  createFlame();
});

function createFlame(){
  const flameParticles=[];
  function drawFlame(){
    flameParticles.push({
      x:rocket.offsetLeft+rocket.width/2,
      y:rocket.offsetTop+rocket.height,
      vx:(Math.random()-0.5)*2,
      vy:Math.random()*2+2,
      life:60
    });
    ctx.save();
    ctx.globalCompositeOperation='lighter';
    flameParticles.forEach((p,i)=>{
      p.x+=p.vx;
      p.y+=p.vy;
      p.life--;
      const alpha = p.life/60;
      ctx.fillStyle=`rgba(255, ${100+Math.random()*155}, 0, ${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x,p.y,4,0,2*Math.PI);
      ctx.fill();
      if(p.life<=0) flameParticles.splice(i,1);
    });
    ctx.restore();
    requestAnimationFrame(drawFlame);
  }
  drawFlame();
}
