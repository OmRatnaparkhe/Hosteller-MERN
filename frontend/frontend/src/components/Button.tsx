interface ButtonProps{
    variant:("primary"|"secondary"|"third")
    onClick?:()=>void;
    text:String;
}
const variantStyles = {
    "primary":"w-full bg-purple-600 text-white font-semibold py-2 rounded-lg",
    "secondary":"bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg",
    "third":"bg-blue-800 text-white font-semibold py-2 px-6 rounded-lg"
}
export function Button({variant,onClick,text}:ButtonProps){
    return <div className="flex justify-center ">
    <button onClick={onClick} className={`${variantStyles[variant]}`}>{text}</button>
    </div>
}