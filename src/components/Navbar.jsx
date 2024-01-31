import Logo from "../assets/images/jireh.jpg";

function Navbar() {
    return (
        <nav className="bg-white">
            <div className="flex items-center font-medium justify-around">
                <div>
                    <img src={Logo} alt="Logo JIREH" className="md:cursor-pointer h-9" />
                </div>
                <ul>
                    <li>
                        Home
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar