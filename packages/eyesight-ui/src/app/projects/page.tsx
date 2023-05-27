import {Card} from "@/app/projects/Card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={'grid grid-cols-3 gap-20'}>
            {['example-project', 'another-project'].map((project) => <Card project={project}/>)}
        </div>

    </main>
  )
}
