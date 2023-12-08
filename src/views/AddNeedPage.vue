<template>  
    <div class="font-sans mx-auto my-8 pb-4 w-2/4">
        <van-form class="p-2" @submit="submit">
        <van-cell-group inset class="w-xl">
            <div class="text-sm flex justify-between gap-8 m-4 border-b">
                <p>Клиент</p>
                <select class="w-10/12 h-8 " v-model="selected">
                    <option >
                    </option>
                    
                </select>
            </div>
            <div class="text-sm flex justify-between gap-8 m-4 border-b">
                <p>Риэлтор</p>
                <select class="w-10/12 h-8 " v-model="selected">
                    <option >
                    </option>
                    
                </select>
            </div>
           <div class="text-sm flex justify-between gap-8 m-4 border-b">
                <p>Тип объекта недвижимости</p>
                <select class="w-10/12 h-8 " v-model="selected">
                    <option >
                    </option>
                </select>
            </div>
            <van-field style=""
            v-model="address"
            name="address"
            label="Адрес"
            placeholder=""
            
            />
            <van-field style=""
            v-model="minprice"
            name="minprice"
            label="Минимальная Цена"
            placeholder=""
            
            />
            <van-field style=""
            v-model="maxprice"
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

</script>
