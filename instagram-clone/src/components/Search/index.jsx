import './style.css'
import sendRequest from "../../core/tools/remote/request"
import { requestMehods } from "../../core/enums/requestMethods"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Search = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async (searchText) => {
        if (searchText.length === 0) {
            setUsers([]);
            return;
        }

        try {
            const res = await sendRequest(requestMehods.GET, "/search", searchText, { query: searchText });
            setUsers(res.data.users);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

  return (
      <div className='search flex column'>
          <div className='search-container flex column gap-20'>
            <h4>Search</h4>
              <input onChange={(e)=>{handleSearch(e.target.value)}} className='search-input xsm-text semi-rounded' type='text' placeholder='Search' />
          </div>
          <div className='search-result flex column gap-10'>
              {users.length > 0 &&
                users.map(user => (
                    <div key={user.id} onClick={()=>{navigate(`/account/${user.id}`)}} className="search-item flex row start-center gap-10">
                        <img className='nav-icon' src="data:image/png;base64,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" />
                        <p className='xsm-text'>{user.username}</p>
                    </div>
                ))}
          </div>
    </div>
  )
}

export default Search