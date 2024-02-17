
// ------------------------------ Database --------------------------------------------- //
        
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    // import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
    import {
      getDatabase,
      ref,
      set,
      get,
      child,
      onValue,
    } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
    
    document.addEventListener("DOMContentLoaded", function(event) {
        // alert("yes");
        // document.querySelector(".searchBottomBody").innerhtml = "searchResult";
      });
    
        const firebaseConfig = {
            apiKey: "AIzaSyDUKJBzdWiRqYxKvUKOS3_GTItXuqUX4gY",
            authDomain: "mynirogya.firebaseapp.com",
            databaseURL: "https://mynirogya-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "mynirogya",
            storageBucket: "mynirogya.appspot.com",
            messagingSenderId: "159595452167",
            appId: "1:159595452167:web:e122a0828bb1f8ee7117a2",
            measurementId: "G-DRWEPNQD1P"
        };
      
        // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      // const analytics = getAnalytics(app);
      const db = getDatabase(app);
      const databaseRef = ref(db);

      get(child(databaseRef, "employee/data")).then((snapshot) => {
        console.log("andar aaya");
        const dataHolder = snapshot.val();
        // medMap.set(initialLetter + secondLetter, dataHolder);
          listData(dataHolder);
        console.log(snapshot.val());
      });



// ------------------------------ Database --------------------------------------------- //

const clockIn = document.querySelector(".card2");
const clockOut = document.querySelector(".card3");
const addStaff = document.querySelector(".addEmp");
let staffData ; // Storing the staaff data , updated frequently 

let popUp ;

const confirmOption = `<div class="confirmLabel">
<p>Choose Option For Attendence</p>
<i class="fa-solid fa-xmark close" style="color: #920000"></i>
</div>
<div class="confirmCont">
<div class="confirmCamera">
  <i
    class="fa-duotone fa-face-viewfinder"
    style="
      --fa-primary-color: #980000;
      --fa-primary-opacity: 1;
      --fa-secondary-color: #980000;
      --fa-secondary-opacity: 0.4;
    "
  ></i>
  <p>Camera</p>
</div>

<div class="confirmManually">
  <i
    class="fa-duotone fa-keyboard"
    style="--fa-primary-color: #980000; --fa-secondary-color: #980000"
  ></i>
  <p>Manually</p>
</div>
</div>` ;

const popUpClockInVideo = `<div class="popUpLabel">
<p>Clock In</p>
<i class="fa-solid fa-xmark close" style="color: #920000"></i>
</div>
<div class="popUpBody">
<div class="cameraDiv">
  <video id="video" width="100%" height="50%" autoplay></video>
</div>
<div class="cameraAction">
  <h2>Name :</h2>
  <div class="confirmDiv">Confirm</div>
</div>
</div>` ;

const popUpClockInManual = `<div class="manualLabel">
<p>Clock In</p>
<i class="fa-solid fa-xmark close" style="color: #920000"></i>
</div>
<div class="searchField ">
<input type="text" placeholder=" Enter Employee Id..." />
</div>
</div>
<div class="confirmDiv">Confirm</div>
</div>` ;

const popUpAddEmp = `<form class="alignConfirm">
<div class="formLabel">
<p>Add Employee</p>
<i class="fa-solid fa-xmark close" style="color: #920000"></i>
</div>
<label for="Uname"> Name: <input type="text" name="Uname" id="Uname" placeholder="Elon Musk" required /> </label>
<label for="">
  Contact:<input
    type="tel"
    id="number"
    inputmode="numeric"
    name="phoneNumber"
    pattern="\d{10}"  
    maxlength="10"
    placeholder="9876543210"
    required
/></label>
<label for="">
  Bank Name: <input type="text" name="" id="bankName" placeholder="Bank Of India" required />
</label>
<label for="">
  Account Number: <input type="tel" maxlength="18" placeholder="10521675432109"  required id="accNo" />
</label>
<label class="chooseImage" for=""> Choose 2-3 images :<input type="file" name="" id="fileInput" multiple required ></label>
<div class="confirmDiv" >Confirm</div>
</form>` ;

clockIn.addEventListener("click", () => {

    popUp = document.querySelector(".popUp") ;

    popUp.classList.add("active");
    popUp.classList.add("alignConfirm");
    popUp.innerHTML = confirmOption;


    closingPopUp();


    document.querySelector(".confirmCamera").addEventListener("click",()=>{
        popUp.innerHTML = popUpClockInVideo;
        startWebcam();
        closingPopUp();
        document.querySelector(".popUp").classList.remove("alignConfirm");
        // document.querySelector(".popUp").classList.remove("");
    });

    document.querySelector(".confirmManually").addEventListener("click",()=>{
      popUp.innerHTML = popUpClockInManual;
      closingPopUp();
    });

});

clockOut.addEventListener("click",() => {

  popUp = document.querySelector(".popUp") ;
  popUp.classList.add("active");
  popUp.classList.add("alignConfirm");
  popUp.innerHTML = confirmOption;


  closingPopUp();


  document.querySelector(".confirmCamera").addEventListener("click",()=>{
      popUp.innerHTML = popUpClockInVideo;
  (document.querySelector(".popUpLabel > p")).innerHTML = "Clock Out" ;
      startWebcam();
      closingPopUp();
      document.querySelector(".popUp").classList.remove("alignConfirm");
      // document.querySelector(".popUp").classList.remove("");
  });

  document.querySelector(".confirmManually").addEventListener("click",()=>{
    popUp.innerHTML = popUpClockInManual;
    popUp.style.height = "min-content";
  (document.querySelector(".manualLabel > p")).innerHTML = "Clock Out" ;
    closingPopUp();
  });

});

addStaff.addEventListener("click",() => {
  const popUp = document.querySelector(".popUp");
  
  // popUp.classList.add("alignConfirm");
  popUp.classList.add("active");
  popUp.innerHTML = popUpAddEmp;
  document.getElementById('fileInput').addEventListener('change', function() {
    if (this.files.length < 2 || this.files.length > 3) {
      alert('You can only select a minimum of 2 and a maximum of 3 files');
      this.value = ''; // Clear the selected files
    }
  });

  closingPopUp();

  document.querySelector("form .confirmDiv").addEventListener("click",()=>{
    const empName = document.querySelector("#Uname").value ;
    const empContact = document.querySelector("#number").value ;
    const empBankName = document.querySelector("#bankName").value ;
    const empAccNo = document.querySelector("#accNo").value ;
    const empFiles = document.querySelector("#fileInput").value ;




    alert(empName + empContact + empBankName + empAccNo + empFiles);

  });

});

function startWebcam() {
    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: false,
        })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error(error);
        });
}

function closingPopUp(){
    document.querySelector(".close").addEventListener("click", function () {
        document.querySelector(".popUp").classList.remove("active");
        if(!(document.querySelector(".popUp").classList.contains("alignConfirm"))){

            stopWebcam(); // Call stopWebcam() when the close button is clicked
        }
    });
}

function stopWebcam() {
    // Get all tracks from the video stream
    const tracks = video.srcObject.getTracks();

    // Iterate through tracks and stop each one
    tracks.forEach(track => {
        track.stop();
    });

    // Clear the video srcObject
    video.srcObject = null;
}

function listData(empData){
  staffData = Object.keys(empData);
  document.querySelector(".searchBottomBody").innerHTML = "";
  staffData.forEach(data => {
    const searchResult = `<div class="searchResult">
    <p>${empData[data].Name}</p>
    <p>${data}</p>
  </div>`
    // alert(searchResult)
    // document.addEventListener("DOMContentLoaded", function(event) {
        // alert("yes");
        document.querySelector(".searchBottomBody").innerHTML += searchResult;
  });
  alert(staffData[0].slice(1,3));
  //   });
  
}
function getNewId(){
  staffData.forEach(data)
  alert(staffData.slice(-3));
}
function saveData(){
  const newID = getNewId();
  const empName = ref(db, 'employee/chat');

  // Ensure msg is defined and not null before saving to the database
  if (msg !== undefined && msg !== null) {
      set(chatRef, {
          messages: msg.innerHTML
      }).then(() => {
          console.log("User data saved successfully!");
      }).catch((error) => {
          console.error("Error saving data:", error);
      });
    }
  
}