import {
  queryUserHistory,
  addUserHistory,
  removeUserHistory,
} from './history.service'

export const getUserHistory = async (req, res) => {
  const { _id } = req.params
  const userHistory = await queryUserHistory(_id)
  res.status(200).json(userHistory)
}

export const postUserHistory = async (req, res) => {

  const { _id, imageURL } = req.body
  const addedHistory = await addUserHistory(_id, imageURL)
  res.status(200).json(addedHistory)
}

export const deleteUserHistory = async (req, res) => {
  const { _id } = req.body
  const removedHistory = await removeUserHistory(_id)
  res.status(200).json(removedHistory)
}
