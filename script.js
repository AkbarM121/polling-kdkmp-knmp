fetch(
"https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
)
.then(res=>res.json())
.then(data=>{

data.forEach(item=>{

const option =
document.createElement("option");

option.value = item.id;

option.textContent = item.name;

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
`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${idProvinsi}.json`
)
.then(res=>res.json())
.then(data=>{

data.forEach(item=>{

const option =
document.createElement("option");

option.value = item.name;

option.textContent = item.name;

kabupatenSelect.appendChild(option);

});

});

});
