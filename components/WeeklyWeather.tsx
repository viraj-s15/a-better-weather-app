import React from "react"
import moment from "moment-timezone"
import Image from "next/image"

const WeeklyWeather = (props: any) => {
	return (
		<div className='weekly-weather'>
			<h3 className='weekly-title'>
				Weekly <span>Weather</span>
			</h3>
			{props.weather.length > 0 &&
				props.weather.map((weather: any, index: any) => {
					if (index == 0) {
						return
					}

					return (
						<div className='weekly-card' key={weather.dt}>
							<div className='weekly-content'>
								<div className='weekly-left-content'>
									<div>
										<h3>
											{moment
												.unix(weather.sunrise)
												.tz(props.timezone)
												.format("dddd")}
										</h3>
										<h4>
											<span>{weather.temp.max.toFixed(0)}&deg;C</span>
											<span>{weather.temp.min.toFixed(0)}&deg;C</span>
										</h4>
									</div>
									<div className='weekly-sun'>
										<div>
											<span>Sunrise</span>
											<span>
												{moment
													.unix(weather.sunrise)
													.tz(props.timezone)
													.format("LT")}
											</span>
										</div>
										<div>
											<span>Sunset</span>
											<span>
												{moment
													.unix(weather.sunset)
													.tz(props.timezone)
													.format("LT")}
											</span>
										</div>
									</div>
								</div>
								<div className='weekly-right-content'>
									<div className='weekly-icon'>
										<Image
											layout='fill'
											src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
											alt={weather.weather[0].description}
										/>
									</div>
								</div>
								<h5>{weather.weather[0].description}</h5>
							</div>
						</div>
					)
				})}
		</div>
	)
}

export default WeeklyWeather
