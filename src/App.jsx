import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Scale, 
  Clock, 
  Bike, 
  MessageCircle, 
  Check, 
  ChevronRight, 
  Heart, 
  ShieldCheck, 
  Stethoscope, 
  Award, 
  Calendar,
  UtensilsCrossed,
  Filter,
  PhoneCall,
  Search
} from 'lucide-react';

import { INITIAL_PRODUCTS, BUSINESS_INFO, ONDO_LOCATIONS, DELIVERY_TIME_SLOTS, TRUSTED_BIKEMEN } from './data/menuData';
import { formatNaira } from './utils/formatters';

import { Navbar } from './components/Navbar';
import { DoctorShiftBanner } from './components/DoctorShiftBanner';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { KilishiSpecialFeature } from './components/KilishiSpecialFeature';
import { DeliveryScheduler } from './components/DeliveryScheduler';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { LiveTracker } from './components/LiveTracker';
import { DrJoieConcierge } from './components/DrJoieConcierge';
import { AdminDashboard } from './components/AdminDashboard';
import { EventsModal } from './components/EventsModal';

export default function App() {
  // Navigation & Modal states
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'kilishi-calculator' | 'events' | 'tracker'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Doctor shift status: 'hospital' (busy on hospital rounds) vs 'kitchen'
  const [doctorShift, setDoctorShift] = useState('hospital');

  // Dynamic products list with live stock / "Ordered Finish" status
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  const handleToggleProductStock = (productId) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const nextAvail = !p.isAvailable;
          return {
            ...p,
            isAvailable: nextAvail,
            stockStatus: nextAvail ? 'available' : 'sold_out'
          };
        }
        return p;
      })
    );
  };

  // Basket items
  const [cartItems, setCartItems] = useState([
    {
      id: 'init-kilishi-0.5kg',
      name: 'Gourmet Kilishi (0.5 kg)',
      category: 'kilishi',
      isKilishi: true,
      selectedWeight: '0.5 kg',
      selectedSpice: 'Traditional Mild Yaji',
      selectedCut: 'Thin Wafer Crisp',
      price: 6800,
      quantity: 1,
      itemTotal: 6800,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'init-vanilla-cake',
      name: 'Classic Velvet Vanilla Dream Cake',
      category: 'cakes',
      selectedSize: '6 inch (Mini Celebration)',
      customInscription: 'Happy Birthday Dr. Bimpe',
      price: 12000,
      quantity: 1,
      itemTotal: 12000,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
    }
  ]);

  // Scheduling states
  const todayStr = new Date().toISOString().split('T')[0];
  const [urgency, setUrgency] = useState('scheduled'); // 'urgent' | 'scheduled' | 'preorder'
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedSlotId, setSelectedSlotId] = useState('slot-afternoon');
  const [selectedLocationId, setSelectedLocationId] = useState('ondo-unimed');
  const [deliveryAddress, setDeliveryAddress] = useState('UNIMED Teaching Hospital Staff Quarters, Ondo Town');
  const [customerNotes, setCustomerNotes] = useState('Please pack Kilishi with extra dry spice pouch.');

  // Dynamic slot capacities
  const [slotCapacities, setSlotCapacities] = useState({
    'slot-morning': { current: 3, max: 6 },
    'slot-afternoon': { current: 7, max: 8 }, // 1 slot remaining!
    'slot-evening': { current: 2, max: 6 },
    'slot-express': { current: 3, max: 4 }
  });

  // Tracked Orders (persisted or pre-seeded with sample for live testing)
  const [orders, setOrders] = useState([
    {
      orderRef: 'JC-OND-8821',
      createdAt: new Date().toISOString(),
      customer: {
        name: 'Dr. Kehinde Adebayo',
        phone: '0803 555 8921',
        email: 'k.adebayo@unimed.edu.ng',
        address: 'Clinical Students Hostel, UNIMED Teaching Hospital Zone, Ondo'
      },
      items: [
        { name: 'Gourmet Beef Kilishi (1.0 kg)', quantity: 1, selectedWeight: '1.0 kg', price: 13000 },
        { name: 'Classic Velvet Vanilla Dream Cake (8 inch)', quantity: 1, selectedSize: '8 inch', price: 18500 }
      ],
      total: 32100,
      deliveryOption: ONDO_LOCATIONS[1], // UNIMED
      urgency: 'urgent',
      scheduledDate: 'Today',
      timeSlot: DELIVERY_TIME_SLOTS[3], // Express
      customerNotes: 'Doctor on call at MTH; call when rider enters security gate',
      paystackRef: 'PSTK-948210',
      assignedRider: TRUSTED_BIKEMEN[1], // Rider Tayo
      status: 'En Route with Trusted Bikeman',
      etaMinutes: 18
    }
  ]);

  // Cart operations
  const handleAddToCart = (newItem) => {
    setCartItems((prev) => {
      // If exact same ID exists, increment
      const existingIdx = prev.findIndex((i) => i.id === newItem.id);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += newItem.quantity || 1;
        copy[existingIdx].itemTotal = copy[existingIdx].price * copy[existingIdx].quantity;
        return copy;
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (itemId, newQty) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity: newQty, itemTotal: i.price * newQty } : i))
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  // Checkout Success handler
  const handleOrderSuccess = (newOrder) => {
    // 1. Add order
    setOrders((prev) => [newOrder, ...prev]);
    // 2. Decrement slot capacity
    if (newOrder.timeSlot?.id) {
      setSlotCapacities((prev) => {
        const current = prev[newOrder.timeSlot.id] || { current: 0, max: 6 };
        return {
          ...prev,
          [newOrder.timeSlot.id]: {
            ...current,
            current: Math.min(current.max, current.current + 1)
          }
        };
      });
    }
    // 3. Clear cart
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    // 4. Show confirmation modal
    setConfirmedOrder(newOrder);
  };

  // Filter products from dynamic state (honors "Ordered Finish" status)
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const kilishiProduct = products.find((p) => p.isKilishi);
  const isKilishiSoldOut = kilishiProduct ? (kilishiProduct.isAvailable === false || kilishiProduct.stockStatus === 'sold_out') : false;

  const cartTotalAmount = cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0) +
    (ONDO_LOCATIONS.find((l) => l.id === selectedLocationId)?.fee || 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans">
      
      {/* 1. Global Navigation */}
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        doctorShift={doctorShift}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTracker={() => setActiveTab('tracker')}
        activeOrderCount={orders.length}
      />

      {/* 2. Doctor Shift Reassurance Banner */}
      <DoctorShiftBanner
        doctorShift={doctorShift}
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      {/* 3. Main Views Switching */}
      <main className="flex-1">
        {activeTab === 'menu' && (
          <>
            {/* Hero Banner */}
            <Hero
              onExploreMenu={() => {
                document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onGoKilishi={() => setActiveTab('kilishi-calculator')}
              onOpenConcierge={() => setIsConciergeOpen(true)}
            />

            {/* Main Ordering Area */}
            <div id="menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
              
              {/* Delivery Scheduler & Urgency Box at Top */}
              <DeliveryScheduler
                urgency={urgency}
                setUrgency={setUrgency}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedSlotId={selectedSlotId}
                setSelectedSlotId={setSelectedSlotId}
                selectedLocationId={selectedLocationId}
                setSelectedLocationId={setSelectedLocationId}
                deliveryAddress={deliveryAddress}
                setDeliveryAddress={setDeliveryAddress}
                customerNotes={customerNotes}
                setCustomerNotes={setCustomerNotes}
                slotCapacities={slotCapacities}
              />

              {/* Special Kilishi in Kg Highlight Feature */}
              <div id="kilishi-feature">
                <KilishiSpecialFeature onAddToCart={handleAddToCart} isSoldOut={isKilishiSoldOut} />
              </div>

              {/* Category Filter & Search Bar */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif-luxury">
                      Confectionery &amp; Gourmet Treats
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                      Handcrafted vanilla cakes, layered fruit parfaits, chilled yoghurts &amp; savory pastries.
                    </p>
                  </div>

                  {/* Search input */}
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search cakes, kilishi, parfaits..."
                      className="w-full text-xs pl-9 pr-4 py-2.5 rounded-full border border-stone-200 bg-white focus:outline-hidden focus:border-amber-600 shadow-2xs"
                    />
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs">
                  {[
                    { id: 'all', label: 'All Offerings' },
                    { id: 'kilishi', label: '⚖️ Kilishi (By Kg)' },
                    { id: 'cakes', label: '🎂 Velvet & Vanilla Cakes' },
                    { id: 'yoghurts', label: '🥛 Greek Yoghurt & Parfaits' },
                    { id: 'pastries', label: '🥐 Flaky Meat Pies & Pastries' },
                    { id: 'events', label: '✨ Event Dessert Stations' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-amber-900 text-white shadow-xs'
                          : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onSelectKilishiKg={() => {
                      document.getElementById('kilishi-feature')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                ))}
              </div>

            </div>
          </>
        )}

        {/* Tab 2: Dedicated Kilishi Kilogram Weigher */}
        {activeTab === 'kilishi-calculator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="mb-4">
              <button
                onClick={() => setActiveTab('menu')}
                className="text-xs font-semibold text-amber-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Return to Full Menu
              </button>
            </div>
            <KilishiSpecialFeature onAddToCart={handleAddToCart} isSoldOut={isKilishiSoldOut} />
          </div>
        )}

        {/* Tab 3: Events & Conglomerate Styling */}
        {activeTab === 'events' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
            <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
              <div className="max-w-2xl space-y-4">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                  Full Conglomerate Services
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury">
                  Joie Events, Catering &amp; Luxury Dessert Stations
                </h2>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  Beyond our daily confections and Kilishi, Dr. Joie curates memorable dessert tables, 
                  tiered wedding cakes, corporate hospitality snack hampers, and full event styling 
                  throughout Ondo State and Akure.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsEventsOpen(true)}
                    className="bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Inquire / Book Consultation on WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('menu')}
                    className="bg-white/10 hover:bg-white/20 text-white px-5 py-3.5 rounded-xl font-semibold text-sm cursor-pointer"
                  >
                    Browse Regular Menu
                  </button>
                </div>
              </div>
            </div>

            {/* Event Showcase cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-800 font-bold text-xl">
                  🎂
                </div>
                <h4 className="font-bold text-lg font-serif-luxury text-stone-900">Custom Tiered Wedding Cakes</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Multilevel fondant and buttercream masterpieces customized with matching flowers, gold leaf, and couple initials.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-800 font-bold text-xl">
                  🍡
                </div>
                <h4 className="font-bold text-lg font-serif-luxury text-stone-900">Dessert Bars &amp; Shot Cups</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Interactive stations with fruit parfait shots, mini kilishi skewer tapas, cake pops, and cinnamon pastry twists.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-800 font-bold text-xl">
                  🩺
                </div>
                <h4 className="font-bold text-lg font-serif-luxury text-stone-900">Medical Guild &amp; Corporate Boxes</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Curated snack crates for hospital departmental meetings, university conferences, and VIP celebrations.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Live Bikeman Tracker */}
        {activeTab === 'tracker' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="mb-4">
              <button
                onClick={() => setActiveTab('menu')}
                className="text-xs font-semibold text-amber-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Return to Full Menu
              </button>
            </div>
            <LiveTracker
              orders={orders}
              activeOrder={confirmedOrder || orders[0]}
              onClose={() => setActiveTab('menu')}
            />
          </div>
        )}
      </main>

      {/* Floating Bottom Quick Action Bar for Mobile / Instant Order */}
      {cartItems.length > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 animate-bounce-subtle">
          <div
            onClick={() => setIsCartOpen(true)}
            className="bg-stone-950 text-white p-3.5 rounded-2xl shadow-2xl border border-amber-600/50 flex items-center justify-between cursor-pointer hover:bg-stone-900 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-700 flex items-center justify-center font-bold text-sm">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </div>
              <div>
                <div className="text-xs font-bold text-amber-200 font-serif-luxury">View Basket &amp; Schedule</div>
                <div className="text-[11px] text-stone-400">
                  {formatNaira(cartTotalAmount)} &bull; {urgency === 'urgent' ? '⚡ Rush Dispatch' : '🕒 Scheduled'}
                </div>
              </div>
            </div>

            <button className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs px-3.5 py-2 rounded-xl">
              Checkout →
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 py-10 mt-16 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h4 className="text-lg font-bold font-serif-luxury text-amber-200">Joie Cakes &amp; More</h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Ondo State’s premier confectionery, kilogram-measured beef kilishi, fresh probiotic yoghurts, 
              parfaits, and event catering conglomerate.
            </p>
            <div className="text-[11px] text-amber-400 font-mono-code flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Founded by Dr. Joie (MD)</span>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2 uppercase tracking-wider text-[11px]">Specialties</h5>
            <ul className="space-y-1.5 text-stone-400">
              <li>• Authentic Beef Kilishi (0.25kg - 5kg)</li>
              <li>• Velvet Vanilla &amp; Custom Cakes</li>
              <li>• Strained Greek Yoghurt &amp; Fruit Parfaits</li>
              <li>• Golden Meat Pies &amp; Puff-Puff Platters</li>
              <li>• Event Management &amp; Dessert Bars</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2 uppercase tracking-wider text-[11px]">Ondo Dispatch Hub</h5>
            <ul className="space-y-1.5 text-stone-400">
              <li>📍 Ondo Town Central &amp; Lipakala</li>
              <li>📍 UNIMED Campus &amp; Teaching Hospital</li>
              <li>📍 Adeyemi College of Education Axis</li>
              <li>📍 Bagbe / Funbi-Fagun / Lisaluwa</li>
              <li>📍 Akure Express Cargo Courier</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2 uppercase tracking-wider text-[11px]">Direct Line &amp; Support</h5>
            <p className="text-stone-400 mb-2">
              Orders are logged directly into our kitchen queue even during doctor hospital hours.
            </p>
            <div className="space-y-1 font-mono-code text-stone-300">
              <div>📞 Dispatch &amp; Call: {BUSINESS_INFO.phone}</div>
              <div>💬 WhatsApp: {BUSINESS_INFO.phone}</div>
              <div>📸 Instagram: <a href="https://instagram.com/joiescakes" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:underline">{BUSINESS_INFO.instagram}</a></div>
            </div>
            <div className="mt-3">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-[11px] text-amber-300 underline hover:text-amber-200 cursor-pointer"
              >
                Doctor's Shift &amp; Capacity Control Portal
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 mt-8 border-t border-stone-800 text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <div>© {new Date().getFullYear()} Joie Cakes &amp; More Enterprise. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span>Powered by Paystack &amp; Trusted Ondo Bikemen Fleet</span>
          </div>
        </div>
      </footer>

      {/* Slide-out & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        selectedLocationId={selectedLocationId}
        selectedSlotId={selectedSlotId}
        urgency={urgency}
        selectedDate={selectedDate}
        deliveryAddress={deliveryAddress}
        slotCapacities={slotCapacities}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        totalAmount={cartTotalAmount}
        urgency={urgency}
        selectedDate={selectedDate}
        selectedSlotId={selectedSlotId}
        selectedLocationId={selectedLocationId}
        deliveryAddress={deliveryAddress}
        customerNotes={customerNotes}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onOpenTracker={() => {
          setConfirmedOrder(null);
          setActiveTab('tracker');
        }}
      />

      <DrJoieConcierge
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        doctorShift={doctorShift}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        doctorShift={doctorShift}
        setDoctorShift={setDoctorShift}
        slotCapacities={slotCapacities}
        setSlotCapacities={setSlotCapacities}
        orders={orders}
        products={products}
        onToggleProductStock={handleToggleProductStock}
        onUpdateOrderStatus={(ref, status) => {
          setOrders((prev) =>
            prev.map((o) => (o.orderRef === ref ? { ...o, status } : o))
          );
        }}
        onReassignRider={(ref, rider) => {
          setOrders((prev) =>
            prev.map((o) => (o.orderRef === ref ? { ...o, assignedRider: rider } : o))
          );
        }}
      />

      <EventsModal
        isOpen={isEventsOpen}
        onClose={() => setIsEventsOpen(false)}
      />

    </div>
  );
}
