import './style.css'
import logo from '../../assets/images/logo.png'
import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import sendRequest from "../../core/tools/remote/request"
import { requestMehods } from "../../core/enums/requestMethods"
import Search from '../Search'

const NavBar = ({ handleUserLogged }) => {
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const goToPage = (page) => {navigate(page)}
  
  const logout = async () => {
      try {
          const res = await sendRequest(requestMehods.GET, "/logout");
          if (res.data.status === 'success') {
              handleUserLogged(false);
              localStorage.removeItem('token');
          }
      } catch (e) {
          console.error(e);
      }
  }

  return (
    <div className='navbar-container'>
      <div className='navbar flex column gap-10 start-center'>
        <div className='nav-item flex start-center'>
            <img className='nav-logo' src={logo} alt='instagram' />
        </div>
        <div onClick={() => { goToPage('/') }} className='nav-item flex start-center gap-20 rounded'>
          <img className='nav-icon' alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGQ9Ik0zOS41LDQzaC05Yy0xLjM4MSwwLTIuNS0xLjExOS0yLjUtMi41di05YzAtMS4xMDUtMC44OTUtMi0yLTJoLTRjLTEuMTA1LDAtMiwwLjg5NS0yLDJ2OWMwLDEuMzgxLTEuMTE5LDIuNS0yLjUsMi41aC05CUM3LjExOSw0Myw2LDQxLjg4MSw2LDQwLjVWMjEuNDEzYzAtMi4yOTksMS4wNTQtNC40NzEsMi44NTktNS44OTNMMjMuMDcxLDQuMzIxYzAuNTQ1LTAuNDI4LDEuMzEzLTAuNDI4LDEuODU3LDBMMzkuMTQyLDE1LjUyCUM0MC45NDcsMTYuOTQyLDQyLDE5LjExMyw0MiwyMS40MTFWNDAuNUM0Miw0MS44ODEsNDAuODgxLDQzLDM5LjUsNDN6Ij48L3BhdGg+Cjwvc3ZnPg=="/>
          <NavLink className="nav-text sm-text">Home</NavLink>
        </div>
        <div onClick={() => {setIsSearch(!isSearch)}} className='nav-item flex start-center gap-20 rounded'>
          <img className='nav-icon' alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCI+CjxwYXRoIGQ9Ik0gMTMgMyBDIDcuNDg4OTk3MSAzIDMgNy40ODg5OTcxIDMgMTMgQyAzIDE4LjUxMTAwMyA3LjQ4ODk5NzEgMjMgMTMgMjMgQyAxNS4zOTY1MDggMjMgMTcuNTk3Mzg1IDIyLjE0ODk4NiAxOS4zMjIyNjYgMjAuNzM2MzI4IEwgMjUuMjkyOTY5IDI2LjcwNzAzMSBBIDEuMDAwMSAxLjAwMDEgMCAxIDAgMjYuNzA3MDMxIDI1LjI5Mjk2OSBMIDIwLjczNjMyOCAxOS4zMjIyNjYgQyAyMi4xNDg5ODYgMTcuNTk3Mzg1IDIzIDE1LjM5NjUwOCAyMyAxMyBDIDIzIDcuNDg4OTk3MSAxOC41MTEwMDMgMyAxMyAzIHogTSAxMyA1IEMgMTcuNDMwMTIzIDUgMjEgOC41Njk4Nzc0IDIxIDEzIEMgMjEgMTcuNDMwMTIzIDE3LjQzMDEyMyAyMSAxMyAyMSBDIDguNTY5ODc3NCAyMSA1IDE3LjQzMDEyMyA1IDEzIEMgNSA4LjU2OTg3NzQgOC41Njk4Nzc0IDUgMTMgNSB6Ij48L3BhdGg+Cjwvc3ZnPg=="/>
          <NavLink className="nav-text sm-text">Search</NavLink>
        </div>
        <div className='nav-item flex start-center gap-20 rounded'>
          <img className='nav-icon' src="data:image/png;base64,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" />
          <NavLink className="nav-text sm-text">Explore</NavLink>
        </div>
        <div className='nav-item flex start-center gap-20 rounded'>
          <img className='nav-icon' alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDUwIDUwIj4KPHBhdGggZD0iTSAxNSA0IEMgOC45MzY1OTMyIDQgNCA4LjkzNjU5MzIgNCAxNSBMIDQgMzUgQyA0IDQxLjA2MzQwNyA4LjkzNjU5MzIgNDYgMTUgNDYgTCAzNSA0NiBDIDQxLjA2MzQwNyA0NiA0NiA0MS4wNjM0MDcgNDYgMzUgTCA0NiAxNSBDIDQ2IDguOTM2NTkzMiA0MS4wNjM0MDcgNCAzNSA0IEwgMTUgNCB6IE0gMTYuNzQwMjM0IDYgTCAyNy40MjU3ODEgNiBMIDMzLjI1OTc2NiAxNiBMIDIyLjU3NDIxOSAxNiBMIDE2Ljc0MDIzNCA2IHogTSAyOS43NDAyMzQgNiBMIDM1IDYgQyAzOS45ODI1OTMgNiA0NCAxMC4wMTc0MDcgNDQgMTUgTCA0NCAxNiBMIDM1LjU3NDIxOSAxNiBMIDI5Ljc0MDIzNCA2IHogTSAxNC40ODYzMjggNi4xMDM1MTU2IEwgMjAuMjU5NzY2IDE2IEwgNiAxNiBMIDYgMTUgQyA2IDEwLjE5OTgzMyA5Ljc1ODE5MjEgNi4zODI5ODAzIDE0LjQ4NjMyOCA2LjEwMzUxNTYgeiBNIDYgMTggTCA0NCAxOCBMIDQ0IDM1IEMgNDQgMzkuOTgyNTkzIDM5Ljk4MjU5MyA0NCAzNSA0NCBMIDE1IDQ0IEMgMTAuMDE3NDA3IDQ0IDYgMzkuOTgyNTkzIDYgMzUgTCA2IDE4IHogTSAyMS45Nzg1MTYgMjMuMDEzNjcyIEMgMjAuNDM1MTUyIDIzLjA0OTg2OCAxOSAyNC4yNjkyODQgMTkgMjUuOTU3MDMxIEwgMTkgMzUuMDQxMDE2IEMgMTkgMzcuMjkxMzQ1IDIxLjU1MjM0NCAzOC43MTMyNTUgMjMuNTA5NzY2IDM3LjU5NzY1NiBMIDMxLjQ5ODA0NyAzMy4wNTY2NDEgQyAzMy40NDI4NDQgMzEuOTUxNjA5IDMzLjQ0Mjg0NCAyOS4wNDQ0ODUgMzEuNDk4MDQ3IDI3LjkzOTQ1MyBMIDIzLjUwOTc2NiAyMy4zOTg0MzggTCAyMy41MDc4MTIgMjMuMzk4NDM4IEMgMjMuMDE4NDQ1IDIzLjEyMDYwMyAyMi40OTI5NyAyMy4wMDE2MDcgMjEuOTc4NTE2IDIzLjAxMzY3MiB6IE0gMjEuOTgyNDIyIDI0Ljk4NjMyOCBDIDIyLjE1ODYyNiAyNC45ODgyMzIgMjIuMzQyMzk5IDI1LjAzNTA1MiAyMi41MjE0ODQgMjUuMTM2NzE5IEwgMzAuNTExNzE5IDI5LjY3NzczNCBDIDMxLjIyMDkyMiAzMC4wODA3MDMgMzEuMjIwOTIyIDMwLjkxNTM5MSAzMC41MTE3MTkgMzEuMzE4MzU5IEwgMjIuNTE5NTMxIDM1Ljg1OTM3NSBDIDIxLjgwMjk1MyAzNi4yNjc3NzMgMjEgMzUuODA4Njg2IDIxIDM1LjA0MTAxNiBMIDIxIDI1Ljk1NzAzMSBDIDIxIDI1LjU3MzE5NiAyMS4yMDE0MDIgMjUuMjY3Mzg1IDIxLjQ5MjE4OCAyNS4xMDc0MjIgQyAyMS42Mzc1OCAyNS4wMjc0NCAyMS44MDYyMTcgMjQuOTg0NDI0IDIxLjk4MjQyMiAyNC45ODYzMjggeiI+PC9wYXRoPgo8L3N2Zz4="/>
          <NavLink className="nav-text sm-text">Reels</NavLink>
        </div>
        <div onClick={() => { goToPage('/profile') }} className='nav-item flex start-center gap-20 rounded'>
          <img className='nav-icon' src="data:image/png;base64,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" />
          <NavLink className="nav-text sm-text">Profile</NavLink>
        </div>
        <div onClick={() => { goToPage('/post') }} className='nav-item flex start-center gap-20 rounded'>
          <img className='nav-icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABO0lEQVR4nO2V30oCQRSHP5DqIukd6tIQu0ntAYOIotRn8SJ6gugy7QGy24JIcaViYugnyGqrs3vMFvYHA8vh7Jnv/JkZKFToH8qteeUHwFr5A3CbboHbNIC1CgCXpQUuZkvT73wDhOgQaAM9YAi8AHd/AbADdICvJVU5BUrrbMEYuAbqwK5WA2gBkXy6SRAuA8ATUE1IrgYM5HsWApCkfeBTmVdXiFVTJXyrDiwAzuV/FRCrLfuFBcC9/I8DYjVk71sAvMq/HPs/6W4ozwxsZoBxCoA9fb8tCpj2ma0HJNOU/cESoBUA0JH9EgNVdKQiHbFlAEfAREe3gpGmx2qwACK++bN8/W1pJv8O3ChwJKCmBtOvE5V9Ip9bYMtu+x9taw58aX+bkw9lbr75rKbP8SMwAt417X7g5nr+DayFPzeBYYV7AAAAAElFTkSuQmCC" />
          <NavLink className="nav-text sm-text">Create</NavLink>
        </div>
        <div onClick={logout} className='nav-item flex start-center gap-20 rounded'>
          <img className='nav-icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADIklEQVR4nO2dy25NYRTHf1VM1LgVIxXqkiaNE+EFRFyH5QmQvoDLAxiYuyQSEzNB65qmE5dXIEViwEBqQlGlLrXlS77RSU/3Vqdnr7X6/yVrvr/1O3vtfb7L2iCEEEIIIYQQQgghxNLYCIwAD4EXwFegMBKzwFtgHDgLbIkkuQ+4DPwykOiiYswD94EdOOcA8MlAQoslxg/gHNCFQ04Cvw0ksWhDXAO6ccR+ZyWnqBAXcFTzPZedYpE4hAOuGEhUsUzxGliL8VfNaKWnaIpjGGakwgCeAUeAHuzQCwwDkxWu/w6GeVAh+euxyzrgSckYPmOYVyUXfxj79JeU0fSCYZYvJQIslZ3FGF1kDDcxTFn99MJWYGqB6/9gfZ4oioDEJuB2Ljmp7t+ynvxoAlwiATUjATUjATUjATUTWUAXDogoYCivFX/PK2T3gG0YJZqAIWBmgXFMA3swSDQB4yVzQuYkRBKwKpedwpOESAIS3yqMyZSEaAJGK4zJlIRoAjbnB64bCdEEJHblaeiqEvZSIxEFuJIQVYAbCZEFuJAQXYB5Ce0UsBO4m5cDC8fR0bejdgkYbDEH4zWm80K/GwETBpLW7riBEwFpH/5PAwlrd7ynA0gALXPwzouAxISBX+yKLUGJQT2E6xVAPqE49g+TYVbD5WuoZRrAR4vJXwkCGpaTH11Aw3ryIwtoeEh+VAENL8mPKGBAS5K2Dx2a+eVHvAO681ZEN8mPJmB1hUPnppIfTUDisafkRxSwu8X2RG3O7bCER7kczeVlUrOnJaPdAc0P5bRh1zSRBbhAAmpGAmpGAmpGAmomkoB+4Hpem57JhzU6srnqf4giYCDv42m+/qncRcVtwybL7cqqHk1KLWzM8rJEQGrWZ51+zy3LyubPnxu/C3qAp56b9lVpW5kkHDUmog84XuEONt+2ciU0bh3GOJcMJKlYpkh3yBqM0xtgO2GxQPwBDuKEfQFL0XmccSLQBxyuelgLaPUhB8/laA44g3PSM+Gis2NH8/l1czuB2ACcyl8nmjR2CnIWeJP/SJ7OTTqEEEIIIYQQQgghhKBT/AW5V8gZ0he6eQAAAABJRU5ErkJggg==" />
          <NavLink className="nav-text sm-text">Logout</NavLink>
        </div>
      </div>
      
      {isSearch && <Search />}
    </div>
  )
}

export default NavBar