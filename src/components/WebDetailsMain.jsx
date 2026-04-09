import { useState } from "react";
import Bag from "../assets/Layout/alibaba/Image/cloth/Bag.png";
import Shirt from "../assets/Layout/alibaba/Image/cloth/Shirt.png";
import Jacket from "../assets/Layout/alibaba/Image/cloth/Brown Jacket.png";
import Coat from "../assets/Layout/alibaba/Image/cloth/Coat.png";
import Shorts from "../assets/Layout/alibaba/Image/cloth/Jeans Shorts.png";
import Wallet from "../assets/Layout/alibaba/Image/cloth/Wallet.png";
import watch from "../assets/Image/tech/Watch.png";

import headset from "../assets/Image/tech/Headphones.png";
import homeAppliance from "../assets/Image/interior/Home Appliances.png";
import kettle from "../assets/Layout/alibaba/Image/tech/image 85.png"


const productImages = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&h=400&fit=crop&auto=format",
];

const relatedProducts = [
  { id: 1, name: "Xiaomi Redmi B Original", price: "$32.00 - $40.00", img: Wallet },
  { id: 2, name: "Xiaomi Redmi B Original", price: "$32.00 - $40.00", img: watch },
  { id: 3, name: "Xiaomi Redmi B Original", price: "$32.00 - $40.00", img: headset },
  { id: 4, name: "Xiaomi Redmi B Original", price: "$32.00 - $40.00", img: Shorts },
  { id: 5, name: "Xiaomi Redmi B Original", price: "$32.00 - $40.00", img: kettle },
  { id: 6, name: "Xiaomi Redmi B Original", price: "$32.00 - $40.00", img: homeAppliance },
];

const youMayLike = [
  { id: 1, name: "Men Blazers Sets Elegant Formal", price: "$7.00 - $99.50", img: Coat },
  { id: 2, name: "Men Shirt Sleeve Polo Contrast",  price: "$7.00 - $99.50", img: Shirt },
  { id: 3, name: "Apple Watch Series Space Gray",   price: "$7.00 - $99.50", img: Jacket },
  { id: 4, name: "Basketball Crew Socks Long Stuff", price: "$7.00 - $99.50", img: Shirt },
  { id: 5, name: "New Summer Men's castrol T-Shirts", price: "$7.00 - $99.50", img: Bag },
];

const specs = [
  { label: "Model",       value: "#8786867" },
  { label: "Style",       value: "Classic style" },
  { label: "Certificate", value: "ISO-698921212" },
  { label: "Size",        value: "34mm x 450mm x 19mm" },
  { label: "Memory",      value: "360GB RAM" },
];

const features = [
  "Some great feature name here",
  "Lorem ipsum dolor sit amet, consectetur",
  "Duis aute irure dolor in reprehenderit",
  "Some great feature name here",
];

function Stars({ rating }) {
  return (
    <span className="flex gap-0.5 items-center">
      {[1,2,3,4,5].map(s => (
        <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
          fill={s <= Math.round(rating) ? "#f59e0b" : "#d1d5db"} className="w-3.5 h-3.5">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"/>
        </svg>
      ))}
    </span>
  );
}

function WebDetailsMain({ navigateTo, product }) {
  const [activeImg,   setActiveImg]   = useState(0);
  const [activeTab,   setActiveTab]   = useState("Description");
  const [savedLater,  setSavedLater]  = useState(false);
  const [activeTier,  setActiveTier]  = useState(0);

  const tiers = [
    { qty: "50-100 pcs",  price: "$98.00",  highlight: true  },
    { qty: "100-700 pcs", price: "$90.00",  highlight: false },
    { qty: "700+ pcs",    price: "$78.00",  highlight: false },
  ];

  const tabs = ["Description", "Reviews", "Shipping", "About seller"];

  return (
    <div className="w-10/12 mx-auto py-4 ">

      {/* Breadcrumb */}
      <div className="text-xs text-gray-400 mb-4 flex gap-1 items-center">
        {["Home", "Clothings", "Men's wear", "Summer clothing"].map((c, i, arr) => (
          <span key={c} className="flex items-center gap-1">
            <span className={`${i === arr.length - 1 ? "text-gray-600" : "cursor-pointer hover:text-blue-500"}`}
              onClick={() => i === 0 && navigateTo && navigateTo("home")}>
              {c}
            </span>
            {i < arr.length - 1 && <span>›</span>}
          </span>
        ))}
      </div>

      {/* ── TOP SECTION ──────────────────────────────────────────────────── */}
      <div className="flex gap-5 bg-white border border-gray-200 rounded-lg p-5">

        {/* Image gallery */}
        <div className="flex flex-col gap-3 flex-shrink-0 w-56">
          {/* Main image */}
          <div className="w-full h-56 border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
            <img src={productImages[activeImg]} alt="product" className="w-full h-full object-contain"/>
          </div>
          {/* Thumbnails row */}
          <div className="flex gap-2 overflow-hidden">
            {productImages.map((img, i) => (
              <div key={i} onClick={() => setActiveImg(i)}
                className={`w-10 h-10 border-2 rounded cursor-pointer overflow-hidden flex-shrink-0 transition-colors
                  ${activeImg === i ? "border-blue-500" : "border-gray-200 hover:border-gray-400"}`}>
                <img src={img} alt="" className="w-full h-full object-cover"/>
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="flex-1 min-w-0">
          {/* In stock */}
          <div className="flex items-center gap-1 text-green-500 text-xs mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd"/>
            </svg>
            In stock
          </div>

          <h1 className="text-lg font-semibold text-gray-800 mb-2">
            {product?.name || "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle"}
          </h1>

          {/* Rating row */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
            <Stars rating={4} />
            <span className="font-medium text-gray-700">9.3</span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-gray-400">
                <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z"/>
              </svg>
              32 reviews
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-gray-400">
                <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.25 65.25 0 0 1 13.36 1.412.75.75 0 0 1 .58.875 48.645 48.645 0 0 1-1.618 6.2.75.75 0 0 1-.712.513H6a2.503 2.503 0 0 0-2.292 1.5H17.25a.75.75 0 0 1 0 1.5H2.76a.75.75 0 0 1-.748-.807 4.002 4.002 0 0 1 2.716-3.486L3.626 2.716a.25.25 0 0 0-.248-.216H1.75A.75.75 0 0 1 1 1.75ZM6 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
              </svg>
              154 sold
            </span>
          </div>

          {/* Pricing tiers */}
          <div className="flex gap-0 mb-4 border border-gray-200 rounded overflow-hidden w-fit">
            {tiers.map((t, i) => (
              <div key={i} onClick={() => setActiveTier(i)}
                className={`px-4 py-2 cursor-pointer text-center transition-colors border-r last:border-r-0 border-gray-200
                  ${activeTier === i ? "bg-orange-50 border-b-2 border-b-orange-400" : "bg-white hover:bg-gray-50"}`}>
                <p className={`text-sm font-bold ${activeTier === i ? "text-orange-500" : "text-gray-800"}`}>{t.price}</p>
                <p className="text-xs text-gray-400">{t.qty}</p>
              </div>
            ))}
          </div>

          {/* Specs table */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mb-3">
            <div className="flex gap-2"><span className="text-gray-400 w-24 flex-shrink-0">Price:</span><span className="text-gray-700">Negotiable</span></div>
            <div className="flex gap-2"><span className="text-gray-400 w-24 flex-shrink-0">Type:</span><span className="text-gray-700">Classic shoes</span></div>
            <div className="flex gap-2"><span className="text-gray-400 w-24 flex-shrink-0">Material:</span><span className="text-gray-700">Plastic material</span></div>
            <div className="flex gap-2"><span className="text-gray-400 w-24 flex-shrink-0">Design:</span><span className="text-gray-700">Modern nice</span></div>
            <div className="flex gap-2"><span className="text-gray-400 w-24 flex-shrink-0">Customization:</span><span className="text-gray-700">Customized logo and design custom packages</span></div>
            <div className="flex gap-2"><span className="text-gray-400 w-24 flex-shrink-0">Protection:</span><span className="text-gray-700">Refund Policy</span></div>
            <div className="flex gap-2"><span className="text-gray-400 w-24 flex-shrink-0">Warranty:</span><span className="text-gray-700">2 years full warranty</span></div>
          </div>
        </div>

        {/* ── SUPPLIER CARD ────────────────────────────────────────────── */}
        <div className="w-48 flex-shrink-0 border border-gray-200 rounded-lg p-4 flex flex-col gap-3 h-fit">
          {/* Supplier */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm flex-shrink-0">R</div>
            <div>
              <p className="text-xs text-gray-400">Supplier</p>
              <p className="text-xs font-semibold text-gray-800 leading-tight">Guanjoi Trading LLC</p>
            </div>
          </div>

          {/* Location & badges */}
          <div className="space-y-1.5 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <img src="https://flagcdn.com/w20/de.png" alt="DE" className="w-4 h-3 rounded-sm object-cover"/>
              Germany, Berlin
            </div>
            <div className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-blue-500">
                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd"/>
              </svg>
              Verified Seller
            </div>
            <div className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-blue-400">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" clipRule="evenodd"/>
              </svg>
              Worldwide shipping
            </div>
          </div>

          <button onClick={() => alert("Opening inquiry form")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-2 rounded transition-colors">
            Send inquiry
          </button>
          <button onClick={() => alert("Viewing seller profile")}
            className="w-full border border-gray-200 text-xs text-gray-600 py-2 rounded hover:bg-gray-50 transition-colors">
            Seller's profile
          </button>
          <button onClick={() => setSavedLater(p => !p)}
            className="flex items-center justify-center gap-1.5 text-xs text-blue-500 hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill={savedLater ? "#ef4444" : "none"}
              stroke={savedLater ? "#ef4444" : "#3b82f6"} strokeWidth={1.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
            </svg>
            {savedLater ? "Saved" : "Save for later"}
          </button>
        </div>

      </div>

      {/* ── TABS + YOU MAY LIKE ───────────────────────────────────────────── */}
      <div className="flex gap-5 mt-5">

        {/* Tabs section */}
        <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Tab headers */}
          <div className="flex border-b border-gray-200">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm transition-colors
                  ${activeTab === tab
                    ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"}`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-5">
            {activeTab === "Description" && (
              <>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>

                {/* Specs table */}
                <table className="w-full text-sm mb-5 border border-gray-100 rounded overflow-hidden">
                  <tbody>
                    {specs.map((s, i) => (
                      <tr key={s.label} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-4 py-2 text-gray-400 w-36">{s.label}</td>
                        <td className="px-4 py-2 text-gray-700">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Feature bullets */}
                <ul className="space-y-2">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400 flex-shrink-0">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {activeTab === "Reviews"      && <p className="text-sm text-gray-500">No reviews yet.</p>}
            {activeTab === "Shipping"     && <p className="text-sm text-gray-500">Worldwide shipping available. Estimated delivery: 7–14 days.</p>}
            {activeTab === "About seller" && <p className="text-sm text-gray-500">Guanjoi Trading LLC — Verified seller based in Germany, Berlin.</p>}
          </div>
        </div>

        {/* You may like */}
        <div className="w-48 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">You may like</h3>
          <div className="space-y-3">
            {youMayLike.map(item => (
              <div key={item.id} onClick={() => alert(`Viewing ${item.name}`)}
                className="flex gap-2 cursor-pointer hover:bg-gray-50 rounded p-1 -mx-1 transition-colors">
                <img src={item.img} alt={item.name} className="w-12 h-12 object-contain rounded flex-shrink-0 border border-gray-100"/>
                <div>
                  <p className="text-xs text-gray-700 leading-snug line-clamp-2">{item.name}</p>
                  <p className="text-xs text-orange-500 font-medium mt-0.5">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── RELATED PRODUCTS ─────────────────────────────────────────────── */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Related products</h3>
        <div className="grid grid-cols-6 gap-3">
          {relatedProducts.map(item => (
            <div key={item.id} onClick={() => alert(`Viewing ${item.name}`)}
              className="cursor-pointer group">
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-2 bg-gray-50">
                <img src={item.img} alt={item.name}
                  className="w-full h-24 object-contain p-2 group-hover:scale-105 transition-transform duration-200"/>
              </div>
              <p className="text-xs text-gray-700 leading-snug">{item.name}</p>
              <p className="text-xs text-orange-500 font-medium mt-0.5">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── DISCOUNT BANNER ──────────────────────────────────────────────── */}
      <div className="mt-5 rounded-lg px-8 py-5 flex items-center justify-between"
        style={{ background: "linear-gradient(to right, #1565c0, #42a5d5)" }}>
        <div className="text-white">
          <p className="font-bold text-base">Super discount on more than 100 USD</p>
          <p className="text-sm text-blue-100 mt-0.5">Have you ever finally just write dummy info</p>
        </div>
        <button onClick={() => alert("Viewing discount offers")}
          className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2 rounded transition-colors flex-shrink-0">
          Shop now
        </button>
      </div>

    </div>
  );
}

export default WebDetailsMain;