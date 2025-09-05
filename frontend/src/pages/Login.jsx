import { Form, Input, Button, Card, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { api } from "../api/axios";

function Login() {
  const onFinish = async (values) => {
    try {
      const response = await api.post("auth/login", {
        email: values.email,
        password: values.password,
        rememberMe: values.remember,
      });
      console.log("Login successful: ", response.data);
    } catch (e) {
      console.log("Login failed: ", e.response?.data || e.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card title="Login" style={{ width: 400 }}>
        <Form name="login" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="Email" autoComplete="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 8, message: "Password must be at least 8 characters" },
              {
                pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/,
                message:
                  "Password must include uppercase, number and special character",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <span>Don't have an account? </span>
            <Link to="/">Signup</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
export default Login;
