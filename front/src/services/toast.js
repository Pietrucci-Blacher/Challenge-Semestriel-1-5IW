import { toast } from "react-toastify";

const createToast = (type='info', content) => {
    toast(content, {
        type: type,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        draggable: true
    });
}

export default createToast