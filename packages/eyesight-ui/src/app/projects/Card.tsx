import Link from "next/link";

export const Card = ({project}: any)=> {
    return <Link href={`/projects/${project}`}>
        <section className={'bg-white p-6 grid grid-rows-3'}>
            <h2>{project}</h2>
            <p>Version: XXXX</p>
            <p>Last updated: XXXX by XXX</p>
        </section>
    </Link>
}