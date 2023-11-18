import {useRouter} from "next/router";

export default function ShowEstablishment() {
    const router = useRouter();
    const {id} = router.query;

    return <div>Establishment {id}</div>;
}
