import Head from "next/head"
import React from "react"
import { Key } from "react"
import cities from "../../public/citylist.json"
import CurrentWeather from "../../components/CurrentWeather"
import HourlyWeather from "../../components/HourlyWeather"
import WeeklyWeather from "../../components/WeeklyWeather"
import SearchBox from "../../components/SearchBox"

interface City {
	id: Key
	name: string
	state: string | null
	country: string
	coord: {
		lon: number
		lat: number
	}
}

export async function getServerSideProps(context: any) {
	const city = getCity(context.params.city)

	if (!city) return { notFound: true }

	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&units=metric&exclude=minutely`
	)

	const data = await response.json()

	if (!data) return { notFound: true }

	console.log(data.timezone)

	const timezone = (): string => {
		return data.timezone
	}

	const checkDescription: any = () => {
		const description: string = data.current.weather[0].description
		let backVid: string | null = null
		if (description.includes("rain")) {
			backVid =
				"https://storage.coverr.co/videos/3d9Fvd5VHjsLaQ6BXdnAxzVnUcQ81eMQ?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjU5NzgxNDczfQ.yHcWmEFutZDgKpFEwU-1TH_mUh6nVniXpAdoV9Alfcc"
		}
		if (description.includes("snow")) {
			backVid =
				"https://storage.coverr.co/videos/2uVv8JQVlPxIylXMYtbB2jUs9zkq02802X?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjU5NzgxODUyfQ.sHG_cB7Xu6sMG8KQqBRpjNFYPyZt4IqmAxQv58K_738"
		}
		if (description.includes("clear")) {
			backVid =
				"https://storage.coverr.co/videos/bhnNW022Hykx6POeLwxpg02hzB9VY02xW98?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjU5NzgxOTUwfQ.g1EJe415ywJ3h94qsGfU8CqM3wonidizZzkdBp3O0pQ"
		}
		if (description.includes("clouds")) {
			backVid =
				"https://storage.coverr.co/videos/pWj5n1UJwSbfYXxZLNNK8pNFU29D02X2b?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjU5ODAwMDEzfQ.KcnyYh02rgSVS0yg2aGvftpsA0WfawSEPu4fym52qdU"
		}
		if (description.includes("haze")) {
			backVid =
				"https://stream.mux.com/WsyIGglHWuSj6sHby1t9Qm4SmPZafWwi/high.mp4?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InQ5UHZucm9ZY0hQNjhYSmlRQnRHTEVVSkVSSXJ0UXhKIn0.eyJleHAiOjE2NTk4MTAxNTEsImF1ZCI6InYiLCJzdWIiOiJXc3lJR2dsSFd1U2o2c0hieTF0OVFtNFNtUFphZld3aSJ9.Yw71Qkz2dvSz2lj8U864ySXFg-TF54R3699QT2pdpdcaPBQ73jcC-42yI6kNgUNaN4hT30-4B2JX8AMcuqD_QN2bjuXRHtGsye5SlIQ0UmvUnZbnzvX9TylkfRwOyp8fL7UMna3Xo613k9hIi-aCd1XxgoLhVOZN7lylxPLc_3sVO9YmLxvHZo9gu1IwYaXe1TFqYMeIK-9MTLdNyqS93qeE_JG_iSGP_If83fj8KyrG3D2lu98VgKHYijz-BJAXqcfGfbfBdrXJUG34ivtfpEM4WQe8jLgIxuKlheYmQ4YUv9p2C1ulYDsyVRTHFednShN1nvdpUyrq5n646TryBw"
		}
		if (description.includes("mist")) {
			backVid =
				"https://storage.coverr.co/videos/9fxmQv6LuUzYI8vBH1FQX55Jr0101IXbTA?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjU5Nzk5NzM4fQ.5OG4iSBVq7ZMVu8JEsi8WZMJhZBSlGLEH5rLh8tB9Zg"
		}
		if (description.includes("drizzle")) {
			backVid =
				"https://storage.coverr.co/videos/qQ02WXUctcM8V5zx01pBCapiu3IWsCL5Xo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjU5ODYxMTE5fQ.C3oi-U5uq71zEWlzknuUHSk5cDWiTjLo-lqi6v6I5VM"
		}
		return backVid
	}

	return {
		props: {
			city: city,
			currentWeatherData: data.current,
			dailyWeatherData: data.daily,
			hourlyWeatherData: hourly(data.hourly),
			timezone: timezone(),
			backGroundVideo: checkDescription()
		}
	}
}

const getCity = (param: any) => {
	const cityInfo: Key[] = param.trim().split("-")
	const cityId: Key = cityInfo[cityInfo.length - 1]

	if (!cityId) return null

	function getCityHelper(city: City) {
		return city.id.toString() === cityId
	}

	const city: City = (cities as any[]).find((city) => getCityHelper(city))

	if (city) {
		return city
	} else {
		return null
	}
}

const hourly: any = (hourlyData: any) => {
	const currentDate = new Date()
	currentDate.setHours(currentDate.getHours(), 0, 0, 0)
	const tomorrowDate = new Date()
	tomorrowDate.setDate(tomorrowDate.getDate() + 1)
	tomorrowDate.setHours(0, 0, 0, 0)

	const currentDt = Math.floor(currentDate.getTime() / 1000)
	const tomorrowDt = Math.floor(tomorrowDate.getTime() / 1000)

	const todayData = hourlyData.filter((data: any) => data.dt < tomorrowDt)

	return todayData
}

const City = (props: any) => {
	console.log(props.timezone)
	return (
		<div>
			<Head>
				<title>{props.city.name} Weather</title>
				<link rel='icon' type='image/svg+xml' href='/assets/favicon.svg' />
				<link rel='icon' type='image/png' href='/assets/favicon.png' />
			</Head>

			<div className='page-wrapper'>
				<video autoPlay muted loop src={props.backGroundVideo}></video>
				<div className='container'>
					<div className='left-content-main'>
						<SearchBox />
						<CurrentWeather
							city={props.city}
							weather={props.currentWeatherData}
							dailyWeather={props.dailyWeatherData[0]}
							timezone={props.timezone}
						/>
						<HourlyWeather
							weather={props.hourlyWeatherData}
							timezone={props.timezone}
						/>
					</div>
					<WeeklyWeather
						className='weekly-main'
						weather={props.dailyWeatherData}
						timezone={props.timezone}
					/>
				</div>
			</div>
		</div>
	)
}

export default City
