import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Inventario = () => {

    const [product, setProduct] = useState([])

    useEffect(()=>{
        const getProducts = async()=>{
            const res = await axios.get('http://localhost:4000/api/productos')
            setProduct(res.data)
        }
        getProducts();
    },[product])

    return (
      <div>
        <h2 className="text-center mb-5">INVENTARIO DE PRODUCTOS</h2>

        <div className="">
            <Link className="btn btn-primary" to="/ConsultarIngresos">
                Consultar Ingresos
            </Link>

            <Link className="btn btn-danger ms-2" to="/consultarventas">
                Consultar Ventas
            </Link>
        </div>

        <hr />

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Vram</th>
              <th scope="col">Marca</th>
              <th scope="col">Precio</th>
              <th scope="col">Stock</th>
            </tr>
          </thead>
          <tbody>
            {product.map((prod) => (
              <tr key={prod._id}>
                <th scope="row">{prod.nombre}</th>
                <td>{prod.vram}</td>
                <td>{prod.marca}</td>
                <td>{prod.precio} Bs.</td>
                <td>{prod.stock} Unid.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default Inventario
