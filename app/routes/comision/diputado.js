import Ember from 'ember';

export default Ember.Route.extend({
  spreadsheets: Ember.inject.service(),
  _routing: Ember.inject.service('-routing'),

  model(params) {
    const spreadsheet = this.get('spreadsheets');
    const _routing = this.get('_routing');

    return Ember.RSVP.hash({
      postulador: this.store.peekRecord('postulador-comision', params.id),
      postuladorFuncionalidades: spreadsheet
        .fetch('postulador-funcionalidades', 'config')
        .then((links) => {
          return Ember.A(links)
            .filter((link) => {
              if (link.link) {
                return true;
              }

              if (!_routing.hasRoute(link.route)) {
                throw new Error(`Route not recognized: ${link.route}`);
              }

              return true;
            });
        }),
      resultadosEvaluaciones: spreadsheet
        .fetch('evaluaciones')
        .then((resultados) => {
          return Ember.A(resultados).filterBy('postuladorId', params.id)
        })
        .then((resultados) => {
          return resultados.map((resultado) => {
            return {
              perfil: this.store.peekRecord('perfil', resultado.perfilId),
              resultado: resultado.resultado
            }
          })
        })
    });
  },

  afterModel(model) {
    console.log(model.resultadosEvaluaciones);

    if (!Ember.isNone(model.postulador.get('nombre'))) {
      this.set('breadCrumb', {
        title: model.postulador.get('nombre')
      });
    }
  }
});
