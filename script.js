// 🌐 Smart Vendor - Modern JavaScript
class SmartVendor {
  constructor() {
    this.cart = [];
    this.currentLanguage = 'en';
    this.isDarkMode = false;
    this.vendors = [];
    this.init();
  }

  init() {
    this.loadFromStorage();
    this.setupEventListeners();
    this.initializeAnimations();
    this.loadVendors();
    this.updateUI();
    this.setupSearchBar();
  }

  // 💾 Storage Management
  loadFromStorage() {
    this.cart = JSON.parse(localStorage.getItem('smartVendorCart') || '[]');
    this.isDarkMode = localStorage.getItem('smartVendorDarkMode') === 'true';
    this.currentLanguage = localStorage.getItem('smartVendorLanguage') || 'en';
  }

  saveToStorage() {
    localStorage.setItem('smartVendorCart', JSON.stringify(this.cart));
    localStorage.setItem('smartVendorDarkMode', this.isDarkMode.toString());
    localStorage.setItem('smartVendorLanguage', this.currentLanguage);
  }

  // 🎯 Event Listeners
  setupEventListeners() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
      darkModeToggle.checked = this.isDarkMode;
      darkModeToggle.addEventListener('change', () => this.toggleDarkMode());
    }

    // Language Selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
      languageSelect.value = this.currentLanguage;
      languageSelect.addEventListener('change', (e) => this.changeLanguage(e.target.value));
    }

    // Cart Functionality
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');

    if (cartIcon) {
      cartIcon.addEventListener('click', () => this.toggleCart());
    }

    if (closeCart) {
      closeCart.addEventListener('click', () => this.toggleCart());
    }

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
      if (cartSidebar && !cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
        this.closeCart();
      }
    });

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Intersection Observer for animations
    this.setupIntersectionObserver();

    // Mobile bottom nav actions
    const mbCartBtn = document.getElementById('mbCartBtn');
    if (mbCartBtn) {
      mbCartBtn.addEventListener('click', () => this.toggleCart());
    }
    const mbWishlistBtn = document.getElementById('mbWishlistBtn');
    if (mbWishlistBtn) {
      const wishlistDrawer = document.getElementById('wishlistDrawer');
      if (wishlistDrawer) {
        mbWishlistBtn.addEventListener('click', () => wishlistDrawer.classList.add('open'));
      } else {
        mbWishlistBtn.addEventListener('click', () => { window.location.href = 'products.html#wishlist'; });
      }
    }

    // Prevent duplicate checkout submissions
    document.querySelectorAll('.checkout-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleCheckout(e));
    });
  }

  // 🌙 Dark Mode Toggle
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    this.saveToStorage();
    
    // Add animation class
    document.body.classList.add('theme-transition');
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300);
  }

  // 🌐 Language Change
  changeLanguage(lang) {
    this.currentLanguage = lang;
    this.saveToStorage();
    this.updateLanguageUI();
  }

  updateLanguageUI() {
    const translations = {
      en: {
        'hero-title': 'Smart Vendor Digital Marketplace',
        'hero-subtitle': 'Transform your local business into a digital powerhouse.',
        'explore-vendors': 'Explore Vendors',
        'join-vendor': 'Join as Vendor',
        'cart-title': 'Smart Cart',
        'cart-total': 'Total:',
        'checkout': 'Checkout',
        'newsletter-title': 'Stay Updated',
        'newsletter-subtitle': 'Get the latest features and tips delivered to your inbox'
      },
      hi: {
        'hero-title': 'स्मार्ट वेंडर डिजिटल मार्केटप्लेस',
        'hero-subtitle': 'अपने स्थानीय व्यवसाय को डिजिटल शक्तिशाली बनाएं।',
        'explore-vendors': 'विक्रेताओं को देखें',
        'join-vendor': 'विक्रेता के रूप में जुड़ें',
        'cart-title': 'स्मार्ट कार्ट',
        'cart-total': 'कुल:',
        'checkout': 'चेकआउट',
        'newsletter-title': 'अपडेट रहें',
        'newsletter-subtitle': 'नवीनतम सुविधाएं और टिप्स अपने इनबॉक्स में प्राप्त करें'
      },
      gu: {
        'hero-title': 'સ્માર્ટ વેન્ડર ડિજિટલ માર્કેટપ્લેસ',
        'hero-subtitle': 'તમારા સ્થાનિક વ્યવસાયને ડિજિટલ શક્તિશાળી બનાવો।',
        'explore-vendors': 'વિક્રેતાઓને જુઓ',
        'join-vendor': 'વિક્રેતા તરીકે જોડાઓ',
        'cart-title': 'સ્માર્ટ કાર્ટ',
        'cart-total': 'કુલ:',
        'checkout': 'ચેકઆઉટ',
        'newsletter-title': 'અપડેટ રહો',
        'newsletter-subtitle': 'નવીનતમ સુવિધાઓ અને ટિપ્સ તમારા ઇનબોક્સમાં મેળવો'
      }
    };

    const currentTranslations = translations[this.currentLanguage] || translations.en;
    
    Object.keys(currentTranslations).forEach(key => {
      const elements = document.querySelectorAll(`[data-translate="${key}"]`);
      elements.forEach(element => {
        element.textContent = currentTranslations[key];
      });
    });
  }

  // 🛒 Cart Management
  addToCart(product) {
    const existingItem = this.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    
    this.saveToStorage();
    this.updateCartUI();
    this.showNotification('Product added to cart!', 'success');
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveToStorage();
    this.updateCartUI();
    this.showNotification('Product removed from cart!', 'info');
  }

  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveToStorage();
        this.updateCartUI();
      }
    }
  }

  toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
      cartSidebar.classList.toggle('open');
    }
  }

  closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
      cartSidebar.classList.remove('open');
    }
  }

  updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cartCount) {
      const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
    }

    if (cartItems) {
      cartItems.innerHTML = '';
      
      if (this.cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
      }

      this.cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
          </div>
          <div class="cart-item-actions">
            <button onclick="smartVendor.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button onclick="smartVendor.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
            <button onclick="smartVendor.removeFromCart('${item.id}')">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        `;
        cartItems.appendChild(cartItem);
      });
    }

    if (cartTotal) {
      const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      cartTotal.textContent = `₹${total.toFixed(2)}`;
    }
  }

  // 💳 Checkout handling with idempotency-like guard
  handleCheckout(e) {
    if (this._isCheckoutProcessing) return;
    this._isCheckoutProcessing = true;
    const buttons = document.querySelectorAll('.checkout-btn');
    const originalTexts = [];
    buttons.forEach((b, i) => { originalTexts[i] = b.innerHTML; b.disabled = true; b.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...'; });
    const idempotencyKey = crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
    this.showNotification('Checkout initiated', 'info');
    // Simulate processing
    setTimeout(() => {
      this.showNotification('Checkout complete!', 'success');
      buttons.forEach((b, i) => { b.disabled = false; b.innerHTML = originalTexts[i]; });
      this._isCheckoutProcessing = false;
    }, 1500);
    // Optionally store idempotency key for diagnostics
    try { sessionStorage.setItem('sv_last_checkout_key', idempotencyKey); } catch {}
  }

  // 🏪 Vendor Management
  loadVendors() {
    // Sample vendor data with enhanced information
    this.vendors = [
      {
        id: '1',
        name: 'Fresh Grocery Store',
        description: 'Fresh vegetables and fruits',
        image: 'https://via.placeholder.com/300x200/4ade80/ffffff?text=Grocery',
        rating: 4.8,
        status: 'open',
        category: 'grocery',
        location: { lat: 21.1702, lng: 72.8311 },
        distance: '0.5 km',
        reviews: 124,
        topProducts: ['Fresh Tomatoes', 'Organic Onions', 'Green Peppers']
      },
      {
        id: '2',
        name: 'Spice Corner',
        description: 'Authentic Indian spices',
        image: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=Spices',
        rating: 4.6,
        status: 'open',
        category: 'spices',
        location: { lat: 21.1705, lng: 72.8315 },
        distance: '0.8 km',
        reviews: 89,
        topProducts: ['Garam Masala', 'Turmeric Powder', 'Red Chili']
      },
      {
        id: '3',
        name: 'Tech Gadgets',
        description: 'Latest electronics and gadgets',
        image: 'https://via.placeholder.com/300x200/6366f1/ffffff?text=Electronics',
        rating: 4.9,
        status: 'closed',
        category: 'electronics',
        location: { lat: 21.1708, lng: 72.8318 },
        distance: '1.2 km',
        reviews: 156,
        topProducts: ['Smartphone Chargers', 'Bluetooth Earbuds', 'Power Banks']
      },
      {
        id: '4',
        name: 'Fashion Boutique',
        description: 'Trendy clothing and accessories',
        image: 'https://via.placeholder.com/300x200/ec4899/ffffff?text=Fashion',
        rating: 4.7,
        status: 'open',
        category: 'fashion',
        location: { lat: 21.1710, lng: 72.8320 },
        distance: '1.5 km',
        reviews: 203,
        topProducts: ['Cotton T-Shirts', 'Denim Jeans', 'Summer Dresses']
      },
      {
        id: '5',
        name: 'Chai Point',
        description: 'Authentic Indian tea and snacks',
        image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Chai',
        rating: 4.5,
        status: 'open',
        category: 'food',
        location: { lat: 21.1700, lng: 72.8310 },
        distance: '0.3 km',
        reviews: 67,
        topProducts: ['Masala Chai', 'Samosa', 'Biscuits']
      },
      {
        id: '6',
        name: 'Mobile World',
        description: 'Mobile phones and accessories',
        image: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Mobile',
        rating: 4.4,
        status: 'open',
        category: 'electronics',
        location: { lat: 21.1712, lng: 72.8322 },
        distance: '1.8 km',
        reviews: 98,
        topProducts: ['Mobile Cases', 'Screen Protectors', 'Cables']
      }
    ];

    this.displayVendors();
    this.displayNearbyVendors();
  }

  displayVendors() {
    const vendorsGrid = document.getElementById('vendorsGrid');
    if (!vendorsGrid) return;

    vendorsGrid.innerHTML = '';
    
    this.vendors.forEach(vendor => {
      const vendorCard = document.createElement('div');
      vendorCard.className = 'vendor-card glass';
      vendorCard.innerHTML = `
        <img src="${vendor.image}" alt="${vendor.name}" class="vendor-image">
        <div class="vendor-content">
          <h3>${vendor.name}</h3>
          <p>${vendor.description}</p>
          <div class="vendor-meta">
            <div class="vendor-rating">
              <i class="fa-solid fa-star"></i>
              <span>${vendor.rating}</span>
            </div>
            <span class="vendor-status ${vendor.status}">${vendor.status}</span>
          </div>
          <button class="btn btn-primary" onclick="smartVendor.viewVendor('${vendor.id}')">
            <i class="fa-solid fa-eye"></i> View Details
          </button>
        </div>
      `;
      vendorsGrid.appendChild(vendorCard);
    });
  }

  viewVendor(vendorId) {
    const vendor = this.vendors.find(v => v.id === vendorId);
    if (vendor) {
      this.showNotification(`Viewing ${vendor.name}`, 'info');
      // Here you would typically navigate to a vendor detail page
    }
  }

  // 🗺️ Display Nearby Vendors
  displayNearbyVendors() {
    const nearbyVendorsContainer = document.getElementById('nearbyVendors');
    if (!nearbyVendorsContainer) return;

    nearbyVendorsContainer.innerHTML = '';
    
    // Sort vendors by distance and take top 6
    const nearbyVendors = this.vendors
      .filter(vendor => vendor.status === 'open')
      .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
      .slice(0, 6);

    nearbyVendors.forEach(vendor => {
      const vendorItem = document.createElement('div');
      vendorItem.className = 'nearby-vendor-item';
      vendorItem.onclick = () => this.viewVendor(vendor.id);
      
      vendorItem.innerHTML = `
        <div class="nearby-vendor-icon">
          <i class="fa-solid fa-${this.getCategoryIcon(vendor.category)}"></i>
        </div>
        <div class="nearby-vendor-info">
          <h4>${vendor.name}</h4>
          <p>${vendor.distance} • ${vendor.rating}★ (${vendor.reviews})</p>
        </div>
      `;
      
      nearbyVendorsContainer.appendChild(vendorItem);
    });
  }

  // 🗺️ Filter Vendors on Map
  filterVendors(category) {
    // Update map button states
    document.querySelectorAll('.map-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter vendors based on category
    const filteredVendors = category === 'all' 
      ? this.vendors 
      : this.vendors.filter(vendor => vendor.category === category);

    // Update vendor pins on map (in a real app, this would update the map)
    this.showNotification(`Showing ${filteredVendors.length} ${category} vendors`, 'info');
  }

  // 💝 Wishlist Management
  addToWishlist(type, item) {
    const wishlist = JSON.parse(localStorage.getItem('smartVendorWishlist') || '{}');
    if (!wishlist[type]) wishlist[type] = [];
    
    const exists = wishlist[type].find(i => i.id === item.id);
    if (!exists) {
      wishlist[type].push(item);
      localStorage.setItem('smartVendorWishlist', JSON.stringify(wishlist));
      this.showNotification(`${type === 'vendors' ? 'Vendor' : 'Product'} added to wishlist!`, 'success');
    } else {
      this.showNotification('Already in wishlist!', 'info');
    }
  }

  removeFromWishlist(type, itemId) {
    const wishlist = JSON.parse(localStorage.getItem('smartVendorWishlist') || '{}');
    if (wishlist[type]) {
      wishlist[type] = wishlist[type].filter(item => item.id !== itemId);
      localStorage.setItem('smartVendorWishlist', JSON.stringify(wishlist));
      this.showWishlist(type);
      this.showNotification('Removed from wishlist!', 'info');
    }
  }

  showWishlist(type) {
    const wishlistContent = document.getElementById('wishlistContent');
    if (!wishlistContent) return;

    // Update tab states
    document.querySelectorAll('.wishlist-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    event.target.classList.add('active');

    const wishlist = JSON.parse(localStorage.getItem('smartVendorWishlist') || '{}');
    const items = wishlist[type] || [];

    if (items.length === 0) {
      wishlistContent.innerHTML = `
        <div style="text-align: center; padding: var(--spacing-xl); color: var(--text-secondary);">
          <i class="fa-solid fa-heart" style="font-size: 3rem; margin-bottom: var(--spacing-md); opacity: 0.3;"></i>
          <h3>No ${type} in your wishlist yet</h3>
          <p>Start adding your favorite ${type} to see them here!</p>
        </div>
      `;
      return;
    }

    wishlistContent.innerHTML = '';
    
    items.forEach(item => {
      const wishlistItem = document.createElement('div');
      wishlistItem.className = 'wishlist-item';
      
      wishlistItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="wishlist-item-info">
          <h4>${item.name}</h4>
          <p>${item.description}</p>
          ${type === 'vendors' ? `<p>${item.rating}★ (${item.reviews} reviews)</p>` : `<p>₹${item.price}</p>`}
        </div>
        <div class="wishlist-item-actions">
          <button class="wishlist-btn primary" onclick="smartVendor.view${type === 'vendors' ? 'Vendor' : 'Product'}('${item.id}')">
            View
          </button>
          <button class="wishlist-btn secondary" onclick="smartVendor.removeFromWishlist('${type}', '${item.id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `;
      
      wishlistContent.appendChild(wishlistItem);
    });
  }

  // 🎯 Helper Methods
  getCategoryIcon(category) {
    const icons = {
      grocery: 'shopping-basket',
      spices: 'mortar-pestle',
      electronics: 'mobile-alt',
      fashion: 'tshirt',
      food: 'utensils'
    };
    return icons[category] || 'store';
  }

  // 📊 Enhanced Vendor Display
  displayVendors() {
    const vendorsGrid = document.getElementById('vendorsGrid');
    if (!vendorsGrid) return;

    vendorsGrid.innerHTML = '';
    
    this.vendors.forEach(vendor => {
      const vendorCard = document.createElement('div');
      vendorCard.className = 'vendor-card glass';
      vendorCard.innerHTML = `
        <img src="${vendor.image}" alt="${vendor.name}" class="vendor-image">
        <div class="vendor-content">
          <h3>${vendor.name}</h3>
          <p>${vendor.description}</p>
          <div class="vendor-meta">
            <div class="vendor-rating">
              <i class="fa-solid fa-star"></i>
              <span>${vendor.rating}</span>
              <span style="color: var(--text-secondary);">(${vendor.reviews})</span>
            </div>
            <span class="vendor-status ${vendor.status}">${vendor.status}</span>
          </div>
          <div class="vendor-details">
            <p><i class="fa-solid fa-map-marker-alt"></i> ${vendor.distance}</p>
            <p><i class="fa-solid fa-${this.getCategoryIcon(vendor.category)}"></i> ${vendor.category}</p>
          </div>
          <div class="vendor-actions">
            <button class="btn btn-primary" onclick="smartVendor.viewVendor('${vendor.id}')">
              <i class="fa-solid fa-eye"></i> View Details
            </button>
            <button class="btn btn-secondary" onclick="smartVendor.addToWishlist('vendors', ${JSON.stringify(vendor).replace(/"/g, '&quot;')})">
              <i class="fa-solid fa-heart"></i> Wishlist
            </button>
          </div>
        </div>
      `;
      vendorsGrid.appendChild(vendorCard);
    });
  }

  // 📧 Newsletter
  handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (email) {
      this.showNotification('Thank you for subscribing!', 'success');
      e.target.reset();
    }
  }

  // 🎭 Animations
  initializeAnimations() {
    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-item h3[data-target]');
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      this.animateCounter(stat, target);
    });
  }

  animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString() + (target > 999 ? '+' : '');
    }, 30);
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.feature-card, .vendor-card, .testimonial-card').forEach(el => {
      observer.observe(el);
    });
  }

  // 🔔 Notifications
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <i class="fa-solid fa-${this.getNotificationIcon(type)}"></i>
      <span>${message}</span>
      <button onclick="this.parentElement.remove()">
        <i class="fa-solid fa-times"></i>
      </button>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-md);
      padding: var(--spacing-sm) var(--spacing-md);
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
      max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }

  getNotificationIcon(type) {
    const icons = {
      success: 'check-circle',
      error: 'exclamation-circle',
      warning: 'exclamation-triangle',
      info: 'info-circle'
    };
    return icons[type] || 'info-circle';
  }

  // 🎨 UI Updates
  updateUI() {
    this.updateCartUI();
    this.updateLanguageUI();
    
    // Apply dark mode if needed
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  // 🔍 Live Search & Filter Logic
  setupSearchBar() {
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    if (!searchBar) return;
    const filterVendors = () => {
      const query = searchInput.value.toLowerCase();
      const category = categoryFilter.value;
      const price = priceFilter.value;
      const rating = parseInt(ratingFilter.value) || 0;
      let filtered = this.vendors.filter(vendor => {
        let match = true;
        if (query && !(vendor.name.toLowerCase().includes(query) || (vendor.products && vendor.products.some(p => p.name.toLowerCase().includes(query))))) match = false;
        if (category && vendor.category !== category) match = false;
        if (price) {
          if (price === 'low' && vendor.avgPrice > 100) match = false;
          if (price === 'medium' && (vendor.avgPrice <= 100 || vendor.avgPrice > 500)) match = false;
          if (price === 'high' && vendor.avgPrice <= 500) match = false;
        }
        if (rating && (!vendor.rating || vendor.rating < rating)) match = false;
        return match;
      });
      this.displayVendors(filtered);
    };
    [searchInput, categoryFilter, priceFilter, ratingFilter].forEach(el => {
      el.addEventListener('input', filterVendors);
    });
    searchBar.addEventListener('submit', e => {
      e.preventDefault();
      filterVendors();
    });
  }
}

// 🚀 Initialize Smart Vendor
let smartVendor;

document.addEventListener('DOMContentLoaded', () => {
  smartVendor = new SmartVendor();
});

// 📱 Mobile Menu Toggle (if needed)
function toggleMobileMenu() {
  const nav = document.querySelector('.nav');
  if (nav) {
    nav.classList.toggle('mobile-open');
  }
}

// 🎯 Add to Cart Function (for product pages)
function addToCart(productId, productName, productPrice, productImage) {
  const product = {
    id: productId,
    name: productName,
    price: parseFloat(productPrice),
    image: productImage
  };
  
  if (smartVendor) {
    smartVendor.addToCart(product);
  }
}

// 🌟 Smooth Scroll Helper
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// 📊 Analytics Helper
function trackEvent(eventName, data = {}) {
  // In a real app, you would send this to your analytics service
  console.log('Event tracked:', eventName, data);
}

// 🔄 Auto-refresh cart count
setInterval(() => {
  if (smartVendor) {
    smartVendor.updateCartUI();
  }
}, 1000);

// 🎨 Add CSS for notifications
const notificationStyles = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .notification {
    font-size: 0.9rem;
    font-weight: 500;
  }

  .notification-success {
    border-left: 4px solid var(--success-color);
  }

  .notification-error {
    border-left: 4px solid var(--error-color);
  }

  .notification-warning {
    border-left: 4px solid var(--warning-color);
  }

  .notification-info {
    border-left: 4px solid var(--primary-color);
  }

  .notification button {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 2px;
    border-radius: var(--radius-sm);
  }

  .notification button:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  .empty-cart {
    text-align: center;
    color: var(--text-secondary);
    padding: var(--spacing-lg);
  }

  .theme-transition {
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);