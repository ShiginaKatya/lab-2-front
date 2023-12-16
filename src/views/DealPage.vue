<template>
    <div class="font-sans mx-auto my-4 pb-4 w-3/4">
        <div class="flex justify-between border-b-blue border-b p-2">
                <router-link to="/client" class=" text-sm text-black" >Клиенты</router-link>
                <router-link to="/agent" class=" text-sm text-black" >Риэлторы</router-link>
                <router-link to="/object" class=" text-sm text-black" >Объекты недвижимости</router-link>
                <router-link to="/need" class=" text-sm text-black" >Потребности</router-link>
                <router-link to="/offer" class=" text-sm text-black" >Предложения</router-link>
                <router-link to="/deal" class=" text-sm text-blue" >Сделки</router-link>
        </div>
        <div class="flex justify-between gap-2  w-10/12 my-4 mx-auto">
            <router-link to="/adddeal" class="block  text-s"><el-button  class="border-orange" type='primary' style="width: 200px" >Добавить</el-button></router-link>
        </div>
        <table class=" h-96 mx-auto w-10/12 border my-4 border-gray-600 ">
                <thead> <!-- Заголовок таблицы -->
                <tr class="text-xs"> 
                    <th class=" border  border-gray-500 p-2 w-3/12">Потребность</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-3/12">Предложение</th>  
                </tr>
                </thead>
                <tbody class="text-xs"> <!-- Заполнение таблицы -->
                    <tr @click="choose(deal.url)" v-for="deal in deals" :key="deal.id" class="" :style="getStyle(deal)" >
                        <td class=" border-collapse border p-2 h-4">Клиент: {{deal.demand.client?.first_name}}, Агент: {{deal.demand.agent?.first_name}}  </td> <!-- Номер строки -->
                        <td class="border-collapse border  p-2">Клиент: {{deal.supply.client?.first_name}}, Агент: {{deal.supply.agent?.first_name}}, Объект: {{ deal.supply.real_estate?.address_city }} {{deal.supply.real_estate?.address_street}} {{deal.supply.real_estate?.address_house}} {{deal.supply.real_estate?.address_number}}, Цена: {{deal.supply.price}} </td> 
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-start gap-5 mx-auto my-4 w-10/12 " >
                <router-link to="/updatedeal"><el-button  class="border-orange" style="width: 200px" >Редактировать</el-button></router-link>
                <el-button @click="del" class="border-orange "  type="danger" style="width: 200px">Удалить</el-button>
                <el-button @click="top" class="border-orange "  type="primary" style="width: 200px">Рассчитать</el-button>
            </div>
            <div class="mx-auto w-4/5" v-if="priceDeal">
              <p>Стоимость услуг для клиента-продавца - {{priceDeal.seller_price}}</p>
              <p>Стоимость услуг для клиента-покупателя - {{priceDeal.buyer_price}}</p>
              <p>Размер отчислений риэлтору клиента-продавца - {{priceDeal.seller_agent_price}}</p>
              <p>Размер отчислений риэлтору клиента-покупателя - {{priceDeal.buyer_agent_price}}</p>
              <p>Размер отчислений компании - {{priceDeal.company_price}}</p>
            </div>
    </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue';
import { store } from '@/store'
import axios from 'axios'
import { allowMultipleToast, closeToast, showLoadingToast, showNotify } from 'vant'

const deals = computed(() => store.state.deals )

export default {
    setup() {
       onMounted(async () => {
        console.log(13121312)
        await axios
            .get('http://127.0.0.1:8000/api/deals/')
            .then((res) => {
            store.commit('setDeals', res.data)
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
      deals: deals,
      selectedDeal: '',
      priceDeal: null,
    }
  },
 methods:{
    getStyle(deal) {
      if (deal.url === this.selectedDeal) {
        return {'background': 'lightgrey'}
      }
    },
    choose(dealId) {
      this.priceDeal = null
      this.selectedDeal = dealId 
      console.log(dealId)
      axios
        .get(`${this.selectedDeal}`)
        .then((res) => {
          this.deal = res.data
          store.commit('setDeal', res.data)
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
        .delete(`${this.selectedDeal}`)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      await axios
        .get('http://127.0.0.1:8000/api/deals/')
        .then((res) => {
          store.commit('setDeals', res.data)
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
            loadingToast.close()
        })
    },
    top(){
      this.priceDeal = this.deals.find(deal => deal.url === this.selectedDeal)
    }
  
 }
  }
</script>
