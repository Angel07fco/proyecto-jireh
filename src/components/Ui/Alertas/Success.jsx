const Success = ({mensaje}) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            <div className="w-full text-white bg-emerald-500">
                <div className="container flex items-center justify-between px-6 py-4 mx-auto">
                    <div className="flex">
                        <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                        </svg>
                        <p className="mx-3">{mensaje}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success;