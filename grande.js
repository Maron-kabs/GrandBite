/* ============================================================
   MENU DATA
   Each item has an `img` filename. Put your Figma-exported photos
   in an  images/  folder next to this file using these names, and
   the real photos replace the emoji tiles automatically.
   Colours (g1/g2) are just the fallback gradient behind the emoji.
   ============================================================ */
const menu = [
  {name:"GrandBite Classic", desc:"Double beef, cheese, secret sauce.", price:45, emoji:"\u{1F354}", img:"cheeseburger.jpg", g1:"#ffcc80",g2:"#ff8a65"},
  {name:"Chicken Shawarma",  desc:"Grilled chicken, garlic, warm wrap.", price:35, emoji:"\u{1F32F}", img:"shawarma.jpg", g1:"#ffe082",g2:"#ffb74d"},
  {name:"Jollof & Chicken",  desc:"Smoky jollof with grilled chicken.", price:50, emoji:"\u{1F357}", img:"jollof.jpg", g1:"#ff8a80",g2:"#ff5252"},
  {name:"Spicy Beef Pizza",  desc:"Loaded, cheesy, a little fiery.", price:80, emoji:"\u{1F355}", img:"pizza.jpg", g1:"#ffab91",g2:"#ff7043"},
  {name:"Loaded Fries",      desc:"Crispy fries, cheese, pepper.", price:30, emoji:"\u{1F35F}", img:"fries.jpg", g1:"#fff59d",g2:"#ffd54f"},
  {name:"Bubble Tea",        desc:"Chewy boba, creamy milk tea.", price:25, emoji:"\u{1F9CB}", img:"boba.jpg", g1:"#ce93d8",g2:"#b39ddb"},
  {name:"Sobolo Cooler",     desc:"Chilled hibiscus, ginger kick.", price:15, emoji:"\u{1F964}", img:"sobolo.jpg", g1:"#ef9a9a",g2:"#e57373"},
  {name:"Choco Milkshake",   desc:"Thick, cold, proper chocolatey.", price:28, emoji:"\u{1F368}", img:"shake.jpg", g1:"#bcaaa4",g2:"#a1887f"},
];

const combos = [
  {name:"Squad Pack", tag:"Feeds 4", p:"4 burgers, 2 fries, 4 drinks", now:180, was:220, g1:"#e63946",g2:"#f4a825"},
  {name:"Lunch Rush", tag:"Under 20 min", p:"1 wrap, fries & a cooler", now:55, was:70, g1:"#f4a825",g2:"#e63946"},
  {name:"Shawarma Duo", tag:"For 2", p:"2 shawarmas + 2 sobolo", now:85, was:100, g1:"#ff7043",g2:"#c62828"},
  {name:"Boba Buddies", tag:"Sweet deal", p:"2 bubble teas + fries", now:60, was:75, g1:"#8e24aa",g2:"#5e35b1"},
  {name:"Family Feast", tag:"Best value", p:"Jollof, pizza, sides & drinks", now:220, was:280, g1:"#2e7d32",g2:"#f4a825"},
  {name:"Solo Special", tag:"Just you", p:"Burger, fries & a shake", now:75, was:90, g1:"#e63946",g2:"#ad1457"},
];

/* render menu */
document.getElementById("menuGrid").innerHTML = menu.map((m,i)=>`
  <div class="item">
    <div class="photo" style="--g1:${m.g1};--g2:${m.g2}">
      <span class="emoji">${m.emoji}</span>
      <img src="images/${m.img}" alt="${m.name}" onerror="this.style.display='none'">
    </div>
    <div class="body">
      <h3>${m.name}</h3>
      <p class="desc">${m.desc}</p>
      <div class="row">
        <span class="price">GH&#8373; ${m.price}</span>
        <button class="add" onclick="addItem('${m.name}',${m.price})">Add</button>
      </div>
    </div>
  </div>`).join("");

/* render combos */
document.getElementById("comboGrid").innerHTML = combos.map(c=>`
  <div class="combo" style="background:linear-gradient(135deg,${c.g1},${c.g2})">
    <span class="tag">${c.tag}</span>
    <h3>${c.name}</h3>
    <p class="p">${c.p}</p>
    <div class="prices"><span class="now">GH&#8373; ${c.now}</span><span class="was">GH&#8373; ${c.was}</span></div>
    <button class="add" onclick="addItem('${c.name} combo',${c.now})">Add combo</button>
  </div>`).join("");

/* cart */
let cart = [];
function addItem(name, price){ cart.push({name,price}); updateCart(); openCart(); }
function updateCart(){
  document.getElementById("count").textContent = cart.length;
  const box = document.getElementById("ditems");
  if(cart.length===0){ box.innerHTML='<p style="color:var(--muted)">Your cart is empty.</p>'; }
  else{
    box.innerHTML = cart.map((it,i)=>`<div class="drow"><span>${it.name}</span>
      <span>GH&#8373; ${it.price} <button onclick="removeItem(${i})" style="border:none;background:none;color:#e63946;cursor:pointer">&times;</button></span></div>`).join("");
  }
  const total = cart.reduce((s,it)=>s+it.price,0);
  document.getElementById("total").textContent = "GH\u20B5 "+total;
}
function removeItem(i){ cart.splice(i,1); updateCart(); }
function openCart(){ document.getElementById("drawer").classList.add("open"); document.getElementById("overlay").classList.add("show"); }
function closeCart(){ document.getElementById("drawer").classList.remove("open"); document.getElementById("overlay").classList.remove("show"); }