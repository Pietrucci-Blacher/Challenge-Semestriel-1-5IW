import { createContext, useContext, useState, useEffect } from 'react';
import { loadTranslationsService } from "@/services/translationService";

const TranslationContext = createContext();

export const useTranslationContext = () => useContext(TranslationContext);

export const TranslationProvider = ({ children }) => {
    const [language, setLanguage] = useState('fr');
    const [loadedTranslations, setLoadedTranslations] = useState({});
    const [translations, setTranslations] = useState({});

    const t = (key) => translations[key] || key;

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    useEffect(() => {
        const loadTranslations = async () => {
            if (!loadedTranslations[language]) {
                const data = await loadTranslationsService(language);
                setLoadedTranslations(prev => ({...prev, [language]: data}));
                setTranslations(data);
            } else {
                setTranslations(loadedTranslations[language]);
            }
        };

        loadTranslations();
    }, [language, loadedTranslations]);

    return (
        <TranslationContext.Provider value={{ translations, changeLanguage, language, t }}>
            {children}
        </TranslationContext.Provider>
    );
};
