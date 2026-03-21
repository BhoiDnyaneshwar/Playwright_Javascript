

export async function testInformation(testInfo, page, desciption){
  await testInfo.attach(desciption, {
            body: await page.screenshot(),
            contentType: "image/png"
        });
}