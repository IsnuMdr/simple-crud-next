import {dbConnect} from 'utils/db';
import Employee from 'models/Employee';

dbConnect()

export default async function handler(req, res){
  const {method, body, query: {id}} = req

  switch (method) {
    case "GET":
      try {
        const employee = await Employee.findById(id)
        if (!employee) return res.status(404).json({msg: "Employee not found"})
        return res.status(200).json(employee)
      } catch (error) {
        return res.status(500).json({msg: error.message})
      }
      
    case "PUT":
      try {
        const employee = await Employee.findByIdAndUpdate(id, body, {
          new: true,
        })
        if(!employee) return res.status(404).json({msg: "Employee not found"})
        return res.status(200).json({msg: "Employee with ID: "+id+" has been successfully updated"})
      } catch (error) {
        return res.status(500).json({msg: error.message})
      }

    case "DELETE":
      try {
        const deletedEmployee = await Employee.findByIdAndDelete(id)
        if(!deletedEmployee) return res.status(404).json({msg: "Employee not found"})
        return res.status(200).json({msg: "Employee with ID: "+id+" has been successfully deleted"})
      } catch (error) {
        return res.status(500).json({msg: error.message})
      }
    default:
      return res.status(400).json({msg: "This method is not supported"})
    }
}