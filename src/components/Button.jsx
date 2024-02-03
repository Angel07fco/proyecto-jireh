function Button({ texto, bg, textoColor }) {
    return (
        <button
            className={`bg-${bg} text-${textoColor} px-6 py-2 rounded-md`}
        >
            {texto}
        </button>
    )
}

export default Button