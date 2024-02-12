import React, { useState } from 'react';
import Input from '@/components/Input';
import GenericButton from '@/components/GenericButton';


export default function PasswordResetForm({ onSubmit }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        setError('');
        onSubmit(password);
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <form 
            className='flex max-w-md flex-col gap-4'
            onSubmit={handleSubmit}>
            <div>
                <Input
                    label="Nouveau mot de passe"
                    onChange={setPassword}
                    required
                    value={password}
                    type="password"
                    id="password"
                    className="block w-full py-1 "
                />
                <Input
                    label="Confirmer le mot de passe"
                    onChange={setConfirmPassword}
                    required
                    value={confirmPassword}
                    type="password"
                    id="confirmPassword"
                    className="block w-full py-1 "
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}    
            <GenericButton label="Réinitialiser le mot de passe" />
        </form>
    );
}
