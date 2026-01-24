document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }

  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  // ========================================
  // DYNAMIC PRODUCT RENDERING
  // ========================================
  function renderProducts(productsToRender = PRODUCTS) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    productsToRender.forEach(product => {
      const productCard = document.createElement('article');
      productCard.className = 'product-card animate-on-scroll';
      productCard.setAttribute('data-category', product.category);

      productCard.innerHTML = `
        <a href="product.html?id=${product.id}">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-overlay">
              <span class="btn btn-whatsapp-sm">View Details</span>
            </div>
          </div>
        </a>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${product.price}</p>
        </div>
      `;

      // Add WhatsApp functionality to the overlay button
      const overlayBtn = productCard.querySelector('.btn-whatsapp-sm');
      if (overlayBtn) {
        overlayBtn.addEventListener('click', function(e) {
          e.preventDefault();
          const message = encodeURIComponent(`Hi! I'm interested in Product ID: ${product.id} - ${product.name}`);
          window.open(`https://wa.me/918160819720?text=${message}`, '_blank');
        });
      }

      productsGrid.appendChild(productCard);
    });

    // Re-observe new elements for animation
    const newAnimatedElements = productsGrid.querySelectorAll('.animate-on-scroll');
    newAnimatedElements.forEach(el => observer.observe(el));
  }

  // Initial render of all products
  if (document.getElementById('productsGrid')) {
    renderProducts();
  }

  const filterPills = document.querySelectorAll('.filter-pill');
  const productCards = document.querySelectorAll('.product-card[data-category]');

  // Check URL for category parameter
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');

  if (categoryParam && filterPills.length > 0) {
    filterPills.forEach(pill => {
      pill.classList.remove('active');
      if (pill.dataset.category === categoryParam) {
        pill.classList.add('active');
      }
    });
    filterProducts(categoryParam);
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', function() {
      const category = this.dataset.category;

      // Update active pill
      filterPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');

      // Filter products
      filterProducts(category);

      // Update URL without reload
      const newUrl = category === 'all'
        ? window.location.pathname
        : `${window.location.pathname}?category=${category}`;
      window.history.pushState({}, '', newUrl);
    });
  });

  function filterProducts(category) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    const filteredProducts = category === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(product => product.category === category);

    renderProducts(filteredProducts);
  }

  // ========================================
  // PRODUCT DETAIL PAGE
  // ========================================
  // Load product data on product page
  const productIdParam = urlParams.get('id');
  if (productIdParam) {
    const product = PRODUCTS.find(p => p.id === parseInt(productIdParam));
    if (product) {
      const productImage = document.getElementById('productImage');
      const productName = document.getElementById('productName');
      const productPrice = document.getElementById('productPrice');
      const productDescription = document.getElementById('productDescription');
      const productFabric = document.getElementById('productFabric');
      const productFit = document.getElementById('productFit');
      const whatsappBtn = document.getElementById('whatsappBtn');

      if (productImage) productImage.src = product.image;
      if (productImage) productImage.alt = product.name;
      if (productName) productName.textContent = product.name;
      if (productPrice) productPrice.textContent = product.price;
      if (productDescription) productDescription.textContent = product.description;
      if (productFabric) productFabric.textContent = product.fabric;
      if (productFit) productFit.textContent = product.fit;
      if (whatsappBtn) {
        const message = encodeURIComponent(`Hi! I'm interested in Product ID: ${product.id} - ${product.name}`);
        whatsappBtn.href = `https://wa.me/918160819720?text=${message}`;
      }

      // Update page title
      document.title = `${product.name} | GULABDAS`;
    }
  }

  // ========================================
  // HEADER SCROLL EFFECT
  // ========================================
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
