import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
	Dispatch,
	SetStateAction,
} from 'react'

interface FavoriteItem {
	productId: string
}

interface FavoritesContextProps {
	favoriteItems: FavoriteItem[]
	setFavoriteItems: Dispatch<SetStateAction<FavoriteItem[]>>
	addToFavorites: (productId: string) => void
	removeFromFavorites: (productId: string) => void
	isFavorite: (productId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
	undefined,
)

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([])

	const addToFavorites = (productId: string) => {
		setFavoriteItems((prevItems) => [...prevItems, { productId }])
	}

	const removeFromFavorites = (productId: string) => {
		setFavoriteItems((prevItems) =>
			prevItems.filter((item) => item.productId !== productId),
		)
	}

	const isFavorite = (productId: string) => {
		return favoriteItems.some((item) => item.productId === productId)
	}

	useEffect(() => {
		const storedFavorites = localStorage.getItem('favorites')
		if (storedFavorites) {
			try {
				const parsedFavorites = JSON.parse(storedFavorites)
				if (JSON.stringify(parsedFavorites) !== JSON.stringify(favoriteItems)) {
					setFavoriteItems(parsedFavorites)
				}
			} catch (error) {
				console.error('Error parsing stored favorites:', error)
				localStorage.removeItem('favorites')
				setFavoriteItems([])
			}
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favoriteItems))
	}, [favoriteItems])

	return (
		<FavoritesContext.Provider
			value={{
				favoriteItems,
				setFavoriteItems,
				addToFavorites,
				removeFromFavorites,
				isFavorite,
			}}>
			{children}
		</FavoritesContext.Provider>
	)
}

export const useFavorites = () => {
	const context = useContext(FavoritesContext)

	if (!context) {
		throw new Error('useFavorites must be used within a FavoritesProvider')
	}

	return context
}
