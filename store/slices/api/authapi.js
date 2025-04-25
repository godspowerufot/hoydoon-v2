import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { removeTokens} from "@/utils/cookies";
import { setUser, logout } from "../authslice";
import {
  setTokens,
  getAccessToken,
  getRefreshToken,
} from "@/utils/cookies";
import { log } from "@/utils/log";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    log("",token)
    if (token) {
      headers.set("x-auth-token", `${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Token expired, try refreshing
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      const refreshResult = await baseQuery(
        { url: "/auth/refresh", method: "POST", body: { refreshToken } },
        api,
        extraOptions
      );

      if (refreshResult?.data?.accessToken) {
        setTokens(
          refreshResult.data.accessToken,
          refreshResult.data.refreshToken
        );
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
  reducerPath: "authApi",

  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/v1/auth",
        method: "POST",
        body: credentials,
      }),

      transformResponse: (response) => {
        setTokens(response.accessToken, response.refreshToken);
        return response;
      },
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/v1/users",
        method: "POST",
        body: credentials,
      }),

      transformResponse: (response) => {
        setTokens(response.accessToken, response.refreshToken);
        return response;
      },
    }),
    getUser: builder.query({
      query: () => "/users/me",
    }),

    logout: builder.mutation({
      queryFn: async (_, { dispatch }) => {
        removeTokens(); // Clear stored tokens
        dispatch(logout()); // Update Redux state
        return { data: null };
      },
    }),
    getAgents: builder.query({
      query: () => ({
        url: "/v1/agents",
        method: "GET",
      }),
    }),
    getAgentsInfo: builder.query({
      query: ({ userId }) => ({
        url: `v1/agents/${userId}`,
        method: "GET",
      }),
    }),

    getAllListings: builder.query({
      query: (params) => ({
        url: `/v1/listings?${new URLSearchParams(params).toString()}`,
        method: "GET",
      }),
    }),
    getAllListingsAddress: builder.query({
      query: (params) => ({
        url: `/v1/listings?${new URLSearchParams(params).toString()}`,
        method: "GET",
      }),
    }),
    getAllLocationListings: builder.query({
      query: (params) => ({
        url: `/v1/listings?${new URLSearchParams(params).toString()}`,
        method: "GET",
      }),
    }),

    getAgentListings: builder.query({
      query: ({ userId }) => ({
        url: `/v1/listings/agent/${userId}`,
        method: "GET",
      }),
    }),
    getSpecificListings: builder.query({
      query: ({listingId} ) => ({
        url: `/v1/listings/${listingId}`,
        method: "GET",
      }),
    }),
    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: "/v1/messages",
        method: "POST",
        body: messageData,
      }),
    }),
    activateAccount: builder.mutation({
      query: (otp) => ({

        url: "v1/users/activate",
        method: "PUT",
        body: { ...otp },
        
      }),
    }),
    resendOtp: builder.mutation({
      query: (email) => ({
        url: "v1/otp/generate",
        method: "POST",
        body: { email },
      }),
    }),
    
    googleAuth: builder.mutation({
      query: (credentials) => ({
        url: "/v1/auth/google",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
        setTokens(response.accessToken, response.refreshToken);
        return response;
      },
    }),
    
  }),
});

export const {
  useLoginMutation,
  useGetAgentsQuery,
  useGoogleAuthMutation,
  useSignupMutation,
  useGetAllListingsQuery,
  useGetSpecificListingsQuery,
  useGetAgentsInfoQuery,
  useResendOtpMutation,
  useGetUserQuery,
  useSendMessageMutation,
  useGetAgentListingsQuery,
  useActivateAccountMutation,
  useLogoutMutation,
  useGetAllListingsAddressQuery,
  useGetAllLocationListingsQuery,
} = authApi;
export default authApi;







