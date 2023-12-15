<template>  
    <div class="font-sans mx-auto my-8 pb-4 w-2/4">
        <van-form class="p-2" @submit="submit">
        <van-cell-group inset class="w-xl">
            <div class="text-sm flex justify-between gap-8 m-4 border-b">
                <p>Tип</p>
                <select class="w-10/12 h-8 " v-model="selected" >
                    <option value="0">
                        {{object.type.name}}
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
             <van-field style="" v-if="(object.type.name === 'Дом')|(object.type.name ==='Квартира')"
            v-model="address_house"
            name="house"
            label="Дом"
            placeholder=""
            />
            <van-field style="" v-if="(object.type.name ==='Квартира')"
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
            <router-link to='/object'><el-button @click="submit(object.url)" style="width: 200px" >Сохранить</el-button></router-link>
            <router-link to='/object'><el-button style="width: 200px;background-color:#F56C6C" type="danger" >Отменить</el-button></router-link>
        </div>

        </van-form>

 </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { store } from '@/store'
import { allowMultipleToast, closeToast, showLoadingToast, showNotify } from 'vant'
import axios from 'axios'

const object = computed(() => store.state.object )
const types = computed(() => store.state.types )

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
        .get(`http://127.0.0.1:8000/api/types/`)
        .then((res) => {
          console.log(res.data)
          store.commit('setTypes', res.data)
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
    selected: '0',
    object: object.value,
    address_city: object.value.address_city,
    address_street: object.value.address_street,
    address_house: object.value.address_house,
    address_number: object.value.address_number,
    latitude: object.value.latitude,
    logitude: object.value.logitude,
    total_area: object.value.total_area,
    total_floors: object.value.total_floors,
    rooms: object.value.rooms,
    floor: object.value.floor,
    types: types,
    selectedObject: ''



    
  }),
  props: {
    source: String
  },
  methods:{
    submit(objectUrl){
      this.selectedObject = objectUrl 
      console.log(this.selectedObject)
      console.log(this.selected)
      allowMultipleToast()
      closeToast(true)
      const loadingToast = showLoadingToast({
        forbidClick: true,
        duration: 0,
        message: 'Загрузка...'
      })
      axios
        .patch(`${this.selectedObject}`, {
            address_city: this.address_city,
            address_street: this.address_street,
            address_house: this.address_house,
            address_number: this.address_number,
            latitude: this.latitude,
            logitude: this.logitude,
            total_area: this.total_area,
            total_floors: this.total_floors,
            rooms: this.rooms,
            floor: this.floor


        })
        .then((res) => {
          console.log(res.data)
          // this.user = res.data
          store.commit('setObject', res.data)
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
