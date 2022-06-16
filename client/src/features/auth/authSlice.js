import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice ({
// definirame ime na slice vo slucajov se vika auth
    name: 'auth',

// definirame inicijalna startna sostojba na state, vo slucajov 
// state sodrzi objekt so user i token koi se null pod default
    initialState: { user: null, token: null },

//ovde gi definirame reducers odnosno dejstvata so koi go menuvame zapisot vo state
//potocno od action.payload dobivame info za user i accessToken

//setCredentials prima dva parametri: state, action. 
//vo action se sodrzi payloadot so koj sto vlagame vo funkcijata
//od payloadot - action.payload gi vadime vrednostite za user i accessToken
//i gi dodavame vo stateot preku state.user i state.token
//sega defaultniot state za user i token ne e null, tuku e toa sto bilo prateno
//vo action.payload
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken }  = action.payload
            state.user = user
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        }
    },
})

//gi eksportirame actions od Reducerot za da mozeme da gi povikame direktno
//od nekoja JSX komponenta i da izvrsime izmena na state za user i token
export const { setCredentials, logOut } = authSlice.actions

//go eksportirame  cel reducer
export default authSlice.reducer

//definirame dve promenlivi vo koi ke gi imame momentanite vrednosti za user i token nadvor
//i mozeme da gi koristime vo nekoja komponenta direktno kako promenlivi
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token

