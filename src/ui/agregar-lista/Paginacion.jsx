import React from 'react'
import styles from './paginacion.module.scss'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

const Paginacion = ({page, limit, setPage}) => {
    const handlePrev = () => {
        setPage(page - 1)
    }

    const handleNext = () => {
        setPage(page + 1)
    }

  return (
    <div className={styles.container}>
        <IoIosArrowDropleftCircle 
            className={page === 1 ? styles.disabled : styles.icon}
            onClick={handlePrev}/>
        <p className={styles.page}>{page}</p>
        <IoIosArrowDroprightCircle 
            className={page === limit ? styles.disabled : styles.icon}
            onClick={handleNext}/>
    </div>
  )
}

export default Paginacion