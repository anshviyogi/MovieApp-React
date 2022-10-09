import { Container } from '@mui/system'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Body.css'
import ProductModal from './ProductModal'
import {useSelector} from 'react-redux'

function Body() {
  // Managing states
    const [modalShow, setModalShow] = React.useState(false);
    const[id,setId] = useState()
    const url = 'https://image.tmdb.org/t/p/original'
    
    // Redux
    const reduxData = useSelector(data => data)

  return (
    <Container>    
    <div className='body'>
{/* Mapping the sorted Redux Store Data */}

        {
            reduxData?.data.filter(value =>{
              // Search Functionality
              if(reduxData.text === ""){
                return value;
              }else if(value.title.toLowerCase().includes(reduxData.text.toLowerCase())){
                return value;
              }
              
            })
            // Displaying the searched data
            .map((dataList,index) =>{
                return <Link key={index} style={{textDecoration:"none",color:"black"}} onClick={() =>{
                    setModalShow(true)
                    setId(dataList.id)
                }} >
                <div className='column'>
                <div className='body__image'>
                    
                    <img className='movie__image' src={url + dataList.poster_path}/>
                </div>
                <div className='body__data'>
                    <p className='movie__title'>{dataList.title}</p>
                </div>
                </div>         
                </Link>
            })
        }

{/* Modal Information and its prop drill */}
<ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={id}
      />

    </div>
    </Container>
  )
}

export default Body