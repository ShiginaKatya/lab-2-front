<template>
    <div class="font-sans mx-auto my-4 pb-4 w-3/4">
        <div class="flex justify-between border-b-blue border-b p-2">
                <router-link to="/client" class=" text-sm text-black" >Клиенты</router-link>
                <router-link to="/agent" class=" text-sm text-black" >Риэлторы</router-link>
                <router-link to="/object" class=" text-sm text-blue" >Объекты недвижимости</router-link>
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
          
            <router-link to="/addobject" class="block  text-s"><el-button  class="border-orange" type='primary' style="width: 200px" >Добавить</el-button></router-link>
        </div>
        <div class="flex justify-start gap-2  w-10/12 my-4 mx-auto">
            <div class="flex justify-start gap-2 ">
                <p>Тип</p>
                <select class="w-40 border rounded-md" v-model="select">
                    <option value="0">Все типы</option>
                    <option v-for="type in types" :key="type.id">
                    {{ type.name }}
                    </option>
                
                </select>
            </div>
            <div class="flex justify-start gap-2 ">
                <p>Адрес</p>
                <select class="w-40 border rounded-md" v-model="ele">
                    <option value="0">Все адреса</option>
                    <option v-for="office in offices" :key="office.id">
                    {{ office.title }}
                    </option>
                
                </select>
            </div>
        </div>
        <table class=" mx-auto w-10/12 border my-4 border-gray-600 ">
                <thead> <!-- Заголовок таблицы -->
                <tr class="text-xs"> 
                    <th class=" border  border-gray-500 p-2 w-1/12">Тип</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-4/12">Адрес</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-3/12">Координаты</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-1/12">Площадь</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-1/12">Кол-во комнат</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-1/12">Этажность</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-1/12">Этаж</th>
                </tr>
                </thead>
                <tbody class="text-xs"> <!-- Заполнение таблицы -->
                    <tr @click="choose(object.url)" v-for="object in objects" :key="object.id" class="" :style="getStyle(object)" >
                        <td class=" border-collapse border p-2 h-4">{{object.type.name}}</td> <!-- Номер строки -->
                        <td class="border-collapse border  p-2">{{object.address_city}} {{object.address_street}} {{object.address_house}} {{object.address_number}} </td> 
                        <td class="border-collapse border  p-2">{{object.latitude}}, {{object.logitude}}</td> 
                        <td class="border-collapse border  p-2">{{object.total_area}}</td>
                        <td class="border-collapse border  p-2">{{object.rooms}}</td> 
                        <td class="border-collapse border  p-2">{{object.total_floors}}</td> 
                        <td class="border-collapse border  p-2">{{object.floor}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-start gap-5 mx-auto my-4 w-10/12 " >
                <router-link to="/updateobject"><el-button  class="border-orange" style="width: 200px" >Редактировать</el-button></router-link>
                <el-button @click="del" class="border-orange "  type="danger" style="width: 200px">Удалить</el-button>
            </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { store } from '@/store'
import axios from 'axios'
import { allowMultipleToast, closeToast, showLoadingToast, showNotify } from 'vant'

const objects = computed(() => store.state.objects )
const types = computed(() => store.state.types )

export default {
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
            .get('http://127.0.0.1:8000/api/objects/')
            .then((res) => {
            store.commit('setObjects', res.data)
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
      select: '0',
      objects: objects,
      selectedObject: '',
      types: types,
      poisk: ''
    }
  },

 methods:{
    getStyle(object) {
      if (object.url === this.selectedObject) {
        return {'background': 'lightgrey'}
      }
    },
    choose(objectUrl) { 
      this.selectedObject = objectUrl 
      console.log(objectUrl)
      axios
        .get(`${this.selectedObject}`)
        .then((res) => {
          this.object = res.data
          console.log(res.data)
          store.commit('setObject', res.data)
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
        .delete(`${this.selectedObject}`)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          showNotify({ type: 'danger', message: 'Запись не может быть удалена, объект недвижимости связан с предложением' })
          console.log(err)
        })
      await axios
        .get('http://127.0.0.1:8000/api/objects/')
        .then((res) => {
          store.commit('setObjects', res.data)
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
      axios
        .get('http://127.0.0.1:8000/api/objects/',{
          params: {
             city: this.poisk !== "" ? this.poisk : null
          }
        })
        .then((res) => {
          store.commit('setObjects', res.data)
          // this.objects = res.data
        })
        .catch((err) => {
          console.log(err)
          showNotify({ type: 'danger', message: 'Ошибка' })
        })
    }
  
 },
 watch: {
    select() {
      axios
        .get('http://127.0.0.1:8000/api/objects/', {
          params: {
            type: this.select !== "0" ? this.select : null
          }
        })
        .then((res) => {
          store.commit('setObjects', res.data)
          // this.objects = res.data
        })
        .catch((err) => {
          console.log(err)
          showNotify({ type: 'danger', message: 'Ошибка' })
        })
    }
  }
  }
</script>
