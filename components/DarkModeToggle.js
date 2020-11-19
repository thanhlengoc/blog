import React from 'react';

import useDarkMode from 'use-dark-mode';
import {FaMoon} from 'react-icons/fa';

const DarkModeToggle = () => {
    const darkMode = useDarkMode(false);

    return (
        <button className="btn-dark-mode ml-3" type="button" onClick={darkMode.toggle}>
            <FaMoon />
        </button>
    );
};

export default DarkModeToggle;
