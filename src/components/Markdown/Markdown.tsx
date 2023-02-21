
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { IDocument } from '../../models/Document'
import store from '../../store/store'
import styles from './Markdown.module.scss'
import showIcon from '../../assets/icon-show-preview.svg'

const Markdown = observer(() => {
  useEffect(()=> {
    if(store.selectDocument?.content){
      store.setMText(store.selectDocument.content)
    }else {
      store.setMText('')
    }
  },[store.selectDocument])
  return (
   <div className={store.isVisibleMarkdown ? styles.markdown_wrapper: styles.markdown_wrapper_100 }>
    <div className={styles.markdown_header}>
        <p className={styles.title}>MARKDOWN</p>
        <button className={styles.markdown_btn} onClick={()=>store.setIsVisibleMarkdown(!store.isVisibleMarkdown)}>
        {store.isVisibleMarkdown && <img src={showIcon} alt="eye" />}
           
        </button>
    </div>
    <textarea spellCheck="false" className={styles.textarea} value={store.mtext} onChange={(e)=>store.setMText(e.target.value) }> 

    </textarea>
   </div>
  )
})

export default Markdown