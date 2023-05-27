import {Card} from "@/app/projects/Card";

export default function Home() {
  return (
    <main className="max-w-m-desktop px-8 m-auto">
        <div className={'grid grid-cols-3 gap-20'}>
            {['example-project', 'another-project'].map((project) => <Card project={project}/>)}
        </div>

    </main>
  )
}
