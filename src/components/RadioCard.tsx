import { Box, useRadio } from '@chakra-ui/react'

function RadioCard(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getRadioProps()
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _hover={{
          borderColor: 'teal.500',
        }}
        px={5}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  )
}
export default RadioCard
