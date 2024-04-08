import './style.css'
import sendRequest from "../../core/tools/remote/request"
import { requestMehods } from "../../core/enums/requestMethods"
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar'

const Profile = () => {
    const [user, setUser] = useState();
    const [editing, setEditing] = useState(false);
    const [image, setImage] = useState();
    const [editedUser, setEditedUser] = useState();

    const editProfile = async () => {
        try {
            const res = await sendRequest(requestMehods.POST, '/editProfile', {
                'name': editedUser.name,
                'username': editedUser.username,
                'profile_picture': editedUser.profile_picture,
                'bio': editedUser.bio,
            })
            if (res.data.status === 'success') {
                setEditing(false);
                loadProfile();
            }
        } catch(e) {console.error(e)}
     }
    
    const loadProfile = async () => {
        try {
          const res = await sendRequest(requestMehods.GET, '/userProfile');
          if (res.data.status === 'success') {
            setUser({
              'name': res.data.user.name,
              'username': res.data.user.username,
              'profile_picture': res.data.profile.profile_picture,
              'bio': res.data.profile.bio,
              'followed' : res.data.followed
            });
            setEditedUser({ ...user, profile_picture: '' });
            setImage("http://127.0.0.1:8000/profile_pictures/" + res.data.profile.profile_picture);
          }
        } catch (e) {
          console.error(e);
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setEditedUser({ ...editedUser, profile_picture: file });
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result)
        }
    }

    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <div className='page'>
            <NavBar />
            <div className="profile-info flex row center wrap full-width gap-40 mt-30">
                <img className='profile-img' src={"http://127.0.0.1:8000/profile_pictures/" + user?.profile_picture} />
                <div className="info flex column gap-20">
                <div className='flex row start-center gap-20'>
                    <p>{user?.username}</p>
                    <button
                        onClick={() => { setEditing(true) }}
                        className='semi-rounded white-bg secondary-border button-padding secondary-text'
                    >Edit Profile</button>
                </div>
                <p className='xsm-text'>{ user?.name}</p>
                <p className='xsm-text'>{ user?.bio}</p>
                </div>
            </div>

            {editing &&(
                <div className='popup flex center'>
                    <div className='popup-content semi-rounded'>
                        <div className='popup-header'>
                            <div className='popup-title'>Edit Profile</div>
                        </div>
                        <div className='popup-body'>
                            <div className='flex column center gap-20 mt-20'>
                                <img className='edit-profile-img' src={image} />

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e)}
                                    className="hidden" />
                                <input
                                    onChange={(e)=>{setEditedUser({...editedUser, username: e.target.value})}}
                                    className='border button-padding semi-rounded'
                                    value={editedUser?.username}
                                    placeholder='username' />
                                <input
                                    onChange={(e)=>{setEditedUser({...editedUser, name: e.target.value})}}
                                    className='border button-padding semi-rounded'
                                    value={editedUser?.name}
                                    placeholder='Full Name' />
                                <input
                                    onChange={(e)=>{setEditedUser({...editedUser, bio: e.target.value})}}
                                    className='border button-padding semi-rounded'
                                    value={editedUser?.bio}
                                    placeholder='bio' />
                                
                                <div className='flex row center gap-30'>
                                    <button
                                        onClick={() => { setEditing(false) }}
                                        className='popup-close semi-rounded secondary-bg button-padding white-text'
                                    >Cancel</button>
                                    <button
                                        onClick={() => { editProfile() }}
                                        className='semi-rounded secondary-bg button-padding white-text'
                                    >Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile