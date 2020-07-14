function authenticate() {
  return gapi.auth2
    .getAuthInstance()
    .signIn({
      scope:
        "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets",
    })
    .then(
      function () {
        console.log("Sign-in successful");
      },
      function (err) {
        console.error("Error signing in", err);
      }
    );
}
function loadClient() {
  gapi.client.setApiKey("AIzaSyAlUugSguK7sOtZrnByLtMUASbVEzKqHNI");
  return gapi.client
    .load("https://content.googleapis.com/discovery/v1/apis/sheets/v4/rest")
    .then(
      function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}

var name = document.getElementById("name").value;
var email = document.getElementById("email").value;
var github = document.getElementById("github").value;
var phone_number = document.getElementById("phone_number").value;
var shirt_size = document.getElementById("shirt_size").value;
var major = document.getElementById("major").value;
var message = document.getElementById("message").value;
console.log(name, email, github, phone_number, shirt_size, major, message);


// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.sheets.spreadsheets.values
    .append({
      //   Change this to appropriate ID
      spreadsheetId: "180XdAlprlTmbYMqa7XLeTv7lne_EkQ1lzQNKzcZ8xmI",
      range: "A1",
      includeValuesInResponse: true,
      insertDataOption: "INSERT_ROWS",
      responseDateTimeRenderOption: "SERIAL_NUMBER",
      responseValueRenderOption: "FORMATTED_VALUE",
      valueInputOption: "USER_ENTERED",
      resource: {
        range: "A1",
        majorDimension: "ROWS",
        values: [
          [name, email, github, phone_number, shirt_size, major, message],
        ],
      },
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
gapi.load("client:auth2", function () {
  gapi.auth2.init({
    client_id:
      "119016497956-c2naalbd8opqs4fljf0gebe7d4j882qg.apps.googleusercontent.com",
  });
});
