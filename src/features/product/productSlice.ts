import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { ICreatedProduct, IProduct } from "../../types/product"
import { productApi } from "../../services/product"

export interface ProductState {
  products: IProduct[]
  createdProducts: ICreatedProduct[]
}

const initialState: ProductState = {
  products: [],
  createdProducts: [],
}

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
    },
    addCreatedProduct: (state, action: PayloadAction<ICreatedProduct>) => {
      state.createdProducts = [...state.createdProducts, action.payload]
    },
    updateCreatedProduct: (state, action: PayloadAction<ICreatedProduct>) => {
      state.createdProducts = updateElementById(
        state.createdProducts,
        action.payload
      )
    },
    deleteCreatedProduct: (state, action: PayloadAction<ICreatedProduct>) => {
      state.createdProducts = state.createdProducts.filter(
        (i) => i.id !== action.payload.id
      )
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.getProducts.matchFulfilled,
      (state, { payload }) => {
        state.products = payload
      }
    )
  },
})

export const {
  setProducts,
  addCreatedProduct,
  updateCreatedProduct,
  deleteCreatedProduct,
} = productSlice.actions

export default productSlice.reducer

function updateElementById<T extends { id: number }>(
  array: T[],
  newData: T
): T[] {
  const index = array.findIndex((element) => element.id === newData.id)

  if (index !== -1) {
    array[index] = { ...array[index], ...newData }
  }

  return array
}
