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
} from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockBackend } from '../../services/mockBackend';
import { formatINR, formatDistance, calculateDistanceKm, isOutletOpen } from '../../utils/formatters';
import { DutyFreeProduct } from '../../utils/seedData';

interface HomeViewProps {
  onNavigate: (view: string, id?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { district, selectedArea, userCoords } = useLocation();
  const { preferences, toggleFavouriteProduct, toggleFavouriteOutlet } = useAuth();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const outlets = mockBackend.getOutlets(district);
  const products = mockBackend.getProducts() as DutyFreeProduct[];

  // Featured Gold Champagne Hero Product
  const goldChampagne = products.find((p) => p.id === 'p_gold_champagne') || products[0];

  const categories = [
    { id: 'ALL', label: t('allProducts') },
    { id: 'DUTY_FREE', label: t('dutyFreeExclusives') },
    { id: 'Single Malt', label: t('singleMalts') },
    { id: 'Wine', label: t('champagnesWines') },
    { id: 'Gin', label: t('ginSpirits') },
    { id: 'Vodka', label: t('vodka') },
    { id: 'Beer', label: t('beers') },
  ];

  const dutyFreeExclusives = products.filter((p) => p.isDutyFreeExclusive || p.discountPercentage);
  const singleMalts = products.filter((p) => p.category === 'Single Malt');
  const champagnes = products.filter((p) => p.category === 'Wine');

  return (
    <div className="space-y-8 pb-24 pt-2 px-4 max-w-7xl mx-auto">
      
      {/* 🏆 TOP HERO BANNER: GOLD CHAMPAGNE SPOTLIGHT */}
      <div className="relative rounded-3xl overflow-hidden luxury-card border border-amber-500/40 p-6 md:p-10 bg-gradient-to-r from-[#FFFBF0] via-[#F8FAFC] to-[#F1F5F9] dark:from-[#171209] dark:via-[#0F131D] dark:to-[#080A0F]">
        
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/30 text-xs font-extrabold">
              <Tag className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('heroTag')}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
              <span className="gold-gradient-text">{goldChampagne.productName}</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              {goldChampagne.description}
            </p>

            {/* Price & Offer Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block uppercase">{t('dutyFreePrice')}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
                    {formatINR(goldChampagne.dutyFreePrice || 31900)}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {formatINR(goldChampagne.mrpGuide['750ml'])}
                  </span>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

              <div className="flex items-center gap-1.5 bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/30 px-3 py-1.5 rounded-xl text-xs font-bold">
                <Percent className="w-4 h-4 text-rose-500" />
                <span>{t('saveInstantly')}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 justify-center lg:justify-start">
              <button
                onClick={() => onNavigate('product-detail', goldChampagne.id)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs shadow-xl gold-glow transition-all flex items-center justify-center gap-2"
              >
                <span>{t('viewDetails')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('search')}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl luxury-card text-slate-800 dark:text-slate-200 hover:text-amber-500 text-xs font-bold"
              >
                {t('exploreOffers')}
              </button>
            </div>
          </div>

          {/* Bottle Image Showcase */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative group cursor-pointer" onClick={() => onNavigate('product-detail', goldChampagne.id)}>
              <div className="w-56 h-72 sm:w-64 sm:h-80 rounded-3xl bg-slate-100 dark:bg-slate-950/80 border border-amber-500/30 p-4 flex items-center justify-center relative shadow-2xl">
                <img
                  src={goldChampagne.imageUrl}
                  alt={goldChampagne.productName}
                  className="max-h-full max-w-full object-contain drop-shadow-[0_20px_30px_rgba(212,175,55,0.35)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                {t('rating')}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 🏷️ CATEGORY NAVIGATION BAR */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
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

      {/* 🛍️ DUTY FREE EXCLUSIVES & SPECIAL OFFERS (HORIZONTAL SCROLL) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Tag className="w-4.5 h-4.5 text-amber-500" />
              {t('dutyFreeOffersTitle')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('dutyFreeOffersSub')}</p>
          </div>

          <button
            onClick={() => onNavigate('search')}
            className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 hover:underline"
          >
            {t('seeAll')} <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2">
          {dutyFreeExclusives.map((product) => (
            <DutyFreeProductCard
              key={product.id}
              product={product}
              isFav={preferences.favourites.products.includes(product.id)}
              onToggleFav={() => toggleFavouriteProduct(product.id)}
              onClick={() => onNavigate('product-detail', product.id)}
            />
          ))}
        </div>
      </div>

      {/* 🥃 SINGLE MALTS & FINE SCOTCH (HORIZONTAL SCROLL) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Crown className="w-4.5 h-4.5 text-amber-500" />
              {t('singleMaltsTitle')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('singleMaltsSub')}</p>
          </div>

          <button
            onClick={() => onNavigate('search')}
            className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 hover:underline"
          >
            {t('seeAll')} <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2">
          {singleMalts.map((product) => (
            <DutyFreeProductCard
              key={product.id}
              product={product}
              isFav={preferences.favourites.products.includes(product.id)}
              onToggleFav={() => toggleFavouriteProduct(product.id)}
              onClick={() => onNavigate('product-detail', product.id)}
            />
          ))}
        </div>
      </div>

      {/* 🍾 CHAMPAGNES & FINE WINES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-amber-500" />
              {t('champagnesTitle')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('champagnesSub')}</p>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2">
          {champagnes.map((product) => (
            <DutyFreeProductCard
              key={product.id}
              product={product}
              isFav={preferences.favourites.products.includes(product.id)}
              onToggleFav={() => toggleFavouriteProduct(product.id)}
              onClick={() => onNavigate('product-detail', product.id)}
            />
          ))}
        </div>
      </div>

      {/* 📍 VERIFIED LICENSED OUTLETS ({district}) */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Compass className="w-4.5 h-4.5 text-amber-500" />
              {t('verifiedOutletsTitle')} ({district})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('verifiedOutletsSub')}</p>
          </div>

          <button
            onClick={() => onNavigate('map')}
            className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 hover:underline"
          >
            {t('mapView')} <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {outlets.map((outlet) => {
            const distance = calculateDistanceKm(userCoords, outlet.geoPoint);
            const isOpen = isOutletOpen(outlet.hours.open, outlet.hours.close);

            return (
              <div
                key={outlet.id}
                onClick={() => onNavigate('outlet-detail', outlet.id)}
                className="luxury-card rounded-2xl p-4 cursor-pointer group space-y-3 flex flex-col justify-between"
              >
                <div className="relative h-32 rounded-xl overflow-hidden">
                  <img
                    src={outlet.images[0]}
                    alt={outlet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <span className={`absolute bottom-2 left-2 px-2 py-0.5 rounded font-extrabold text-[10px] ${
                    isOpen ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {isOpen ? t('openNow') : t('closed')}
                  </span>

                  <span className="absolute bottom-2 right-2 text-white font-bold text-[11px] bg-black/60 px-2 py-0.5 rounded">
                    📍 {formatDistance(distance)}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                    <CheckCircle2 className="w-3 h-3" /> {t('verifiedExcise')}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {outlet.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{outlet.address}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                    {t('viewCatalogue')} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

/* Delhi Duty Free Inspired Clean Product Card */
function DutyFreeProductCard({
  product,
  isFav,
  onToggleFav,
  onClick,
}: {
  product: DutyFreeProduct;
  isFav: boolean;
  onToggleFav: () => void;
  onClick: () => void;
}) {
  const { t } = useLanguage();

  return (
    <div
      onClick={onClick}
      className="w-56 sm:w-64 shrink-0 snap-start luxury-card rounded-2xl p-4 cursor-pointer group flex flex-col justify-between relative space-y-3"
    >
      {/* Discount / Duty Free Ribbon */}
      {product.discountPercentage && (
        <span className="absolute top-3 left-3 z-10 bg-rose-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow">
          {product.discountPercentage}% OFF
        </span>
      )}

      {/* Heart Save Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFav();
        }}
        className="absolute top-3 right-3 p-1.5 rounded-full luxury-card text-slate-700 dark:text-white hover:text-rose-500 z-10"
      >
        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
      </button>

      {/* Product Image Box */}
      <div className="h-44 rounded-xl bg-slate-100 dark:bg-slate-950 p-3 flex items-center justify-center relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
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

      {/* Pricing & CTA */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[9px] text-slate-400 block font-semibold">{t('dutyFreePrice')}</span>
            <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
              {formatINR(product.dutyFreePrice || Object.values(product.mrpGuide)[0])}
            </span>
          </div>

          {product.dutyFreePrice && (
            <span className="text-[10px] text-slate-400 line-through">
              {formatINR(product.mrpGuide['750ml'] || Object.values(product.mrpGuide)[0])}
            </span>
          )}
        </div>

        <button className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-amber-500 group-hover:text-black text-slate-800 dark:text-slate-200 text-xs font-extrabold transition-colors flex items-center justify-center gap-1">
          <span>{t('viewDetails')}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
