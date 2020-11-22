import React from 'react';

import useDarkMode from 'use-dark-mode';
import {FaMoon} from 'react-icons/fa';
import {RiSunFill} from "react-icons/ri";

const DarkModeToggle = () => {
    const darkMode = useDarkMode(false);

    return (
        <button className="btn-dark-mode" type="button" onClick={darkMode.toggle}>
            {
                darkMode.value ? <RiSunFill /> : <FaMoon />
            }
        </button>
    );
};

export default DarkModeToggle;
