import { dbConnect } from 'utils/db'
import Employee from 'models/Employee'

dbConnect()

export default async function handler(req, res) {

  const {
    method,
    body
  } = req

  switch (req.method) {
    case "GET":
      try {
        const employees = await Employee.find().sort({
					createdAt: "desc",
				});
        return res.status(200).json(employees)
      } catch (error) {
        return res.status(500).json({
          error: error.message
        })
      }

    case "POST":
      try {
        const newEmployees = new Employee(body)
        const savedEmployees = await newEmployees.save()
        return res.status(201).json(savedEmployees)
      } catch (error) {
        return res.status(500).json({
          error: error.message
        })
      }

    default:
      return res.status(400).json({
        msg: "This method is not supported"
      })
  }

}