import Link from "next/link";

export const Card = ({project}: any)=> {
    return <Link href={`/projects/${project}`}>
        <section className={'bg-white py-6 grid grid-rows-3'}>
            <h2>{project}</h2>
            <p>Last updated: XXXX </p>
        </section>
    </Link>
}