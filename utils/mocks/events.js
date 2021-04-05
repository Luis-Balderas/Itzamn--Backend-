const EventsMock = [ 
    {
      "_id":{"$oid":"5f481a1558f7f74114eeadca"},
      "images":["https://cdn.colombia.com/images/turismo/ferias-y-fiestas/carnaval-negros-blancos/historiacnb.jpg"],
      "name":"Carnaval de Negros y Blancos",
      "description":"Esta fiesta de juego, fantasía y magia, poco a poco fue tomando forma y ahora todo comienza con la ofrenda y consagración a la Virgen de las Mercedes y el carnavalito liderado en su totalidad por niños de la región, quienes salen en desfile a mostrar sus hazañas creativas y lúdicas.",
      "location":"Pasto, Nariño"
    },
    {
      "images":["http://dummyimage.com/800x600.png/99118E/ffffff"],
      "name": "Cochinita Pipil",
      "description": 'La cochinita pibil está compuesta por trozos de carne de cerdo que se asan u hornean envueltas en hoja de plátano, luego de marinarse toda una noche con achiote, jugo de naranja agria o limón, sal, ajo y pimienta gruesa. Se cuece hasta que la carne quede tan blanda que se pueda desmenuzar fácilmente.',
    },   
    {
      "_id":{"$oid":"5f3ad3ff3fc3d92d3cb9c08e"},
      "images":["https://www.colombia.co/wp-content/uploads/2020/06/Festival-Virtual-214x300.jpeg"],
      "name":"Festival de la Ruana y el Pañolón, la Almojábana y el Amasijo",
      "description":"Festival de la Ruana y el Pañolón, la Almojábana y el Amasijo, en homenaje a la tradición Paipana del 12 al 15 de junio de manera virtual debido a la Emergencia Económica, Social y Ecológica que vive nuestro país.",
      "location":"Paipa, Boyaca"
    },
]
    
    function filteredEventsMock(tag) {
      return EventsMock.filter(event => event.tags.includes(tag));
    }
    
    class EventsServiceMock {
      async getEvents() {
        return Promise.resolve(EventsMock)
      }
    
      async createEvent() {
        return Promise.resolve(EventsMock);
      }
    }
    
    module.exports = {
        EventsMock,
        filteredEventsMock,
        EventsServiceMock 
    }

    