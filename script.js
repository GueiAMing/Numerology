function clearresultdiv(){
    document.getElementById('result').innerHTML = "";
    const table = document.createElement("table");
    table.setAttribute("id", "TableContainer");
    table.className = "table1";
    document.getElementById('result').appendChild(table);

}

function calculateLifePathNumber() {
    //第一步：清空 resultDiv的所有東西
    clearresultdiv();
    //第二步：計算命數
    let birthdate = document.getElementById('birthdate').value;
    if (!birthdate) {
        alert('請輸入有效的日期');
        return;
    }
    console.log(birthdate);
    // 移除 '-' 並將日期拆分成陣列    
    let digits = birthdate.replace(/-/g, '').split('').map(Number);
    let numberswillbecount = birthdate.replace(/-/g, '');
    console.log(numberswillbecount);
    let day = parseInt(birthdate.split('-')[2], 10);
    console.log(digits);
    // let day = digits[digits.length - 2] * 10 + digits[digits.length - 1]
    console.log( 'Day', day);
    // 計算數字的總和
    let lifePathNumber = digits.reduce((acc, curr) => acc + curr, 0);
    // 如果結果是兩位數，繼續相加直到剩下一位數
    while (lifePathNumber > 9) {
        console.log(lifePathNumber);
        numberswillbecount += lifePathNumber;
        console.log("in while loop 加入計算過程:",numberswillbecount);
        tanlentNumber = lifePathNumber;
        lifePathNumber = lifePathNumber.toString().split('').map(Number)
            .reduce((acc, curr) => acc + curr, 0);
    }
    //第2.5步，把算出命數前的十位數取出，分別表示天賦數，若個位數為零，則只取十位數
    const tens = Math.floor(tanlentNumber / 10); // 十位數
    const ones = tanlentNumber % 10;             // 個位數
    numberswillbecount += String(lifePathNumber);
    console.log("加入命數:",numberswillbecount);
    //第三步：計算生日數，規則和命數相同
    let [daynumber, Newnumberswillbecount] = calculateSingleDigit(day, numberswillbecount);
    console.log("回傳的生日數:",daynumber);
    // 顯示結果
    appendAnswerinresult('命數', ':', lifePathNumber);
    if (ones === 0){
        appendAnswerinresult('天賦數', ':', tens);
    }
    else{
        appendAnswerinresult('天賦數', ':', `${tens},${ones}`);
    }
    appendAnswerinresult('生日數', ':', daynumber);
    
    //第四步，計算星座數
    zodiacnumber = showZodiac();
    Newnumberswillbecount += String(zodiacnumber);

    //數字個數的陣列，畫圓圈個數使用
    let countArray = countnumbers(Newnumberswillbecount);
    // 輸出結果
    let numbertimes = []
    for (let i = 0; i < countArray.length; i++) {
        numbertimes.push([i,countArray[i]]);
        console.log(`數字 ${i} 出現次數: ${countArray[i]}`);
    }
    console.log(numbertimes);
    drawcircleforeachnumber(numbertimes);
    
}

//把結果插入在result DIV中 按照 (命數, 冒號, 內容)
function appendAnswerinresult(firstText, colon, secontext){
    // 選取目標 div
    const container = document.getElementById("result");

    // 創建表格元素
    const table = document.getElementById("TableContainer");
    // 假設要生成 3x3 的表格

    const row = document.createElement("tr");

    const cell1 = document.createElement("td");
    cell1.textContent = firstText;
    row.appendChild(cell1);

    const cell2 = document.createElement("td");
    cell2.textContent = colon;
    row.appendChild(cell2);

    const cell3 = document.createElement("td");
    cell3.textContent = secontext;
    row.appendChild(cell3);

    table.appendChild(row);


    // 將表格加入到 div 中
    container.appendChild(table);
}

// 計算單位數
function calculateSingleDigit(num, numberswillbecount) {
    while (num > 9 ) {
        numberswillbecount += String(num);
        console.log('加入生日數過程:',numberswillbecount);
        num = num.toString().split('').map(Number).reduce((acc, curr) => acc + curr, 0);
    }
    numberswillbecount += String(num);
    console.log('加入生日數:',numberswillbecount);
    return [num, numberswillbecount];
}


function getZodiacSign(day, month) {
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "1(牡羊座)";
    else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "2(金牛座)";
    else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "3(雙子座)";
    else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "4(巨蟹座)";
    else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "5(獅子座)";
    else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "6(處女座)";
    else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "7(天秤座)";
    else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "8(天蠍座)";
    else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "9(射手座)";
    else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "1(10)(摩羯座)";
    else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "2(11)(水瓶座)";
    else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "3(12)(雙魚座)";
}

function showZodiac() {
    const date = new Date(document.getElementById("birthdate").value);
    const month = date.getMonth() + 1; // 將月份調整到 1-12 範圍
    const day = date.getDate();
    const zodiacSign = getZodiacSign(day, month);
    appendAnswerinresult('星座數', ':', zodiacSign);
    return zodiacSign[0];
}

function countnumbers(numberswillbecount){
    // 宣告一個長度為10的陣列，並初始化為0
    let countArray = new Array(10).fill(0);

    // 給定的數字字串
    let numbers = numberswillbecount;
    console.log("計算出現次數中，列印輸入字串:",numberswillbecount);
    // 遍歷每個字元，將其轉換為數字並更新計數
    for (let char of numbers) {
        let digit = parseInt(char); // 將字元轉換為整數
        if (digit >= 1 && digit <= 9) { // 確保數字在0到9之間
            countArray[digit]++; // 增加對應索引的計數
        }
    }

    // 輸出結果
    console.log(countArray);
    return countArray;

}

//畫圓圈和連線
function drawcircleforeachnumber(numbertimeslist){
    // 獲取 canvas 元素
    const div = document.getElementById('numbers-table');
    const canvas = document.getElementById('gridCanvas');
    const ctx = canvas.getContext('2d');

    const firstPercent = 1/6; // 17% 水平位置
    const secondPercent = 3/6; // 50% 水平位置
    const thirdPercent = 5/6; // 83% 水平位置


    // const rect = canvas.getBoundingClientRect();
    canvas.width = div.clientWidth;
    canvas.height = div.clientHeight;
    basewidth = canvas.width;
    baseheight = canvas.height;
    numberexistlist = [0,0,0,0,0,0,0,0,0,0];
    for(let i = 1; i<numbertimeslist.length ; i ++){
        console.log(`in drawcircle ${i}`,numbertimeslist[i]);
        coordinateArray = coordinateOfnumbers();
        console.log(`數字${i}的座標:`,coordinateArray[i]);
        numbertimes = numbertimeslist[i][1];
        console.log(`數字${i}次數:`,numbertimes);
        if (numbertimes > 0 ){
            numberexistlist[i] = 1;  
            for(let j = 1; j<=numbertimes; j ++){
                const circlePercentX = coordinateArray[i][0]; // 50% 水平位置
                const circlePercentY = coordinateArray[i][1]; // 17% 垂直位置
                const circleRadius = (1/18)*basewidth; // 圓半徑
                const difference = (1/52)*basewidth;
                ctx.beginPath();
                ctx.globalAlpha = 1;
                const centerX = canvas.width * circlePercentX; // 計算圓心 X 坐標
                const centerY = canvas.height * circlePercentY; // 計算圓心 Y 坐標
                ctx.arc(centerX, centerY, circleRadius+difference*(j-1), 0, 2 * Math.PI);
                ctx.strokeStyle = 'blue'; // 設定圓圈顏色
                ctx.lineWidth = 2;
                ctx.stroke();
                console.log(`繪畫數字${i}的第${j}個圓圈`);
            }
        }
    console.log("numberexistlist:", numberexistlist);
    }
    checklist = [0,
        '147','258','369',
        '123','456','789',
        '159','357'
        ]
        drawOrnotlist = [0,
                    0,0,0,
                    0,0,0,
                    0,0
        ]
        for (let i= 1;i < checklist.length;i ++){
            line = parseInt(checklist[i]);
            const hundreds = Math.floor(line / 100); // 百位數
            const tens = Math.floor((line - hundreds * 100) / 10); // 十位數
            const ones = line % 10;             // 個位數
            console.log(`${i}`,hundreds,tens,ones);
            if ((numberexistlist[hundreds] === 1) && (numberexistlist[tens] === 1) && (numberexistlist[ones] === 1)){
                drawOrnotlist[i] = 1;
            }
            console.log(hundreds,":",numberexistlist[hundreds]);
            console.log(tens,":",numberexistlist[tens]);
            console.log(ones,":",numberexistlist[ones]);
            console.log("draw or not list:",drawOrnotlist);
        }

        // 定義8條連線的起點和終點
        const lines = [0,
                    // 水平線
                    [{ x: 0, y: baseheight *firstPercent }, { x: basewidth, y: baseheight *firstPercent }], // 147
                    [{ x: 0, y: baseheight *secondPercent }, { x: basewidth, y: baseheight *secondPercent }], // 258
                    [{ x: 0, y: baseheight *thirdPercent }, { x: basewidth, y: baseheight *thirdPercent }], // 369
                    // 垂直線
                    [{ x: basewidth *firstPercent, y: 0 }, { x: basewidth * firstPercent, y: baseheight }], // 123
                    [{ x: basewidth *secondPercent, y: 0 }, { x: basewidth*secondPercent, y: baseheight }], // 456
                    [{ x: basewidth *thirdPercent, y: 0 }, { x: basewidth * thirdPercent, y: baseheight }], // 789
                    // 對角線
                    [{ x: 0, y: 0 }, { x: basewidth, y: baseheight }], // 159
                    [{ x: 0, y: baseheight }, { x: basewidth, y: 0 }]  // 357
                ];
        for (let i = 1;i < drawOrnotlist.length; i ++){
            if  (drawOrnotlist[i] === 1){
                    ctx.beginPath();
                    ctx.globalAlpha = 0.5;
                    ctx.moveTo(lines[i][0].x, lines[i][0].y);
                    ctx.lineTo(lines[i][1].x, lines[i][1].y);
                    ctx.strokeStyle = 'purple';
                    ctx.stroke();
                }
        }
    numberdidnotexistText(numberexistlist);
}

//回傳每個數字的座標
function coordinateOfnumbers(){
    coordinateArray = [
        [0,0],
        [1/6,1/6],[1/6,3/6],[1/6,5/6],
        [3/6,1/6],[3/6,3/6],[3/6,5/6],
        [5/6,1/6],[5/6,3/6],[5/6,5/6] 
];
    return coordinateArray;
}

function numberdidnotexistText(numberexistlist){
    numberdidnotexist = '';
    for (let i = 1; i < numberexistlist.length; i ++){
        if (numberexistlist[i] === 0){
            numberdidnotexist += i;
            if (i != numberexistlist.length -1){
                numberdidnotexist += ',';
            }
        }
    }
    
    appendAnswerinresult('空缺數', ':', numberdidnotexist);
}