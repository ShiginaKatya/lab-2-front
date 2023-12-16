<template>
    <div class="font-sans mx-auto my-4 pb-4 w-3/4">
        <div class="flex justify-between border-b-blue border-b p-2">
                <img class="w-20" src="logo.png" alt="">
                <router-link to="/client" class=" text-sm text-black" >Клиенты</router-link>
                <router-link to="/agent" class=" text-sm text-blue" >Риэлторы</router-link>
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
            <router-link to="/addagent" class="block  text-s"><el-button  class="border-orange" type='primary' style="width: 200px" >Добавить</el-button></router-link>
        </div>
        <table class=" h-96 mx-auto w-10/12 border my-4 border-gray-600 ">
                <thead> <!-- Заголовок таблицы -->
                <tr class="text-xs"> 
                    <th class=" border  border-gray-500 p-2 w-3/12">Фамилия</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-3/12">Имя</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-3/12">Отчество</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-3/12">Доля от комиссии</th>
                </tr>
                </thead>
                <tbody class="text-xs"> <!-- Заполнение таблицы -->
                    <tr @click="choose(agent.url)" v-for="agent in agents" :key="agent.id" class="" :style="getStyle(agent)" >
                        <td class=" border-collapse border p-2 h-4">{{agent.first_name}}</td> <!-- Номер строки -->
                        <td class="border-collapse border  p-2">{{agent.middle_name}}</td> 
                        <td class="border-collapse border  p-2">{{agent.last_name}}</td> 
                        <td class="border-collapse border  p-2">{{agent.deal_share}}</td> 
                    </tr>
                </tbody>
            </table>
            <div class=" flex justify-between gap-5 mx-auto my-4 w-10/12" >
              <div class="flex justify-start gap-5 mx-auto " >
                  <router-link to="/updateagent"><el-button  class="border-orange" style="width: 200px" >Редактировать</el-button></router-link>
                  <el-button @click="del" class="border-orange "  type="danger" style="width: 200px">Удалить</el-button>
              </div>
              <router-link to="/approach">
                <el-button @click="view"  class="border-orange" style="width: 200px" >Где участвует</el-button>
              </router-link>
            </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { store } from '@/store'
import axios from 'axios'
import { allowMultipleToast, closeToast, showLoadingToast, showNotify } from 'vant'

const agents = computed(() => store.state.agents )

export default {
    setup() {
       onMounted(async () => {
        console.log(13121312)
        await axios
            .get('http://127.0.0.1:8000/api/agents/')
            .then((res) => {
            store.commit('setAgents', res.data)
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
      agents: agents,
      selectedAgent: '',

      
    }
  },
 methods:{
    getStyle(agent) {
      if (agent.url === this.selectedAgent) {
        return {'background': 'lightgrey'}
      }
    },
    choose(agentUrl) { 
      this.selectedAgent = agentUrl 
      console.log(agentUrl)
      axios
        .get(`${this.selectedAgent}`)
        .then((res) => {
          this.agent = res.data
          store.commit('setAgent', res.data)
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
        .delete(`${this.selectedAgent}`)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          showNotify({ type: 'danger', message: 'Запись не может быть удалена, риэлтор связан с предложением/потребностью ' })
          console.log(err)
        })
      await axios
        .get('http://127.0.0.1:8000/api/agents/')
        .then((res) => {
          store.commit('setAgents', res.data)
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
        .get('http://127.0.0.1:8000/api/agents/',{
          params: {
            fio: this.poisk !== "" ? this.poisk : null
          }
        })
        .then((res) => {
          store.commit('setAgents', res.data)
          // this.objects = res.data
        })
        .catch((err) => {
          console.log(err)
          showNotify({ type: 'danger', message: 'Ошибка' })
        })
    },
    async view(){
      await axios
        .get(`${this.selectedAgent}deals/`)
        .then(res => {
          store.commit('setApproachOffers', res.data.offers)
          store.commit('setApproachDemands', res.data.demands)
        })
        .catch(err => console.log(err))
    }
  
 }
  }
</script>
