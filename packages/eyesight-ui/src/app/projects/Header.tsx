export const Header = () => {
    return <div className={'border-b h-16 m-auto'}>
        <div className={'grid grid-cols-2 items-center h-full max-w-m-desktop px-8'}>
            <p className={'font-bold'}>Eyeysight</p>
            <div>search <input className={'border'}/></div>
        </div>
    </div>
}