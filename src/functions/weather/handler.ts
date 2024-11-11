import axios from 'axios';
import { clientErrorResponse, serverErrorResponse, successResponse } from '@libs/api-gateway';


const weather = async (event) => {
  const city = event.queryStringParameters?.city;

  if (!city) {
    return clientErrorResponse({ message: "Enter the city" });
  }

  const cityFormat = /^[a-zA-Z\s-]+$/;
  if (!cityFormat.test(city)) {
    return clientErrorResponse({ message: "Entered city format is invalid" });
  }

  const APIkey = "867782e371a229531b0bad2789d49d75";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;

  try {
    const data = await axios.get(url, {params: {q:city, appid:APIkey, units:"metric"},
    });
    return successResponse(data.data);
  } 

  catch (error) {
      console.error("Error fetching weather data:", error);
      return serverErrorResponse({ message: "Failed to fetch weather data" });
  }
};


export const main = weather;
