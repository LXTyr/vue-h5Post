import UploadResource from './UploadResource'

export default {
  upload (data) {
    return UploadResource.postUpload({}, data).then(response => {
      if (response.data.MsgCode === '1') {
        return response.data.Data
      } else {
        throw new Error(response.data.Msg)
      }
    }, response => {
      throw new Error(response)
    })
  }
}
