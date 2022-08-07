import React from "react"
import moment from "moment-timezone"
import Image from "next/image"

const CurrentWeather = (props: any) => {
	const cityName = props.city.name
	const CountryName = props.city.country
	const maxTemp = props.dailyWeather.temp.max
	const minTemp = props.dailyWeather.temp.min
	const sunRise = moment
		.unix(props.weather.sunrise)
		.tz(props.timezone)
		.format("LT")
	const sunSet = moment
		.unix(props.weather.sunset)
		.tz(props.timezone)
		.format("LT")
	const weatherDescription = props.weather.weather[0].description
	const imageCall = "https://openweathermap.org/img/wn/"
	const currentImg = props.weather.weather[0].icon

	return (
		<div className='current-weather'>
			<div className='current-content'>
				<div className='current-lefy-content'>
					<h1>
						{cityName} {CountryName}
					</h1>

					<h2>
						<span>{maxTemp}&deg;C</span>
						<span>{minTemp}&deg;C</span>
					</h2>

					<div className='current-sun'>
						<div>
							<span>Sunrise</span>
							<span>{sunRise}</span>
						</div>
						<div>
							<span>Sunset</span>
							<span>{sunSet}</span>
						</div>
					</div>
				</div>

				<div className='current-right-content'>
					<div className='current-icon-container'>
						<div>
							<Image
								src={`${imageCall}${currentImg}@2x.png`}
								alt='weather-description'
								layout='fill'
							/>
						</div>
					</div>
					<h3>{weatherDescription}</h3>
				</div>
			</div>
		</div>
	)
}

export default CurrentWeather
