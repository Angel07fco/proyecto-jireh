function CardServices({ name, description, img, icon }) {
    return (
        <div className="w-full h-auto border border-secondaryBlue hover:bg-primaryBlue">
            <div>
                <img className="w-full h-40" src={img} />
            </div>
            <div className="relative z-30">
                <div className="w-20 h-20 border border-secondaryBlue flex justify-center items-center rounded-full bg-white -mt-14 ml-5 shadow-xl">
                    <img className="w-12 h-12 rounded-t-lg" src={icon} alt="Ícono de urgencias" />
                </div>
            </div>

            <div className="px-5">
                <h1 className="font-bold text-3xl text-secondaryBlue">{name}</h1>
                <h2 className="mt-2 text-lg py-4">
                    {description}
                </h2>
            </div>
        </div>
    )
}

export default CardServices;