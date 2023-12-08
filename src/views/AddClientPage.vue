<template>  
    <div class="font-sans mx-auto my-8 pb-4 w-2/4">
        <van-form class="p-2" @submit="submit">
        <van-cell-group inset class="w-xl">
             <van-field style=""
            v-model="last_name"
            name="lastname"
            label="Фамилия"
            placeholder=""
            
            />
             <van-field style=""
            v-model="first_name"
            name="firstname"
            label="Имя"
            placeholder=""
            />
             <van-field style=""
            v-model="middle_name"
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

</script>
