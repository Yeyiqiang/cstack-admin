import { defineComponent, PropType, ref, Ref } from 'vue'
import { RouteRecordRaw, RouterView } from 'vue-router'

export default defineComponent({
  setup(){
    return ()=>{
      return <div class="flex">
        <RouterView></RouterView>
      </div>
    }
  }
})
