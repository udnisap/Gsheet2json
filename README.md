Gsheet2json
===========

A Java script object to easily read from publicly hosted Google spreadsheets. You can use it as a database for your web application


###Quick Start

1.  Download and include [gsheet2json.js](https://raw.github.com/rumal/Gsheet2json/master/js/gsheet2json.js) to your project.
2.  <pre><code>
var sheet = new spreadSheet(
                    {url to the publicly hosted spreadsheet},
                    {fieldlist as an array},
                    {success function}
          );
</code></pre>
3. Use `sheet.getAsArray()` or `sheet.getAsObjects()`


###Example
```
<script type="text/javascript" src="js/gsheet2json.js"></script>
<script>
  var fields = ["URL", "Speaker", "Name", "Short Summary", "Event","Duration", "Publish date"];
  var sheet = new spreadSheet(
      "https://docs.google.com/spreadsheet/ccc?key=0AsKzpC8gYBmTcGpHbFlILThBSzhmZkRhNm8yYllsWGc&gid=0",
      fields,
      function(data) {
         console.log(data.getAsObjects());
         console.log(data.getAsArray());
      });
</script>
```
