import { Text } from "@chakra-ui/react";

interface HeaderTitleProps {
    title: string;
}

export function HeaderTitle({ title }: HeaderTitleProps){
    return (
        <Text
            fontSize={'2xl'}
            fontWeight={'bold'}
        >
            {title}
        </Text>
    )
}