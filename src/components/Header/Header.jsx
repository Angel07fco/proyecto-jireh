import styles from "./bubble.module.css";

const Header = ({ texto, linkText }) => {
    return (
        <div
            className="py-12 md:pl-40 pl-10 my-6"
            style={{
                backgroundImage: "linear-gradient(to right, #00263e, #b9d5de)",
            }}
        >
            <BubbleText texto={texto} />

            <div className="flex items-center py-4">
                <a href="#" className="text-primaryBlue">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                </a>

                <span className="mx-5 text-primaryBlue rtl:-scale-x-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>

                <p className="text-primaryBlue hover:underline">
                    {linkText}
                </p>
            </div>
        </div>
    );
};

const BubbleText = ({ texto }) => {
    return (
        <h2 className="font-bold text-5xl text-primaryBlue">
            {texto.split("").map((child, idx) => (
                <span className={styles.hoverText} key={idx}>
                    {child}
                </span>
            ))}
        </h2>
    );
};

export default Header;