import React, {createContext, useCallback, useState} from 'react';
import {Toast} from 'flowbite-react';
import {HiCheck, HiExclamation, HiX} from 'react-icons/hi';
import {FiInfo} from "react-icons/fi";
import {FaTelegramPlane} from 'react-icons/fa';
import {MdLoop} from 'react-icons/md';

export const ToastContext = createContext();

export const ToastProvider = ({children}) => {
    const [toastProps, setToastProps] = useState({
        show: false,
        message: '',
        type: '',
    });
    const listOfIcons = {
        success: HiCheck,
        error: HiX,
        warning: HiExclamation,
        message: FaTelegramPlane,
        refresh: MdLoop,
        default: FiInfo
    }
    const listOfClasses = {
        success: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200",
        error: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200",
        warning: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200",
        message: "",
        refresh: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-900 dark:text-cyan-300",
        default: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200"
    }

    const Icon = listOfIcons.hasOwnProperty(toastProps.type) ? listOfIcons[toastProps.type] : listOfIcons["default"]
    const classForIcon = listOfClasses.hasOwnProperty(toastProps.type) ? listOfClasses[toastProps.type] : listOfClasses["default"]

    const createToastMessage = useCallback(( type = 'info', message) => {
        setToastProps({show: true, message, type});
        setTimeout(() => {
            setToastProps((prev) => ({...prev, show: false}));
        }, 5000);
    }, []);

    const hiddeToast = () => {
        setToastProps((prev) => ({...prev, show: false}));
    }

    return (
        <ToastContext.Provider value={{createToastMessage}}>
            {children}
            {toastProps.show && (
                <div className="fixed top-10 right-0 z-20 p-4">
                    <Toast className="mt-4">
                        <div
                            className={classForIcon}>
                            <Icon className="h-5 w-5"/>
                        </div>
                        <div className="ml-3 text-sm font-normal">{toastProps.message}</div>
                        <Toast.Toggle onClick={hiddeToast}/>
                    </Toast>
                </div>
            )}
        </ToastContext.Provider>
    );
};
