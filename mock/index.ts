
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
/* 批量导入 */
const files = import.meta.glob('./modules/*.ts')

async function createMockModules(){
    const mockModules: any[] = []
    for(let key in files){
        const mod:any = await files[key]()
        mockModules.push(...mod.default);
    }
    return mockModules
}

/**
 * 在main.ts引入，需要手动启动mock服务
 */
export async function setupProdMockServer() {
    const mockModules = await createMockModules()
    createProdMockServer(mockModules);
}