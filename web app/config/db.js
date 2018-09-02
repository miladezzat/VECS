var dbConfig = {
    server: "study-pc\\KEROLES",
    database: 'VECS3',
    user: 'sa',
    password: '123',
    port: 54720
};
var sql           =   require('mssql');
var conn = new sql.connect(dbConfig, function (error) {
    if (error) {
        console.log(error);
        return;
    }
    console.log('Connection successfully');
});