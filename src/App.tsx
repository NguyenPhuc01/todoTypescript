import React, { useState } from "react";
import "./App.css";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [todos, setTodos] = useState<any[]>([]);
  const [form]: any = Form.useForm();
  const [formChangeTodo]: any = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [idTodo, setIdTodo] = useState<string>("");

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values: any) => {
    const data = {
      todo: values.todo,
      id: uuidv4(),
    };
    setTodos([...todos, data]);
    form.setFieldValue();
  };
  const onFinishChangeTodo = (values: { todoChange: String }) => {
    const todoUpdate = todos.map((e) =>
      e.id === idTodo ? { ...e, todo: values.todoChange } : e
    );
    setIsModalOpen(false);
    setTodos(todoUpdate);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleRemove = (id: string) => {
    const todoAfterRemove = todos.filter((e) => e.id !== id);
    setTodos(todoAfterRemove);
  };

  const handleUpdateTodo = (todo: { todo: string; id: string }) => {
    setIsModalOpen(true);
    formChangeTodo.setFieldsValue({
      todoChange: todo.todo,
    });

    setIdTodo(todo.id);
  };

  return (
    <div className="App">
      <Row>
        <Col xs={24} md={6}></Col>
        <Col xs={24} md={12}>
          <div>
            <Form
              form={form}
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              style={{ marginTop: 50 }}
            >
              <Form.Item
                label="todo"
                name="todo"
                rules={[{ required: true, message: "Please input your todo!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                <Button type="primary" htmlType="submit">
                  Add todo
                </Button>
              </Form.Item>
            </Form>
          </div>
          {todos &&
            todos.map((todo) => {
              return (
                <div
                  key={todo.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "grey",
                    padding: "8px",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <span>{todo.todo}</span>
                  <div style={{ display: "flex" }}>
                    <Button
                      style={{ marginRight: 20 }}
                      onClick={() => {
                        handleRemove(todo.id);
                      }}
                    >
                      DELETE
                    </Button>
                    <Button
                      onClick={() => {
                        handleUpdateTodo(todo);
                      }}
                    >
                      UPDATE
                    </Button>
                  </div>
                </div>
              );
            })}
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
              form={formChangeTodo}
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinishChangeTodo}
              autoComplete="off"
            >
              <Form.Item
                label="todoChange"
                name="todoChange"
                rules={[
                  { required: true, message: "Please input your todoChange!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item style={{ display: "flex", justifyContent: "end" }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Col>
        <Col xs={24} md={6}></Col>
      </Row>
    </div>
  );
}

export default App;
