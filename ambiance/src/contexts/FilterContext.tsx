// FilterContext.tsx
import { ProductModel } from '@/models/Product'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface FilterContextProps {
	selectedPriceRange: [number, number]
	setSelectedPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>
	selectedBrands: string[]
	setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>
	selectedColors: string[]
	setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>
	allBrands: string[]
	setAllBrands: React.Dispatch<React.SetStateAction<string[]>>
	allColors: string[]
	setAllColors: React.Dispatch<React.SetStateAction<string[]>>
	resetFilters: () => void
	filteredProducts: ProductModel[]
	setFilteredProducts: React.Dispatch<React.SetStateAction<ProductModel[]>>
	handleApplyFilters: (
		priceRange: [number, number],
		selectedBrands: string[],
		selectedColors: string[],
	) => void
	filtersCurrentlyApplied: boolean
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined)

export const useFilterContext = (): FilterContextProps => {
	const context = useContext(FilterContext)
	if (!context) {
		throw new Error('useFilterContext must be used within a FilterProvider')
	}
	return context
}

interface FilterProviderProps {
	children: ReactNode
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
	const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([])
	const [selectedPriceRange, setSelectedPriceRange] = useState<
		[number, number]
	>([0, 30000])
	const [selectedBrands, setSelectedBrands] = useState<string[]>([])
	const [selectedColors, setSelectedColors] = useState<string[]>([])
	const [allBrands, setAllBrands] = useState<string[]>([])
	const [allColors, setAllColors] = useState<string[]>([])
	const [filtersApplied, setFiltersApplied] = useState(false)

	const resetFilters = () => {
		setSelectedPriceRange([0, 30000])
		setSelectedBrands([])
		setSelectedColors([])
		setAllBrands([])
		setAllColors([])
	}

	const handleApplyFilters = (
		priceRange: [number, number],
		selectedBrands: string[],
		selectedColors: string[],
	) => {
		setSelectedPriceRange(priceRange)
		setSelectedBrands(selectedBrands)
		setSelectedColors(selectedColors)
	}

	const filtersCurrentlyApplied =
		selectedPriceRange[0] !== 0 ||
		selectedPriceRange[1] !== 30000 ||
		selectedBrands.length > 0 ||
		selectedColors.length > 0

	const contextValue: FilterContextProps = {
		selectedPriceRange,
		setSelectedPriceRange,
		selectedBrands,
		setSelectedBrands,
		selectedColors,
		setSelectedColors,
		allBrands,
		setAllBrands,
		allColors,
		setAllColors,
		resetFilters,
		filteredProducts,
		setFilteredProducts,
		handleApplyFilters,
		filtersCurrentlyApplied,
	}

	return (
		<FilterContext.Provider value={contextValue}>
			{children}
		</FilterContext.Provider>
	)
}
