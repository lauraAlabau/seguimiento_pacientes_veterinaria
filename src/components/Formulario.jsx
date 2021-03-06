import { useState, useEffect } from "react"
import Error from "./Error"



const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  //**** Cargar los datos del paciente en los inputs al editar
  useEffect(() => {
    if( Object.keys(paciente).length >0 ) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  //**** Crear un ID para cada paciente
  const generarId = () => {
    const fecha = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2);

    return fecha + random
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enviando Formulario')

    //**** Validar formulario, mostrar error si no se llenaron todos los campos
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true);
      return
    }

    setError(false)

    // Objeto de Paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    }

    if(paciente.id){
  
      //**** Editar el paciente, Actualizar el state de pacientes en el componente padre y Vaciar el state de paciente
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);

      setPacientes(pacientesActualizados);
      setPaciente({});
      
    }else{
      
      //**** Crear nuevo paciente y Actualizar el state de pacientes en el componente padre
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);

    }


    //**** Reiniciar el formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');

  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center mb-10">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10"> A??ade Pacientes y {' '}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error &&
          <Error>
            <p>
              Todos los campos son obligatorios
            </p>
          </Error>
        }

        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
            Nombre mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre mascota"
            className="border-2  p-2 mt-2 w-full placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
            Nombre propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre propietario"
            className="border-2  p-2 mt-2 w-full placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email contacto propietario"
            className="border-2  p-2 mt-2 w-full placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
            Fecha alta
          </label>
          <input
            id="alta"
            type="date"
            className="border-2  p-2 mt-2 w-full text-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="date" className="block text-gray-700 uppercase font-bold">
            S??ntomas
          </label>
          <textarea
            id="date"
            type="date"
            placeholder="Describe los s??ntomas"
            className="border-2  p-2 mt-2 w-full placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente.id ? 'Editar paciente' : 'Agregar paciente'} // Si el paciente tiene un id, es una edici??n
        />
      </form>
    </div>
  )
}

export default Formulario