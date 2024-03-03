import styles from "./bubble.module.css";

const Header = ({ texto }) => {
    return (
        <div className="grid place-content-center mt-8 bg-primaryBlue py-16">
            <BubbleText texto={texto} />
        </div>
    );
};

const BubbleText = ({ texto }) => {
    return (
        <h2 className="text-center font-bold text-5xl text-secondaryBlue">
            {texto.split("").map((child, idx) => (
                <span className={styles.hoverText} key={idx}>
                    {child}
                </span>
            ))}
        </h2>
    );
};

export default Header;
