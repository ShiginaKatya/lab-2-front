<template>
    <div class="font-sans mx-auto my-4 pb-4 w-3/4">
        <div class="flex justify-between border-b-blue border-b p-2">
                <router-link to="/client" class=" text-sm text-black" >Клиенты</router-link>
                <router-link to="/agent" class=" text-sm text-black" >Риэлторы</router-link>
                <router-link to="/object" class=" text-sm text-black" >Объекты недвижимости</router-link>
                <router-link to="/need" class=" text-sm text-blue" >Потребности</router-link>
                <router-link to="/offer" class=" text-sm text-black" >Предложения</router-link>
                <router-link to="/deal" class=" text-sm text-black" >Сделки</router-link>
        </div>
        <div class="flex justify-between gap-2  w-10/12 my-4 mx-auto">
            
            <router-link to="/addneed" class="block  text-s"><el-button  class="border-orange" type='primary' style="width: 200px" >Добавить</el-button></router-link>
        </div>
        <table class=" h-96 mx-auto w-10/12 border my-4 border-gray-600 ">
                <thead> <!-- Заголовок таблицы -->
                <tr class="text-xs"> 
                    <th class=" border  border-gray-500 p-2 w-3/12">Клиент</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-3/12">Риэлтор</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-3/12">Тип обьекта недвижимости</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-3/12">Адрес</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-1/12">Площадь</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-1/12">Кол-во комнат</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-1/12">Этажность</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-1/12">Этаж</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-3/12">Минимальная Цена</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-3/12">Максимальная Цена</th>
                </tr>
                </thead>
                <tbody class="text-xs"> <!-- Заполнение таблицы -->
                    <tr @click="choose(demand.url)" v-for="demand in demands" :key="demand.id" class="" :style="getStyle(demand)" >
                        <td class=" border-collapse border p-2 h-4">{{demand.client.first_name}}</td> <!-- Номер строки -->
                        <td class="border-collapse border  p-2">{{demand.agent.first_name}}</td> 
                        <td class="border-collapse border  p-2">{{demand.type.name}}</td> 
                        <td class="border-collapse border  p-2">{{demand.address_city}} {{demand.address_street}} {{demand.address_house}} {{demand.address_number}} </td> 
                        <td class="border-collapse border  p-2 ">{{demand.min_area}} - {{demand.max_area}}</td>
                        <td class="border-collapse border  p-2  ">{{demand.min_rooms}} - {{demand.max_rooms}}</td>
                        <td class="border-collapse border  p-2  ">{{demand.min_floors}} - {{demand.max_floors}}</td>
                        <td class="border-collapse border  p-2  ">{{demand.min_floor}} - {{demand.max_floor}}</td>
                        <td class="border-collapse border  p-2  ">{{demand.min_price}}</td>
                        <td class="border-collapse border  p-2  ">{{demand.max_price}}</td>
                    </tr>
                </tbody>
            </table>
            <div class=" flex justify-between gap-5 mx-auto my-4 w-10/12" >
              <div class="flex justify-start gap-5 mx-auto " >
                  <router-link to="/updateneed"><el-button  class="border-orange" style="width: 200px" >Редактировать</el-button></router-link>
                  <el-button @click="del" class="border-orange "  type="danger" style="width: 200px">Удалить</el-button>
              </div>
              <router-link to="/selectoffer">
                <el-button @click="view"   class="border-orange" style="width: 200px" >Подобрать предложения</el-button>
              </router-link>
            </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { store } from '@/store'
import axios from 'axios'
import { allowMultipleToast, closeToast, showLoadingToast, showNotify } from 'vant'

const demands = computed(() => store.state.demands )


export default {
    setup() {
       onMounted(async () => {
        console.log(13121312)
        await axios
            .get('http://127.0.0.1:8000/api/needs/')
            .then((res) => {
            store.commit('setDemands', res.data)
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
      demands: demands,
      selectedDemand: '',
      
    }
  },

 methods:{
    getStyle(demand) {
      if (demand.url === this.selectedDemand) {
        return {'background': 'lightgrey'}
      }
    },
    choose(demandUrl) { 
      this.selectedDemand = demandUrl 
      console.log(demandUrl)
      axios
        .get(`${this.selectedDemand}`)
        .then((res) => {
          this.demand = res.data
          console.log(res.data)
          store.commit('setDemand', res.data)
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
        .delete(`${this.selectedDemand}`)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          showNotify({ type: 'danger', message: 'Запись не может быть удалена, потребность участвует в сделке' })
          console.log(err)
          
        })
      await axios
        .get('http://127.0.0.1:8000/api/needs/')
        .then((res) => {
          store.commit('setDemands', res.data)
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
            loadingToast.close()
        })
    },
    async view(){
      await axios
        .get(`${this.selectedDemand}approach/`)
        .then(res => {
          store.commit('setSelectOffers', res.data)
          
        })
        .catch(err => console.log(err))
      await axios
        .get(`${this.selectedDemand}`)
        .then(res => {
          store.commit('setDemand', res.data)
          
        })
        .catch(err => console.log(err))
    }
  
 },

  }
</script>
