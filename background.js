chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const fetchOCRDetails = async () => {
    const url = "https://api.ocr.space/parse/image";
    const apiKey = "K87059534588957";
    const base64Image = message.imageUrl;
    console.log(base64Image);

    const formData = new FormData();
    formData.append("base64Image", base64Image);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          apikey: apiKey,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("OCR Result:", data);
      if(data.IsErroredOnProcessing){
        sendResponse("Error processing image");
      }
      else if(data.ParsedResults[0].ParsedText){
        sendResponse(data.ParsedResults[0].ParsedText);
      }
    } catch (error) {
      console.error("Error fetching OCR details:", error);
    }
  };

  fetchOCRDetails();
  return true;
});
