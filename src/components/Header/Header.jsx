import styles from "./bubble.module.css";

const Header = ({ texto }) => {
    return (
        <div className="grid place-content-center bg-black py-16">
            <BubbleText texto={texto} />
        </div>
    );
};

const BubbleText = ({ texto }) => {
    return (
        <h2 className="text-center text-5xl font-thin text-primaryBlue">
            {texto.split("").map((child, idx) => (
                <span className={styles.hoverText} key={idx}>
                    {child}
                </span>
            ))}
        </h2>
    );
};

export default Header;
