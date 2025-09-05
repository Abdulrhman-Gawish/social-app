import { Form, Input, Button, Card, Checkbox } from "antd";
import { Link } from "react-router-dom";

function Login(){
  const onFinish = (values) =>{
    console.log("Form submitted:", values);
  };
  return(
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#f0f2f5"
    }}>
      <Card title="Login" style={{ width: 400 }}>
        <Form name="login" layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[
            {required: true, message: "Please enter your email"},
            {type: "email", message: "Invalid email format"},
          ]}>
            <Input placeholder="Email" autoComplete="email"/>
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[
            {required: true, message: "Please enter your password"},
            { min: 6, message: "Password must be at least 6 characters" },
            { pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, message: "Password must include uppercase, number and special character" }
          ]}>
            <Input.Password placeholder="Password" autoComplete="current-password"/>
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