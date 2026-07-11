// بايوهيربال — shared behavior
(function(){
  // mobile nav toggle
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  if(burger && navLinks){
    burger.addEventListener('click', ()=>{
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=>{
        burger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:.12});
    reveals.forEach(el=> io.observe(el));
  } else {
    reveals.forEach(el=> el.classList.add('in'));
  }

  // WhatsApp order buttons -> build wa.me link with product name
  const WHATSAPP_NUMBER = "201234567890"; // placeholder number
  document.querySelectorAll('.order-btn[data-product]').forEach(btn=>{
    const product = btn.getAttribute('data-product');
    const msg = encodeURIComponent(`أهلاً، أرغب في طلب: ${product}`);
    btn.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener');
  });

  // generic whatsapp links (footer / contact / floating button)
  document.querySelectorAll('.wa-link').forEach(el=>{
    el.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}`);
    el.setAttribute('target','_blank');
    el.setAttribute('rel','noopener');
  });

  // Q&A accordion
  document.querySelectorAll('.qa-q').forEach(q=>{
    q.addEventListener('click', ()=>{
      const item = q.closest('.qa-item');
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.qa-item.open').forEach(i=> i!==item && i.classList.remove('open'));
      item.classList.toggle('open', !wasOpen);
    });
  });

  // Q&A category filter
  const catBtns = document.querySelectorAll('.qa-cats button');
  if(catBtns.length){
    catBtns.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        catBtns.forEach(b=> b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        document.querySelectorAll('.qa-item').forEach(item=>{
          const show = cat === 'all' || item.getAttribute('data-cat') === cat;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }
})();
