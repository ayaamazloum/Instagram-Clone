import './style.css'
import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import sendRequest from "../../core/tools/remote/request"
import { requestMehods } from "../../core/enums/requestMethods"
import UserPost from './Components/UserPost'

const Home = ({ handleUserLogged }) => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const loadAllPosts = async () => {
      try {
        const res = await sendRequest(requestMehods.GET, '/posts');
        if (res.data.status === 'success') {
          setPosts(res.data.posts);
        }
      } catch (e) { console.error(e); }
    }
    loadAllPosts();
  }, []);

  return (
    <div className='home page'>
      <NavBar handleUserLogged={handleUserLogged} />
      <div className='posts-container flex column center gap-40 full-width'>
        {posts?.length > 0 &&
          posts.map((post) => {
            return (<UserPost key={post.id} post={post} />);
          })}
      </div>
    </div>
  )
}

export default Home