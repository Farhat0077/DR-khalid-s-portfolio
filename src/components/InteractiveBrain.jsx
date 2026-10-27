import { useEffect, useRef } from 'react';

// Lightweight, dependency-free pseudo-3D brain. Pointer movement changes its
// perspective, neural pathways and silhouette without requiring WebGL.
export default function InteractiveBrain() {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = 0, height = 0, raf = 0, time = 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = Array.from({ length: 190 }, (_, i) => {
      const a = i * 2.399963229728653;
      const r = Math.sqrt((i + .5) / 190);
      return { a, r, z: Math.sin(i * 12.9898) * .5 + .5, phase: i * .71, size: i % 13 === 0 ? 2.2 : .9 + (i % 4) * .22 };
    });
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = Math.max(1, box.width); height = Math.max(1, box.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const project = (x, y, z, rot, tilt) => {
      const xx = x * Math.cos(rot) - z * Math.sin(rot);
      const zz = x * Math.sin(rot) + z * Math.cos(rot);
      const yy = y * Math.cos(tilt) - zz * Math.sin(tilt);
      const depth = y * Math.sin(tilt) + zz * Math.cos(tilt);
      const perspective = 1 + depth * .22;
      return { x: width * .5 + xx * width * .35 * perspective, y: height * .47 + yy * height * .36 * perspective, z: depth };
    };
    const draw = () => {
      time += reduceMotion ? 0 : .012;
      ctx.clearRect(0, 0, width, height);
      const mx = pointer.current.x, my = pointer.current.y;
      const rot = Math.sin(time * .65) * .12 + mx * .48;
      const tilt = Math.cos(time * .45) * .055 + my * .25;
      const sx = Math.min(width, height) / 250;
      ctx.save();
      ctx.translate(width * .5, height * .48);
      const glow = ctx.createRadialGradient(0, 0, 8, 0, 0, Math.min(width, height) * .52);
      glow.addColorStop(0, 'rgba(61, 211, 195, .14)');
      glow.addColorStop(.55, 'rgba(42, 160, 166, .07)');
      glow.addColorStop(1, 'rgba(42, 160, 166, 0)');
      ctx.fillStyle = glow; ctx.fillRect(-width/2, -height/2, width, height);
      ctx.restore();

      // Brain silhouette: two soft hemispheres with a sculpted lower stem.
      ctx.save(); ctx.translate(width * .5, height * .47); ctx.rotate(rot * .2);
      const bw = width * .32, bh = height * .32;
      const brainGrad = ctx.createLinearGradient(-bw, -bh, bw, bh);
      brainGrad.addColorStop(0, 'rgba(190,255,245,.78)');
      brainGrad.addColorStop(.42, 'rgba(49,190,179,.42)');
      brainGrad.addColorStop(1, 'rgba(24,100,127,.22)');
      ctx.fillStyle = brainGrad; ctx.strokeStyle = 'rgba(117,255,234,.62)'; ctx.lineWidth = 1.15;
      ctx.beginPath();
      ctx.moveTo(0, -bh * .92);
      ctx.bezierCurveTo(-bw*.22,-bh*1.18,-bw*.8,-bh*1.02,-bw*.95,-bh*.48);
      ctx.bezierCurveTo(-bw*1.15,-bh*.05,-bw*.91,bh*.5,-bw*.55,bh*.56);
      ctx.bezierCurveTo(-bw*.4,bh*.85,-bw*.1,bh*.76,0,bh*.57);
      ctx.bezierCurveTo(bw*.2,bh*.8,bw*.49,bh*.69,bw*.58,bh*.48);
      ctx.bezierCurveTo(bw*1.03,bh*.32,bw*1.12,-bh*.16,bw*.88,-bh*.57);
      ctx.bezierCurveTo(bw*.67,-bh*1.02,bw*.23,-bh*1.11,0,-bh*.92);
      ctx.closePath(); ctx.fill(); ctx.stroke();
      // Central fissure adds a recognizable anatomical cue.
      ctx.beginPath(); ctx.moveTo(0,-bh*.86); ctx.bezierCurveTo(-width*.006,-bh*.4,width*.007,bh*.12,0,bh*.55);
      ctx.strokeStyle = 'rgba(6,58,79,.52)'; ctx.lineWidth = 1.5; ctx.stroke();
      // Sulci / gyri folds on each hemisphere.
      ctx.lineWidth = .85;
      for (let i=0;i<12;i++) {
        const side = i % 2 ? 1 : -1;
        const yy = -bh*.68 + Math.floor(i/2) * bh*.22;
        const startX = side * bw * (.12 + (i%3)*.08);
        ctx.beginPath();
        ctx.moveTo(startX, yy);
        ctx.bezierCurveTo(startX+side*bw*.27, yy-bh*.24, startX+side*bw*.65, yy+bh*.19, startX+side*bw*.68, yy+bh*.03);
        ctx.strokeStyle = i%3===0 ? 'rgba(220,255,249,.76)' : 'rgba(14,107,122,.58)'; ctx.stroke();
      }
      ctx.restore();

      // Fine axons branch out from the brain and react to cursor direction.
      const centerX = width*.5, centerY = height*.47;
      for (let i=0;i<18;i++) {
        const a = i * Math.PI*2/18 + rot*.7;
        const side = Math.cos(a), up = Math.sin(a);
        const startX = centerX + side*width*.22;
        const startY = centerY + up*height*.22;
        const reach = .10 + .05 * Math.sin(i*2.1 + time*1.4);
        const endX = startX + side*width*reach + mx*width*.035;
        const endY = startY + up*height*reach + my*height*.035;
        ctx.beginPath(); ctx.moveTo(startX,startY);
        ctx.quadraticCurveTo((startX+endX)/2 + Math.sin(time+i)*8, (startY+endY)/2, endX,endY);
        ctx.strokeStyle = `rgba(100,245,225,${.22 + .22*(.5+.5*Math.sin(time*2+i))})`;
        ctx.lineWidth = i%4===0 ? 1.4 : .75; ctx.stroke();
        ctx.beginPath(); ctx.arc(endX,endY,i%4===0?2:1.2,0,Math.PI*2);
        ctx.fillStyle = i%4===0 ? 'rgba(255,210,135,.95)' : 'rgba(130,255,233,.8)'; ctx.fill();
      }

      // Volumetric particle field clipped to a pair of hemispheres.
      const projected = [];
      nodes.forEach((p) => {
        const x = Math.cos(p.a) * p.r * .92;
        const y = Math.sin(p.a) * p.r * .72;
        const lobe = Math.abs(x) * .18;
        const z = Math.cos(p.a*2.7 + p.phase) * (1-p.r*.4) * .34 + (p.z-.5)*.12;
        const q = project(x, y, z, rot, tilt);
        q.x += Math.sign(x) * lobe * width*.12;
        projected.push({ ...q, p });
      });
      projected.sort((a,b)=>a.z-b.z);
      projected.forEach((q,i) => {
        const {x,y,z,p} = q;
        const shimmer = .5 + .5*Math.sin(time*2.2+p.phase);
        const alpha = Math.max(.12, Math.min(.9, .38 + z*.45 + shimmer*.2));
        ctx.beginPath(); ctx.arc(x,y,p.size*(.72+Math.max(0,z)*.3),0,Math.PI*2);
        ctx.fillStyle = i%17===0 ? `rgba(255,211,139,${alpha})` : `rgba(123,255,231,${alpha})`; ctx.fill();
      });
      // Nearby particles connect into a living neural mesh.
      for (let i=0;i<projected.length;i+=2) {
        const a = projected[i];
        for (let j=i+1;j<Math.min(i+8,projected.length);j+=3) {
          const b = projected[j], d = Math.hypot(a.x-b.x,a.y-b.y);
          if (d < Math.min(width,height)*.105) {
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
            ctx.strokeStyle = `rgba(91,236,219,${.12*(1-d/(Math.min(width,height)*.105))})`;
            ctx.lineWidth = .55; ctx.stroke();
          }
        }
      }
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    const observer = new ResizeObserver(resize); observer.observe(canvas);
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.current.x = ((e.clientX-r.left)/r.width-.5)*2;
      pointer.current.y = ((e.clientY-r.top)/r.height-.5)*2;
      pointer.current.active = true;
    };
    const onLeave = () => { pointer.current.x = 0; pointer.current.y = 0; pointer.current.active = false; };
    canvas.addEventListener('pointermove', onMove); canvas.addEventListener('pointerleave', onLeave);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); canvas.removeEventListener('pointermove',onMove); canvas.removeEventListener('pointerleave',onLeave); };
  }, []);

  return <div className="interactive-brain" role="img" aria-label="Interactive three-dimensional neural brain visualization. Move your pointer over it to change its perspective and neural pathways."><canvas ref={canvasRef} /></div>;
}
