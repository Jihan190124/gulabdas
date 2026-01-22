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
    productCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = '';
        // Re-trigger animation
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.style.display = 'none';
      }
    });
  }

  // ========================================
  // PRODUCT DETAIL PAGE
  // ========================================
  const productData = {
    'silk-blouse-cream': {
      name: 'Cream Silk Blouse',
      price: '₹4,500',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop',
      description: 'An elegant cream silk blouse with delicate balloon sleeves. Perfect for both formal occasions and elevated everyday wear.',
      fabric: '100% Pure Silk',
      fit: 'Relaxed fit, True to size'
    },
    'charcoal-blazer': {
      name: 'Charcoal Wool Blazer',
      price: '₹12,000',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
      description: 'A masterfully tailored charcoal blazer crafted from premium Italian wool. The epitome of sophisticated menswear.',
      fabric: 'Italian Wool Blend',
      fit: 'Slim fit, Consider sizing up for layering'
    },
    'olive-midi-dress': {
      name: 'Olive Midi Dress',
      price: '₹6,800',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop',
      description: 'A flowing olive green midi dress with a flattering V-neckline and gathered waist. Effortlessly elegant for any occasion.',
      fabric: 'Viscose Crepe',
      fit: 'Flowy fit, True to size'
    },
    'beige-linen-trousers': {
      name: 'Beige Linen Trousers',
      price: '₹3,200',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop',
      description: 'Classic high-waisted linen trousers in warm beige. A wardrobe essential that pairs beautifully with everything.',
      fabric: '100% European Linen',
      fit: 'Straight leg, True to size'
    },
    'evening-gown': {
      name: 'Black Evening Gown',
      price: '₹15,000',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=1000&fit=crop',
      description: 'A stunning floor-length evening gown in deep black. Designed to make an unforgettable entrance.',
      fabric: 'Satin with Silk Lining',
      fit: 'Form-fitting, Consider sizing for comfort'
    },
    'cashmere-sweater': {
      name: 'Cashmere Sweater',
      price: '₹9,500',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1000&fit=crop',
      description: 'Luxuriously soft cashmere sweater in a timeless silhouette. The ultimate in comfort and elegance.',
      fabric: '100% Cashmere',
      fit: 'Relaxed fit, True to size'
    },
    'linen-shirt': {
      name: 'White Linen Shirt',
      price: '₹4,200',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop',
      description: 'A crisp white linen shirt that transitions effortlessly from casual to formal occasions.',
      fabric: '100% European Linen',
      fit: 'Regular fit, True to size'
    }
  };

  // Load product data on product page
  const productIdParam = urlParams.get('id');
  if (productIdParam && productData[productIdParam]) {
    const product = productData[productIdParam];
    
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
      const message = encodeURIComponent(`Hi! I'm interested in the ${product.name} (${product.price})`);
      whatsappBtn.href = `https://wa.me/919601666494?text=${message}`;
    }
    
    // Update page title
    document.title = `${product.name} | GULABDAS`;
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