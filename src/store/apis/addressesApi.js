import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const addressesApi = createApi({
    reducerPath: 'addresses',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7033',
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json; charset=UTF-8');
        return headers;
        },
    }),
    endpoints: (builder) => {
        return {
            fetchAddress: builder.query({
                query: (id) => {
                    return {
                        url: `/api/addresses/${id}`,
                        method: 'GET'
                    }
                }
            }),
            fetchAddresses: builder.query({
                query: () => {
                    return {
                        url: '/api/addresses',
                        method: 'GET'
                    }
                }
            }),
            searchAddresses: builder.query({
                query: (term) => {
                    return {
                        url: `/api/addresses/search?term=${term}`,
                        method: 'GET'
                    }
                }
            }),
            addAddresses: builder.mutation({
                query: (request) => {
                    return {
                        url: '/api/addresses/batch',
                        method: 'POST',
                        body: request
                    }
                }
            }),
            updateAddress: builder.mutation({
                query: (id, addressesDocument) => {
                    return {
                        url: `/api/addresses/${id}`,
                        method: 'PATCH',
                        body: addressesDocument
                    }
                }
            }),
            deleteAddress: builder.mutation({
                query: (id) => {
                    return {
                        url: `/api/addresses/${id}`,
                        method: 'DELETE',
                    }
                }
            }),
            deleteAllAddresses: builder.mutation({
                query: () => {
                    return {
                        url: '/api/addresses',
                        method: 'DELETE'
                    }
                }
            }),
        }
    }
});

export const { useFetchAddressQuery, useFetchAddressesQuery, useSearchAddressesQuery, useAddAddressesMutation, useUpdateAddressMutation, useDeleteAddressMutation, useDeleteAllAddressesMutation } = addressesApi;
export { addressesApi };