import {Schema,model,models} from 'mongoose'

const employeesSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Firstname is required'],
    trim: true,
    maxlength: [30, 'Firstname must be last then 30 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Lastname is required'],
    trim: true,
    maxlength: [30, 'Lastname must be last then 30 characters']
  },
  emailAddress: {
    type: String,
    required: [true, 'Email Address is required'],
    trim: true,
    maxlength: [50, 'Email Address must be last then 50 characters']
  },
  numberPhone: {
    type: String,
    required: [true, 'Number Phone is required'],
    trim: true,
    maxlength: [13, 'Number Phone must be last then 13 characters']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    maxlength: [255, 'Address Phone must be last then 255 characters']
  },
}, {
    timestamps: true,
    versionKey: false
  }
)

export default models.Employee || model('Employee', employeesSchema)