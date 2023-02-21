import React from 'react'
import styles from './Button.module.scss'
import cn from 'classnames';
import { ButtonProps } from './Button.props';
import iconSave from '../../assets/icon-save.svg'
const Button = ({image='none', children, className, ...props }:ButtonProps) => {
    return (
    <button className={cn(styles.button, className)} {...props}>
        {image=='save' && <><img src={iconSave} alt="save" /> <p className={styles.save_text}>{children} </p></>}
        {image=='plus' &&  <p className={styles.text}> + {children} </p> }
    </button>

  )
}

export default Button