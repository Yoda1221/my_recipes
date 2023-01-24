import { TABLES } from '../config'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl   = import.meta.env.VITE_SERVER_URL

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}`}),
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: () => `/recipes`
        }),
        addRecipe: builder.mutation({
            query: (recipe) => ({
                url: '/recipes',
                method: 'POST',
                body: recipe
            })
        }),
        updateRecipe: builder.mutation({
            query: (recipe) => ({
                url: `/recipes`,
                method: 'PATCH',
                body: recipe
            })
        }),
        deleteRecipe: builder.mutation({
            query: (id) => ({
                url: `/recipes`,
                method: 'DELETE',
                body: id
            })
        })
    }),
})

export const {
    useGetRecipesQuery,
    useAddRecipeMutation,
    useUpdateRecipeMutation,
    useDeleteRecipeMutation
} = apiSlice
