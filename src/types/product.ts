export interface IProduct {
  category: string
  description: string
  id: number
  image: string
  price: number
  rating: { rate: number; count: number }
  title: string
}

export type IProductPostData = Omit<IProduct, "rating" | "id">

export type ICreatedProduct = Omit<IProduct, "rating"> & {
  published: boolean
  createAt: string
}
