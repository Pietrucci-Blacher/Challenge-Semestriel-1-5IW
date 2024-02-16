import { createContext, useContext, useState, useEffect } from 'react';
import {loadTranslationsService} from "@/services/translationService";

const TranslationContext = createContext();

export const useTranslationContext = () => useContext(TranslationContext);

export const TranslationProvider = ({ children }) => {
    const [language, setLanguage] = useState('fr');
    const [translations, setTranslations] = useState({});
    const t = (key) => translations[key] || key;

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    useEffect(() => {
        const loadTranslations = async () => {
            const data = await loadTranslationsService(language)
            setTranslations(data);
        };

        loadTranslations();
    }, [language]);

    return (
        <TranslationContext.Provider value={{ translations, changeLanguage, language, t }}>
            {children}
        </TranslationContext.Provider>
    );
};
