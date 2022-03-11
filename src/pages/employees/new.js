import { useRouter } from 'next/router';
import { useEffect, useState } from "react"
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Link from 'next/link';
import { toast } from 'react-toastify'

export default function EmployeeFormPage() {

  const apiUrl = 'http://localhost:3000/api/employees/'
  const { query, push } = useRouter()
  const [newEmployee, setNewEmployee] = useState({
    firstName:"", 
    lastName:"",
    emailAddress:"",
    numberPhone:"",
    address:"",
  });

  // Validation Schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('First Name is required'),
    lastName: Yup.string()
        .required('Last Name is required'),
    emailAddress: Yup.string()
        .required('Email Address is required')
        .email('Email Address is invalid'),
    numberPhone: Yup.string()
        .required('Phone Number is required'),
    address: Yup.string()
        .required('Address is required'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState: { errors }, setValue } = useForm(formOptions);
  
  // Handle Submit
  const onSubmit = async (data) => {
    if (query.id) {
      await updateEmployee()
      toast.success("Employee has been successfully updated!", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      await addEmployee(data)
      toast.success("Employee has been added!", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    await push('/')
  }

  // Add Employee
  const addEmployee = async (data) => {
    await axios.post(apiUrl, data)
      .catch(err => console.log(err))
  }

  // Update Employee
  const updateEmployee = async () => {
    await axios.put(apiUrl + query.id, newEmployee)
      .catch(err => console.error(err))
  }

  const getEmployee = async () => {
    const res = await axios.get(apiUrl + query.id)
    const data = await res.data
    setNewEmployee({
      firstName:data.firstName, 
      lastName:data.lastName,
      emailAddress:data.emailAddress,
      numberPhone:data.numberPhone,
      address:data.address,
    })
  }

  const handleChange = (e) => setNewEmployee({...newEmployee, [e.target.name]: e.target.value})

  useEffect(() => {
    if(query.id) getEmployee()
  }, [])


  return( 
    <div className='container w-full md:w-3/4 lg:w-1/2 mx-auto px-5 mt-4'>
      <div className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md">
        <div className="flex justify-between items-center mb-8">
          <h5 className="text-xl font-bold leading-none text-gray-900">Employee Form</h5>
          <Link href={'/'}>
            <a className="text-indigo-600 hover:underline hover:text-indigo-500">
              &lt;&lt; Back to Home
            </a>
          </Link>
        </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 mb-6">
              <div className="mr-1">
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                <input type="text" id="firstName" {...register("firstName")} className={`text-sm sm:text-base relative w-full border  ${errors.firstName ? 'border-red-500' : 'border-indigo-200'} rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 px-2`} onChange={handleChange} value={newEmployee.firstName} />
                {errors.firstName && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{errors.firstNameessage}</span>}</div>
              <div className="ml-1 sm:ml-0">
                <label htmlFor="lastName" className="md:mt-0 mt-5 block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                <input type="text" id="lastName" {...register("lastName")} className={`text-sm sm:text-base relative w-full border ${errors.lastName ? 'border-red-500' : 'border-indigo-200'} rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 px-2`} onChange={handleChange} value={newEmployee.lastName} />
                {errors.lastName && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{errors.lastNamessage}</span>}
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="emailAddress" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
              <input type="text" id="emailAddress" {...register("emailAddress")} className={`text-sm sm:text-base relative w-full border  ${errors.emailAddress ? 'border-red-500' : 'border-indigo-200'} rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 px-2`} onChange={handleChange} value={newEmployee.emailAddress} />
              {errors.emailAddress && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{errors.emailAddress.message}</span>}
            </div>
            <div className="mb-6">
              <label htmlFor="numberPhone" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
              <input type="text" id="numberPhone" {...register("numberPhone")} className={`text-sm sm:text-base relative w-full border  ${errors.numberPhone ? 'border-red-500' : 'border-indigo-200'} rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 px-2`} onChange={handleChange} value={newEmployee.numberPhone} />
              {errors.numberPhone && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{errors.numberPhone.message}</span>}
            </div>
            <div className="mb-6">
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
              <input type="text-area" id="address" {...register("address")} className={`text-sm sm:text-base relative w-full border  ${errors.address ? 'border-red-500' : 'border-indigo-200'} rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 px-2`} onChange={handleChange} value={newEmployee.address} />
              {errors.address && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{errors.address.message}</span>}
            </div>
            <button onClick={() => {
              setValue("firstName", newEmployee.firstName, {shouldValidate: true})
              setValue("lastName", newEmployee.lastName, {shouldValidate: true})
              setValue("emailAddress", newEmployee.emailAddress, {shouldValidate: true})
              setValue("numberPhone", newEmployee.numberPhone, {shouldValidate: true})
              setValue("address", newEmployee.address, {shouldValidate: true})
            }} type="submit" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center ">{query.id ? 'Update' : 'Create'}</button>
          </form>
      </div>
    </div>
  )
}