<template>
<div class="font-sans mx-auto my-4 pb-4 w-3/4">
        <div class="border-b-blue border-b p-2">
                
            <router-link to="/offer" class=" text-sm text-blue" >Предложения</router-link>
                
        </div>
        <table class=" mx-auto w-10/12 border my-4 border-gray-600 ">
                <thead> <!-- Заголовок таблицы -->
                <tr class="text-xs"> 
                    <th class=" border  border-gray-500 p-2 w-3/12">Клиент</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-3/12">Риэлтор</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-3/12">Обьект недвижимости</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-3/12">Цена</th>
                </tr>
                </thead>
                <tbody class="text-xs"> <!-- Заполнение таблицы -->
                    <tr  v-for="offer in offers" :key="offer.id" class="" >
                        <td class=" border-collapse border p-2 h-4">{{offer.client.first_name}}</td> <!-- Номер строки -->
                        <td class="border-collapse border  p-2">{{offer.agent.first_name}}</td> 
                        <td class="border-collapse border  p-2">{{ offer.real_estate.address_city }} {{offer.real_estate.address_street}} {{offer.real_estate.address_house}} {{offer.real_estate.address_number}}</td> 
                        <td class="border-collapse border  p-2">{{offer.price}}</td> 
                    </tr>
                </tbody>
            </table>
        <div class="font-sans mx-auto my-8 pb-4 w-2/4">
            <van-form class="p-2" @submit="submit">
            <van-cell-group inset class="w-xl">
                <div class="text-sm flex justify-between gap-8 m-4 border-b">
                    <p>Потребность</p>
                    <select class="w-10/12 h-8 " v-model="selected_demand" disabled>
                        <option v-for="demand in demands " :key="demand.id">
                        {{demand.client.first_name}}, {{demand.agent.first_name}}  
                        </option>
                    </select>
                </div>
                <div class="text-sm flex justify-between gap-8 m-4 border-b">
                    <p>Предложение</p>
                    <select class="w-10/12 h-8 " v-model="selected_supply">
                        <option v-for="offer in offers " :key="offer.id">
                        {{offer.client.first_name}}, {{offer.agent.first_name}}, {{ offer.real_estate.address_city }} {{offer.real_estate.address_street}} {{offer.real_estate.address_house}} {{offer.real_estate.address_number}}, {{offer.price}} 
                        </option>
                        
                    </select>
                </div>
            </van-cell-group>
            <div class="flex justify-center gap-5 m-6" >
                <router-link to='/deal'><el-button @click="submit()" style="width: 200px" >Сохранить</el-button></router-link>
                <router-link to='/need'><el-button style="width: 200px;background-color:#F56C6C" type="danger" >Отменить</el-button></router-link>
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

const offers = computed(() => store.state.select_offers )
const demands = computed(() => store.state.demands)
const demand = computed(() => store.state.demand)


export default {
  
data: () => ({
    demands : demands,
    offers: offers,
    selected_supply: '',
    demand: demand.value,
    selected_demand: `${demand.value.client.first_name}, ${demand.value.agent.first_name}`,
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