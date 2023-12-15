<template>  
    <div class="font-sans mx-auto my-8 pb-4 w-2/4">
        <van-form class="p-2" @submit="submit">
        <van-cell-group inset class="w-xl">
             <van-field style=""
            v-model="first_name"
            name="lastname"
            label="Фамилия"
            placeholder=""
            
            />
             <van-field style=""
            v-model="middle_name"
            name="firstname"
            label="Имя"
            placeholder=""
            />
             <van-field style=""
            v-model="last_name"
            name="middlename"
            label="Отчество"
            placeholder=""
            />
            <van-field style=""
            v-model="email"
            type="email"
            name="email"
            label="Email"
            placeholder=""
            />
           
            <van-field style=""
            v-model="phone"
            type="tel"
            name="phone"
            label="Телефон"
            placeholder=""
            
            />
        </van-cell-group>
        <div class="flex justify-center gap-5 m-6" >
            <router-link to='/client'><el-button @click="submit" style="width: 200px" >Сохранить</el-button></router-link>
            <router-link to='/client'><el-button style="width: 200px;background-color:#F56C6C" type="danger" >Отменить</el-button></router-link>
        </div>

        </van-form>

 </div>
</template>

<script>

import { ref, onMounted, computed } from 'vue';
import { store } from '@/store'
import axios from 'axios'




export default {
    components:{
  },
setup() {
    
},
  data() {
    return {
      
      first_name: '',
      middle_name: '',
      last_name:'',
      email: '',
      phone: ''
    }
  },
  props: {
    source: String
  },
  methods: {
    submit() {     
    //   let officeUrl = this.offices.find(office => office.title === this.selected).url
      axios
        .post('http://127.0.0.1:8000/api/clients/', {
            first_name: this.first_name,
            middle_name: this.middle_name,
            last_name: this.last_name,
            email: this.email,
            phone: this.phone
        })
        .then(res => console.log(res))
    },
  },
}
</script>
