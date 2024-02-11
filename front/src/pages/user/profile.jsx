import { useAuthContext } from '@/providers/AuthProvider';
import { useEffect, useState } from 'react';
import Input from '@/components/Input';
import GenericButton from '@/components/GenericButton';
import { Button, Button as FlowbiteButton, Tabs } from 'flowbite-react';
import PasswordResetForm from '@/components/PasswordResetForm';
import useUserAccount from '@/hooks/useUserAccount';
import Link from 'next/link';
import { HiAdjustments, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { useTeam } from '@/hooks/useTeam';
import MapComponent from '@/components/Map';

export default function Profile() {
    const { acceptInvite, declineInvite } = useTeam();
    const { user, verifyUser, fetchUser } = useAuthContext();
    const { userProfile, updateProfile } = useUserAccount(user?.id);
    const [formData, setFormData] = useState({ ...userProfile });
    const [pendingRequests, setPendingRequests] = useState([]);

    const getPendingRequest = (requests = []) => {
        return requests.filter((request) => request.status === 'pending');
    };

    useEffect(() => {
        if (!user) {
            verifyUser();
        } else {
            const pendingRequests = getPendingRequest(userProfile?.teamMembers);
            setPendingRequests(pendingRequests);
            setFormData({ ...userProfile });
        }
    }, [user, userProfile, verifyUser]);

    const handleFirstNameChange = (value) => {
        setFormData({ ...formData, firstname: value });
    };
    const handleLastNameChange = (value) => {
        setFormData({ ...formData, lastname: value });
    };
    const handleEmailChange = (value) => {
        setFormData({ ...formData, email: value });
    };

    const handleProfileUpdateSubmit = async (event) => {
        event.preventDefault();
        await updateProfile(formData);
        fetchUser();
    };

    const handlePasswordResetSubmit = async (password) => {
        await updateProfile({ password });
    };

    if (!user) {
        return <div>Chargement...</div>;
    }

    const acceptDemand = async (id) => {
        acceptInvite({ id });
    };
    const declineDemand = async (id) => {
        declineInvite({ id });
    };
    return (
        <Tabs aria-label="Default tabs" style="default">
            <Tabs.Item title="Dashboard" icon={MdDashboard} active>
                <div>
                    {pendingRequests.length > 0 && (
                        <div>
                            <h2>
                                Mes demandes en attentes pour rejoindre des
                                etablissements
                            </h2>
                            {pendingRequests.map((request) => (
                                <div key={request.id}>
                                    <span>{request.establishment.name}</span>
                                    <span>{request.status}</span>
                                    <Button
                                        onClick={() => acceptDemand(request.id)}
                                    >
                                        Accepter la demande
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            declineDemand(request.id)
                                        }
                                    >
                                        Refuser la demande
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <FlowbiteButton
                    as={Link}
                    href="/apply-to-be-provider"
                    outline
                    gradientDuoTone="cyanToBlue"
                >
                    Faire une demande pour devenir prestataire
                </FlowbiteButton>
                <MapComponent></MapComponent>
            </Tabs.Item>
            <Tabs.Item title="Profile" icon={HiUserCircle}>
                This is{' '}
                <span className="font-medium text-gray-800 dark:text-white">
                    Dashboard tab&apos;s associated content
                </span>
                . Clicking another tab will toggle the visibility of this one
                for the next. The tab JavaScript swaps classes to control the
                content visibility and styling.
            </Tabs.Item>

            <Tabs.Item title="Modifier ton profile" icon={HiAdjustments}>
                <h2>profile role {user?.roles}</h2>
                {user ? (
                    <>
                        <form onSubmit={handleProfileUpdateSubmit}>
                            <div>
                                <Input
                                    label="firstname"
                                    type="text"
                                    placeholder="firstname"
                                    onChange={handleFirstNameChange}
                                    value={formData.firstname}
                                />
                                <Input
                                    label="lastname"
                                    type="text"
                                    placeholder="lastname"
                                    onChange={handleLastNameChange}
                                    value={formData.lastname}
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={handleEmailChange}
                                    value={formData.email}
                                />
                            </div>
                            <GenericButton label="Update Profile" />
                        </form>
                        <PasswordResetForm
                            onSubmit={handlePasswordResetSubmit}
                        />
                    </>
                ) : (
                    <div>Chargement...</div>
                )}
            </Tabs.Item>
        </Tabs>
    );
}
