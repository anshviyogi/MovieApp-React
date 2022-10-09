import React, { useEffect, useState } from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { getData, getSearchedText } from '../redux/action';

function Header() {
  
    // Managing states for Header
  const[data,setData] = useState([])
  const[selectOption,setSelectOption] = useState('')
  const[search,setSearch] = useState('')
  const arrData = []

  // Redux dispatcher
  const dispatch = useDispatch()

  // Fetching data from API
  useEffect(()=>{
  fetch('https://movie-task.vercel.app/api/popular?page=1')
  .then(res => res.json())
  .then(data => setData(data.data.results))
  },[])

  // Work only when the search field text changes its state

  useEffect(()=>{
    dispatch(getSearchedText(search))
  },[search])

  // Sorting data according to Year
    data.map(list =>{
      if(selectOption == list.release_date.split('-')[0]){
        arrData.push(list)
      }else if(selectOption == 'Select by Year' || selectOption == ''){
        arrData.push(list)
      }
      else{
        return
      }
    })

    // Sending sorted data to Redux Store
    dispatch(getData(arrData))

  return (
    
    <nav className='header'>
        {/* Book my show Logo */}
        <Link to='/'>
      <img src='https://static.pingcap.com/files/2021/10/bookmyshow-logo.png' className='header__logo' style={{marginTop:"-5px",paddingTop:"5px",marginRight:"20px"}}/>
      </Link>

{/* DIV for search bar and select box - Sorting Year */}
        <div style={{display:"flex",flex:"1"}}>
          <SearchIcon className='header__searchIcon'/>
        <input type='text' className='header__searchInput' placeholder='Search for Movies' spellCheck='false' onChange= {e => setSearch(e.target.value)}/>

        <select className='header__filterYear' onClick={e => setSelectOption(e.target.value)}>

          <option>Select by Year</option>
          <option>2021</option>
          <option>2022</option>

        </select>
        </div>

{/* Location */}
        <div className='header__nav'>
            <div className='header__option'>
            <span className='india__locationText'>India</span>
            <ArrowDropDownIcon style={{marginTop:"3px"}}/>
            </div>
        </div>
    </nav>

  )
}

export default Header