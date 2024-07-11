import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const DivOrigami = () => {
    return (
        <section className="flex h-[90%] w-[90%] mt-10 flex-col items-center justify-center gap-12 md:flex-row">
            <LogoRolodex
                items={[
                    <LogoItem key={1} className="bg-primaryBlue">
                        <img src="https://res.cloudinary.com/dl8odylct/image/upload/v1706904292/perros_rbacpf.png" alt="img-mascota" style={{ height: '100%', width: '100%' }} />
                    </LogoItem>,
                    <LogoItem key={2} className="bg-primaryBlue">
                        <img src="https://res.cloudinary.com/dl8odylct/image/upload/v1719600932/jireh/gato_zpgn0h.png" alt="img-mascota" />
                    </LogoItem>,
                    <LogoItem key={3} className="bg-primaryBlue">
                        <img src="https://res.cloudinary.com/dl8odylct/image/upload/v1719602777/jireh/perro_endpce.png" alt="img-mascota" />
                    </LogoItem>,
                    <LogoItem key={4} className="bg-primaryBlue">
                        <img src="https://res.cloudinary.com/dl8odylct/image/upload/v1719601704/jireh/perro_tzz1b2.png" alt="img-mascota" />
                    </LogoItem>,
                ]}
            />
        </section>
    );
};

const DELAY_IN_MS = 2500;
const TRANSITION_DURATION_IN_SECS = 1.5;

const LogoRolodex = ({ items }) => {
    const intervalRef = useRef(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setIndex((pv) => pv + 1);
        }, DELAY_IN_MS);

        return () => {
            clearInterval(intervalRef.current || undefined);
        };
    }, []);

    return (
        <div
            style={{
                transform: "rotateY(-20deg)",
                transformStyle: "preserve-3d",
            }}
            className="relative z-0 h-[100%] w-[100%] shrink-0 rounded-xl"
        >
            <AnimatePresence mode="sync">
                <motion.div
                    style={{
                        y: "-50%",
                        x: "-50%",
                        clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                        zIndex: -index,
                        backfaceVisibility: "hidden",
                    }}
                    key={index}
                    transition={{
                        duration: TRANSITION_DURATION_IN_SECS,
                        ease: "easeInOut",
                    }}
                    initial={{ rotateX: "0deg" }}
                    animate={{ rotateX: "0deg" }}
                    exit={{ rotateX: "-180deg" }}
                    className="absolute left-1/2 top-1/2"
                >
                    {items[index % items.length]}
                </motion.div>
                <motion.div
                    style={{
                        y: "-50%",
                        x: "-50%",
                        clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                        zIndex: index,
                        backfaceVisibility: "hidden",
                    }}
                    key={(index + 1) * 2}
                    initial={{ rotateX: "180deg" }}
                    animate={{ rotateX: "0deg" }}
                    exit={{ rotateX: "0deg" }}
                    transition={{
                        duration: TRANSITION_DURATION_IN_SECS,
                        ease: "easeInOut",
                    }}
                    className="absolute left-1/2 top-1/2"
                >
                    {items[index % items.length]}
                </motion.div>
            </AnimatePresence>

            <hr
                style={{
                    transform: "translateZ(1px)",
                }}
                className="absolute left-0 right-0 top-1/2 z-[999999999] -translate-y-1/2"
            />
        </div>
    );
};

const LogoItem = ({ children, className }) => {
    return (
        <div
            className={twMerge(
                "grid h-[75vh] w-[50vw] place-content-center",
                className
            )}
        >
            {children}
        </div>
    );
};
