import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    idName                   :    "Roda",
    idNum                    :    "350521199002055030",
    totalTickets             :    10,
    warnTickets              :    10,
    isMessNotice             :    true,
    messPhone                :    "15880910182"
}

const store = new Vuex.Store({
    state,
    mutations
})

export default store