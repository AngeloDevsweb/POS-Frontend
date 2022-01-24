import React, { useEffect, useState } from 'react' 
import axios from 'axios'
import { useParams } from 'react-router'
import { toast } from 'react-toastify';

const FormIngreso = () => {

    const valorInicial = {
        nombre: '',
        vram:'',
        marca:'',
        precio:0,
        fecha: '',
        stock:0
    }

    const valorStock = {
        nuevoStock : 0
    }

    let {id} = useParams();

    const [producto, setProducto] = useState(valorInicial)
    const [subId, setSubId] = useState(id)
    const [valor, setValor] = useState(valorStock)

    const capturarNuevo = (e)=>{
        const {name, value} = e.target;
        setValor({[name]:value})
    }

    const capturarInputs = (e)=>{
        const {name, value} = e.target;
        setProducto({...producto, [name]:value})
    }
    // funcion para guardar todo 
    const guardarTodo = async(e)=>{
        e.preventDefault();
        
        const newIngreso = {
            nombre: producto.nombre,
            vram: producto.vram,
            marca: producto.marca,
            fecha: producto.fecha,
            stock: valor.nuevoStock
        }
        await axios.post('http://localhost:4000/api/ingresos', newIngreso)

        const sumaStock = parseInt(producto.stock) + parseInt(valor.nuevoStock);

        // console.log(sumaStock);

        // crear la funcion para actualizar el stock automaticamente
        const actualizarStock = {
            nombre: producto.nombre,
            vram: producto.vram,
            marca: producto.marca,
            precio: producto.precio,
            stock: sumaStock
        }
        await axios.put('http://localhost:4000/api/productos/' + subId, actualizarStock)
        
        setProducto({...valorInicial})
        setSubId('')
        setValor({...valorStock})

        // logica del toast
        toast.info('Ingreso realizado con Exito', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

    }

    const obtUno = async (valorId)=>{
        const res = await axios.get('http://localhost:4000/api/productos/'+ valorId)
        setProducto({
            nombre: res.data.nombre,
            vram: res.data.vram,
            marca: res.data.marca,
            precio:res.data.precio,
            stock: res.data.stock
        })
    }

    useEffect(()=>{
        if(subId !== ''){
            obtUno(subId)
        }
    },[subId])

    return (
        <div className="col-md-6 offset-md-3">
            <h2 className="text-center mb-3">INGRESAR NUEVO STOCK</h2>
        <div className="card card-body">
          <form onSubmit={guardarTodo}>
            <div className="form-group m-2">
              <label className="form-label">Nombre:</label>
              <input
                type="text"
                className="form-control"
                placeholder="nombre del producto"
                value={producto.nombre}
                onChange={capturarInputs}
                name="nombre"
                aria-label="Disabled input example" disabled
                required
              />
            </div>

            <div className="form-group m-2">
              <label className="form-label">Vram:</label>
              <input
                type="text"
                className="form-control"
                placeholder="vram"
                onChange={capturarInputs}
                name="vram"
                value={producto.vram}
                aria-label="Disabled input example" disabled
                required
              />
            </div>

            <div className="form-group m-2">
              <label className="form-label">Marca:</label>
              <input
                type="text"
                className="form-control"
                placeholder="ingresar nombre de la marca"
                onChange={capturarInputs}
                name="marca"
                value={producto.marca}
                aria-label="Disabled input example" disabled
                required
              />
            </div>

            <div className="form-group m-2">
              <label className="form-label">Precio:</label>
              <input
                type="number"
                className="form-control"
                placeholder="ingresar el precio"
                onChange={capturarInputs}
                name="precio"
                value={producto.precio}
                aria-label="Disabled input example" disabled
                required
              />
            </div>

            <div className="form-group m-2">
              <label className="form-label">Stock:</label>
              <input
                type="number"
                className="form-control"
                placeholder="stock"
                onChange={capturarInputs}
                name="stock"
                value={producto.stock}
                aria-label="Disabled input example" disabled
                required
              />
            </div>

            <div className="form-group m-2">
              <label className="form-label">Fecha:</label>
              <input
                type="text"
                className="form-control"
                placeholder="ingresar la fecha de Ingreso"
                onChange={capturarInputs}
                name="fecha"
                value={producto.fecha}
                required
              />
            </div>

            <div className="form-group m-2">
                <label className="form-label">Ingresar nuevo Stock: </label>
                <input type="number" required className="form-control" name="nuevoStock" 
                value={valor.nuevoStock} onChange={capturarNuevo} />
            </div>
            

            <button className="btn btn-primary form-control">Guardar</button>
          </form>
          
        </div>
        </div>
    )
}

export default FormIngreso
