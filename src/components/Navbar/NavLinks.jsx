import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from "react-router-dom";
import { links } from "./MyLinks";
import { useState } from "react";

function NavLinks() {
    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("")
    return (
        <>
            {links.map((link, i) => (
                <div key={i}>
                    <div className="px-3 text-left md:cursor-pointer group">
                        <h1
                            className="py-7 flex justify-between items-center md:pr-0 pr-5 group text-secondaryBlue"
                            onClick={()=>{
                                heading !== link.name
                                    ? setHeading(link.name)
                                    : setHeading('')
                                setSubHeading("")
                            }}
                        >
                            {link.name}
                            <span className='md:hidden inline'>
                                {
                                    heading === link.name ? <KeyboardArrowUpIcon />: <KeyboardArrowDownIcon />
                                }
                            </span>
                            <span className='md:mt-1 md:ml-2 md:block hidden group-hover:rotate-180 group-hover:-mt-2'>
                                <KeyboardArrowDownIcon />
                            </span>
                        </h1>
                        {link.submenu && (
                            <div>
                                <div className="absolute top-30 hidden group-hover:md:block hover:md:block">
                                    <div className="py-3">
                                        <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                                    </div>
                                    <div className="bg-white p-5 grid grid-cols-3 gap-10">
                                        {link.sublinks.map((mysublinks, i)=>(
                                            <div key={i}>
                                                <h1 className="text-lg font-semibold uppercase text-secondaryBlue">{mysublinks.Head}</h1>
                                                {mysublinks.sublink.map((slink, i)=>(
                                                    <li key={i} className="text-sm text-secondaryBlue my-2.5 ml-2.5">
                                                        <Link to={slink.link} className="hover:text-primaryBlue hover:underline">{slink.name}</Link>
                                                    </li>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Mobile menus */}
                    <div className={`
                        ${heading === link.name ? 'md:hidden' : 'hidden'}
                    `}>
                        {/* sublinks */}
                        {
                            link.sublinks.map((slinks, i)=>(
                                <div key={i}>
                                    <div>
                                        <h1
                                            className="py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center"
                                            onClick={()=>
                                                subHeading !== slinks.Head
                                                    ? setSubHeading(slinks.Head)
                                                    : setSubHeading("")
                                                }
                                        >
                                            {slinks.Head}
                                            <span>
                                                {
                                                    subHeading === slinks.Head ? <KeyboardArrowUpIcon />: <KeyboardArrowDownIcon />
                                                }
                                            </span>
                                        </h1>
                                        <div className={`${
                                            subHeading === slinks.Head ? "md:hidden" : "hidden"
                                        }`}>
                                            {
                                                slinks.sublink.map((slink, i)=>(
                                                    <li key={i} className="py-3 pl-14">
                                                        <Link to={slink.link} className='hover:bg-blue-500'>{slink.name}</Link>
                                                    </li>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))}
        </>
    );
}

export default NavLinks;