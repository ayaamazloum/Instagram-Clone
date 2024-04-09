const UserPost = ({post}) => {
    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const formattedDate = date.toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        });
        return formattedDate;
    }

    return (
        <div className="post flex column gap-10">
            <div className="flex row start-center gap-20">
                <img className="post-profile-pic" src={"http://127.0.0.1:8000/profile_pictures/" + post.user.profile.profile_picture} />
                <p>{post.user.username}</p>
                <p className="xsm-text light-text">{formatDate(post.created_at)}</p>
            </div>
            <img className="post-image" src={"http://127.0.0.1:8000/posts_images/" + post.image} />
            <div className="flex gap-20">
                <p>{post.user.username}</p>
                <p>{post.caption}</p>
            </div>
        </div>
    )
}

export default UserPost