fetch('config.json')
.then(r=>r.json())
.then(parties=>{
  const grid=document.getElementById('grid');
  const modal=document.getElementById('modal');
  const modalClose=document.getElementById('modalClose');
  const modalIcon=document.getElementById('modalIcon');
  const modalName=document.getElementById('modalName');
  const downloadFull=document.getElementById('downloadFull');
  const logosGrid=document.getElementById('logosGrid');
  const fontsList=document.getElementById('fontsList');
  const colorsGrid=document.getElementById('colorsGrid');

  parties.forEach(p=>{
    const card=document.createElement('div');
    card.className='card';
    card.innerHTML=`<img src="${p.icon}"><div class="title">${p.abbr}</div>`;
    card.addEventListener('click', ()=>{
      modalIcon.src=p.icon;
      modalName.textContent=p.abbr + (p.undertitle==='yes' && p.undertitleText ? ' - '+p.undertitleText : '');
      downloadFull.style.background = p.primaryColor;
      downloadFull.onclick=()=>{window.open(p.downloadFull,'_blank')};
      logosGrid.innerHTML='';
      if(p.logos){
        p.logos.forEach(l=>{
          const div=document.createElement('div');
          div.className='logo-card';
          div.innerHTML=`<img src="${l.logo}"><span class="material-icons download-icon" title="Download">&#xe2c4;</span>`;
          div.querySelector('.download-icon').onclick=e=>{e.stopPropagation(); window.open(l.download,'_blank');};
          logosGrid.appendChild(div);
        });
      }
      fontsList.innerHTML='';
      if(p.fonts){
        p.fonts.forEach(f=>{
          const li=document.createElement('li');
          li.innerHTML=`<span>${f.name}</span><span class="material-icons download-icon">&#xe2c4;</span>`;
          li.querySelector('.download-icon').onclick=e=>{e.stopPropagation(); window.open(f.download,'_blank');};
          fontsList.appendChild(li);
        });
      }
      colorsGrid.innerHTML='';
      if(p.colors){
        p.colors.forEach(c=>{
          const div=document.createElement('div');
          div.className='color-card';
          div.innerHTML=`<div class="color-circle" style="background:${c.hex}"></div><span>${c.hex}</span><span class="material-icons copy-icon" title="Kopieer">content_copy</span>`;
          const copyBtn = div.querySelector('.copy-icon');
          copyBtn.onclick=e=>{
            navigator.clipboard.writeText(c.hex);
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = 'check';
            setTimeout(()=>{
              copyBtn.classList.remove('copied');
              copyBtn.innerHTML = 'content_copy';
            },2000);
          };
          colorsGrid.appendChild(div);
        });
      }

      modal.style.display='flex';
    });
    grid.appendChild(card);
  });

  modalClose.onclick=()=>modal.style.display='none';
  window.onclick=e=>{if(e.target===modal)modal.style.display='none';};
})
.catch(console.error);
