import { useState } from "react";
import watch from "../assets/Image/tech/Watch.png";
import laptop from "../assets/Image/tech/Laptop.png";
import camera from "../assets/Image/tech/Camera.png";
import headset from "../assets/Image/tech/Headphones.png";
import phone from "../assets/Image/tech/Phone.png";
import Ipad from "../assets/Image/tech/Ipad.png";

import Bag from "../assets/Layout/alibaba/Image/cloth/Bag.png";
import Shirt from "../assets/Layout/alibaba/Image/cloth/Shirt.png";
import Jacket from "../assets/Layout/alibaba/Image/cloth/Brown Jacket.png";
import Coat from "../assets/Layout/alibaba/Image/cloth/Coat.png";
import Shorts from "../assets/Layout/alibaba/Image/cloth/Jeans Shorts.png";
import Wallet from "../assets/Layout/alibaba/Image/cloth/Wallet.png";

const initialCartItems = [
    { id: 1, name: "T-shirts with multiple colors, for men and lady", size: "medium", color: "blue", material: "Plastic", seller: "Artel Market", price: 78.99, qty: 9, img: Shirt },
    { id: 2, name: "T-shirts with multiple colors, for men and lady", size: "medium", color: "blue", material: "Plastic", seller: "Best factory LLC", price: 39.00, qty: 3, img: Bag },
    { id: 3, name: "T-shirts with multiple colors, for men and lady", size: "medium", color: "blue", material: "Plastic", seller: "Artel Market", price: 170.50, qty: 1, img: Wallet },
];

const initialSaved = [
    { id: 1, name: "GoPro HERO6 4K Action Camera - Black", price: 99.50, img: Ipad },
    { id: 2, name: "GoPro HERO6 4K Action Camera - Black", price: 99.50, img: phone },
    { id: 3, name: "GoPro HERO6 4K Action Camera - Black", price: 99.50, img: watch },
    { id: 4, name: "GoPro HERO6 4K Action Camera - Black", price: 99.50, img: laptop },
];

function WebCartMain({ navigateTo }) {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [saved, setSaved] = useState(initialSaved);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(80);
    const [couponMsg, setCouponMsg] = useState("");

    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const tax = 14;
    const total = subtotal - discount + tax;

    const updateQty = (id, val) => setCartItems(c => c.map(i => i.id === id ? { ...i, qty: +val } : i));
    const removeItem = (id) => setCartItems(c => c.filter(i => i.id !== id));
    const removeAll = () => setCartItems([]);
    const saveForLater = (id) => { const item = cartItems.find(i => i.id === id); if (item) { setSaved(s => [...s, { ...item, id: Date.now() }]); removeItem(id); } };
    const moveToCart = (id) => { const item = saved.find(i => i.id === id); if (item) { setCartItems(c => [...c, { ...item, qty: 1, size: "medium", color: "blue", material: "Plastic", seller: "Seller" }]); setSaved(s => s.filter(i => i.id !== id)); } };
    const applyCoupon = () => { if (coupon.trim().toUpperCase() === "SAVE10") { setDiscount(100); setCouponMsg("Coupon applied! $100 off."); } else { setCouponMsg("Invalid coupon code."); } };

    return (
        <div className="w-10/12 mx-auto py-6">

            <h1 className="text-lg font-bold text-gray-800 mb-5">My cart ({cartItems.length})</h1>

            {/* ── TOP ROW: cart list + order summary ─────────────────────────── */}
            <div className="flex gap-5 items-start">

                {/* Cart list */}
                <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-lg overflow-hidden">
                    {cartItems.length === 0 ? (
                        <div className="p-10 text-center text-gray-400 text-sm">Your cart is empty.</div>
                    ) : (
                        cartItems.map((item, idx) => (
                            <div key={item.id}
                                className={`flex items-start gap-4 p-4 ${idx < cartItems.length - 1 ? "border-b border-gray-100" : ""}`}>
                                <img src={item.img} alt={item.name} className="w-16 h-16 object-contain rounded border border-gray-100 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 leading-snug">{item.name}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Size: {item.size}, Color: {item.color}, Material: {item.material}</p>
                                    <p className="text-xs text-gray-400">Seller: {item.seller}</p>
                                    <div className="flex gap-3 mt-2">
                                        <button onClick={() => removeItem(item.id)} className="text-xs text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 px-2 py-0.5 rounded transition-colors">Remove</button>
                                        <button onClick={() => saveForLater(item.id)} className="text-xs text-blue-500 hover:text-blue-700 border border-blue-200 hover:border-blue-400 px-2 py-0.5 rounded transition-colors">Save for later</button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                    <p className="text-sm font-bold text-gray-900">${item.price.toFixed(2)}</p>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs text-gray-400">Qty:</span>
                                        <select value={item.qty} onChange={e => updateQty(item.id, e.target.value)}
                                            className="border border-gray-200 rounded px-1.5 py-0.5 text-xs text-gray-700 outline-none bg-white">
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                        <button onClick={() => navigateTo && navigateTo("products")}
                            className="flex items-center gap-1.5 text-xs text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition-colors">
                            ← Back to shop
                        </button>
                        {cartItems.length > 0 && (
                            <button onClick={removeAll} className="text-xs text-red-400 hover:text-red-600 hover:underline">Remove all</button>
                        )}
                    </div>
                </div>

                {/* Order summary */}
                <div className="w-64 flex-shrink-0 space-y-3">

                    {/* Coupon */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Have a coupon?</p>
                        <div className="flex gap-2">
                            <input type="text" placeholder="Add coupon" value={coupon}
                                onChange={e => setCoupon(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && applyCoupon()}
                                className="flex-1 border border-gray-200 rounded px-2 py-1.5 text-xs outline-none focus:border-blue-400" />
                            <button onClick={applyCoupon} className="text-xs text-blue-500 hover:text-blue-700 font-medium px-2">Apply</button>
                        </div>
                        {couponMsg && <p className={`text-xs mt-1.5 ${couponMsg.includes("Invalid") ? "text-red-400" : "text-green-500"}`}>{couponMsg}</p>}
                    </div>

                    {/* Summary */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between text-sm text-gray-600"><span>Subtotal:</span><span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm text-gray-600"><span>Discount:</span><span className="text-red-500 font-medium">- ${discount.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm text-gray-600 border-b border-gray-100 pb-3"><span>Tax:</span><span className="text-green-500 font-medium">+ ${tax.toFixed(2)}</span></div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-800">Total:</span>
                            <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                        <button onClick={() => alert("Proceeding to checkout")}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded transition-colors text-sm">
                            Checkout
                        </button>
                        <div className="flex justify-center gap-2 pt-1">
                            {["VISA", "MC", "PP", "VISA", "AP"].map((p, i) => (
                                <div key={i} className="w-8 h-5 bg-gray-100 rounded flex items-center justify-center">
                                    <span className="text-gray-400 font-bold" style={{ fontSize: "6px" }}>{p}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* ── FULL WIDTH: Trust badges ────────────────────────────────────── */}
            <div className="grid grid-cols-4 gap-4 mt-5 text-gray-100">
                {[
                    {
                        icon: <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#292D32" />
                            <path d="M15.7491 10.73V10C15.7491 9.07 15.7491 6.25 11.9991 6.25C8.24915 6.25 8.24915 9.07 8.24915 10V10.73C7.02915 11 6.61914 11.79 6.61914 13.5V14.5C6.61914 16.7 7.29915 17.38 9.49915 17.38H14.4991C16.6991 17.38 17.3792 16.7 17.3792 14.5V13.5C17.3792 11.79 16.9691 11 15.7491 10.73ZM11.9991 15.1C11.3891 15.1 10.8992 14.61 10.8992 14C10.8992 13.39 11.3891 12.9 11.9991 12.9C12.6091 12.9 13.0991 13.39 13.0991 14C13.0991 14.61 12.6091 15.1 11.9991 15.1ZM14.2491 10.62H9.74915V10C9.74915 8.54 10.1091 7.75 11.9991 7.75C13.8891 7.75 14.2491 8.54 14.2491 10V10.62Z" fill="white" />
                        </svg>, title: "Secure payment", desc: "Have you ever finally just"
                    },
                    {
                        icon: <svg cl xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16 8C16.55 8 16.995 8.45 16.995 9L17 18L15 16H8C7.45 16 7 15.55 7 15V9C7 8.45 7.45 8 8 8H16ZM16 15.585V8.99998H8V15H15.415L16 15.585ZM9.77638 11.3333C9.47006 11.3333 9.22221 11.5833 9.22221 11.8889C9.22221 12.1944 9.47006 12.4444 9.77638 12.4444C10.0827 12.4444 10.3333 12.1944 10.3333 11.8889C10.3333 11.5833 10.0827 11.3333 9.77638 11.3333ZM11.4444 11.8889C11.4444 11.5833 11.6923 11.3333 11.9986 11.3333C12.3049 11.3333 12.5556 11.5833 12.5556 11.8889C12.5556 12.1944 12.3049 12.4444 11.9986 12.4444C11.6923 12.4444 11.4444 12.1944 11.4444 11.8889ZM14.2208 11.3333C13.9145 11.3333 13.6667 11.5833 13.6667 11.8889C13.6667 12.1944 13.9145 12.4444 14.2208 12.4444C14.5271 12.4444 14.7778 12.1944 14.7778 11.8889C14.7778 11.5833 14.5271 11.3333 14.2208 11.3333Z" fill="#292D32" />
                        </svg>, title: "Customer support", desc: "Have you ever finally just"
                    },
                    { icon: <svg fill="#292D32" height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300.00 300.00" xml:space="preserve" stroke="#292D32" stroke-width="0.0030000499999999998" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.80003"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path opacity="0.4" d="M116.575,191.573c-5.89,0-10.681,4.793-10.681,10.681s4.79,10.678,10.681,10.678c5.89,0,10.681-4.79,10.681-10.678 S122.466,191.573,116.575,191.573z"></path> <path opacity="0.4" d="M201.447,193.736c-5.89,0-10.678,4.793-10.678,10.681s4.788,10.678,10.678,10.678s10.683-4.79,10.683-10.678 S207.34,193.736,201.447,193.736z"></path> <path opacity="0.4" d="M206.847,133.418v-0.002h0v45.324c5.932,1.245,11.134,4.492,14.854,9.01h20.749v-23.68l-20.679-30.652H206.847z"></path> <path opacity="0.4" d="M150,0C67.159,0,0.002,67.162,0.002,150S67.159,300.005,150,300.005S300.003,232.841,300.003,150S232.841,0,150,0z M38.281,97.269c0-19.94,16.218-36.158,36.155-36.158s36.155,16.221,36.155,36.158s-16.218,36.158-36.155,36.158 S38.281,117.206,38.281,97.269z M250.231,203.312h-22.593c0.016,0.371,0.054,0.734,0.054,1.107 c0,14.47-11.772,26.24-26.245,26.24c-14.473,0-26.24-11.77-26.24-26.242c0-0.373,0.042-0.737,0.054-1.107h-32.498 c-0.56,13.98-12.076,25.184-26.19,25.184c-14.159,0-25.705-11.28-26.196-25.322c-10.792-1.183-19.219-10.346-19.219-21.449v-32.9 c1.089,0.067,2.171,0.166,3.278,0.166c4.238,0,8.339-0.568,12.283-1.535v34.272c0,3.32,2.703,6.022,6.02,6.022h1.982 c4.705-7.068,12.74-11.736,21.849-11.736s17.144,4.671,21.849,11.736h42.772c2.64-3.198,6.022-5.76,9.879-7.426v-59.371 c0-3.32-2.705-6.022-6.022-6.022h-62.066c1.784-4.892,2.845-10.113,3.066-15.562h59c10.847,0,19.828,8.053,21.338,18.49h19.522 c2.583,0,5.006,1.286,6.448,3.429l24.32,36.054c0.866,1.286,1.333,2.801,1.333,4.352v33.839 C258.012,199.829,254.526,203.312,250.231,203.312z"></path> <path d="M73.054,107.716c4.298,0,7.781-3.483,7.781-7.781V76.592c0-4.298-3.483-7.781-7.781-7.781 c-4.298,0-7.781,3.483-7.781,7.781v23.343C65.273,104.233,68.757,107.716,73.054,107.716z"></path> <circle cx="73.054" cy="118.884" r="6.933"></circle> </g> </g> </g> </g></svg>, title: "Free delivery", desc: "Have you ever finally just" },
                ].map(b => (
                    <div key={b.title} className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4">
                        <span className="text-2xl">{b.icon}</span>
                        <div>
                            <p className="text-sm font-semibold text-gray-700">{b.title}</p>
                            <p className="text-xs text-gray-400">{b.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── FULL WIDTH: Saved for later ─────────────────────────────────── */}
            {saved.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-sm font-bold text-gray-800 mb-3">Saved for later</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {saved.map(item => (
                            <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
                                <img src={item.img} alt={item.name} className="w-full h-32 object-contain mb-3" />
                                <p className="text-sm font-bold text-gray-800">${item.price.toFixed(2)}</p>
                                <p className="text-xs text-gray-600 mt-0.5 leading-snug line-clamp-2">{item.name}</p>
                                <button onClick={() => moveToCart(item.id)}
                                    className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 mt-2 hover:underline">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                        <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.25 65.25 0 0 1 13.36 1.412.75.75 0 0 1 .58.875 48.645 48.645 0 0 1-1.618 6.2.75.75 0 0 1-.712.513H6a2.503 2.503 0 0 0-2.292 1.5H17.25a.75.75 0 0 1 0 1.5H2.76a.75.75 0 0 1-.748-.807 4.002 4.002 0 0 1 2.716-3.486L3.626 2.716a.25.25 0 0 0-.248-.216H1.75A.75.75 0 0 1 1 1.75ZM6 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                                    </svg>
                                    Move to cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── FULL WIDTH: Discount banner ─────────────────────────────────── */}
            <div className="mt-6 rounded-lg px-8 py-5 flex items-center justify-between"
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

export default WebCartMain;