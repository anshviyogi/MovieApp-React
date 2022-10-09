import { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import {Row,Col} from 'react-bootstrap'

function ProductModal(props) {
  
  // Managing states
    const[apiData,setApiData] = useState([])
    const imageUrl = 'https://image.tmdb.org/t/p/original'

    const {id} = props

    // Calling API for a particular ID
    useEffect(()=>{
        fetch(`https://movie-task.vercel.app/api/movie?movieId=${id}`)
        .then(res => res.json())
        .then(data => setApiData(data?.data))
    },[id])

    if(apiData === undefined){
        return 
        // <h1>Waiting for the data to fetch</h1>
    }

    // Getting particular data from 'apiData' object
    const {poster_path,title,original_language,overview,release_date,status} = apiData

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Body>
        <div className='row'>

            <div className='col-sm-6'>
                <img src={imageUrl + poster_path} style={{width:"320px",borderRadius:"5px"}}/>
            </div>

            <div className='col-sm-6'>
                <h1>{title}</h1>

                <Row>
                    <Col>
                    <p style={{color:"grey",fontWeight:"500"}}>Language: {original_language}</p>
                    </Col>
                    <Col>
                    <p style={{color:"grey",fontWeight:"500"}}>Release Date:<span style={{fontSize:"12px"}}> {release_date} </span></p>
                    </Col>
                </Row>

                <p style={{color:"grey",fontWeight:"500"}}>Status : {status}</p>
                <p>Description : </p>
                <span>{overview}</span>
            </div>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>

        <Link to={`/page/${id}`}>
        <Button>Know More</Button>
        </Link>

      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal