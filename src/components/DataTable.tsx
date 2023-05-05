import React, { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from '@chakra-ui/react'

interface Plan {
  type: string
  timeSlots: string[]
  time: any
  task: string
  status: string
}

function DataTable() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [status, setStatus] = useState<string>('Pending')

  useEffect(() => {
    const storedPlans = JSON.parse(localStorage.getItem('plans') || '[]')
    setPlans(storedPlans)
  }, [])

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Task Plan</TableCaption>
        <Thead>
          <Tr>
            <Th>Task Type</Th>
            <Th>Time Slots</Th>
            <Th>Time</Th>
            <Th>Task Name</Th>
            <Th>Status</Th>
            <Th>Actions</Th>

            {/* <Th>
              <Button
                onClick={() => {
                  localStorage.setItem('plans', JSON.stringify([]))
                  setPlans([])
                }}
                colorScheme="red"
              >
                Clear All
              </Button>
            </Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {plans.map((plan, index) => (
            <Tr key={index}>
              <Td>{plan.type}</Td>
              <Td>
                {plan.timeSlots.map((timeSlot, index) => (
                  <div key={index}>{timeSlot}</div>
                ))}
              </Td>
              <Td>{`${plan.time['hours']}h ${plan.time['minutes']}m`}</Td>
              <Td>{plan.task}</Td>
              <Td>
                {plan.status === 'completed' ? 'Completed' : 'Not Completed'}
              </Td>
              <Td>
                <Button
                  onClick={() => {
                    const existingPlans = JSON.parse(
                      localStorage.getItem('plans') || '[]'
                    )
                    existingPlans.splice(index, 1)
                    localStorage.setItem('plans', JSON.stringify(existingPlans))
                    setPlans(existingPlans)
                  }}
                  colorScheme="red"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    const existingPlans = JSON.parse(
                      localStorage.getItem('plans') || '[]'
                    )
                    let plan = existingPlans[index]
                    plan.status === 'pending' ? (plan.status = 'completed') : (plan.status = 'pending')
                    console.log(plan.status)
                  }}
                  colorScheme="green"
                  marginLeft="10px"
                >
                  {plan.status === 'completed' ? 'Pending' : 'Completed'}
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default DataTable
