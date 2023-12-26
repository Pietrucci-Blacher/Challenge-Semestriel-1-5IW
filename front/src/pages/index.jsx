import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../next-i18next.config";
import {useTranslation} from "next-i18next";
import ScheduleSelector from "@/components/ScheduleSelector";
import {useState} from "react";



export default function Index(){
    const { t , i18n} = useTranslation("common");
    const changeTo = i18n.language === "fr" ? "en" : "fr";

    const [select, setSelect] = useState(null)
    const clientSideLanguageChange = (newLocale) => {
        i18n.changeLanguage(newLocale);
    }
    const handleSelect = (data) => {
        setSelect(data)
    };
    const unavailableSlots = [
        { startTime: '2023-12-17T11:30:00+00:00', endTime: '2023-12-17T13:30:00+00:00' },
        { startTime: '2023-12-23T11:30:00+00:00', endTime: '2023-12-23T17:30:00+00:00' },
    ];
    return (
        <div>
            {t('home')}
            <br/>
            <Link href="/auth/login">Login</Link>

            <br/>
            <br/>
            <Link href="/auth/register">Register</Link>
            <br/>
            <Link href="/" locale={changeTo}>
                <button>{t('change-locale', { changeTo })}</button>
            </Link>

            <ScheduleSelector onSelectSchedule={handleSelect} range={90} unavailableSlots={unavailableSlots}/>
        </div>
    )
}


export async function getStaticProps(context) {
    const { locale } = context

    return {
        props: {
            // pass the translation props to the page component
            ...(await serverSideTranslations(locale ?? "fr", ["common", "loginPage"], nextI18NextConfig)),
        },
    }
}
