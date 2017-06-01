import FormResource from './FormResource'

export default {
  fetchClass () {
    return FormResource.getClass().then(response => {
      if (response.data.MsgCode === '1') {
        return response.data.Data
      } else {
        throw new Error(response.data.Msg)
      }
    }, response => {
      console.log(response)
    })
  },
  fetchTime () {
    return FormResource.getTime().then(response => {
      if (response.data.MsgCode === '1') {
        return response.data.Data
      } else {
        throw new Error(response.data.Msg)
      }
    }, response => {
      throw new Error(response)
    })
  },
  submitForm (data) {
    return FormResource.postData({}, data).then(response => {
      if (response.data.MsgCode === '1') {
        return response.data.Data
      } else {
        throw new Error(response.data.Msg)
      }
    }, response => {
      throw new Error(response)
    })
  },
  fetchName (data) {
    return FormResource.getName({}, data).then(response => {
      if (response.data.MsgCode === '1') {
        return response.data.Data
      } else {
        throw new Error(response.data.Msg)
      }
    }, response => {
      throw new Error(response)
    })
  },
  fetchSuccessList () {
    return FormResource.get().then(response => {
      if (response.data.MsgCode === '1') {
        return response.data.Data
      } else {
        throw new Error(response.data.Msg)
      }
    }, response => {
      console.log(response)
    })
  },
  fetchCode (data) {
    return FormResource.getCode({}, data).then(response => {
      return response.data
    }, response => {
      console.log(response)
    })
  },
  submitBind (data) {
    return FormResource.postBind({}, data).then(response => {
      return response.data
    }, response => {
      console.log(response)
    })
  },
  checkPhone (data) {
    return FormResource.postPhone({}, data).then(response => {
      return response.data
    }, response => {
      console.log(response)
    })
  },
  checkUser (data) {
    return FormResource.postId({}, data).then(response => {
      return response.data
    }, response => {
      console.log(response)
    })
  },
  fetchUser (data) {
    return FormResource.getUser().then(response => {
      return response.data
    }, response => {
      console.log(response)
    })
  }
}
