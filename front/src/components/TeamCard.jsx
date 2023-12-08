import {Badge, Card, Modal} from 'flowbite-react';
import {Button} from 'flowbite-react';
import {HiTrash, HiMail} from 'react-icons/hi';
import {useState} from "react";

export function TeamCard({establishment, onReinviteMember, onRemoveMember}) {
    const {teamMembers, ...establishmentInfo} = establishment
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [memberIdToDelete, setMemberIdToDelete] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null)
    const getUserToDelete = (memberId) => teamMembers.find((team) => team.id === memberId)

    const openConfirmModal = (memberId) => {
        const userToDelete = getUserToDelete(memberId)
        setUserToDelete(userToDelete)
        setMemberIdToDelete(memberId);
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        setMemberIdToDelete(null);
        setShowConfirmModal(false);
    };

    const deleteMember = () => {
        console.log("called")
        onRemoveMember(memberIdToDelete)
        closeConfirmModal()
    }
    return (
        <>
            <Card className="max-w-lg w-1/2 mx-4 mb-8">
                <div className="flex items-center justify-between">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Equipe
                        pour {establishment?.name}</h5>
                </div>
                <div className="flow-root">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            teamMembers.length > 0 ? teamMembers.map((element, index) => (
                                <li className="py-3 sm:py-4" key={index}>
                                    <div className="flex items-center space-x-4">
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                                {element.member.lastname} {element.member.firstname}
                                            </p>
                                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                                {element.member.email}
                                            </p>
                                        </div>
                                        <Badge color={
                                            element.status === 'Pending' ? 'warning' :
                                                element.status === 'Approved' ? 'success' :
                                                    element.status === 'Declined' ? 'failure' :
                                                        'info'
                                        }>
                                            {element.status}
                                        </Badge>
                                        <Button>
                                            <HiMail onClick={()=> onReinviteMember(element.id)}/>
                                        </Button>
                                        <Button onClick={() => openConfirmModal(element.id)}>
                                            <HiTrash/>
                                        </Button>
                                    </div>
                                </li>
                            )) : (
                                <li className="py-3 sm:py-4">
                                    Pas de membre
                                </li>
                            )
                        }
                    </ul>
                </div>
            </Card>
            <Modal show={showConfirmModal} onClose={closeConfirmModal}>
                <Modal.Header>Confirmer la supression</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Vous etes sur le point de supprimer cet utilisateur de votre team:
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Name : {userToDelete?.member?.lastname} {userToDelete?.member?.firstname}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Email : {userToDelete?.member?.email}
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="failure" onClick={deleteMember}>Supprimer</Button>
                    <Button color="gray" onClick={closeConfirmModal}>
                        Retour
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}