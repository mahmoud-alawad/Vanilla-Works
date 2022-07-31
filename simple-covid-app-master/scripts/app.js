let input = document.querySelector('.input');
const form = document.querySelector('#form');
const outPut = document.querySelector('.output');
const suraData = document.querySelector('.data');
const formBtn = document.querySelector('.form-btn');

 async function getData(){
    let inputVal = input.value.toLowerCase();

    let URI = `https://api.covid19api.com/total/country/${inputVal}`;

    await fetch(URI)
    .then(response =>{
        return  response.json();
    })
    .then(data => {
        
        let countries = data[459];
          //  console.log(obj);
          
          outPut.innerHTML += `
            
<div class="container">
<table style="width:100%">
  <tr>
    <th>Country</th>
    <th colspan="2">${countries.Country} <span class="w-30 text-dark">${countries.Date.replace("T00:00:00Z", "")}</span></th>
  </tr>
  <tr>
    <td>Deaths</td>
    <td class="text-danger">${countries.Deaths}</td>
    </tr>

    <tr>    
    <td>Cases</td>
    <td class="text-info">${countries.Confirmed}</td>
  </tr>

    <tr>    
    <td>Recovered</td>
    <td class="text-success">${countries.Recovered}</td>
  </tr>
</table>
</div>
            `;
            
       // console.log(countries);
    })
}
getData();
form.addEventListener('submit', (e)=>{
    e.preventDefault();
  //  getData();
    window.location.reload();

})

//formBtn.addEventListener('click', getData)    

let furniture = ['Table', 'Chairs','Couch'];

furniture.forEach(function (word) {
  console.log(word.charAt(0));
})