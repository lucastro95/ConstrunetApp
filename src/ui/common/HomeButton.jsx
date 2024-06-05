"use client";
import React from "react";
import PropTypes from "prop-types"; // Add this line
import styles from "./HomeButton.module.scss";

const HomeButton = ({ text, href }) => {
    return (
        <div className={styles.container}>
            <a href={href}>
            <button className={styles.button}>
                {text}
            </button>
            </a>
        </div>
    );
};

HomeButton.propTypes = {
    text: PropTypes.string.isRequired, // Add this line
    href: PropTypes.string.isRequired,
};

export default HomeButton;
