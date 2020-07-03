import React from 'react';
import renderer from 'react-test-renderer';
import {render, cleanup} from '@testing-library/react';
import Weather from "../components/weather";
import { getCentrigrados } from '../components/utilities/utils';
import Main from '../components/main';
afterEach(cleanup);
/*
PRUEBAS: Este archivo tiene realizada todas las posibles pruebas a modo de ejemplo para la demo
  Tipos de pruebas: 
  Pruebas de snapshot para evaluar y verificar cambios de componentes a nivel UI.
  Pruebas unitarias, para evaluar resultados en funciones
  Pruebas usando mocks/fakes functions para emular peticiones ajax
  Pruebas de contenido a nivel arbol de dom, para evaluar si ciertos componentes contiene los datos esperados.
  Al realizar los dos desarrollos frontend en react y nodejs, el testing se realizó solo en este proyecto,
  ya que las pruebas de backend serian similares y en menor cantidad ya que sólo se hacen request en el back.
*/

it('Prueba de contenido Existe un mensaje de bienvenida en la app', () => {
    const { getByText } = render(<Main />);
    const linkElement = getByText(/Bienvenido/i);
    expect(linkElement).toBeInTheDocument();
});

it('Unit Test fx getCentrigrados ', () => {
    //Conversion Kelvin 2 grados centigrados. (sin decimales)
    expect(getCentrigrados(283.15)).toBe("10");
});

//Datos basados de openweatherapi
const tweather = {"coord":{"lon":-58.53,"lat":-34.71},"weather":[{"id":803,"main":"Clouds","description":"nubes rotas","icon":"04d"}],"base":"stations","main":{"temp":284.13,"feels_like":280.54,"temp_min":283.15,"temp_max":284.82,"pressure":1020,"humidity":76},"visibility":10000,"wind":{"speed":4.1,"deg":290},"clouds":{"all":75},"dt":1593711132,"sys":{"type":1,"id":8237,"country":"AR","sunrise":1593687713,"sunset":1593723259},"timezone":-10800,"id":3436426,"name":"Aldo Bonzi","cod":200};

it("Componente Weather: imagen de icono de clima, bien armada",()=>{

  const imgurl = 'http://openweathermap.org/img/wn/' + tweather.weather[0].icon + '@2x.png';
  const {getByTestId} = render(<Weather data={tweather} isLoading={false} ahora="(Clima actual)" ></Weather>)
  expect(getByTestId("icon-weather-img").getAttribute("src")).toBe(imgurl);

});

it("Test Weather component SNAPSHOT Test",()=>{

  //PRIMER SNAPSHOT
  //Componente vacio, esta cargando... sin datos, ERGO muestra una imagen de loading...
  const component1 = renderer.create(
    <Weather data={{}} isLoading={true} ahora="" ></Weather>,
  );
  let tree = component1.toJSON();
  expect(tree).toMatchSnapshot(); //Genera el snapshot / HTML

  //SIGUIENTE SNAPSHOT
  //Componente con datos, en esta instancia el <img loading  > NO se muestra...  
  const component2 = renderer.create(
    <Weather data={tweather} isLoading={false} ahora="(Clima actual)" ></Weather>,
  );

  tree = component2.toJSON();
  expect(tree).toMatchSnapshot(); //Generando segundo snapshot.

})

/*
SIN USO
test('Test Weather component SNAPSHOT Test', () => {
  //Cosas que podriamos hacer con el tree DOM, por ejemplo llamar a una funcion, en nuestro caso este componente no hace nada.
  //Pero podria darse el caso que un evento onMouseEnter cambie el class de un HTML y queremos ver si se impacta.
  
  // manually trigger the callback
  //tree.props.onMouseEnter();
  // re-rendering
  //tree = component.toJSON();
  //expect(tree).toMatchSnapshot();

  // manually trigger the callback
  //tree.props.onMouseLeave();
  // re-rendering
  //tree = component.toJSON();
  //expect(tree).toMatchSnapshot();

});
*/