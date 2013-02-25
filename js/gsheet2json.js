/**
 * GSpreadSheet2json - A JavaScript Module to convert Google Spreadsheet to json objects or arrays
 * 
 * @author : Pasindu Perera
 * @email : perera.pasindu@gmail.com
 * @website : http://rumal.github.com/Gsheet2json/
 *
 */
var spreadSheet = (spreadSheet) || function(spreadSheetURL, fields, success) {
    var key = getKey(spreadSheetURL);
    var apiCallURL = "https://spreadsheets.google.com/feeds/list/{key}/od6/public/values?alt=json&callback=?"
            .replace("{key}", key);
    var fields = (fields) ? fields : [];
    var data = [];
    var dataReady = false;

    function getKey(spreadSheetURL) {
        return spreadSheetURL.match(/key=([^&]*)/)[1];
    }

    function generateFields(data) {
        //TODO
         throw new Error("Not yet implemented");
    }
    
    function prepareField(field){
        return field.replace(/\s/,"").toLowerCase();
    }
    
    function getJSONP(url) {
        var ud = '_spreadSheetCallBack' + +new Date,
                script = document.createElement('script'),
                head = document.getElementsByTagName('head')[0]
                || document.documentElement;

        window[ud] = function(data) {
            head.removeChild(script);
            callBack(data);
        };

        script.src = url.replace('callback=?', 'callback=' + ud);
        head.appendChild(script);

    }

    function callBack(response) {
        fields = (fields.length > 0) ? fields : generateFields();
        response = response.feed.entry;
        data = [];
        for (var i = 0; i < response.length; i++) {
            var element = response[i];
            var obj = {};
            for (var j = 0; j < fields.length; j++) {
                var field = fields[j];
                obj[field] = element["gsx$" + prepareField(field)].$t || prepareField(field) + " not found on the datasheet";
            }
            data.push(obj);
        }
        dataReady = true;
        success(retValue);
    }
    var retValue = {
        getKey: function() {
            return key;
        },
        getFields: function() {
            return fields;
        },
        getAsObjects: function() {
            if (!dataReady)
                throw new Error("Called before the data is returned from the server");
            return data;
        },
        getAsArray: function() {
            if (!dataReady)
                throw new Error("Called before the data is returned from the server");
            var asArray = [];
            for (var i = 0; i < data.length; i++) {
                var line = data[i];
                var inner = [];
                for (var j = 0; j < fields.length; j++) {
                    var field = fields[j];
                    if (line.hasOwnProperty(field)) {
                        inner.push(line[field]);
                    }
                }
                asArray.push(inner);
            }
            return asArray;
        }
    };

 getJSONP(apiCallURL);
    return retValue;
};
