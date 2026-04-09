import { useState } from "react";
import watch from "../assets/Image/tech/Watch.png";
import laptop from "../assets/Image/tech/Laptop.png";
import headset from "../assets/Image/tech/Headphones 2.png";
import camera from "../assets/Image/tech/Camera.png";
import phone from "../assets/Image/tech/Phone.png";
import phone2 from "../assets/Image/tech/Phone2.png";
import Ipad from "../assets/Image/tech/Ipad.png";

const allProducts = [
  { id: 1,  name: "GoPro HERO6 4K Action Camera - Black", price: 99.50,  oldPrice: 1128.00, rating: 7.5, orders: 154, shipping: "Free Shipping", verified: true,  brand: "Samsung",  feature: "Metallic",      img: phone2 },
  { id: 2,  name: "GoPro HERO6 4K Action Camera - Black", price: 99.50,  oldPrice: 1128.00, rating: 5.0, orders: 154, shipping: "Free Shipping", verified: true,  brand: "Apple",    feature: "Metallic",      img: phone },
  { id: 3,  name: "GoPro HERO6 4K Action Camera - Black", price: 99.50,  oldPrice: null,    rating: 7.5, orders: 154, shipping: "Free Shipping", verified: false, brand: "Huawei",   feature: "Plastic cover", img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=200&h=200&fit=crop&auto=format" },
  { id: 4,  name: "GoPro HERO6 4K Action Camera - Black", price: 99.50,  oldPrice: 1028.00, rating: 7.5, orders: 154, shipping: "Free Shipping", verified: true,  brand: "Samsung",  feature: "8GB Ram",       img: Ipad },
  { id: 5,  name: "GoPro HERO6 4K Action Camera - Black", price: 99.50,  oldPrice: 1128.00, rating: 7.5, orders: 154, shipping: "Free Shipping", verified: true,  brand: "Apple",    feature: "Metallic",      img: camera },
  { id: 6,  name: "GoPro HERO6 4K Action Camera - Black", price: 99.50,  oldPrice: null,    rating: 7.5, orders: 154, shipping: "Free Shipping", verified: false, brand: "Pocco",    feature: "Metallic",      img: phone },
  { id: 7,  name: "GoPro HERO6 4K Action Camera - Black", price: 99.50,  oldPrice: 1028.00, rating: 7.5, orders: 154, shipping: "Free Shipping", verified: true,  brand: "Samsung",  feature: "Large Memory",  img: laptop },
  { id: 8,  name: "GoPro HERO6 4K Action Camera - Black", price: 99.50,  oldPrice: 1128.00, rating: 7.5, orders: 154, shipping: "Free Shipping", verified: true,  brand: "Apple",    feature: "Super power",   img: watch },
  { id: 9,  name: "GoPro HERO6 4K Action Camera - Black", price: 99.50,  oldPrice: 1128.00, rating: 7.5, orders: 154, shipping: "Free Shipping", verified: true,  brand: "Samsung",  feature: "Metallic",      img: phone2 },
  { id: 10, name: "GoPro HERO6 4K Action Camera - Black", price: 99.50,  oldPrice: null,    rating: 7.5, orders: 154, shipping: "Free Shipping", verified: false, brand: "Lenovo",   feature: "8GB Ram",       img: headset },
  { id: 11, name: "GoPro HERO6 4K Action Camera - Black", price: 99.50,  oldPrice: 1128.00, rating: 7.5, orders: 154, shipping: "Free Shipping", verified: true,  brand: "Apple",    feature: "Metallic",      img: Ipad },
  { id: 12, name: "GoPro HERO6 4K Action Camera - Black", price: 99.50,  oldPrice: 1028.00, rating: 7.5, orders: 154, shipping: "Free Shipping", verified: true,  brand: "Samsung",  feature: "Plastic cover", img: laptop },
];

const categoryOptions = ["Mobile accessory", "Electronics", "Smartphones", "Modern tech"];
const brandOptions    = ["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"];
const featureOptions  = ["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"];
const ratingOptions   = [5, 4, 3, 2];
const conditionOptions= ["Any", "Refurbished", "Brand new", "Old items"];

function Stars({ rating }) {
  const full = Math.floor(rating / 2);
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
          fill={s <= full ? "#f59e0b" : "#d1d5db"} className="w-3 h-3">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"/>
        </svg>
      ))}
    </span>
  );
}

function WebGridViewMain({ options, selected, onChange }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? options : options.slice(0, 4);
  return (
    <div className="space-y-1.5">
      {visible.map(opt => (
        <label key={opt} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-gray-900">
          <input type="checkbox" checked={selected.includes(opt)} onChange={() => onChange(opt)}
            className="accent-blue-500 w-3 h-3" />
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

function SidebarSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 pb-3 mb-3">
      <button className="flex justify-between items-center w-full mb-2" onClick={() => setOpen(p => !p)}>
        <h3 className="text-xs font-semibold text-gray-800">{title}</h3>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
          className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "" : "rotate-180"}`}>
          <path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd"/>
        </svg>
      </button>
      {open && children}
    </div>
  );
}

function ProductListing({ navigateTo }) {
  const [selBrands,    setSelBrands]    = useState(["Samsung", "Apple", "Pocco"]);
  const [selFeatures,  setSelFeatures]  = useState(["Metallic"]);
  const [selRatings,   setSelRatings]   = useState([4, 3]);
  const [selCategories,setSelCategories]= useState([]);
  const [condition,    setCondition]    = useState("Any");
  const [minPrice,     setMinPrice]     = useState("");
  const [maxPrice,     setMaxPrice]     = useState("");
  const [minApplied,   setMinApplied]   = useState(null);
  const [maxApplied,   setMaxApplied]   = useState(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy,       setSortBy]       = useState("Featured");
  const [viewMode,     setViewMode]     = useState("grid");
  const [page,         setPage]         = useState(1);
  const [wishlist,     setWishlist]     = useState([]);
  const perPage = 9;

  const toggle = (setter, getter, val) =>
    setter(getter.includes(val) ? getter.filter(v => v !== val) : [...getter, val]);

  // Active filter tags
  const activeTags = [
    ...selBrands.map(b  => ({ label: b,           type: "brand"   })),
    ...selFeatures.map(f => ({ label: f,           type: "feature" })),
    ...selRatings.map(r  => ({ label: `${r} star`, type: "rating"  })),
  ];

  const removeTag = (tag) => {
    if (tag.type === "brand")   setSelBrands(  selBrands.filter(b   => b !== tag.label));
    if (tag.type === "feature") setSelFeatures(selFeatures.filter(f => f !== tag.label));
    if (tag.type === "rating")  setSelRatings( selRatings.filter(r  => `${r} star` !== tag.label));
  };

  const clearAll = () => { setSelBrands([]); setSelFeatures([]); setSelRatings([]); setSelCategories([]); };

  const filtered = allProducts.filter(p => {
    if (verifiedOnly && !p.verified) return false;
    if (selBrands.length   && !selBrands.includes(p.brand))     return false;
    if (selFeatures.length && !selFeatures.includes(p.feature)) return false;
    if (minApplied !== null && p.price < minApplied) return false;
    if (maxApplied !== null && p.price > maxApplied) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleWishlist = (id) =>
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  return (
    <div className="w-10/12 mx-auto py-4">

      {/* Breadcrumb */}
      <div className="text-xs text-gray-400 mb-4 flex gap-1 items-center">
        {["Home", "Clothings", "Men's wear", "Summer clothing"].map((c, i, arr) => (
          <span key={c} className="flex items-center gap-1">
            <span className={i === arr.length - 1 ? "text-gray-600" : "cursor-pointer hover:text-blue-500"}
              onClick={() => i === 0 && navigateTo && navigateTo("home")}>{c}</span>
            {i < arr.length - 1 && <span>›</span>}
          </span>
        ))}
      </div>

      <div className="flex gap-5">

        {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
        <aside className="w-44 flex-shrink-0 text-sm">

          <SidebarSection title="Category">
            <WebGridViewMain options={categoryOptions} selected={selCategories}
              onChange={v => toggle(setSelCategories, selCategories, v)} />
          </SidebarSection>

          <SidebarSection title="Brands">
            <WebGridViewMain options={brandOptions} selected={selBrands}
              onChange={v => { toggle(setSelBrands, selBrands, v); setPage(1); }} />
          </SidebarSection>

          <SidebarSection title="Features">
            <WebGridViewMain options={featureOptions} selected={selFeatures}
              onChange={v => { toggle(setSelFeatures, selFeatures, v); setPage(1); }} />
          </SidebarSection>

          <SidebarSection title="Price range">
            <div className="flex gap-1.5 mt-1">
              <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)}
                className="w-full border border-gray-200 rounded px-2 py-1 text-xs outline-none focus:border-blue-400"/>
              <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
                className="w-full border border-gray-200 rounded px-2 py-1 text-xs outline-none focus:border-blue-400"/>
            </div>
            <button onClick={() => { setMinApplied(minPrice ? +minPrice : null); setMaxApplied(maxPrice ? +maxPrice : null); setPage(1); }}
              className="mt-2 w-full border border-blue-500 text-blue-500 text-xs py-1 rounded hover:bg-blue-50 transition-colors">
              Apply
            </button>
          </SidebarSection>

          <SidebarSection title="Condition">
            <div className="space-y-1.5">
              {conditionOptions.map(opt => (
                <label key={opt} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                  <input type="radio" name="condition" checked={condition === opt}
                    onChange={() => setCondition(opt)} className="accent-blue-500 w-3 h-3"/>
                  {opt}
                </label>
              ))}
            </div>
          </SidebarSection>

          <SidebarSection title="Ratings">
            <div className="space-y-1.5">
              {ratingOptions.map(r => (
                <label key={r} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selRatings.includes(r)}
                    onChange={() => { toggle(setSelRatings, selRatings, r); setPage(1); }}
                    className="accent-blue-500 w-3 h-3"/>
                  <Stars rating={r * 2} />
                </label>
              ))}
            </div>
          </SidebarSection>

          <SidebarSection title="Manufacturer">
            <p className="text-xs text-gray-400">No options</p>
          </SidebarSection>

        </aside>

        {/* ── MAIN ─────────────────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{filtered.length.toLocaleString()}</span> items in{" "}
              <span className="font-semibold text-gray-900">Mobile accessory</span>
            </p>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                <input type="checkbox" checked={verifiedOnly} onChange={e => { setVerifiedOnly(e.target.checked); setPage(1); }}
                  className="accent-blue-500 w-3 h-3"/>
                Verified only
              </label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="border border-gray-200 rounded px-2 py-1 text-xs text-gray-600 outline-none bg-white">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Orders</option>
              </select>
              <div className="flex gap-1">
                <button onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded border transition-colors ${viewMode === "grid" ? "border-blue-500 text-blue-500" : "border-gray-200 text-gray-400"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 0 0 2 4.25v2.5A2.25 2.25 0 0 0 4.25 9h2.5A2.25 2.25 0 0 0 9 6.75v-2.5A2.25 2.25 0 0 0 6.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 2 13.25v2.5A2.25 2.25 0 0 0 4.25 18h2.5A2.25 2.25 0 0 0 9 15.75v-2.5A2.25 2.25 0 0 0 6.75 11h-2.5Zm9-9A2.25 2.25 0 0 0 11 4.25v2.5A2.25 2.25 0 0 0 13.25 9h2.5A2.25 2.25 0 0 0 18 6.75v-2.5A2.25 2.25 0 0 0 15.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 11 13.25v2.5A2.25 2.25 0 0 0 13.25 18h2.5A2.25 2.25 0 0 0 18 15.75v-2.5A2.25 2.25 0 0 0 15.75 11h-2.5Z" clipRule="evenodd"/>
                  </svg>
                </button>
                <button onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded border transition-colors ${viewMode === "list" ? "border-blue-500 text-blue-500" : "border-gray-200 text-gray-400"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 10.5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Active filter tags */}
          {activeTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 items-center">
              {activeTags.map((tag, i) => (
                <span key={i} className="flex items-center gap-1 bg-white border border-gray-200 text-xs text-gray-600 px-2 py-1 rounded">
                  {tag.label}
                  <button onClick={() => removeTag(tag)} className="ml-0.5 text-gray-400 hover:text-gray-700 leading-none">×</button>
                </span>
              ))}
              <button onClick={clearAll} className="text-xs text-blue-500 hover:underline ml-1">
                Clear all filter
              </button>
            </div>
          )}

          {/* ── GRID VIEW ──────────────────────────────────────────────────── */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-3 gap-3">
              {paginated.map(p => (
                <div key={p.id}
                  className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow bg-white cursor-pointer group"
                  onClick={() => navigateTo && navigateTo("productDetail", p)}>
                  <div className="relative mb-3">
                    <img src={p.img} alt={p.name}
                      className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-200"/>
                    <button onClick={e => { e.stopPropagation(); toggleWishlist(p.id); }}
                      className="absolute top-0 right-0 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill={wishlist.includes(p.id) ? "#ef4444" : "none"}
                        stroke={wishlist.includes(p.id) ? "#ef4444" : "#9ca3af"} strokeWidth={1.5}
                        className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-gray-900">${p.price.toFixed(2)}</span>
                    {p.oldPrice && <span className="text-xs text-gray-400 line-through">${p.oldPrice.toFixed(2)}</span>}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Stars rating={p.rating} />
                    <span className="text-xs text-gray-400">{p.rating}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-snug">{p.name}</p>
                </div>
              ))}
            </div>
          )}

          {/* ── LIST VIEW ──────────────────────────────────────────────────── */}
          {viewMode === "list" && (
            <div className="space-y-3">
              {paginated.map(p => (
                <div key={p.id}
                  className="flex gap-4 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white cursor-pointer"
                  onClick={() => navigateTo && navigateTo("productDetail", p)}>
                  <img src={p.img} alt={p.name} className="w-32 h-32 object-contain flex-shrink-0 rounded"/>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-gray-800">{p.name}</h3>
                      <button onClick={e => { e.stopPropagation(); toggleWishlist(p.id); }} className="ml-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                          fill={wishlist.includes(p.id) ? "#ef4444" : "none"}
                          stroke={wishlist.includes(p.id) ? "#ef4444" : "#9ca3af"} strokeWidth={1.5}
                          className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-base font-bold text-gray-900">${p.price.toFixed(2)}</span>
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
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-end gap-2 mt-6 text-sm">
            <select className="border border-gray-200 rounded px-2 py-1 text-xs outline-none bg-white text-gray-600">
              <option>Show 10</option><option>Show 20</option><option>Show 50</option>
            </select>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-500 hover:border-blue-400 disabled:opacity-40 text-sm">
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                className={`w-7 h-7 flex items-center justify-center rounded border text-xs font-medium transition-colors
                  ${page === n ? "bg-blue-500 text-white border-blue-500" : "border-gray-200 text-gray-600 hover:border-blue-400"}`}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-500 hover:border-blue-400 disabled:opacity-40 text-sm">
              ›
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductListing;