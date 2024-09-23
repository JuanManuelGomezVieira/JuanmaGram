import { extractSubFromToken } from '../../../com/index'
import context from './context'

export default userId => userId === extractSubFromToken(context.token)
// export default (userId) => userId === extractSubFromToken(context.token)
