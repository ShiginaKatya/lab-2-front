<template>
    <div class="font-sans mx-auto my-4 pb-4 w-3/4">
        <div class="flex justify-between border-b-blue border-b p-2">
                <router-link to="/client" class=" text-sm text-blue" >Клиенты</router-link>
                <router-link to="/agent" class=" text-sm text-black" >Риэлторы</router-link>
                <router-link to="/object" class=" text-sm text-black" >Объекты недвижимости</router-link>
                <router-link to="/need" class=" text-sm text-black" >Потребности</router-link>
                <router-link to="/offer" class=" text-sm text-black" >Предложения</router-link>
                <router-link to="/deal" class=" text-sm text-black" >Сделки</router-link>
        </div>
        <div class="flex justify-between gap-2  w-10/12 my-4 mx-auto">
            <fieldset class="flex justify-start gap-2">
                <p>Поиск</p>
                <input v-model="poisk" class="w-9/12 border rounded-md" type="text"> 
                <el-button @click="search" class="border-orange "  style="width: 200px">Найти</el-button>
            </fieldset>
            <router-link to="/addclient" class="block  text-s"><el-button  class="border-orange" type='primary' style="width: 200px" >Добавить</el-button></router-link>
        </div>
        <table class=" h-96 mx-auto w-10/12 border my-4 border-gray-600 ">
                <thead> <!-- Заголовок таблицы -->
                <tr class="text-xs"> 
                    <th class=" border  border-gray-500 p-2 w-1/6">Фамилия</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-1/6">Имя</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-1/6">Отчество</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-1/6">Телефон</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-1/6">Email</th>
                </tr>
                </thead>
                <tbody class="text-xs"> <!-- Заполнение таблицы -->
                    <tr  @click="choose(client.url)"  v-for="client in clients" :key="client.id" class="" :style="getStyle(client)" >
                        <td class=" border-collapse border p-2 h-4">{{client.first_name}}</td> <!-- Номер строки -->
                        <td class="border-collapse border  p-2">{{client.middle_name}}</td> 
                        <td class="border-collapse border  p-2">{{client.last_name}}</td> 
                        <td class="border-collapse border  p-2">{{client.phone}}</td>
                        <td class="border-collapse border  p-2">{{client.email}}</td>  
                    </tr>
                    
                </tbody>
            </table>
            <div class="flex justify-start gap-5 mx-auto my-4 w-10/12 " >
                <router-link to="/updateclient"><el-button  class="border-orange" style="width: 200px" >Редактировать</el-button></router-link>
                <el-button @click="del" class="border-orange "  type="danger" style="width: 200px">Удалить</el-button>
            </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { store } from '@/store'
import axios from 'axios'
import { allowMultipleToast, closeToast, showLoadingToast, showNotify } from 'vant'

const clients = computed(() => store.state.clients )

export default {
    setup() {
       onMounted(async () => {
        console.log(13121312)
        await axios
            .get('http://127.0.0.1:8000/api/clients/')
            .then((res) => {
            store.commit('setClients', res.data)
            console.log(res)
            })
            .catch((err) => {
            console.log(err)
            showNotify({ type: 'danger', message: 'Ошибка' })
            }) 
    },)
},
data() {
    return {
      clients: clients,
      selectedClient: '',
      poisk: ''
      
    }
  },
 methods:{
    getStyle(client) {
      if (client.url === this.selectedClient) {
        return {'background': 'lightgrey'}
      }
    },
    choose(clientId) { 
      this.selectedClient = clientId 
      console.log(clientId)
      axios
        .get(`${this.selectedClient}`)
        .then((res) => {
          this.client = res.data
          store.commit('setClient', res.data)
        })
        .catch(() => {
          console.log('12312312312')
          showNotify({ type: 'danger', message: 'Ошибка' })
        })
    },
    async del(){
      allowMultipleToast()
      closeToast(true)
      const loadingToast = showLoadingToast({
        forbidClick: true,
        duration: 0,
        message: 'Загрузка...'
      })
      await axios
        .delete(`${this.selectedClient}`)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      await axios
        .get('http://127.0.0.1:8000/api/clients/')
        .then((res) => {
          store.commit('setClients', res.data)
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
            loadingToast.close()
        })
    },
  search(){
    console.log(this.poisk, 1111)
      axios
        .get('http://127.0.0.1:8000/api/clients/',{
          params: {
            fio: this.poisk !== "" ? this.poisk : null
          }
        })
        .then((res) => {
          store.commit('setClients', res.data)
          // this.objects = res.data
        })
        .catch((err) => {
          console.log(err)
          showNotify({ type: 'danger', message: 'Ошибка' })
        })
    }
  
 }
  }
</script>
