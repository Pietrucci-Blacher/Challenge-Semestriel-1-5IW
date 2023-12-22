import Link from "next/link";
export default function ListAllEstablishment() {
  return (
    <>
      <h1>Les etablissements</h1>
      <Link href={`/establishment/2`}>Test</Link>
    </>
  );
}
