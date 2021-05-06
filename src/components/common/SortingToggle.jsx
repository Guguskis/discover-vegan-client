import React, {useEffect, useState} from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import "./SortingToggle.less"
import {IconButton} from "@material-ui/core";

const SortingToggle = (props) => {
    const {setSortingValue} = props;

    const [sorting, setSorting] = useState("DESC")

    const handlePress = () => {
        setSorting(sorting === "DESC" ? "ASD" : "DESC")
    }

    useEffect(() => {
        setSortingValue(sorting)
    }, [sorting])

    return (
        <IconButton component="div" className="sorting-toggle" onClick={handlePress}>
            {sorting === "DESC" ?
                <ArrowDropDownIcon fontSize="large"/>
                :
                <ArrowDropUpIcon fontSize="large"/>
            }
        </IconButton>
    );
};

export default SortingToggle;
