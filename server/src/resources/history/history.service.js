import HistoryModel from './history.model'

export const queryUserHistory = async _id => {
  try {
    return await HistoryModel.find({ userId: _id })
      .sort({
        date: 'desc',
      })
      .limit(20)
  } catch (error) {
    return error
  }
}

export const addUserHistory = async (_id, imageURL) => {
  try {
    return await HistoryModel.create({ userId: _id, imageURL: imageURL })
  } catch (error) {
    return error
  }
}

export const removeUserHistory = async _id => {
  try {
    return await HistoryModel.findOneAndDelete({ _id: _id })
  } catch (error) {
    return error
  }
}
