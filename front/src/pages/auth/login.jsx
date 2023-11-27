import GenericButton from "@/components/GenericButton";
import Input from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/providers/AuthProvider";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { useTranslation } from "next-i18next";

export default function Login() {
  const { createToastMessage } = useToast();
  const { user, isLogged } = useAuthContext();
  const { login } = useAuth();
  const { t, i18n } = useTranslation("loginPage");

  const [formData, setFormData] = useState({
    firstname: "email@email.com",
    lastname: "email@email.com",
    email: "email@email.com",
    password: "email@email.com",
  });
  const router = useRouter();

  const handleInputEmailChange = (value) => {
    setFormData({ ...formData, email: value });
  };

  const handleInputPasswordChange = (value) => {
    setFormData({ ...formData, password: value });
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const { email, password } = formData;
    if (email === "" || password === "") {
      createToastMessage("error", "Email and password are required");
      return;
    }
    try {
      await login(formData);
    } catch (error) {
      createToastMessage("error", error);
    }
  };

  useEffect(() => {
    const goToProfilePage = async () => {
      if (isLogged === true && user) {
        await router.push("/profile");
      }
    };

    goToProfilePage();
  }, [user, isLogged, router]);

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Connexion
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Connectez-vous pour proposer/rechercher des cours à domicile !
          </p>

          {/* {t('login')}
            <br/>
            <br/>
            <br/>

            {isLogged ? "Logged" : "Not logged"}
            <br/>
            <br/>

                <br/> */}

          <form
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            onSubmit={handleSubmitLogin}
          >
            <p className="text-center text-lg font-medium">
              Connexion à votre compte
            </p>

            <div>
              <Input
                label="Email"
                type="email"
                placeholder="Email"
                onChange={handleInputEmailChange}
                value={formData.email}
              />
            </div>
            <div>
              <Input
                label="Password"
                type="Password"
                placeholder="Password"
                onChange={handleInputPasswordChange}
                value={formData.password}
              />
            </div>
            <GenericButton label="Login" />
            <p className="text-center text-sm text-gray-500">
              Pas encore de compte ?
              <Link href="/auth/register" className="underline">
                Inscription
              </Link>
            </p>
            <p className="text-center text-sm text-gray-500">
              Mot de passe oublié ?
              <Link className="underline" href="/reset-password/ask">
                Réinitialiser mot de passe
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
