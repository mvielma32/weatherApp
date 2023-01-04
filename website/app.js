/* Global Variables */

// weather api 
const geoURL = "https://api.openweathermap.org/data/2.5/weather?";
const key = "28f2c7a1b034cae5a48ba9f6042101a9";
const unit = "imperial";

document.querySelector("#generate").addEventListener('click', generateWeather);

function generateWeather() {
    let newZip = document.querySelector("#zip").value;
    
    //Geo API call
    getWeather(geoURL, newZip, key)
    .then(
        updateUI()
    )
};

//POST Data
async function postData(url = '', data = {}) {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        // credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    try {
        const newZipData = await response.json();
        console.log(newZipData);
        return newZipData;
    } catch (error) {
        console.log('error', error);
    }
}
//GET Request to get Zip lat and lons & POST request to post results
const getWeather = async (geoURL, newZip, key) => {
    const zipRes = await fetch(geoURL + `zip=${newZip},US` + `&appid=${key}` + `&units=${unit}`);
    try {
        const zipData = await zipRes.json();
        let newFeels = document.querySelector("#feelings").value;
        console.log(zipData);
        postData('/addWeather', {temp: zipData.main.temp, date: zipData.dt, userResponse: newZip, feelings: newFeels});
        // return zipData;
    } catch (error) {
        console.log('error', error);
    };
};

// UPDATE UI
const updateUI = async () => {
    const request = await fetch ('/getWeather');
    try{
        const allData = await request.json();
        console.log (allData);
        // Create a new date instance dynamically with JS
        let d = new Date(allData.date * 1000);
        let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();

        document.querySelector("#temp").innerHTML = Math.round(allData.temp)+ '°';
        document.querySelector("#date").innerHTML = newDate;
        document.querySelector("#content").innerHTML = allData.newFeels;
        
    } catch(error) {
        console.log('error', error);
    }
};


