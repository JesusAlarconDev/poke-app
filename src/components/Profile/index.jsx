import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { generations } from '../../statics/generations.js'
import { useAuth } from '../../hooks/useAuth'
import './index.css'

const Profile = ({ isOpen, onClose }) => {
    const {user, token} = useSelector((state) => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        picture: '',
        email: '',
        password: ''
    });
    const [selectedGeneration, setSelectedGeneration] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const {updateUser} = useAuth();
    
    useEffect(() => {
        setFormData({
            name: user?.name || '',
            lastname: user?.lastname || '',
            picture: user?.picture || '',
            email: user?.email || '',
            password: ''
        });
    }, [user]);

    const handleEdit = () => {
        setIsEditing(true);
        setFormData({
            name: user?.name || '',
            lastname: user?.lastname || '',
            picture: user?.picture || '',
            email: user?.email || '',
            password: ''
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setSelectedGeneration(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsEditing(false);

        try {
            const UPDATE_URL = '/api/users/profile';
            const response = await fetch(UPDATE_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar el perfil');
            }
            const data = await response.json();
            console.log('Server response:', data);

            updateUser(data.user);
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    const handleGenerationSelect = (generation) => {
        setSelectedGeneration(generation);
        setFormData({ ...formData, picture: '' });
    };

    const handlePictureSelect = (pictureUrl) => {
        setFormData({ ...formData, picture: pictureUrl });
    };

    const handleBackToGenerations = () => {
        setSelectedGeneration(null);
        setFormData({ ...formData, picture: '' });
    };

    if (!isOpen) return null;

    return (
        <div className="profile-modal-overlay" onClick={onClose}>
            <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                <div className="profile-header">
                    <h2>Profile</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                {!isEditing ? (
                    <div className="profile-view">
                        <div className="profile-avatar">
                            <img src={user?.picture || 'https://via.placeholder.com/100'} alt="Profile" />
                        </div>
                        <div className="profile-info">
                            <h3>{user?.name} {user?.lastname}</h3>
                            <p>{user?.email}</p>
                        </div>
                        <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
                    </div>
                ) : (
                    <form onSubmit={handleSave} className="profile-edit-form">
                        <div>
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                placeholder="Name" 
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="profile-form-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastname">Lastname</label>
                            <input 
                                type="text" 
                                placeholder="Lastname"
                                value={formData.lastname}
                                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                                className="profile-form-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="profile-form-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">New Password</label>
                            <input 
                                type="password" 
                                placeholder="Leave blank to keep current"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="profile-form-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="picture">Change Avatar</label>
                            
                            {!selectedGeneration ? (
                                <div className="generation-selector">
                                    <p className="selector-label">Choose a generation:</p>
                                    <div className="generation-grid">
                                        {Object.entries(generations).map(([genNum, genData]) => (
                                            <button
                                                key={genNum}
                                                type="button"
                                                className="generation-option"
                                                onClick={() => handleGenerationSelect(parseInt(genNum))}
                                            >
                                                Gen {genNum}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="starter-selector">
                                    <div className="starter-header">
                                        <button 
                                            type="button" 
                                            className="back-button"
                                            onClick={handleBackToGenerations}
                                        >
                                            ← Back
                                        </button>
                                        <p className="selector-label">{generations[selectedGeneration].name} - Choose your starter:</p>
                                    </div>
                                    <div className="avatar-selector">
                                        {generations[selectedGeneration].starters.map((starter) => (
                                            <button
                                                key={starter}
                                                type="button"
                                                className={`avatar-option ${formData.picture === starter ? 'selected' : ''}`}
                                                onClick={() => handlePictureSelect(starter)}
                                            >
                                                <img src={starter} alt="Starter option" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="form-buttons">
                            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                            <button type="submit" className="save-button">Save Changes</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Profile
