export const Procedure = {
    name: 'Procedure',
    properties: {
        'leg': 'string',
        'targetVessel': {type: 'string', optional: true},
        'isCTO': {type: 'bool', optional: true},
        'stenosisPercentage': {type: 'string', optional: true},
        'interventions': {type: 'string', optional: true},
    }
};