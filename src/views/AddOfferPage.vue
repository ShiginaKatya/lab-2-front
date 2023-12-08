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
                <p>Объект недвижимости</p>
                <select class="w-10/12 h-8 " v-model="selected">
                    <option >
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
            <router-link to='/offer'><el-button @click="submit" style="width: 200px" >Сохранить</el-button></router-link>
            <router-link to='/offer'><el-button style="width: 200px;background-color:#F56C6C" type="danger" >Отменить</el-button></router-link>
        </div>

        </van-form>

 </div>
</template>

<script>

</script>
