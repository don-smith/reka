import sinon from 'sinon'

import * as auth from '../../../client/lib/auth'

const testToken = {id: 'test token id'}

const stub = sinon.stub(auth, 'saveAuthToken').returns(testToken)

export default stub
