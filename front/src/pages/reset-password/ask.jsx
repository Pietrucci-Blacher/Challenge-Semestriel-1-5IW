import { useResetPassword } from "@/hooks/useResetPassword";
import { useState } from "react";
import Input from "@/components/Input";

export default function AskResetPassword() {
  const [email, setEmail] = useState("");
  const { askResetPassword, isLoading, error } = useResetPassword();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await askResetPassword(email);
  };

  return (
    <div>
      <h1>Mot de passe oublié</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            onChange={setEmail}
            value={email}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Envoi en cours..." : "Réinitialiser le mot de passe"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
