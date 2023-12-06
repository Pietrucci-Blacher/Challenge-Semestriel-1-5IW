import {useEstablishment} from "@/hooks/useEstablishment";
import {useEffect, useState} from "react";
import {TeamCard} from "@/components/TeamCard";
import Input from "@/components/Input";
import GenericButton from "@/components/GenericButton";
import {Breadcrumb, Button, Label, Modal, Select} from "flowbite-react";
import {HiHome} from "react-icons/hi";

export default function Team() {
    const {establishments, getMyEstablishments} = useEstablishment()
    useEffect(() => {
        getMyEstablishments()
    }, []);
    const [formData, setFormData] = useState({
        email: "",
        establishment: ""
    })
    const onMemberReinvite = async (memberId) => {
        console.log("onMemberReinvite", memberId)
    };

    const onMemberRemove = async (memberId) => {
        console.log("onMemberRemove", memberId)

    };
    const handleInputEmailChange = (value) => {
        setFormData({...formData, email: value})
    }
    const handleInputSelectChange = (event) => {
        const idEstablishment = event.target.value
        const establishment = `/establishments/${idEstablishment}`
        setFormData({...formData, establishment: establishment})
    }
    const handleSubmitAddMember = (event) => {
        event.preventDefault()
        console.log("formDa", formData)
    }
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        console.log("ok")

        setShowModal(false)
    }
    const openModal = () => {
        console.log("ok")
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
            <div className="my-4">
                <div>
                    <div className="flex items-center">
                        <h2 className="mr-2">
                            Cette Page affiche la liste des equipes par etablishement
                        </h2>
                        <Button size="xs" onClick={openModal}>Inviter un membre</Button>

                    </div>
                </div>

                <div>
                    {establishments && establishments.map((establishment) => (
                        <TeamCard onReinviteMember={onMemberReinvite} onRemoveMember={onMemberRemove}
                                  establishment={establishment} key={establishment?.id}/>
                    ))}
                </div>
            </div>
            <Modal show={showModal} onClose={closeModal} size="sm">
                <Modal.Header>Inviter un professeur a rajoindre votre etablissement</Modal.Header>
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