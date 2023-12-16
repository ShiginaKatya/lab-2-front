import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      clients: [],
      client:[],
      agents: [],
      agent:[],
      objects: [],
      object:[],
      types:[],
      demands:[],
      demand:[],
      offers:[],
      offer:[],
      deals:[],
      deal:[],
      approach_demands:[],
      approach_offers:[],
      select_offers:[],
      select_needs:[]
    }
  },
  mutations: {
  
    setClients(state, clients) {
      state.clients = clients
    },
    setClient(state, client) {
      state.client = client
    },
    
    setAgents(state, agents) {
      state.agents = agents
    },
    setAgent(state, agent) {
      state.agent = agent
    },

    setObjects(state, objectList) {
      state.objects = objectList
    },
    setObject(state, objectList) {
      state.object = objectList
    },
    setTypes(state, types) {
      state.types = types
    },
    setDemands(state, demands) {
      state.demands = demands
    },
    setDemand(state, demand) {
      state.demand = demand
    },
    setOffers(state, offers) {
      state.offers = offers
    },
    setOffer(state, offer) {
      state.offer = offer
    },
    setDeals(state, deals) {
      state.deals = deals
    },
    setDeal(state, deal) {
      state.deal = deal
    },
    setApproachDemands(state, approach_demands) {
      state.approach_demands = approach_demands
    },
    setApproachOffers(state, approach_offers) {
      state.approach_offers = approach_offers
    },
    setSelectDemands(state, select_demands) {
      state.select_demands = select_demands
    },
    setSelectOffers(state, select_offers) {
      state.select_offers = select_offers
    },
  }})
