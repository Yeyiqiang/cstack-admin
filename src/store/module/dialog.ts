
import { defineStore } from 'pinia'
import { ref, reactive, computed, Ref } from 'vue';

export const useDialogStore = defineStore('dialog', () => {
    let level:number = 2000
    const dialogIds:Array<string> = []
    function getLevel():number{
        level++
        return level
    }
    function addDlogId():string{
        const _id:string = `dialog-id-${level}`
        dialogIds.push(_id)
        return _id
    }
    function getDlogId():string{
        const _last =  dialogIds.pop() || ''
        return _last
    }
    return { getLevel,addDlogId,dialogIds }
})