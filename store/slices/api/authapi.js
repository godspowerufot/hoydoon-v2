import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { removeTokens } from "@/utils/cookies";
import { logout } from "../authslice";
import { setTokens, getAccessToken, getRefreshToken } from "@/utils/cookies";
import { log } from "@/utils/log";

const remoteApiBase =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://hoydoon-backend-web.azurewebsites.net/api";

// Browser calls same-origin so Azure's Cross-Origin-Resource-Policy
// (same-origin) does not block listings. The Next rewrite proxies to Azure.
const apiBaseUrl =
  typeof window === "undefined" ? remoteApiBase : "/hoydoon-api";

const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    log("", token);
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
    // In authapi.ts or wherever you define your endpoints
    getAgents: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams(params).toString();
        return {
          url: `/v1/agents?${searchParams}`,
          method: "GET",
        };
      },
    }),

    getAgentsInfo: builder.query({
      query: ({ userId }) => ({
        url: `v1/agents/${userId}`,
        method: "GET",
      }),
    }),

    getAllListings: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        Object.entries(params || {}).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            searchParams.append(key, String(value));
          }
        });
        const queryString = searchParams.toString();
        return {
          url: queryString ? `/v1/listings?${queryString}` : "/v1/listings",
          method: "GET",
        };
      },
    }),
    getAllListingsAddress: builder.query({
      query: (params) => ({
        url: `/v1/listings?${new URLSearchParams(params).toString()}`,
        method: "GET",
      }),
    }),

    // getallreviews
    getAllReviews: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        Object.entries(params || {}).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            searchParams.append(key, String(value));
          }
        });
        const queryString = searchParams.toString();
        return {
          url: queryString ? `v1/reviews?${queryString}` : "v1/reviews",
          method: "GET",
        };
      },
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
      query: ({ listingId }) => ({
        url: `/v1/listings/${listingId}`,
        method: "GET",
      }),
    }),
    getListingBySlug: builder.query({
      query: ({ slug }) => ({
        url: `/v1/listings/slug/${slug}`,
        method: "GET",
      }),
    }),
    getFeaturedListings: builder.query({
      query: ({ count }) => ({
        url: `/v1/listings/featured?count=${count}`,
        method: 'GET',
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
    toggleFavorite: builder.mutation({
      query: (listingId) => ({
        url: "/v1/favorites",
        method: "POST",
        body: { ...listingId },
      }),
    }),
    getFavorites: builder.query({
      query: () => ({
        url: "/v1/favorites",
        method: "GET",
      }),
    }),
    changePassword: builder.mutation({
      query: (credentials) => ({
        url: "/v1/users/password",
        method: "PATCH", // or "PUT" depending on backend
        body: credentials,
      }),
    }),
    DeleteFavorite: builder.mutation({
      query: (listingId) => ({
        url: `/v1/favorites/${listingId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAgentsQuery,
  useGoogleAuthMutation,
  useSignupMutation,
  useGetAllListingsQuery,
  useGetFeaturedListingsQuery,
  useGetSpecificListingsQuery,
  useGetListingBySlugQuery,
  useGetAgentsInfoQuery,
  useResendOtpMutation,
  useToggleFavoriteMutation,
  useGetUserQuery,
  useGetFavoritesQuery,
  useDeleteFavoriteMutation,
  useSendMessageMutation,
  useGetAgentListingsQuery,
  useActivateAccountMutation,
  useLogoutMutation,
  useGetAllListingsAddressQuery,
  useGetAllLocationListingsQuery,
  useChangePasswordMutation,
  useGetAllReviewsQuery,
} = authApi;
export default authApi;
