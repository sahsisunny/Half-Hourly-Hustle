import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import RadioGroupExample from './RadioGroupExample'
import TimeCheckbox from './TimeCheckbox'

// dataset
const taskTypes = ['Work', 'Study', 'Exercise', 'Rest', 'Meal', 'Other']
const workList = ['RDS Task', 'Office Work', 'Personal Project', 'Other']
const studyList = ['Android', 'Frontend', 'Backend', 'English', 'Other']
const exerciseList = ['Morning Walk', 'Evining Walk', 'Other']
const restList = ['Sleep', 'Power Nap', 'Other']
const mealList = ['Breakfast', 'Lunch', 'Dinner', 'Other']
const otherList = ['Other']

function ModalExample() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedTaskType, setSelectedTaskType] = useState('Work')

  const [selectedTaskName, setSelectedTaskName] = useState<string>('')

  let selectedTimeSlots: string[] = []

  const handleSizeClick = () => {
    onOpen()
  }

  const handleChange = (event: string) => {
    setSelectedTaskType(event)
  }
  const handleTimeChange = (event: string[]) => {
    selectedTimeSlots = event
  }

  const handleTaskNameChange = (event: string) => {
    setSelectedTaskName(event)
  }

  function calculateTime(array: string[]): { hours: number; minutes: number } {
    let hours = 0
    let minutes = 0

    array.forEach((range) => {
      const [start, end] = range.split(' - ')
      const [startHour, startMinute, startPeriod] = start.split(/:| /)
      const [endHour, endMinute, endPeriod] = end.split(/:| /)

      let startHourNum = parseInt(startHour)
      let endHourNum = parseInt(endHour)
      let startMinuteNum = parseInt(startMinute)
      let endMinuteNum = parseInt(endMinute)

      if (startPeriod === 'PM' && startHourNum !== 12) {
        startHourNum += 12
      }
      if (endPeriod === 'PM' && endHourNum !== 12) {
        endHourNum += 12
      }

      let totalMinutes =
        (endHourNum - startHourNum) * 60 + (endMinuteNum - startMinuteNum)
      hours += Math.floor(totalMinutes / 60)
      minutes += totalMinutes % 60
    })

    hours += Math.floor(minutes / 60)
    minutes = minutes % 60

    return { hours, minutes }
  }

  function convertTimeTo12HourFormat(time: string): string {
    const [hours, minutes] = time.split(':')
    const parsedHours = parseInt(hours, 10)
    const suffix = parsedHours >= 12 ? 'PM' : 'AM'
    const hours12 = parsedHours % 12 || 12
    return `${hours12}:${minutes} ${suffix}`
  }

  function convertTimeSlotsTo12HourFormat(timeSlots: string[]): string[] {
    return timeSlots.map((time) => {
      const [start, end] = time.split(' - ')
      const startTime = convertTimeTo12HourFormat(start)
      const endTime = convertTimeTo12HourFormat(end)
      return `${startTime} - ${endTime}`
    })
  }

  const handleSetPlan = () => {
    const convertedTimeSlots = convertTimeSlotsTo12HourFormat(selectedTimeSlots) //type: string[]

    const plan = {
      type: selectedTaskType,
      timeSlots: convertedTimeSlots,
      time: calculateTime(selectedTimeSlots),
      task: selectedTaskName,
      status: 'pending',
    }
    const planJSON = JSON.stringify(plan)
    // get existing plans from local storage
    const existingPlans = JSON.parse(localStorage.getItem('plans') || '[]')

    // add new plan to existing plans and store it in local storage
    const updatedPlans = [...existingPlans, plan]
    localStorage.setItem('plans', JSON.stringify(updatedPlans))
    console.log(plan)
    onClose()
    window.location.reload()
  }

  return (
    <>
      <Button onClick={() => handleSizeClick()}>Set Plan</Button>
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select the task type and time slots</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div
              style={{
                marginBottom: '10px',
                flexDirection: 'row',
              }}
            >
              <RadioGroupExample
                name="Task Type"
                options={taskTypes}
                defaultValue={taskTypes[0]}
                onChange={handleChange}
              />
            </div>
            {selectedTaskType === 'Work' && (
              <RadioGroupExample
                name="Work"
                options={workList}
                defaultValue={workList[0]}
                onChange={(event: string) => handleTaskNameChange(event)}
              />
            )}

            {selectedTaskType === 'Study' && (
              <RadioGroupExample
                name="Study"
                options={studyList}
                defaultValue={studyList[0]}
                onChange={(event: string) => handleTaskNameChange(event)}
              />
            )}

            {selectedTaskType === 'Exercise' && (
              <RadioGroupExample
                name="Exercise"
                options={exerciseList}
                defaultValue={exerciseList[0]}
                onChange={(event: string) => handleTaskNameChange(event)}
              />
            )}

            {selectedTaskType === 'Rest' && (
              <RadioGroupExample
                name="Rest"
                options={restList}
                defaultValue={restList[0]}
                onChange={(event: string) => handleTaskNameChange(event)}
              />
            )}

            {selectedTaskType === 'Meal' && (
              <RadioGroupExample
                name="Meal"
                options={mealList}
                defaultValue={mealList[0]}
                onChange={(event: string) => handleTaskNameChange(event)}
              />
            )}

            {selectedTaskType === 'Other' && (
              <RadioGroupExample
                name="Other"
                options={otherList}
                defaultValue={otherList[0]}
                onChange={(event: string) => handleTaskNameChange(event)}
              />
            )}

            {/* <TimeCheckbox onChange={handleTimeChange} /> */}
            <TimeCheckbox handleTimeChange={handleTimeChange} />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={'5px'}
              onClick={() => handleSetPlan()}
            >
              Done{' '}
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalExample
