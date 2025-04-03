import { Button } from "./Button"
export function Navbar() {

    return <div className="w-[100%] h-[10%] ">
        <nav className="h-[100%] w-[100%]">
            <div className="h-[100%] flex justify-between p-3 items-center">
                <div className="h-[100%] flex ml-4  items-center justify-center">
                    <div className="h-[100%] flex justify-center items-center gap-2">
                        <div className="flex justify-center">
                            <img src="https://img.freepik.com/premium-vector/pg-house-
                    logo-design-template-letter-pg-logo-real-estate-construction
                    -any-house-related-business_1101554-2717.jpg?ga=GA1.1.703041809
                    .1742495849&semt=ais_hybrid" alt="" width={40} height={10} />
                        </div>

                        <Button variant="logo" onClick={()=>{}} text={"Hosteller"} >
                        </Button>
                    </div>
                    <div className="h-[100%] flex justify-center items-center ">
                        <Button variant="fourth" onClick={() => { }} text={"Home"} ></Button>
                        <Button variant="fourth" onClick={() => { }} text={"About"}></Button>
                        <Button variant="fourth" onClick={() => { }} text={"Home"}></Button>
                        <Button variant="fourth" onClick={() => { }} text={"Home"}></Button>
                    </div>
                </div>
                <div className="flex mr-4">
                    <Button variant="third" onClick={() => { }} text={"Sign Out"}></Button>
                    <Button variant="fourth" onClick={() => { }} text={"My Properties"}></Button>
                </div>
            </div>

        </nav>
    </div>
}