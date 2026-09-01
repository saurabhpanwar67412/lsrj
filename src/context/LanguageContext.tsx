import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageMode = 'en' | 'hi';

export const TRANSLATIONS = {
  en: {
    brandName: 'LSR',
    subBrand: 'RESERVE',
    tagline: 'Gurgaon & Faridabad Pilot',
    heroTag: 'DUTY FREE EXCLUSIVE • SAVE UP TO 20%',
    heroTitle: 'Armand de Brignac Ace of Spades Gold Champagne',
    heroDesc: 'The iconic prestige cuvée crafted from 100% Grand Cru Chardonnay and Pinot Noir. Notes of peach, brioche, and silky golden citrus.',
    dutyFreePrice: 'Excise Duty Free Price',
    saveInstantly: 'SAVE 17% INSTANTLY',
    viewDetails: 'View Details & Stores',
    exploreOffers: 'Explore All Duty Free Offers',
    rating: '4.9 Rating • 142 Reviews',
    allProducts: 'All Products',
    dutyFreeExclusives: 'Duty Free Exclusives',
    singleMalts: 'Single Malts',
    champagnesWines: 'Champagnes & Wines',
    ginSpirits: 'Gin & Spirits',
    vodka: 'Vodka',
    beers: 'Beers',
    dutyFreeOffersTitle: 'Duty Free Special Offers',
    dutyFreeOffersSub: 'Exclusive prices & free gift accessories on select reserves',
    singleMaltsTitle: 'Single Malts & Rare Whiskies',
    singleMaltsSub: 'Glenfiddich, Macallan & Suntory Hibiki Japanese Reserve',
    champagnesTitle: 'Champagnes & Fine Wines',
    champagnesSub: 'Armand de Brignac, Dom Pérignon & Jacob\'s Creek Shiraz',
    verifiedOutletsTitle: 'Verified Licensed Outlets',
    verifiedOutletsSub: 'Physical Haryana Excise verified stores with live timestamps',
    seeAll: 'See All',
    mapView: 'Map View',
    verifiedExcise: 'VERIFIED EXCISE OUTLET',
    openNow: 'OPEN NOW',
    closed: 'CLOSED',
    inStock: 'In Stock',
    lowStock: 'Low Stock',
    outOfStock: 'Out of Stock',
    checkStock: 'Check Stock',
    viewCatalogue: 'View Catalogue & Prices',
    getDirections: 'Directions',
    discover: 'Discover',
    outletsMap: 'Outlets Map',
    saved: 'Saved',
    account: 'Account',
    ageGateTitle: 'Age & Eligibility Verification',
    ageGateDesc: 'Per Haryana Excise Policy (2025–2027), you must be at least 21 years of age to access liquor outlet discovery in Gurgaon & Faridabad.',
    confirmAge: 'I Confirm I am 21+ Years Old',
    loginSignup: 'Login / Signup',
    enterMobile: 'Enter 10-Digit Mobile Number',
    sendOtp: 'Send Verification Code',
    verifyOtp: 'Verify & Continue',
  },
  hi: {
    brandName: 'एलएसआर',
    subBrand: 'रिजर्व',
    tagline: 'गुड़गांव और फरीदाबाद पायलट',
    heroTag: 'ड्यूटी फ्री खास • 20% तक की बचत',
    heroTitle: 'अरमैंड डी ब्रिग्नैक ऐस ऑफ स्पैड्स गोल्ड शैम्पेन',
    heroDesc: '100% ग्रैंड क्रू शार्डोने और पिनोट नोयर से तैयार की गई प्रतिष्ठित लग्जरी शैम्पेन। आड़ू, ब्रियोचे और रेशमी सुनहरे खट्टे स्वाद।',
    dutyFreePrice: 'आबकारी ड्यूटी फ्री मूल्य',
    saveInstantly: 'तुरंत 17% बचाएं',
    viewDetails: 'विवरण और दुकानें देखें',
    exploreOffers: 'सभी ड्यूटी फ्री ऑफर देखें',
    rating: '★ 4.9 रेटिंग • 142 समीक्षाएं',
    allProducts: 'सभी उत्पाद',
    dutyFreeExclusives: 'ड्यूटी फ्री खास',
    singleMalts: 'सिंगल माल्ट्स',
    champagnesWines: 'शैम्पेन और वाइन',
    ginSpirits: 'जिन और स्पिरिट्स',
    vodka: 'वोदका',
    beers: 'बियर',
    dutyFreeOffersTitle: 'ड्यूटी फ्री खास ऑफर',
    dutyFreeOffersSub: 'विशेष उत्पाद रिजर्व पर विशेष मूल्य और मुफ्त उपहार सामान',
    singleMaltsTitle: 'सिंगल माल्ट्स और दुर्लभ व्हिस्की',
    singleMaltsSub: 'ग्लेनफिडिच, मैकलन और सुंतोरी हिबिकी जापानी रिजर्व',
    champagnesTitle: 'शैम्पेन और बढ़िया वाइन',
    champagnesSub: 'अरमैंड डी ब्रिग्नैक, डोम पेरिग्नन और जैकब्स क्रीक शिराज़',
    verifiedOutletsTitle: 'सत्यापित लाइसेंस्ड दुकानें',
    verifiedOutletsSub: 'लाइव समय-स्टैम्प के साथ भौतिक हरियाणा आबकारी दुकानें',
    seeAll: 'सभी देखें',
    mapView: 'नक्शा देखें',
    verifiedExcise: 'सत्यापित आबकारी दुकान',
    openNow: 'खुला है',
    closed: 'बंद है',
    inStock: 'उपलब्ध है',
    lowStock: 'कम स्टॉक',
    outOfStock: 'स्टॉक खत्म',
    checkStock: 'स्टॉक जांचें',
    viewCatalogue: 'सूची और मूल्य देखें',
    getDirections: 'दिशा-निर्देश',
    discover: 'खोजें',
    outletsMap: 'दुकानें नक्शा',
    saved: 'पसंदीदा',
    account: 'खाता',
    ageGateTitle: 'आयु और पात्रता सत्यापन',
    ageGateDesc: 'हरियाणा आबकारी नीति (2025-2027) के अनुसार, गुड़गांव और फरीदाबाद में शराब की दुकानों की खोज के लिए आपकी आयु कम से कम 21 वर्ष होनी चाहिए।',
    confirmAge: 'मैं पुष्टि करता हूँ कि मेरी आयु 21+ है',
    loginSignup: 'लॉगिन / साइनअप',
    enterMobile: '10 अंकों का मोबाइल नंबर दर्ज करें',
    sendOtp: 'सत्यापन कोड भेजें',
    verifyOtp: 'सत्यापित करें और आगे बढ़ें',
  },
};

interface LanguageContextType {
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof TRANSLATIONS['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageMode>(() => {
    const saved = localStorage.getItem('lsr_lang');
    return saved === 'hi' ? 'hi' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('lsr_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const setLanguage = (lang: LanguageMode) => {
    setLanguageState(lang);
  };

  const t = (key: keyof typeof TRANSLATIONS['en']): string => {
    return TRANSLATIONS[language][key] || TRANSLATIONS['en'][key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
