let currentPage = 1;

document.getElementById("nextPage").addEventListener("click", function() {
    safeChangePage(currentPage + 1);
});

document.getElementById("prevPage").addEventListener("click", function() {
    safeChangePage(currentPage - 1);
});

function safeChangePage(newPage) {
    try {
        changePage(newPage);
    } catch (error) {
        console.error("Failed to change page:", error);
    }
}

function changePage(newPage) {
    currentPage = Math.max(1, Math.min(newPage, 10)); // قم بتعديل الحدود كما تريد
    
    updatePage();
}

function updatePage() {
    const totalPages = document.getElementById("totalPages");
    const currentPageSpan = document.getElementById("currentPage");
    const container = document.getElementById("container");
    
    currentPageSpan.innerText = currentPage;
    totalPages.innerText = currentPage;

    // تحقق من وجود الصفحات الحالية وأضف فقط الصفحات المفقودة
    let existingPages = container.querySelectorAll('.page');
    let existingPagesCount = existingPages.length;

    // إزالة الت الزائدة ذ كانت موجودة
    while (existingPagesCount > currentPage) {
        container.removeChild(existingPages[existingPagesCount - 1]);
        existingPagesCount--;
    }

    // إضافة الصفحات الجديدة فقط
    for (let i = existingPagesCount + 1; i <= currentPage; i++) {
        const page = document.createElement("div");
        page.className = "page";
        page.id = "page" + i;
        page.setAttribute('data-page-name', "صفحة");
        page.setAttribute('data-page-number', i);
        container.appendChild(page);
    }
}


document.getElementById("addPage").addEventListener("click", function() {
    currentPage++;
    updatePage();
});

const menuButton = document.getElementById("addPage");
const pageList = document.getElementById("pageList");

menuButton.addEventListener("click", function() {
    pageList.style.display = pageList.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", function(e) {
    if (e.target.id !== "pageList" && !pageList.contains(e.target)) {
        pageList.style.display = "none";
    }
});

document.getElementById("container").addEventListener("click", function(e) {
    if (e.target.classList.contains("page")) {
        currentPage = parseInt(e.target.textContent.split(" ")[1]);
        updatePage();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var dropdown = document.getElementsByClassName("dropdown-btn");
    for (var i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }

    const leftMenu = document.querySelector('.left-menu');
    const toggleMenuButton = document.querySelector('.menu-toggle-btn');
});




function enableDraggableElements() {
    const draggableElements = document.querySelectorAll('.draggable');
    const container = document.getElementById('container');
    draggableElements.forEach(element => {
        element.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', e.target.id);
            e.dataTransfer.setData('data-type', e.target.getAttribute('data-type'));
        });
    });

    container.addEventListener('dragover', function(e) {
        e.preventDefault(); // Necessary to allow dropping
    });






    
    container.addEventListener('drop', function(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const dataType = e.dataTransfer.getData('data-type');
        const draggableElement = document.getElementById(data);
        const clone = draggableElement.cloneNode(true);
        
        clone.innerText = '';

        container.appendChild(clone);
        // Determine the current page based on the viewport visibility
        const pages = document.querySelectorAll('.page');
        let currentPage = null;
        let maxVisibleHeight = 0;
        
        pages.forEach(page => {
            const rect = page.getBoundingClientRect();
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
            if (visibleHeight > maxVisibleHeight) {
                maxVisibleHeight = visibleHeight;
                currentPage = page;
            }
        });

        if (!currentPage) {
            console.error('No visible page found to drop the element.');
            return;
        }

        const currentPageIndex = Array.from(pages).indexOf(currentPage) + 1;
        clone.id = `clone_${data}_${currentPageIndex}`; // Unique ID for each page
        clone.classList.add('placed'); // Class to style placed elements

        // Ensure the element does not overflow the page boundaries
        const pageRect = currentPage.getBoundingClientRect();
        const dropX = e.clientX - pageRect.left; // X position within the page
        const dropY = e.clientY - pageRect.top;  // Y position within the page

        // Adjust position to stay within the page
        const maxRight = pageRect.width - clone.offsetWidth;
        const maxBottom = pageRect.height - clone.offsetHeight;
        clone.style.left = `${Math.min(maxRight, dropX)}px`;
        clone.style.top = `${Math.min(maxBottom, dropY)}px`;




        
        // تعريف كائن widgetCreators مع بعض العناصر الجديدة
const widgetCreators = {
    'ٌStack': function() {
        const button = document.createElement('button');
        button.textContent = 'Click Me';
        button.style.padding = '10px 20px';
        button.style.margin = '5px';
        return button;
    },
    'Column': function() {
        const textField = document.createElement('input');
        textField.type = 'text';
        textField.placeholder = 'Enter text here...';
        textField.style.padding = '10px';
        textField.style.margin = '5px';
        return textField;
    },
    // يمكن إضافة المزيد من العناصر هنا
};


       



        switch (dataType) {
        
        case 'Container':
          const container = document.createElement('div');
          container.style.width = '100%';
          container.style.minHeight = '100px';
          container.style.border = '3px solid #ccc';
          container.style.padding = '10px';
          container.style.marginTop = '5px';
          container.style.backgroundColor = '#f9f9f9';
          container.style.boxSizing = 'border-box';
          container.style.overflow = 'hidden'; // Ensure contents do not overflow

          // Allow dragging and dropping of elements into the container
          container.addEventListener('dragover', function(event) {
              event.preventDefault(); // Allow the drop
          });

          container.addEventListener('drop', function(event) {
              event.preventDefault();
              const data = event.dataTransfer.getData('text/plain');
              const draggableElement = document.getElementById(data);
              if (draggableElement) {
                  const clone = draggableElement.cloneNode(true);
                  container.appendChild(clone);
                  // Update container height to expand as new elements are added
                  container.style.minHeight = `${container.offsetHeight + clone.offsetHeight}px`;
              }
          });

          // Dynamically add elements based on dataType
          Object.keys(widgetCreators).forEach(type => {
              if (type !== 'Container') { // Prevent recursive Container within Container
                  const childElement = widgetCreators[type]();
                  container.appendChild(childElement);
              }
          });

          clone.appendChild(container);
         


          /*  const container = document.createElement('div');
            container.style.width = '100%';
            container.style.minHeight = '100px';
            container.style.border = '3px solid #ccc';
            container.style.padding = '10px';
            container.style.marginTop = '5px';
            container.style.backgroundColor = '#f9f9f9';
            container.style.boxSizing = 'border-box';
            */

            // Allow dragging and dropping of elements into the container
           /* container.addEventListener('dragover', function(event) {
                event.preventDefault(); // Allow the drop
            });*/

           /* container.addEventListener('drop', function(event) {
                event.preventDefault();
                const data = event.dataTransfer.getData('text/plain');
                const draggableElement = document.getElementById(data);
                if (draggableElement && container.contains(event.target)) {
                    const clone = draggableElement.cloneNode(true);
                    container.appendChild(clone);
                    // Update container height to expand as new elements are added
                    container.style.minHeight = `${container.offsetHeight + clone.offsetHeight}px`;
                }
            });*/

           /* // Dynamically add elements based on dataType
            Object.keys(widgetCreators).forEach(type => {
                if (type !== 'Container') { // Prevent recursive Container within Container
                    const childElement = widgetCreators[type]();
                    container.appendChild(childElement);
                }
            });*/

          //  clone.appendChild(container);
            break;
          
            
        case 'Elevated_but':
                const elevatedButton = document.createElement('button');
                elevatedButton.style.padding = '10px 20px';
                elevatedButton.style.border = 'none';
                elevatedButton.style.backgroundColor = '#007BFF';
                elevatedButton.style.color = 'white';
                elevatedButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
                elevatedButton.style.borderRadius = '5px';
                elevatedButton.style.cursor = 'pointer';
                elevatedButton.textContent = 'Elevated Button';
                elevatedButton.contentEditable = 'true'; // Allows the button text to be editable
                clone.appendChild(elevatedButton);
                break;
     
        case 'Text':
                const textElement = document.createElement('p');
                textElement.style.color = 'black';
                textElement.style.fontSize = '16px';
                textElement.style.fontFamily = 'Arial, sans-serif';
                textElement.style.textAlign = 'left';
                textElement.style.margin = '10px';
                textElement.textContent = 'Sample Text';
                textElement.contentEditable = 'true'; // Allows the text to be editable
                clone.appendChild(textElement);
                break;
            
            
        case 'Text_Field':
            const textField = document.createElement('input');
            textField.type = 'text';
            textField.style.width = '100%';
            textField.style.padding = '10px';
            textField.style.marginTop = '5px';
            textField.style.border = '1px solid #ccc';
            textField.style.borderRadius = '4px';
            textField.placeholder = 'Enter text here...';
            textField.contentEditable = 'true'; // Allows the text field content to be editable
            clone.appendChild(textField);
            break;

            
            
        case 'Rich_Text':
            const richTextEditor = document.createElement('div');
            richTextEditor.style.width = '100%';
            richTextEditor.style.minHeight = '200px';
            richTextEditor.style.border = '1px solid #ccc';
            richTextEditor.style.padding = '10px';
            richTextEditor.style.marginTop = '5px';
            richTextEditor.style.backgroundColor = '#fff';
            richTextEditor.contentEditable = 'true';
            richTextEditor.innerHTML = '<p>Enter rich text here...</p>';
            richTextEditor.style.overflowY = 'auto';
            

            // Adding basic styling tools for the rich text editor
            const toolbar = document.createElement('div');
            toolbar.style.padding = '5px';
            toolbar.style.borderBottom = '1px solid #ccc';
            toolbar.style.marginBottom = '5px';

            // Example: Adding a bold button to the toolbar
            const boldButton = document.createElement('button');
            boldButton.textContent = 'B';
            boldButton.style.fontWeight = 'bold';
            boldButton.style.marginRight = '5px';
            boldButton.onclick = function() {
                document.execCommand('bold', false, null);
            };
            toolbar.appendChild(boldButton);

            // Example: Adding an italic button to the toolbar
            const italicButton = document.createElement('button');
            italicButton.textContent = 'I';
            italicButton.style.fontStyle = 'italic';
            italicButton.onclick = function() {
                document.execCommand('italic', false, null);
            };
            toolbar.appendChild(italicButton);

            // Append the toolbar to the rich text editor
            richTextEditor.insertBefore(toolbar, richTextEditor.firstChild);

            clone.appendChild(richTextEditor);
            break;
           
        case 'Image':
            const imageElement = document.createElement('img');
            imageElement.style.width = '100%';
            imageElement.style.height = 'auto';
            imageElement.style.border = '1px solid #ccc';
            imageElement.style.padding = '5px';
            imageElement.style.marginTop = '5px';
            imageElement.alt = 'User provided image';
            imageElement.src = ''; // Placeholder for image source

            // Event listener to handle image source input from user
            const imageInput = document.createElement('input');
            imageInput.type = 'file';
            imageInput.accept = 'image/*';
            imageInput.onchange = function(event) {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = function(e) {
                    imageElement.src = e.target.result;
                };
                reader.readAsDataURL(file);
            };

            // Append the image input and image display element to the clone
            clone.appendChild(imageInput);
            clone.appendChild(imageElement);
            break;
           
           
        case 'Video_Player':
            const videoPlayer = document.createElement('video');
            videoPlayer.style.width = '100%';
            videoPlayer.style.height = 'auto';
            videoPlayer.controls = true;
            videoPlayer.style.border = '1px solid #ccc';
            videoPlayer.style.padding = '5px';
            videoPlayer.style.marginTop = '5px';

            // Event listener to handle video file input from user
            const videoInput = document.createElement('input');
            videoInput.type = 'file';
            videoInput.accept = 'video/*';
            videoInput.onchange = function(event) {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = function(e) {
                    videoPlayer.src = e.target.result;
                };
                reader.readAsDataURL(file);
            };

            // Append the video input and video player element to the clone
            clone.appendChild(videoInput);
            clone.appendChild(videoPlayer);
            break;

        case 'Row':
               /* const rowLayout = document.createElement('div');
                rowLayout.style.display = 'flex';
                rowLayout.style.flexDirection = 'row';
                rowLayout.style.width = '100%';
                rowLayout.style.flexWrap = 'wrap';
                rowLayout.style.justifyContent = 'flex-start';
                rowLayout.style.alignItems = 'stretch';

                // Append new elements to the row layout
                const RowElementsToAdd = clone.querySelectorAll('.draggable');
                RowElementsToAdd.forEach(element => {
                    const elementContainer = document.createElement('div');
                    elementContainer.style.flex = '1';
                    elementContainer.appendChild(element);
                    rowLayout.appendChild(elementContainer);
                });

                clone.appendChild(rowLayout);*/ 
    /*const rowLayout = document.createElement('div');
    rowLayout.style.border = '2px dashed #ccc';
    rowLayout.style.padding = '10px';
    rowLayout.style.marginTop = '5px';
    rowLayout.style.backgroundColor = '#f9f9f9';
    rowLayout.style.position = 'relative';
    
    // Allow dragging and dropping of elements into the layout
    rowLayout.addEventListener('dragover', function(event) {
        event.preventDefault(); // Allow the drop
    });

    rowLayout.addEventListener('drop', function(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const draggableElement = document.getElementById(data);
        if (draggableElement) {
            const clone = draggableElement.cloneNode(true);
            rowLayout.appendChild(clone);
        }
    });

    // Dynamically add elements based on dataType
    Object.keys(widgetCreators).forEach(type => {
        if (type !== 'rowLayout') { // Prevent recursive Layout within Layout
            const childElement = widgetCreators[type]();
            rowLayout.appendChild(childElement);
        }
    });

    clone.appendChild(rowLayout);
    */
            const rowLayout = document.createElement('div');
            rowLayout.style.display = 'flex';
            rowLayout.style.flexDirection = 'row';
            rowLayout.style.width = '100%';
            rowLayout.style.flexWrap = 'wrap';
            rowLayout.style.justifyContent = 'flex-start';
            rowLayout.style.alignItems = 'stretch';

            // Append new elements to the row layout
            const RowElementsToAdd = clone.querySelectorAll('.draggable');
            RowElementsToAdd.forEach(element => {
                const elementContainer = document.createElement('div');
                elementContainer.style.flex = '1';
                elementContainer.appendChild(element);
                rowLayout.appendChild(elementContainer);
            });

            clone.appendChild(rowLayout);

    
            break;
        
        case 'Column':
        const columnLayout = document.createElement('div');
        columnLayout.style.display = 'flex';
        columnLayout.style.flexDirection = 'column';
        columnLayout.style.width = '100%';
        columnLayout.style.alignItems = 'center';
        columnLayout.style.justifyContent = 'flex-start';

        // Append new elements to the column layout
        const elementsToAdd = clone.querySelectorAll('.draggable');
        elementsToAdd.forEach(element => {
            const elementContainer = document.createElement('div');
            elementContainer.appendChild(element);
            columnLayout.appendChild(elementContainer);
        });

        clone.appendChild(columnLayout);
        break;
        
        case 'Stack':
        const stackLayout = document.createElement('div');
        stackLayout.style.display = 'flex';
        stackLayout.style.flexDirection = 'column';
        stackLayout.style.width = '100%';
        stackLayout.style.position = 'relative';

        // Append new elements to the stack layout
        const stackElementsToAdd = clone.querySelectorAll('.draggable');
        stackElementsToAdd.forEach(element => {
            const elementContainer = document.createElement('div');
            elementContainer.style.position = 'absolute';
            elementContainer.style.left = '0';
            elementContainer.style.top = '0';
            elementContainer.style.right = '0';
            elementContainer.style.bottom = '0';
            elementContainer.appendChild(element);
            stackLayout.appendChild(elementContainer);
        });

        clone.appendChild(stackLayout);
            
        case 'Listview':
        const listViewLayout = document.createElement('div');
        listViewLayout.style.display = 'flex';
        listViewLayout.style.flexDirection = 'column';
        listViewLayout.style.width = '100%';
        listViewLayout.style.overflowY = 'auto';

        // Append new elements to the list view layout
        const listViewElementsToAdd = clone.querySelectorAll('.draggable');
        listViewElementsToAdd.forEach(element => {
            const elementContainer = document.createElement('div');
            elementContainer.style.padding = '10px';
            elementContainer.style.borderBottom = '1px solid #ccc';
            elementContainer.appendChild(element);
            listViewLayout.appendChild(elementContainer);
        });

        clone.appendChild(listViewLayout);
            
        case 'dropdown_but':
                const dropdown = document.createElement('select');
                dropdown.style.width = '100px';
                dropdown.style.height = '50px';
                dropdown.style.backgroundColor = 'orange';
                dropdown.style.color = 'white';
                dropdown.style.border = 'none';
                dropdown.style.textAlign = 'center';
                dropdown.style.lineHeight = '50px'; // To vertically center text

                // Example options for dropdown
                const option1 = document.createElement('option');
                option1.value = '1';
                option1.text = 'Option 1';
                dropdown.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = '2';
                option2.text = 'Option 2';
                dropdown.appendChild(option2);

                clone.appendChild(dropdown);
                break;
        
        case 'Text_but':
            const textButton = document.createElement('button');
            textButton.style.padding = '10px 20px';
            textButton.style.border = '1px solid #ccc';
            textButton.style.backgroundColor = '#f0f0f0';
            textButton.style.color = 'black';
            textButton.style.cursor = 'pointer';
            textButton.textContent = 'Text Button';
            textButton.contentEditable = 'true'; // Allows the button text to be editable
            clone.appendChild(textButton);
            break;

        case 'ScrolHorizontal':
        const horizontalScrollContainer = document.createElement('div');
        horizontalScrollContainer.style.display = 'flex';
        horizontalScrollContainer.style.overflowX = 'auto';
        horizontalScrollContainer.style.whiteSpace = 'nowrap';
        horizontalScrollContainer.style.padding = '10px';
        horizontalScrollContainer.style.border = '1px solid #ccc';
        horizontalScrollContainer.style.marginTop = '5px';
        horizontalScrollContainer.style.backgroundColor = '#f9f9f9';

        // Allow dragging and dropping of elements into the horizontal scroll container
        horizontalScrollContainer.addEventListener('dragover', function(event) {
            event.preventDefault(); // Allow the drop
        });

        horizontalScrollContainer.addEventListener('drop', function(event) {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            const draggableElement = document.getElementById(data);
            if (draggableElement) {
                const clone = draggableElement.cloneNode(true);
                horizontalScrollContainer.appendChild(clone);
                // Update container width to expand as new elements are added
                horizontalScrollContainer.style.minWidth = `${horizontalScrollContainer.scrollWidth + clone.offsetWidth}px`;
            }
        });

        // Dynamically add elements based on dataType
        Object.keys(widgetCreators).forEach(type => {
            if (type !== 'Container' && type !== 'ScrolHorizontal') { // Prevent recursive Container and Horizontal Scroll within Horizontal Scroll
                const childElement = widgetCreators[type]();
                horizontalScrollContainer.appendChild(childElement);
            }
        });

        clone.appendChild(horizontalScrollContainer);

        break;

        case 'ScrolVertical':
        const verticalScrollContainer = document.createElement('div');
        verticalScrollContainer.style.display = 'block';
        verticalScrollContainer.style.overflowY = 'auto';
        verticalScrollContainer.style.maxHeight = '300px'; // Set a max height for vertical scrolling
        verticalScrollContainer.style.padding = '10px';
        verticalScrollContainer.style.border = '1px solid #ccc';
        verticalScrollContainer.style.marginTop = '5px';
        verticalScrollContainer.style.backgroundColor = '#f9f9f9';

        // Allow dragging and dropping of elements into the vertical scroll container
        verticalScrollContainer.addEventListener('dragover', function(event) {
            event.preventDefault(); // Allow the drop
        });

        verticalScrollContainer.addEventListener('drop', function(event) {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            const draggableElement = document.getElementById(data);
            if (draggableElement) {
                const clone = draggableElement.cloneNode(true);
                verticalScrollContainer.appendChild(clone);
                // Update container height to expand as new elements are added
                verticalScrollContainer.style.minHeight = `${verticalScrollContainer.scrollHeight + clone.offsetHeight}px`;
            }
        });

        // Dynamically add elements based on dataType
        Object.keys(widgetCreators).forEach(type => {
            if (type !== 'Container' && type !== 'ScrolVertical') { // Prevent recursive Container and Vertical Scroll within Vertical Scroll
                const childElement = widgetCreators[type]();
                verticalScrollContainer.appendChild(childElement);
            }
        });

        clone.appendChild(verticalScrollContainer);
        break;

        case 'SingleChaild':
            const singleChildContainer = document.createElement('div');
            singleChildContainer.style.width = '100%';
            singleChildContainer.style.minHeight = '100px';
            singleChildContainer.style.border = '1px solid #ccc';
            singleChildContainer.style.padding = '10px';
            singleChildContainer.style.marginTop = '5px';
            singleChildContainer.style.backgroundColor = '#f9f9f9';
            singleChildContainer.style.boxSizing = 'border-box';
            singleChildContainer.style.overflow = 'hidden'; // Ensure contents do not overflow

            // Allow dragging and dropping of elements into the single child container
            singleChildContainer.addEventListener('dragover', function(event) {
                event.preventDefault(); // Allow the drop
            });

            singleChildContainer.addEventListener('drop', function(event) {
                event.preventDefault();
                const data = event.dataTransfer.getData('text/plain');
                const draggableElement = document.getElementById(data);
                if (draggableElement) {
                    const clone = draggableElement.cloneNode(true);
                    // Ensure only one child in the single child container
                    if (singleChildContainer.children.length === 0) {
                        singleChildContainer.appendChild(clone);
                    }
                }
            });

            // Dynamically add elements based on dataType
            Object.keys(widgetCreators).forEach(type => {
                if (type !== 'SingleChaild') { // Prevent recursive Single Child within Single Child
                    const childElement = widgetCreators[type]();
                    // Append only if there are no children yet
                    if (singleChildContainer.children.length === 0) {
                        singleChildContainer.appendChild(childElement);
                    }
                }
            });

            clone.appendChild(singleChildContainer);
            break;



        
            }

        // Append to the current visible page or inside the last layout
        const lastLayout = currentPage.querySelector('.layout:last-child');
        if (lastLayout && dataType === 'layout') {
            lastLayout.appendChild(clone); // Nest layouts
        } else {
            currentPage.appendChild(clone);
        }
    });














}





function applyDropdownStyles() {
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule(`select { padding: 8px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px; background-color: #fff; cursor: pointer; }`, 0);
    style.sheet.insertRule(`select:hover { border-color: blue; }`, 1);
    style.sheet.insertRule(`option { padding: 8px; font-size: 16px; cursor: pointer; }`, 2);
    style.sheet.insertRule(`option:checked { background-color: #f0f0f0; }`, 3);
}

document.addEventListener('DOMContentLoaded', function() {
    applyDropdownStyles();
    enableDraggableElements();
});

function savePagesToLocalStorage() {
    const pages = document.querySelectorAll('.page');
    let pagesData = [];

    function collectElementData(element) {
        let elementsData = [];
        const children = element.querySelectorAll(':scope > .draggable, :scope > .placed');

        children.forEach(child => {
            elementsData.push({
                id: child.id,
                type: child.getAttribute('data-type'),
                position: {
                    left: child.style.left,
                    top: child.style.top
                },
                additionalProperties: {
                    classList: Array.from(child.classList),
                    innerText: child.innerText
                },
                children: collectElementData(child) // Recursive call to handle nested elements
            });
        });

        return elementsData;
    }

    pages.forEach(page => {
        const pageId = page.id;
        const pageName = page.getAttribute('data-page-name');
        const pageNumber = page.getAttribute('data-page-number');
        const elements = collectElementData(page); // Collect data for all elements in this page

        pagesData.push({
            id: pageId,
            name: pageName,
            number: pageNumber,
            elements: elements
        });
    });

    // Convert data to JSON and store in Local Storage
    localStorage.setItem('pagesData', JSON.stringify(pagesData));
}






// Call this function to save the data
savePagesToLocalStorage();




function createDesignTree() {
    const designTreeContainer = document.createElement('div');
    designTreeContainer.id = 'designTree';
    designTreeContainer.className = 'container bg-white p-3'; // Added Bootstrap classes for white background and padding
    document.body.appendChild(designTreeContainer);

    const header = document.createElement('h2');
    header.textContent = 'Design Structure';
    header.className = 'text-dark'; // Added Bootstrap class for dark text
    designTreeContainer.appendChild(header);

    const tree = document.createElement('ul');
    tree.id = 'designTreeList';
    tree.className = 'list-unstyled'; // Added Bootstrap class for unstyled list
    designTreeContainer.appendChild(tree);

    updateDesignTree(); 
}

function updateDesignTree() {
    const tree = document.getElementById('designTreeList');
    tree.innerHTML = '';

    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        const pageItem = document.createElement('li');
        const pageName = page.getAttribute('data-page-name');
        const pageNumber = page.getAttribute('data-page-number');
        const pageId = page.id;
        pageItem.textContent = `${pageName} ${pageNumber} (ID: ${pageId})`;

        const elementsList = document.createElement('ul');
        elementsList.className = 'list-unstyled'; // Added Bootstrap class for unstyled list
        const elements = page.querySelectorAll('.draggable, .placed');
        elements.forEach(element => {
            const elementItem = document.createElement('li');
            elementItem.textContent = element.id + ' - ' + element.getAttribute('data-type');
            const childElementsList = document.createElement('ul');
            childElementsList.className = 'list-unstyled'; // Added Bootstrap class for unstyled list
            const childElements = element.querySelectorAll('.draggable, .placed');
            childElements.forEach(childElement => {
                const childElementItem = document.createElement('li');
                childElementItem.textContent = childElement.id + ' - ' + childElement.getAttribute('data-type');
                childElementsList.appendChild(childElementItem);
            });
            if (childElementsList.hasChildNodes()) {
                elementItem.appendChild(childElementsList);
            }
            elementsList.appendChild(elementItem);
        });

        pageItem.appendChild(elementsList);
        tree.appendChild(pageItem);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    createDesignTree();

    const container = document.getElementById('container');
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                updateDesignTree();
            }
        });
    });

    const config = { childList: true, subtree: true };
    observer.observe(container, config);
});

document.getElementById('container').addEventListener('DOMNodeInserted', function() {
    updateDesignTree();
}, false);






function exportDesignToJson() {
    const pages = document.querySelectorAll('.page');
    const exportedData = [];

    pages.forEach((page, index) => {
        const elements = [];
        page.querySelectorAll('.draggable, .placed').forEach(element => {
            const elementType = element.getAttribute('data-type');
            const elementData = { id: element.id, type: elementType };

            // Collect child elements if any
            const childElements = [];
            element.querySelectorAll('.draggable, .placed').forEach(child => {
                const childType = child.getAttribute('data-type');
                childElements.push({
                    id: child.id,
                    type: childType
                });
            });

            if (childElements.length > 0) {
                elementData.children = childElements;
            }

            elements.push(elementData);
        });

        exportedData.push({
            page: index + 1,
            elements: elements
        });
    });

    // Convert data to JSON string
    const jsonData = JSON.stringify(exportedData, null, 2);

    // Download the JSON file
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'exported_design.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

document.getElementById('exportJson').addEventListener('click', exportDesignToJson);











document.getElementById('exportDart').addEventListener('click', async function() {
    const pages = document.querySelectorAll('.page');
    let dartCode = '';
    let pageIndex = 0;

    dartCode += `import 'package:flutter/material.dart';\n\n`;

    pages.forEach((page, index) => {
        const elements = [];
        page.querySelectorAll('.placed').forEach(element => {
            const elementType = element.getAttribute('data-type');
            let elementCode = '';

            switch (elementType) {
                case 'Container':
                    elementCode = `Container()`;
                    break;
                case 'Row':
                    elementCode = `Row(children: [])`;
                    break;
                case 'Column':
                    elementCode = `Column(children: [])`;
                    break;
                case 'Stack':
                    elementCode = `Stack(children: [])`;
                    break;
                case 'Listview':
                    elementCode = `ListView(children: [])`;
                    break;
                case 'Gridview':
                    elementCode = `GridView.count(crossAxisCount: 2, children: [])`;
                    break;
                case 'ScrolHorizontal':
                    elementCode = `SingleChildScrollView(scrollDirection: Axis.horizontal, child: Row(children: []))`;
                    break;
                case 'ScrolVertical':
                    elementCode = `SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: []))`;
                    break;
                case 'dropdown_but':
                    elementCode = `DropdownButton(items: [], onChanged: (value) {})`;
                    break;
                case 'Elevated_but':
                    elementCode = `ElevatedButton(onPressed: () {}, child: Text('Button'))`;
                    break;
                case 'Text_but':
                    elementCode = `TextButton(onPressed: () {}, child: Text('Button'))`;
                    break;
                case 'Text':
                    elementCode = `Text("${element.textContent.trim()}")`;
                    break;
                case 'Text_Field':
                    elementCode = `TextField()`;
                    break;
                case 'Rich_Text':
                    elementCode = `RichText(text: TextSpan(text: "${element.textContent.trim()}"))`;
                    break;
                case 'Image':
                    elementCode = `Image.network("${element.getAttribute('src')}")`;
                    break;
                case 'Video_Player':
                    elementCode = `VideoPlayer(VideoPlayerController.network("${element.getAttribute('src')}"))`;
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
                home: DefaultTabController(
                    length: ${pageIndex},
                    child: Scaffold(
                        appBar: AppBar(
                            title: Text('Flutter Demo'),
                            bottom: TabBar(
                                tabs: [
                                    ${Array.from({length: pageIndex}, (_, i) => `Tab(text: 'Page ${i + 1}')`).join(',\n                                    ')}
                                ],
                            ),
                        ),
                        body: TabBarView(
                            children: [
                                ${Array.from({length: pageIndex}, (_, i) => `buildPage${i + 1}(context)`).join(',\n                                ')}
                            ],
                        ),
                    ),
                ),
            );
        }
    }\n`;

    window.dartCode = dartCode; // Save dartCode in window to be globally available

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
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'app.apk';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        alert('APK compiled and downloaded successfully!');
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});
















