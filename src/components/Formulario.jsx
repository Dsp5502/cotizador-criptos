import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/monedas';

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Formulario = () => {
  const [criptos, setCriptos] = useState([]);
  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas);
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas(
    'Elige tu Criptomoneda',
    criptos
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resp = await fetch(url);
      const { Data } = await resp.json();
      const arrayCriptos = Data.map(({ CoinInfo }) => {
        const objeto = {
          id: CoinInfo.Name,
          nombre: CoinInfo.FullName,
        };
        return objeto;
      });
      setCriptos(arrayCriptos);
    };
    consultarAPI();
  }, []);

  return (
    <form>
      <SelectMonedas />
      <SelectCriptomoneda />

      <InputSubmit type='submit' value='Cotizar' />
    </form>
  );
};

export default Formulario;
