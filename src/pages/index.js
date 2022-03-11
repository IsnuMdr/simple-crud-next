import { useEffect, useState } from "react"
import { Table } from "components/Table";
import { Pagination } from 'components/Pagination'
import Link from "next/link";
import axios from "axios";
import { toast } from 'react-toastify'

const apiUrl = 'http://localhost:3000/api/employees/'

export default function Index ({data}) {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [employeesPerPage] = useState(5) // custom data per page

  useEffect(() => {
    setLoading(true)
    setEmployees(data)
    setLoading(false)
  }, []);

  // Get current employees
  const indexOfLastEmployee = currentPage * employeesPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee)
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  // Delete Employee 
  const handleDelete = (id) => {
    deleteEmployee(id)
    setEmployees(data.filter((d) => d._id !== id));
  }
  
  const deleteEmployee = async (id) => {
    await axios.delete(apiUrl+id)
      .then(() => {
        toast.success("Employee has been deleted!", {
          position: toast.POSITION.TOP_RIGHT
        });
      })
      .catch(err => console.error(err))
  }
  
  return (
    <div className="container w-full mx-auto px-5 mt-4">
      <div className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md">
        <div className="flex justify-between items-center mb-4 px-2">
          <h5 className="text-xl font-bold leading-none text-gray-900">Employee List</h5>
          <Link href={'/employees/new'}>
            <a className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out" type="button">
              Add Employee
            </a>
          </Link>
        </div>
        <Table 
          currentEmployees={currentEmployees}
          loading={loading}
          handleDelete={handleDelete}
        />

        <Pagination
          employeesPerPage={employeesPerPage}
          totalEmployees={employees.length}
          paginate={paginate}
          paginateBack={paginateBack}
          paginateFront={paginateFront}
          currentPage={currentPage} 
        />
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await axios.get(apiUrl)
  const data = await res.data
  return {
    props: {
      data,
    }
  }
}