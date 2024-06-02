"use client";
import React from 'react'
import styles from './button.module.scss'

const Button = ({text, action}) => {
  return (
    <button 
        className={styles.button}
        onClick={action}
        >
        {text}
    </button>
  )
}

export default Button