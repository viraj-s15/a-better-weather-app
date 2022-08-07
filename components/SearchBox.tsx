import React, { useState, ReactNode, Key } from "react"
import cities from "../data/city.list.json"
import Link from "next/link"

const SearchBox = (props: any) => {
	interface Provider {
		id: Key | null | undefined
		slug: string
		name: ReactNode
		state: any
		country: ReactNode
		connected: boolean
		type: string[]
	}

	interface City {
		id: Key
		name: string
		state: string
		country: string
		coor: {
			lon: number
			lat: number
		}
	}

	const [typed, setTyped] = useState<any>("")
	const [autoComplete, setAutoComplete] = useState<Provider[]>([])

	const handleChange = (event: any) => {
		const { value }: any = event.target

		setTyped(value)

		let matches: any[] = []

		if (value.length > 3) {
			for (const index in cities) {
				const city: any = cities[index as keyof typeof cities]
				if (matches?.length >= 5) {
					break
				}
				const matching = city?.name
					.toLowerCase()
					.startsWith(value.toLowerCase())

				if (matching) {
					const cityData = {
						...city,
						slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`
					}
					matches.push(cityData)
				}
			}
		}
		return setAutoComplete(matches)
	}

	return (
		<div className='search-box'>
			<input
				type='text'
				value={typed}
				onChange={handleChange}
				placeholder='Search for a location...'
			/>
			{typed.length > 3 && (
				<ul>
					{autoComplete.length > 0 ? (
						<li>
							{autoComplete.map((city) => (
								<li key={city?.slug}>
									<Link href={`/places/${city?.slug}`}>
										<a>
											{city?.name}
											{city?.state ? `, ${city?.state}` : ""}
											<span>({city?.country})</span>
										</a>
									</Link>
								</li>
							))}
						</li>
					) : (
						<li className='search-box-no-matches'>There are no matches</li>
					)}
				</ul>
			)}
		</div>
	)
}

export default SearchBox
