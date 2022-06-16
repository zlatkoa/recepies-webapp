import { ApiProvider, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'

//tuka pravime logika tokenot sto go dobivame od backend da se praka preku
//vo headers pri sekoj request i da znaeme deka avtentikacijata odnosno tokenot e validen

//vo baseQuery go stavame tokenot vo header authorization: kako Bearer token i go pustame
//so sekoj request preku preku header
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

//ovde dedinirame refresh token koj ke se pusta vo pozadina vo slucaj glavniot token da istekol vremenski

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery (args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        //go prakame refresh tokenot za da dobieme nov access token
        const refreshResult = await baseQuery ('/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data){
            const user = api.getState().auth.user
            
            api.dispatch(setCredentials({...refreshResult.data, user}))
            //
            result = await baseQuery(args, api, extraOptions)
        }else {
            ApiProvider.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder =>({})
})