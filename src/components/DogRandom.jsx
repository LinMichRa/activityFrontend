
import { useEffect, useState } from 'react';
import axios from 'axios';


export const RandomDog = () => {

  const [Dog, setDog] = useState(null);

  useEffect(() => {

    // Definir un función asíncrona para la petición a la API
    const fetchData = async () => {
      try {

        // Realizar la petición a la API
        const response = await axios.get("https://generator.ninja/animals/random-dog-breeds/");

        // Obtener los datos de la petición
        const data = response.data;

        // Formatear los datos a mostrar
        const DogData = {
          bread: data.results[0].breed,
          lifespan: data.results[0].lifespan,
          origin: data.results[0].origin,
          height: data.results[0].location.height,
          weight: data.results[0].location.weight,
        };

        // Actualizar la variable de estado con los datos recibidos de la API pero formateados
        setDog(DogData);

      } catch (error) {
        console.error("Error al consultar los datos de la API: ", error);
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);

  }, []); // Array de depencias vacío para que useEffect se ejecute una vez

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      
        <div className='col-lg-4'>
          <div className="card text-center">
            <div className='card-header'>
              <img src={Dog?.picture} alt="" />
            </div>
            <div className="card-body">
              <h4 className='card-title'>{Dog?.breed}</h4>
              <h4 className='card-title'>{Dog?.lifespan}</h4>
              <p className="card-text">{Dog?.origin}</p>
            </div>
          </div>
        </div>

    </div>
  )
}
