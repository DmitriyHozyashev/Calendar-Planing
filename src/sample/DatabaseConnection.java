package sample;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection extends Configs {

    public Connection getDbConnection() throws SQLException{
        String connectionString = "jdbc:mysql://" + dbHost + ":" + dbPort + "/" + dbName+"?useUnicode=true&serverTimezone="+dbServerTimeZone+"&user="+dbUser+"&password="+dbPass;
        try {
            Connection dbConnection = DriverManager.getConnection(connectionString/*, dbUser, dbPass*/);
            return dbConnection;
        }
        catch (SQLException ex)
        {
            ex.printStackTrace();
        }
        return null;
    }
}
