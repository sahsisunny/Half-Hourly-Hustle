import { HStack, useRadioGroup } from '@chakra-ui/react'
import RadioCard from './RadioCard'

type RadioGroupProps = {
  name: string
  options: string[]
  defaultValue?: string
  onChange?: (value: string) => void
}

function RadioGroupExample({
  name,
  options,
  defaultValue = options[0],
  onChange,
}: RadioGroupProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange,
  })
  const group = getRootProps()
  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}

export default RadioGroupExample
