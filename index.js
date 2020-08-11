const axios = require('axios');
const firebase = require('firebase');
// Your web app's Firebase configuration
// DELTED FOR GITHUB
var firebaseConfig = {
    
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const pushToFirebase = (record) => {
    const db = firebase.firestore();
    db.collection("courts").add({
        courtName: record.courtName,
        address: record.address,
        city: record.city,
        state: record.stateName,
        notes: record.notes,
        fileUrl: record.fileUrl,
        addedBy: record.addedBy
    });
}

const getValues = (records) =>{
    for(let i = 0; i < records.length; i ++){
        const obj = {};
        const courtObj = {}
        const addressObj = {}
        const citObj = {}
        const stateNameObj = {}
        const notesObj = {}
        const fileUrlObj = {}
        const addedByObj = {}

        let courtName = records[i].fields.CourtName;
        let address = records[i].fields.Address;
        let city = records[i].fields.City;
        let stateName = records[i].fields.State;
        let notes = records[i].fields.Notes;
        let addedBy = records[i].fields.addedBy;
        console.log(addedBy)
        if(!courtName){
            console.log('courtName')
            courtName=''
        }
        if(!address){
            console.log('address')
            address=''
        }
        if(!city){
            console.log('city')
            city=''
        }
        if(!stateName){
            console.log('stateName')
            stateName=''
        }
        if(!notes){
            console.log('notes')
            notes=''
        }
        if(!addedBy){
            console.log('addedBy')
            addedBy=''
        }
        console.log(typeof(addedBy))

        // Have to take these weird steps because of React data format
        console.log(courtName, address, city, stateName, notes, addedBy)
        courtObj['courtName'] = courtName;
        addressObj['address'] = address;
        citObj['city'] = city;
        stateNameObj['stateName'] = stateName;
        notesObj['notes'] = notes;
        addedByObj['addedBy'] = addedBy;
        fileUrlObj['fileUrl'] = '';

        obj['courtName'] = courtObj;
        obj['address'] = addressObj;
        obj['city'] = citObj;
        obj['stateName'] = stateNameObj;
        obj['notes'] = notesObj;
        obj['fileUrl'] = fileUrlObj;
        obj['addedBy'] = addedByObj;
        // DO NOT RUN THIS UNLESS YOU DELETE EVERYTHING AND NEED THE BACKUP FROM AIRTABLE!!!
        // pushToFirebase(obj);
    }
}


const getAirtable = async () =>{
    axios.get('https://api.airtable.com/v0/appjyMXOqoycnrEuE/Courts?api_key=key2pwgbWEa0fij6e')
        .then((response) =>{
            const records = response.data.records;
            getValues(records);
        })
        .catch((e)=>{
            console.log(e)
        })
}
getAirtable();