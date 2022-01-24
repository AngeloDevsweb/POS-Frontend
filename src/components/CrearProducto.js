import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const CrearProducto = () => {

    const valoresIniciales = {
        nombre: '',
        vram:'',
        marca: '',
        precio:0,
        stock:0
    }

    // varibles de estado
    const [producto, setProducto] = useState(valoresIniciales)

    const onChangeF = (e)=>{
        const {name, value} = e.target
        setProducto({...producto, [name]: value})
    }

    const guardarDatos = async(e)=>{
        e.preventDefault();
        const newProducto = {
            nombre: producto.nombre,
            vram: producto.vram,
            marca:producto.marca,
            precio: producto.precio,
            stock: producto.stock
        }

        await axios.post('http://localhost:4000/api/productos', newProducto)

        setProducto({...valoresIniciales})
        // esta logica es del modulo de alertas de react
        toast.success(' Producto creado con Exito', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

    }

    return (
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center mb-3">CREAR PRODUCTO</h2>
        <div className="card card-body">
          <form onSubmit={guardarDatos}>
            <div className="form-group m-2">
              <label className="form-label">Nombre:</label>
              <input
                type="text"
                className="form-control"
                placeholder="ingresar nombre del producto"
                value={producto.nombre}
                onChange={onChangeF}
                name="nombre"
                required
              />
            </div>

            <div className="form-group m-2">
              <label className="form-label">Vram:</label>
              <input
                type="text"
                className="form-control"
                placeholder="vram"
                onChange={onChangeF}
                name="vram"
                value={producto.vram}
                required
              />
            </div>

            <div className="form-group m-2">
              <label className="form-label">Marca:</label>
              <input
                type="text"
                className="form-control"
                placeholder="ingresar nombre de la marca"
                onChange={onChangeF}
                name="marca"
                value={producto.marca}
                required
              />
            </div>

            <div className="form-group m-2">
              <label className="form-label">Precio:</label>
              <input
                type="number"
                className="form-control"
                placeholder="ingresar el precio"
                onChange={onChangeF}
                name="precio"
                value={producto.precio}
                required
              />
            </div>

            <div className="form-group m-2">
              <label className="form-label">Stock:</label>
              <input
                type="number"
                className="form-control"
                placeholder="ingresar el stock"
                onChange={onChangeF}
                name="stock"
                value={producto.stock}
                required
              />
            </div>

            <button className="btn btn-primary form-control">Guardar</button>
          </form>
          
        </div>
      </div>
    );
}

export default CrearProducto
