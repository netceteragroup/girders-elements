'use strict'

import invariant from 'invariant'
import * as U from './util'
import * as E from './extensions'
import * as S from './system'

/**
 * Slots defined in this module
 * @namespace
 */
export const slots = {
  /** The unit extension slot */
  runtime: Symbol('runtime'),
}

/**
 * Creates a runtime extension. Runtimes are objects, usually keeping some kind
 * of state within.
 *
 * The runtime can have optional start and stop methods which are invoked on
 * system startup and shutdown.
 *
 * Runtime must be additionally named so that they can be accessed individually.
 *
 * @param {symbol} name -  name for the runtime
 * @param {E.Deps} [deps] - the dependencies of this runtime
 * @param {RuntimeFactory} def - the definition of the Unit
 */
export const runtime = (name, deps, def) => {
  if (def == null) {
    def = deps
    deps = undefined
  }

  invariant(U.isSymbol(name), 'Name must be a symbol')
  invariant(
    typeof def === 'function',
    'An extension factory fn must be provided'
  )

  return U.flow(
    def,
    E.ext(slots.runtime),
    E.named(name),
    U.when(() => deps != null, E.using(deps))
  )
}

export const start = sys => {
  invariant(() => S.isSystem(sys), 'You must provide a system')

  // TODO: this is wrong, runtimes need to be started in topological order,
  // taking into account the whole system definition => we need a
  // topologicalQuery fn in system
  for (const r of S.query([slots.runtime], system)) {
    if (r.start != null) r.start()
  }
}

export const stop = sys => {
  invariant(() => S.isSystem(sys), 'You must provide a system')

  for (const r of S.query([slots.runtime], system)) {
    if (r.start != null) r.stop()
  }
}