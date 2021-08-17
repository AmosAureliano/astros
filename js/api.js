const api_key = config.NASA_API_KEY;
const body = document.querySelector('body')
const listContainer = document.querySelector('.list'); //container de listagem
const searchButton = document.querySelector('.searchButton'); //botão buscar

//Criar cards
function createCard(id, name, closeApproaach, estimatedDiameter, danger){
    //Utilizando id para garantir que o elemento gerado seja único e evitar problemas
    let card = `
    <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item" >
            <h2 class="accordion-header" id="panelsStayOpen${id}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#panelsStayOpen${id}" aria-controls="panelsStayOpen${id}">
                    <h3 class="card-title">Nome: ${name}</h5>
                </button>
            </h2>
            <div id="panelsStayOpen${id}" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen${id}">
                <div class="accordion-body">
                    <p>Nome: ${name}</p>
                    <p>Data de maior aproximação: ${closeApproaach}</p>
                    <p>Diametro Estimado: ${estimatedDiameter}</p>
                    <p>É perigoso? ${danger ? 'sim' : 'não'}</p>
                </div>
            </div>
        </div>
    </div>
    `
    return card
}

//Requisição por data
function requestAsteroidByData(startDate, endDate){
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${api_key}`)
    .then(response => response.json())
    .then(data => {
    
    var elementsQuantity = data.element_count;
    var objects = data.near_earth_objects;

    for (var item in objects){
        for(var element in objects[item]){
            
            let id = objects[item][element].id;
            let estimatedDiameter = objects[item][element].estimated_diameter.kilometers.estimated_diameter_max;
            let closeApproachDate = objects[item][element].close_approach_data[0].close_approach_date_full;
            let danger = objects[item][element].is_potentially_hazardous_asteroid;
            let nameAsteroid = objects[item][element].name;
            listContainer.innerHTML += createCard(id, nameAsteroid, closeApproachDate, estimatedDiameter, danger );
        }
    }
    }
    )
    .catch(err => console.log(err));    
}

//Fazer Requisitção ao Clicar no botão buscar
searchButton.addEventListener('click', event => {
    event.preventDefault();
    const startDate = document.querySelector('#startDate').value;
    const endDate = document.querySelector('#endDate').value;
    requestAsteroidByData(startDate, endDate);
    
});

