import { useState } from "react"
import { BACKEND_URL } from "../BackendUrl"
import { Button } from "./Button";
import { SidebarItems } from "./SidebarItems";
import { HomeLogo } from "../Icons/home";
import { BookMarkLogo } from "../Icons/Bookmarks";
import { PropertyLogo } from "../Icons/Property";

export function Sidebar() {
    const [contents, setContents] = useState({});
    async function getUserinfo() {
        await axios.get(`${BACKEND_URL}/getUserInfo`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then((response) => {
            setContents(response.data?.userInfo || {});
        }).catch((error) => {
            console.error("Error fetching user info:", error)
        })
    }
    getUserinfo();
    return <div id="sidebar" className="w-[100%] h-[100%]">
        <div className='ml-[10%]  p-[3%] bg-orange-400 rounded-b-[150px] h-[90%]'>
            <div>
                <div className="h-full  ">
                    <div className="h-[18%] w-full border-b flex justify-start pl-8 items-center  mt-3 ">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="h-16 w-16 rounded-full bg-purple-700 flex justify-center"></div>

                            <div className="text-2xl font-bold text-center text-white ">
                                {contents?.username || "Guest"}
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-col justify-start  w-full">
                        <SidebarItems logo={<HomeLogo />} text={"Home"} />
                        <SidebarItems logo={<BookMarkLogo />} text={"Bookmarks"} />
                        <SidebarItems logo={<PropertyLogo />} text={"My Properties"} />
                        <SidebarItems logo={<HomeLogo />} text={"My Properties"} />
                    </div>
                    <div className="flex justify-start pl-12 items-end mt-10 h-[22%]">
                        <Button variant="sixth" text={"Sign Out"} />
                    </div>
                </div>
            </div>
        </div>


    </div>
}