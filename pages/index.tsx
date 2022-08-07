import type { NextPage } from "next"
import Head from "next/head"
import SearchBox from "../components/SearchBox"

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Weather App</title>
				<link rel='icon' type='image/svg+xml' href='/assets/favicon.svg' />
				<link rel='icon' type='image/png' href='/assets/favicon.png' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>

			<div className='home'>
				<div className='background-vid'>
					<video
						src='https://storage.coverr.co/videos/RMQg6xBJ5TEyeCUSeiEhcsEdXs7Ow2fJ?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjU5NzYwOTYyfQ.fJpnu49SfV4OZLG8OqlV451C_YekllsFMAF0AMq7IjE'
						autoPlay
						muted
						loop
					></video>
				</div>
				<div className='container'>
					<SearchBox />
				</div>
			</div>
		</div>
	)
}

export default Home
