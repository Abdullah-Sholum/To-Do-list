// buat close button & terapkan di list items
// fungsi dibawah mengambil elemen dengan tag name li. kemudian menambahkan elemen span sebagai tempat untuk menaruh close button
var myNodelist = document.getElementsByTagName("LI");   //inisiasi variabel dengan fungsi untuk mengambil elemen berdasarkan tag name "List Item" dari dokumen
//bagian dibawah merupakan perulangan berdasarkan jumlah list item
for (var i = 0; i < myNodelist.length; i++) {           //buat looping dimana i adalah 0, jika i kurang dari panjang array myNodeList, maka tambahkan i dengan 1
  /*dibawah merupakan pembuatan close button dengan cara membuat span dengan class name "close", kemudian isi dengan close button
  . setelah itu masukkan spanClassClose kedalam sejumlah index li */
  var divCek =  document.createElement("DIV");          //buat elemen div
  divCek.className = "divCek";                          //kasih nama div dengan divCek
  myNodelist[i].appendChild(divCek);                    //tambahkan divCek sebagai elemen baru dari tiap index

  var span = document.createElement("SPAN");            //inisiasi variabel dengan fungsi untuk membuat elemen SPAN
  var txt = document.createTextNode("\u00D7");          //inisiasi variabel dengan fungsi untuk membuat element text node tanda tutup / x | /u00D7 merupakan representasi unicode dari tanda tutup (x)
  span.className = "close";                             //beri variabel span dengan properti className close
  span.appendChild(txt);                                //tambahkan txt kedalam elemen span
  myNodelist[i].appendChild(span);                      //tambahkan elemen span kedalam child dari elemen myNodeList setiap iterai index dari myNodeList
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

function enableEditing(spanList, inputValue) {
  spanList.addEventListener('click', function () {
    var textArea = document.createElement("TEXTAREA"); //buat elemen textArea
    textArea.className = "edit"; //beri className "edit"
    textArea.value = inputValue; //set value dari textArea dengan inputValue

    spanList.textContent = ''; //kosongkan spanList sebelum menambahkan textArea
    spanList.appendChild(textArea); //tambahkan textArea sebagai child dari spanList
    textArea.focus(); //fokus ke textArea

    // Event listener untuk save nilai ketika klik di luar textArea
    function saveValue(event) {
      if (!spanList.contains(event.target)) { //jika klik di luar spanList
        spanList.removeChild(textArea); //hapus textArea dari spanList
        spanList.textContent = textArea.value; //set textContent spanList dengan nilai dari textArea
        updateLocalStorage(); //update local storage
        document.removeEventListener('click', saveValue); //hapus event listener setelah digunakan
      }
    }

    document.addEventListener('click', saveValue); //tambahkan event listener untuk klik di luar textArea
  });
}

//tambahkan simbol check ketika mengklik list item
var list = document.querySelector("ul");                      //inisiasi list dengan fungsi untuk mengambil selector ul dari dokumen
list.addEventListener("click", function (ev) {                //dilist tambahkan event untuk didengar yaitu event click. kemudian tambahkan fungsi callback saat event terjadi, disini (ev) mewakili event
    if (ev.target.classList.contains('divCek')) {             //buat percabangan dimana, apakah didalam class list terdapat ('divCek')
      ev.target.parentElement.classList.toggle("checked");    //maka target parent elemen dari class list (li) kasih tanda cek
      updateLocalStorage();
    } if (ev.target.tagName === 'LI') {                       //event target apakah tagname terdapat LI
      ev.target.classList.toggle('checked');                  //jika ya maka kasih classList tanda cek
      updateLocalStorage();
    }
  }, false                                                    //jika kondisi tidak terpenuhi false
); 

// buat fungsi enableEditing untuk spanList
function enableEditing(spanList, inputValue) {
  spanList.addEventListener('click', function() {
    var textArea = document.createElement('textarea');
    textArea.className = 'edit';
    textArea.value = inputValue;
    spanList.textContent = '';
    spanList.appendChild(textArea);
    textArea.focus();

    document.addEventListener('click', function saveValue(event) {
      if (!spanList.contains(event.target)) {
        spanList.removeChild(textArea);
        spanList.textContent = textArea.value;
        updateLocalStorage();
        document.removeEventListener('click', saveValue);
      }
    });
  });
}
// buat list item baru & simpan dengan local storage ketika tombol add ditekan
function newElement() {                                         //buat fungsi newElemen`
  var li = document.createElement("li");                        //inisiasi li dengan fungsi untuk membuat elemen li di dokumen
  var spanList = document.createElement("SPAN");                //buat elemen span
  var inputValue = document.getElementById("myInput").value;    //inisiasi variabel dengan fungsi mengambil elemen dengan id "myInput di dokumen. kemudian nilai tersebut diambil dengan .value"
  var t = document.createTextNode(inputValue);                  //inisiasi variabel dengan fungsi untuk membuat text node dengan nilai dari variabel inputValue | value node text bisa dimasukkan kedalam html
  spanList.className = "spanList";                              //beri nama spanList dengan nama spanList
  spanList.appendChild(t);                                      //jadikan t sebagai child dari span list

  //cek kondisi input
  if (inputValue === "") {                    //buat percabangan dengan kondisi jika inputValue berisi value kosong
    alert("You must add / write something");  //maka tambahkan alert / pemberitahuan
    return;
  } else {                                    //sebaliknya
    document.getElementById("myUL").appendChild(li);  //ambil elemen dengan id "myUL" kemudian tambahkan variabel/elemen li sebagai child dari elemen dengan id myUL
    li.appendChild(spanList);                         //jadikan spanList sebagai child li
    updateLocalStorage();                             //update local storage
  }
  document.getElementById("myInput").value = "";  //ambil elemen dengan id myInput. kemudian akses value,selanjutnya atur nilai value sebagai string kosong
  

  /*buat span dengan isi close button dengan class close. */
  var span = document.createElement("SPAN");    //inisiasi span dengan fungsi untuk menambahkan elemen SPAN
  var txt = document.createTextNode("\u00D7");  //inisiasi txt dengan membuat textNode tanda tutup (x)
  span.className = "close";                     //mengatur properti dengan className span dengan close
  span.appendChild(txt);                        //tambahkan child nodeTxt (txt) kedalam elemen span

  var divCek =  document.createElement("DIV");  //buat divCek
  divCek.className = "divCek";                  //kasih class = divCek di div

  /*buat child elemen span untuk li */
  li.appendChild(divCek);                       //jadikan divCek sebagai child dari li
  li.appendChild(span);                         //tambahkan child elemen span kedalam parent li

  //buat fungsi close button
  var close = document.getElementsByClassName("close"); /*buat perulangan untuk menampilkan close button setiap iterasi*/
  for (i = 0; i < close.length; i++) {                 
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
  enableEditing(spanList, inputValue);
}

// simpan status checklist ke localStorage
function updateLocalStorage() {                             //buat fungsi updateLocalStorage
  var todoValues = [];                                      //inisiasi array
  var items = document.querySelectorAll('#myUL li');        //inisiasi variabel dengan mengambil elemen yang berada di selector myUl dengan child li
  items.forEach(function (item) {                           //lakukan perulangan dengan forEach untuk setiap items. kemudian jalankan fungsi dengan parameter item
    if (item.style.display !== "none") {                    //buat kondisi jika style item bukan none / tidak kosong
      var spanText = item.querySelector('.spanList');       //isisiasi variabel dengan mangambil selector dari item dengan class spanList.
      var divCek = item.querySelector('.divCek');           //isisiasi variabel dengan mangambil selector dari item dengan class .divCek.
      var todoValue = {                                     //inisiasi dengan object
        text: spanText ? spanText.textContent: '',          //buat properti dari value spanText, kemudian ? merupakan operator ternary (kondisional) jika value dari spanText kosong / undefined maka beri string kosong ''
        checked: item.classList.contains('checked'),        //buat properti checked dimana checked mengecek apakah dalam elemen item terdapat class checked, kalo ada nilainya true, kalo tidak false
        cekExists: divCek ? true : false                    //buat properti dengan mengecek divCek, kondisional jika divCek ada maka true & jika null maka false
      };
      todoValues.push(todoValue);                           //masukkan value todoValue ke todoValues
    };
  });
  localStorage.setItem('todoValues', JSON.stringify(todoValues));   /*fungsi disini untuk menyimpan data kedalam local storage, dengan menggunakan key berupa string untuk mengidentifikasi data yang disimpan. 
                                                                    kemudian bagian JSON digunakan untuk mengubah object js 'todoValues; menjadi string JSON.*/
}

// muat ulang list item dari localStorage saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {               //buat fungsi untuk menjalankan javascript segera setelah html selesai dimuat, bahkan sebelum sumber daya belum dimuat dengan fungsi 'DOMContentLoaded'.
  var todoValues = JSON.parse(localStorage.getItem("todoValues")) || [];  //inisiasi variabel dengan mengambil item dari localStorage, kemudian cek jika nilai tidak ada maka null. setelah itu ubah item dengan JSON.parse untuk mengembalikan nilai menjadi array, setelahnya masukkan ke array, jika nilai kosong maka akan false di []                            
  todoValues.forEach(function (todoValue) {                               //buat perulangan setiap elemen di todoValues kemudian masukkan ke todoValue
    var li = document.createElement("li");                                //inisiasi untuk membuat li
    var spanList = document.createElement("SPAN");                        //buat span
    spanList.className = "spanList";                                      //span class='spanList'
    var t = document.createTextNode(todoValue.text);                      //inisiasi untuk membuat text node dari to value
    spanList.appendChild(t);                                              //jadikan t child dari span
    li.appendChild(spanList);                                             //jadikan spanText child dari li

    if (todoValue.checked)  {                                             //buat percabangan jika array todoValue terdapat checked
      li.classList.add("checked");                                        //maka tambahkan classList checked di list
    }
    
    var span = document.createElement("SPAN");                        //isisiai untuk membuat span
    var txt = document.createTextNode("\u00D7");                      //inisiasi untuk membuat tanda tutup
    span.className = "close";                                         //tambah class close di span
    span.appendChild(txt);                                            //masukkan txt ke span

    var divCek =  document.createElement("DIV");                      //buat divCek
    divCek.className = "divCek";

    li.appendChild(divCek);                                           //masukkan div ke li sebagai child
    li.appendChild(span);                                             //masukkan span ke li sebagai child

    //tambah event listener untuk close button
    span.onclick = function () {            //buat fungsi event handler click di span 
      var div = this.parentElement;         //inisiasi div di parent div
      div.style.display = "none";           //tambahkan style div display none di div
      updateLocalStorage();                 //update localStorage
    }
    document.getElementById("myUL").appendChild(li);    //ambil elemen dengan id myUl. kemuduan masukkan elemen li kedalamnya sebgai child elemen dari elemen dengan id myUl
    enableEditing(spanList, todoValue.text);
  });
  updateCloseButton();              //panggil fungsi 
});

