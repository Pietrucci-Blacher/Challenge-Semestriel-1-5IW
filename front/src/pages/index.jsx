import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../next-i18next.config";
import { useTranslation } from "next-i18next";

export default function Index() {
  const { t, i18n } = useTranslation("common");
  const changeTo = i18n.language === "fr" ? "en" : "fr";

  const clientSideLanguageChange = (newLocale) => {
    i18n.changeLanguage(newLocale);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">{t('home')}</h1>
      <Link href="/auth/login" className="text-blue-500 underline mb-2">
        Login
      </Link>
      <Link href="/auth/register" className="text-blue-500 underline mb-2">
        Register
      </Link>
      <Link href="/" locale={changeTo}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4">
          {t('change-locale', { changeTo })}
        </button>
      </Link>
    </div>
  );
}

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      // pass the translation props to the page component
      ...(await serverSideTranslations(locale ?? "fr", ["common", "loginPage"], nextI18NextConfig)),
    },
  };
}
