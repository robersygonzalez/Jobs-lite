import { Row, Col, Form, Input } from 'antd'

const PersonalInfo = () => {
    return (
        <Row gutter={[10, 10]}>
            <Col span={8}>
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                    <Input type="text" className="form-control" />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                    <Input type="text" className="form-control" />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input type="text" className="form-control" />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input type="text" className="form-control" />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label="Potfolio"
                    name="portfolio"
                    rules={[{ required: true, message: 'Please input your portfolio!' }]}
                >
                    <Input type="text" className="form-control" />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item
                    label="Carrier Objetive"
                    name="carrierObjetive"
                    rules={[{ required: true, message: 'Please input your carrier objetive!' }]}
                >
                    <textarea
                        type="text"
                        className="form-control"
                        rows={4} />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item
                    label="Address"
                    name="address">
                    <textarea type="text" className="form-control" />
                </Form.Item>
            </Col>

        </Row>
    )
}

export default PersonalInfo
