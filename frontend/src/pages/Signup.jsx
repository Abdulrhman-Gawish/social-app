import { Form, Input, Button, Card } from "antd";
import { Link } from "react-router-dom";
import { api } from "../api/axios";
function Signup() {
  const onFinish = async (values) => {
    try {
      const response = await api.post("auth/signup", {
        name: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      console.log("Signup successful: ", response.data);
    } catch (e) {
      console.log("Signup failed: ", e.response?.data || e.message);
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
      <Card title="Create Account" style={{ width: 400 }}>
        <Form name="signup" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="Username" autoComplete="username" />
          </Form.Item>

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
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm password"
              autoComplete="new-password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Signup
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <span>Already have an account? </span>
            <Link to="/login">Login</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Signup;
