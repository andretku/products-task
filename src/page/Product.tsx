import { Switch, Tabs, TabsProps } from "antd"
import ApiProducts from "../Components/ApiProducts"
import CreatedProducts from "../Components/CreatedProducts"
import { useSearchParams } from "react-router-dom"

const tabItems: TabsProps["items"] = [
  {
    key: "main",
    label: "Api products",
    children: <ApiProducts />,
  },
  {
    key: "create",
    label: "Created products",
    children: <CreatedProducts />,
  },
]

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const operations =
    searchParams.get("create") === "all" ||
    searchParams.get("create") === "published" ? (
      <p>
        Only Published:{" "}
        <Switch
          defaultChecked={searchParams.get("create") === "published"}
          onChange={(value) => {
            if (value) {
              setSearchParams({ create: "published" })
            } else {
              setSearchParams({ create: "all" })
            }
          }}
        />
      </p>
    ) : null

  return (
    <Tabs
      defaultActiveKey={
        searchParams.get("create") === "all" ||
        searchParams.get("create") === "published"
          ? "create"
          : "main"
      }
      items={tabItems}
      onChange={(key) => {
        setSearchParams(key === "create" ? { create: "all" } : {})
      }}
      tabBarExtraContent={operations}
    />
  )
}

export default Product
