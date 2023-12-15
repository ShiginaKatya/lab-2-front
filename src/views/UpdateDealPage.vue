<template>  
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
                <select class="w-10/12 h-8 " v-model="selected_supply">
                    <option v-for="offer in offers " :key="offer.id">
                    {{offer.client.first_name}}, {{offer.agent.first_name}}, {{ offer.real_estate.address_city }} {{offer.real_estate.address_street}} {{offer.real_estate.address_house}} {{offer.real_estate.address_number}}, {{offer.price}} 
                    </option>
                    
                </select>
            </div>
        </van-cell-group>
        <div class="flex justify-center gap-5 m-6" >
            <router-link to='/deal'><el-button @click="submit(deal.url)" style="width: 200px" >Сохранить</el-button></router-link>
            <router-link to='/deal'><el-button style="width: 200px;background-color:#F56C6C" type="danger" >Отменить</el-button></router-link>
        </div>

        </van-form>

 </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { store } from '@/store'
import { allowMultipleToast, closeToast, showLoadingToast, showNotify } from 'vant'
import axios from 'axios'

const offers = computed(() => store.state.offers )
const demands = computed(() => store.state.demands )
const deal = computed(() => store.state.deal )

export default {
  setup() {
    onMounted(() => {
      allowMultipleToast()
      closeToast(true)
      const loadingToast = showLoadingToast({
        forbidClick: true,
        duration: 0,
        message: 'Загрузка...'
      })
      axios
        .get(`http://127.0.0.1:8000/api/needs/`)
        .then((res) => {
          console.log(res.data)
          store.commit('setDemands', res.data)
        })
        .catch(() => {
          console.log('12312312312')
          showNotify({ type: 'danger', message: 'Ошибка' })
        })
        .finally(() => {
            loadingToast.close()
        })
    axios
        .get(`http://127.0.0.1:8000/api/offers/`)
        .then((res) => {
          console.log(res.data)
          store.commit('setOffers', res.data)
        })
        .catch(() => {
          console.log('12312312312')
          showNotify({ type: 'danger', message: 'Ошибка' })
        })
        .finally(() => {
            loadingToast.close()
        })
    
    })
  },
data: () => ({
    deal : deal.value,
    offers: offers,
    demands: demands,
    selected_supply: `${deal.value.supply.client.first_name}, ${deal.value.supply.agent.first_name}, ${deal.value.supply.real_estate.address_city} ${deal.value.supply.real_estate.address_street} ${deal.value.supply.real_estate.address_house} ${deal.value.supply.real_estate.address_number}, ${deal.value.supply.price}`,
    selected_demand: `${deal.value.demand.client.first_name}, ${deal.value.demand.agent.first_name}`,
    selectedDeal: '',
   



    
  }),
  props: {
    source: String
  },
  methods:{
    async submit(dealUrl){
      this.selectedDeal = dealUrl 
      console.log(this.selectedDeal)
      allowMultipleToast()
      closeToast(true)
      const loadingToast = showLoadingToast({
        forbidClick: true,
        duration: 0,
        message: 'Загрузка...'
      })
      await axios
        .patch(`${this.selectedDeal}`, {
           supply: this.offers.find(offer => `${offer.client.first_name}, ${offer.agent.first_name}, ${offer.real_estate.address_city} ${offer.real_estate.address_street} ${offer.real_estate.address_house} ${offer.real_estate.address_number}, ${offer.price}` === this.selected_supply).url,
           demand: this.demands.find(demand => `${demand.client.first_name}, ${demand.agent.first_name}` === this.selected_demand).url,
        })
        .then((res) => {
          console.log(res.data)
          // this.user = res.data
          store.commit('setDeal', res.data)
        })
        .catch((err) => {
          console.log(err)
          showNotify({ type: 'danger', message: 'Ошибка' })
        })
        .finally(() => {
            loadingToast.close()
        }
      )
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
    },
    }
  }
  
  
</script>

