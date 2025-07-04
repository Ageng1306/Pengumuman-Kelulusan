function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Pengumuman Kelulusan')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getDataByToken(token) {
  const ss = SpreadsheetApp.openById('1cbr7bznEyi4Vc1il2ReV0Qb-SkhD1ULo-U5sbHazghk');
  const dataSheet = ss.getSheetByName('DATA');
  const data = dataSheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) { // Mulai dari baris ke-2 (indeks 1)
    const row = data[i];
    const tokenSheet = row[0].toString().trim().toLowerCase();
    const tokenInput = token.trim().toLowerCase();

    if (tokenSheet === tokenInput) {
      const result = {
        nama: row[2],       // kolom C
        nisn: row[1],       // kolom B
        asal: row[3],       // kolom D
        diterima: row[4],   // kolom E
        status: row[5]      // kolom F
      };

      simpanRekap(token, result.nama, result.nisn, result.diterima);
      return result;
    }
  }

  return null; // jika tidak ditemukan
}

function simpanRekap(token, nama, nisn, diterima) {
  try {
    const ss = SpreadsheetApp.openById('1cbr7bznEyi4Vc1il2ReV0Qb-SkhD1ULo-U5sbHazghk');
    let sheet = ss.getSheetByName("REKAP");

    if (!sheet) {
      sheet = ss.insertSheet("REKAP");
      sheet.appendRow(["Waktu", "Token", "Nama", "NISN", "Diterima"]);
    }

    sheet.appendRow([new Date(), token, nama, nisn, diterima]);
  } catch (err) {
    Logger.log("Gagal menyimpan rekap: " + err.message);
  }
}
