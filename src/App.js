
function App() {
  return (
    <div className="container mt-5">
      <h3 className='text-center'>VETERINARIA</h3>
      <hr/>
      <div className='text-center'>
      <button className='btn btn-primary btn-lg rounded-pill'>Nuevo paciente <i class="fas fa-plus-circle"></i></button>
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
    <tr>
      <th>michi</th>
      <td>gato</td>
      <td>Otto</td>
      <td>10-08-1997</td>
      <td>juan acevedo</td>
      <td>321321234</td>
      <td>cll 88 n 45 a 87</td>
      <td>jua@gmail.com</td>
      <td><button className='btn btn-warning rounded-circle '><i className="far fa-edit"></i></button><button className='btn btn-danger rounded-circle '><i className="fas fa-trash-alt"></i></button> </td>
    </tr>
    <tr>
      <th>michi</th>
      <td>gato</td>
      <td>Otto</td>
      <td>10-08-1997</td>
      <td>juan acevedo</td>
      <td>321321234</td>
      <td>cll 88 n 45 a 87</td>
      <td>jua@gmail.com</td>
      <td><button className='btn btn-warning rounded-circle '><i className="far fa-edit"></i></button><button className='btn btn-danger rounded-circle '><i className="fas fa-trash-alt"></i></button> </td>
    </tr>
  </tbody>
</table>
    </div>
  );
}

export default App;
