import { useState, useEffect } from 'react'

const useFavorites = () => {
	const [favorites, setFavorites] = useState<string[]>([])

	// Hämta favoriter från localStorage när komponenten monteras
	useEffect(() => {
		const storedFavorites = localStorage.getItem('favorites')
		if (storedFavorites) {
			setFavorites(JSON.parse(storedFavorites))
		}
	}, [])

	// Uppdatera favoriter och localStorage när de ändras
	const updateFavorites = (newFavorites: string[]) => {
		setFavorites(newFavorites)
		localStorage.setItem('favorites', JSON.stringify(newFavorites))
	}

	return { favorites, updateFavorites }
}

export default useFavorites
