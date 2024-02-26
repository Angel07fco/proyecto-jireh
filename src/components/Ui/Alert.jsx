const Alert = ({mensaje}) => {
    return (
        <div className="fixed bottom-0 left-0 right-0">
            <div className="w-full bg-red-500 text-white">
                <div className="container flex items-center justify-between px-6 py-4 mx-auto">
                    <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z"/>
                        </svg>
                        <p className="mx-3">{mensaje}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Alert;