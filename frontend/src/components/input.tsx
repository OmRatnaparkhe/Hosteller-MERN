interface InputBox{
    reference?:any;
    placeholder:any;
    type:"text"|"password"|"file"|"email";
    value?:String;
    onChange?:(arg:string)=> void
}
export function Input({reference,placeholder,type,value,onChange}:InputBox){
    return <div className="w-full flex justify-center">
        <input onChange={onChange} value={value} ref={reference} className="bg-gray-600 w-full p-2 px-3 border border-gray-400 text-white rounded focus:ring-2 focus:ring-blue-500" type={type} placeholder={placeholder}/>
    </div>
}