import { Flex, Typography, notification } from "antd"
import { useAddProductMutation } from "../services/product"
import { ICreatedProduct } from "../types/product"
import { useAppDispatch } from "../hooks/store"
import { addCreatedProduct } from "../features/product/productSlice"
import ProductForm from "../Components/ProductForm"

const { Title } = Typography

const Create = () => {
  const dispatch = useAppDispatch()

  const errorNotification = () => {
    notification.open({
      type: "error",
      message: `Api error`,
    })
  }

  const openNotification = (title: string) => {
    notification.open({
      message: `Product ${title} has been created`,
    })
  }

  const [create, { isLoading }] = useAddProductMutation()

  const onFinish = async (
    values: Pick<
      ICreatedProduct,
      "title" | "description" | "price" | "published"
    >
  ) => {
    try {
      const payload = await create({
        ...values,
        image: "https://i.pravatar.cc",
        category: "electronic",
      }).unwrap()

      const createDate = new Date()

      dispatch(
        addCreatedProduct({
          ...payload,
          id: +createDate.getTime(),
          published: values.published,
          createAt: createDate.toISOString(),
        })
      )

      openNotification(payload.title)
    } catch (error) {
      errorNotification()
    }
  }

  return (
    <Flex vertical>
      <Title>Create Product</Title>
      <ProductForm onFinish={onFinish} isLoading={isLoading} />
    </Flex>
  )
}

export default Create
