import { Procedure } from './Procedure'
import { Complication } from './Complication'
export const Case = {
    name: 'Case',
    primaryKey: 'id',
    properties: {
        id: 'string',
        dateOfProcedure: 'string',
        name:  'string',
        age:  {type: 'string', optional: true},
        institution: 'string',
        rutherfordCategory: {type: 'string', optional: true},
        leftABI: {type: 'string', optional: true},
        rightABI: {type: 'string', optional: true},
        targetLimbs: 'string',
        targets: 'string',
        success: {type: 'string', optional: true},
        procedures: {type: 'list', objectType: 'Procedure'},
        complications: {type: 'string', optional: true},
        comment: {type: 'string', optional: true},
    }
};