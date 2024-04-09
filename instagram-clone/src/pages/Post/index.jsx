import './style.css'
import sendRequest from "../../core/tools/remote/request"
import { requestMehods } from "../../core/enums/requestMethods"
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar'

const Post = () => {
    const [image, setImage] = useState('');
    const [post, setPost] = useState({image: '', caption: ''});
    const [message, setMessage] = useState('');
    
    const addPost = async () => {
        setMessage('');

        if (post.image === '') {
            setMessage('Enter an image to post!');
            return;
        }

        try {
            const res = await sendRequest(requestMehods.POST, '/post', {
                image: post.image,
                caption: post.caption
            });
            if (res.data.status === 'success') {
                setImage('');
                setPost({image:'', caption: ''});
                setMessage('Post added successfully.');
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setPost({ ...post, image: file });
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result)
        }
    }

  return (
      <div className='page flex center'>
          <NavBar />
        <div className='flex column center gap-20 mt-20'>
            {message != '' && <p className='secondary-text xsm-text'>{message}</p>}
            {image !== '' && <img className='edit-profile-img' src={image} />}

            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
                className="hidden" />
            <textarea
                onChange={(e)=>{setPost({...post, caption: e.target.value})}}
                  className='border button-padding semi-rounded'
                  value={post.caption}
                placeholder='Caption' />
            
            <button
                onClick={addPost}
                className='semi-rounded secondary-bg button-padding white-text'
            >Post</button>
        </div>
    </div>
  )
}

export default Post