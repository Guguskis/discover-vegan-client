import React, {useEffect, useState} from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "./LanguageDropdown.less"
import {useDictionary} from "../../config/dictionary.jsx";
import {useStore} from "react-context-hook";

const LanguageDropdown = () => {
    const {DICTIONARY} = useDictionary()
    const [forceRerender, setForceRerender] = useStore('forceRerender')

    const [language, setLanguage] = useState('us');
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setLanguage(event.target.value);
    };

    useEffect(() => {
        DICTIONARY.setLanguage(language)
        setForceRerender({})
    }, [language])


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className="language-dropdown-container">
            <Select
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={language}
                onChange={handleChange}
                IconComponent={() => null}
            >
                <MenuItem value='us'>🇺🇸</MenuItem>
                <MenuItem value='lt'>🇱🇹</MenuItem>
            </Select>
        </div>
    );
};

export default LanguageDropdown;
