import sinon from 'sinon'

import * as api from '../../../client/lib/api'

const testToken = {id: 'test token id'}

const stub = sinon.stub(api, 'default').resolves({
  body: {token: testToken}
})

export default stub
