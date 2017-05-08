import { Procedure } from './Procedure'
export const Case = {
    name: 'Case',
    primaryKey: 'id',
    properties: {
        id: 'string',
        dateTimeCreated: 'string',
        dateOfProcedure: 'string',
        age:  {type: 'string', optional: true},
        rutherfordCategory: {type: 'string', optional: true},
        leftABI: {type: 'string', optional: true},
        rightABI: {type: 'string', optional: true},
        targetLimbs: {type: 'string', optional: true},
        targets: 'string',
        success: {type: 'string', optional: true},
        procedures: {type: 'list', objectType: 'Procedure'},
        complications: {type: 'string', optional: true},
        comment: {type: 'string', optional: true},
    }
};