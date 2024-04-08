import './style.css'
import { useParams } from 'react-router-dom';

const Account = () => {
  const { userId } = useParams();
  return (
    <div className='page'>{userId}</div>
  )
}

export default Account