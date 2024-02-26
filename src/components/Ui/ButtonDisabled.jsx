const ButtonDisabled = ({texto}) => {
    return (
        <button disabled className="w-full cursor-not-allowed rounded-2xl border-2 border-secondaryBlue
                                    bg-white px-6 py-3 font-semibold uppercase text-secondaryBlue"
        >
            {texto}
        </button>
    );
};

export default ButtonDisabled;