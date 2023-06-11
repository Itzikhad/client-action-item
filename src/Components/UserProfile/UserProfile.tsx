import { useState } from 'react';
import './UserProfile.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { User } from '../../types';

type UserProfileProps = {
    user: User;
    onUpdateClick: (updatedUser: User) => void;
    onBack: () => void;
}

const UserProfile = (props: UserProfileProps) => {

    const initial_name = { first_name: '', last_name: '' };
    let user = props.user
    const [editing, setEditing] = useState(false);
    const [updatedName, setUpdatedName] = useState(initial_name);

    if (!user) {
        return (<div className="user-profile">
            <div className='no-data'>
                No data available
            </div>
        </div>);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUpdatedName((prevName) => {
            return { ...prevName, [name]: value }
        });
    }

    const handleUpdateClick = () => {
        setEditing(false);
        let updated: User | null = user ? {
            ...user,
            first_name: updatedName.first_name ? updatedName.first_name : user.first_name,
            last_name: updatedName.last_name ? updatedName.last_name : user.last_name
        } : null
        props.onUpdateClick(updated);
    };

    const address = user.address;

    let header = (<div className="user-header">
        <img src={user.profile_img_url} alt={user.first_name} />
        <h2>{`${user.first_name} ${user.last_name}`}</h2>
    </div>)

    let footer = (<div className="user-footer">
        <Button variant="contained" disabled={editing} onClick={() => setEditing(true)}>
            Edit
        </Button>
        <Button variant="contained" color="primary" onClick={props.onBack}>
                Back
        </Button>
    </div>)

    let body = editing ? (
        <div className="user-details">
            <div className="detail-row">
                <TextField name="first_name" label="First Name:" variant="standard" value={updatedName?.first_name} onChange={handleInputChange} />
            </div>
            <div className="detail-row">
                <TextField name="last_name" label="Last Name:" variant="standard" value={updatedName?.last_name} onChange={handleInputChange} />
            </div>
            <div className="detail-row">
                <Button variant="contained" onClick={handleUpdateClick} sx={{ margin: '5px', backgroundColor: '#757575' }}>
                    Save
                </Button>
                <Button variant="contained" onClick={() => { setEditing(false); setUpdatedName(initial_name); }} sx={{ margin: '5px', backgroundColor: '#757575' }}>
                    Cancel
                </Button>
            </div>
        </div>
    ) : (
        <div className="user-details">
            <div className="detail-row">
                <label>Gender:</label>
                <span>{user.gender}</span>
            </div>
            <div className="detail-row">
                <label>Name:</label>
                <span>{`${user.first_name} ${user.last_name}`}</span>
            </div>
            <div className="detail-row">
                <label>Age:</label>
                <span>{user.age}</span>
            </div>
            <div className="detail-row">
                <label>Year of birth:</label>
                <span>{user.year}</span>
            </div>
            <div className="detail-row">
                <label>Address:</label>
                <span>{`${address.street_number}, ${address.street_name} - ${address.city} ${address.state}`}</span>
            </div>
            <div className="detail-row">
                <label>Email:</label>
                <span>{user.email}</span>
            </div>
            <div className="detail-row">
                <label>Phone:</label>
                <p>{user.phone}</p>
            </div>
        </div>
    )

    return (
        <div className="user-profile">
            {header}
            {body}
            {footer}
        </div>
    );
};

export default UserProfile;
