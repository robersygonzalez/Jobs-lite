import { Form, Input, Space, Button, Row, Col } from "antd";

const Education = () => {
    return (
        <>
            <Form.List name="education">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Row gutter={[10, 10]} align="middle" key={key}>
                                <Col span={8}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "degree"]}
                                        rules={[{ required: true, message: "required" }]}
                                        label="Degree"
                                        key={`${key}-degree`}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "institution"]}
                                        rules={[{ required: true, message: "required" }]}
                                        label="Institution"
                                        key={`${key}-institution`}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "percentage"]}
                                        rules={[{ required: true, message: "required" }]}
                                        label="Percentage"
                                        key={`${key}-percentage`}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <i className="ri-delete-bin-line" onClick={() => remove(name)}></i>
                            </Row>
                        ))}
                        <Form.Item>
                            <button className="primary-outlined-btn" onClick={() => add()}>
                                ADD EDUCATION
                            </button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

            <Form.List name="skills">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Row gutter={[10, 10]} align="middle" key={key}>
                                <Col span={8}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "technology"]}
                                        rules={[{ required: true, message: "required" }]}
                                        label="Technology"
                                        key={`${key}-technology`}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "rating"]}
                                        rules={[{ required: true, message: "required" }]}
                                        label="Rating"
                                        key={`${key}-rating`}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>

                                <i className="ri-delete-bin-line" onClick={() => remove(name)}></i>
                            </Row>
                        ))}
                        <Form.Item>
                            <button className="primary-outlined-btn" onClick={() => add()}>
                                ADD SKILLS
                            </button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </>
    )
}

export default Education
