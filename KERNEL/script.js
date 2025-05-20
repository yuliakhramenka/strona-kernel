document.addEventListener('DOMContentLoaded', function() {
  const batteryPercentText = document.getElementById('batteryPercent');
  const batteryObj = document.getElementById('batterySvg');
  const chargingLineTop = document.getElementById('chargingLineTop');
  const chargingLineBottom = document.getElementById('chargingLineBottom');
  const finalText = document.getElementById('finalText');
  const kernelText = document.getElementById('kernelText');
  const mountain1 = document.getElementById('mountain1');
  const grad1 = document.getElementById('grad1');
  const mountain2 = document.getElementById('mountain2');
  const grad2 = document.getElementById('grad2');
  const mountain3 = document.getElementById('mountain3');
  const grad3 = document.getElementById('grad3');
  const header = document.getElementById('header');
  

  let initialAnimationsDone = false;

  batteryObj.addEventListener('load', function() {
    const svgDoc = batteryObj.contentDocument;
    const svgRoot = svgDoc.documentElement;
    const svgns = "http://www.w3.org/2000/svg";

    // Создаем 4 сегмента для батареи
    const segments = [];
    const startX = 9.55;
    const startY = 11.07;
    const segWidth = 15.44;
    const segHeight = 32.82;
    const gap = 6.86;
    for (let i = 0; i < 4; i++) {
      const rect = document.createElementNS(svgns, 'rect');
      const x = startX + i * (segWidth + gap);
      rect.setAttribute('x', x);
      rect.setAttribute('y', startY);
      rect.setAttribute('width', segWidth);
      rect.setAttribute('height', segHeight);
      rect.setAttribute('fill', '#36110B');
      rect.setAttribute('rx', '4');
      rect.setAttribute('ry', '4');
      rect.style.transition = "fill 0.5s ease";
      rect.setAttribute('id', 'seg' + (i + 1));
      svgRoot.appendChild(rect);
      segments.push(rect);
    }
    const duration = 2000;
    const interval = 50;
    let elapsed = 0;
    const timerId = setInterval(() => {
      elapsed += interval;
      const percent = Math.min(100, Math.floor((elapsed / duration) * 100));
      batteryPercentText.textContent = percent + '%';
      
      segments[0].setAttribute('fill', percent >= 25 ? '#F9A68E' : '#36110B');
      segments[1].setAttribute('fill', percent >= 50 ? '#F9A68E' : '#36110B');
      segments[2].setAttribute('fill', percent >= 75 ? '#F9A68E' : '#36110B');
      segments[3].setAttribute('fill', percent >= 100 ? '#F9A68E' : '#36110B');

      
      
      if (elapsed >= duration) {
        clearInterval(timerId);
        setTimeout(() => {
          document.querySelector('.battery-container').style.opacity = '0';
          chargingLineTop.classList.add('active');
          chargingLineBottom.classList.add('active');
          const animateEdges = () => {
            const updateEdges = () => {
              const lineWidthTop = chargingLineTop.offsetWidth;
              const lineWidthBottom = chargingLineBottom.offsetWidth;
              chargingLineTop.querySelectorAll('.line-edge').forEach(edge => {
                edge.style.transform = edge.classList.contains('left') 
                  ? `translate(-${lineWidthTop}px, -50%)`
                  : `translate(${lineWidthTop}px, -50%)`;
              });
              chargingLineBottom.querySelectorAll('.line-edge').forEach(edge => {
                edge.style.transform = edge.classList.contains('left')
                  ? `translate(-${lineWidthBottom}px, 50%)`
                  : `translate(${lineWidthBottom}px, 50%)`;
              });

              if(lineWidthTop < window.innerWidth || lineWidthBottom < window.innerWidth) {
                requestAnimationFrame(updateEdges);
              }
            };
            requestAnimationFrame(updateEdges);
          };

          setTimeout(() => {
            animateEdges();
          }, 300);
          setTimeout(() => {
            finalText.classList.add('active');
            setTimeout(() => {
              finalText.classList.add('moveUp');
              kernelText.classList.add('active');
              console.log('Final text and KERNEL activated');
              setTimeout(() => {
                mountain1.classList.add('active');
                grad1.classList.add('active');
                console.log('Mountain1 and Grad1 activated');
                setTimeout(() => {
                  header.classList.add('active');
                  console.log('Header activated');
                  initialAnimationsDone = true;
                }, 1000);
              }, 200);
            }, 1000);
          }, 700);
        }, 300);
      }
    }, interval);
  });

  window.addEventListener('resize', () => {
    if(chargingLineTop.classList.contains('active')) {
      animateEdges();
    }
  });

  window.addEventListener('scroll', function() {
    if (!initialAnimationsDone) {
      return;
    }

    const scrollY = window.pageYOffset;

    // Параллакс для finalText и kernelText – движутся с одинаковой скоростью
    console.log(scrollY);
    // if(scrollY < 600) {
    finalText.style.transform = `translate(-50%, calc(-50% - ${scrollY}px))`;
    finalText.style.opacity = Math.max(0, 1 - scrollY / 300);
    kernelText.style.transform = `translate(-50%, calc( -${scrollY}px))`;
    // }

    // Параллакс для горных слоёв
    const speed1 = 0.2; // Layer1
    const speed2 = 0.4; // Layer2
    const speed3 = 0.6; // Layer3
    
    // Mountain1 и grad1 обновляются всегда, так как они появились сразу
    if (mountain1.classList.contains('active')) {
      mountain1.style.transform = `translateX(-10px) translateY(-${scrollY * speed1}px)`;
    }
    if (grad1.classList.contains('active')) {
      grad1.style.transform = ` translateY(-${scrollY * speed1}px)`;
    }

    // Mountain2 и grad2: появляются только при достижении scrollY > 300
    if (scrollY > 300) {
      if (!mountain2.classList.contains('active')) {
        mountain2.classList.add('active');
        grad2.classList.add('active');
        console.log('Mountain2 and Grad2 activated');
      }
    } else {
      if (mountain2.classList.contains('active')) {
        mountain2.classList.remove('active');
        grad2.classList.remove('active');
      }
    }
    if (mountain2.classList.contains('active')) {
      mountain2.style.transform = `translateX(-50%) scaleY(1) translateY(-${scrollY * speed2}px)`;
      grad2.style.transform = `translateX(-50%) translateY(-${scrollY * speed2}px)`;
    }
    
    // Mountain3 и grad3: появляются только при достижении scrollY > 600
    if (scrollY > 600) {
      if (!mountain3.classList.contains('active')) {
        mountain3.classList.add('active');
        grad3.classList.add('active');
        console.log('Mountain3 and Grad3 activated');
      }
    } else {
      if (mountain3.classList.contains('active')) {
        mountain3.classList.remove('active');
        grad3.classList.remove('active');
      }
    }
    if (mountain3.classList.contains('active')) {
      mountain3.style.transform = `translateX(-50%) scaleY(1) translateY(${scrollY * speed3}px)`;
      grad3.style.transform = `translateX(-50%) translateY(${scrollY * speed3}px)`;
    }
  });
});
