const countryName=new URLSearchParams(location.search).get("name");
const flagImage=document.querySelector('.country-detail img');
const cName=document.querySelector('.country-detail h1');
const nativeName=document.querySelector('.native-name ');
const population=document.querySelector('.population ');
const currency=document.querySelector('.currency ');
const region=document.querySelector('.region ');
const subRegion=document.querySelector('.sub-region ');
const capital=document.querySelector('.capital');
const domain=document.querySelector('.domain');
const languages=document.querySelector('.language');
const borderCountries=document.querySelector('.border-countries');

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=>res.json()
.then(([country])=>{
    // console.log(country.borders);
    flagImage.src=country.flags.svg;
    cName.innerText=country.name.common;
    if(country.name.nativeName){
        nativeName.innerText=Object.values(country.name.nativeName)[0].common
    }
    else{
        nativeName.innerText=country.name.common;   
    }
    if(country.currencies){
    currency.innerText=Object.values(country.currencies).map((currency)=>currency.name).join(',');
    }
    if(country.capital){
    capital.innerText=country.capital.join(',');
    }
    if(country.languages){
        languages.innerText=Object.values(country.languages).join(',');
    }
    if(country.subregion){
    subRegion.innerText=country.subregion;


    }
    if(country.borders){
       country.borders.forEach((border)=>{
        console.log(border);
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res)=>res.json())
        .then(([borderCountry])=>{
            console.log(borderCountry);
            const countryTag=document.createElement('a');
            countryTag.innerText=borderCountry.name.common;
            countryTag.href=`country.html?name=${borderCountry.name.common}`;
            console.log(countryTag);
            borderCountries.append(countryTag);

        })
       })
    }
    population.innerText=country.population.toLocaleString('en-IN');
    region.innerText=country.region;
    domain.innerText=country.tld.join(', ');
    

}))

const theme=document.querySelector('.themeChange');
theme.addEventListener('click',(e)=>{
    const isDarkMode=document.body.classList.toggle('dark');
    
    if (isDarkMode) {
        themeIcon.classList.remove('sun-icon');
        themeIcon.classList.add('moon-icon');
    } else {
        themeIcon.classList.remove('moon-icon');
        themeIcon.classList.add('sun-icon');

    }
  
})