// Menu data for Joie Cakes & More (Ondo State, Nigeria)
// Verified details from Dr. Joie's official brand (@joiescakes)
export const BUSINESS_INFO = {
  name: 'Joie Cakes & More',
  owner: 'Dr. Joie (MD)',
  phone: '09064839054',
  internationalPhone: '+2349064839054',
  rawWhatsAppPhone: '2349064839054',
  instagram: '@joiescakes',
  location: 'Ondo State, Nigeria',
  tagline: 'Northern Delicacies • Confectionery & Gourmet Treats'
};

export const INITIAL_PRODUCTS = [
  // --- NORTHERN DELICACIES: KILISHI (MEASURED IN KILOGRAMS) ---
  {
    id: 'kilishi-tier-select',
    name: 'Northern Delicacies: Authentic Beef Kilishi (By Kilogram)',
    category: 'kilishi',
    isKilishi: true,
    tagline: 'Signature Northern Nigerian beef jerky in branded airtight stand-up zipper pouch',
    basePrice: 13000, // per 1kg
    rating: 4.99,
    reviewsCount: 428,
    badge: 'Official Packaged • By Kg',
    image: '/joie-kilishi-real.jpg', // Authentic photo from Dr. Joie's Instagram!
    description: 'Thinly sliced prime lean beef, seasoned with authentic Northern Yaji, cloves, and groundnut paste. Flame-grilled over charcoal embers and packaged in our signature Northern Delicacies window pouch. We deliver nationwide and same-day in Ondo!',
    isAvailable: true,
    stockStatus: 'available', // 'available' | 'sold_out' | 'low_stock'
    kgOptions: [
      { weight: '0.25 kg', label: 'Quarter Kg (Pouch)', price: 3500, popular: false, desc: 'Personal crunch pouch with clear window' },
      { weight: '0.5 kg', label: 'Half Kg (Family Savor)', price: 6800, popular: true, desc: 'Most ordered! Generous pack for sharing with family' },
      { weight: '1.0 kg', label: 'Full 1.0 Kg (Connoisseur Box)', price: 13000, popular: false, desc: 'Luxury sealed hamper box with premium whole sheets' },
      { weight: '2.0 kg', label: '2.0 Kg (Jumbo Feast Pack)', price: 25000, popular: false, desc: 'Wholesale & celebration value pack in airtight gift tub' },
      { weight: '5.0 kg', label: '5.0 Kg (Bulk Wholesale)', price: 60000, popular: false, desc: 'Bulk event & distribution bundle' }
    ],
    spiceLevels: ['Traditional Mild Yaji', 'Suya Fire (Extra Hot)', 'Honey Glazed Pepper (Chef Special)'],
    cutStyles: ['Thin Wafer Crisp', 'Tender Ribbons', 'Mixed Whole Sheets']
  },

  // --- NORTHERN DELICACIES: DONKWA ---
  {
    id: 'donkwa-pouch',
    name: 'Northern Delicacies: Traditional Donkwa Snack Balls',
    category: 'kilishi',
    tagline: 'Spiced roasted ground corn and peanut snack balls made with authentic love',
    basePrice: 2500,
    rating: 4.96,
    reviewsCount: 182,
    badge: 'Northern Heritage',
    image: '/joie-donkwa-yaji-real.jpg', // Authentic photo showing Donkwa pouch
    description: 'Freshly roasted sweet ground corn, finely crushed groundnuts, ginger, chili, and cane sugar molded into bite-sized balls. Wholesome, rich in protein, and naturally gluten-free in our sealed Northern Delicacies pouch.',
    isAvailable: true,
    stockStatus: 'available',
    sizes: [
      { size: 'Medium Snack Pouch (15 Balls)', price: 2500 },
      { size: 'Large Sharing Pouch (35 Balls)', price: 5000 },
      { size: 'Mega Party Jar (80 Balls)', price: 11000 }
    ]
  },

  // --- NORTHERN DELICACIES: YAJI SPICE BLEND ---
  {
    id: 'yaji-suya-pepper',
    name: 'Northern Delicacies: Artisan Yaji Suya Pepper Blend',
    category: 'kilishi',
    tagline: 'Dr. Joie’s secret recipe Northern Suya pepper spice blend in resealable pouch',
    basePrice: 1800,
    rating: 4.98,
    reviewsCount: 215,
    badge: 'Chef Secret Spice',
    image: '/joie-donkwa-yaji-real.jpg', // Authentic photo showing Yaji pouch
    description: 'Authentic stone-ground defatted groundnut cake (kuli-kuli), roasted chili peppers, calabash nutmeg, cloves, ginger, and sea salt. Elevates barbecue, noodles, eggs, and roasted meats.',
    isAvailable: true,
    stockStatus: 'available',
    sizes: [
      { size: '150g Pouch (Pantry Shaker)', price: 1800 },
      { size: '300g Pouch (Family Size)', price: 3400 },
      { size: '500g Tub (Chef Reserve)', price: 5500 }
    ]
  },
  
  // --- CAKES ---
  {
    id: 'cake-vanilla-delight',
    name: 'Classic Velvet Vanilla Dream Cake',
    category: 'cakes',
    tagline: 'Infused with pure Madagascar bourbon vanilla beans and whipped silk buttercream',
    basePrice: 12000,
    rating: 4.95,
    reviewsCount: 184,
    badge: "Dr. Joie's Signature",
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    description: 'Our award-winning moist sponge cake infused with natural Madagascar vanilla, layered with airy Swiss meringue buttercream. Customized with your personalized inscription.',
    isAvailable: true,
    stockStatus: 'available',
    sizes: [
      { size: '6 inch (Mini Celebration)', serves: '4-6 guests', price: 12000 },
      { size: '8 inch (Standard Party)', serves: '10-14 guests', price: 18500 },
      { size: '10 inch (Grand Family)', serves: '18-24 guests', price: 26000 },
      { size: '2-Tier Luxury Royal (6" + 8")', serves: '25-35 guests', price: 42000 }
    ],
    frostings: ['Whipped Buttercream (Light & Airy)', 'Satin Fondant (Smooth Artistry)', 'Naked Rustic Drizzle']
  },
  {
    id: 'cake-red-velvet',
    name: 'Ruby Red Velvet & Cream Cheese Cake',
    category: 'cakes',
    tagline: 'Deep crimson cocoa sponge layered with tangy Philadelphia cream cheese frosting',
    basePrice: 14500,
    rating: 4.97,
    reviewsCount: 149,
    badge: 'Fan Favorite',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=800&q=80',
    description: 'Velvety, soft crumb with subtle cocoa undertones and generous swirls of real cream cheese frosting. Decorated with ruby cake crumbles and gold leaf flakes.',
    isAvailable: true,
    stockStatus: 'available',
    sizes: [
      { size: '6 inch (Mini Celebration)', serves: '4-6 guests', price: 14500 },
      { size: '8 inch (Standard Party)', serves: '10-14 guests', price: 21000 },
      { size: '10 inch (Grand Family)', serves: '18-24 guests', price: 29500 }
    ],
    frostings: ['Cream Cheese Frosting', 'White Chocolate Ganache']
  },
  {
    id: 'cake-belgian-chocolate',
    name: 'Double Belgian Fudge Chocolate Cake',
    category: 'cakes',
    tagline: 'Rich 70% dark Belgian cocoa ganache with moist espresso-infused layers',
    basePrice: 15000,
    rating: 4.92,
    reviewsCount: 121,
    badge: 'Chocoholic Must',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
    description: 'Decadent chocolate fudge cake glazed in silky mirror chocolate, garnished with Ferrero Rocher pralines and dark chocolate shards.',
    isAvailable: true,
    stockStatus: 'available',
    sizes: [
      { size: '6 inch (Mini Celebration)', serves: '4-6 guests', price: 15000 },
      { size: '8 inch (Standard Party)', serves: '10-14 guests', price: 22500 },
      { size: '10 inch (Grand Family)', serves: '18-24 guests', price: 31000 }
    ],
    frostings: ['Dark Chocolate Ganache', 'Nutella Swirl Buttercream']
  },

  // --- YOGHURTS & PARFAITS ---
  {
    id: 'yoghurt-greek-creamy',
    name: 'Gourmet Creamy Greek Yoghurt (Flagon)',
    category: 'yoghurts',
    tagline: 'Thick, probiotic-rich strained Greek yoghurt crafted with hospital-grade hygiene',
    basePrice: 3800,
    rating: 4.99,
    reviewsCount: 260,
    badge: 'Doctor Recommended',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    description: 'Strained the old-fashioned Mediterranean way. Velvety, thick spoonable consistency, zero artificial preservatives, packed with healthy probiotics and high protein.',
    isAvailable: true,
    stockStatus: 'available',
    sizes: [
      { size: '1.0 Litre Bottle (Sweetened Vanilla)', price: 3800 },
      { size: '1.0 Litre Bottle (Unsweetened Pure Healthy)', price: 3800 },
      { size: '2.0 Litre Family Jug (Sweetened)', price: 7200 },
      { size: '2.0 Litre Family Jug (Unsweetened)', price: 7200 }
    ]
  },
  {
    id: 'parfait-royal-granola',
    name: 'Royal Fruit & Almond Granola Parfait',
    category: 'yoghurts',
    tagline: 'Layers of thick Greek yoghurt, fresh strawberries, kiwi, honeyed oats & chia',
    basePrice: 2800,
    rating: 4.96,
    reviewsCount: 195,
    badge: 'Energy Boost',
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=800&q=80',
    description: 'Artfully layered parfait cup filled with crunchy honey-roasted almond granola, fresh sliced strawberries, seedless grapes, kiwi, and creamy Greek yoghurt sweetened with raw honey.',
    isAvailable: true,
    stockStatus: 'available',
    sizes: [
      { size: 'Single 500ml Cup', price: 2800 },
      { size: 'Duo 500ml Cups (Pack of 2)', price: 5400 },
      { size: 'Box of 4 Grab-and-Go Cups', price: 10500 },
      { size: 'Mini Party Tray (6 Cups)', price: 15500 }
    ]
  },

  // --- PASTRIES ---
  {
    id: 'pastry-golden-meatpies',
    name: 'Golden Flaky Minced Beef Meat Pies',
    category: 'pastries',
    tagline: 'Buttery melt-in-mouth crust bursting with seasoned lean minced beef & diced carrots',
    basePrice: 1200,
    rating: 4.94,
    reviewsCount: 410,
    badge: 'Ondo Daily Crave',
    image: 'https://images.unsplash.com/photo-1621236378699-8597fee6a1ce?auto=format&fit=crop&w=800&q=80',
    description: 'Never dry, always juicy! Real butter pastry that flakes delicately at first bite, stuffed with slow-cooked seasoned beef mince, potatoes, carrots, and thyme.',
    isAvailable: true,
    stockStatus: 'available',
    sizes: [
      { size: 'Single Pie', price: 1200 },
      { size: 'Snack Box (4 Meat Pies)', price: 4600 },
      { size: 'Office Party Box (10 Meat Pies)', price: 11000 }
    ]
  },
  {
    id: 'pastry-sausage-rolls',
    name: 'Jumbo Golden Herb Sausage Rolls',
    category: 'pastries',
    tagline: 'Puff pastry seasoned with sage, white pepper and juicy sausage filling',
    basePrice: 1000,
    rating: 4.88,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    description: 'Generous rolls brushed with egg wash and baked to an amber golden crisp. Perfect with chilled Joie Greek Yoghurt.',
    isAvailable: true,
    stockStatus: 'available',
    sizes: [
      { size: 'Single Jumbo Roll', price: 1000 },
      { size: 'Pack of 5 Jumbo Rolls', price: 4800 },
      { size: 'Office Sharing Tub (12 Rolls)', price: 11200 }
    ]
  },
  {
    id: 'pastry-puff-platter',
    name: 'Ondo Street Puff-Puff Party Platter',
    category: 'pastries',
    tagline: 'Golden bouncy yeast donuts dusted with cinnamon sugar & spicy pepper dip',
    basePrice: 3500,
    rating: 4.93,
    reviewsCount: 220,
    badge: 'Party Crowd Pleaser',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80',
    description: 'A traditional staple made gourmet. Fluffy, chewy interior with a delicate crisp shell. Served in an insulated party bucket with Dr. Joie’s signature sweet-chili dipping glaze.',
    isAvailable: true,
    stockStatus: 'available',
    sizes: [
      { size: 'Medium Platter (25 pieces)', price: 3500 },
      { size: 'Jumbo Event Bucket (60 pieces)', price: 7800 },
      { size: 'Mega Celebration Crate (120 pieces)', price: 15000 }
    ]
  },

  // --- EVENTS & CONGLOMERATE SERVICES ---
  {
    id: 'event-dessert-table',
    name: 'Full Event Dessert Bar & Sweet Station',
    category: 'events',
    tagline: 'Full luxury styling for weddings, birthdays, inaugurations & medical dinners in Ondo & Akure',
    basePrice: 85000,
    rating: 5.0,
    reviewsCount: 68,
    badge: 'Luxury Event Styling',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: 'Complete experiential catering! Includes customized tiered cakes, dessert shot cups, mini kilishi tapas, gourmet parfait bars, display acrylic stands, gold risers, and professional on-site attendants.',
    isAvailable: true,
    stockStatus: 'available',
    sizes: [
      { size: 'Intimate Gathering (Up to 50 guests)', price: 85000 },
      { size: 'Grand Celebration (Up to 150 guests)', price: 175000 },
      { size: 'Royal Gala / Wedding (300+ guests)', price: 320000 }
    ]
  }
];

// Delivery Locations in Ondo State & Pricing
export const ONDO_LOCATIONS = [
  { id: 'ondo-central', name: 'Ondo Town (Central / Yaba / Lipakala / Oka)', fee: 800, etaMinutes: 25 },
  { id: 'ondo-unimed', name: 'UNIMED Campus & Teaching Hospital (MTH) Zone', fee: 600, etaMinutes: 15 },
  { id: 'ondo-adeyemi', name: 'Adeyemi College of Education (ACE) / Ore Rd Axis', fee: 1000, etaMinutes: 30 },
  { id: 'ondo-bagbe', name: 'Bagbe / Funbi-Fagun / Lisaluwa Estate', fee: 1000, etaMinutes: 35 },
  { id: 'ondo-pickup', name: 'Self-Pickup at Joie Hub (Ondo City Center) - FREE', fee: 0, etaMinutes: 10 },
  { id: 'akure-express', name: 'Akure Express Shuttle (FUTA / Alagbaka / Oba-Ile)', fee: 2500, etaMinutes: 60 }
];

// Trusted Bikemen Fleet (Ondo Dispatch Logistics)
export const TRUSTED_BIKEMEN = [
  {
    id: 'bike-01',
    name: 'Rider Kola (SpeedMaster)',
    phone: '09064839054', // Main dispatch coordinator line
    directRiderPhone: '+234 803 555 0192',
    bikeModel: 'Honda Ace 125 (Insulated Cake Box)',
    plateNumber: 'OND-248-XA',
    zone: 'Ondo Central & Yaba Corridor',
    rating: 4.95,
    completedTrips: 842,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    status: 'Active on Road'
  },
  {
    id: 'bike-02',
    name: 'Rider Tayo (Campus & Hospital Courier)',
    phone: '09064839054',
    directRiderPhone: '+234 814 444 0283',
    bikeModel: 'Box Courier 150 (Thermal Cold Compartment)',
    plateNumber: 'OND-619-KD',
    zone: 'UNIMED, MTH & Adeyemi College',
    rating: 4.89,
    completedTrips: 630,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'Active on Road'
  },
  {
    id: 'bike-03',
    name: 'Rider Emmanuel (Akure Express Cargo)',
    phone: '09064839054',
    directRiderPhone: '+234 902 333 0471',
    bikeModel: 'Heavy-Duty Cargo Carrier 200',
    plateNumber: 'AKR-112-ON',
    zone: 'Akure Highway & Bulk Kilishi Transit',
    rating: 5.0,
    completedTrips: 1140,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    status: 'Standby at Hub'
  }
];

// Time Slots and Capacity Engine
export const DELIVERY_TIME_SLOTS = [
  { id: 'slot-morning', label: 'Morning Slot (9:00 AM - 12:00 PM)', maxCapacity: 6, currentOrders: 3 },
  { id: 'slot-afternoon', label: 'Afternoon Slot (1:00 PM - 4:00 PM)', maxCapacity: 8, currentOrders: 7 }, // almost full
  { id: 'slot-evening', label: 'Evening Slot (5:00 PM - 7:30 PM)', maxCapacity: 6, currentOrders: 2 },
  { id: 'slot-express', label: '⚡ Urgent Flash Dispatch (Next 60-90 Mins)', maxCapacity: 4, currentOrders: 3, isExpress: true }
];

// Pre-seeded FAQs for Dr. Joie's Virtual Concierge
export const CONCIERGE_KNOWLEDGE = [
  {
    keywords: ['doctor', 'busy', 'service', 'hospital', 'shift', 'available', 'call'],
    answer: "Dr. Joie is currently on medical hospital rounds / surgery duty! That is why this smart booking engine handles your order automatically. You don't have to wait for her to reply on WhatsApp to secure your treats or Kilishi. The kitchen queue is updated instantly!"
  },
  {
    keywords: ['sold out', 'finish', 'unavailable', 'ordered finish', 'out of stock'],
    answer: "If an item says 'Ordered Finish / Sold Out', it means today's fresh batch has been completely booked by earlier customers. You can select another delicious treat, choose an upcoming date in our scheduler, or send us a WhatsApp message at 09064839054 for priority reservation on tomorrow's batch!"
  },
  {
    keywords: ['donkwa', 'northern', 'yaji', 'pepper', 'spices'],
    answer: "Yes! Dr. Joie offers the authentic 'Northern Delicacies' collection: Weighed Kilishi (Beef Jerky), hand-rolled Donkwa (sweet & spicy roasted corn/peanut balls), and our secret-recipe Yaji Suya Pepper blend in airtight stand-up zipper pouches!"
  },
  {
    keywords: ['kilishi', 'kg', 'kilogram', 'weight', 'meat', 'beef', 'price'],
    answer: "Our authentic Northern Delicacies Kilishi is measured strictly in Kilograms (kg)! Options: 0.25kg (₦3,500), 0.5kg (₦6,800), 1.0kg (₦13,000), 2.0kg (₦25,000), and 5.0kg wholesale (₦60,000). Packaged in our signature white airtight pouches with clear windows."
  },
  {
    keywords: ['phone', 'contact', 'whatsapp', 'number', 'instagram'],
    answer: "You can reach Joie Cakes & More directly on WhatsApp / Call at 09064839054, or follow our official Instagram @joiescakes!"
  },
  {
    keywords: ['delivery', 'ondo', 'akure', 'unimed', 'adeyemi', 'where', 'location'],
    answer: "We deliver same-day across Ondo State (Ondo Town, UNIMED Teaching Hospital campus, Adeyemi College area, Bagbe) and run express bike shuttles to Akure. We also offer nationwide shipping for our airtight Kilishi and Donkwa pouches!"
  },
  {
    keywords: ['paystack', 'payment', 'transfer', 'card', 'pay'],
    answer: "We accept secure payments powered by Paystack (Debit Card, Bank Transfer, USSD). As soon as payment confirms, your delivery slot is locked in and you get a direct WhatsApp confirmation receipt!"
  }
];
