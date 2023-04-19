import React, { useEffect, useState } from 'react'
import Button from '../button/Button'
import styles from './Sidebar.module.scss'
import iconDocument from '../../assets/icon-document.svg'
import { onValue, ref, set } from "firebase/database";
import {db} from '../../../firebase'
import { nanoid } from 'nanoid';
import { IDocument } from '../../models/Document';
import { observer } from 'mobx-react-lite';
import store from '../../store/store';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Sidebar = observer(() => {
    const [docs,setDocs] =useState<IDocument[]>([])
    const [error, setError] =useState('')
    function writeUserData() {
        console.log('asdas')
        const date = new Date();
        const id =nanoid()
        set(ref(db, id), {
            id,
            createdAt: date.toLocaleDateString(),
            name: `New Doc ID${id.substring(0,1)}` ,
            content:''
        });
        toast.success('Created', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    useEffect(() => {
		try {
           
            onValue(ref(db), (snapshot) => {
                const data = snapshot.val()
                if (data !== null) {
                    setDocs(Object.values(data))
                    //@ts-ignore
                   
                }
            });

        } catch (error:any) {
            setError(error.message)
        }

       
	}, [db]);

    useEffect(()=> {
        document.body.addEventListener('click',()=> {
            store.setIsSideBarOpen(false)
        })
        return (
            document.body.removeEventListener('click',()=> {
                store.setIsSideBarOpen(false)
            })
        )
    },[])
    

   
  return (
    <>
    <motion.div className={styles.wrapper} onClick={(e)=>e.stopPropagation()}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}>
        <h2 className={styles.title}>MY DOCUMENTS</h2>
        <Button image='plus' onClick={writeUserData}> New Document </Button>
        {error && <p className={styles.mes}>{error}</p>}
        {docs.length ? docs.map(item=> {
           return  <div className={styles.document_wrapper} key={item.id} onClick={()=>store.setSelectDocument(item)}>
            <img src={iconDocument} alt="document" />
                <div className={styles.input_wrapper}>
                    <p className={styles.document_name_title}>
                       {item.createdAt}
                    </p>
                    <div className={styles.document_name}>{item.name}.md</div>
                </div>
            </div>
        }) : <p className={styles.mes}>Loading...</p> }

        
     </motion.div>  
      <ToastContainer />
    </>
  )
})

export default Sidebar