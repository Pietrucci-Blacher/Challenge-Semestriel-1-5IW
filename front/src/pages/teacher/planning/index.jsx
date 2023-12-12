import {Breadcrumb} from "flowbite-react";
import {HiHome} from "react-icons/hi";
import {Fragment, useEffect, useState} from 'react'
import TeacherCalendar from "@/components/TeacherCalendar";

export default function Planning() {

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
                            Cette Page affiche le planing avec les reservations
                        </h2>
                    </div>
                </div>
                <div className="max-h-1/2 w-full">
                    <div className="grid grid-cols-10 ">
                        <div className="col-span-8">
                            <TeacherCalendar />
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}