// buat close button & terapkan di list items
// fungsi dibawah mengambil elemen dengan tag name li. kemudian menambahkan elemen span sebagai tempat untuk menaruh close button
var myNodelist = document.getElementsByTagName("LI"); //inisiasi variabel dengan fungsi untuk mengambil elemen berdasarkan tag name "List Item" dari dokumen
for (var i = 0; i < myNodelist.length; i++) {         //buat looping dimana i adalah 0, jika i kurang dari panjang array myNodeList, maka tambahkan i dengan 1
  var span = document.createElement("SPAN");          //inisiasi variabel dengan fungsi untuk membuat elemen SPAN
  var txt = document.createTextNode("\u00D7");        //inisiasi variabel dengan fungsi untuk membuat element text node tanda tutup / x | /u00D7 merupakan representasi unicode dari tanda tutup (x)
  span.className = "close";                           //beri variabel span dengan properti className close
  span.appendChild(txt);                              //tambahkan txt kedalam elemen span
  myNodelist[i].appendChild(span);                    //tambahkan elemen span kedalam child dari elemen myNodeList setiap iterai index dari myNodeList
}

// buat fungsi agar closs button dapat berfungsi untuk menutup list item
function updateCloseButton() {
  var close = document.getElementsByClassName("close");   //inisiasi variabel close dengan fungsi untuk mengambil elemen dari nama class close
  for (var i = 0; i < close.length; i++) {                //buat perulangan untuk setiap kondisi close.lenght
    close[i].onclick = function () {                      //disini merupakan event handler dimana setiap index dari close di click maka akan mengaktifkan function()    |untuk event handler bisa dilihat di google
      var div = this.parentElement;                       //inisiasi div dengan fungsi untuk mengambil parent elemen dari elemen yang di klik, disini elemen yang diambil yaitu elemen span
      div.style.display = "none";                         //kemudian membuat elemen li disembunyikan dengan style display none
      updateLocalStorage();                               //panggil fungsi untuk mengupdate localStorage
    };
  }
}
//tambahkan simbol check ketika mengklik list item
var list = document.querySelector("ul");            //inisiasi list dengan fungsi untuk mengambil selector ul
list.addEventListener(                              //tambahkan eventListener ke dalam list     
  "click",                                          //event yang didengarkan adalah event click
  function (ev) {                                   //tambahkan event listener click ke list, kemudian tambahkan fungsi callback saat event terjadi, disini (ev) mewakili event
    if (ev.target.tagName === "LI") {               //buat kondisi jika event yang ditargetkan tagname merupakan LI
      ev.target.classList.toggle("checked");        //maka targetkan classList dengan tanda checked
      updateLocalStorage();
    }
  }, false                                          //jika kondisi tidak terpenuhi false
); 

// buat list item baru & simpan dengan local storage ketika tombol add ditekan
function newElement() {                                         //buat fungsi newElemen
  var li = document.createElement("li");                        //inisiasi li dengan fungsi untuk membuat elemen li di dokumen
  var inputValue = document.getElementById("myInput").value;    //inisiasi variabel dengan fungsi mengambil elemen dengan id "myInput di dokumen. kemudian nilai tersebut diambil dengan .value"
  var t = document.createTextNode(inputValue);                  //inisiasi variabel dengan fungsi untuk membuat text node dengan nilai dari variabel inputValue | value node text bisa dimasukkan kedalam html
  li.appendChild(t);                                            //menyisipkan nodeText milik variabel t kedalam variabel li

  if (inputValue === "") {                    //buat percabangan dengan kondisi jika inputValue berisi value kosong
    alert("You must add / write something");  //maka tambahkan alert / pemberitahuan
  } else {                  //sebaliknya
    document.getElementById("myUL").appendChild(li);  //ambil elemen dengan id "myUL" kemudian tambahkan variabel/elemen li sebagai child dari elemen dengan id myUL

    updateLocalStorage();
  }
  document.getElementById("myInput").value = "";  //ambil elemen dengan id myInput. kemudian akses value,selanjutnya atur nilai value sebagai string kosong

  var span = document.createElement("SPAN");    //inisiasi span dengan fungsi untuk menambahkan elemen SPAN
  var txt = document.createTextNode("\u00D7");  //inisiasi txt dengan membuat textNode tanda tutup (x)
  span.className = "close";                     //mengatur properti dengan className span dengan close
  span.appendChild(txt);                        //tambahkan child nodeTxt (txt) kedalam elemen span
  li.appendChild(span);                         //tambahkan child elemen span kedalam parent li
}

// simpan status checklist ke localStorage
function updateLocalStorage() {               //buat fungsi updateLocalStorage
  var todoValues = [];                        //inisiasi array
  var items = document.querySelectorAll('#myUL li');        //inisiasi variabel dengan mengambil elemen yang berada dalam child li dengan parent id myUL
  items.forEach(function (item) {                           //akses value setiap items
    if (item.style.display !== "none") {                    //buat kondisi jika style item bukan none
      var todoValue = {                                     //inisiasi     
        text: item.firstChild.nodeValue,                    //buat properti text dimana text mengambil nilai childNode dari item yaitu elemen li
        checked: item.classList.contains('checked')         //buat properti checked dimana checked mengecek apakah dalam elemen item terdapat class checked, kalo ada nilainya true, kalo tidak false
      };
      todoValues.push(todoValue);                           //masukkan value todoValue ke todoValues
    }
  });
  localStorage.setItem('todoValues', JSON.stringify(todoValues));   /*fungsi disini untuk menyimpan data kedalam local storage, dengan menggunakan key berupa string untuk mengidentifikasi data yang disimpan. 
                                                                    kemudian bagian JSON digunakan untuk mengubah object js 'todoValues; menjadi string JSON.*/
}

// muat ulang list item dari localStorage saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {               //buat fungsi untuk menjalankan javascript segera setelah html selesai dimuat, bahkan sebelum sumber daya belum dimuat dengan fungsi 'DOMContentLoaded'.
  var todoValues = JSON.parse(localStorage.getItem("todoValues")) || [];  //inisiasi variabel dengan mengambil item dari localStorage, kemudian cek jika nilai tidak ada maka null. setelah itu ubah item dengan JSON.parse untuk mengembalikan nilai menjadi array, setelahnya masukkan ke array, jika nilai kosong maka akan false di []                            
  todoValues.forEach(function (todoValue) {                               //buat perulangan setiap elemen di todoValues kemudian masukkan ke todoValue
    var li = document.createElement("li");                                //inisiasi untuk membuat li
    var t = document.createTextNode(todoValue.text);                      //inisiasi untuk membuat text node dari to value
    li.appendChild(t);                                                    //masukkan t ke li
    if (todoValue.checked)  {                                             //buat percabangan jika array todoValue terdapat checked
      li.classList.add("checked");                                        //maka tambahkan classList checked di list
    }
    
    var span = document.createElement("SPAN");                        //isisiai untuk membuat span
    var txt = document.createTextNode("\u00D7");                      //inisiasi untuk membuat tanda tutup
    span.className = "close";                         //tambah class close di span
    span.appendChild(txt);                            //masukkan txt ke span
    li.appendChild(span);                             //masukkan span ke li

    //tambah event listener untuk close button
    span.onclick = function () {                //buat fungsi event handler click di span 
      var div = this.parentElement;         //inisiasi div di parent div
      div.style.display = "none";           //tambahkan style div display none di div
      updateLocalStorage();                 //update localStorage
    }
    document.getElementById("myUL").appendChild(li);    //ambil elemen dengan id myUl. kemuduan masukkan elemen li kedalamnya sebgai child elemen dari elemen dengan id myUl
  });
  updateCloseButton();              //panggul fungsi 
});


