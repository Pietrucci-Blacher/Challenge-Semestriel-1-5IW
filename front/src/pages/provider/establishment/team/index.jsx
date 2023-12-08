import {useEstablishment} from "@/hooks/useEstablishment";
import {useEffect, useState} from "react";
import {TeamCard} from "@/components/TeamCard";
import Input from "@/components/Input";
import GenericButton from "@/components/GenericButton";
import {Breadcrumb, Button, Label, Modal, Select} from "flowbite-react";
import {HiHome} from "react-icons/hi";
import {useTeamMember} from "@/hooks/useTeamMember";

export default function Team() {
    const {establishments, getMyEstablishments} = useEstablishment()
    const {addMemberToTeam, reInviteMemberToTeam, removeMemberFromTeam} = useTeamMember()
    useEffect(() => {
        getMyEstablishments()
    }, []);
    const [formData, setFormData] = useState({
        email: "email5@email.com",
        establishment: ""
    })

    const onMemberReinvite = async (memberId) => {
        console.log("onMemberReinvite", memberId)
        try {
            reInviteMemberToTeam({teamMemberId:memberId})
        }
        catch (e) {
            console.error("error reinvitation member", e)
        }
    };

    const onMemberRemove = async (memberId) => {
        try {
            await removeMemberFromTeam({id:memberId})
        }
        catch (e) {
            console.error("error supression member", e)
        }
        getMyEstablishments()
    };

    const handleInputEmailChange = (value) => {
        setFormData({...formData, email: value})
    }

    const handleInputSelectChange = (event) => {
        const idEstablishment = event.target.value
        const establishment = `/establishments/${idEstablishment}`
        setFormData({...formData, establishment: establishment})
    }

    const handleSubmitAddMember = async (event) => {
        event.preventDefault()
        try {
            await addMemberToTeam(formData)
        }
        catch (e) {
            console.error("error pendant le rajout d'un membre", e)
        }
        getMyEstablishments()
        closeModal()
    }
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setFormData({...formData, establishment: "establishment", email: ""})
        setShowModal(false)
    }
    const openModal = () => {
        setShowModal(true)
    }
    return (
        <>
            <Breadcrumb aria-label="Default breadcrumb example">
                <Breadcrumb.Item href="#" icon={HiHome}>
                    Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/provider/establishment/">Etablissement</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Mes equipes</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt-4">
                <div className="my-8">
                    <div className="flex items-center">
                        <h2 className="mr-2">
                            Cette Page affiche la liste des equipes par etablishement
                        </h2>
                        <Button size="xs" onClick={openModal}>Inviter un membre</Button>
                    </div>
                </div>

                <div className="flex flex-row flex-wrap">
                    {establishments && establishments.map((establishment) => (
                        <TeamCard onReinviteMember={onMemberReinvite} onRemoveMember={onMemberRemove}
                                  establishment={establishment} key={establishment?.id}/>
                    ))}
                </div>
            </div>
            <Modal show={showModal} onClose={closeModal} size="sm">
                <Modal.Header>Inviter un membre a rajoindre votre etablissement</Modal.Header>
                <Modal.Body>
                    <form className="flex flex-col gap-4 " onSubmit={handleSubmitAddMember}>
                        <div>
                            <Input label="Email" type="email" placeholder="Email" onChange={handleInputEmailChange}
                                   value={formData.email}/>
                        </div>
                        <div className="">
                            <div className="mb-2 block">
                                <Label htmlFor="countries" value="Selectionnez une etablissement"/>
                            </div>
                            <Select id="countries" required onChange={handleInputSelectChange}>
                                <option value=""></option>
                                {establishments && establishments.map((establishment) => (
                                    <option value={establishment?.id}
                                            key={establishment?.id}>{establishment?.name}</option>
                                ))}
                            </Select>
                        </div>
                        <GenericButton label="Inviter"/>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}