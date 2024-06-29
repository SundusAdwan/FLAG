//document.getElementById('exportDart').addEventListener('click', exportToDart);

/*
function exportToDart() {
    const pages = document.querySelectorAll('.page');
    let dartCode = '';

    pages.forEach((page, index) => {
        const elements = [];
        page.querySelectorAll('.placed').forEach(element => {
            const elementType = element.getAttribute('data-type');
            let elementCode = '';

            // Customize Dart code based on the element type
            switch (elementType) {
                case 'button':
                    elementCode = 'ElevatedButton(\n' +
                                  '    onPressed: () {},\n' +
                                  '    child: Text("${element.textContent.trim()}"),\n' +
                                  ')';
                    break;
                case 'text':
                    elementCode = 'Text("${element.textContent.trim()}")';
                    break;
                case 'image':
                    elementCode = `Image.network("${element.getAttribute('src')}")`;
                    break;
                default:
                    break;
            }

            if (elementCode) {
                elements.push(elementCode);
            }
        });

        if (elements.length > 0) {
            dartCode += '\n// Page ${index + 1}\n';
            dartCode += 'Column(\n';
            dartCode += '  children: [\n';
            dartCode += '    ' + elements.join(',\n    ') + '\n';
            dartCode += '  ],\n';
            dartCode += ')';
        }
    });

    // Download the Dart code as a .dart file
    const blob = new Blob([dartCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'exported_code.dart';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
*/


/*
async function exportToDart() {
    const pages = document.querySelectorAll('.page');
    let pageIndex = 0;
    let dartCode = '';

    pages.forEach((page, index) => {
        const elements = [];
        page.querySelectorAll('.placed').forEach(element => {
            const elementType = element.getAttribute('data-type');
            let elementCode = '';

            switch (elementType) {
                case 'button':
                    elementCode = 'ElevatedButton(\n' +
                                  '  onPressed: () {},\n' +
                                  '  child: Text("${element.textContent.trim()}"),\n' +
                                  ')';
                    break;
                case 'text':
                    elementCode = 'Text("${element.textContent.trim()}")';
                    break;
                case 'image':
                    elementCode = Image.network("${element.getAttribute('src')}");
                    break;
                default:
                    break;
            }

            if (elementCode) {
                elements.push(elementCode);
            }
        });

        if (elements.length > 0) {
            // Build a function for each page
            dartCode += 'Widget buildPage${pageIndex + 1}() {\n';
            dartCode += '  return ListView(\n';
            dartCode += '    children: [\n';
            dartCode += '      // Page ${pageIndex + 1}\n';
            dartCode += '      Column(\n';
            dartCode += '        children: [\n';
            dartCode += '          ' + elements.join(',\n          ') + '\n';
            dartCode += '        ],\n';
            dartCode += '      ),\n';
            dartCode += '    ],\n';
            dartCode += '  );\n';
            dartCode += '}\n\n';

            pageIndex++;
        }
    });

    // Build the main function that returns a MaterialApp
    dartCode += 'void main() {\n';
    dartCode += '  runApp(MyApp());\n';
    dartCode += '}\n\n';

    dartCode += 'class MyApp extends StatelessWidget {\n';
    dartCode += '  @override\n';
    dartCode += '  Widget build(BuildContext context) {\n';
    dartCode += '    return MaterialApp(\n';
    dartCode += '      title: \'Flutter Demo\',\n';
    dartCode += '      theme: ThemeData(\n';
    dartCode += '        primarySwatch: Colors.blue,\n';
    dartCode += '        visualDensity: VisualDensity.adaptivePlatformDensity,\n';
    dartCode += '      ),\n';
    dartCode += '      home: DefaultTabController(\n';
    dartCode += '        length: $pageIndex,\n';
    dartCode += '        child: Scaffold(\n';
    dartCode += '          appBar: AppBar(\n';
    dartCode += '            title: Text(\'Flutter Demo\'),\n';
    dartCode += '            bottom: TabBar(\n';
    dartCode += '              tabs: [\n';

    for (let i = 0; i < pageIndex; i++) {
        dartCode += '                Tab(text: "Page ${i + 1}"),\n';
    }

    dartCode += '              ],\n';
    dartCode += '            ),\n';
    dartCode += '          ),\n';
    dartCode += '          body: TabBarView(\n';
    dartCode += '            children: [\n';

    for (let i = 0; i < pageIndex; i++) {
        dartCode += '              buildPage${i + 1}(),\n';
    }

    dartCode += '            ],\n';
    dartCode += '          ),\n';
    dartCode += '        ),\n';
    dartCode += '      ),\n';
    dartCode += '    );\n';
    dartCode += '  }\n';
    dartCode += '}\n';

    // Download the Dart code as a .dart file
    const blob = new Blob([dartCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'exported_code.dart';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
*/

/*
document.getElementById('exportDart').addEventListener('click', async function() {
    const pages = document.querySelectorAll('.page');
    let dartCode = '';
    let pageIndex = 0;

    pages.forEach((page, index) => {
        const elements = [];
        page.querySelectorAll('.placed').forEach(element => {
            const elementType = element.getAttribute('data-type');
            let elementCode = '';

            switch (elementType) {
                case 'button':
                    elementCode = `ElevatedButton(
                        onPressed: () {},
                        child: Text("${element.textContent.trim()}"),
                    )`;
                    break;
                case 'text':
                    elementCode = `Text("${element.textContent.trim()}")`;
                    break;
                case 'image':
                    elementCode = `Image.network("${element.getAttribute('src')}")`;
                    break;
                default:
                    break;
            }

            if (elementCode) {
                elements.push(elementCode);
            }
        });

        if (elements.length > 0) {
            dartCode += `Widget buildPage${pageIndex + 1}(BuildContext context) {
                return Scaffold(
                    appBar: AppBar(
                        title: Text('Page ${pageIndex + 1}'),
                    ),
                    body: ListView(
                        children: [
                            Column(
                                children: [
                                    ${elements.join(',\n                                    ')},
                                ],
                            ),
                        ],
                    ),
                    floatingActionButton: FloatingActionButton(
                        onPressed: () {
                            Navigator.push(
                                context,
                                MaterialPageRoute(builder: (context) => buildPage${pageIndex + 2}(context)),
                            );
                        },
                        child: Icon(Icons.navigate_next),
                    ),
                );
            }\n\n`;
            pageIndex++;
        }
    });

    dartCode += `void main() {
        runApp(MyApp());
    }\n\n`;

    dartCode += `class MyApp extends StatelessWidget {
        @override
        Widget build(BuildContext context) {
            return MaterialApp(
                title: 'Flutter Demo',
                theme: ThemeData(
                    primarySwatch: Colors.blue,
                    visualDensity: VisualDensity.adaptivePlatformDensity,
                ),
                home: buildPage1(context),
            );
        }
    }\n`;

    window.dartCode = dartCode; // حفظ dartCode في window ليكون متاحاً عالمياً

    const blob = new Blob([dartCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'exported_code.dart';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);



    

    
});



document.getElementById('exportApk').addEventListener('click', async function() {
    if (!window.dartCode) {
        alert('Please generate the Dart code first!');
        return;
    }

    try {
        const response = await fetch('https://api.fluttercompiler.com/compile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: window.dartCode
            })
        });

        if (!response.ok) {
            throw new Error('Failed to compile the APK');
        }

        const blob = await response.blob();
        const formData = new FormData();
        formData.append("file", blob, "app.apk");

        const uploadResponse = await fetch('http://example.com/upload_apk', {
            method: 'POST',
            body: formData
        });

        if (!uploadResponse.ok) {
            throw new Error('Failed to upload APK');
        }

        const uploadData = await uploadResponse.json();
        console.log(uploadData);
        alert('APK has been successfully compiled and uploaded!');
    } catch (error) {
        console.error('Error:', error);
        alert('Error compiling or uploading APK: ' + error.message);
    }
});



*/












/*


document.getElementById('exportApk').addEventListener('click', async function() {
    if (!window.dartCode) {
        alert('Please generate the Dart code first!');
        return;
    }

    try {
        const response = await fetch('https://api.fluttercompiler.com/compile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dartCode: window.dartCode
            })
        });

        if (!response.ok) {
            throw new Error('Failed to compile the APK');
        }

        const blob = await response.blob();
        const formData = new FormData();
        formData.append("file", blob, "app.apk");

        const uploadResponse = await fetch('http://example.com/upload_apk', {
            method: 'POST',
            body: formData
        });

        if (!uploadResponse.ok) {
            throw new Error('Failed to upload APK');
        }

        const uploadData = await uploadResponse.json();
        console.log(uploadData);
        alert('APK has been successfully compiled and uploaded!');
    } catch (error) {
        console.error('Error:', error);
        alert('Error compiling or uploading APK: ' + error.message);
    }
});

*/