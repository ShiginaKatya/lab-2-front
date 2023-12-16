<template>  
    <div class="font-sans mx-auto my-8 pb-4 w-2/4">
        <van-form class="p-2" @submit="submit">
        <van-cell-group inset class="w-xl">
            <div class="text-sm flex justify-between gap-8 m-4 border-b">
                <p>Tип</p>
                <select class="w-10/12 h-8 " v-model="selected">
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
             <van-field style="" v-if="(selected === 'Дом')|(selected ==='Квартира')"
            v-model="address_house"
            name="house"
            label="Дом"
            placeholder=""
            />
            <van-field style="" v-if="(selected ==='Квартира')"
            v-model="address_number"
            name="number"
            label="Номер квартиры"
            placeholder=""
            />
            <van-field style=""
            v-model="latitude"
            name="latitude"
            label="Широта"
            placeholder=""
            
            />
             <van-field style=""
            v-model="logitude"
            name="longitude"
            label="Долгота"
            placeholder=""
            
            />
             <van-field style=""
            v-model="total_area"
            name="area"
            label="Площадь"
            placeholder=""
            
            />
            
             <van-field style="" v-if="(selected === 'Дом')"
                v-model="total_floors"
                name="floors"
                label="Этажность"
                placeholder=""
            
            />
             <van-field style="" v-if="(selected ==='Квартира')"
                v-model="floor"
                name="floor"
                label="Этаж"
                placeholder=""
            
            />
             <van-field style="" v-if="(selected ==='Квартира')"
                v-model="rooms"
                name="rooms"
                label="Количество комнат"
                placeholder=""
            
            />
        </van-cell-group>
        <div class="flex justify-center gap-5 m-6" >
            <router-link to='/object'><el-button @click="submit" style="width: 200px" >Сохранить</el-button></router-link>
            <router-link to='/object'><el-button style="width: 200px;background-color:#F56C6C" type="danger" >Отменить</el-button></router-link>
        </div>

        </van-form>

 </div>
</template>

<script>

import { ref, onMounted, computed } from 'vue';
import { store } from '@/store'
import axios from 'axios'

const types = computed(() => store.state.types )

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
            })})
},
  data() {
    return {
        types: types,
        selected: null,
        address_city: null,
        address_street: null,
        address_house: '',
        address_number: '',
        latitude: null,
        logitude: null,
        total_area: null,
        total_floors: null,
        rooms: '',
        floor: '',
        type: null
    }
  },
  props: {
    source: String
  },
  methods: {
    submit() {     
    //   let officeUrl = this.offices.find(office => office.title === this.selected).url
      axios
        .post('http://127.0.0.1:8000/api/objects/', {
            address_city: this.address_city,
            address_street: this.address_street,
            address_house: this.address_house,
            address_number: this.address_number,
            latitude: this.latitude,
            logitude: this.logitude,
            total_area: this.total_area,
            total_floors: this.total_floors,
            rooms: this.rooms,
            floor: this.floor,
            type: this.types.find(type => type.name === this.selected).url,
        })
        .then(res => console.log(res))
    },
  },
}
</script>
