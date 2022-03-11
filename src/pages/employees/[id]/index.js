import Error from 'next/error'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from "next/link"
import { toast } from 'react-toastify'

export default function EmployeeDetail({employee, error}) {

  const { _id, firstName, lastName, emailAddress, numberPhone, address } = employee
  const { push } = useRouter()

  const deleteEmployee = async () => {
    await axios.delete('http://localhost:3000/api/employees/'+_id)
      .catch(err => console.error(err))
  }

  const handleDelete = () => {
    deleteEmployee()
    toast.success("Employee has been deleted!", {
      position: toast.POSITION.TOP_RIGHT
    });
    push('/')
  }

  if (error && error.statusCode) return <Error statusCode={error.statusCode} title={error.statusText}/>
  
  return (
    <div className='container w-full md:w-3/4 lg:w-1/2 mx-auto px-5 mt-4'>
      <div className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900">Employee Detail</h5>
          <Link href={'/'}>
            <a className="text-indigo-600 hover:underline hover:text-indigo-500">
              &lt;&lt; Back to Home
            </a>
          </Link>
        </div>
        <div className="flex justify-center">
          <div className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900 mt-5">
            <div className="text-left px-6 py-2 border-b border-gray-200 w-full rounded-t-lg bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer">
              {firstName + ' ' + lastName}
            </div>
            <div className="text-left px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-100 cursor-pointer">
              {emailAddress}
            </div>
            <div className="text-left px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-100 cursor-pointer">
              {numberPhone}
            </div>
            <div className="text-left px-6 py-2 border-b border-gray-200 w-full rounded-b-lg hover:bg-gray-100 cursor-pointer">
              {address}
            </div>
          </div>
        </div>
        <div className='text-center mt-6'>
          <Link href={'/employees/' + _id + '/edit'}>
            <a className="items-inline px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Edit</a>
          </Link>
        
          <button onClick={() => handleDelete()} className="ml-4 items-inline px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Delete</button>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ query: { id } }) {

  const res = await axios.get('http://localhost:3000/api/employees/'+id)

  if(res.status === 200) {
    const employee = await res.data
    return {
      props: {
        employee
      }
    }
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id"
      }
    }
  }
}