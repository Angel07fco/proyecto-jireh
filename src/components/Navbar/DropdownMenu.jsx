import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import PetsIcon from '@mui/icons-material/Pets';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Danger from '../Ui/Alertas/Danger';
import Success from '../Ui/Alertas/Success';
import { useNavigate } from 'react-router-dom';
import Loader from '../Ui/Loader';

const DropdownMenu = ({ name }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const { userLogout, response, errors: signinErrors } = useAuth();

    const handleLogout = () => {
        if (token) {
            userLogout({token});
        }
    };

    useEffect(() => {
        if (response) {
            setLoading(true);
            const timeout = setTimeout(() => {
                setLoading(false);
                navigate('/iniciar-sesion');
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [response]);

    return (
        <div className="flex items-center justify-center bg-white">
            {signinErrors && <Danger mensaje={signinErrors} />}
            {response && <Success mensaje={response} />}
            {loading && <Loader />}
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <button
                    onClick={() => setOpen((pv) => !pv)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-primaryBlue hover:text-secondaryBlue bg-secondaryBlue hover:bg-primaryBlue transition-colors"
                >
                    <span className="font-medium text-sm">{name}</span>
                    <motion.span variants={iconVariants}>
                        <MoreVertIcon />
                    </motion.span>
                </button>
                <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{ originY: "top", translateX: "-50%" }}
                    className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
                >
                    <Option url="/cuenta" Icon={PersonIcon} text="Mi cuenta" />
                    <Option url="/mascotas" Icon={PetsIcon} text="Mis mascotas" />
                    <li onClick={handleLogout} className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-secondaryBlue text-secondaryBlue hover:text-primaryBlue transition-colors cursor-pointer">
                        <LogoutIcon />
                        <span>Cerrar sesión</span>
                    </li>
                </motion.ul>
            </motion.div>
        </div>
    );
};

const Option = ({ text, Icon, url }) => {
    return (
        <Link to={url}>
            <motion.li
                variants={itemVariants}
                className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-secondaryBlue text-secondaryBlue hover:text-primaryBlue transition-colors cursor-pointer"
            >
                <motion.span variants={actionIconVariants}>
                    <Icon />
                </motion.span>
                <span>{text}</span>
            </motion.li>
        </Link>
    );
};

Option.propTypes = {
    text: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
    url: PropTypes.string.isRequired
};

export default DropdownMenu;

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};

const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};
