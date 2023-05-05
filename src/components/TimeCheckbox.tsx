import { Center, Checkbox, CheckboxGroup, Flex } from '@chakra-ui/react'
import { ChangeEvent } from 'react'

function TimeCheckbox(props: any) {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const hourChunks = []
  for (let i = 0; i < hours.length; i += 3) {
    hourChunks.push(hours.slice(i, i + 3))
  }
  const timeChunks = hourChunks.flatMap((hourChunk) => {
    return hourChunk.flatMap((hour) => {
      return [
        { value: `${hour}:00`, label: `${hour}:00 - ${hour}:30` },
        { value: `${hour}:30`, label: `${hour}:30 - ${hour + 1}:00` },
      ]
    })
  })

  var selectedTimeSlots: string[] = []
  const getTimeChunks = (event: ChangeEvent<HTMLInputElement>) => {
    const checkboxInput = event.target as HTMLInputElement
    const labelElement = checkboxInput.nextElementSibling
      ?.nextElementSibling as HTMLLabelElement
    if (checkboxInput.checked) {
      selectedTimeSlots.push(labelElement.textContent!)
    } else {
      selectedTimeSlots = selectedTimeSlots.filter(
        (timeSlot) => timeSlot !== labelElement.textContent
      )
    }
  }

  // send the selected time slots to the parent component
  props.handleTimeChange(selectedTimeSlots) //selectedTimeSlots is an array of strings

  return (
    <CheckboxGroup colorScheme="green" defaultValue={[]}>
      <Flex wrap="wrap">
        {hourChunks.map((hourChunk) => (
          <Center key={hourChunk[0]}>
            {hourChunk.map((hour) => (
              <Flex key={hour} direction="column" w="150px">
                <Checkbox
                  value={`${hour}:00`}
                  onChange={getTimeChunks}
                >{`${hour}:00 - ${hour}:30`}</Checkbox>
                <Checkbox
                  value={`${hour}:30`}
                  onChange={getTimeChunks}
                >{`${hour}:30 - ${hour + 1}:00`}</Checkbox>
              </Flex>
            ))}
          </Center>
        ))}
      </Flex>
    </CheckboxGroup>
  )
}

export default TimeCheckbox
