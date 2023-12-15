<template>
<p>Потребности</p>
    <table class=" h-96 mx-auto w-10/12 border my-4 border-gray-600 ">
                <thead> <!-- Заголовок таблицы -->
                <tr class="text-xs"> 
                    <th class=" border  border-gray-500 p-2 w-3/12">Клиент</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-3/12">Риэлтор</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-3/12">Тип обьекта недвижимости</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-3/12">Адрес</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-1/12">Площадь</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-1/12">Кол-во комнат</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-1/12">Этажность</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-1/12">Этаж</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-3/12">Минимальная Цена</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-3/12">Максимальная Цена</th>
                </tr>
                </thead>
                <tbody class="text-xs"> <!-- Заполнение таблицы -->
                    <tr v-for="demand in demands" :key="demand.id" class="" >
                        <td class=" border-collapse border p-2 h-4">{{demand.client.first_name}}</td> <!-- Номер строки -->
                        <td class="border-collapse border  p-2">{{demand.agent.first_name}}</td> 
                        <td class="border-collapse border  p-2">{{demand.type.name}}</td> 
                        <td class="border-collapse border  p-2">{{demand.address_city}} {{demand.address_street}} {{demand.address_house}} {{demand.address_number}} </td> 
                        <td class="border-collapse border  p-2 ">{{demand.min_area}} - {{demand.max_area}}</td>
                        <td class="border-collapse border  p-2  ">{{demand.min_rooms}} - {{demand.max_rooms}}</td>
                        <td class="border-collapse border  p-2  ">{{demand.min_floors}} - {{demand.max_floors}}</td>
                        <td class="border-collapse border  p-2  ">{{demand.min_floor}} - {{demand.max_floor}}</td>
                        <td class="border-collapse border  p-2  ">{{demand.min_price}}</td>
                        <td class="border-collapse border  p-2  ">{{demand.max_price}}</td>
                    </tr>
                </tbody>
            </table>
    <p>Предложения</p>
    <table class=" h-96 mx-auto w-10/12 border my-4 border-gray-600 ">
                <thead> <!-- Заголовок таблицы -->
                <tr class="text-xs"> 
                    <th class=" border  border-gray-500 p-2 w-3/12">Клиент</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-3/12">Риэлтор</th>
                    <th class="border-collapse border  border-gray-500 p-2 w-3/12">Обьект недвижимости</th>
                    <th class="border-collapse border  border-gray-500 p-2  w-3/12">Цена</th>
                </tr>
                </thead>
                <tbody class="text-xs"> <!-- Заполнение таблицы -->
                    <tr v-for="offer in offers" :key="offer.id" class="" >
                        <td class=" border-collapse border p-2 h-4">{{offer.client.first_name}}</td> <!-- Номер строки -->
                        <td class="border-collapse border  p-2">{{offer.agent.first_name}}</td> 
                        <td class="border-collapse border  p-2">{{ offer.real_estate.address_city }} {{offer.real_estate.address_street}} {{offer.real_estate.address_house}} {{offer.real_estate.address_number}}</td> 
                        <td class="border-collapse border  p-2">{{offer.price}}</td> 
                    </tr>
                </tbody>
            </table>
</template>

<script>
import { computed } from 'vue'
import { store } from '@/store'

const offers = computed(() => store.state.approach_offers )
const demands = computed(() => store.state.approach_demands )
console.log(offers, demands)

export default {
    data() {
        return {
            offers: offers,
            demands: demands,
    
        }
    }
}
</script>

