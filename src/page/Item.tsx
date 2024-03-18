import { useNavigate, useParams } from "react-router-dom"
import {
  Flex,
  Skeleton,
  Image,
  Typography,
  Rate,
  Statistic,
  Button,
} from "antd"
import { LikeOutlined, DollarOutlined } from "@ant-design/icons"
import { useGetProductByIDQuery } from "../services/product"

const { Title, Text } = Typography

const Item = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useGetProductByIDQuery(String(id))

  const navigate = useNavigate()

  if (isLoading) {
    return <Skeleton active></Skeleton>
  }

  if (!data) {
    return <p>Item not found</p>
  }

  return (
    <>
      <Button type="dashed" onClick={() => navigate(-1)}>
        {"< Back"}
      </Button>
      <Flex gap="middle">
        <Flex gap="middle" vertical>
          <Flex justify="space-between" gap="large">
            <Title>{data.title}</Title>
            <Rate
              style={{ flex: "1 0 auto", paddingTop: "32px" }}
              allowHalf
              defaultValue={data.rating.rate}
            />
          </Flex>
          <Text type="secondary">{data.description}</Text>
          <Flex gap="large" align="end" justify="end">
            <Statistic
              title="Feedback"
              value={data.rating.count}
              prefix={<LikeOutlined />}
            />
            <Statistic
              title="Price"
              value={data.price}
              prefix={<DollarOutlined />}
            />
          </Flex>
        </Flex>
        <Image width="50%" src={data.image} />
      </Flex>
    </>
  )
}

export default Item
