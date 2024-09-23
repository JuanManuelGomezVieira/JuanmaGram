import context from './context'
import { isTokenAlive, isTokenValid } from '../../../com/index'

export default () => isTokenValid(context.token) && isTokenAlive(context.token)
