import { Case } from './Complication'
export const Patient = {
    name: 'Patient',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        dateTimeCreated: 'int',
        dateTimeUpdated: 'int',
        cases: {type: 'list', objectType: 'Case'}
    }
};