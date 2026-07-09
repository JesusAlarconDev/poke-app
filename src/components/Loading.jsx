import { Col, Row, Spin } from 'antd'

const Loading = () => {
  return (
      <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Spin spinning size='large'/>
      </Col>
  )
}

export default Loading