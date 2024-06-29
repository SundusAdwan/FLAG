/*

document.getElementById('exportJson').addEventListener('click', exportToJson);


function exportToJson() {
    const pages = document.querySelectorAll('.page');
    const exportedData = [];
    
    pages.forEach((page, index) => {
        const elements = [];
        page.querySelectorAll('.placed').forEach(element => {
            const elementType = element.getAttribute('data-type');
            const elementData = { type: elementType };
            
            // Customize data based on the element type
            switch (elementType) {
                case 'button':
                case 'text':
                    // Example: Save text content or button label
                    elementData.content = element.textContent.trim();
                    break;
                case 'image':
                    // Example: Save image source URL
                    elementData.src = element.getAttribute('src');
                    break;
                default:
                    // Handle other element types as needed
                    break;
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
    a.download = 'exported_data.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
*/