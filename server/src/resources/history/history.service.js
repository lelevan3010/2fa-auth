import HistoryModel from './history.model'

export const queryUserHistory = async _id => {
  return await HistoryModel.find({ userId: _id })
    .sort({
      date: 'desc',
    })
    .limit(20)
}

export const addUserHistory = async (_id, imageURL) => {
    return await HistoryModel.create({ userId: _id, imageURL: imageURL })
}

export const removeUserHistory = async _id => {
  return await HistoryModel.findOneAndDelete({ _id: _id })
}
