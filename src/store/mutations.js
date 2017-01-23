const mulations = {
    decrement (state) {
        state.totalTickets--
    },
    identityCard (state, payload) {
        state.idName = payload.idName
        state.idNum = payload.idNum
    },
    initializeData (state, payload) {
        state.totalTickets = payload.totalTickets
        state.warnTickets = payload.warnTickets
        state.isMessNotice = payload.isMessNotice
        state.messPhone = payload.messPhone
    },
    updateIsMessNotice (state, value) {
        state.isMessNotice = value
    },
    updateMessPhone (state, value) {
        state.messPhone = value
    },
    updateTotalTickets (state, value) {
        state.totalTickets = value
    },
    updateWarnTickets (state, value) {
        state.warnTickets = value
    }
}
export default mulations
