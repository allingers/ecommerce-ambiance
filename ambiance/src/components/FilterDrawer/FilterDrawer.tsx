// components/CategoryFilterDrawer.tsx

import React, { useState } from 'react'
import {
	Accordion,
	Box,
	Checkbox,
	Divider,
	Drawer,
	Group,
	MultiSelect,
	RangeSlider,
	Slider,
	Text,
	Title,
} from '@mantine/core'
import classes from './FilterDrawer.module.css'

const FilterDrawer: React.FC<{
	isOpen: boolean
	onClose: () => void
}> = ({ isOpen, onClose }) => {
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
	const [selectedColors, setSelectedColors] = useState<string[]>([])

	const handlePriceChange = (value: [number, number]) => {
		setPriceRange(value)
	}

	const handleColorChange = (values: string[]) => {
		setSelectedColors(values)
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
									{priceRange[0]} SEK
								</Text>
								<Text className={classes.PriceRangeMax}>
									{priceRange[1]} SEK
								</Text>
							</Group>
							<RangeSlider
								label={null}
								value={priceRange}
								onChange={handlePriceChange}
								max={1000}
								step={10}
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
							<MultiSelect
								data={['Vit', 'Blå', 'Greige', 'Sand', 'Lila', 'Beige']} // Anpassa efter dina färgalternativ
								placeholder="Välj färg(er)"
								searchable
								limit={5} // Maximalt antal val
								defaultValue={[]} //
								value={selectedColors}
								onChange={handleColorChange}
								pt={20}
							/>
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
							<Checkbox.Group defaultValue={[]}>
								<Group mt="md" className={classes.CheckboxGroup}>
									<Checkbox value="react" label="React" />
									<Checkbox value="svelte" label="Svelte" />
									<Checkbox value="ng" label="Angular" />
									<Checkbox value="vue" label="Vue" />
								</Group>
							</Checkbox.Group>
						</Box>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Drawer>
	)
}

export default FilterDrawer
