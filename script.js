// buat close button & terapkan di tial list items
// fungsi dibawah mengambil elemen dengan tag name li. kemudian menambahkan elemen span sebagai tempat untuk menaruh close button
var myNodelist = document.getElementsByTagName("LI");   //inisiasi variabel dengan fungsi untuk mengambil elemen berdasarkan tag name "List Item" dari dokumen
var i;                                                  //inisiasi i
for (i = 0; i < myNodelist.length; i++) {               //buat looping dimana i adalah 0, jika i kurang dari panjang array myNodeList, maka tambahkan i dengan 1
  var span = document.createElement("SPAN");            //inisiasi variabel dengan fungsi untuk membuat elemen SPAN
  var txt = document.createTextNode("\u00D7");          //inisiasi variabel dengan fungsi untuk membuat element text node tanda tutup / x | /u00D7 merupakan representasi unicode dari tanda tutup (x)
  span.className = "close";                             //beri variabel span dengan properti className close
  span.appendChild(txt);                                //tambahkan txt kedalam elemen span
  myNodelist[i].appendChild(span);                      //tambahkan elemen span kedalam child dari elemen myNodeList setiap iterai index dari myNodeList
}

// buat fungsi agar closs button dapat berfungsi untuk menutup list item
var close = document.getElementsByClassName("close");   //inisiasi variabel close dengan fungsi untuk mengambil elemen dari nama class close
var i;                    //inisiasi variabel i
for (i = 0; i < close.length; ni++) {           //buat perulangan untuk setiap kondisi close.lenght
  close[i].onclick = function() {               //disini merupakan event handler dimana setiap index dari close di click maka akan mengaktifkan function()    |untuk event handler bisa dilihat di google 
    var div = this.parentElement;               //inisiasi div dengan fungsi untuk mengambil parent elemen dari elemen yang di klik, disini elemen yang diambil yaitu elemen span
    div.style.display = "none";                 //kemudian membuat elemen li disembunyikan dengan style display none
  }
}

//tambahkan simbol check ketika mengklik list item
var list = document.querrySelector('ul');             //inisiasi list dengan fungsi untuk mengambil selector ul
list.addEventListener('click', function(ev) { 
  if (ev.target.tagName ===  'LI') {
    ev.target.classList.toggle("checked");
  }
}, false);

