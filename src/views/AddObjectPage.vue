<template>  
    <div class="font-sans mx-auto my-8 pb-4 w-2/4">
        <van-form class="p-2" @submit="submit">
        <van-cell-group inset class="w-xl">
            <div class="text-sm flex justify-between gap-8 m-4 border-b">
                <p>Tип</p>
                <select class="w-10/12 h-8 " v-model="selected">
                    <option >
                        Земля
                    </option>
                    <option >
                        Дом
                    </option>
                    <option >
                        Квартира
                    </option>
                </select>
            </div> 
             <van-field style=""
            v-model="city"
            name="city"
            label="Город"
            placeholder=""
            
            />
             <van-field style=""
            v-model="street"
            name="street"
            label="Улица"
            placeholder=""
            />
             <van-field style="" v-if="(selected === 'Дом')|(selected ==='Квартира')"
            v-model="house"
            name="house"
            label="Дом"
            placeholder=""
            />
            <van-field style="" v-if="(selected ==='Квартира')"
            v-model="number"
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
            v-model="longitude"
            name="longitude"
            label="Долгота"
            placeholder=""
            
            />
             <van-field style=""
            v-model="area"
            name="area"
            label="Площадь"
            placeholder=""
            
            />
            
             <van-field style="" v-if="(selected === 'Дом')"
                v-model="floors"
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
export default {
    components:{
  },
    data() {
        return {
       
        selected: '',
       
        }
    },}
</script>
