import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue';
import ClientPage from '../views/ClientPage.vue'
import AddClientPage from '../views/AddClientPage.vue'
import UpdateClientPage from '../views/UpdateClientPage.vue'
import AgentPage from '../views/AgentPage.vue'
import AddAgentPage from '../views/AddAgentPage.vue'
import UpdateAgentPage from '../views/UpdateAgentPage.vue'
import ObjectPage from '../views/ObjectPage.vue'
import AddObjectPage from '../views/AddObjectPage.vue'
import UpdateObjectPage from '../views/UpdateObjectPage.vue'
import OfferPage from '../views/OfferPage.vue'
import AddOfferPage from '../views/AddOfferPage.vue'
import UpdateOfferPage from '../views/UpdateOfferPage.vue'
import NeedPage from '../views/NeedPage.vue'
import AddNeedPage from '../views/AddNeedPage.vue'
import UpdateNeedPage from '../views/UpdateNeedPage.vue'
import DealPage from '../views/DealPage.vue'
import AddDealPage from '../views/AddDealPage.vue'
import UpdateDealPage from '../views/UpdateDealPage.vue'
import ApproachPage from '../views/ApproachPage.vue'
import SelectNeedPage from '../views/SelectNeedPage.vue'
import SelectOfferPage from '../views/SelectOfferPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      // {
      //   path: '/login',
      //   name: 'login',
      //   component: LoginView
      // },
      { path: '/', component: LoginPage },
      { path: '/client', component: ClientPage },
      { path: '/addclient', component: AddClientPage },
      { path: '/updateclient', component: UpdateClientPage },
      { path: '/agent', component: AgentPage },
      { path: '/addagent', component: AddAgentPage },
      { path: '/updateagent', component: UpdateAgentPage },
      { path: '/object', component: ObjectPage },
      { path: '/addobject', component: AddObjectPage },
      { path: '/updateobject', component: UpdateObjectPage },
      { path: '/offer', component: OfferPage },
      { path: '/addoffer', component: AddOfferPage },
      { path: '/updateoffer', component: UpdateOfferPage },
      { path: '/need', component: NeedPage },
      { path: '/addneed', component: AddNeedPage },
      { path: '/updateneed', component: UpdateNeedPage },
      { path: '/deal', component: DealPage },
      { path: '/adddeal', component: AddDealPage },
      { path: '/updatedeal', component: UpdateDealPage },
      { path: '/approach', component: ApproachPage },
      { path: '/selectoffer', component: SelectOfferPage },
      { path: '/selectneed', component: SelectNeedPage },
      
    
    ]})

export default router