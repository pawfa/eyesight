import Link from "next/link";

export const BreadCrumbs = ({links}: { links: string[] }) => {
    return <div>
        {links.map((link, index) => {
            const isLastItem = index === (links.length - 1);

            if (!isLastItem) {
                return <>
                    <Link href={index === 0 ? "/" + link : link}>
                        {link}
                    </Link> /
                </>
            }
            return link
        })}
    </div>
}