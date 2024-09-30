import * as yup from 'yup';

export const schema = yup
  .object({
    id: yup.string().optional(),
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    status: yup
      .string()
      .oneOf(['To Do', 'In Progress', 'Done'], 'Invalid status')
      .required('Status is required'),
  })
  .required();
