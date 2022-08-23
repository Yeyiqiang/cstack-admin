
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Start from '../pages/start'
import type { AppRouteRecordRaw } from './types';
import { App } from 'vue'
/* 批量导入 */
const files: Record<string,any> = import.meta.glob(['@/pages/**/*.tsx','!**/components'])

console.log(files);

const baseRouter:AppRouteRecordRaw[] = [
    {
        path: '/',
        name: 'start',
        component: Start,
    }
]

interface ROUTER_MODULE {
    [key:string]:Object,
}
/* 加入到路由集合中 */
async function createRouterList(){
    const routeModuleObj:ROUTER_MODULE = {};
    const routeModuleList:Array<any> = [];
    /* 找出映射表中的key */
    for(let key in files){
        const mod:any = await files[key]()
        /* 找出当前页面的keyName,对应export的值 */
        for (let keyName in mod) {
            // console.log(mod[keyName].isRouter);
            const nameMatch = key.match(/^\/src\/pages(.+)\/index.tsx/) || []
            /* 正则找出来会是['/src/x(xx|xx/yy|...)/index.tsx','x'] */
            if(nameMatch[1]){
                const nameArr = nameMatch[1].split("/")
                /* 路径转成单个地址对象，用于 */
                for( let i=1; i<nameArr.length; i++ ){
                    routeModuleObj[nameArr[i]]={ 
                        path: nameMatch[1].toLocaleLowerCase(),
                        name: nameArr[i],
                        children: [],
                        component: mod[keyName],
                        redirect: mod[keyName].isRedirect?true:false,
                        parent: i==1 ? 'root' : nameArr[i-1]
                    }
                }
            }
        }        
    }
    /* 数组转成对象组 */
    for(let routeKey in routeModuleObj){
        routeModuleList.push(routeModuleObj[routeKey])
    }
    /* 数组转成目录树（路由树）根目录不做插入路由children */
    for( let k=0; k<routeModuleList.length; k++ ){
        let parent = routeModuleList[k].parent;
        if(parent != 'root'){
            for( let s=0; s<routeModuleList.length; s++ ){
                if(routeModuleList[s].name == parent){
                    const _route = {...routeModuleList[k]}
                    delete _route.parent;/* 删除不需要的字段 */
                    routeModuleList[s].children.push(_route)
                    /* 是否需要重定向到子组件页面 */
                    if(routeModuleList[s].redirect){
                        routeModuleList[s].redirect = routeModuleList[s].children[0].path
                    }
                }
            }
        }
    }
    /* 查找出根目录并导出 */
    return routeModuleList.filter(ele=>{
        if(ele.parent=='root'){
            delete ele.parent
            return ele
        }
    })
}

export async function setRouters(app:App<Element>){
    const loadRouter = await createRouterList()
    const routerList:RouteRecordRaw[] = [...baseRouter,...loadRouter]
    console.log(routerList);
    const history = createWebHistory()
    const router = createRouter({
        // 创建一个 hash 历史记录。
        history: history,
        // 应该添加到路由的初始路由列表。
        routes: routerList as RouteRecordRaw[],
        // 是否应该禁止尾部斜杠。默认为假
        strict: false
    });
    app.use(router);
}
