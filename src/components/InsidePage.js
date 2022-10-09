import { SettingsSystemDaydreamTwoTone } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { generatePath, useParams } from 'react-router-dom'
import {Row,Col} from 'react-bootstrap'
import { Container } from '@mui/system'

function InsidePage() {
  // Managing states
    const[data,setData] = useState([])
    const imageUrl = 'https://image.tmdb.org/t/p/original'

    // Getting the product id
    const id = useParams()

    // Calling API of particular ID
    useEffect(()=>{
      fetch(`https://movie-task.vercel.app/api/movie?movieId=${id.id}`)
        .then(res => res.json())
        .then(data => setData(data.data))
    },[])

    // Getting particular data from 'data' object
    const {poster_path,status,tagline,original_title,original_language,overview,release_date,genres} = data

    if(genres === undefined){
      return
    }

  return (
    <Container>
        <Row>
          <Col>
          <img src={imageUrl + poster_path} style={{width:"350px",marginTop:"15px"}}/>
          </Col>
          <Col>
          <h3 style={{paddingTop:"15px"}}>{original_title}</h3>
          
          <Row>
            <Col>
            <p style={{color:"grey",fontWeight:"400"}}>Status: {status}</p>
            </Col>
            <Col>
            <p style={{color:"grey",fontWeight:"400"}}>Language: {original_language}</p>
            </Col>
          </Row>

          <h5>About</h5>
          <p style={{fontWeight:"500"}}>{tagline}</p>
          <p>{overview}</p>

          <p style={{fontWeight:"500"}}>Release Date: {release_date}</p>

          <div className='movie-tags' style={{display:"flex"}}>
            {
              genres.map((data,index) =>{
                return <p key={index} style={{marginRight:"20px",backgroundColor:"lightgray",padding:"2px 4px",borderRadius:"5px"}}>{data.name}</p>
              })
            }
          </div>
          </Col>
        </Row>
      </Container>
  )
}

export default InsidePage