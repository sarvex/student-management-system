const asyncHandler = require('express-async-handler')
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
} = require('./students-service')

const handleGetAllStudents = asyncHandler(async (req, res) => {
  const students = await getAllStudents(req.query)

  res.status(200).json({
    success: true,
    data: students,
  })
})

const handleAddStudent = asyncHandler(async (req, res) => {
  const result = await addNewStudent(req.body)

  res.status(201).json({
    success: true,
    message: result.message,
  })
})

const handleUpdateStudent = asyncHandler(async (req, res) => {
  const studentData = {
    ...req.body,
    id: req.params.id,
  }

  const result = await updateStudent(studentData)

  res.status(200).json({
    success: true,
    message: result.message,
  })
})

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params
  const student = await getStudentDetail(id)

  res.status(200).json({
    success: true,
    data: student,
  })
})

const handleStudentStatus = asyncHandler(async (req, res) => {
  const { userId, status } = req.body
  const reviewerId = req.user?.id

  const result = await setStudentStatus({
    userId,
    reviewerId,
    status,
  })

  res.status(200).json({
    success: true,
    message: result.message,
  })
})

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
}
