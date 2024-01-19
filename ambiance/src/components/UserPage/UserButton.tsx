import { Avatar, Text, Paper } from '@mantine/core'

export default function UserInfoAction() {
	return (
		<Paper radius="sm" p="md">
			<Avatar
				src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-512.png"
				size={50}
				radius={120}
				mx="auto"
			/>
			<Text ta="center" fz="sm" fw={500} mt="md">
				Jane Fingerlicker
			</Text>
		</Paper>
	)
}
