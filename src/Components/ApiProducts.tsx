import { createElement, useState } from "react"
import { List, Image, Space, Select } from "antd"
import { DollarOutlined, StarOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useGetProductsQuery } from "../services/product"
import { PaginationConfig } from "antd/es/pagination"

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
)

const ApiProducts = () => {
  const [size, setSize] = useState(8)
  const { data, isLoading } = useGetProductsQuery("")

  const paginationConfig: PaginationConfig = { align: "start", pageSize: size }
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={data}
      loading={isLoading}
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
            <IconText icon={StarOutlined} text={`${item.rating.count}`} />,
            <IconText icon={DollarOutlined} text={`${item.price}`} />,
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
  )
}

export default ApiProducts
