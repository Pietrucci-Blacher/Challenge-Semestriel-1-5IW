import React, { useState } from "react";
import Input from "@/components/Input";

export default function PasswordResetForm({ onSubmit }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setError("");
    onSubmit(password);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input
          label="Nouveau mot de passe"
          onChange={setPassword}
          required
          value={password}
          type="password"
          id="password"
        />
        <Input
          label="Confirmer le mot de passe"
          onChange={setConfirmPassword}
          required
          value={confirmPassword}
          type="password"
          id="confirmPassword"
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Réinitialiser le mot de passe</button>
    </form>
  );
}
