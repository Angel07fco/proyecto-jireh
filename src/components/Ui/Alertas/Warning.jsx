const warning = ({mensaje}) => {
    return (
        <div className="fixed bottom-0 left-0 right-0">
            <div className="w-full text-white bg-yellow-400">
                <div className="container flex items-center justify-between px-6 py-4 mx-auto">
                    <div className="flex">
                        <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
                        </svg>
                        <p className="mx-3">{mensaje}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default warning;