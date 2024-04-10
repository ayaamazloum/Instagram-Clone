import React from 'react'

const UserComment = ({ comment, formatDate }) => {
    console.log(comment.user.profile.profile_picture);
    return (
        <div className='comment flex gap-20'>
            <img className="post-profile-pic" src={"http://127.0.0.1:8000/profile_pictures/" + comment.user.profile.profile_picture} />
            <div className="flex column gap-5">
                <div className='flex gap-10'>
                    <p className='xsm-text semi-bold'>{comment.user.username}</p>
                    <p className='xsm-text'>{comment.comment_text}</p>
                </div>
                <p className='xxsm-text light-text'>{formatDate(comment.created_at)}</p>
            </div>
        </div>
    )
}

export default UserComment