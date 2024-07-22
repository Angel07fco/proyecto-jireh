import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export const SlideTabss = ({ onTabChange }) => {
  return (
    <div className="bg-neutral-100">
      <SlideTabs onTabChange={onTabChange} />
    </div>
  );
};

const SlideTabs = ({ onTabChange }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 1,
  });
  const [selectedTab, setSelectedTab] = useState("Temáticas Principales");
  const refs = useRef([]);

  useEffect(() => {
    const initialTab = refs.current[0];
    if (initialTab) {
      const { width } = initialTab.getBoundingClientRect();
      setPosition({
        left: initialTab.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  return (
    <ul
      onMouseLeave={() => {
        if (!selectedTab) {
          setPosition((pv) => ({
            ...pv,
            opacity: 0,
          }));
        }
      }}
      className="relative flex w-full rounded-full border-2 border-secondaryBlue bg-primaryBlue p-1"
    >
      {["Temáticas Principales", "Tipo de Contenido", "Audiencia Objetivo", "Problemas o Necesidades", "Geográficas", "Frecuencia"].map((tab, index) => (
        <Tab
          key={index}
          index={index}
          setPosition={setPosition}
          setSelectedTab={handleTabChange}
          selectedTab={selectedTab}
          tab={tab}
          refs={refs}
        >
          {tab}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition, setSelectedTab, selectedTab, tab, index, refs }) => {
  const ref = useRef(null);

  useEffect(() => {
    refs.current[index] = ref.current;
  }, [index, refs]);

  const handleMouseEnter = () => {
    if (!ref?.current) return;

    const { width } = ref.current.getBoundingClientRect();

    setPosition({
      left: ref.current.offsetLeft,
      width,
      opacity: 1,
    });
  };

  const handleClick = () => {
    if (!ref?.current) return;

    const { width } = ref.current.getBoundingClientRect();

    setPosition({
      left: ref.current.offsetLeft,
      width,
      opacity: 1,
    });

    setSelectedTab(tab);
  };

  return (
    <li
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase mix-blend-difference md:px-5 md:py-3 md:text-base ${
        selectedTab === tab ? "text-white font-bold" : "text-primaryBlue"
      }`}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-secondaryBlue md:h-12"
    />
  );
};
