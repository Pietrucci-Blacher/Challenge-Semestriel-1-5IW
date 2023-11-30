import nextI18NextConfig from "../../../next-i18next.config";
import {useTranslation} from "next-i18next";
import LanguageSwitchLink  from "@/components/LanguageSwitch";
import Link from "@/components/Link";
import {makeStaticProps, getStaticPaths} from "@/libs/getStatic";
import {router} from "next/client";

const Index = () => {
    const { t , i18n} = useTranslation("common");
    const currentLocale = router.query.locale || nextI18NextConfig.i18n.defaultLocale;

    return (
        <div>
            {t('home')}
            <br/>
            <Link href="/auth/login">Login</Link>

            <br/>
            <br/>
            <Link href="/auth/register">Register</Link>
            <br/>
            {nextI18NextConfig.i18n.locales.map(locale => {
                if (locale === currentLocale) return null
                return <LanguageSwitchLink locale={locale} key={locale} />
            })}
        </div>
    )
}

export default Index;
const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }
