// ! Search
let search =document.getElementById('search');

// ? today
let todayDate=document.getElementById('todayDate');
let dateDay=document.getElementById('date-Day');
let datenumber=document.getElementById('date-number');
let month = document.getElementById('month');
let todaylocation=document.getElementById('today-location');
let today=document.getElementById('today');
let todaytem=document.getElementById('today-tem');
let todyConditionText= document.getElementById('tody-condition-text');
let humidity =document.getElementById('humidity');
let wind = document.getElementById('wind');
let windDirection= document.getElementById('wind-direction');
let getImg= document.getElementById('getImg')


//  ! Next Day

let nextMaxTemp =document.getElementsByClassName('next-max-temp');
let nextDayName =document.getElementById('next-day-name');
let nextMinTemp =document.getElementsByClassName('next-min-temp');
let nextConditionText = document.getElementsByClassName('next-condition-text');
let nextConditionImg= document.getElementsByClassName('next-condition-img');

let array =[];

async function getDataApi(cityName){
    let getData = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=5c3a2b7b9a8742d4be3114056231208&q=${cityName}07112&days=7`);
    let resopnse =await getData.json()
    return resopnse;
}




// ! function first day
function displayData(data){
    let dayDate =new Date();
    dateDay.innerHTML = dayDate.toLocaleDateString('en-us',{weekday:'long'})
    datenumber.innerHTML=dayDate.getDate();
    month.innerHTML =dayDate.toLocaleDateString('en-us',{month:'long'})
    todaylocation.innerHTML=data.location.name;
    todaytem.innerHTML=data.current.temp_c;
    getImg.setAttribute('src', data.current.condition.icon);
    todyConditionText.innerHTML= data.current.condition.text;
    humidity.innerHTML= data.current.humidity+" %";
    wind.innerHTML =data.current.wind_kph+" km/h";
    windDirection.innerHTML= data.current.wind_dir;
}

// ! Function sec day
function secDay(data){
    let forCastData= data.forecast.forecastday;
    for(let i = 0 ; i < 2; i++){
        let nextDate =new Date(forCastData[i+1].date);
        nextDayName.innerHTML =nextDate.toLocaleDateString('en-us',{weekday:'long'})
        nextDayName.innerHTML
        nextMaxTemp[i].innerHTML =forCastData[i+1].day.maxtemp_c;
        nextMinTemp[i].innerHTML= forCastData[i+1].day.mintemp_c;
        nextConditionImg[i].setAttribute("src",forCastData[i+1].day.condition.icon);
        nextConditionText[i].innerHTML=forCastData[i+1].day.condition.text;
    }
}


// ! function calling
async function callData(city="cairo"){
    let resopnse = await getDataApi(city)
    if(!resopnse.error){
        displayData(resopnse); //this functoin will show data;
        secDay(resopnse)
    }
    
}
callData()

search.addEventListener('input',function(){
    callData(search.value)
})