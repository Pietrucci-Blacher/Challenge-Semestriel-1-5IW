import { Spinner as SpinnerFlowbite } from 'flowbite-react';

const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <SpinnerFlowbite color="primary" size="lg" />
        </div>
    );
};

export default Spinner;
