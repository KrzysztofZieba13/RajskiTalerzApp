import { api } from "./api";

const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    getAllProducts: build.query({
      query: () => ({
        url: "product",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation({
      query: (formData) => ({
        url: "product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    getProductsByCategory: build.query({
      query: (category) => `product?category=${category}`,
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useCreateProductMutation,
  useGetProductsByCategoryQuery,
} = productsApi;
