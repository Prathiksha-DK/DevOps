import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ta" | "hi";

interface Translations {
    [key: string]: {
        en: string;
        ta: string;
        hi: string;
    };
}

export const translations: Translations = {
    settings: {
        en: "Settings",
        ta: "அமைப்புகள்",
        hi: "सेटिंग्स",
    },
    goBack: {
        en: "Go Back",
        ta: "திரும்பிச் செல்",
        hi: "वापस जाओ",
    },
    profileInfo: {
        en: "Profile Info",
        ta: "சுயவிவரத் தகவல்",
        hi: "प्रोफ़ाइल जानकारी",
    },
    language: {
        en: "Language",
        ta: "மொழி",
        hi: "भाषा",
    },
    logout: {
        en: "Logout",
        ta: "வெளியேறு",
        hi: "लॉगआउट",
    },
    name: {
        en: "Name",
        ta: "பெயர்",
        hi: "नाम",
    },
    mobile: {
        en: "Mobile",
        ta: "கைபேசி",
        hi: "मोबाइल",
    },
    city: {
        en: "City",
        ta: "நகரம்",
        hi: "शहर",
    },
    state: {
        en: "State",
        ta: "மாநிலம்",
        hi: "राज्य",
    },
    role: {
        en: "Role",
        ta: "பணி",
        hi: "भूमिका",
    },
    worker: {
        en: "Worker",
        ta: "தொழிலாளி",
        hi: "कर्मचारी",
    },
    contractor: {
        en: "Contractor",
        ta: "ஒப்பந்ததாரர்",
        hi: "ठेकेदार",
    },
    workDetails: {
        en: "Work Details",
        ta: "வேலை விவரங்கள்",
        hi: "काम का विवरण",
    },
    companyDetails: {
        en: "Company Details",
        ta: "நிறுவனத்தின் விவரங்கள்",
        hi: "कंपनी का विवरण",
    },
    skill: {
        en: "Skill",
        ta: "திறன்",
        hi: "कौशल",
    },
    experience: {
        en: "Experience",
        ta: "அனுபவம்",
        hi: "अनुभव",
    },
    workLocation: {
        en: "Work Location",
        ta: "வேலை இடம்",
        hi: "कार्यस्थल",
    },
    dailyWage: {
        en: "Daily Wage",
        ta: "தினசரி கூலி",
        hi: "दैनिक वेतन",
    },
    apply: {
        en: "Apply",
        ta: "விண்ணப்பிக்கவும்",
        hi: "लागू करें",
    },
    callNow: {
        en: "Call Now",
        ta: "இப்போதே அழைக்கவும்",
        hi: "अभी कॉल करें",
    },
    postJob: {
        en: "Post New Job",
        ta: "புதிய வேலையை பதிவிடவும்",
        hi: "नई नौकरी पोस्ट करें",
    },
    nearbyWorkers: {
        en: "Available Workers Nearby",
        ta: "அருகிலுள்ள தொழிலாளர்கள்",
        hi: "आसपास के उपलब्ध कर्मचारी",
    },
    rating: {
        en: "Rating",
        ta: "மதிப்பீடு",
        hi: "रेटिंग",
    },
    topSkill: {
        en: "Best At",
        ta: "சிறந்த பணி",
        hi: "सबसे अच्छा काम",
    },
    rate: {
        en: "Rate",
        ta: "கட்டணம்",
        hi: "दर",
    },
    login: {
        en: "Login",
        ta: "உள்நுழை",
        hi: "लॉगिन",
    },
    signup: {
        en: "Sign Up",
        ta: "பதிவு செய்க",
        hi: "साइन अप करें",
    },
    loginHeading: {
        en: "Login to your account",
        ta: "உங்கள் கணக்கில் உள்நுழையவும்",
        hi: "अपने खाते में लॉगिन करें",
    },
    signupHeading: {
        en: "Create a new account",
        ta: "புதிய கணக்கை உருவாக்கவும்",
        hi: "एक नया खाता बनाएँ",
    },
    dontHaveAccount: {
        en: "Don't have an account? Sign Up",
        ta: "கணக்கு இல்லையா? பதிவு செய்க",
        hi: "खाता नहीं है? साइन अप करें",
    },
    alreadyHaveAccount: {
        en: "Already have an account? Login",
        ta: "ஏற்கனவே கணக்கு வைத்திருக்கிறீர்களா? உள்நுழையவும்",
        hi: "पहले से ही एक खाता है? लॉगिन करें",
    },
    password: {
        en: "Password",
        ta: "கடவுச்சொல்",
        hi: "पासवर्ड",
    },
    confirmPassword: {
        en: "Confirm Password",
        ta: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
        hi: "पासवर्ड की पुष्टि करें",
    },
    authFailed: {
        en: "Authentication failed",
        ta: "அங்கீகாரம் தோல்வியடைந்தது",
        hi: "प्रमाणीकरण विफल रहा",
    },
    enterCredentials: {
        en: "Enter mobile & password",
        ta: "கைபேசி எண் மற்றும் கடவுச்சொல்லை உள்ளிடவும்",
        hi: "मोबाइल और पासवर्ड दर्ज करें",
    },
    passwordMismatch: {
        en: "Password mismatch",
        ta: "கடவுச்சொல் பொருந்தவில்லை",
        hi: "पासवर्ड मेल नहीं खाता",
    },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof typeof translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>("en");

    const t = (key: keyof typeof translations): string => {
        return (translations[key]?.[language] || String(key)) as string;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
