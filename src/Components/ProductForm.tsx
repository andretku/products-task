import { Button, Form, Input, InputNumber, Space, Spin, Switch } from "antd"
import { ICreatedProduct } from "../types/product"
import TextArea from "antd/es/input/TextArea"

const ProductForm = <T,>({
  isLoading,
  onFinish,
  initialValues,
  onDeleteClick,
}: {
  isLoading: boolean
  initialValues?: ICreatedProduct
  onFinish: (values: T) => void
  onDeleteClick?: () => void
}) => {
  return (
    <Spin tip="Creating..." spinning={isLoading}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          initialValue={initialValues?.title || ""}
          rules={[{ required: true, message: "Please input title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          initialValue={initialValues?.description || ""}
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          initialValue={initialValues?.price || ""}
          rules={[{ required: true, message: "Please input price!" }]}
        >
          <InputNumber addonAfter="$" />
        </Form.Item>
        <Form.Item
          label="Published"
          name="published"
          valuePropName="checked"
          initialValue={!!initialValues?.published}
        >
          <Switch />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {initialValues ? "Save" : "Create"}
            </Button>
            {initialValues && (
              <Button danger loading={isLoading} onClick={onDeleteClick}>
                Delete
              </Button>
            )}
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default ProductForm
