import { update as _update } from 'services/actions/collections'

/**
 * Update a setting field of the collection
 * @param {string} scene - scene of the collection
 * @param {number} pk - pk of the collection
 * @param {string} field - field we want to update
 * @param {*} value - value of the new field
 * @returns {Action} - asynchronous action to dispatch
 */
export const update = (scene, pk, field, value) => {
  const data = {
    [field]: value
  };
  return _update(scene, pk, data);
};