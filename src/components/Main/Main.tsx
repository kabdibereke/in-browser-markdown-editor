
import { observer } from 'mobx-react-lite'
import store from '../../store/store'
import Markdown from '../Markdown/Markdown'
import Preview from '../Preview/Preview'
import styles from './Main.module.scss'

const Main = observer(() => {
 
  return (
    <div className={styles.main_wrapper}>
        {store.isVisibleMarkdown && <Markdown  />}
        <Preview />
    </div>
  )
})

export default Main