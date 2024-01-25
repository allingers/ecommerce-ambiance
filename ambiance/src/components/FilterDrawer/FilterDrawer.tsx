// components/CategoryFilterDrawer.tsx

import React, { useEffect, useState } from 'react'
import {
	Accordion,
	Box,
	Button,
	Checkbox,
	Divider,
	Drawer,
	Group,
	RangeSlider,
	Text,
	Title,
	UnstyledButton,
} from '@mantine/core'
import classes from './FilterDrawer.module.css'
import { useFilterContext } from '@/contexts/FilterContext'

const FilterDrawer: React.FC<{
	isOpen: boolean
	onClose: () => void
	brands: string[]
	colors: string[]
}> = ({ isOpen, onClose, brands, colors }) => {
	const {
		selectedPriceRange,
		setSelectedPriceRange,
		selectedColors,
		setSelectedColors,
		selectedBrands,
		setSelectedBrands,
		resetFilters,
		filtersCurrentlyApplied,
	} = useFilterContext()

	const handleColorChange = (values: string[]) => {
		setSelectedColors(values)
	}

	const handleBrandChange = (values: string[]) => {
		setSelectedBrands(values)
	}

	return (
		<Drawer opened={isOpen} onClose={onClose}>
			<Title className={classes.filterTitle}>Filtrering</Title>
			<Divider pb={20} />
			<Accordion
				transitionDuration={0}
				defaultValue="Pris"
				variant="filled"
				radius="md">
				<Accordion.Item value="Pris">
					<Accordion.Control>
						<Text className={classes.PriceRangeText}>Pris</Text>
					</Accordion.Control>
					<Accordion.Panel>
						<Box maw={350} mx="auto" mb={30}>
							<Group className={classes.PriceRangeGroup}>
								<Text className={classes.PriceRangeMin}>
									{selectedPriceRange[0]} SEK
								</Text>
								<Text className={classes.PriceRangeMax}>
									{selectedPriceRange[1]} SEK
								</Text>
							</Group>
							<RangeSlider
								label={null}
								value={selectedPriceRange}
								onChange={(value) => setSelectedPriceRange(value)}
								max={30000}
								step={5}
								color="black"
								radius="md"
								size="sm"
								pt={15}
							/>
						</Box>
					</Accordion.Panel>
				</Accordion.Item>
				<Accordion.Item value="Färg">
					<Accordion.Control>
						<Text className={classes.PriceRangeText}>Färger</Text>
					</Accordion.Control>
					<Accordion.Panel>
						<Box maw={350} mx="auto" mb={30}>
							<Checkbox.Group
								value={selectedColors}
								onChange={handleColorChange}>
								<Group mt="md" className={classes.CheckboxGroup}>
									{colors.map((color) => (
										<Checkbox key={color} value={color} label={color} />
									))}
								</Group>
							</Checkbox.Group>
						</Box>
					</Accordion.Panel>
				</Accordion.Item>
				<Accordion.Item value="Märke">
					<Accordion.Control>
						{' '}
						<Text className={classes.PriceRangeText}>Märken</Text>
					</Accordion.Control>
					<Accordion.Panel>
						<Box maw={350} mx="auto" mb={30}>
							<Checkbox.Group
								value={selectedBrands}
								onChange={handleBrandChange}>
								<Group mt="md" className={classes.CheckboxGroup}>
									{Array.from(brands).map((brand) => (
										<Checkbox key={brand} value={brand} label={brand} />
									))}
								</Group>
							</Checkbox.Group>
						</Box>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
			<Group pl={15} pt={20}>
				{filtersCurrentlyApplied && (
					<UnstyledButton onClick={resetFilters}>Rensa filter</UnstyledButton>
				)}
			</Group>
		</Drawer>
	)
}

export default FilterDrawer
