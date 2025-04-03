interface ButtonProps{
    variant:("primary"|"secondary"|"third"|"fourth"|"fifth"|"logo"|"sixth"|"signup"|"profile"|"search"|"homePage")
    onClick?:()=>void;
    text:String;
}
const variantStyles = {
   "primary": "w-full bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg h-12 flex justify-center items-center text-center whitespace-nowrap",
    "secondary":"bg-purple-700 text-white font-semibold py-3 px-10 rounded-lg",
    "third":"bg-blue-600 text-white font-semibold py-3 px-10 rounded-lg",
    "fourth":"text-gray-300 px-4 font-semibold",
    "fifth":"text-white px-16 rounded-3xl bg-blue-700 mt-3 p-2",
    "logo":"text-white font-bold text-2xl",
    "sixth":"text-black bg-white font-semibold py-2 px-8 rounded-lg",
    "signup":"w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700",
    "profile":"w-full bg-purple-600 text-white text-lg font-semibold py-3 mt-2 px-36 rounded-lg h-[100%]",
    "search":"bg-blue-600 text-white font-bold py-2 px-6 rounded-lg ",
    "homePage":"bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg"
}
export function Button({variant,onClick,text}:ButtonProps){
    return <div className=" flex justify-center items-center text-center">
    <button onClick={onClick} className={`${variantStyles[variant]}`}>{text}</button>
    </div>
}