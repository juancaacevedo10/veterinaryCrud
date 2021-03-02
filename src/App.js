import React, { useState, useEffect } from 'react'
import { getCollection, addDocument, updateDocument, deleteDocument } from './actions'
import { Modal, Button } from 'react-bootstrap'

function App() {

  const [pet, setPet] = useState({
    petName: '',
    petType: '',
    petRace: '',
    petDateBirth: '',
    ownerFullName: '',
    ownerPhone: 0,
    ownerAddress: '',
    ownerEmail: ''
  })

  const [pets, setPets] = useState([])
  const [id, setId] = useState('')
  const [error, setError] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [show, setShow] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false)


  const handleClose = () => {
    setShow(false)
    setEditMode(false)
    resetInput()
    setConfirmDelete(false)
    setId('')


  };
  const handleShow = () => setShow(true);


  useEffect(() => {
    (async () => {
      const result = await getCollection('pets')
      if (result.statusResponse) {
        setPets(result.data)
      }
    })()
  }, [])


  const handleInputChange = (event) => {
    setPet(({
      ...pet,
      [event.target.name]: event.target.value
    }))
  }

  const addPets = async (event) => {
    event.preventDefault()
    setShow(false)

    const result = await addDocument('pets', { petName: pet.petName, petType: pet.petType, petRace: pet.petRace, petDateBirth: pet.petDateBirth, ownerFullName: pet.ownerFullName, ownerPhone: pet.ownerPhone, ownerAddress: pet.ownerAddress, ownerEmail: pet.ownerEmail })
    if (!result.statusResponse) {
      setError(result.error)
      return
    }

    setPets([...pets, { id: result.data.id, petName: pet.petName, petType: pet.petType, petRace: pet.petRace, petDateBirth: pet.petDateBirth, ownerFullName: pet.ownerFullName, ownerPhone: pet.ownerPhone, ownerAddress: pet.ownerAddress, ownerEmail: pet.ownerEmail }])
    handleClose()
  }

  const savePets = async (e) => {
    e.preventDefault()

    const result = await updateDocument('pets', id, { petName: pet.petName, petType: pet.petType, petRace: pet.petRace, petDateBirth: pet.petDateBirth, ownerFullName: pet.ownerFullName, ownerPhone: pet.ownerPhone, ownerAddress: pet.ownerAddress, ownerEmail: pet.ownerEmail })
    if (!result.statusResponse) {
      setError(result.error)
      return
    }

    const editedPets = pets.map(item => item.id === id ? { id, petName: pet.petName, petType: pet.petType, petRace: pet.petRace, petDateBirth: pet.petDateBirth, ownerFullName: pet.ownerFullName, ownerPhone: pet.ownerPhone, ownerAddress: pet.ownerAddress, ownerEmail: pet.ownerEmail } : item)
    setPets(editedPets)
    setEditMode(false)
    handleClose()
    setId('')
  }



  const resetInput = () => {
    setPet({
      petName: '',
      petType: '',
      petRace: '',
      petDateBirth: '',
      ownerFullName: '',
      ownerPhone: 0,
      ownerAddress: '',
      ownerEmail: ''
    })
  }

  const editePet = (thePet) => {
    handleShow()
    setPet({ petName: thePet.petName, petType: thePet.petType, petRace: thePet.petRace, petDateBirth: thePet.petDateBirth, ownerFullName: thePet.ownerFullName, ownerPhone: thePet.ownerPhone, ownerAddress: thePet.ownerAddress, ownerEmail: thePet.ownerEmail })
    setEditMode(true)
    setId(thePet.id)
  }

  const confirmDeletePet = (theId) => {
    setId(theId)
    handleShow()
    setConfirmDelete(true)
  }

  const deletePets = async () => {
    const result = await deleteDocument('pets', id)
    if (!result.statusResponse) {
      console.log(result.error)
      setError(result.error)
      return
    }
    const filteredPets = pets.filter(pet => pet.id !== id)
    setPets(filteredPets)
    handleClose()
    setId('')

  }


  return (
    <div className="container mt-5">
      <h3 className='text-center'><i className="fas fa-paw"></i> VETERINARIA</h3>
      <hr />
      <div className='text-center'>

        <Button variant="primary" className='btn-lg rounded-pill' onClick={handleShow}>
          Nuevo paciente <i className="fas fa-plus-circle"></i>
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{confirmDelete ? 'Eliminar paciente' : editMode ? 'Actualizar paciente' : 'Nuevo paciente'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={confirmDelete ? deletePets : editMode ? savePets : addPets}>
            {
              error && <span className='text-danger mb-2'>{error}</span>
            }



              {
                confirmDelete ? (
                  <div>
                    ¿Estas seguro que deseas eliminar este paciente?
                    <div className="modal-footer mt-3">
                      <button type="button" className="btn btn-danger rounded-circle" onClick={handleClose} data-bs-dismiss="modal">No</button>
                      <button type="button" className="btn btn-success rounded-circle" onClick={() => deletePets()} >Si</button>
                    </div>
                  </div>
                ) : (

                    <div className="row">

                      <div className='col-6 mb-3'>
                        <label className='form-label'><i className="far fa-address-book"></i> Nombre de la  mascota</label>
                        <input type="text" className="form-control" onChange={handleInputChange} name='petName' placeholder="Ingrese nombre mascota" value={pet.petName} required />
                      </div>

                      <div className='col-6 mb-3'>
                        <label className='form-label'><i className="far fa-address-book"></i> Tipo de mascota</label>
                        <input type="text" className="form-control" onChange={handleInputChange} name='petType' placeholder="Ingrese el tipo de mascota" value={pet.petType} required />
                      </div>

                      <div className='col-6 mb-3'>
                        <label className='form-label'><i className="fas fa-bullseye"></i> Raza</label>
                        <input type="text" className="form-control" onChange={handleInputChange} name='petRace' placeholder="Ingrese la raza" value={pet.petRace} required />
                      </div>

                      <div className='col-6 mb-3'>
                        <label className='form-label'><i className="far fa-calendar-alt"></i> Fecha de nacimiento</label>
                        <input type="date" className="form-control" onChange={handleInputChange} name='petDateBirth' placeholder="Ingrese la fecha de nacimiento de la mascota" value={pet.petDateBirth} required />
                      </div>

                      <div className='col-6 mb-3'>
                        <label className='form-label'>Nombre y apellido propietario</label>
                        <input type="text" className="form-control" onChange={handleInputChange} name='ownerFullName' placeholder="Ingrese nombre completo" value={pet.ownerFullName} required />
                      </div>

                      <div className='col-6 mb-3'>
                        <label className='form-label'><i className="fas fa-phone"></i> Telefono del propietario</label>
                        <input type="number" className="form-control" name='ownerPhone' onChange={handleInputChange} placeholder="Ingrese su telefono" value={pet.ownerPhone} required />
                      </div>

                      <div className='col-6 mb-3'>
                        <label className='form-label'><i className="fas fa-map-marked-alt"></i> Direccion del propietario</label>
                        <input type="text" className="form-control" name='ownerAddress' onChange={handleInputChange} placeholder="Ingrese su direccion" value={pet.ownerAddress} required />
                      </div>

                      <div className='col-6 mb-3'>
                        <label className='form-label'><i className="fas fa-envelope"></i> Email del propietario</label>
                        <input type="email" className="form-control" name='ownerEmail' onChange={handleInputChange} placeholder="Ingrese un email" value={pet.ownerEmail} required />
                      </div>

                      <div className="modal-footer mt-3">
                        <button type="button" className="btn btn-danger rounded-circle" onClick={handleClose} data-bs-dismiss="modal">Cerrar'</button>
                        <button type="submit" className="btn btn-success rounded-circle" >Guardar</button>
                      </div>

                    </div>


                  )
              }


            </form>
          </Modal.Body>
        </Modal>

      </div>
      <hr />

      {
        pets.length === 0 ? (
          <div className='text-center'>
            No hay datos registrados
          </div>

        ) : (

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
              pets.map((pet) => (
  
                <tr key={pet.id}>
                  <td>{pet.petName}</td>
                  <td>{pet.petType}</td>
                  <td>{pet.petRace}</td>
                  <td>{pet.petDateBirth}</td>
                  <td>{pet.ownerFullName}</td>
                  <td>{pet.ownerPhone}</td>
                  <td>{pet.ownerAddress}</td>
                  <td>{pet.ownerEmail}</td>
                  <td>
                    <Button variant="primary" className=' rounded-circle' onClick={() => editePet(pet)}>
                      <i className="far fa-edit"></i>
                    </Button>
  
                    <Button variant="danger" className=' rounded-circle' onClick={() => confirmDeletePet(pet.id)}>
                      <i className="fas fa-trash-alt"></i>
                    </Button>
  
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        )

      }

    </div>

  );
}

export default App;
