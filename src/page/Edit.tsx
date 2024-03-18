import { Flex, Modal, Typography, notification } from "antd"
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../services/product"
import { ICreatedProduct } from "../types/product"
import { useAppDispatch } from "../hooks/store"
import {
  deleteCreatedProduct,
  updateCreatedProduct,
} from "../features/product/productSlice"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { useEffect, useState } from "react"
import ProductForm from "../Components/ProductForm"

const { Title } = Typography

const Edit = () => {
  const dispatch = useAppDispatch()
  const [isShowModal, setIsShowModal] = useState(false)
  const { id } = useParams<{ id: string }>()
  const createdProducts = useSelector(
    (state: RootState) => state.persistedReducer.product.createdProducts
  )
  const navigate = useNavigate()

  const [update, { isLoading }] = useUpdateProductMutation()
  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation()

  const [initialValues, setInitialValues] = useState<ICreatedProduct | null>(
    null
  )

  useEffect(() => {
    if (id) {
      const item = createdProducts.find((i) => i.id === +id)
      if (item) {
        setInitialValues(item)
      }
    }
  }, [createdProducts, id, initialValues])

  const openNotification = (title: string) => {
    notification.open({
      message: `Product ${title} has been updated`,
    })
  }

  const deleteNotification = (title: string) => {
    notification.open({
      message: `Product ${title} has been deleted`,
    })
  }

  const errorNotification = () => {
    notification.open({
      type: "error",
      message: `Api error`,
    })
  }

  const onFinish = async (
    values: Pick<
      ICreatedProduct,
      "title" | "description" | "price" | "published"
    >
  ) => {
    try {
      if (initialValues) {
        const payload = await update({
          ...values,
          id: initialValues?.id,
          image: "https://i.pravatar.cc",
          category: "electronic",
        }).unwrap()

        const createDate = new Date()

        dispatch(
          updateCreatedProduct({
            ...payload,
            id: initialValues?.id,
            published: values.published,
            createAt: createDate.toISOString(),
          })
        )

        openNotification(payload.title)
      }
    } catch (_error) {
      errorNotification()
    }
  }

  const onDeleteClick = () => {
    setIsShowModal(true)
  }

  const handleOk = async () => {
    try {
      if (initialValues) {
        await deleteProduct({
          id: initialValues.id,
        }).unwrap()

        dispatch(deleteCreatedProduct(initialValues))

        deleteNotification(initialValues.title)
        navigate(-1)
      }
    } catch (error) {
      console.error(error)
      errorNotification()
    }
    setIsShowModal(false)
  }

  const handleCancel = () => {
    setIsShowModal(false)
  }

  return (
    <>
      <Flex vertical>
        <Title>Edit Product</Title>
        {initialValues && (
          <ProductForm
            onFinish={onFinish}
            isLoading={isLoading || isDeleteLoading}
            initialValues={initialValues}
            onDeleteClick={onDeleteClick}
          />
        )}
      </Flex>
      <Modal
        title="Delete"
        open={isShowModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Are you sure you want to remove <b>{initialValues?.title}</b>?
        </p>
      </Modal>
    </>
  )
}

export default Edit
