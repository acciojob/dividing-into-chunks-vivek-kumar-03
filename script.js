document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const arrayInput = document.getElementById('arrayInput');
    const maxSumInput = document.getElementById('maxSumInput');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', function() {
        try {
            // Parse array input
            const arr = arrayInput.value
                .split(',')
                .map(item => {
                    const num = parseInt(item.trim());
                    if (isNaN(num)) throw new Error('Invalid array input');
                    return num;
                });
            
            // Parse max sum input
            const n = parseInt(maxSumInput.value);
            if (isNaN(n) || n <= 0) throw new Error('N must be a positive integer');
            
            // Check constraint: max array element <= n
            const maxElement = Math.max(...arr);
            if (maxElement > n) throw new Error('Array contains elements greater than N');
            
            // Divide array and display result
            const chunks = divideIntoChunks(arr, n);
            resultDiv.textContent = JSON.stringify(chunks, null, 2);
        } catch (error) {
            resultDiv.textContent = `Error: ${error.message}`;
        }
    });

    function divideIntoChunks(arr, n) {
        const chunks = [];
        let currentChunk = [];
        let currentSum = 0;
        
        for (const num of arr) {
            if (currentSum + num <= n) {
                currentChunk.push(num);
                currentSum += num;
            } else {
                chunks.push(currentChunk);
                currentChunk = [num];
                currentSum = num;
            }
        }
        
        // Push the last chunk if it's not empty
        if (currentChunk.length > 0) {
            chunks.push(currentChunk);
        }
        
        return chunks;
    }
});