import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setIsAuthenticated,
  setLoading,
  setUser,
} from "../features/userSlice.js";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["User", "AdminUsers", "AdminUser"],

  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/me`,
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data);
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
          dispatch(setLoading(false));
        } catch (error) {
          console.log(error);
          console.log("Error in get me");
          dispatch(setLoading(false));
        }
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useGetMeQuery } = userApi;
