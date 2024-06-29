/*function createDesignTree() {
    const designTreeContainer = document.createElement('div');
    designTreeContainer.id = 'designTree';
    designTreeContainer.style.position = 'fixed';
    designTreeContainer.style.top = '10px';
    designTreeContainer.style.right = '10px';
    designTreeContainer.style.width = '300px';
    designTreeContainer.style.height = '400px';
    designTreeContainer.style.overflow = 'auto';
    designTreeContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    designTreeContainer.style.border = '1px solid #ccc';
    designTreeContainer.style.padding = '10px';
    designTreeContainer.style.zIndex = '1000';

    const header = document.createElement('h4');
    header.textContent = 'Design Structure';
    designTreeContainer.appendChild(header);

    const tree = document.createElement('ul');
    tree.id = 'designTreeList';
    designTreeContainer.appendChild(tree);

    document.body.appendChild(designTreeContainer);

    updateDesignTree();
}

function updateDesignTree() {
    const tree = document.getElementById('designTreeList');
    tree.innerHTML = ''; // Clear previous tree

    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        const pageItem = document.createElement('li');
        pageItem.id = page.id;
        const elementsList = document.createElement('ul');

        const elements = page.querySelectorAll('.draggable, .placed');
        elements.forEach(element => {
            const elementItem = document.createElement('li');
            const input = document.createElement('input');
            input.type = 'text';
            input.value = element.id;
            input.onchange = function() {
                element.id = this.value; // Update the element ID on the page
                updateDesignTree(); // Optional: Refresh the tree if needed
            };
            elementItem.appendChild(input);
            elementsList.appendChild(elementItem);
        });

        pageItem.appendChild(elementsList);
        tree.appendChild(pageItem);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    createDesignTree();

    // Setup MutationObserver
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
*/
/*
function createDesignTree() {
    const designTreeContainer = document.createElement('div');
    designTreeContainer.id = 'designTree';
    document.body.appendChild(designTreeContainer);

    const header = document.createElement('h2');
    header.textContent = 'Design Structure';
    header.style.color = 'white';
    designTreeContainer.appendChild(header);

    const tree = document.createElement('ul');
    tree.id = 'designTreeList';
    designTreeContainer.appendChild(tree);

    updateDesignTree(); 
}

function updateDesignTree() {
    const tree = document.getElementById('designTreeList');
    tree.innerHTML = '';

    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        const pageItem = document.createElement('li');
        pageItem.textContent = page.textContent;
        const elementsList = document.createElement('ul');

        const elements = page.querySelectorAll('.draggable, .placed');
        elements.forEach(element => {
            const elementItem = document.createElement('li');
            elementItem.textContent = element.id;
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
*/

/*

function createDesignTree() {
    const designTreeContainer = document.createElement('div');
    designTreeContainer.id = 'designTree';
    document.body.appendChild(designTreeContainer);

    const header = document.createElement('h2');
    header.textContent = 'Design Structure';
    header.style.color = 'white';
    designTreeContainer.appendChild(header);

    const tree = document.createElement('ul');
    tree.id = 'designTreeList';
    designTreeContainer.appendChild(tree);

    updateDesignTree(); 
}

function updateDesignTree() {
    const tree = document.getElementById('designTreeList');
    tree.innerHTML = '';

    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        const pageItem = document.createElement('li');
        // استخدام البيانات من خصائص data-* والـ ID
        const pageName = page.getAttribute('data-page-name');
        const pageNumber = page.getAttribute('data-page-number');
        const pageId = page.id; // الحصول على الـ ID الخاص بالصفحة
        pageItem.textContent = `${pageName} ${pageNumber} (ID: ${pageId})`; // تنسيق النص ليشمل اسم الصفحة، رقمها، والـ ID

        const elementsList = document.createElement('ul');
        const elements = page.querySelectorAll('.draggable, .placed');
        elements.forEach(element => {
            const elementItem = document.createElement('li');
            elementItem.textContent = element.id; // يمكنك أيضًا إضافة مزيد من التفاصيل هنا إذا لزم الأمر
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


*/















/*


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


*/