import Link from "next/link"

export const Table = ({currentEmployees, loading, handleDelete}) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number Phone</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {
                !currentEmployees ? <tr className="text-center"><td colSpan="6" className="px-6 py-4 whitespace-nowrap">Data not found</td></tr> : loading ? <tr className="text-center"><td colSpan="6" className="px-6 py-4 whitespace-nowrap">Loading . . .</td></tr> :
                currentEmployees.map((employee, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{employee.firstName + ' ' + employee.lastName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{employee.emailAddress}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{employee.numberPhone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{employee.address}</div>
                      </td>
                      <td className="flex justify-arround py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={'/employees/' + employee._id}>
                          <a className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                            View
                          </a>
                        </Link>
                        <Link href={'/employees/' + employee._id + '/edit'}>
                          <a className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                            Edit
                          </a>
                        </Link>
                        <button onClick={()=>handleDelete(employee._id)} type="button" className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-200">
                          Delete
                        </button>
                      </td>
                    </tr>
                    )
                  )
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}