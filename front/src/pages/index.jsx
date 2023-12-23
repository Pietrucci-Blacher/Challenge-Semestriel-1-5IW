import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../next-i18next.config";
import { useTranslation } from "next-i18next";
import Feedback from "@/components/Feedback";
import {Button} from "flowbite-react";

export default function Index() {
  const { t, i18n } = useTranslation("common");
  const changeTo = i18n.language === "fr" ? "en" : "fr";

  const clientSideLanguageChange = (newLocale) => {
    i18n.changeLanguage(newLocale);
  };

  return (
    <div>
      {t("home")}
      <br />
      <Link href="/auth/login">Login</Link>

      <br />
      <br />
      <Link href="/auth/register">Register</Link>
      <br />
      <Link href="/" locale={changeTo}>
        <button>{t("change-locale", { changeTo })}</button>
      </Link>
      <Button>Ouvrir Modal</Button>
      <Feedback showFeedback="establishment"/>
    </div>
  );
}

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      // pass the translation props to the page component
      ...(await serverSideTranslations(
        locale ?? "fr",
        ["common", "loginPage"],
        nextI18NextConfig,
      )),
    },
  };
}
