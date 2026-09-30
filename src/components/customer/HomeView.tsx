import React, { useState } from 'react';
import {
  Search,
  MapPin,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Crown,
  Heart,
  ExternalLink,
  ChevronRight,
  Flame,
  Tag,
  Star,
  Percent,
  Compass,
  ShoppingBag,
  Globe,
  Clock,
  PackageCheck,
  Plus,
} from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { mockBackend } from '../../services/mockBackend';
import { formatINR, formatDistance, calculateDistanceKm, isOutletOpen } from '../../utils/formatters';
import { Product } from '../../types';

interface HomeViewProps {
  onNavigate: (view: string, id?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { district, userCoords } = useLocation();
  const { preferences, toggleFavouriteProduct } = useAuth();
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const stores = mockBackend.getPartnerStores(district);
  const products = mockBackend.getProducts();

  // Featured Gold Champagne Hero Product
  const goldChampagne = products.find((p) => p.id === 'p_gold_champagne') || products[0];

  const categories = [
    { id: 'ALL', label: 'All Products' },
    { id: 'IMPORTED', label: '✈️ Imported' },
    { id: 'LOCAL', label: '🇮🇳 Local Reserve' },
    { id: 'Single Malt', label: 'Single Malts' },
    { id: 'Wine', label: 'Champagnes & Wines' },
    { id: 'Gin', label: 'Gin & Spirits' },
    { id: 'Beer', label: 'Beers' },
  ];

  const importedLiquors = products.filter((p) => p.originType === 'IMPORTED');
  const localLiquors = products.filter((p) => p.originType === 'LOCAL');
  const singleMalts = products.filter((p) => p.category === 'Single Malt');

  return (
    <div className="space-y-10 pb-28 pt-2 px-3 sm:px-4 max-w-7xl mx-auto">
      
      {/* 🏆 HERO SPOTLIGHT: MODERN LUXURY BURGUNDY & GOLD BANNER */}
      <div className="relative rounded-3xl overflow-hidden luxury-card border border-amber-500/40 p-6 md:p-10 bg-gradient-to-br from-[#4A0013] via-[#2A000A] to-[#0D1017] text-white shadow-2xl">
        
        {/* Glow ambient background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-900/30 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left order-2 lg:order-1">
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>MEMBER EXCLUSIVE FIRST ACCESS</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-extrabold">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>SALE ENDS IN 02:14:32</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              <span className="gold-gradient-text">{goldChampagne.productName}</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {goldChampagne.description}
            </p>

            {/* Price & Savings Pill */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <div className="text-left">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">EXCLUSIVE MEMBER PRICE</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-4xl font-extrabold text-amber-400">
                    {formatINR(goldChampagne.memberPrice)}
                  </span>
                  <span className="text-xs text-slate-400 line-through font-semibold">
                    {formatINR(goldChampagne.regularPrice)}
                  </span>
                </div>
              </div>

              <div className="h-10 w-px bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3.5 py-2 rounded-2xl text-xs font-extrabold shadow-md">
                <Percent className="w-4 h-4 text-rose-400" />
                <span>SAVE {formatINR(goldChampagne.regularPrice - goldChampagne.memberPrice)} INSTANTLY</span>
              </div>
            </div>

            {/* Store availability info pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Available at <strong>L1 Discovery Hub Cyber City</strong> (1.2 km away)</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 justify-center lg:justify-start">
              <button
                onClick={() => onNavigate('product-detail', goldChampagne.id)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#FFF5D6] via-[#D4AF37] to-[#AA771C] hover:brightness-110 text-black font-extrabold text-xs shadow-xl gold-glow transition-all flex items-center justify-center gap-2"
              >
                <span>View Store & Reserve Price</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('early-access')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl luxury-card text-white hover:text-amber-400 text-xs font-bold"
              >
                Explore Early Access Sales
              </button>
            </div>

          </div>

          {/* Bottle Showcase Right */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative group cursor-pointer" onClick={() => onNavigate('product-detail', goldChampagne.id)}>
              <div className="w-56 h-72 sm:w-64 sm:h-80 rounded-3xl bg-black/80 border border-amber-500/40 p-4 flex items-center justify-center relative shadow-2xl">
                <img
                  src={goldChampagne.imageUrl}
                  alt={goldChampagne.productName}
                  className="max-h-full max-w-full object-contain drop-shadow-[0_20px_35px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black font-extrabold text-[10px] uppercase tracking-widest px-3.5 py-1 rounded-full shadow-lg whitespace-nowrap">
                ★ 4.9 Rating • 142 Reviews
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 🏷️ CATEGORY PILL NAVIGATION BAR */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              if (cat.id === 'IMPORTED') onNavigate('imported');
              else if (cat.id === 'LOCAL') onNavigate('local');
              else onNavigate('shop');
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-black font-extrabold shadow-md'
                : 'luxury-card text-slate-700 dark:text-slate-300 hover:text-amber-500'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ✈️ EXCLUSIVE IMPORTED LIQUORS (HORIZONTAL CAROUSEL) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-500" />
              Exclusive Imported Liquors
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Authentic reserves from Scotland, France, Japan, Germany & Mexico</p>
          </div>

          <button
            onClick={() => onNavigate('imported')}
            className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 hover:underline"
          >
            View All Imported ({importedLiquors.length}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2">
          {importedLiquors.map((product) => (
            <ModernProductCard
              key={product.id}
              product={product}
              isFav={preferences.favourites.products.includes(product.id)}
              onToggleFav={() => toggleFavouriteProduct(product.id)}
              onAddToCart={() => addToCart(product)}
              onClick={() => onNavigate('product-detail', product.id)}
            />
          ))}
        </div>
      </div>

      {/* 🇮🇳 VERIFIED LOCAL & COUNTRY MADE RESERVES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              Verified Local & Country Made Spirits
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Award-winning Indian Single Malts & Craft Craft Gins (Indri, Amrut, Greater Than)</p>
          </div>

          <button
            onClick={() => onNavigate('local')}
            className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 hover:underline"
          >
            View All Local ({localLiquors.length}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2">
          {localLiquors.map((product) => (
            <ModernProductCard
              key={product.id}
              product={product}
              isFav={preferences.favourites.products.includes(product.id)}
              onToggleFav={() => toggleFavouriteProduct(product.id)}
              onAddToCart={() => addToCart(product)}
              onClick={() => onNavigate('product-detail', product.id)}
            />
          ))}
        </div>
      </div>

      {/* 🥃 SINGLE MALTS & SCOTCH SELECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Single Malts & Rare Whiskies
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Glenfiddich, Macallan Double Cask & Suntory Hibiki Japanese Reserve</p>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 hover:underline"
          >
            See All Whiskies <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2">
          {singleMalts.map((product) => (
            <ModernProductCard
              key={product.id}
              product={product}
              isFav={preferences.favourites.products.includes(product.id)}
              onToggleFav={() => toggleFavouriteProduct(product.id)}
              onAddToCart={() => addToCart(product)}
              onClick={() => onNavigate('product-detail', product.id)}
            />
          ))}
        </div>
      </div>

      {/* 📍 NEARBY PARTNER STORES (GURGAON / FARIDABAD) */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-500" />
              Licensed Partner Stores ({district})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Physical Haryana Excise verified outlets with live pickup availability</p>
          </div>

          <button
            onClick={() => onNavigate('partner-stores')}
            className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 hover:underline"
          >
            View Partner Directory <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stores.map((store) => {
            const distance = calculateDistanceKm(userCoords, store.geoPoint);
            const isOpen = isOutletOpen(store.hours.open, store.hours.close);

            return (
              <div
                key={store.id}
                onClick={() => onNavigate('outlet-detail', store.id)}
                className="luxury-card rounded-2xl p-4 cursor-pointer group space-y-3 flex flex-col justify-between hover:border-amber-500/40 transition-all"
              >
                <div className="relative h-36 rounded-xl overflow-hidden">
                  <img
                    src={store.images[0]}
                    alt={store.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <span className={`absolute bottom-2 left-2 px-2.5 py-0.5 rounded font-extrabold text-[10px] ${
                    isOpen ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white'
                  }`}>
                    {isOpen ? `OPEN TILL ${store.hours.close}` : 'CLOSED'}
                  </span>

                  <span className="absolute bottom-2 right-2 text-white font-bold text-[11px] bg-black/70 px-2 py-0.5 rounded">
                    📍 {formatDistance(distance)} (~{store.estimatedDriveTimeMins || 5} min drive)
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-extrabold">
                    <CheckCircle2 className="w-3 h-3 text-amber-500" /> VERIFIED EXCISE OUTLET
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {store.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{store.address}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                    View Store Inventory <ArrowRight className="w-3 h-3" />
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Up to {store.maxMemberDiscountPercent}% Off
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 👑 MEMBERSHIP PROMOTION BANNER */}
      <div className="luxury-card rounded-3xl p-6 md:p-8 border border-amber-500/40 bg-gradient-to-r from-[#200008] via-[#111622] to-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest block">
            "MEMBERS SHOP FIRST. MEMBERS SAVE MORE."
          </span>
          <h2 className="text-2xl font-extrabold text-white">Unlock Exclusive Partner Discounts & Early Sales</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Join Platform Membership for ₹499/yr and get 24-hour early access to rare bottle drops and member-only pricing across Gurgaon & Faridabad.
          </p>
        </div>

        <button
          onClick={() => onNavigate('membership')}
          className="px-7 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-xl gold-glow shrink-0"
        >
          View Membership Plans
        </button>
      </div>

      {/* 📦 BULK ORDERS BANNER */}
      <div className="luxury-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
            <PackageCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Planning a Wedding or Corporate Event?</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Get custom bulk quantity pricing quotes from verified partner outlets.</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('bulk-orders')}
          className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-amber-500 hover:text-black text-white text-xs font-extrabold transition-colors shrink-0"
        >
          Request Bulk Quote
        </button>
      </div>

    </div>
  );
};

/* Modern Clean E-Commerce Product Card (Darumandu & Beer Basket Inspired) */
function ModernProductCard({
  product,
  isFav,
  onToggleFav,
  onAddToCart,
  onClick,
}: {
  product: Product;
  isFav: boolean;
  onToggleFav: () => void;
  onAddToCart: () => void;
  onClick: () => void;
}) {
  const savings = product.regularPrice - product.memberPrice;

  return (
    <div
      onClick={onClick}
      className="w-56 sm:w-64 shrink-0 snap-start luxury-card rounded-3xl p-4 cursor-pointer group flex flex-col justify-between relative space-y-3 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all"
    >
      {/* Origin Badge & Heart Button */}
      <div className="flex items-center justify-between gap-1 absolute top-3 left-3 right-3 z-10 pointer-events-none">
        <span className={`font-extrabold text-[9px] uppercase px-2.5 py-0.5 rounded-md shadow ${
          product.originType === 'IMPORTED' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
        }`}>
          {product.originType === 'IMPORTED' ? `IMPORTED • ${product.originCountry}` : 'LOCAL • INDIA'}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFav();
          }}
          className="p-1.5 rounded-full luxury-card text-slate-700 dark:text-white hover:text-rose-500 pointer-events-auto"
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Image Box */}
      <div className="h-48 rounded-2xl bg-slate-100 dark:bg-slate-950 p-3 flex items-center justify-center relative overflow-hidden mt-5 border border-slate-200 dark:border-slate-800/80">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {savings > 0 && (
          <span className="absolute bottom-2 left-2 bg-rose-500 text-white font-extrabold text-[9px] px-2 py-0.5 rounded shadow">
            SAVE {formatINR(savings)}
          </span>
        )}
      </div>

      {/* Brand & Title */}
      <div className="space-y-1">
        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-extrabold uppercase tracking-wider block">
          {product.brandName} • {product.category}
        </span>
        <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-amber-500 transition-colors">
          {product.productName}
        </h3>
        {product.tastingNotes && (
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
            Notes: {product.tastingNotes.slice(0, 2).join(', ')}
          </span>
        )}
      </div>

      {/* Pricing & Add to Cart */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[9px] text-slate-400 block font-semibold uppercase">MEMBER PRICE</span>
            <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">
              {formatINR(product.memberPrice)}
            </span>
          </div>

          <span className="text-xs text-slate-400 line-through font-semibold">
            {formatINR(product.regularPrice)}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 group-hover:bg-amber-500 group-hover:text-black text-white text-xs font-extrabold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
