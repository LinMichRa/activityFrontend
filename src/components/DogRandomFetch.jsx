import { useEffect, useState } from 'react';
import axios from 'axios';

export const RandomDogFetch = () => {
  const [dog, setDog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
          headers: {
            'x-api-key': 'live_YuUfOOsF1FiiI0O076jJ2CnPy47YmqylpBIiZJgjrcomhNErBQ1iTAOk05A3i1Cn'
          }
        });
        const data = response.data;
        const randomDog = data[Math.floor(Math.random() * data.length)];
        setDog(randomDog);
      } catch (error) {
        console.error('Error al consultar los datos de la API: ', error);
      }
    };

    fetchData();
  }, []); // Array de dependencias vacío para que useEffect se ejecute una vez

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-dark'>
      {dog && (
        <div className='col-lg-6 col-md-8 col-sm-10'>
          <div className="card">
            <img src={dog.image.url} alt={dog.name} className="card-img-top" />
            <div className="card-body">
              <h4 className='card-title'>{dog.name}</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Esperanza de vida:</strong> {dog.life_span}</li>
                <li className="list-group-item"><strong>Altura:</strong> {dog.height.metric} cm</li>
                <li className="list-group-item"><strong>Peso:</strong> {dog.weight.metric} kg</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
