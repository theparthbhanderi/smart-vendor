import React, { useState, useEffect } from 'react';
// Lucide React icons for modern UI
import { Home, User, Store, ShoppingCart, Camera, Mic, QrCode, TrendingUp, Tag, Package, Box, Truck, BarChart, Settings, Globe, LogIn, UserPlus } from 'lucide-react';

// Main App Component
const App = () => {
  // State to manage current page view
  const [currentPage, setCurrentPage] = useState('home');
  // State for user authentication status (mock)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State for current user role (mock: 'vendor' or 'customer')
  const [userRole, setUserRole] = useState(null); // null, 'vendor', 'customer'
  // State for language (mock: 'en', 'hi', 'gu')
  const [language, setLanguage] = useState('en');

  // Dummy data for products (simulating local storage or mock API)
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [
      { id: 'p1', name: 'Fresh Tomatoes', price: 40, unit: 'kg', imageUrl: 'https://placehold.co/100x100/A0DC7F/000000?text=Tomato', vendorId: 'v1' },
      { id: 'p2', name: 'Organic Apples', price: 120, unit: 'kg', imageUrl: 'https://placehold.co/100x100/FFDDC1/000000?text=Apple', vendorId: 'v1' },
      { id: 'p3', name: 'Handmade Soap', price: 80, unit: 'piece', imageUrl: 'https://placehold.co/100x100/D3D3D3/000000?text=Soap', vendorId: 'v2' },
      { id: 'p4', name: 'Local Honey', price: 250, unit: 'jar', imageUrl: 'https://placehold.co/100x100/F0E68C/000000?text=Honey', vendorId: 'v2' },
    ];
  });

  // Dummy data for orders (simulating local storage or mock API)
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [
      { id: 'o1', customerName: 'Parth', items: [{ productId: 'p1', name: 'Fresh Tomatoes', quantity: 2, price: 40 }], total: 80, status: 'Pending', vendorId: 'v1' },
      { id: 'o2', customerName: 'Priya', items: [{ productId: 'p3', name: 'Handmade Soap', quantity: 1, price: 80 }], total: 80, status: 'Accepted', vendorId: 'v2' },
    ];
  });

  // Dummy data for users (simulating local storage or mock API)
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [
      { id: 'v1', username: 'vendor1', password: 'password', role: 'vendor', shopName: 'Ramesh Vegetables' },
      { id: 'v2', username: 'vendor2', password: 'password', role: 'vendor', shopName: 'Priya Home Goods' },
      { id: 'c1', username: 'customer1', password: 'password', role: 'customer' },
    ];
  });

  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Language content mapping
  const translations = {
    en: {
      home: 'Home',
      loginSignup: 'Login / Signup',
      vendorDashboard: 'Vendor Dashboard',
      customerApp: 'Customer App',
      welcome: 'Welcome to LocalConnect!',
      tagline: 'Empowering small businesses, connecting customers.',
      login: 'Login',
      signup: 'Signup',
      username: 'Username',
      password: 'Password',
      role: 'Role',
      vendor: 'Vendor',
      customer: 'Customer',
      loginSuccess: 'Login successful!',
      signupSuccess: 'Signup successful! Please login.',
      invalidCredentials: 'Invalid username or password.',
      usernameExists: 'Username already exists.',
      productManagement: 'Product Management',
      orders: 'Orders',
      offers: 'Offers',
      analytics: 'Analytics',
      addProduct: 'Add Product',
      productName: 'Product Name',
      price: 'Price',
      unit: 'Unit (e.g., kg, piece)',
      imageUrl: 'Image URL (Optional)',
      uploadImageCamera: 'Upload Image (Camera)',
      uploadVoice: 'Upload via Voice',
      saveProduct: 'Save Product',
      editProduct: 'Edit Product',
      deleteProduct: 'Delete Product',
      productAdded: 'Product added successfully!',
      productUpdated: 'Product updated successfully!',
      productDeleted: 'Product deleted successfully!',
      noProducts: 'No products added yet.',
      orderId: 'Order ID',
      customer: 'Customer',
      items: 'Items',
      total: 'Total',
      status: 'Status',
      updateStatus: 'Update Status',
      pending: 'Pending',
      accepted: 'Accepted',
      delivered: 'Delivered',
      noOrders: 'No orders received yet.',
      createOffer: 'Create New Offer',
      offerTitle: 'Offer Title',
      description: 'Description',
      sendOffer: 'Send Offer',
      offerSent: 'Offer sent successfully!',
      salesOverview: 'Sales Overview',
      topSellingItems: 'Top Selling Items',
      digitalPaymentQR: 'Digital Payment QR',
      generateQR: 'Generate QR',
      qrGenerated: 'QR Code Generated!',
      browseProducts: 'Browse Products',
      myCart: 'My Cart',
      placeOrder: 'Place Order',
      repeatOrder: 'Repeat Order',
      noProductsAvailable: 'No products available yet.',
      addToCart: 'Add to Cart',
      quantity: 'Quantity',
      checkout: 'Checkout',
      yourCartIsEmpty: 'Your cart is empty.',
      removeItem: 'Remove Item',
      customerName: 'Your Name',
      customerAddress: 'Your Address',
      confirmOrder: 'Confirm Order',
      orderPlaced: 'Order placed successfully! Vendor will be notified via SMS.',
      previousOrders: 'Previous Orders',
      noPreviousOrders: 'No previous orders.',
      language: 'Language',
      selectLanguage: 'Select Language',
      gujarati: 'Gujarati',
      hindi: 'Hindi',
      english: 'English',
      logout: 'Logout',
    },
    hi: {
      home: 'होम',
      loginSignup: 'लॉगिन / साइनअप',
      vendorDashboard: 'विक्रेता डैशबोर्ड',
      customerApp: 'ग्राहक ऐप',
      welcome: 'लोकलकनेक्ट में आपका स्वागत है!',
      tagline: 'छोटे व्यवसायों को सशक्त बनाना, ग्राहकों को जोड़ना।',
      login: 'लॉगिन करें',
      signup: 'साइनअप करें',
      username: 'यूजरनेम',
      password: 'पासवर्ड',
      role: 'भूमिका',
      vendor: 'विक्रेता',
      customer: 'ग्राहक',
      loginSuccess: 'लॉगिन सफल!',
      signupSuccess: 'साइनअप सफल! कृपया लॉगिन करें।',
      invalidCredentials: 'गलत यूजरनेम या पासवर्ड।',
      usernameExists: 'यूजरनेम पहले से मौजूद है।',
      productManagement: 'उत्पाद प्रबंधन',
      orders: 'ऑर्डर',
      offers: 'ऑफर',
      analytics: 'एनालिटिक्स',
      addProduct: 'उत्पाद जोड़ें',
      productName: 'उत्पाद का नाम',
      price: 'मूल्य',
      unit: 'इकाई (जैसे किलो, पीस)',
      imageUrl: 'छवि URL (वैकल्पिक)',
      uploadImageCamera: 'छवि अपलोड करें (कैमरा)',
      uploadVoice: 'आवाज से अपलोड करें',
      saveProduct: 'उत्पाद सहेजें',
      editProduct: 'उत्पाद संपादित करें',
      deleteProduct: 'उत्पाद मिटाएं',
      productAdded: 'उत्पाद सफलतापूर्वक जोड़ा गया!',
      productUpdated: 'उत्पाद सफलतापूर्वक अपडेट किया गया!',
      productDeleted: 'उत्पाद सफलतापूर्वक मिटाया गया!',
      noProducts: 'अभी तक कोई उत्पाद नहीं जोड़ा गया है।',
      orderId: 'ऑर्डर आईडी',
      customer: 'ग्राहक',
      items: 'आइटम',
      total: 'कुल',
      status: 'स्थिति',
      updateStatus: 'स्थिति अपडेट करें',
      pending: 'लंबित',
      accepted: 'स्वीकृत',
      delivered: 'वितरित',
      noOrders: 'अभी तक कोई ऑर्डर प्राप्त नहीं हुआ है।',
      createOffer: 'नया ऑफर बनाएं',
      offerTitle: 'ऑफर शीर्षक',
      description: 'विवरण',
      sendOffer: 'ऑफर भेजें',
      offerSent: 'ऑफर सफलतापूर्वक भेजा गया!',
      salesOverview: 'बिक्री अवलोकन',
      topSellingItems: 'सबसे ज्यादा बिकने वाले आइटम',
      digitalPaymentQR: 'डिजिटल भुगतान QR',
      generateQR: 'QR जनरेट करें',
      qrGenerated: 'QR कोड जनरेट किया गया!',
      browseProducts: 'उत्पाद ब्राउज़ करें',
      myCart: 'मेरा कार्ट',
      placeOrder: 'ऑर्डर दें',
      repeatOrder: 'ऑर्डर दोहराएं',
      noProductsAvailable: 'अभी तक कोई उत्पाद उपलब्ध नहीं है।',
      addToCart: 'कार्ट में जोड़ें',
      quantity: 'मात्रा',
      checkout: 'चेकआउट',
      yourCartIsEmpty: 'आपका कार्ट खाली है।',
      removeItem: 'आइटम हटाएँ',
      customerName: 'आपका नाम',
      customerAddress: 'आपका पता',
      confirmOrder: 'ऑर्डर की पुष्टि करें',
      orderPlaced: 'ऑर्डर सफलतापूर्वक दिया गया! विक्रेता को SMS द्वारा सूचित किया जाएगा।',
      previousOrders: 'पिछले ऑर्डर',
      noPreviousOrders: 'कोई पिछला ऑर्डर नहीं।',
      language: 'भाषा',
      selectLanguage: 'भाषा चुनें',
      gujarati: 'गुजराती',
      hindi: 'हिंदी',
      english: 'अंग्रेजी',
      logout: 'लॉगआउट',
    },
    gu: {
      home: 'ઘર',
      loginSignup: 'લોગિન / સાઇનઅપ',
      vendorDashboard: 'વિક્રેતા ડેશબોર્ડ',
      customerApp: 'ગ્રાહક એપ્લિકેશન',
      welcome: 'લોકલકનેક્ટમાં તમારું સ્વાગત છે!',
      tagline: 'નાના વ્યવસાયોને સશક્ત બનાવવું, ગ્રાહકોને જોડવું.',
      login: 'લોગિન કરો',
      signup: 'સાઇનઅપ કરો',
      username: 'વપરાશકર્તા નામ',
      password: 'પાસવર્ડ',
      role: 'ભૂમિકા',
      vendor: 'વિક્રેતા',
      customer: 'ગ્રાહક',
      loginSuccess: 'લોગિન સફળ!',
      signupSuccess: 'સાઇનઅપ સફળ! કૃપા કરીને લોગિન કરો.',
      invalidCredentials: 'અમાન્ય વપરાશકર્તા નામ અથવા પાસવર્ડ.',
      usernameExists: 'વપરાશકર્તા નામ પહેલેથી જ અસ્તિત્વમાં છે.',
      productManagement: 'ઉત્પાદન વ્યવસ્થાપન',
      orders: 'ઓર્ડર',
      offers: 'ઓફર',
      analytics: 'એનાલિટિક્સ',
      addProduct: 'ઉત્પાદન ઉમેરો',
      productName: 'ઉત્પાદનનું નામ',
      price: 'કિંમત',
      unit: 'એકમ (જેમ કે કિલો, પીસ)',
      imageUrl: 'છબી URL (વૈકલ્પિક)',
      uploadImageCamera: 'છબી અપલોડ કરો (કેમેરા)',
      uploadVoice: 'અવાજ દ્વારા અપલોડ કરો',
      saveProduct: 'ઉત્પાદન સાચવો',
      editProduct: 'ઉત્પાદન સંપાદિત કરો',
      deleteProduct: 'ઉત્પાદન કાઢી નાખો',
      productAdded: 'ઉત્પાદન સફળતાપૂર્વક ઉમેરવામાં આવ્યું!',
      productUpdated: 'ઉત્પાદન સફળતાપૂર્વક અપડેટ થયું!',
      productDeleted: 'ઉત્પાદન સફળતાપૂર્વક કાઢી નાખવામાં આવ્યું!',
      noProducts: 'હજુ સુધી કોઈ ઉત્પાદનો ઉમેરવામાં આવ્યા નથી.',
      orderId: 'ઓર્ડર ID',
      customer: 'ગ્રાહક',
      items: 'વસ્તુઓ',
      total: 'કુલ',
      status: 'સ્થિતિ',
      updateStatus: 'સ્થિતિ અપડેટ કરો',
      pending: 'બાકી',
      accepted: 'સ્વીકૃત',
      delivered: 'વિતરિત',
      noOrders: 'હજુ સુધી કોઈ ઓર્ડર મળ્યા નથી.',
      createOffer: 'નવી ઓફર બનાવો',
      offerTitle: 'ઓફર શીર્ષક',
      description: 'વર્ણન',
      sendOffer: 'ઓફર મોકલો',
      offerSent: 'ઓફર સફળતાપૂર્વક મોકલવામાં આવી!',
      salesOverview: 'વેચાણ વિહંગાવલોકન',
      topSellingItems: 'સૌથી વધુ વેચાતી વસ્તુઓ',
      digitalPaymentQR: 'ડિજિટલ ચુકવણી QR',
      generateQR: 'QR જનરેટ કરો',
      qrGenerated: 'QR કોડ જનરેટ થયો!',
      browseProducts: 'ઉત્પાદનો બ્રાઉઝ કરો',
      myCart: 'મારો કાર્ટ',
      placeOrder: 'ઓર્ડર આપો',
      repeatOrder: 'ઓર્ડર પુનરાવર્તન કરો',
      noProductsAvailable: 'હજુ સુધી કોઈ ઉત્પાદનો ઉપલબ્ધ નથી.',
      addToCart: 'કાર્ટમાં ઉમેરો',
      quantity: 'જથ્થો',
      checkout: 'ચેકઆઉટ',
      yourCartIsEmpty: 'તમારો કાર્ટ ખાલી છે.',
      removeItem: 'વસ્તુ દૂર કરો',
      customerName: 'તમારું નામ',
      customerAddress: 'તમારું સરનામું',
      confirmOrder: 'ઓર્ડરની પુષ્ટિ કરો',
      orderPlaced: 'ઓર્ડર સફળતાપૂર્વક આપવામાં આવ્યો! વિક્રેતાને SMS દ્વારા સૂચિત કરવામાં આવશે.',
      previousOrders: 'અગાઉના ઓર્ડર',
      noPreviousOrders: 'કોઈ અગાઉના ઓર્ડર નથી.',
      language: 'ભાષા',
      selectLanguage: 'ભાષા પસંદ કરો',
      gujarati: 'ગુજરાતી',
      hindi: 'હિન્દી',
      english: 'અંગ્રેજી',
      logout: 'લોગઆઉટ',
    },
  };

  const t = translations[language];

  // --- Authentication Component ---
  const AuthPage = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); // Default role
    const [message, setMessage] = useState('');

    const handleAuth = (e) => {
      e.preventDefault();
      setMessage('');

      if (isLogin) {
        // Login logic
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          onLoginSuccess(user.role);
          setMessage(t.loginSuccess);
        } else {
          setMessage(t.invalidCredentials);
        }
      } else {
        // Signup logic
        const userExists = users.some(u => u.username === username);
        if (userExists) {
          setMessage(t.usernameExists);
        } else {
          const newUser = { id: `u${users.length + 1}`, username, password, role };
          setUsers([...users, newUser]);
          setMessage(t.signupSuccess);
          setIsLogin(true); // Switch to login after signup
        }
      }
    };

    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 rounded-md p-2 bg-blue-100">{isLogin ? t.login : t.signup}</h2>
          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">{t.username}</label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">{t.password}</label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {!isLogin && (
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">{t.role}</label>
                <select
                  id="role"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="customer">{t.customer}</option>
                  <option value="vendor">{t.vendor}</option>
                </select>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105"
            >
              {isLogin ? t.login : t.signup}
            </button>
          </form>
          {message && (
            <p className={`mt-4 text-center text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-4 w-full text-blue-600 hover:text-blue-800 text-sm transition duration-200 ease-in-out"
          >
            {isLogin ? t.signup : t.login}
          </button>
        </div>
      </div>
    );
  };

  // --- Vendor Dashboard Components ---
  const VendorDashboard = ({ vendorId, products, setProducts, orders, setOrders }) => {
    const [currentVendorPage, setCurrentVendorPage] = useState('productManagement');
    const [editingProduct, setEditingProduct] = useState(null); // Product being edited

    // Filter products and orders for the current vendor
    const vendorProducts = products.filter(p => p.vendorId === vendorId);
    const vendorOrders = orders.filter(o => o.vendorId === vendorId);

    // Product Management
    const ProductManagement = () => {
      const [productName, setProductName] = useState(editingProduct ? editingProduct.name : '');
      const [price, setPrice] = useState(editingProduct ? editingProduct.price : '');
      const [unit, setUnit] = useState(editingProduct ? editingProduct.unit : '');
      const [imageUrl, setImageUrl] = useState(editingProduct ? editingProduct.imageUrl : '');
      const [message, setMessage] = useState('');

      const handleSaveProduct = (e) => {
        e.preventDefault();
        setMessage('');
        if (editingProduct) {
          // Update existing product
          setProducts(products.map(p =>
            p.id === editingProduct.id
              ? { ...p, name: productName, price: parseFloat(price), unit, imageUrl }
              : p
          ));
          setMessage(t.productUpdated);
          setEditingProduct(null); // Exit edit mode
        } else {
          // Add new product
          const newProduct = {
            id: `p${products.length + 1}`,
            name: productName,
            price: parseFloat(price),
            unit,
            imageUrl: imageUrl || `https://placehold.co/100x100/CCCCCC/000000?text=${productName.substring(0, 5)}`,
            vendorId: vendorId, // Assign to current vendor
          };
          setProducts([...products, newProduct]);
          setMessage(t.productAdded);
        }
        // Clear form
        setProductName('');
        setPrice('');
        setUnit('');
        setImageUrl('');
      };

      const handleDeleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
        setMessage(t.productDeleted);
      };

      const handleEditClick = (product) => {
        setEditingProduct(product);
        setProductName(product.name);
        setPrice(product.price);
        setUnit(product.unit);
        setImageUrl(product.imageUrl);
      };

      // Mock Camera/Voice upload
      const handleCameraUpload = () => {
        setMessage('Camera functionality would be integrated here (e.g., using navigator.mediaDevices.getUserMedia).');
      };

      const handleVoiceUpload = () => {
        setMessage('Voice upload functionality would be integrated here (e.g., using Web Speech API).');
      };

      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">{t.productManagement}</h3>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h4 className="text-xl font-medium text-gray-800 mb-4">{editingProduct ? t.editProduct : t.addProduct}</h4>
            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700">{t.productName}</label>
                <input type="text" id="productName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg" value={productName} onChange={(e) => setProductName(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">{t.price}</label>
                <input type="number" id="price" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700">{t.unit}</label>
                <input type="text" id="unit" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg" value={unit} onChange={(e) => setUnit(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">{t.imageUrl}</label>
                <input type="text" id="imageUrl" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              </div>
              <div className="flex space-x-4">
                <button type="button" onClick={handleCameraUpload} className="flex-1 flex items-center justify-center bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200 ease-in-out">
                  <Camera className="w-5 h-5 mr-2" /> {t.uploadImageCamera}
                </button>
                <button type="button" onClick={handleVoiceUpload} className="flex-1 flex items-center justify-center bg-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-600 transition duration-200 ease-in-out">
                  <Mic className="w-5 h-5 mr-2" /> {t.uploadVoice}
                </button>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105">
                {editingProduct ? t.saveProduct : t.addProduct}
              </button>
            </form>
            {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h4 className="text-xl font-medium text-gray-800 mb-4">Your Products</h4>
            {vendorProducts.length === 0 ? (
              <p className="text-gray-500">{t.noProducts}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vendorProducts.map(product => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center shadow-sm">
                    <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-md mb-3" onError={(e) => e.target.src = `https://placehold.co/100x100/CCCCCC/000000?text=${product.name.substring(0, 5)}`} />
                    <p className="font-semibold text-lg text-gray-800">{product.name}</p>
                    <p className="text-gray-600">₹{product.price} / {product.unit}</p>
                    <div className="mt-3 flex space-x-2">
                      <button onClick={() => handleEditClick(product)} className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600 transition duration-200 ease-in-out">
                        {t.editProduct}
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition duration-200 ease-in-out">
                        {t.deleteProduct}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    };

    // Order Management
    const OrderManagement = () => {
      const handleUpdateStatus = (orderId, newStatus) => {
        setOrders(orders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
      };

      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">{t.orders}</h3>
          <div className="bg-white p-6 rounded-xl shadow-md">
            {vendorOrders.length === 0 ? (
              <p className="text-gray-500">{t.noOrders}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">{t.orderId}</th>
                      <th className="py-3 px-6 text-left">{t.customer}</th>
                      <th className="py-3 px-6 text-left">{t.items}</th>
                      <th className="py-3 px-6 text-left">{t.total}</th>
                      <th className="py-3 px-6 text-left">{t.status}</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 text-sm">
                    {vendorOrders.map(order => (
                      <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{order.id}</td>
                        <td className="py-3 px-6 text-left">{order.customerName}</td>
                        <td className="py-3 px-6 text-left">
                          {order.items.map(item => (
                            <div key={item.productId}>{item.name} (x{item.quantity})</div>
                          ))}
                        </td>
                        <td className="py-3 px-6 text-left">₹{order.total}</td>
                        <td className="py-3 px-6 text-left">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                            order.status === 'Accepted' ? 'bg-blue-200 text-blue-800' :
                            'bg-green-200 text-green-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                          >
                            <option value="Pending">{t.pending}</option>
                            <option value="Accepted">{t.accepted}</option>
                            <option value="Delivered">{t.delivered}</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      );
    };

    // Offers & Promotions
    const Offers = () => {
      const [offerTitle, setOfferTitle] = useState('');
      const [offerDescription, setOfferDescription] = useState('');
      const [message, setMessage] = useState('');

      const handleSendOffer = (e) => {
        e.preventDefault();
        setMessage('');
        // Mock sending offer
        console.log('Offer Sent:', { offerTitle, offerDescription });
        setMessage(t.offerSent);
        setOfferTitle('');
        setOfferDescription('');
      };

      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">{t.offers}</h3>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h4 className="text-xl font-medium text-gray-800 mb-4">{t.createOffer}</h4>
            <form onSubmit={handleSendOffer} className="space-y-4">
              <div>
                <label htmlFor="offerTitle" className="block text-sm font-medium text-gray-700">{t.offerTitle}</label>
                <input type="text" id="offerTitle" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg" value={offerTitle} onChange={(e) => setOfferTitle(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="offerDescription" className="block text-sm font-medium text-gray-700">{t.description}</label>
                <textarea id="offerDescription" rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg" value={offerDescription} onChange={(e) => setOfferDescription(e.target.value)} required></textarea>
              </div>
              <button type="submit" className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition duration-200 ease-in-out transform hover:scale-105">
                {t.sendOffer}
              </button>
            </form>
            {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
          </div>
        </div>
      );
    };

    // Analytics
    const Analytics = () => {
      // Mock data for analytics
      const salesData = [
        { month: 'Jan', sales: 12000 },
        { month: 'Feb', sales: 15000 },
        { month: 'Mar', sales: 10000 },
        { month: 'Apr', sales: 18000 },
      ];

      const topItems = [
        { name: 'Fresh Tomatoes', sales: 500 },
        { name: 'Organic Apples', sales: 300 },
        { name: 'Handmade Soap', sales: 200 },
      ];

      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">{t.analytics}</h3>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h4 className="text-xl font-medium text-gray-800 mb-4">{t.salesOverview}</h4>
            <p className="text-gray-600">
              {/* This would be a chart in a real app, mock data for now */}
              Monthly Sales: {salesData.map(d => `${d.month}: ₹${d.sales}`).join(', ')}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h4 className="text-xl font-medium text-gray-800 mb-4">{t.topSellingItems}</h4>
            <ul className="list-disc list-inside text-gray-600">
              {topItems.map((item, index) => (
                <li key={index}>{item.name} ({item.sales} units sold)</li>
              ))}
            </ul>
          </div>
        </div>
      );
    };

    // Digital Payment QR Generator
    const DigitalPaymentQR = () => {
      const [qrCodeData, setQrCodeData] = useState('');
      const [message, setMessage] = useState('');

      const generateQR = () => {
        // In a real app, this would generate a QR code image based on vendor's payment info
        // For now, it's a mock string or a placeholder image URL
        const mockPaymentLink = `upi://pay?pa=vendor${vendorId}@upi&pn=Vendor${vendorId}Shop&am=100&cu=INR`;
        setQrCodeData(mockPaymentLink); // Simulate QR data
        setMessage(t.qrGenerated);
      };

      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">{t.digitalPaymentQR}</h3>
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <button onClick={generateQR} className="bg-teal-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-600 transition duration-200 ease-in-out transform hover:scale-105 mb-4">
              <QrCode className="inline-block w-5 h-5 mr-2" /> {t.generateQR}
            </button>
            {qrCodeData && (
              <div className="text-center">
                <p className="text-gray-700 mb-2">{t.qrGenerated}</p>
                {/* Placeholder for QR code image */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrCodeData)}`}
                  alt="QR Code"
                  className="w-48 h-48 border border-gray-300 rounded-md shadow-md"
                />
                <p className="text-sm text-gray-500 mt-2 break-all">{qrCodeData}</p>
              </div>
            )}
            {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
          </div>
        </div>
      );
    };


    return (
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-gray-100">
        {/* Sidebar */}
        <nav className="w-full md:w-64 bg-gray-800 text-white p-4 shadow-lg md:min-h-[calc(100vh-80px)]">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-300">Vendor Panel</h2>
          <ul className="space-y-3">
            <li>
              <button onClick={() => setCurrentVendorPage('productManagement')} className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition duration-200 ease-in-out ${currentVendorPage === 'productManagement' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                <Package className="w-5 h-5 mr-3" /> {t.productManagement}
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentVendorPage('orders')} className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition duration-200 ease-in-out ${currentVendorPage === 'orders' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                <Box className="w-5 h-5 mr-3" /> {t.orders}
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentVendorPage('offers')} className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition duration-200 ease-in-out ${currentVendorPage === 'offers' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                <Tag className="w-5 h-5 mr-3" /> {t.offers}
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentVendorPage('analytics')} className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition duration-200 ease-in-out ${currentVendorPage === 'analytics' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                <BarChart className="w-5 h-5 mr-3" /> {t.analytics}
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentVendorPage('digitalPaymentQR')} className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition duration-200 ease-in-out ${currentVendorPage === 'digitalPaymentQR' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                <QrCode className="w-5 h-5 mr-3" /> {t.digitalPaymentQR}
              </button>
            </li>
          </ul>
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {currentVendorPage === 'productManagement' && <ProductManagement />}
          {currentVendorPage === 'orders' && <OrderManagement />}
          {currentVendorPage === 'offers' && <Offers />}
          {currentVendorPage === 'analytics' && <Analytics />}
          {currentVendorPage === 'digitalPaymentQR' && <DigitalPaymentQR />}
        </main>
      </div>
    );
  };

  // --- Customer App Components ---
  const CustomerApp = ({ products, orders, setOrders }) => {
    const [currentCustomerPage, setCurrentCustomerPage] = useState('browseProducts');
    const [cart, setCart] = useState([]);
    const [message, setMessage] = useState('');

    const handleAddToCart = (product) => {
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        setCart(cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
      setMessage(`${product.name} added to cart!`);
      setTimeout(() => setMessage(''), 2000); // Clear message after 2 seconds
    };

    const handleRemoveFromCart = (productId) => {
      setCart(cart.filter(item => item.id !== productId));
    };

    const handleUpdateCartQuantity = (productId, newQuantity) => {
      if (newQuantity <= 0) {
        handleRemoveFromCart(productId);
      } else {
        setCart(cart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        ));
      }
    };

    const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Browse Products
    const BrowseProducts = () => {
      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">{t.browseProducts}</h3>
          {products.length === 0 ? (
            <p className="text-gray-500">{t.noProductsAvailable}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105">
                  <img src={product.imageUrl} alt={product.name} className="w-32 h-32 object-cover rounded-md mb-3" onError={(e) => e.target.src = `https://placehold.co/100x100/CCCCCC/000000?text=${product.name.substring(0, 5)}`} />
                  <p className="font-semibold text-lg text-gray-800">{product.name}</p>
                  <p className="text-gray-600">₹{product.price} / {product.unit}</p>
                  <button onClick={() => handleAddToCart(product)} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out">
                    <ShoppingCart className="inline-block w-4 h-4 mr-2" /> {t.addToCart}
                  </button>
                </div>
              ))}
            </div>
          )}
          {message && <p className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">{message}</p>}
        </div>
      );
    };

    // My Cart & Checkout
    const MyCart = () => {
      const [customerName, setCustomerName] = useState('');
      const [customerAddress, setCustomerAddress] = useState('');

      const handlePlaceOrder = (e) => {
        e.preventDefault();
        if (cart.length === 0) {
          setMessage(t.yourCartIsEmpty);
          return;
        }

        const newOrder = {
          id: `o${orders.length + 1}`,
          customerName,
          customerAddress,
          items: cart.map(item => ({ productId: item.id, name: item.name, quantity: item.quantity, price: item.price })),
          total: totalCartPrice,
          status: 'Pending',
          vendorId: cart[0].vendorId, // Assuming single vendor for simplicity, or handle multiple
        };
        setOrders([...orders, newOrder]);
        setCart([]); // Clear cart
        setCustomerName('');
        setCustomerAddress('');
        setMessage(t.orderPlaced);
        setTimeout(() => setMessage(''), 5000);
        setCurrentCustomerPage('previousOrders'); // Go to previous orders after placing
      };

      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">{t.myCart}</h3>
          <div className="bg-white p-6 rounded-xl shadow-md">
            {cart.length === 0 ? (
              <p className="text-gray-500">{t.yourCartIsEmpty}</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                      <div className="flex items-center">
                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" onError={(e) => e.target.src = `https://placehold.co/100x100/CCCCCC/000000?text=${item.name.substring(0, 5)}`} />
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-gray-600">₹{item.price} / {item.unit}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <label htmlFor={`qty-${item.id}`} className="sr-only">{t.quantity}</label>
                        <input
                          type="number"
                          id={`qty-${item.id}`}
                          value={item.quantity}
                          onChange={(e) => handleUpdateCartQuantity(item.id, parseInt(e.target.value))}
                          min="1"
                          className="w-16 text-center border border-gray-300 rounded-md py-1"
                        />
                        <p className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                        <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-right text-xl font-bold text-gray-800 mb-6">
                  {t.total}: ₹{totalCartPrice.toFixed(2)}
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div>
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">{t.customerName}</label>
                    <input type="text" id="customerName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                  </div>
                  <div>
                    <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700">{t.customerAddress}</label>
                    <textarea id="customerAddress" rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} required></textarea>
                  </div>
                  <button type="submit" className="w-full bg-green-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-200 ease-in-out transform hover:scale-105">
                    {t.confirmOrder}
                  </button>
                </form>
              </>
            )}
          </div>
          {message && <p className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">{message}</p>}
        </div>
      );
    };

    // Previous Orders
    const PreviousOrders = () => {
      const customerOrders = orders.filter(o => o.customerName === 'Parth'); // Mocking customer 'Parth' for now

      const handleRepeatOrder = (order) => {
        // Simulate adding all items from previous order to cart
        const newCartItems = order.items.map(item => {
          const productDetail = products.find(p => p.id === item.productId);
          return productDetail ? { ...productDetail, quantity: item.quantity } : null;
        }).filter(Boolean); // Filter out nulls if product not found

        if (newCartItems.length > 0) {
          setCart(newCartItems);
          setMessage(`Order #${order.id} items added to your cart for repeat!`);
          setTimeout(() => setMessage(''), 3000);
          setCurrentCustomerPage('myCart'); // Navigate to cart
        } else {
          setMessage('Could not repeat order, some products might be unavailable.');
          setTimeout(() => setMessage(''), 3000);
        }
      };

      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">{t.previousOrders}</h3>
          <div className="bg-white p-6 rounded-xl shadow-md">
            {customerOrders.length === 0 ? (
              <p className="text-gray-500">{t.noPreviousOrders}</p>
            ) : (
              <div className="space-y-4">
                {customerOrders.map(order => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold text-lg text-gray-800">{t.orderId}: {order.id}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                        order.status === 'Accepted' ? 'bg-blue-200 text-blue-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-700">Total: ₹{order.total}</p>
                    <p className="text-gray-700 mb-2">Items:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      {order.items.map(item => (
                        <li key={item.productId}>{item.name} (x{item.quantity})</li>
                      ))}
                    </ul>
                    <button onClick={() => handleRepeatOrder(order)} className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition duration-200 ease-in-out transform hover:scale-105">
                      <Repeat className="inline-block w-4 h-4 mr-2" /> {t.repeatOrder}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {message && <p className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">{message}</p>}
        </div>
      );
    };

    return (
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-gray-100">
        {/* Sidebar */}
        <nav className="w-full md:w-64 bg-gray-800 text-white p-4 shadow-lg md:min-h-[calc(100vh-80px)]">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-300">Customer App</h2>
          <ul className="space-y-3">
            <li>
              <button onClick={() => setCurrentCustomerPage('browseProducts')} className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition duration-200 ease-in-out ${currentCustomerPage === 'browseProducts' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                <Store className="w-5 h-5 mr-3" /> {t.browseProducts}
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentCustomerPage('myCart')} className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition duration-200 ease-in-out ${currentCustomerPage === 'myCart' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                <ShoppingCart className="w-5 h-5 mr-3" /> {t.myCart} ({cart.length})
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentCustomerPage('previousOrders')} className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition duration-200 ease-in-out ${currentCustomerPage === 'previousOrders' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                <History className="w-5 h-5 mr-3" /> {t.previousOrders}
              </button>
            </li>
          </ul>
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {currentCustomerPage === 'browseProducts' && <BrowseProducts />}
          {currentCustomerPage === 'myCart' && <MyCart />}
          {currentCustomerPage === 'previousOrders' && <PreviousOrders />}
        </main>
      </div>
    );
  };

  // --- Home Page Component ---
  const HomePage = () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 p-4">
      <div className="text-center bg-white p-10 rounded-3xl shadow-2xl max-w-2xl transform transition-all duration-500 hover:scale-105">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-700 leading-tight">{t.welcome}</h1>
        <p className="text-xl mb-8 text-gray-600 leading-relaxed">{t.tagline}</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => setCurrentPage('auth')}
            className="bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-lg font-semibold flex items-center justify-center"
          >
            <LogIn className="w-5 h-5 mr-2" /> {t.loginSignup}
          </button>
          {/* You can add more calls to action here */}
        </div>
      </div>
    </div>
  );

  // --- Main App Render Logic ---
  return (
    <div className="font-inter antialiased">
      {/* Navbar */}
      <nav className="bg-blue-700 p-4 shadow-md flex justify-between items-center text-white sticky top-0 z-50">
        <div className="text-2xl font-bold text-white hover:text-blue-200 cursor-pointer transition duration-200" onClick={() => setCurrentPage('home')}>
          LocalConnect
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={() => setCurrentPage('home')} className="flex items-center text-white hover:text-blue-200 transition duration-200">
            <Home className="w-5 h-5 mr-1" /> {t.home}
          </button>
          {!isAuthenticated ? (
            <button onClick={() => setCurrentPage('auth')} className="flex items-center text-white hover:text-blue-200 transition duration-200">
              <User className="w-5 h-5 mr-1" /> {t.loginSignup}
            </button>
          ) : (
            <>
              {userRole === 'vendor' && (
                <button onClick={() => setCurrentPage('vendorDashboard')} className="flex items-center text-white hover:text-blue-200 transition duration-200">
                  <Store className="w-5 h-5 mr-1" /> {t.vendorDashboard}
                </button>
              )}
              {userRole === 'customer' && (
                <button onClick={() => setCurrentPage('customerApp')} className="flex items-center text-white hover:text-blue-200 transition duration-200">
                  <ShoppingCart className="w-5 h-5 mr-1" /> {t.customerApp}
                </button>
              )}
              <button onClick={() => { setIsAuthenticated(false); setUserRole(null); setCurrentPage('home'); }} className="flex items-center bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200">
                <LogOut className="w-4 h-4 mr-1" /> {t.logout}
              </button>
            </>
          )}
          {/* Language Switcher */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-blue-600 text-white py-1 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 cursor-pointer"
            >
              <option value="en">{t.english}</option>
              <option value="hi">{t.hindi}</option>
              <option value="gu">{t.gujarati}</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Page Content based on currentPage state */}
      <div className="flex-grow">
        {(() => {
          switch (currentPage) {
            case 'home':
              return <HomePage />;
            case 'auth':
              return <AuthPage onLoginSuccess={(role) => { setIsAuthenticated(true); setUserRole(role); setCurrentPage(role === 'vendor' ? 'vendorDashboard' : 'customerApp'); }} />;
            case 'vendorDashboard':
              return isAuthenticated && userRole === 'vendor' ? (
                <VendorDashboard vendorId="v1" products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} />
              ) : (
                <p className="text-center text-red-500 mt-10">Please login as a vendor to access this page.</p>
              );
            case 'customerApp':
              return isAuthenticated && userRole === 'customer' ? (
                <CustomerApp products={products} orders={orders} setOrders={setOrders} />
              ) : (
                <p className="text-center text-red-500 mt-10">Please login as a customer to access this page.</p>
              );
            default:
              return <HomePage />;
          }
        })()}
      </div>
    </div>
  );
};

export default App;