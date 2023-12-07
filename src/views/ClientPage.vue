<template>
    <div class="font-sans mx-auto my-4 pb-4 w-3/4">
        <div class="flex justify-between border-b-blue border-b p-2">
                <p class=" text-sm text-blue" >Клиенты</p>
        </div>
        <div class="flex justify-between gap-2  w-10/12 my-4 mx-auto">
            <fieldset class="flex justify-start gap-2">
                <p>Поиск</p>
                <input class="w-9/12 border rounded-md" type="text">  
            </fieldset>
            <router-link to="/addclient" class="block  text-s"><el-button  class="border-orange" type='primary' style="width: 200px" >Добавить</el-button></router-link>
        </div>
        <table class=" h-96 mx-auto w-10/12 border my-4 border-gray-600 ">
                <thead> <!-- Заголовок таблицы -->
                <tr class="text-xs"> 
                    <th class=" border  border-gray-500 p-2 w-1/6">Фамилия</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-1/6">Имя</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-1/6">Отчество</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-1/6">Телефон</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-1/6">Email</th>
                </tr>
                </thead>
                <tbody class="text-xs"> <!-- Заполнение таблицы -->
                    <tr @click="choose(user.id)" v-for="user in users" :key="user.id" class="" :style="[user.is_active ? user.role == 'administrator'?{'background': '#adf5a6'}:{'background': '#FFF'}:{'background': '#c96d5b'}]">
                        <td class=" border-collapse border p-2 h-4">{{user.first_name}}</td> <!-- Номер строки -->
                        <td class="border-collapse border  p-2">{{user.last_name}}</td> 
                        <td class="border-collapse border  p-2">{{user.date_of_birth}}</td> 
                        <td class="border-collapse border  p-2">{{user.role ? user.role.title : ''}}</td>
                        <td class="border-collapse border  p-2">{{user.date_of_birth}}</td> 
                        <td class="border-collapse border  p-2">{{user.role ? user.role.title : ''}}</td> 
                    </tr>
                    <tr class=""> <!-- Цикл по строкам -->
                        <td class="border-collapse border p-2 "></td> <!-- Номер строки -->
                        <td class="border-collapse border  p-2"> </td> 
                        <td class="border-collapse border  p-2"></td> 
                        <td class="border-collapse border  p-2"></td> 
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-start gap-5 mx-auto my-4 w-10/12 " >
                <router-link to="/editclient"><el-button  class="border-orange" style="width: 200px" >Редактировать</el-button></router-link>
                <el-button @click="top" class="border-orange "  type="danger" style="width: 200px">Удалить</el-button>
            </div>
    </div>
</template>