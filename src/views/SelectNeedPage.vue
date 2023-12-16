<template>
<div class="font-sans mx-auto my-4 pb-4 w-3/4">
        <div class="border-b-blue border-b p-2">
                
            <router-link to="/offer" class=" text-sm text-blue" >Потребности</router-link>
                
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
                    <tr  v-for="demand in demands" :key="demand.id" class=""  >
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
        <div class="font-sans mx-auto my-8 pb-4 w-2/4">
            <van-form class="p-2" @submit="submit">
            <van-cell-group inset class="w-xl">
                <div class="text-sm flex justify-between gap-8 m-4 border-b">
                    <p>Потребность</p>
                    <select class="w-10/12 h-8 " v-model="selected_demand">
                        <option v-for="demand in demands " :key="demand.id">
                        {{demand.client.first_name}}, {{demand.agent.first_name}}  
                        </option>
                    </select>
                </div>
                <div class="text-sm flex justify-between gap-8 m-4 border-b">
                    <p>Предложение</p>
                    <select class="w-10/12 h-8 " v-model="selected_supply" disabled>
                        <option v-for="offer in offers " :key="offer.id">
                        {{offer.client.first_name}}, {{offer.agent.first_name}}, {{ offer.real_estate.address_city }} {{offer.real_estate.address_street}} {{offer.real_estate.address_house}} {{offer.real_estate.address_number}}, {{offer.price}} 
                        </option>
                        
                    </select>
                </div>
            </van-cell-group>
            <div class="flex justify-center gap-5 m-6" >
                <router-link to='/deal'><el-button @click="submit()" style="width: 200px" >Сохранить</el-button></router-link>
                <router-link to='/offer'><el-button style="width: 200px;background-color:#F56C6C" type="danger" >Отменить</el-button></router-link>
            </div>

            </van-form>
        </div>

    </div>
</template>
<script>
import { onMounted, computed } from 'vue';
import { store } from '@/store'
import { allowMultipleToast, closeToast, showLoadingToast, showNotify } from 'vant'
import axios from 'axios'

const offers = computed(() => store.state.offers )
const demands = computed(() => store.state.select_demands)
const offer = computed(() => store.state.offer)


export default {
  
data: () => ({
    demands : demands,
    offers: offers,
    offer: offer.value,
    selected_supply: `${offer.value.client.first_name}, ${offer.value.agent.first_name}, ${offer.value.real_estate.address_city} ${offer.value.real_estate.address_street} ${offer.value.real_estate.address_house} ${offer.value.real_estate.address_number}, ${offer.value.price}`,
    selected_demand: '',
  }),
  
  methods:{
     submit(){
       axios
        .post('http://127.0.0.1:8000/api/deals/', {
           supply: this.offers.find(offer => `${offer.client.first_name}, ${offer.agent.first_name}, ${offer.real_estate.address_city} ${offer.real_estate.address_street} ${offer.real_estate.address_house} ${offer.real_estate.address_number}, ${offer.price}` === this.selected_supply).url,
           demand: this.demands.find(demand => `${demand.client.first_name}, ${demand.agent.first_name}` === this.selected_demand).url
        })
       .then(res => console.log(res))
      

    }
  }
}
  
</script>