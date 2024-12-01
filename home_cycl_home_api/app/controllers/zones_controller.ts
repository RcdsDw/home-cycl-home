import Zone from '#models/zone'
import type { HttpContext } from '@adonisjs/core/http'

export default class ZonesController {
  public async create({ request, response }: HttpContext) {
    try {
      const data = request.only(['name', 'width', 'lon', 'lan'])
      const zone = await Zone.create(data)
      return response.created({ message: 'Zone créée avec succès', data: zone })
    } catch (error) {
      return response.badRequest({
        message: 'Erreur lors de la création de la zone',
        error: error.message,
      })
    }
  }

  public async getAll({ response }: HttpContext) {
    try {
      const zones = await Zone.all()
      return response.ok({ message: 'Liste des zones récupérée avec succès', data: zones })
    } catch (error) {
      return response.badRequest({
        message: 'Erreur lors de la récupération des zones',
        error: error.message,
      })
    }
  }

  public async getOne({ params, response }: HttpContext) {
    const { id } = params

    try {
      const zone = await Zone.findOrFail(id)
      return response.ok({ message: 'Zone récupérée avec succès', data: zone })
    } catch (error) {
      return response.notFound({ message: 'Zone non trouvée', error: error.message })
    }
  }
}
