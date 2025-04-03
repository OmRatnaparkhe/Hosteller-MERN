export function SearchBar(){
    return <div className="w-full flex justify-center mt-4 gap-2">
        <input type="text" placeholder="Search..." className="bg-gray-400 rounded-lg p-2 w-[60%] text-black"/>
        <button className="bg-gray-600 p-2 text-white rounded-lg px-4 font-semibold">Search</button>
    </div>
}