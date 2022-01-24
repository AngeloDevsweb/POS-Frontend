import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify';

const FormPos = () => {
    
    const valorInicial = {
        nombre: '',
        vram:'',
        marca:'',
        precio:0,
        stock:0,
        cantidad:0
    }

    // const montoInicial = {
    //     montoInic : 0
    // }

    let {id} = useParams();
    // variables de estado
    const [producto, setProducto] = useState(valorInicial)
    const [subId, setSubId] = useState(id)
    const [monto, setMonto] = useState(0)
    // fin varibles de estado

    const capturarInputs = (e)=>{
        const {name, value} = e.target;
        setProducto({...producto, [name]:value})
    }


    // toda esta seccion es para hacer una sola peticion get para un solo documento y mostrarlo en nuestro formulario

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

    //final de la seccion

    // seccion en la que hacemos la logica para almacenar todo en nuestra api
    const almacenarDatos = async(e)=>{
        e.preventDefault();

        // funcion para almacenar post api POS
        const newPos = {
            nombre: producto.nombre,
            vram: producto.vram,
            marca: producto.marca,
            precio:producto.precio,
            cantidad: producto.cantidad,
            montoTotal: monto
        }

        await axios.post('http://localhost:4000/api/pos', newPos)

        // fin del almacenamiento

        const nuevoStock = parseInt(producto.stock) - parseInt(producto.cantidad);

        // la funcion para actualizar el stock
        const updateProducto = {
            nombre: producto.nombre,
            vram: producto.vram,
            marca: producto.marca,
            precio: producto.precio,
            stock: nuevoStock
        }
        await axios.put('http://localhost:4000/api/productos/'+ subId, updateProducto)
        setProducto({...valorInicial})
        setSubId('')
        setMonto(0)

        // logica del toast
        toast.success('Venta con Exito', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
    }

    const alClick = ()=>{
        const montoTotal = parseInt(producto.precio) * parseInt(producto.cantidad);
        setMonto(montoTotal);
    }

    return (
        <div className="col-md-6 offset-md-3">
            <h2 className="text-center mb-3">REALIZAR VENTA</h2>
        <div className="card card-body">
          <form onSubmit={almacenarDatos}>
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
                placeholder="nombre de la marca"
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
                placeholder="precio del producto"
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
                <label className="form-label">Ingresar cantidad: </label>
                <input type="number" required className="form-control" name="cantidad"
                value={producto.cantidad} onChange={capturarInputs} onClick={alClick} />
                
            </div>

            <div className="form-group m-2">
                <label className="form-label">Monto Total: </label>
                <input type="number" required className="form-control" name="montoInic"
                value={monto}  />
                
            </div>
            

            <button className="btn btn-primary form-control mt-3">Confirmar</button>
          </form>
          
        </div>
        </div>
    )
}

export default FormPos
