import React, {useState, useEffect} from 'react'
import {getCollection, addDocument, updateDocument, deleteDocument} from './actions'


function App() {

const [pet, setPet] = useState({
  petName:'',
  petType:'',
  petRace:'',
  petDateBirth:'',
  ownerFullName:'',
  ownerPhone:0,
  ownerAddress:'',
  ownerEmail:''
})

const [pets, setPets] = useState([])
const [id, setId] = useState('')
const [error, setError] = useState(null)


const handleInputChange = (event) => {
  setPet(({
    ...pet,
    [event.target.name] : event.target.value
   }))
}

const enviarDatos = (event) => {
  event.preventDefault()
  setPets([...pets, {id:1, petName:pet.petName, petType:pet.petType, petRace:pet.petRace, petDateBirth:pet.petDateBirth, ownerFullName:pet.ownerFullName, ownerPhone:pet.ownerPhone, ownerAddress:pet.ownerAddress, ownerEmail:pet.ownerEmail}])
  setPet({
    petName:'',
    petType:'',
    petRace:'',
    petDateBirth:'',
    ownerFullName:'',
    ownerPhone:0,
    ownerAddress:'',
    ownerEmail:''
  })
}

const resetInput = () =>{
  setPet({
    petName:'',
    petType:'',
    petRace:'',
    petDateBirth:'',
    ownerFullName:'',
    ownerPhone:0,
    ownerAddress:'',
    ownerEmail:''
  })
}

useEffect(() => {
  (async () => {
    const result = await getCollection('pets')
    if(result.statusResponse){
      setPets(result.data)
    }
  })()
}, [])

  return (
    <div className="container mt-5">
      <h3 className='text-center'><i className="fas fa-paw"></i> VETERINARIA</h3>
      <hr/>
      <div className='text-center'>

      <button type='button' className='btn btn-primary btn-lg rounded-pill' data-bs-toggle="modal" data-bs-target="#newPatient">Nuevo paciente <i className="fas fa-plus-circle"></i></button>
        
        <div className="modal fade" id="newPatient" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Nuevo paciente</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">


                <form onSubmit={enviarDatos}>

                  <div className="row">
                    <div className='col-6 mb-3'>
                      <label  className='form-label'><i className="far fa-address-book"></i> Nombre de la  mascota</label>
                      <input type="text" className="form-control"onChange={handleInputChange} name='petName' placeholder="Ingrese nombre mascota" value={pet.petName} required />
                    </div>
                      
                    <div className='col-6 mb-3'>
                      <label className='form-label'><i className="far fa-address-book"></i> Tipo de mascota</label>
                      <input type="text" className="form-control" onChange={handleInputChange} name='petType' placeholder="Ingrese el tipo de mascota"value={pet.petType} required />
                    </div>

                    <div className='col-6 mb-3'>
                      <label  className='form-label'><i className="fas fa-bullseye"></i> Raza</label>
                      <input type="text" className="form-control"onChange={handleInputChange} name='petRace' placeholder="Ingrese la raza" value={pet.petRace} required />
                    </div>
                      
                    <div className='col-6 mb-3'>
                      <label className='form-label'><i className="far fa-calendar-alt"></i> Fecha de nacimiento</label>
                      <input type="date" className="form-control" onChange={handleInputChange} name='petDateBirth' placeholder="Ingrese la fecha de nacimiento de la mascota" value={pet.petDateBirth} required />
                    </div>

                    <div className='col-6 mb-3'>
                      <label  className='form-label'>Nombre y apellido propietario</label>
                      <input type="text" className="form-control"onChange={handleInputChange} name='ownerFullName' placeholder="Ingrese nombre completo" value={pet.ownerFullName} required />
                    </div>
                      
                    <div className='col-6 mb-3'>
                      <label className='form-label'><i className="fas fa-phone"></i> Telefono del propietario</label>
                      <input type="number" className="form-control" name='ownerPhone' onChange={handleInputChange} placeholder="Ingrese su telefono" value={pet.ownerPhone} required />
                    </div>

                    <div className='col-6 mb-3'>
                      <label  className='form-label'><i className="fas fa-map-marked-alt"></i> Direccion del propietario</label>
                      <input type="text" className="form-control" name='ownerAddress' onChange={handleInputChange} placeholder="Ingrese su direccion" value={pet.ownerAddress} required />
                    </div>
                      
                    <div className='col-6 mb-3'>
                      <label className='form-label'><i className="fas fa-envelope"></i> Email del propietario</label>
                      <input type="email" className="form-control" name='ownerEmail' onChange={handleInputChange} placeholder="Ingrese un email" value={pet.ownerEmail} required />
                    </div>
                </div>
                  

                  <div className="modal-footer mt-3">
                    <button type="button" className="btn btn-danger rounded-circle" onClick={resetInput} data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" className="btn btn-success rounded-circle" >Guardar</button>
                  </div>


                </form>

              </div>
            </div>
          </div>
        </div>

      </div>
      <hr/>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">Nombre mascota</th>
      <th scope="col">Tipo mascota</th>
      <th scope="col">Raza</th>
      <th scope="col">Fecha de nacimiento de la mascota </th>
      <th scope="col">Nombre y apellido propietario</th>
      <th scope="col">Telefono propietario </th>
      <th scope="col">Direccion Propietario </th>
      <th scope="col">Email propietario </th>
      <th scope="col">Acciones </th>
    </tr>
  </thead>
  <tbody>

    {
      pets.map((pet)=>(

    <tr key={pet.id}>
      <td>{pet.petName}</td>
      <td>{pet.petType}</td>
      <td>{pet.petRace}</td>
      <td>{pet.petDateBirth}</td>
      <td>{pet.ownerFullName}</td>
      <td>{pet.ownerPhone}</td>
      <td>{pet.ownerAddress}</td>
      <td>{pet.ownerEmail}</td>
      <td><button data-bs-toggle="modal" data-bs-target="#updatePatient" className='btn btn-primary rounded-circle'> <i className="far fa-edit"></i></button><button className='btn btn-danger rounded-circle' data-bs-toggle="modal" data-bs-target="#deletePatient"><i className="fas fa-trash-alt"></i></button> </td>
    </tr>
        
      ))
    }
   
  </tbody>
</table>
<div className="modal fade" id="updatePatient" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Actualizar paciente</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger rounded-circle" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-success rounded-circle">Guardar</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="deletePatient" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Eliminar paciente</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                ¿Esta seguro que desea eliminar este paciente?
              </div>
              <div className="text-center mb-3">
                <button type="button" className="btn btn-success mx-2" >Si</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    
  );
}

export default App;
