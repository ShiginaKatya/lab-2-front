<template>  
    <div class="font-sans mx-auto my-8 pb-4 w-2/4">
        <img class="w-20 block mx-auto" src="logo.png" alt="">
        <van-form class="p-2" @submit="submit">
        <van-cell-group inset class="w-xl">
             <van-field style=""
            v-model="first_name"
            name="lastname"
            label="Фамилия"
            placeholder=""
            
            />
             <van-field style=""
            v-model="middle_name"
            name="firstname"
            label="Имя"
            placeholder=""
            />
             <van-field style=""
            v-model="last_name"
            name="middlename"
            label="Отчество"
            placeholder=""
            />
            <van-field style=""
            v-model="deal_share"
            name="share"
            label="Доля от комиссии"
            placeholder=""
            />
        </van-cell-group>
        <div class="flex justify-center gap-5 m-6" >
            <router-link to='/agent'><el-button @click="submit(agent.url)" style="width: 200px" >Сохранить</el-button></router-link>
            <router-link to='/agent'><el-button style="width: 200px;background-color:#F56C6C" type="danger" >Отменить</el-button></router-link>
        </div>

        </van-form>

 </div>
</template>



<script>
import { onMounted, computed } from 'vue';
import { store } from '@/store'
import { allowMultipleToast, closeToast, showLoadingToast, showNotify } from 'vant'
import axios from 'axios'

const agent = computed(() => store.state.agent )
export default {
  setup() {
    
  },
data: () => ({
    agent: agent.value,
    first_name: agent.value.first_name,
    middle_name: agent.value.middle_name,
    last_name: agent.value.last_name,
    deal_share: agent.value.deal_share,
    selectedAgent:'',
   
  }),
  props: {
    source: String
  },
  methods:{
    submit(agentUrl){
      this.selectedAgent = agentUrl
      allowMultipleToast()
      closeToast(true)
      const loadingToast = showLoadingToast({
        forbidClick: true,
        duration: 0,
        message: 'Загрузка...'
      })
      axios
        .patch(`${this.selectedAgent}`, {
          first_name: this.first_name,
          middle_name: this.middle_name,
          last_name: this.last_name,
          deal_share: this.deal_share
        })
        .then((res) => {
          console.log(res.data)
          // this.user = res.data
          store.commit('setAgent', res.data)
        })
        .catch((err) => {
          console.log(err)
          showNotify({ type: 'danger', message: 'Ошибка' })
        })
        .finally(() => {
            loadingToast.close()
        }
      )
    },
    }
  }
</script>

