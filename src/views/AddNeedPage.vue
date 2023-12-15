<template>  
    <div class="font-sans mx-auto my-8 pb-4 w-2/4">
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
                    {{ agent.first_name }} 
                    </option>
                    
                </select>
            </div>
           <div class="text-sm flex justify-between gap-8 m-4 border-b">
                <p>Тип объекта недвижимости</p>
                <select class="w-10/12 h-8 " v-model="selected_type">
                   <option v-for="type in types " :key="type.id">
                    {{ type.name }} 
                    </option>
                </select>
            </div>
            <van-field style=""
            v-model="address_city"
            name="city"
            label="Город"
            placeholder=""
            
            />
             <van-field style=""
            v-model="address_street"
            name="street"
            label="Улица"
            placeholder=""
            />
             <van-field style="" v-if="(selected_type === 'Дом')|(selected_type ==='Квартира')"
            v-model="address_house"
            name="house"
            label="Дом"
            placeholder=""
            />
            <van-field style="" v-if="(selected_type ==='Квартира')"
            v-model="address_number"
            name="number"
            label="Номер квартиры"
            placeholder=""
            />
            
             <van-field style=""
            v-model="min_area"
            name="area"
            label="Минимальная Площадь"
            placeholder=""
            
            />
            <van-field style=""
            v-model="max_area"
            name="area"
            label="Максимальная Площадь"
            placeholder=""
            
            />
            
             <van-field style="" v-if="(selected_type === 'Дом')"
                v-model="min_floors"
                name="floors"
                label="Минимальная Этажность"
                placeholder=""
            
            />
            <van-field style="" v-if="(selected_type === 'Дом')"
                v-model="max_floors"
                name="floors"
                label="Максимальная Этажность"
                placeholder=""
            
            />
             <van-field style="" v-if="(selected_type ==='Квартира')"
                v-model="min_floor"
                name="floor"
                label="Минимальный Этаж"
                placeholder=""
            
            />
            <van-field style="" v-if="(selected_type ==='Квартира')"
                v-model="max_floor"
                name="floor"
                label="Максимальный Этаж"
                placeholder=""
            
            />
             <van-field style="" v-if="(selected_type ==='Квартира')"
                v-model="min_rooms"
                name="rooms"
                label="Минимальное Количество комнат"
                placeholder=""
            
            />
            <van-field style="" v-if="(selected_type ==='Квартира')"
                v-model="max_rooms"
                name="rooms"
                label="Максимальное Количество комнат"
                placeholder=""
            
            />
            <van-field style=""
            v-model="min_price"
            name="minprice"
            label="Минимальная Цена"
            placeholder=""
            
            />
            <van-field style=""
            v-model="max_price"
            name="maxprice"
            label="Максимальная Цена"
            placeholder=""
            
            />
        </van-cell-group>
        <div class="flex justify-center gap-5 m-6" >
            <router-link to='/need'><el-button @click="submit" style="width: 200px" >Сохранить</el-button></router-link>
            <router-link to='/need'><el-button style="width: 200px;background-color:#F56C6C" type="danger" >Отменить</el-button></router-link>
        </div>

        </van-form>

 </div>
</template>

<script>

import { ref, onMounted, computed } from 'vue';
import { store } from '@/store'
import axios from 'axios'

const types = computed(() => store.state.types )
const clients = computed(() => store.state.clients )
const agents = computed(() => store.state.agents )

export default {
    components:{
  },
setup() {
    onMounted(async () => {
        console.log(13121312)
        await axios
            .get('http://127.0.0.1:8000/api/types/')
            .then((res) => {
            store.commit('setTypes', res.data)
            console.log(res)
            })
            .catch((err) => {
            console.log(err)
            showNotify({ type: 'danger', message: 'Ошибка' })
            })
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
            })
        
},
  data() {
    return {
        clients: clients,
        agents: agents,
        types: types,
        selected_client: null,
        selected_agent: null,
        selected_type: null,
        address_city: '',
        address_street: '',
        address_house: '',
        address_number: '',
        min_price: null,
        max_price: null,
        min_area: null,
        min_floors: null,
        max_area: null,
        max_floors: null,
        min_rooms: null,
        max_rooms: null,
        min_floor: null,
        max_floor: null,
        
    }
  },
  props: {
    source: String
  },
  methods: {
    submit() {     
    //   let officeUrl = this.offices.find(office => office.title === this.selected).url
      axios
        .post('http://127.0.0.1:8000/api/needs/', {
            address_city: this.address_city,
            address_street: this.address_street,
            address_house: this.address_house,
            address_number: this.address_number,
            min_price: this.min_price,
            max_price: this.max_price,
            min_area: this.min_area,
            min_floors: this.min_floors,
            max_area: this.max_area,
            max_floors: this.max_floors,
            min_rooms: this.min_rooms,
            max_rooms: this.max_rooms,
            min_floor: this.min_floor,
            max_floor: this.max_floor,
            client: this.clients.find(client => client.first_name === this.selected_client).url,
            agent: this.agents.find(agent => agent.first_name === this.selected_agent).url,
            type: this.types.find(type => type.name === this.selected_type).url,
        })
        .then(res => console.log(res))
    },
  },
}
</script>
