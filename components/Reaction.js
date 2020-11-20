import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngry, faDizzy, faGrinAlt, faSmileWink} from "@fortawesome/free-solid-svg-icons";

const Reaction = () => {

    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400){
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400){
            setShowScroll(false)
        }
    };

    window.addEventListener('scroll', checkScrollTop)

    return (
        <div className="reaction" style={{display: showScroll ? 'flex' : 'none'}}>
            <FontAwesomeIcon icon={faAngry} className="emoji-react"/>
            <FontAwesomeIcon icon={faGrinAlt} className="emoji-react"/>
            <FontAwesomeIcon icon={faSmileWink} className="emoji-react"/>
            <FontAwesomeIcon icon={faDizzy} className="emoji-react"/>
        </div>
    );
}

export default Reaction;