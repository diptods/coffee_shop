/* script.js
   Handles:
   - rendering menu
   - cart logic
   - placing orders (saved to localStorage)
   - admin functions (view orders, menu CRUD)
*/

const SAMPLE_MENU_KEY = 'cs_menu_v1';
const ORDERS_KEY = 'cs_orders_v1';
const CONTACT_KEY = 'cs_quick_contact_v1';

/* ---------- Sample data (loaded on first run) ---------- */
const sampleMenu = [
 
  // --- Coffee Drinks ---
  { id: 'm1', name: 'Espresso', category: 'coffee', price: 2.50,  img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEVzcHJlc3NvfGVufDB8fDB8fHww', desc: 'Intense single shot.' },
  { id: 'm2', name: 'Cappuccino', category: 'coffee', price: 3.50, img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FwcHVjY2lub3xlbnwwfHwwfHx8MA%3D%3D', desc: 'Silky milk, bold espresso.' },
  { id: 'm3', name: 'Latte', category: 'coffee', price: 3.80, img: 'https://images.unsplash.com/photo-1593443320739-77f74939d0da?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGF0dGV8ZW58MHx8MHx8fDA%3D', desc: 'Creamy & smooth.' },
  { id: 'c1', name: 'Ristretto', category: 'coffee', price: 3.50,  img: 'https://images.unsplash.com/photo-1680079527283-0ff93b782407?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8UmlzdHJldHRvfGVufDB8fDB8fHww', desc: 'A shorter, more concentrated espresso shot.' },
  { id: 'c2', name: 'Lungo', category: 'coffee', price: 3.50, img: 'https://images.pexels.com/photos/34519665/pexels-photo-34519665.jpeg', desc: 'An espresso shot pulled with more water.' },
  { id: 'c3', name: 'Americano', category: 'coffee', price: 4.00, img: 'https://images.unsplash.com/photo-1580661869408-55ab23f2ca6e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QW1lcmljYW5vfGVufDB8fDB8fHww', desc: 'Espresso diluted with hot water.' },
  { id: 'c4', name: 'Brewed/Drip Coffee', category: 'coffee', price: 3.50, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMVExKDTlAuPYki-qNLhohVl-sSAPqOUtqmQ&s', desc: 'Standard filter coffee.' },
  { id: 'c5', name: 'Pour-Over', category: 'coffee', price: 5.00, img: 'https://plus.unsplash.com/premium_photo-1673545518947-ddf3240090b1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29mZmVlfGVufDB8fDB8fHww', desc: 'Manual brewing method for nuanced flavor.' },
  { id: 'c6', name: 'French Press', category: 'coffee', price: 4.00,img: 'https://i.pinimg.com/736x/ec/fa/f3/ecfaf312c8f1bb6e604e3fa884cc635c.jpg', desc: 'Steeped and pressed coffee.' },
  { id: 'c7', name: 'Cold Brew', category: 'coffee', price: 5.50, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH-ZIobq8RxBro_CYrwSP90Ym7NGwcOOmHTg&s', desc: 'Smooth, low-acid concentrate steeped cold.' },
  { id: 'c8', name: 'Nitro Cold Brew', category: 'coffee', price: 6.00, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZmRObdv6qJbsDLFYYhv5nv2Rr_cb7gfCy699-PiVMkQ&s', desc: 'Cold brew infused with nitrogen for creaminess.' },
  { id: 'c9', name: 'Flat White', category: 'coffee', price: 5.00, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb5bqC7IA8JdjL19Ko8baj61wNE8Qlab3GWw&s', desc: 'Espresso with microfoamed milk.' },
  { id: 'c10', name: 'Macchiato', category: 'coffee', price: 4.00, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVYAb9l2oOQ4iRwqARLLwHoTuyZgY9RKT0Q&s', desc: 'Espresso "stained" with a dash of milk foam.' },
  { id: 'c11', name: 'Latte Macchiato', category: 'coffee', price: 5.00, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYCMxTrHKS0Tw2sD-pQ1O-ESVRgu9k4Zk2Jw&s', desc: 'Layered drink of milk with espresso poured through foam.' },
  { id: 'c12', name: 'Cortado', category: 'coffee', price: 4.50, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcuYxereeom4thIxZ9xctKt59DESRSW-QYjhbpQubdcA&s', desc: 'Balanced espresso and warm milk.' },
  { id: 'c13', name: 'Mocha', category: 'coffee', price: 5.50, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7HN8AiGNBnRRMXEzB8ONaK4QJoAW0zhJ49A&s', desc: 'A latte with chocolate syrup.' },
  { id: 'c14', name: 'Affogato', category: 'coffee', price: 5.50, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrWB9c4g9dHAdtaTRirrnHIw3Jfg4TZTP_aw&s', desc: 'Vanilla ice cream "drowned" in espresso.' },
  { id: 'c15', name: 'Vienna Coffee', category: 'coffee', price: 5.00, img:'https://i.pinimg.com/736x/e8/13/97/e8139760110ff4a612aa2151244adb85.jpg', desc: 'Coffee topped with whipped cream.' },
  { id: 'c16', name: 'Red Eye', category: 'coffee', price: 4.50, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa1JbkJ_J9hEInRy3O9NXoP_9P1mpsVBmppw&s', desc: 'Drip coffee with one added shot of espresso.' },
  { id: 'c17', name: 'Irish Coffee', category: 'coffee', price: 10.00, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedY5RZrU6geFcU99s8rClutIIvJicXC9r_A&s', desc: 'Hot coffee, Irish whiskey, sugar, and cream.' },
  { id: 'c18', name: 'Vietnamese Iced Coffee', category: 'coffee', price: 5.00, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrgCbwbHgazvfi70Z78JWss3fG9dLSvNF5pg&s', desc: 'Strong coffee with sweetened condensed milk.' },
  { id: 'c19', name: 'Turkish Coffee', category: 'coffee', price: 5.00, img:'https://i.pinimg.com/1200x/d2/26/ed/d226edf935b505def1a5d0dbb0caf367.jpg', desc: 'Finely ground coffee boiled in a cezve.' },
  { id: 'c20', name: 'Cuban Coffee (Cafecito)', category: 'coffee', price: 3.50, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFltsIa_079mit5bR3mxFvVBva2_7uj80qEg&s', desc: 'Strong, sweet espresso shot made with sugar.' },

  // --- Teas ---
  { id: 't1', name: 'Milk Tea', category: 'tea', price: 3.50, img:'https://worldlytreat.com/wp-content/uploads/2024/04/Tiger-milk-tea-3.jpg', desc: 'A robust, full-bodied black tea blend.' },
  { id: 't2', name: 'Earl Grey', category: 'tea', price: 3.50, img:'https://weeteacompany.com/wp-content/uploads/2024/11/Vanilla-Earl-Grey-Tea.webp', desc: 'Black tea flavored with bergamot citrus oil.' },
  { id: 't3', name: 'Green Tea (Sencha)', category: 'tea', price: 3.50, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQECbEiDPGhkPnSVaixt-hmAwGCTtDiwUdzA&s', desc: 'Light, fresh green tea.' },
  { id: 't4', name: 'Matcha Latte', category: 'tea', price: 6.00, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdFSJWjWB9GHnrSo5hs750HUUvi7VEPv0aJA&s', desc: 'Powdered green tea served with steamed milk.' },
  { id: 't5', name: 'Chai Latte', category: 'tea', price: 5.00, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQfjqxuf-B1B5Y23WzJs7rKlsUbmrAykjDxg&s', desc: 'Spiced black tea concentrate with milk.' },
  { id: 't6', name: 'Chamomile', category: 'tea', price: 3.50, img:'https://images-prod.healthline.com/hlcmsresource/images/chamomile-tea.jpg', desc: 'A caffeine-free herbal infusion.' },
  { id: 't7', name: 'Peppermint', category: 'tea', price: 3.50, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9RoRyvxR84x_sxLbg1f_JzZNTypZFs94r5A&s', desc: 'A refreshing, caffeine-free herbal tea.' },
  { id: 't8', name: 'White Tea', category: 'tea', price: 4.50, img:'https://cdn.shopify.com/s/files/1/0022/1393/7252/articles/20221107133813-white-tea-recipe-blog.jpg?v=1667828741', desc: 'Minimally processed, delicate tea.' },
  { id: 't9', name: 'Oolong Tea', category: 'tea', price: 5.00, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4g6UjsqOVbARro4ZPXCcT1mhI97xAvJkiyQ&s', desc: 'Partially oxidized tea.' },
  { id: 't10', name: 'Rooibos', category: 'tea', price: 4.00, img:'https://weaverscoffee.com/cdn/shop/articles/Healthy_rooibus_tea_traditional_south_africa_antioxidant_beverage_with_spices_on_vintage_wooden_table_in_rustic_style_1000x.jpg?v=1710793880', desc: 'Caffeine-free South African herbal tea.' },

  // --- Snacks/Pastries ---
  { id: 'm4', name: 'Almond Croissant', category: 'pastry', price: 2.90, img:'https://www.shugarysweets.com/wp-content/uploads/2017/06/almond-croissants-recipe.jpg', desc: 'Buttery & flaky.' },
  { id: 'm5', name: 'Blueberry Muffin', category: 'pastry', price: 2.40, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUzt_RD7uxGPxeR2sQVYnTKtQALj-IIMP5eA&s', desc: 'Bursting with berries.' },
  { id: 's1', name: 'Croissant (Plain)', category: 'pastry', price: 3.00, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXgDC380Waz22ZtnGuVlR3vCTemXmcjw_UdA&s', desc: 'Classic flaky, buttery French pastry.' },
  { id: 's2', name: 'Chocolate Croissant', category: 'pastry', price: 3.50, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFpWiZ6_ksnndi8k9qpCWjOE2A4_1nndP2Q&s', desc: 'A croissant filled with chocolate.' },
  { id: 's3', name: 'Scone', category: 'pastry', price: 3.00, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI6G_gQh1aScXulzndJploCKAH_NmUHi1pHA&s', desc: 'A light, slightly sweet baked good.' },
  { id: 's4', name: 'Bagel (w/ cream cheese)', category: 'pastry', price: 4.00, img:'https://www.mybakingaddiction.com/wp-content/uploads/2024/06/veggie-cream-cheese-on-bagel-hero.jpg', desc: 'Toasted bagel with cream cheese.' },
  { id: 's5', name: 'Cookie (Large)', category: 'pastry', price: 3.00, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScT7Asj61ieguUUe00RDi-SHamW4EzTceFtg&s', desc: 'Classic chocolate chip cookie.' },
  { id: 's6', name: 'Brownie', category: 'pastry', price: 4.00, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdBW4W-3x_osH5jYgOQR69xyqjhHjE2xH1Ag&s', desc: 'A rich, flat, baked chocolate dessert.' },
  { id: 's7', name: 'Banana Bread (Slice)', category: 'pastry', price: 3.50, img:'https://www.allrecipes.com/thmb/fAkQn-FhjF89oTJ5JXpgwvwNf34=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20144-banana-banana-bread-VAT-009-4x3-B-78f1cfc64bfa451e8a0fead814719b9f.jpg', desc: 'A moist, sweet quick bread.' },
  { id: 's8', name: 'Danish Pastry', category: 'pastry', price: 4.00, img:'https://olivesnthyme.com/wp-content/uploads/2024/06/Strawberry-Danish-12.jpg', desc: 'Flaky pastry with sweet filling.' },
  { id: 's9', name: 'Energy/Granola Bar', category: 'pastry', price: 3.50, img:'https://californiagrown.org/wp-content/uploads/2023/07/IMG_4494.jpg', desc: 'A healthy, dense snack bar.' },
  { id: 's10', name: 'Pound Cake (Slice)', category: 'pastry', price: 3.50, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReu6mWv2heFnrsXrSVqlApVeSsg145cm6G0w&s', desc: 'A rich, dense slice of cake.' },
  /*{ id: 's11', name: 'Macarons (Single)', category: 'pastry', price: 3.00, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfalWvtpaywyhhWGkBdYEJ6aFq8Ou4U_qvnA&s', desc: 'Sweet meringue-based confectionery.' },
*/

];

/* ---------- Utilities ---------- */
function uid(prefix='id'){ return prefix + '_' + Math.random().toString(36).slice(2,9); }
function money(n){ return Number(n).toFixed(2); }

/* ---------- Local storage helpers ---------- */
function loadMenu(){
  const raw = localStorage.getItem(SAMPLE_MENU_KEY);
  if(raw) return JSON.parse(raw);
  localStorage.setItem(SAMPLE_MENU_KEY, JSON.stringify(sampleMenu));
  return sampleMenu;
}
function saveMenu(menu){ localStorage.setItem(SAMPLE_MENU_KEY, JSON.stringify(menu)); }

function loadOrders(){ return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'); }
function saveOrders(orders){ localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); }

function loadContact(){ return JSON.parse(localStorage.getItem(CONTACT_KEY) || 'null'); }
function saveContact(obj){ localStorage.setItem(CONTACT_KEY, JSON.stringify(obj)); }

/* ---------- Customer site logic ---------- */
let MENU = loadMenu();
let CART = JSON.parse(localStorage.getItem('cs_cart') || '[]');

function renderMenu(filter='all'){
  const list = document.getElementById('menu-list');
  list.innerHTML = '';
  const items = MENU.filter(i => filter==='all' ? true : i.category === filter);
  if(!items.length){ list.innerHTML = '<div class="col-12"><p class="text-muted">No items found.</p></div>'; return; }
  items.forEach(item => {
    const col = document.createElement('div'); col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card menu-card h-100 content-container">
        <img src="${item.img}" class="card-img-top img-fluid" style="width:auto !important; object-fit: cover;  max-height: 300px !important; ; overflow: hidden;" alt="${item.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text text-muted small mb-2">${item.desc||''}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <div class="fw-bold">$${money(item.price)}</div>
            <div>
              <button class="btn btn-sm btn-outline-secondary me-2" onclick="addToCart('${item.id}')">Add</button>
              <button class="btn btn-sm btn-primary" onclick="openQuickAdd('${item.id}')">Quick</button>
            </div>
          </div>
        </div>
      </div>
      `;
    list.appendChild(col);
  });
}

/* cart functions */
function persistCart(){ localStorage.setItem('cs_cart', JSON.stringify(CART)); renderCart(); }
function addToCart(id, qty=1){
  const item = MENU.find(m=>m.id===id); if(!item) return;
  const ex = CART.find(c => c.id === id);
  if(ex) ex.qty += qty; else CART.push({ id: item.id, name: item.name, price: item.price, qty });
  persistCart();
}
function removeFromCart(id){
  CART = CART.filter(c=>c.id !== id); persistCart();
}
function changeQty(id, delta){
  const it = CART.find(c=>c.id===id); if(!it) return;
  it.qty = Math.max(1, it.qty + delta); persistCart();
}
function clearCart(){ CART = []; persistCart(); }

/* render cart */
function renderCart(){
  const el = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const modalTotal = document.getElementById('modal-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  if(!CART.length){ el.innerHTML = '<p class="text-muted">Your cart is empty. Add items from the menu.</p>'; totalEl.textContent = '0.00'; modalTotal.textContent='0.00'; checkoutBtn.disabled = true; return; }

  el.innerHTML = '';
  let total = 0;
  CART.forEach(ci => {
    const item = MENU.find(m=>m.id===ci.id);
    const row = document.createElement('div'); row.className = 'd-flex align-items-center justify-content-between mb-2';
    row.innerHTML = `
      <div>
        <div class="fw-semibold">${ci.name}</div>
        <div class="small text-muted">$${money(ci.price)} × ${ci.qty}</div>
      </div>
      <div class="d-flex align-items-center gap-1">
        <button class="btn btn-sm btn-outline-secondary" onclick="changeQty('${ci.id}', -1)">−</button>
        <span class="small">${ci.qty}</span>
        <button class="btn btn-sm btn-outline-secondary" onclick="changeQty('${ci.id}', 1)">+</button>
        <button class="btn btn-sm btn-link text-danger" onclick="removeFromCart('${ci.id}')"><i class="bi bi-trash"></i></button>
      </div>
    `;
    el.appendChild(row);
    total += ci.qty * ci.price;
  });

  totalEl.textContent = money(total);
  modalTotal.textContent = money(total);
  checkoutBtn.disabled = false;
}

/* Quick add + modal prefill */
function openQuickAdd(id){
  addToCart(id); // add a single item
  window.scrollTo({top: document.getElementById('order').offsetTop, behavior:'smooth'});
}

/* Checkout modal submit (place order) */
document.addEventListener('DOMContentLoaded', function(){
  // render initial menu & cart
  renderMenu('all');
  renderCart();

  // filters
  document.getElementById('filter-all').addEventListener('click', ()=>renderMenu('all'));
  document.getElementById('filter-coffee').addEventListener('click', ()=>renderMenu('coffee'));
  document.getElementById('filter-tea').addEventListener('click', ()=>renderMenu('tea'));
  document.getElementById('filter-pastry').addEventListener('click', ()=>renderMenu('pastry'));


  

  

  // checkout submit
  document.getElementById('checkout-form').addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('order-name').value.trim();
    const contact = document.getElementById('order-contact').value.trim();
    const note = document.getElementById('order-note').value.trim();
    if(!name || !contact || !CART.length){ alert('Provide name, contact, and at least one item.'); return; }

    const order = {
      id: uid('order'),
      name, contact, note,
      items: CART.map(c => ({...c})),
      total: Number(CART.reduce((s,i) => s + i.qty*i.price, 0).toFixed(2)),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const orders = loadOrders();
    orders.unshift(order);
    saveOrders(orders);

    clearCart();
    const bsModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    bsModal && bsModal.hide();
    alert('Order placed! (demo saved locally).');
  });

  // initialize quick contact inputs if saved
  const qc = loadContact();
  if(qc){
    document.getElementById('qc-name').value = qc.name || '';
    document.getElementById('qc-phone').value = qc.contact || '';
    document.getElementById('qc-note').value = qc.note || '';
  }
});

/* ---------- Admin functions (exposed to admin.html) ---------- */
function adminInit(){
  renderAdminOrders();
  renderAdminMenu();
  document.getElementById('refresh-orders').addEventListener('click', renderAdminOrders);
  document.getElementById('add-item-btn').addEventListener('click', ()=>openItemModal());
  document.getElementById('logout').addEventListener('click', ()=>{ 
    localStorage.removeItem('cs_current_user_v1');
    alert('Logged out successfully.');
    location.href='index.html';
  });

  // item modal form
  const itemModalEl = document.getElementById('itemModal');
  const itemModal = new bootstrap.Modal(itemModalEl);
  document.getElementById('item-form').addEventListener('submit', function(e){
    e.preventDefault();
    const id = document.getElementById('item-id').value;
    const name = document.getElementById('item-name').value.trim();
    const category = document.getElementById('item-category').value;
    const price = parseFloat(document.getElementById('item-price').value) || 0;
    const img = document.getElementById('item-img').value.trim();
    const desc = document.getElementById('item-desc').value.trim();

    let menu = loadMenu();
    if(id){
      // update
      menu = menu.map(m => m.id === id ? {...m, name, category, price, img, desc} : m);
    } else {
      // add
      menu.unshift({ id: uid('m'), name, category, price, img, desc });
    }
    saveMenu(menu); MENU = menu;
    renderAdminMenu();
    renderMenu(); // update on main page if open
    itemModal.hide();
  });

  // when modal hides, clear inputs
  itemModalEl.addEventListener('hidden.bs.modal', ()=> {
    document.getElementById('item-form').reset();
    document.getElementById('item-id').value = '';
    document.getElementById('item-modal-title').textContent = 'Add Item';
  });
}

function renderAdminOrders(){
  const cont = document.getElementById('orders-list');
  const orders = loadOrders();
  cont.innerHTML = '';
  document.getElementById('orders-count').textContent = orders.length;
  const revenue = orders.reduce((s,o)=> s + Number(o.total||0), 0);
  document.getElementById('total-revenue').textContent = money(revenue);

  if(!orders.length){ cont.innerHTML = '<p class="text-muted">No orders yet.</p>'; return; }
  orders.forEach(o => {
    const div = document.createElement('div'); div.className = 'order-card';
    div.innerHTML = `
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <div class="fw-bold">Customer name: ${o.name} <br> Contact: <small class="text-muted">(${o.contact})</small></div>
          <div class="small text-muted">${new Date(o.createdAt).toLocaleString()}</div>
          <div class="mt-2 small">${o.items.map(it=> `${it.name} ×${it.qty}`).join(' · ')}</div>
        </div>
        <div class="text-end ms-3">
          <div class="mb-2">$${money(o.total)}</div>
          <div class="mb-2">
            <span class="badge badge-status ${o.status==='pending'?'bg-secondary text-white':o.status==='preparing'?'bg-warning text-dark':'bg-success text-white'}">${o.status}</span>
          </div>
          <div class="d-flex gap-1">
            <button class="btn btn-sm btn-outline-primary" onclick="changeOrderStatus('${o.id}', 'preparing')">Preparing</button>
            <button class="btn btn-sm btn-success" onclick="changeOrderStatus('${o.id}', 'ready')">Ready</button>
            <button class="btn btn-sm btn-danger" onclick="deleteOrder('${o.id}')">Delete</button>
          </div>
        </div>
      </div><hr>
    `;
    cont.appendChild(div);
  });
}

function changeOrderStatus(id, status){
  let orders = loadOrders();
  orders = orders.map(o => o.id === id ? {...o, status } : o);
  saveOrders(orders);
  renderAdminOrders();
}

function deleteOrder(id){
  if(!confirm('Delete this order?')) return;
  let orders = loadOrders();
  orders = orders.filter(o => o.id !== id);
  saveOrders(orders);
  renderAdminOrders();
}

/* Admin menu management */
function renderAdminMenu(){
  const cont = document.getElementById('menu-admin-list');
  const menu = loadMenu();
  cont.innerHTML = '';
  if(!menu.length){ cont.innerHTML = '<p class="text-muted">No menu items found.</p>'; return; }

  menu.forEach(m => {
    const el = document.createElement('div'); el.className = 'd-flex align-items-center justify-content-between mb-3';
    el.innerHTML = `
      <div>
        <div class="fw-semibold">${m.name} <small class="text-muted">(${m.category})</small></div>
        <div class="small text-muted">$${money(m.price)} · ${m.desc||''}</div>
      </div>
      <div class="d-flex gap-1">
        <button class="btn btn-sm btn-outline-secondary" onclick="openItemModal('${m.id}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteMenuItem('${m.id}')">Delete</button>
      </div>
    `;
    cont.appendChild(el);
  });
}

function openItemModal(id){
  const itemModalEl = document.getElementById('itemModal');
  const itemModal = new bootstrap.Modal(itemModalEl);
  if(id){
    const menu = loadMenu();
    const item = menu.find(x=>x.id===id);
    if(item){
      document.getElementById('item-id').value = item.id;
      document.getElementById('item-name').value = item.name;
      document.getElementById('item-category').value = item.category;
      document.getElementById('item-price').value = item.price;
      document.getElementById('item-img').value = item.img || '';
      document.getElementById('item-desc').value = item.desc || '';
      document.getElementById('item-modal-title').textContent = 'Edit Item';
    }
  } else {
    document.getElementById('item-form').reset();
    document.getElementById('item-modal-title').textContent = 'Add Item';
  }
  itemModal.show();
}

function deleteMenuItem(id){
  if(!confirm('Delete menu item?')) return;
  let menu = loadMenu();
  menu = menu.filter(m => m.id !== id);
  saveMenu(menu); MENU = menu;
  renderAdminMenu(); renderMenu();
}

/* expose small functions to global so admin.html can call them */
window.adminInit = adminInit;
window.renderAdminOrders = renderAdminOrders;
window.renderAdminMenu = renderAdminMenu;
window.changeOrderStatus = changeOrderStatus;
window.deleteOrder = deleteOrder;
window.openItemModal = openItemModal;
window.deleteMenuItem = deleteMenuItem;

/* ---------- ensure menu rendered if page loaded standalone ---------- */
if(document.getElementById('menu-list')){ renderMenu(); renderCart(); }

