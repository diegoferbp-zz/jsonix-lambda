'use strict';

//const Jsonix = require('jsonix').Jsonix;
const AWS = require('aws-sdk')
var s3client = new AWS.S3();
//var pacs008 = require('./resources/pacs008').pacs008;
//const pacs008jsonsample = require('./resources/pacs008-json-sample');
//var context = new Jsonix.Context([pacs008]);
//var marshaller = context.createMarshaller();
//var unmarshaller = context.createUnmarshaller();
const parser = require('xml2json');
const fs = require("fs")
const xml2js = require('xml2js');


module.exports.hello = async event => {
    /**
      await unmarshaller.unmarshalFile('./1_ICF_pacs.008.001.07.xml',
          // This callback function will be provided
          // with the result of the unmarshalling
          function(unmarshalled) {
              // Alice Smith
              console.log(JSON.stringify(unmarshalled));
          });
          */
    //console.log(document);
    let docXML = marshaller.marshalString(await pacs008jsonsample.getTestDocument(event.carga));
    //console.log(docXML);

    let s3params = {
        Bucket: `diegoferbp-myaws-poc-infra-us-east-1`, // nombre del bucket
        Key: `test/jsonix-lambda/${ new Date().getTime() }.xml`,
        Body: docXML,
        ServerSideEncryption: 'AES256'
    };
    try {
        await s3client.upload(s3params).promise();
        return getResponse(event);
    } catch (eS3) {
        throw eS3;
    }
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.unmarshallerXml2Json = async event => {
    let start = new Date().getTime();
    let xml = await getFileString(event.dc, event.filename);
    let afterReading = new Date().getTime();
    console.log(`time reading ${ (afterReading - start) }`);
    var data = parser.toJson(xml);
    let afterUnmarshalling = new Date().getTime();
    console.log(`time unmarshalling ${ (afterUnmarshalling - afterReading) }`);
    await uploadDataJson(data);
    let afterUpload = new Date().getTime();
    console.log(`time upload ${ (afterUpload - afterUnmarshalling) }`);
    return getResponse(event)
}


module.exports.unmarshallerXml2Js = async event => {
    let start = new Date().getTime();
    let xml = await getFileString(event.dc, event.filename);
    let afterReading = new Date().getTime();
    console.log(`time reading ${ (afterReading - start) }`);
    let data = await xml2js.parseStringPromise(xml);
    let afterUnmarshalling = new Date().getTime();
    console.log(`time unmarshalling ${ (afterUnmarshalling - afterReading) }`);
    await uploadDataJson(data);
    let afterUpload = new Date().getTime();
    console.log(`time upload ${ (afterUpload - afterUnmarshalling) }`);
    return getResponse();
}

let getFileString = async(dc, filename) => {
    if (dc === 'local') {
        var xml = fs.readFileSync('./1_ICF_pacs.008.001.07.xml', 'utf8');
    } else {
        let s3params = {
            Bucket: `diegoferbp-myaws-poc-infra-us-east-1`, // nombre del bucket
            Key: `test/jsonix-lambda/${ filename }`
        };
        let data = await s3client.getObject(s3params).promise();
        xml = data.Body.toString('utf-8');

    }
    return xml;
}


let getResponse = async event => {
    return {
        statusCode: 200,
        body: JSON.stringify({
                message: 'Go Serverless v1.0! Your function executed successfully!',
                input: event,
            },
            null,
            2
        ),
    };
}
let uploadDataJson = async(data) => {
    try {
        let s3params = {
            Bucket: `diegoferbp-myaws-poc-infra-us-east-1`, // nombre del bucket
            Key: `test/jsonix-lambda/${ new Date().getTime() }.json`,
            Body: JSON.stringify(data),
            ServerSideEncryption: 'AES256'
        };
        await s3client.upload(s3params).promise();
    } catch (eS3) {
        throw eS3;
    }
}

this.unmarshallerXml2Js({ dc: "local" }).then((respuesta) => {
    console.log(respuesta);
}, err => console.log(err))