import Link from "next/link";

export default function Index(){


    const clientSideLanguageChange = (newLocale) => {
        i18n.changeLanguage(newLocale);
    }
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
