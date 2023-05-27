import Image from "next/image";
import {BreadCrumbs} from "@/app/projects/BreadCrumbs";

async function getScreenshots(projectName:string) {
    const response = await fetch(`${process.env.EYESIGHT_SERVER_URL}/screenshots/${projectName}/v3`, {cache: 'no-cache'});
    if (response.ok) {
        return response.json();
    }
}

export default async function Page({params}: any) {

    const screenshots = await getScreenshots(params.slug)

    return (
        <main>
            <BreadCrumbs links={['projects', params.slug]}/>
            {params.slug}
            <section className="grid grid-cols-3 flex-col items-center p-24">
                {screenshots.map((screenshot:any)=> {
                    return <div>
                        {screenshot.name}
                        <Image
                        src={`data:image/gif;base64,${screenshot.content}`}
                        alt="Next.js Logo"
                        width={300}
                        height={120}
                        priority
                    />
                    </div>
                })}
            </section>
        </main>
    )
}
