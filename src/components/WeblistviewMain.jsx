import { useState } from "react";

import watch from "../assets/Image/tech/Watch.png";
import laptop from "../assets/Image/tech/Laptop.png";
import headset from "../assets/Image/tech/Headphones 2.png";
import phone from "../assets/Image/tech/Phone.png";
import phone2 from "../assets/Image/tech/Phone2.png";
import Ipad from "../assets/Image/tech/Ipad.png";





// ── Sample product data ────────────────────────────────────────────────────
const allProducts = [
  { id: 1, name: "Canon Camera EOS 2000, Black 10x zoom", price: 998, oldPrice: 1128, rating: 3.5, orders: 154, shipping: "Free Shipping", verified: true, img: phone2, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { id: 2, name: "GoPro HERO6 4K Action Camera - Black", price: 998, oldPrice: null, rating: 3.5, orders: 154, shipping: "Free Shipping", verified: true, img: phone, desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute iure dolor in reprehenderit." },
  { id: 3, name: "GoPro HERO6 4K Action Camera - Black", price: 998, oldPrice: null, rating: 3.5, orders: 154, shipping: "Free Shipping", verified: false, img: Ipad, desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute iure dolor in reprehenderit." },
  { id: 4, name: "MacBook Pro 14-inch Laptop - Space Gray", price: 998, oldPrice: null, rating: 4, orders: 154, shipping: "Free Shipping", verified: true, img: laptop, desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute iure dolor in reprehenderit." },
  { id: 5, name: "Smart Watch Series 6 - Silver Aluminum", price: 998, oldPrice: 1128, rating: 4, orders: 154, shipping: "Free Shipping", verified: true, img: watch, desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute iure dolor in reprehenderit." },
  { id: 6, name: "Wireless Headphones Premium - White", price: 998, oldPrice: null, rating: 3, orders: 154, shipping: "Free Shipping", verified: false, img: headset, desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute iure dolor in reprehenderit." },
];

const categoryOptions  = ["Mobile accessory", "Electronics", "Smartphones", "Modern tech"];
const brandOptions     = ["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"];
const featureOptions   = ["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"];
const conditionOptions = ["Any", "Refurbished", "Brand new", "Old items"];
const ratingOptions    = [5, 4, 3, 2];

// ── Star renderer ──────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
          fill={s <= Math.floor(rating) ? "#f59e0b" : s - 0.5 <= rating ? "url(#half)" : "#d1d5db"}
          className="w-3.5 h-3.5">
          <defs>
            <linearGradient id="half"><stop offset="50%" stopColor="#f59e0b" /><stop offset="50%" stopColor="#d1d5db" /></linearGradient>
          </defs>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
        </svg>
      ))}
    </span>
  );
}

// ── Sidebar checkbox group ─────────────────────────────────────────────────
function CheckGroup({ options, selected, onChange }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? options : options.slice(0, 4);
  return (
    <div className="space-y-1.5">
      {visible.map((opt) => (
        <label key={opt} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
          <input type="checkbox" checked={selected.includes(opt)} onChange={() => onChange(opt)}
            className="accent-blue-500 w-3.5 h-3.5" />
          {opt}
        </label>
      ))}
      {options.length > 4 && (
        <button onClick={() => setShowAll(p => !p)} className="text-blue-500 text-xs mt-1 hover:underline">
          {showAll ? "Show less" : "See all"}
        </button>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
function WeblistviewMain({ navigateTo }) {
  // Filters
  const [selCategories, setSelCategories] = useState([]);
  const [selBrands,     setSelBrands]     = useState([]);
  const [selFeatures,   setSelFeatures]   = useState([]);
  const [condition,     setCondition]     = useState("Any");
  const [minPrice,      setMinPrice]      = useState("");
  const [maxPrice,      setMaxPrice]      = useState("");
  const [minApplied,    setMinApplied]    = useState(null);
  const [maxApplied,    setMaxApplied]    = useState(null);
  const [selRating,     setSelRating]     = useState(null);
  const [verifiedOnly,  setVerifiedOnly]  = useState(false);
  const [sortBy,        setSortBy]        = useState("Featured");
  const [viewMode,      setViewMode]      = useState("list"); // "list" | "grid"
  const [page,          setPage]          = useState(1);
  const [wishlist,      setWishlist]      = useState([]);
  const perPage = 10;

  const toggle = (setter, getter, val) =>
    setter(getter.includes(val) ? getter.filter(v => v !== val) : [...getter, val]);

  // Filter logic
  const filtered = allProducts.filter(p => {
    if (verifiedOnly && !p.verified) return false;
    if (selBrands.length && !selBrands.some(b => p.name.toLowerCase().includes(b.toLowerCase()))) return false;
    if (condition !== "Any") { /* would filter by condition field */ }
    if (selRating && p.rating < selRating) return false;
    if (minApplied !== null && p.price < minApplied) return false;
    if (maxApplied !== null && p.price > maxApplied) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleWishlist = (id) =>
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  // ── Sidebar ──────────────────────────────────────────────────────────────
  const SidebarSection = ({ title, children }) => (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400">
          <path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" />
        </svg>
      </div>
      {children}
    </div>
  );

  return (
    <div className="w-10/12 mx-auto py-4">

      {/* Breadcrumb */}
      <div className="text-xs text-gray-400 mb-4 flex gap-1 items-center">
        {["Home", "Clothings", "Men's wear", "Summer clothing"].map((crumb, i, arr) => (
          <span key={crumb} className="flex items-center gap-1">
            <span
              className={i === arr.length - 1 ? "text-gray-600" : "cursor-pointer hover:text-blue-500"}
              onClick={() => i === 0 && navigateTo && navigateTo("home")}
            >{crumb}</span>
            {i < arr.length - 1 && <span>›</span>}
          </span>
        ))}
      </div>

      <div className="flex gap-5">

        {/* ── SIDEBAR ────────────────────────────────────────────────────── */}
        <aside className="w-48 flex-shrink-0 text-sm">

          <SidebarSection title="Category">
            <CheckGroup options={categoryOptions} selected={selCategories}
              onChange={v => toggle(setSelCategories, selCategories, v)} />
          </SidebarSection>

          <SidebarSection title="Brands">
            <CheckGroup options={brandOptions} selected={selBrands}
              onChange={v => toggle(setSelBrands, selBrands, v)} />
          </SidebarSection>

          <SidebarSection title="Features">
            <CheckGroup options={featureOptions} selected={selFeatures}
              onChange={v => toggle(setSelFeatures, selFeatures, v)} />
          </SidebarSection>

          {/* Price range */}
          <SidebarSection title="Price range">
            <div className="flex gap-2 mt-1">
              <input type="number" placeholder="Min" value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                className="w-full border border-gray-200 rounded px-2 py-1 text-xs outline-none focus:border-blue-400" />
              <input type="number" placeholder="Max" value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                className="w-full border border-gray-200 rounded px-2 py-1 text-xs outline-none focus:border-blue-400" />
            </div>
            <button
              onClick={() => { setMinApplied(minPrice ? +minPrice : null); setMaxApplied(maxPrice ? +maxPrice : null); setPage(1); }}
              className="mt-2 w-full border border-blue-500 text-blue-500 text-xs py-1 rounded hover:bg-blue-50 transition-colors"
            >Apply</button>
          </SidebarSection>

          {/* Condition */}
          <SidebarSection title="Condition">
            <div className="space-y-1.5">
              {conditionOptions.map(opt => (
                <label key={opt} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="radio" name="condition" checked={condition === opt}
                    onChange={() => setCondition(opt)} className="accent-blue-500 w-3.5 h-3.5" />
                  {opt}
                </label>
              ))}
            </div>
          </SidebarSection>

          {/* Ratings */}
          <SidebarSection title="Ratings">
            <div className="space-y-1.5">
              {ratingOptions.map(r => (
                <label key={r} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selRating === r}
                    onChange={() => setSelRating(selRating === r ? null : r)}
                    className="accent-blue-500 w-3.5 h-3.5" />
                  <Stars rating={r} />
                </label>
              ))}
            </div>
          </SidebarSection>

        </aside>

        {/* ── MAIN CONTENT ───────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-800">{filtered.length.toLocaleString()}</span> items in{" "}
              <span className="font-medium text-gray-800">Mobile accessory</span>
            </p>

            <div className="flex items-center gap-4">
              {/* Verified toggle */}
              <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                <input type="checkbox" checked={verifiedOnly} onChange={e => { setVerifiedOnly(e.target.checked); setPage(1); }}
                  className="accent-blue-500 w-3.5 h-3.5" />
                Verified only
              </label>

              {/* Sort */}
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="border border-gray-200 rounded px-2 py-1 text-xs text-gray-600 outline-none bg-white">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Orders</option>
              </select>

              {/* View toggle */}
              <div className="flex gap-1">
                <button onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded border ${viewMode === "grid" ? "border-blue-500 text-blue-500" : "border-gray-200 text-gray-400"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 0 0 2 4.25v2.5A2.25 2.25 0 0 0 4.25 9h2.5A2.25 2.25 0 0 0 9 6.75v-2.5A2.25 2.25 0 0 0 6.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 2 13.25v2.5A2.25 2.25 0 0 0 4.25 18h2.5A2.25 2.25 0 0 0 9 15.75v-2.5A2.25 2.25 0 0 0 6.75 11h-2.5Zm9-9A2.25 2.25 0 0 0 11 4.25v2.5A2.25 2.25 0 0 0 13.25 9h2.5A2.25 2.25 0 0 0 18 6.75v-2.5A2.25 2.25 0 0 0 15.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 11 13.25v2.5A2.25 2.25 0 0 0 13.25 18h2.5A2.25 2.25 0 0 0 18 15.75v-2.5A2.25 2.25 0 0 0 15.75 11h-2.5Z" clipRule="evenodd" />
                  </svg>
                </button>
                <button onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded border ${viewMode === "list" ? "border-blue-500 text-blue-500" : "border-gray-200 text-gray-400"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 10.5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Product list */}
          {viewMode === "list" ? (
            <div className="space-y-3">
              {paginated.map(p => (
                <div key={p.id} className="flex gap-4 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                  <img src={p.img} alt={p.name} className="w-36 h-36 object-contain flex-shrink-0 rounded" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-gray-800">{p.name}</h3>
                      <button onClick={() => toggleWishlist(p.id)} className="ml-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                          fill={wishlist.includes(p.id) ? "#ef4444" : "none"}
                          stroke={wishlist.includes(p.id) ? "#ef4444" : "#9ca3af"} strokeWidth={1.5}
                          className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-lg font-bold text-gray-900">${p.price.toFixed(2)}</span>
                      {p.oldPrice && <span className="text-sm text-gray-400 line-through">${p.oldPrice.toFixed(2)}</span>}
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <Stars rating={p.rating} />
                      <span>{p.rating}</span>
                      <span className="text-gray-300">·</span>
                      <span>{p.orders} orders</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-green-500">{p.shipping}</span>
                    </div>

                    <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-2">{p.desc}</p>

                    <button
                      onClick={() => navigateTo && navigateTo("productDetail", p)}
                      className="text-blue-500 text-xs mt-2 hover:underline"
                    >View details</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {paginated.map(p => (
                <div key={p.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                  <div className="relative">
                    <img src={p.img} alt={p.name} className="w-full h-36 object-contain mb-3" />
                    <button onClick={() => toggleWishlist(p.id)} className="absolute top-0 right-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill={wishlist.includes(p.id) ? "#ef4444" : "none"}
                        stroke={wishlist.includes(p.id) ? "#ef4444" : "#9ca3af"} strokeWidth={1.5}
                        className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-xs font-medium text-gray-800 line-clamp-2">{p.name}</h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-sm font-bold text-gray-900">${p.price}</span>
                    {p.oldPrice && <span className="text-xs text-gray-400 line-through">${p.oldPrice}</span>}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Stars rating={p.rating} />
                    <span className="text-xs text-gray-400">{p.orders} orders</span>
                  </div>
                  <button
                    onClick={() => navigateTo && navigateTo("productDetail", p)}
                    className="text-blue-500 text-xs mt-2 hover:underline block"
                  >View details</button>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-end gap-2 mt-6 text-sm">
            <select className="border border-gray-200 rounded px-2 py-1 text-xs outline-none bg-white text-gray-600">
              <option>Show 10</option>
              <option>Show 20</option>
              <option>Show 50</option>
            </select>

            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-500 hover:border-blue-400 disabled:opacity-40">
              ‹
            </button>

            {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                className={`w-7 h-7 flex items-center justify-center rounded border text-xs font-medium transition-colors
                  ${page === n ? "bg-blue-500 text-white border-blue-500" : "border-gray-200 text-gray-600 hover:border-blue-400"}`}>
                {n}
              </button>
            ))}

            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-500 hover:border-blue-400 disabled:opacity-40">
              ›
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default WeblistviewMain;