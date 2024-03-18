import { createElement, useState } from "react"
import {
  List,
  Image,
  Space,
  Select,
  Button,
  Switch,
  notification,
  Modal,
} from "antd"
import { DollarOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { PaginationConfig } from "antd/es/pagination"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { PAGE_PRODUCTS } from "../common/constants"
import { ICreatedProduct } from "../types/product"
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../services/product"
import { useAppDispatch } from "../hooks/store"
import {
  deleteCreatedProduct,
  updateCreatedProduct,
} from "../features/product/productSlice"

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
)

const IconButton = ({
  icon,
  onClick,
}: {
  icon: React.FC
  onClick: () => void
}) => (
  <Button
    type="primary"
    shape="default"
    icon={createElement(icon)}
    onClick={onClick}
  />
)

const CreatedProducts = () => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const [deleteItem, setDeleteItem] = useState<ICreatedProduct | null>(null)
  const navigate = useNavigate()
  const createdProducts = useSelector(
    (state: RootState) => state.persistedReducer.product.createdProducts
  )
  const [size, setSize] = useState(8)

  const paginationConfig: PaginationConfig = { align: "start", pageSize: size }

  const openNotification = (title: string) => {
    notification.open({
      message: `Product ${title} has been updated`,
    })
  }

  const errorNotification = () => {
    notification.open({
      type: "error",
      message: `Api error`,
    })
  }
  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation()

  const [update, { isLoading }] = useUpdateProductMutation()

  const publishUpdate = async (values: ICreatedProduct) => {
    try {
      const payload = await update({
        ...values,
      }).unwrap()

      dispatch(
        updateCreatedProduct({
          ...values,
          ...payload,
          id: values.id,
          published: !values.published,
        })
      )

      openNotification(payload.title)
    } catch (_error) {
      errorNotification()
    }
  }

  const deleteNotification = (title: string) => {
    notification.open({
      message: `Product ${title} has been deleted`,
    })
  }

  const handleOk = async () => {
    try {
      if (deleteItem) {
        await deleteProduct({
          id: deleteItem.id,
        }).unwrap()

        dispatch(deleteCreatedProduct(deleteItem))

        deleteNotification(deleteItem.title)
      }
    } catch (error) {
      console.error(error)
      errorNotification()
    }
    setDeleteItem(null)
  }

  const handleCancel = () => {
    setDeleteItem(null)
  }

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        loading={isLoading || isDeleteLoading}
        dataSource={
          searchParams.get("create") === "published"
            ? createdProducts.filter((i) => i.published)
            : createdProducts
        }
        pagination={paginationConfig}
        footer={
          <Space>
            Items per page:
            <Select
              defaultValue={size}
              style={{ width: 120 }}
              onChange={(value) => setSize(value)}
              options={[
                { value: 8, label: 8 },
                { value: 16, label: 16 },
                { value: 20, label: 20 },
              ]}
            />
          </Space>
        }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={DollarOutlined} text={`${item.price}`} />,
              <p>
                Published:{" "}
                <Switch
                  defaultChecked={item.published}
                  onClick={() => publishUpdate(item)}
                />
              </p>,

              <IconButton
                icon={EditOutlined}
                onClick={() => navigate(`/${PAGE_PRODUCTS}/edit/${item.id}`)}
              />,
              <IconButton
                icon={DeleteOutlined}
                onClick={() => {
                  setDeleteItem(item)
                }}
              />,
            ]}
            extra={<Image height={272} alt={item.title} src={item.image} />}
          >
            <List.Item.Meta
              title={<Link to={`./${item.id}`}>{item.title}</Link>}
            />
            {item.description}
          </List.Item>
        )}
      />
      <Modal
        title="Delete"
        open={!!deleteItem}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Are you sure you want to remove <b>{deleteItem?.title}</b>?
        </p>
      </Modal>
    </>
  )
}

export default CreatedProducts
