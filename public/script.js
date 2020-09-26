const video = document.getElementById('video')
var labels;

// Force refresh of Labels every 30 seconds
function timedRefresh(timeoutPeriod) {setTimeout("refreshLabels();",timeoutPeriod);}
window.onload = timedRefresh(30000);

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  faceapi.nets.ageGenderNet.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(startVideo)

async function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  );
}

var logName


video.addEventListener('play', async () => {
  

  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)

  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  
  setInterval(async () => {
  window.labeledFaceDescriptors = await loadLabeledImages()
  var faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.5)

  setInterval(async () => {

    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks().withFaceExpressions().withAgeAndGender().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
      drawBox.draw(canvas)
      window.logName = results.map(a => a.label).toString()
      try{postLog(logName);} catch {console.log("Unable to PostLog")};
  })
  }, 120)
}, 200)
})

function postLog(logName){
  date = new Date();
  date = date.toString();
  var logData = {name: logName, date: date};
  fetch('/postlog',{
    method: "POST",
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
  },
    body: JSON.stringify(logData),
  })
  .then(response => response.text())
}

function getLabels() {
  var list = [];
  var labelList = new Array;
  return fetch("/userlist")
    .then((response) => response.json())
    .then((data) => {
        list = data;
        length = list.length;
        for (var i = 0; i < length; i++){
          n = list[i].username;
          labelList.push(n);
        }
      return labelList;
    })
}

function refreshLabels(){
  // Refresh labels by checking username list from getLabels()
  getLabels().then((data) => {
    dataS = JSON.stringify(data);
    sessionStorage.setItem('list', dataS)
    window.labels  = JSON.parse(sessionStorage.getItem("list"));
    window.labeledFaceDescriptors = loadLabeledImages()
  });
}

function loadLabeledImages(){
  
  getLabels().then((data) => {
    dataS = JSON.stringify(data);
    sessionStorage.setItem('list', dataS)
  });
  
  window.labels  = JSON.parse(sessionStorage.getItem("list"));

  // Error handling for no users registered, hence labels == 0.
  // Define 'Sheldon' as default labels value.
  if (labels === undefined || labels === null || labels.length == 0){
    window.labels = ['Sheldon'];
  } 
  console.log(labels); // check that labels cannot be [] at this point.
  
  return Promise.all( 
    labels.map(async label => {
      var descriptions = []
      for (let i = 1; i <= 1; i++) {
        try {
          const img = await faceapi.fetchImage(`labeled_images/${label}/${i}.jpg`)
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
          descriptions.push(detections.descriptor)
        }  catch(err){
          // Do nothing or error handling
        }
      };
      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
    
  )
  
  
  
}




