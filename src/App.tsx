import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import Header from './components/header/Header'
import Main from './components/Main/Main'
import Sidebar from './components/sidebar/Sidebar'
import store from './store/store'



const App= observer(()=> {
  return (
  <>
     <Header />
    {store.isSidebarOpen &&  <Sidebar/>}
      <Main />
  </>
  )
})

export default App
