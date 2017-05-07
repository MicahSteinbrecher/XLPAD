export const Procedure = {
    name: 'Procedure',
    properties: {
        'leg': 'string',
        'targetVessel': 'string',
        'isCTO': 'bool',
        'stenosisPercentage': {type: 'string', optional: true},
        'interventions': 'string'
    }
};