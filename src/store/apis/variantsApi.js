import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const variantsApi = createApi({
    reducerPath: 'variants',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7033',
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json; charset=UTF-8');
        return headers;
      },
    }),
    endpoints: (builder) => {
        return {
            fetchVariant: builder.query({
                providesTags: (result, error, lineName) => [
                    { type: 'Variants', id: lineName }
                ],
                query: ({lineName, id}) => {
                    return {
                        url: `/api/Lines/${lineName}/variants/${id}`,
                        method: 'GET'}
                    }
                }),
            fetchVariants: builder.query({
                providesTags: (result, error, lineName) => [
                    { type: 'Variants', id: lineName }
                ],
                query: (lineName) => {
                    return {
                        url: `/api/Lines/${lineName}/variants`,
                        method: 'GET'}
                    }
            }),
            fetchFilteredByRouteStopVariants: builder.query({
                providesTags: (result, error, lineName) => [
                    { type: 'Variants', id: lineName }
                ],
                query: ({lineName, busStopId}) => {
                    return {
                        url: `/api/Lines/${lineName}/variants/filter?busStopId=${busStopId}`,
                        method: 'GET'}
                    }
            }),
            createVariant: builder.mutation({
                invalidatesTags: ['Variants'],
                query: ({ lineName, validFrom, route, routeStops, departures, routeLinePoints }) => {
                    return {
                        url: `/api/lines/${lineName}/variants`,
                        method: 'POST',
                        body: {
                            lineName: lineName,
                            validFrom: validFrom,
                            route: route,
                            routeStops: routeStops,
                            departures: departures,
                            routeLinePoints: routeLinePoints
                        }
                    }
                }
            }),
            updateVariant: builder.mutation({
                invalidatesTags: ['Variants'],
                query: ({lineName, id, route, validFrom, routeStops, departures, routeLinePoints}) => {
                    return {
                        url: `/api/Lines/${lineName}/variants/${id}`,
                        method: 'PUT',
                        body: {
                            name: lineName,
                            id: id,
                            validFrom: validFrom,
                            route: route,
                            routeStops: routeStops,
                            departures: departures,
                            routeLinePoints: routeLinePoints
                        }
                    }
                }
            }),
            deleteVariant: builder.mutation({
                invalidatesTags: ['Variants'],
                query: ({id, lineName}) => {
                    return {
                        url: `/api/Lines/${lineName}/variants/${id}`,
                        method: 'DELETE'
                    }
                }
            })
    }}});  



export const { useFetchVariantQuery, useFetchVariantsQuery, useFetchFilteredByRouteStopVariantsQuery, useUpdateVariantMutation, useDeleteVariantMutation, useCreateVariantMutation } = variantsApi;
export { variantsApi };