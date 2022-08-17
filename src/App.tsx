
import { defineComponent, PropType, ref, Ref } from 'vue'
import { RouteRecordRaw, RouterView } from 'vue-router'
// import classes from './app.module.scss'
import "./main.css"
// import { Layout } from "./Layout";

export default defineComponent({
  props:{
    routes:{
      type : Array as PropType<RouteRecordRaw[]>,
      // required : true
    }
  },
  setup(props){
    // console.log(props.routes);
    return ()=>{
      return <div>
        <RouterView></RouterView>
      </div>
    }
  }
})
