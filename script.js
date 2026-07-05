function onesComplement(bin) {
    let result = "";
    for(let i = 0; i < bin.length; i++) {
        result += bin[i] === '0' ? '1' : '0';
    }
    return result;
}

function twosComplement(bin) {
    let arr = bin.split('');
    let carry = 1;
    for(let i = arr.length - 1; i >= 0; i--) {
        if(arr[i] === '1' && carry === 1) {
            arr[i] = '0';
        } else if(arr[i] === '0' && carry === 1) {
            arr[i] = '1';
            carry = 0;
        }
    }
    return arr.join('');
}

function calculate() {
    let A = document.getElementById('inputA').value.trim();
    let B = document.getElementById('inputB').value.trim();
    
    const binaryRegex = /^[01]+$/;
    
    if (!A || !B) {
        alert("Please enter both binary numbers.");
        return;
    }
    
    if (!binaryRegex.test(A) || !binaryRegex.test(B)) {
        alert("Please enter valid binary numbers (only 0s and 1s).");
        return;
    }
    
    let maxLength = Math.max(A.length, B.length);
    A = A.padStart(maxLength, '0');
    B = B.padStart(maxLength, '0');
    
    let n = A.length;
    let temp = B;
    
    let onesComp = onesComplement(temp);
    let twosComp = twosComplement(onesComp);
    
    let result = '';
    let carry = 0;
    
    for(let i = n - 1; i >= 0; i--) {
        let sum = parseInt(A[i]) + parseInt(twosComp[i]) + carry;
        result = (sum % 2).toString() + result;
        carry = Math.floor(sum / 2);
    }
    
    document.getElementById('origB').textContent = B;
    document.getElementById('onesComp').textContent = onesComp;
    document.getElementById('twosComp').textContent = twosComp;
    document.getElementById('addResult').textContent = result;
    
    if (carry) {
        document.getElementById('carryStatus').textContent = "Yes (Discard Carry, Result is Positive)";
        document.getElementById('finalResult').textContent = result;
    } else {
        document.getElementById('carryStatus').textContent = "No (Negative Result)";
        let compResult = onesComplement(result);
        let finalCompResult = twosComplement(compResult);
        document.getElementById('finalResult').textContent = finalCompResult;
    }
    
    document.getElementById('resultsPanel').style.display = 'block';
}
