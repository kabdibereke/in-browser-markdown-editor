import styles from './Header.module.scss'
import iconMenu from '../../assets/icon-menu.svg'
import iconClose from '../../assets/icon-close.svg'
import iconDocument from '../../assets/icon-document.svg'
import iconTrash from '../../assets/icon-delete.svg'
import Button from '../button/Button'
import { onValue, ref, remove, update } from 'firebase/database'
import { db } from '../../../firebase'
import { IDocument } from '../../models/Document'
import { useEffect, useState } from 'react'
import { observer } from "mobx-react-lite"
import store from '../../store/store'
import editIcon from '../../assets/edit.svg'
import doneIcon from '../../assets/done.svg'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Header = observer(() => {
    const [isEdit, setIsEdit] = useState(false)
    const [editName, setEditInput]  = useState('')
   
    const editText = (id:string,text:string) => {
		update(ref(db, id), {
			content: text,
		});
        toast.success('Saved', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
	};
    const editHandle =( e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
        e.stopPropagation()
        if(store.selectDocument?.name) {
            setIsEdit(true)
           
        }
       
    }

    const deleteItem = (id:string) => {
		remove(ref(db, id));
        store.setSelectDocument({} as IDocument)
        toast.success('Deleted', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
	};

   useEffect(()=> {
    if(editName) {
        store.selectDocument.name=editName
    }
   },[editName])

   
  
   const saveDocumentName = (id:string)=> {
    update(ref(db, id), {
        name:editName? editName: store.selectDocument?.name
    });
    setIsEdit(false)
    toast.success('Saved', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
   }
   useEffect(()=> {
    setTimeout(()=> {

    },2000)
   },[])
    const handleSidebar =(e: React.MouseEvent<HTMLElement, MouseEvent>)=> {
        e.stopPropagation()
        store.setIsSideBarOpen(!store.isSidebarOpen)
    }
  return (
   <>
   <header className={styles.header}>
       <div className={styles.left_wrapper}>
        <div className={styles.burger_wrapper}>
                <button className={styles.burger_wrapper_btn} onClick={handleSidebar} data-cy="burger">
                   {!store.isSidebarOpen ?  <img src={iconMenu} alt="menu"  /> :  <img src={iconClose} alt="menu" /> }
                </button>
            </div>
            <div className={styles.text_wrapper} >
                <p className={styles.title}>Markdown</p>
                <span></span>
                <div className={styles.document_wrapper}>
                    <img src={iconDocument} alt="document" />
                    <div className={styles.input_wrapper}>
                        <p className={styles.document_name_title}>
                            Document Name
                        </p>
                        {!store.selectDocument.name  && <div className={styles.document_name}>Select a document from the menu</div>}
                        {store.selectDocument.name ? !isEdit?<div className={styles.document_name}>{store.selectDocument?.name }.md</div> : <input type="text" value={editName}  onChange={(e)=> setEditInput(e.target.value)} className={styles.inputText}/>:'' }
                      
                    </div>
                    {!isEdit && store.selectDocument.name ? <div className={styles.editBtn} onClick={editHandle}>
                        <img src={editIcon} alt="edit" />
                    </div>:''}
                    {isEdit && <div className={styles.doneBtn} onClick={()=>saveDocumentName(store.selectDocument?.id!)}>
                        <img src={doneIcon} alt="done" />
                    </div>}
                </div>
            </div>
       </div>

       <div className={styles.button_wrapper}>
            <button className={styles.trash} onClick={()=>deleteItem(store.selectDocument?.id!)}>
                <img src={iconTrash} alt="trash" />
            </button>
            <Button image='save' onClick={()=> editText(store.selectDocument?.id!, store.mtext)}> Save Document </Button>
       </div>
   </header>
    <ToastContainer />
   </>
  )
})

export default Header