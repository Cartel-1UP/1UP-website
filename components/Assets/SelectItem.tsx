import { Avatar, Group, Text } from "@mantine/core"
import { forwardRef } from "react"


interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    image: string
    label: string
}


const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, ...others }: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <Avatar src={image} />
                <div>
                    <Text size="sm">{label}</Text>
                </div>
            </Group>
        </div>
    )
)

export default SelectItem