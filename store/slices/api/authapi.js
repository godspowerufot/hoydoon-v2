import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setTokens, getAccessToken, getRefreshToken, removeTokens } from '@/utils/cookies';
import { logout, setUser } from '../authslice';

const baseQuery = fetchBaseQuery({
  baseUrl:`${process.env.NEXT_PUBLIC_BASE_URL}`, // Replace with your API URL
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});


console.log(process.env.BASE_URL)
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Token expired, try refreshing
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      const refreshResult = await baseQuery(
        { url: '/auth/refresh', method: 'POST', body: { refreshToken } },
        api,
        extraOptions
      );

      if (refreshResult?.data?.accessToken) {
        setTokens(refreshResult.data.accessToken, refreshResult.data.refreshToken);
        result = await baseQuery(args, api, extraOptions); // Retry the failed request
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/v1/auth',
        method: 'POST',
        body: credentials,
      }),
      
      transformResponse: (response) => {
        setTokens(response.accessToken, response.refreshToken);
        return response;
      },
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: '/v1/users',
        method: 'POST',
        body: credentials,
      }),
      
      transformResponse: (response) => {
        setTokens(response.accessToken, response.refreshToken);
        return response;
      },
    }),
    getUser: builder.query({
      query: () => '/users/me',
    }),
    logout: builder.mutation({
      queryFn: async (_, { dispatch }) => {
        removeTokens(); // Clear stored tokens
        dispatch(logout()); // Update Redux state
        return { data: null };
      },
    }),
    
  }),
});

export const { useLoginMutation,useSignupMutation, useGetUserQuery, useLogoutMutation } = authApi;
export default authApi;
