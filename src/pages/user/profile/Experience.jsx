import { Form, Row, Col, Input } from "antd";

const Experience = () => {
    return (
        <>
            <Form.List name="experiences">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Row gutter={[10, 10]} align="middle" key={key}>
                                <Col span={8}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "company"]}
                                        rules={[{ required: true, message: "required" }]}
                                        label="Company"
                                        key={`${key}-company`}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "designation"]}
                                        rules={[{ required: true, message: "required" }]}
                                        label="Designation"
                                        key={`${key}-designation`}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "duration"]}
                                        rules={[{ required: true, message: "required" }]}
                                        label="Duration"
                                        key={`${key}-duration`}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "location"]}
                                        rules={[{ required: true, message: "required" }]}
                                        label="Location"
                                        key={`${key}-location`}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <i className="ri-delete-bin-line" onClick={() => remove(name)}></i>
                            </Row>
                        ))}
                        <Form.Item>
                            <button className="primary-outlined-btn" onClick={() => add()}>
                                ADD EXPERIENCE
                            </button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

            <Form.List name="projects">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Row gutter={[10, 10]} align="middle" key={key}>
                                <Col span={8}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "title"]}
                                        rules={[{ required: true, message: "required" }]}
                                        label="Title"
                                        key={`${key}-title`}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={10} className='mt-4'>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "description"]}
                                        rules={[{ required: true, message: "required" }]}
                                        label="Description"
                                        key={`${key}-description`}
                                    >
                                        <textarea type="text" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "duration"]}
                                        rules={[{ required: true, message: "required" }]}
                                        label="Duration"
                                        key={`${key}-duration`}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>

                                <i className="ri-delete-bin-line" onClick={() => remove(name)}></i>
                            </Row>
                        ))}
                        <Form.Item>
                            <button className="primary-outlined-btn" onClick={() => add()}>
                                ADD PROJECT
                            </button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </>
    )
}

export default Experience
