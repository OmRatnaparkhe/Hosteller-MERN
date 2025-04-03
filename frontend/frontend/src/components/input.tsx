interface InputBox{
    reference?:any;
    placeholder:any;
    type:"text"|"password";
}
export function Input({reference,placeholder,type}:InputBox){
    return <div>
        <input ref={reference} className="bg-gray-600 w-full rounded-lg py-2.5  text-white pl-4" type={type} placeholder={placeholder}/>
    </div>
}