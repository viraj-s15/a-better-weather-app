import React from "react"
import moment from "moment-timezone"
import Image from "next/image"

const HourlyWeather = (props: any) => {
	return (
		<div className='hourly-weather'>
			<div className='hourly-content'>
				{props.weather.length > 0 &&
					props.weather.map((weather: any, index: any) => (
						<div className='hourly-box-container' key={weather.dt}>
							<div className='hourly-box'>
								<span
									className={`hourly-time ${
										index == 0 ? "hourly-time-now" : ""
									}`}
								>
									{index == 0
										? "Now"
										: moment.unix(weather.dt).tz(props.timezone).format("LT")}
								</span>
								<Image
									src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
									width='100'
									height='100'
									alt={weather.weather[0].description}
								/>
								<span>{weather.temp.toFixed(0)}&deg;C</span>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default HourlyWeather
