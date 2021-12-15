document.write('\
\
<style>\
* {\
    box-sizing: border-box;\
  }\
  \
  /* Style the body */\
  body {\
    font-family: Arial, Helvetica, sans-serif;\
    margin: 0px;\
  }\
  \
  /* Header/logo Title */\
  .header {\
    padding: 60px;\
    text-align: center;\
    background: #1abc9c;\
    color: white;\
  }\
  \
  /* Increase the font size of the heading */\
  .header h1 {\
    font-size: 40px;\
  }\
  \
  \
  /* Active/current link */\
  .navbar a.active {\
    background-color: #666;\
    color: white;\
  }\
  \
  /* Column container */\
  .row {\
    display: flex;\
    flex-wrap: wrap;\
  }\
  \
  /* Create two unequal columns that sits next to each other */\
  /* Sidebar/left column */\
  .side {\
    flex: 30%;\
    background-color: #f1f1f1;\
    padding: 20px;\
  }\
  \
  /* Main column */\
  .main {\
    flex: 70%;\
    background-color: white;\
    padding: 20px;\
  }\
  \
  /* Footer */\
  .footer {\
    padding: 20px;\
    text-align: center;\
    background: #ddd;\
  }\
  </style>\
')
