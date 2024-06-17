import React from 'react';
import styles from './loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.skChase}>
                <div className={styles.skChaseDot}></div>
                <div className={styles.skChaseDot}></div>
                <div className={styles.skChaseDot}></div>
                <div className={styles.skChaseDot}></div>
                <div className={styles.skChaseDot}></div>
                <div className={styles.skChaseDot}></div>
            </div>
        </div>
    );
};

export default Loader;
