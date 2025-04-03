import { ReactElement } from "react"

interface SideItems {
    text?:String,
    logo:ReactElement,
    onClick?:()=>void
}
export function SidebarItems({text,logo,onClick}:SideItems){
    return <button onClick={onClick} className="w-full flex gap-2 font-semibold items-center text-gray-700  text-xl py-2 pl-9 mt-7 hover:bg-gray-300">
        {logo}{text}
    </button>
}