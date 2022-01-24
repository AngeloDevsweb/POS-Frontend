import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const CrearIngreso = () => {

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
            {
                producto.map(prod => (
                    <div className="col-md-4 p-2" key={prod._id}>
                        <div className="card">
                            <div className="card-header">
                                <h5>Nombre: {prod.nombre}</h5>
                            </div>

                            <div className="card-body">
                                <p>vram: {prod.vram}</p>
                                <p>marca: {prod.marca}</p>
                                <p>precio: {prod.precio} Bs.</p>
                                <strong><p>stock: {prod.stock}</p></strong>
                            </div>

                            <div className="card-footer">
                                <Link className="btn btn-primary" to={'/formIngreso/'+ prod._id}>
                                    Ingresar Stock
                                </Link>
                            </div>
                        </div>
                       
                    </div>
                ))
            }
        </div>
    )
}

export default CrearIngreso
