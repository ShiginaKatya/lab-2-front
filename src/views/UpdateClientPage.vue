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
            name="first_name"
            label="Имя"
            placeholder=""
            />
            <van-field style=""
            v-model="last_name"
            name="middle_name"
            label="Отчество"
            placeholder=""
            />
            <van-field style=""
            v-model="email"
            type="email"
            name="email"
            label="Email"
            placeholder=""
            />
           
            <van-field style=""
            v-model="phone"
            type="tel"
            name="phone"
            label="Телефон"
            placeholder=""
            
            />
        </van-cell-group>
        <div class="flex justify-center gap-5 m-6" >
            <router-link to='/client'><el-button @click="submit(client.url)" style="width: 200px" >Сохранить</el-button></router-link>
            <router-link to='/client'><el-button style="width: 200px;background-color:#F56C6C" type="danger" >Отменить</el-button></router-link>
        </div>

        </van-form>

 </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { store } from '@/store'
import { allowMultipleToast, closeToast, showLoadingToast, showNotify } from 'vant'
import axios from 'axios'

const client = computed(() => store.state.client )
export default {
  setup() {
    
  },
data: () => ({
    client: client.value,
    first_name: client.value.first_name,
    middle_name: client.value.middle_name,
    last_name: client.value.last_name,
    phone: client.value.phone,
    email: client.value.email,
    selectedClient:'',
   
  }),
  props: {
    source: String
  },
  methods:{
    submit(clientUrl){
      this.selectedClient = clientUrl
      allowMultipleToast()
      closeToast(true)
      const loadingToast = showLoadingToast({
        forbidClick: true,
        duration: 0,
        message: 'Загрузка...'
      })
      axios
        .patch(`${this.selectedClient}`, {
          first_name: this.first_name,
          middle_name: this.middle_name,
          last_name: this.last_name,
          email: this.email,
          phone: this.phone,
        })
        .then((res) => {
          console.log(res.data)
          // this.user = res.data
          store.commit('setClient', res.data)
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
