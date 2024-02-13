import { useAuthContext } from '@/providers/AuthProvider';
import { useEffect, useState } from 'react';
import Input from '@/components/Input';
import GenericButton from '@/components/GenericButton';
import { Badge, Button, Button as FlowbiteButton, Tabs } from 'flowbite-react';
import PasswordResetForm from '@/components/PasswordResetForm';
import useUserAccount from '@/hooks/useUserAccount';
import Link from 'next/link';
import { HiAdjustments, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { useTeam } from '@/hooks/useTeam';

export default function Profile() {
    const {
        userPengingInvitation,
        acceptInvite,
        declineInvite,
        getUserPendingInvitation,
    } = useTeam();
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
            getUserPendingInvitation(user.id);
        }
    }, [user, userProfile, verifyUser, getUserPendingInvitation]);

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
        await acceptInvite({ id });
        getUserPendingInvitation(user.id);
    };
    const declineDemand = async (id) => {
        await declineInvite({ id });
        getUserPendingInvitation(user.id);
    };
    return (
        <Tabs aria-label="Default tabs" style="default">
            <Tabs.Item title="Dashboard" icon={MdDashboard} active>
                <div>
                    {userPengingInvitation.length > 0 && (
                        <div>
                            <h2>
                                Mes demandes en attentes pour rejoindre des
                                etablissements
                            </h2>
                            {userPengingInvitation.map((request) => (
                                <div
                                    className="flex items-center space-x-8 my-2"
                                    key={request.id}
                                >
                                    <span>{request.establishment.name}</span>
                                    <Badge color="warning" className="ml-2">
                                        {request.joinRequestStatus}
                                    </Badge>
                                    <Button.Group>
                                        <Button
                                            color="gray"
                                            onClick={() =>
                                                acceptDemand(request.id)
                                            }
                                        >
                                            Accepter la demande
                                        </Button>
                                        <Button
                                            color="failure"
                                            onClick={() =>
                                                declineDemand(request.id)
                                            }
                                        >
                                            Refuser la demande
                                        </Button>
                                    </Button.Group>
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
            </Tabs.Item>
            <Tabs.Item title="Profile" icon={HiUserCircle}>
                This is
                <span className="font-medium text-gray-800 dark:text-white">
                    Dashboard tab&apos;s associated content
                </span>
                . Clicking another tab will toggle the visibility of this one
                for the next. The tab JavaScript swaps classes to control the
                content visibility and styling.
            </Tabs.Item>

            <Tabs.Item title="Modifier ton profile" icon={HiAdjustments}>
                <h2>Rôle de l'utilisateur : {user?.roles}</h2>
                {user ? (
                    <>
                        <form 
                            className="flex max-w-md flex-col gap-4"
                            onSubmit={handleProfileUpdateSubmit}>
                            <div>
                                <Input
                                    label="firstname"
                                    type="text"
                                    placeholder="firstname"
                                    onChange={handleFirstNameChange}
                                    value={formData.firstname}
                                    className="block w-full py-1 "
                                />
                                <Input
                                    label="lastname"
                                    type="text"
                                    placeholder="lastname"
                                    onChange={handleLastNameChange}
                                    value={formData.lastname}
                                    className="block w-full py-1 "

                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={handleEmailChange}
                                    value={formData.email}
                                    className="block w-full py-1 "

                                />
                            </div>
                            <GenericButton label="Mettre à jour le profile" />
                        </form>
                        <div className='my-4'></div>
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
