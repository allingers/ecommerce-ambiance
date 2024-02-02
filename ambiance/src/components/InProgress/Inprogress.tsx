//InProgress.tsx
// Komponent renderas om sidan inte är tillgänglig
import { Image, Container, Title, Button, SimpleGrid } from '@mantine/core'
import classes from './Inprogress.module.css'
import Link from 'next/link'

export default function InProgress() {
	return (
		<Container className={classes.root}>
			<SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
				<Image
					src="https://cdn.pixabay.com/photo/2017/06/16/07/26/under-construction-2408059_1280.png"
					className={classes.mobileImage}
				/>
				<div>
					<Title className={classes.title}>
						Sidan är inte tillgänglig för tillfället..
					</Title>

					<Link href={'/'}>
						<Button
							variant="outline"
							color="black"
							size="md"
							mt="xl"
							className={classes.control}>
							Tillbaka till startsidan
						</Button>
					</Link>
				</div>
				<Image
					src="https://cdn.pixabay.com/photo/2017/06/16/07/26/under-construction-2408059_1280.png"
					className={classes.desktopImage}
				/>
			</SimpleGrid>
		</Container>
	)
}
