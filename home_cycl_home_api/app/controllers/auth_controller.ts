import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const { firstname, lastname, email, password } = request.only([
      'firstname',
      'lastname',
      'email',
      'password',
    ])

    const existingUser = await User.findBy('email', email)
    if (existingUser) {
      return response.badRequest('Cet email est déjà utilisé')
    }

    const user = await User.create({ firstname, lastname, email, password })
    const token = await User.accessTokens.create(user)

    return response.created({
      message: 'Utilisateur crée dans le BDD',
      user: user.serialize(),
      token: token,
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)

      return response.ok({
        message: 'Utilisateur connecté',
        token: token,
        user: user.serialize(),
      })
    } catch {
      return response.unauthorized('Identifiants invalides')
    }
  }
}