import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQd4rwZVkUvT0c5ojkm_8e6TQC2MZ0H0U",
  authDomain: "pemetaan-kdkmp-knmp-nasional.firebaseapp.com",
  projectId: "pemetaan-kdkmp-knmp-nasional",
  storageBucket: "pemetaan-kdkmp-knmp-nasional.firebasestorage.app",
  messagingSenderId: "451783790192",
  appId: "1:451783790192:web:aa1cc32735fe32bdf06eb5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const voteBtn = document.getElementById("voteBtn");

const provinsiSelect =
document.getElementById("provinsi");

const kabupatenSelect =
document.getElementById("kabupaten");

voteBtn.addEventListener("click", async () => {

  const wilayah =
  kabupatenSelect.value;

  if(!wilayah){
    alert("Pilih Kabupaten/Kota");
    return;
  }

  if(localStorage.getItem("sudahVote")){
    alert("Anda sudah memilih");
    return;
  }

  await addDoc(
    collection(db,"hasilPolling"),
    {
      wilayah: wilayah,
      waktu: new Date()
    }
  );

  localStorage.setItem(
    "sudahVote",
    "ya"
  );

  alert("Terima kasih");

  tampilkanHasil();

});

async function tampilkanHasil(){

  const hasil =
  document.getElementById("hasil");

  hasil.innerHTML = "";

  const snapshot =
  await getDocs(
    collection(db,"hasilPolling")
  );

  let ranking = {};

  snapshot.forEach((doc)=>{

    const wilayah =
    doc.data().wilayah;

    if(!ranking[wilayah]){

      ranking[wilayah]=0;

    }

    ranking[wilayah]++;

  });

  const data =
  Object.entries(ranking)
  .sort((a,b)=>b[1]-a[1]);

  data.forEach((item,index)=>{

    hasil.innerHTML += `
      <div class="rank">
      ${index+1}. ${item[0]}
      (${item[1]} suara)
      </div>
    `;

  });

}

fetch(
"https://ibnux.github.io/data-indonesia/provinsi.json"
)
.then(res=>res.json())
.then(data=>{

data.forEach(item=>{

const option =
document.createElement("option");

option.value = item.id;
option.textContent = item.nama;

provinsiSelect.appendChild(option);

});

});

provinsiSelect.addEventListener(
"change",
function(){

const idProvinsi =
this.value;

kabupatenSelect.innerHTML =
'<option value="">Pilih Kabupaten/Kota</option>';

fetch(
"https://ibnux.github.io/data-indonesia/kabupaten/" +
idProvinsi +
".json"
)
.then(res=>res.json())
.then(data=>{

data.forEach(item=>{

const option =
document.createElement("option");

option.value = item.nama;
option.textContent = item.nama;

kabupatenSelect.appendChild(option);

});

});

});

tampilkanHasil();
