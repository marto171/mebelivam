/**
 * Мебели ВаМ — webhook за заявки от сайта → Google Sheets
 *
 * ИНСТАЛАЦИЯ (2 минути):
 * 1. Отвори таблицата → Extensions → Apps Script
 * 2. Изтрий примерния код и постави този файл
 * 3. Deploy → New deployment → type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Копирай Web app URL-а (https://script.google.com/macros/s/.../exec)
 *    и го прати на Марто → влиза като SHEETS_WEBHOOK_URL във Vercel.
 *
 * Колони: Дата и час | Източник | Име | Телефон | Имейл | Услуга | Помещение | Съобщение | Коментар
 */

var SHEET_ID = '18LjpU1MkHPcaYYXGJBQ4dsCbH7UuhrnxTPanxpqUZro';
var SHEET_GID = 1489785584;

function getTargetSheet_() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === SHEET_GID) return sheets[i];
  }
  return sheets[0];
}

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try { data = JSON.parse(e.postData.contents); } catch (err) { data = e.parameter || {}; }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var now = Utilities.formatDate(new Date(), 'Europe/Sofia', 'dd.MM.yyyy HH:mm');
    getTargetSheet_().appendRow([
      now,                       // Дата и час
      data.source || 'сайт',     // Източник (UTM от рекламата)
      data.name || '',           // Име
      data.phone || '',          // Телефон
      data.email || '',          // Имейл
      data.service || '',        // Услуга
      data.room || '',           // Помещение
      data.message || '',        // Съобщение
      ''                         // Коментар (за вътрешни бележки)
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/** За бърз тест в браузъра: отвори Web app URL-а — трябва да видиш {"ok":true,"ping":"mebelivam"} */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, ping: 'mebelivam' }))
    .setMimeType(ContentService.MimeType.JSON);
}
