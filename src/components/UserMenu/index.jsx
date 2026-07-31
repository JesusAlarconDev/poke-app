import { Dropdown, Avatar } from 'antd'
import { UserOutlined, HeartOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Profile from '../Profile'
import './index.css'
import { useAuth } from '../../hooks/useAuth'

const UserMenu = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const {logout, isAuthenticated, user} = useAuth();
  
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
    ...(isAuthenticated ? [
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: <span onClick={() => setIsProfileOpen(true)} style={{ cursor: 'pointer' }}>Profile</span>
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: <span onClick={() => logout()} style={{ cursor: 'pointer' }}>Logout</span>
      }
    ] : [])
  ]

  return (
    <div className="user-menu">
      <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']}>
        <Avatar
          size={60}
          icon={user?.picture ? <img src={user?.picture} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'contain', marginTop: '40px' }} /> : <UserOutlined />}
          className="user-avatar"
        />
      </Dropdown>
      <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  )
}

export default UserMenu