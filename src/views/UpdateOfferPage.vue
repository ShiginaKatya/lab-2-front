<template>  
    <div class="font-sans mx-auto my-8 pb-4 w-2/4">
        <img class="w-20 block mx-auto" src="logo.png" alt="">
        <van-form class="p-2" @submit="submit">
        <van-cell-group inset class="w-xl">
            <div class="text-sm flex justify-between gap-8 m-4 border-b">
                <p>Клиент</p>
                <select class="w-10/12 h-8 " v-model="selected_client">
                    <option v-for="client in clients " :key="client.id">
                    {{ client.first_name }} 
                    </option>
                    
                </select>
            </div>
            <div class="text-sm flex justify-between gap-8 m-4 border-b">
                <p>Риэлтор</p>
                <select class="w-10/12 h-8 " v-model="selected_agent">
                    <option v-for="agent in agents " :key="agent.id">
                    {{ agent.first_name}} 
                    </option>
                    
                </select>
            </div>
           <div class="text-sm flex justify-between gap-8 m-4 border-b">
                <p>Объект недвижимости</p>
                <select class="w-10/12 h-8 " v-model="selected_object">
                    <option v-for="object in objects " :key="object.id">
                    {{ object.address_city }} {{object.address_street}} {{object.address_house}} {{object.address_number}} 
                    </option>
                </select>
            </div>
            <van-field style=""
            v-model="price"
            name="price"
            label="Цена"
            placeholder=""
            
            />
        </van-cell-group>
        <div class="flex justify-center gap-5 m-6" >
            <router-link to='/offer'><el-button @click="submit(offer.url)" style="width: 200px" >Сохранить</el-button></router-link>
            <router-link to='/offer'><el-button style="width: 200px;background-color:#F56C6C" type="danger" >Отменить</el-button></router-link>
        </div>

        </van-form>

 </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { store } from '@/store'
import { allowMultipleToast, closeToast, showLoadingToast, showNotify } from 'vant'
import axios from 'axios'

const clients = computed(() => store.state.clients )
const agents = computed(() => store.state.agents )
const objects = computed(() => store.state.objects )
const offer = computed(() => store.state.offer )

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
        .get(`http://127.0.0.1:8000/api/clients/`)
        .then((res) => {
          console.log(res.data)
          store.commit('setClients', res.data)
        })
        .catch(() => {
          console.log('12312312312')
          showNotify({ type: 'danger', message: 'Ошибка' })
        })
        .finally(() => {
            loadingToast.close()
        })
    axios
        .get(`http://127.0.0.1:8000/api/agents/`)
        .then((res) => {
          console.log(res.data)
          store.commit('setAgents', res.data)
        })
        .catch(() => {
          console.log('12312312312')
          showNotify({ type: 'danger', message: 'Ошибка' })
        })
        .finally(() => {
            loadingToast.close()
        })
    axios
        .get(`http://127.0.0.1:8000/api/objects/`)
        .then((res) => {
          console.log(res.data)
          store.commit('setObjects', res.data)
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
    offer : offer.value,
    selected_client: offer.value.client.first_name,
    selected_agent: offer.value.agent.first_name,
    selected_object: `${offer.value.real_estate.address_city} ${offer.value.real_estate.address_street} ${offer.value.real_estate.address_house} ${offer.value.real_estate.address_number}`,
    price: offer.value.price,
    selectedOffer: '',
    clients: clients,
    objects: objects,
    agents: agents




    
  }),
  props: {
    source: String
  },
  methods:{
    submit(offerUrl){
      this.selectedOffer = offerUrl 
      console.log(this.selectedOffer)
      allowMultipleToast()
      closeToast(true)
      const loadingToast = showLoadingToast({
        forbidClick: true,
        duration: 0,
        message: 'Загрузка...'
      })
      axios
        .patch(`${this.selectedOffer}`, {
           client: this.clients.find(client => client.first_name === this.selected_client).url,
           agent: this.agents.find(agent => agent.first_name === this.selected_agent).url,
           real_estate: this.objects.find(object => `${object.address_city} ${object.address_street} ${object.address_house} ${object.address_number}` === this.selected_object).url,
           price: this.price



        })
        .then((res) => {
          console.log(res.data)
          // this.user = res.data
          store.commit('setOffer', res.data)
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

