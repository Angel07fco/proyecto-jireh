function Button({ texto }) {
    return (
        <button
            className="bg-secondaryBlue text-white px-6 py-2 rounded-md"
        >
            {texto}
        </button>
    )
}

export default Button