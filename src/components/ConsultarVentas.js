import React, {useState, useEffect} from 'react'
import axios from 'axios'

const ConsultarVentas = () => {

    const [product, setProduct] = useState([])

    useEffect(()=>{
        const getProducts = async()=>{
            const res = await axios.get('http://localhost:4000/api/pos')
            setProduct(res.data)
        }
        getProducts();
    },[product])

    return (
      <div>
        <h2 className="text-center mb-5">VENTAS</h2>

        <hr />

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Vram</th>
              <th scope="col">Marca</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">MontoTotal</th>
            </tr>
          </thead>
          <tbody>
            {product.map((prod) => (
              <tr key={prod._id}>
                <th scope="row">{prod.nombre}</th>
                <td>{prod.vram}</td>
                <td>{prod.marca}</td>
                <td>{prod.precio} Bs.</td>
                <td>{prod.cantidad} Unid.</td>
                <td>{prod.montoTotal} Bs.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default ConsultarVentas
