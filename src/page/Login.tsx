import React from "react"
import { Button, Flex, Form, Input, notification } from "antd"
import { IAuthRequest } from "../types/auth"
import { useNavigate } from "react-router-dom"
import { useGetTokenMutation } from "../services/auth"

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [getToken, { isLoading }] = useGetTokenMutation()

  const errorNotification = () => {
    notification.open({
      type: "error",
      message: `Api error`,
    })
  }

  const onFinish = async (values: IAuthRequest) => {
    try {
      await getToken(values).unwrap()

      navigate("/")
    } catch (error) {
      console.error(error)
      errorNotification()
    }
  }

  return (
    <Flex
      justify="center"
      align="center"
      style={{ background: "white", width: "100%", height: "96vh" }}
      vertical
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <p>
        Test User: <b>mor_2314</b><br />Password: <b>83r5^_</b>
      </p>
    </Flex>
  )
}

export default Login
