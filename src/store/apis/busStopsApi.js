import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";

const accessToken = localStorage.getItem('accessToken');

const busStopsApi = createApi({
    reducerPath: 'busStops',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7033' }),
    endpoints: (builder) => {
        return {
            fetchBusStops: builder.query({
                providesTags: ['BusStops'],
                query: () => {
                    return {
                        url: '/api/bus-stops',
                        method: 'GET'
                    }
                }
            }),
            searchBusStops: builder.query({
                query: (term) => {
                    return {
                        url: `/api/bus-stops/search?term=${term}`,
                        method: 'GET'
                    }
                }
            }),
            addBusStop: builder.mutation({
                invalidatesTags: ['BusStops'],
                query: ({name, city, coordinate, isRequest}) => {
                    return {
                        url: '/api/bus-stops',
                        method: 'POST',
                        body: {
                            name: name,
                            city: city,
                            coordinate: coordinate,
                            isRequest: isRequest
                        },
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                            'Content-Type': 'application/json; charset=UTF-8'
                        }
                    }
                }
            }),
            updateBusStop: builder.mutation({
                invalidatesTags: ['BusStops'],
                query: ({slug, name, city, coordinate, isRequest}) => {
                    return {
                        url: `/api/bus-stops/${slug}`,
                        method: 'PUT',
                        body: {
                            slug: slug,
                            name: name,
                            city: city,
                            coordinate: coordinate,
                            isRequest: isRequest
                        }
                    }
                }
            }),
            deleteBusStop: builder.mutation({
                invalidatesTags: ['BusStops'],
                query: (slug) => {
                    return {
                        url: `/api/bus-stops/${slug}`,
                        method: 'DELETE'
                    }
                }
            })
        }
    }
});

export const { useFetchBusStopsQuery, useSearchBusStopsQuery, useAddBusStopMutation, useUpdateBusStopMutation, useDeleteBusStopMutation } = busStopsApi;
export { busStopsApi };