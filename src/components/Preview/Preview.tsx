import styles from './Preview.module.scss'
import ReactMarkdown from 'react-markdown'
import { observer } from 'mobx-react-lite'
import store from '../../store/store'
import showIcon from '../../assets/icon-show-preview.svg'
import closeIcon from '../../assets/icon-hide-preview.svg'
import { useEffect } from 'react'
const Preview = observer(() => {
  return (
   <div className={  store.isVisibleMarkdown? styles.preview_wrapper: styles.preview_wrapper_100 } >
    <div className={styles.preview_header}>
        <p className={styles.title}>PREVIEW</p>
        <button className={styles.preview_btn} onClick={()=>store.setIsVisibleMarkdown(!store.isVisibleMarkdown)}>
          {store.isVisibleMarkdown ? <img src={showIcon} alt="eye" /> :  <img src={closeIcon} alt="eye" />}
         
        </button>
    </div>
    <div className={styles.preview}>
    <ReactMarkdown>
       {store.mtext}
    </ReactMarkdown>
    
    </div>
   </div>
  )
})

export default Preview