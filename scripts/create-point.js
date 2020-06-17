
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res =>  res.json() )
    .then( ufs => {

        for(const uf of ufs ){
            ufSelect.innerHTML += `<option value = "${uf.id}">${uf.nome}</option>`

        }
 
    })
}
populateUFs()


function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")


    const ufValue = event.target.value

    
    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then( res =>  res.json() )
    .then( cities => {

        for(const city of cities ){
            citySelect.innerHTML += `<option value = "${city.id}">${city.nome}</option>`

        }

        citySelect.disabled = false 
    })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)