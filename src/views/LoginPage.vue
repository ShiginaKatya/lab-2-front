<template>
    <div class="font-sans mx-auto my-4 pb-4 rounded-md border border-blue max-w-xl">
        <div class="flex justify-between border-blue border-b p-2" style="border-color #f79420;">
            <p class="text-sm text-blue" >Login</p>
            <router-link to="/exit"><img src="close.svg" alt=""></router-link>
        </div> 
        <div class="" >
            <img class="block mx-auto p-5" src="logoa.png" alt="">
        </div>
         <van-form class="p-2 max-w-lg mx-auto">
            <van-cell-group inset class="w-xl">
                <van-field style=""
                v-model="email"
                name="email"
                label="Email"
                placeholder=""
                :rules="[{ required: true, message: 'UserName is required' }]"
                />
                <van-field
                v-model="password"
                type="password"
                name="Password"
                label="Password"
                placeholder="Password"
                :rules="[{ required: true, message: 'Password is required' }]"
                />
            </van-cell-group>
            <div class="flex justify-center gap-5 m-6" >
                <router-link   to="/"><el-button  style="width: 200px" >Login</el-button></router-link>
                <router-link  to="/"><el-button  style="width: 200px" type="danger" >Exit</el-button></router-link>
            </div>
        </van-form>
    </div>
</template>
<script>



</script>
