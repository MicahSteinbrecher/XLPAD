import { Patient } from './models/Patient';
import { Case } from './models/Case';
import { Complication } from './models/Complication';
import { Procedure } from './models/Procedure';
import { Institution } from './models/Institution';
import stringifyObject from 'stringify-object';
import Realm from 'realm'

var realm = new Realm({schema: [Case, Procedure, Complication, Patient, Institution]});

export function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    return yyyy+'-'+mm+'-'+dd;
}

export function getMinDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear()-100;

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    return yyyy+'-'+mm+'-'+dd;
}

export function getMaxDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear()+100;

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    return yyyy+'-'+mm+'-'+dd;
}


/*returns list of existing patient names*/
export function getPatients(){
    var data = realm.objects('Patient');
    var patients = [];
    for (var i in data){
        patients.push(data[i].name);
    }
    return patients;
}

/*returns list of existing institutions*/
export function getInstitutions(){
    var data = realm.objects('Institution').slice();
    var institutions = [];
    for (var i in data){
        institutions.push(data[i].name);
    }
    return institutions;
}

/*takes case procedures and returns a string containing the cases target vessels*/
export function getTargets(procedures){
    var result = '';
    if (procedures.length==0){
        return 'No Lesions Specified'
    }
    for (var i=0; i < procedures.length; i++) {
        if (i+1 == procedures.length) {
            return result += procedures[i].leg + ' ' + procedures[i].targetVessel
        }
        result += procedures[i].leg + ' ' + procedures[i].targetVessel + ', '
    }
}

export function getCases(vessel, intervention){
    var cases = realm.objects('Case').slice();
    var result = []
    if (vessel != '' && intervention != ''){
        for (var i in cases){
            if (cases[i].targets.toLowerCase().includes(vessel.toLowerCase()) ){
                for (var j in cases[i].procedures){
                    if (cases[i].procedures[j].interventions.includes(intervention)){
                        result.push(cases[i])
                        break;
                    }
                }
            }
        }
        return result.map(x => Object.assign({}, x));
    }

    if (vessel != ''){
        for (var i in cases){
            if (cases[i].targets.toLowerCase().includes(vessel.toLowerCase())){
                result.push(cases[i])
            }
        }
        return result.map(x => Object.assign({}, x));
    }
    if (intervention != ''){
        for (var i in cases){
            for (var j in cases[i].procedures){
                if (cases[i].procedures[j].interventions.includes(intervention)){
                    result.push(cases[i])
                    break;
                }
            }
        }
        return result.map(x => Object.assign({}, x));
    }

    return []
}

export function splitVar(str) {
    var title = str.split(/(?=[A-Z])/);
    for (var i in title) {
        title[i] = title[i].charAt(0).toUpperCase() + title[i].slice(1);
    }
    return title.join(' ');
}

export function toString(obj) {
    if (obj !== null) {
        if (typeof obj === 'object') {
            return caseToString(obj.slice());
        }
        return obj.toString();
    }
    return null
}

function caseToString(obj) {
    var result = '';

    for (var i in obj) {
        result += 'Leg: ' + obj[i].leg + '\n' + 'Target Vessel: ' + obj[i].targetVessel + '\n' + 'Interventions: ' + obj[i].interventions + '\n' + 'CTO: ' + obj[i].isCTO;
        if (!obj[i].isCTO) {
            result += '\n' + 'Stenosis Percentage: ' + obj[i].stenosisPercentage;
        }
        if (parseInt(i)+1 != obj.length){
            result += '\n\n';
        }
    }
    return result
}