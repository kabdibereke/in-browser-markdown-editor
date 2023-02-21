import { makeAutoObservable } from "mobx"
import { IDocument } from "../models/Document"

class store {
    isSidebarOpen = false
    selectDocument: IDocument ={}  as IDocument
    mtext:string =''
    isVisibleMarkdown=true
    constructor() {
        makeAutoObservable(this)
    }

    setIsSideBarOpen(bool:boolean) {
        this.isSidebarOpen = bool
    }
    setSelectDocument(object:IDocument) {
        this.selectDocument=object
    }
    setMText(text:string) {
        this.mtext=text
    }

    setIsVisibleMarkdown(bool:boolean){
        this.isVisibleMarkdown = bool
    }

    
}

export default new store