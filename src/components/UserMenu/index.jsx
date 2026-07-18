import { Dropdown, Avatar } from 'antd'
import { UserOutlined, HeartOutlined, HomeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Profile from '../Profile'
import './index.css'

const UserMenu = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
      label: <span onClick={() => setIsProfileOpen(true)} style={{ cursor: 'pointer' }}>Profile</span>
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
      <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  )
}

export default UserMenu
