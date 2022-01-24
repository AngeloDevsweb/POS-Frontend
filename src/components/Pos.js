import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Imagen from '../images/rtx390.jpg'

const Pos = () => {
    const [producto, setProductos] = useState([])

    useEffect(() => {
       const getProductos = async()=>{
        const res = await axios.get('http://localhost:4000/api/productos')
        setProductos(res.data)
       }
       getProductos();
    }, [producto])

    return (
      <div className="row">
        {producto.map((prod) => (
          <div className="card-group col-md-4 p-2" key={prod._id}>
            <div className="card">
              <img src={Imagen} alt="" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Producto: {prod.nombre}</h5>
                <p className="card-text">
                <strong>VRAM:</strong>  {prod.vram}
                </p>
                <p className="card-text">
                <strong>MARCA: </strong>  {prod.marca}
                </p>
                <p className="card-text">
                <strong>PRECIO:</strong>  {prod.precio} Bs.
                </p>
                <p className="card-text">
                <strong>STOCK:</strong>  {prod.stock}
                </p>
                <div className="">
                  <Link className="btn btn-danger form-control" to={'/formPos/'+ prod._id} >
                      Realizar Venta
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
}

export default Pos
