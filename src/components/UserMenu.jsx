import { Dropdown, Avatar } from 'antd'
import { UserOutlined, HeartOutlined, HomeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './UserMenu.css'

const UserMenu = () => {
  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>
    },
    {
      key: 'favorites',
      icon: <HeartOutlined />,
      label: <Link to="/favorites">Favorites</Link>
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>
    },
  ]

  return (
    <div className="user-menu">
      <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']}>
        <Avatar 
          size={40} 
          icon={<UserOutlined />} 
          className="user-avatar"
        />
      </Dropdown>
    </div>
  )
}

export default UserMenu
