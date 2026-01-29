document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dataForm');
    const result = document.getElementById('result');
    const loadDataBtn = document.getElementById('loadData');
    const dataList = document.getElementById('dataList');

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            showResult('Saving data...', 'loading');
            
            const response = await fetch('/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (responseData.success) {
                showResult('✅ Data saved in database successfully!', 'success');
                form.reset();
                // Auto-refresh data list
                setTimeout(loadAllData, 1000);
            } else {
                showResult('❌ Error: ' + responseData.error, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showResult('❌ Network error occurred', 'error');
        }
    });

    // Handle load data button
    loadDataBtn.addEventListener('click', loadAllData);

    // Show result message
    function showResult(message, type) {
        result.textContent = message;
        result.className = `result ${type}`;
        result.classList.remove('hidden');
        
        if (type !== 'loading') {
            setTimeout(() => {
                result.classList.add('hidden');
            }, 5000);
        }
    }

    // Load all data from database
    async function loadAllData() {
        try {
            dataList.innerHTML = '<div class="loading">Loading data...</div>';
            
            const response = await fetch('/api/data');
            const responseData = await response.json();

            if (responseData.success) {
                displayData(responseData.data);
            } else {
                dataList.innerHTML = '<div class="error">Failed to load data</div>';
            }
        } catch (error) {
            console.error('Error loading data:', error);
            dataList.innerHTML = '<div class="error">Network error occurred</div>';
        }
    }

    // Display data in the UI
    function displayData(data) {
        if (data.length === 0) {
            dataList.innerHTML = '<div class="loading">No data found</div>';
            return;
        }

        const dataHTML = data.map(item => `
            <div class="data-item">
                <h3>${escapeHtml(item.name)}</h3>
                <p><strong>Email:</strong> ${escapeHtml(item.email)}</p>
                <p><strong>Message:</strong> ${escapeHtml(item.message)}</p>
                <p class="timestamp">Saved: ${new Date(item.timestamp).toLocaleString()}</p>
            </div>
        `).join('');

        dataList.innerHTML = dataHTML;
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Load data on page load
    loadAllData();
});