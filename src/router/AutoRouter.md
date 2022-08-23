

##### 自动导入路由功能使用

pages文件结构
```pages
├── components                 # 组件默认不导入路由
│   └── ***                    # 组件文件
├── Error                      # 错误模块
│   └── index.tsx              # 错误页面
├── Main                       # 主页面
│   │── Home                   # 首页
│   │   │── index.tsx          # 主页面内子路由的页面
│   │   └── About              # 关于页面
│   │   │   └── index.tsx      # 首页内子路由的页面
│   └── index.tsx              # 需要重定向路由到子页面第一个(重定向配置查看下面)
└── start.tsx                  # 启动页面
```

文件导入后生成的路由表
```
baseRouter = [
    {
        "path":"/",
        "name":"start",
        "component":() => import('/src/pages/start.tsx')
    }
]
```
自动导入生成的路由表
```createRouterList
[
    {
        "path":"/error",
        "name":"Error",
        "children":[],
        "component":() => import('/src/pages/Error/index.tsx'),
        "redirect":false
    },
    {
        "path":"/main",
        "name":"Main",
        "children":[
            {
                "path":"/main/home",
                "name":"Home",
                "children":[
                    {
                        "path":"/main/home/about",
                        "name":"About",
                        "children":[],
                        "component":() => import('/src/pages/Main/Home/About/index.tsx'),
                        "redirect":false
                    }
                ],
                "component":() => import('/src/pages/Main/Home/index.tsx'),
                "redirect":false
            }
        ],
        "component":() => import('/src/pages/Main/index.tsx'),
        "redirect":"/main/home"
    }
]
```

> 需要重定向路由

例如/Main/index.tsx
```/Main/index.tsx
export const Index = defineComponent({
    isRedirect: true,//需要重定向路由,默认可为空,页面有<RouterView />,建议填写
    setup(){
        return ()=>{
            return (
                ...
                <RouterView></RouterView>
                ...
            )
        }
    }
})
```