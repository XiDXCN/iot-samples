function processArray(obj, arraykeys, keyIndex)
{
    obj.keys.forEach(function (key) {
        if (arraykeys[keyIndex] == key) {
            if (Array.isArray(obj[key])) {
                var i = 0;
                while (i < obj[key].length) {
                    if (Array.isArray(obj[key][i])) {
                        processArray(obj[key][i], arraykeys, arrIndex);
                    }
                    else {
                        msgToSend.push(obj[key][i]);
                    }
                    i++;
                }
            }
            if (keyIndex < arraykeys.length)
            {
                keyIndex++;
            }
            
        }
    });
}

function processMsg(msg)
{
    var obj = JSON.parse(msg);
    // ****//
    var arraykeys = config.splitby.split("[.]")



    

    if (arraykeys.length == 1 && arraykeys[0].length <= 0) {
        if (Array.isArray(obj)) {
            var i = 0
            while (i < obj.length) {
                msgToSend.push(obj[i]);
                i++;

            }
        }
        else {
            console.log('JSON object does not match with the config provided');
        }
    }

    if (arraykeys.length == 1 && arraykeys[0].length > 0) {

        var i = 0;
        obj.keys.forEach(function (key) {
            if (key == arraykeys[0]) {
                if (Array.isArray(obj[key])) {
                    while (i < obj[key].length) {
                        msgToSend.push(obj[key][0]);
                        i++;
                    }
                }
                else {
                    console.log("JSON object does not match with the config provided");
                }

            }
        });


    }
    if (arraykeys.length > 1) {
        var arrIndex = 0
        obj.keys.forEach(function (key) {
            if (arraykeys[arrIndex] == key) {
                if (Array.isArray(obj[key])) {
                    var i = 0;
                    while (i < obj[key].length)
                    {
                        if (Array.isArray(obj[key][i])) {
                            processArray(obj[key][i], arraykeys, arrIndex);
                        }
                        else {
                            msgToSend.push(obj[key][i]);
                        }
                        i++;
                   }
                }
                arrIndex++;
            }
        });
    }

}
var fs = require('fs');
// Provide the hierarcy by which you would like to split the array. For each keyname it will assume as an array
// following are some of the sample configs
// Split by Unnamed root array: [{"element1":"value1","element2":"value2"},{"element11":"value11","element21":"value21"},{"element12":"value12","element22":"value22"}]  the config will be {splitby:''
// Split by named root array:i {"root":[{"e1":"v1","e2":"v2"},{"e1":"v11","e2":"v21"},{"e1":"v12","e2":"v22"}]} the config would be {splitby:'root'}
// Array: [{"r":[{"a1":[{"e1":"v1},{"e2":"v2"}]},{"a1":[{"e1":"v11"},{"e2:"v21""}]},{"a1":[{"e1":"v12"},{"e2:"v22""}]}]}] the config would be {splitby:'r[.]a1'}
// Array: [{"r":[{"a1":[{"a2":[{"e1":"v1","e2":"v2"}]} ,{"a1":[{"e1":"v11","e21":"v21"}] },{"a1":[{"e1":"v12","e21":"v22"}] } }] the config would be {splitby:'r[.]a1[.]a2'}
// Array: [{"r":[{"a1":[{"e1":"v1","e2":"v2"},{"e1":"v11","e2":"v21"},{"e1":"v12","e2":"v22"} ]}]} the config would be {splitby:'r[.]a1[.]'}

//var config = { splitby: 'keyname1[.]keyname2[.]keyname3[.]' }
var config = {splitby:'root[.]a1'}
console.log("parsing array sample 1");
// Modify this part to read from IoT Hub
//var file1 = fs.readFileSync('sample1.json');
var file1 = fs.readFileSync('sample2.json');
//var file1 = fs.readFileSync('sample3.json');

var msgToSend = []

processMsg(file1);

var x = 0;
while (x < msgToSend.length)
{
    console.log(msgToSend[x]);
}




/*
arraykeys.forEach(function (key) {
    console.log("key " + ":" + key);
});
*/
/*
console.log("object array is array " + Array.isArray(obj));

console.log("object length " + obj.length);
var i = 0;
while (i < obj.length) {
    Object.keys(obj[i]).forEach(function (key) {
        var value = obj[i][key];
        console.log("Object " + i);
        console.log(key + ":" + value);
        // sending the message as individual message to an event hub

    });
    i++;
}*/

