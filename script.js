// ==========================================================================
// KIAANDA WEB - BUSINESS & ENGINEERING CLIENT CODE
// ==========================================================================

// ==========================================================================
// HERO 3D — Wireframe icosaedro rotativo com parallax do rato
// ==========================================================================
function initHero3D() {
  const canvas = document.getElementById('hero3d');
  if (!canvas || typeof THREE === 'undefined') return;
  const container = canvas.parentElement;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const geometry = new THREE.IcosahedronGeometry(1.8, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x0e3c23, wireframe: true, transparent: true, opacity: 0.85 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const geometry2 = new THREE.IcosahedronGeometry(1.2, 0);
  const material2 = new THREE.MeshBasicMaterial({ color: 0xc5923c, wireframe: true, transparent: true, opacity: 0.4 });
  const mesh2 = new THREE.Mesh(geometry2, material2);
  scene.add(mesh2);

  let mouseX = 0, mouseY = 0;
  let targetRotX = 0, targetRotY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    targetRotY = mouseX * 0.3;
    targetRotX = mouseY * 0.3;
  });

  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.003;
    mesh.rotation.x += 0.001;
    mesh2.rotation.y -= 0.002;
    mesh2.rotation.x -= 0.0015;
    mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.02;
    mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.02;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHero3D(); // <-- não esquecer de adicionar esta linha aqui dentro

  
  ...resto do teu código continua igual...


(function() {
  emailjs.init('aKhzBfnlOkv5_pl6u');
})();

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. MOBILE NAVBAR MENU & ACCESSIBILITY
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.getElementById('nav-links');
  const header = document.querySelector('header');

  if (hamburger && navLinksList) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      document.body.classList.toggle('nav-mobile-active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('nav-mobile-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  // 2. SCROLL REVEAL OBSERVER
  const reveals = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));


  // 3. STATS COUNT-UP
  const statNumbers = document.querySelectorAll('.stat-num');
  
  const animateStats = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 1500;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * target);
      
      element.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(updateCount);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => statsObserver.observe(stat));


  // 4. PORTFOLIO FILTER
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('fade-out');
          card.classList.add('fade-in');
        } else {
          card.classList.remove('fade-in');
          card.classList.add('fade-out');
        }
      });
    });
  });


  // 5. TESTIMONIALS SLIDER
  const slider = document.getElementById('testemunhosSlider');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let currentSlide = 0;
  const totalSlides = 3;

  if (slider && prevBtn && nextBtn) {
    const updateSlider = () => {
      slider.style.transform = `translateX(-${currentSlide * 33.333}%)`;
    };

    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    });

    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    });

    let autoPlayInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }, 8000);

    const resetSliderTimer = () => {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
      }, 8000);
    };

    prevBtn.addEventListener('click', resetSliderTimer);
    nextBtn.addEventListener('click', resetSliderTimer);
  }


  // 6. FAQ ACCORDION
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isOpen = faqItem.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        item.querySelector('.faq-icon').textContent = '+';
      });

      if (!isOpen) {
        faqItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        faqItem.querySelector('.faq-icon').textContent = '−';
      }
    });
  });


  // 7. BUDGET CALCULATOR
  const calculatorForm = document.getElementById('calculatorForm');
  const simService = document.getElementById('sim-service');
  const calcPrice = document.getElementById('calcPrice');
  const btnApplyCalc = document.getElementById('btnApplyCalc');

  const calculateBudget = () => {
    if (!simService || !calcPrice) return;

    const selectedOption = simService.options[simService.selectedIndex];
    const baseCost = parseFloat(selectedOption.getAttribute('data-base'));

    const selectedSize = document.querySelector('input[name="projectSize"]:checked');
    const multiplier = selectedSize ? parseFloat(selectedSize.getAttribute('data-multiplier')) : 1.0;

    let extrasCost = 0;
    document.querySelectorAll('.sim-extra:checked').forEach(checkbox => {
      extrasCost += parseFloat(checkbox.getAttribute('data-cost'));
    });

    const total = (baseCost * multiplier) + extrasCost;

    calcPrice.textContent = total.toLocaleString('pt-AO') + ' AOA';
    return {
      service: selectedOption.textContent,
      size: selectedSize ? selectedSize.parentElement.querySelector('strong').textContent : 'Padrão',
      total: total.toLocaleString('pt-AO') + ' AOA',
      extras: Array.from(document.querySelectorAll('.sim-extra:checked')).map(cb => cb.parentElement.querySelector('span').textContent.split(' (+')[0])
    };
  };

  if (calculatorForm) {
    simService.addEventListener('change', calculateBudget);
    document.querySelectorAll('input[name="projectSize"]').forEach(radio => {
      radio.addEventListener('change', calculateBudget);
    });
    document.querySelectorAll('.sim-extra').forEach(checkbox => {
      checkbox.addEventListener('change', calculateBudget);
    });
  }

  if (btnApplyCalc) {
    btnApplyCalc.addEventListener('click', () => {
      const budgetData = calculateBudget();
      if (!budgetData) return;

      const contactSection = document.getElementById('contacto');
      const contactService = document.getElementById('servico');
      const contactMessage = document.getElementById('mensagem');

      if (contactService) {
        if (budgetData.service.includes('Web')) {
          contactService.value = 'Desenvolvimento Web / TI';
        } else if (budgetData.service.includes('Contabilidade')) {
          contactService.value = 'Consultoria Contabilística';
        } else if (budgetData.service.includes('Inglês')) {
          contactService.value = 'Inglês Profissional';
        } else {
          contactService.value = 'Outro';
        }
      }

      if (contactMessage) {
        const extrasListText = budgetData.extras.length > 0 
          ? `\nRecursos adicionais: ${budgetData.extras.join(', ')}` 
          : '';
        
        contactMessage.value = `Olá Kiaanda! Simulei um orçamento no website para o serviço de ${budgetData.service}.\n\n` +
          `Parâmetros selecionados:\n` +
          `- Tipo de Empresa/Projeto: ${budgetData.size}${extrasListText}\n` +
          `- Estimativa Calculada: ${budgetData.total}\n\n` +
          `Gostaria de agendar uma reunião para validar estes requisitos e obter uma proposta formal.`;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
          if (contactMessage) {
            contactMessage.focus();
            contactMessage.style.outline = '2px solid var(--gold)';
            setTimeout(() => contactMessage.style.outline = '', 1500);
          }
        }, 800);
      }
    });
  }


  // 8. SECURE CONTACT FORM
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const btnSubmitForm = document.getElementById('btnSubmitForm');

  const sanitizeHTML = (str) => {
    return str.replace(/[&<>"']/g, (m) => {
      switch (m) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        default: return m;
      }
    }).trim();
  };

  if (contactForm && formStatus && btnSubmitForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot check
      const honeypotField = document.getElementById('form_address').value;
      if (honeypotField.length > 0) {
        console.warn('Spam submission detected by Honeypot.');
        formStatus.className = 'form-status success';
        formStatus.textContent = '✓ Mensagem enviada com sucesso! Entraremos em contacto em breve.';
        contactForm.reset();
        return;
      }

      btnSubmitForm.classList.add('loading');
      btnSubmitForm.disabled = true;
      formStatus.style.display = 'none';

      const rawNome = document.getElementById('nome').value;
      const rawTelefone = document.getElementById('telefone').value;
      const rawEmail = document.getElementById('email').value;
      const rawServico = document.getElementById('servico').value;
      const rawMensagem = document.getElementById('mensagem').value;

      const cleanNome = sanitizeHTML(rawNome);
      const cleanTelefone = sanitizeHTML(rawTelefone);
      const cleanEmail = sanitizeHTML(rawEmail);
      const cleanServico = sanitizeHTML(rawServico);
      const cleanMensagem = sanitizeHTML(rawMensagem);

      const telPattern = /^[9][1-9][0-9]{7}$/;
      const cleanTelDigits = cleanTelefone.replace(/\s+/g, '').replace(/^\+244/, '').replace(/^00244/, '');

      if (!telPattern.test(cleanTelDigits)) {
        formStatus.className = 'form-status error';
        formStatus.textContent = '✗ Por favor, introduza um número de telefone angolano válido com 9 dígitos.';
        btnSubmitForm.classList.remove('loading');
        btnSubmitForm.disabled = false;
        return;
      }

      const templateParams = {
        nome: cleanNome,
        email: cleanEmail,
        telefone: cleanTelefone,
        servico: cleanServico,
        mensagem: cleanMensagem,
        to_email: 'jonaldopedro21@gmail.com',
        reply_to: cleanEmail
      };

      try {
        await emailjs.send('service_8bjs998', 'template_wl6bh2c', templateParams);
        formStatus.className = 'form-status success';
        formStatus.textContent = '✓ Pedido de orçamento enviado com sucesso! A equipa da Kiaanda entrará em contacto dentro de 24 horas.';
        contactForm.reset();
      } catch (error) {
        console.error('EmailJS Error:', error);
        formStatus.className = 'form-status error';
        formStatus.textContent = '✗ Ocorreu um erro técnico na transmissão segura. Por favor, tente novamente ou fale diretamente no WhatsApp.';
      } finally {
        btnSubmitForm.classList.remove('loading');
        btnSubmitForm.disabled = false;
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
});
