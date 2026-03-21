const excelJs = require('exceljs');
const {test,expect}=require("@playwright/test")
const path=require('path');
const fs=require('fs');

/*Because createWriteStream opens the file first, it might actually lock the file or cause a conflict when Playwright tries to save to that same name.
In modern Playwright scripts, you don't need the stream line at all. */

async function ensureDownload(filepath,download){
//const stream=fs.createWriteStream(filepath)
await download.saveAs(filepath);
// it takes the temporary file the browser just downloaded and moves/copies it to your specified filePath.
}

async function readExcel() {
    let workbook = new excelJs.Workbook;
    await workbook.xlsx.readFile("C:/Users/Dnyaneshwar/Downloads/download.xlsx");
    const sheet = workbook.getWorksheet("Sheet1");
    //const headerRow=sheet.getRow(1).values;

    sheet.eachRow((row, rowNum) => {
        row.eachCell((cell, cellNum) => {
            console.log(cell.value);

        })
    })

}

//readExcel();

async function readExcelFile(fileName, sheetName) {
    const workbook = new excelJs.Workbook();
    await workbook.xlsx.readFile(fileName);
    const worksheet = workbook.getWorksheet(sheetName);

    const data = [];
    const headerRow = worksheet.getRow(1).values; // it return array-1srt value blank bcz array start from 0
    worksheet.eachRow((row, rowNum) => {
        //skipped first row-It is called back function-just return and it is skip that that row
        //come to other rows

        if (rowNum === 1) return;
        const rowData = {};

        row.eachCell((cell, cellNum) => {
            rowData[headerRow[[cellNum]]] = cell.value;
        })
        data.push(rowData);
    })

    return data;
}

/*async function finalExcelData(){
let excelDataArr= await readExcelFile("C:/Users/Dnyaneshwar/Downloads/download.xlsx", "Sheet1");
console.log(excelDataArr);
}

finalExcelData();*/

/* async function findData(){
  let excelDataArr=  await readExcelFile("C:/Users/Dnyaneshwar/Downloads/download.xlsx", "Sheet1");
 const mangobj= excelDataArr.find((data)=>data.fruit_name==="Apple");
 const mangoIndex= excelDataArr.findIndex((data)=>data.fruit_name==="Apple");
 console.log(mangobj.price);
 console.log(mangoIndex);
 
}
findData();*/

async function writeExcelFile(fileName,sheetName,souceColName,sourceColVal,targetColName,targetColVal){
   const workbook = new excelJs.Workbook();
    await workbook.xlsx.readFile(fileName);
    const worksheet = workbook.getWorksheet(sheetName);

    const headerRow=worksheet.getRow(1);
    let souceColNameInd;
    let targetColNameInd;
    headerRow.eachCell((cell, cellNum)=>{
        if(cell.value===souceColName) souceColNameInd=cellNum
        if(cell.value===targetColName) targetColNameInd=cellNum;
        })

    worksheet.eachRow((row, rowNum)=>{
        if(rowNum===1) return;
        const sourceItem=row.getCell(souceColNameInd);
        if(sourceItem.value===sourceColVal){
            row.getCell(targetColNameInd).value=targetColVal;
            row.commit();  //Notify the worksheet that the row has changed
        }
    })    
    
    await workbook.xlsx.writeFile(fileName);
    console.log("Successfully Updated");
    
}

//writeExcelFile("C:/Users/Dnyaneshwar/Downloads/download.xlsx", "Sheet1","fruit_name","Papaya","price",499);
//writeExcelFile("C:/Users/Dnyaneshwar/Downloads/download.xlsx", "Sheet1","fruit_name","Kivi","color","light Green");

//Handle fileDownload and upload functionality

test("Upload and Download functionality ,ExcelJs work", async ({page})=>{
 await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

 //handle download event
 const [download]=await Promise.all([
    page.waitForEvent('download'),
    page.locator("#downloadButton").click()
 ]);
 

 //change data in excel
 const localFilePath= path.join(__dirname,'download.xlsx');
 await ensureDownload(localFilePath, download)
 await writeExcelFile(localFilePath, "Sheet1","fruit_name","Papaya","price",521);

 //if you want to upload any file then that's time
 //input or any tag just have type='file'
 //const uploadEvent=page.waitForEvent('filechooser')
 await page.getByRole('button',{name:"Choose File"}).setInputFiles(localFilePath);
//await uploadEvent

const papayeRow= page.getByRole("row").filter({has:page.getByText("Papaya")});
await expect(papayeRow.locator("#cell-4-undefined")).toHaveText("521");
console.log(await papayeRow.locator("#cell-4-undefined").textContent());




})
