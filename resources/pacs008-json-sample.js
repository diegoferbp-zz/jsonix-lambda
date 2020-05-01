const testTx = {
    "pmtId": {
        "instrId": "0005006008-00900010401",
        "endToEndId": "999999401",
        "txId": "1810110000401"
    },
    "pmtTpInf": {
        "svcLvl": {
            "cd": "SEPA"
        },
        "lclInstrm": {
            "prtry": "PPD"
        },
        "ctgyPurp": {
            "cd": "CASH"
        }
    },
    "intrBkSttlmAmt": {
        "ccy": "USD",
        "value": 200
    },
    "chrgBr": "SLEV",
    "dbtr": {
        "nm": "Fabricio Zapata",
        "id": {
            "prvtId": {
                "othr": [{
                    "id": "06018234539401"
                }]
            }
        },
        "ctryOfRes": "PA"
    },
    "dbtrAcct": {
        "id": {
            "othr": {
                "id": "0005006008401"
            }
        }
    },
    "dbtrAgt": {
        "finInstnId": {
            "bicfi": "BATLANTI"
        }
    },
    "cdtrAgt": {
        "finInstnId": {
            "bicfi": "BCARIBBE"
        }
    },
    "cdtr": {
        "nm": "Patricia Torres Org.",
        "id": {
            "orgId": {
                "othr": [{
                    "id": "5009956234401"
                }]
            }
        },
        "ctryOfRes": "EC"
    },
    "cdtrAcct": {
        "id": {
            "othr": {
                "id": "5004234592401"
            }
        }
    },
    "purp": {
        "cd": "ADVA"
    },
    "rmtInf": {
        "ustrd": [
            "Información adicional del pago 1"
        ]
    }
};

getTxList = async(transaccions) => {
    let txList = new Array(transaccions);
    for (let i = 0; i < transaccions; i++) {
        txList.push(testTx);
    }
    return txList;
}

getTestDocument = async(transaccions) => {
    return {
        "name": {
            "localPart": "Document",
        },
        "value": {
            "TYPE_NAME": "pacs008.Document",
            "fiToFICstmrCdtTrf": {
                "grpHdr": {
                    "msgId": "BATLANTI18101100000004",
                    "creDtTm": {
                        "year": 2018,
                        "month": 10,
                        "day": 11,
                        "hour": 0,
                        "minute": 0,
                        "second": 0,
                        "fractionalSecond": 0,
                        "timezone": -300,
                    },
                    "nbOfTxs": "2",
                    "ttlIntrBkSttlmAmt": {
                        "ccy": "USD",
                        "value": 600
                    },
                    "intrBkSttlmDt": {
                        "year": 2018,
                        "month": 10,
                        "day": 11,
                        "hour": null,
                        "minute": null,
                        "second": null,
                        "fractionalSecond": null,
                        "timezone": null,
                    },
                    "sttlmInf": {
                        "sttlmMtd": "CLRG",
                        "clrSys": {
                            "prtry": "ACH"
                        }
                    },
                    "instgAgt": {
                        "finInstnId": {
                            "bicfi": "BATLANTI"
                        }
                    }
                },
                "cdtTrfTxInf": await getTxList(transaccions)
            }
        }
    };
}


module.exports = {
    getTestDocument
};