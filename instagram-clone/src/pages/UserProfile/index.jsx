import './style.css'
import sendRequest from "../../core/tools/remote/request"
import { requestMehods } from "../../core/enums/requestMethods"
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';

const UserProfile = () => {
  const { userId } = useParams();
  const [userProfileId, setUserProfileId] = useState(userId);
  const [user, setUser] = useState();

  const handleFollowing = async (follow) => {
    try {
      let res;
      follow ?
        res = await sendRequest(requestMehods.POST, 'follow', { userId: userProfileId }) :
        res = await sendRequest(requestMehods.POST, '/unfollow', { userId: userProfileId });
      
      if (res.data.status === 'success') {
        setUser({ ...user, followed: follow })
      }
    } catch(e) { console.error(e)}
  }

  useEffect(async () => {
    try {
      const res = await sendRequest(requestMehods.POST, '/userProfile', { 'userId': userProfileId });
      if (res.data.status === 'success') {
        setUser({
          'name': res.data.user.name,
          'username': res.data.user.username,
          'profile_picture': res.data.profile.profile_picture,
          'bio': res.data.profile.bio,
          'followed' : res.data.followed
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className='page'>
      <NavBar />
      <div className="profile-info flex row center wrap full-width gap-40 mt-30">
        <img className='profile-img' src={"http://127.0.0.1:8000/profile_pictures/" + user?.profile_picture} />
        <div className="info flex column gap-20">
          <div className='flex row start-center gap-20'>
            <div className="username">{user?.username}</div>
            {user?.followed ? 
              <button onClick={() => { handleFollowing(false) }}
                className='semi-rounded white-bg secondary-border button-padding secondary-text'>Unfollow</button>
              : <button onClick={() => { handleFollowing(true) }}
                className='semi-rounded secondary-bg button-padding white-text'>Follow</button>
            }
          </div>
          <p className='xsm-text'>{ user?.name}</p>
          <p className='xsm-text'>{ user?.bio}</p>
        </div>
      </div>
    </div>
  )
}

export default UserProfile