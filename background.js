chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const url = "https://api.ocr.space/parse/imageurl";
  const apiKey = "K87059534588957";
  const imageUrl = "data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAMsAAAAyCAYAAADyZi/iAAAC4ElEQVR42u2cv0scQRSARZZDggTEIqVwleVBSCXpRCxSiE0IFv4HcoQ0YnGIpEkpIa1YhAPxXxCLKyQgIpZ2Yh9COIIE4ZyBOTgfb/Z2Z/duf/h9MODuzDy9u/nYnbfvnJkBAAAAAAAAAAAAAACAqTKIZyllrGZcsGn8/ZOMM8nXM433CiYry37KWAfIgiwvVZb7lLHukQVZXpIsf8TxasI4a2LeX2RBlrrL8l0cnySMcyrmHSILstRdlpY4/m/a4pgYi6Y9inlvkQVZai2LO3ctTrfHxGiL8TdZF4AZvm5a17Q70x5ciAdkgbLJoi7+mBg3YvxOkgXg+d1vTDv35AiQBUony4K7/Xp2W+WZ/85325ZWFnc7dxuTUEMWKJcs7nxXbvw983+Icd2kC0CRYZgksLddX93+adaNXTbtCFmgjLKsKqngSMyNTOv7Us0Bslh++65ibPChlLK4vjvRvS36t+MeYgbKskE2DFmqKIssXzkX/Weiv5NRlsuiFhmyQFZZlpQF3XR9zXGFlwGytJEFWSopi+fqcZDkqhMoy3tkQZYqy6LuS5Siya0cZGkgC7JUWZZIKa78phRfRlllKXKRIQvktUhkcaWsAzsMFBFZkKV2srTGfO+lVaAsjznEmJVVCMgCwR+SUv815DrDLV4essiHovMBMeZFjD6yQBZZ2h5ZdgqW5UKEWQuIsZ7keQ+yIEtSWbTiSnv8umBZjkWYLwExPosYx8gCmT4kpbjyZ8ZMWx6yfBRhfgXEuBQxPiELlGoB5CRL5IovR9lMMX9DKeRsIAvUThYXZ1dZ8CsJ5q0oou2W8b0CZMlLFpv67SnJB7uf+TC6rzI/v3LnjpTxveH3Z5AFainLSAKiNwjHzl1I83pCmXZsQBbfFWZP+59lMdixnbgrCrJA7WQZiduwGS2brXOZrr570m/bP9OuXJ8dMxf6epAFAAAAAAAAAAAAAAAAAAAAAAAAAAAqxRPuYfTwmwSaZAAAAABJRU5ErkJggg==";

  fetch(url, {
    method: "GET",
    headers: {
      apikey: apiKey,
    },
    body: `base64Image=${imageUrl}`,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("background.js ", data);
      sendResponse(data);
    })
    .catch((error) => {
      console.log(error);
    });

  return true;
});
