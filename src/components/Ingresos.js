import React, {useEffect,useState} from 'react'
import axios from 'axios'


const Ingresos = () => {
    const [product, setProduct] = useState([])

    useEffect(()=>{
        const getProducts = async()=>{
            const res = await axios.get('http://localhost:4000/api/ingresos')
            setProduct(res.data)
        }
        getProducts();
    },[product])
    return (
        <div>
            <h2 className="text-center mb-5">INGRESO DE PRODUCTOS</h2>
            <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Vram</th>
              <th scope="col">Marca</th>
              <th scope="col">Fecha</th>
              <th scope="col">Stock</th>
            </tr>
          </thead>
          <tbody>
            {product.map((prod) => (
              <tr key={prod._id}>
                <th scope="row">{prod.nombre}</th>
                <td>{prod.vram}</td>
                <td>{prod.marca}</td>
                <td>{prod.fecha}</td>
                <td>{prod.stock} Unid.</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    )
}

export default Ingresos
