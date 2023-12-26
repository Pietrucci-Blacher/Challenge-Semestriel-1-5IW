import {Breadcrumb, Label, Select} from "flowbite-react";
import {HiHome} from "react-icons/hi";
import {Fragment, useEffect, useState} from 'react'
import TeacherCalendar from "@/components/TeacherCalendar";
import {useAuthContext} from "@/providers/AuthProvider";
import {useTeam} from "@/hooks/useTeam";

export default function Planning() {
    const {user} = useAuthContext()
    const {workplaces, getWorkplaces} = useTeam()
    const [selectedEstablishment, setSelectedEstablishment] = useState(null)
    useEffect(() => {
        const {id} = user
        if (!id) return
        getWorkplaces(id)
    }, [user, getWorkplaces]);

    useEffect(() => {
        console.log("workplaces", workplaces)
    }, [workplaces]);

    const handleSelectEstablishment = (event) => {
        const selectedEstablishment = event.target.value
        if (!selectedEstablishment) setSelectedEstablishment(null)
        else setSelectedEstablishment(selectedEstablishment)
    }
    return (
        <>
            <Breadcrumb aria-label="Default breadcrumb example">
                <Breadcrumb.Item href="#" icon={HiHome}>
                    Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/provider/planning/">Planning</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt-4">
                <div className="my-8">
                    <div className="flex items-center">
                        <h2 className="mr-2">
                            Cette Page affiche le planing de mes differents etablissements
                        </h2>
                    </div>
                    <div className="mt-4 max-w-md">
                        {workplaces.length > 0 ? (
                            <>
                                <div className="mb-2 block">
                                    <Label htmlFor="countries" value="Select votre etablissement"/>
                                </div>
                                <Select id="countries" required onChange={handleSelectEstablishment}>
                                    <option value=""></option>
                                    {workplaces.map((invitation) => (
                                        <option value={invitation.establishment.id} key={invitation.establishment["@id"]}>{invitation.establishment.name}</option>
                                    ))}

                                </Select>
                            </>
                        ) : (
                            <div>
                                Vous etes affecté a aucune etablissement
                            </div>
                        )}
                    </div>

                </div>

            </div>
            <div className="max-h-1/2">
                <div className="grid grid-cols-10 ">
                    <div className="col-span-8">
                        <TeacherCalendar establishmentId={selectedEstablishment}/>
                    </div>
                </div>
            </div>

        </>
    )
}