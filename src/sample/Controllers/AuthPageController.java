package sample.Controllers;

import javafx.event.ActionEvent;
import java.io.IOException;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ResourceBundle;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import sample.DatabaseConnection;
import sample.ModelClasses.UserDataTransfer;
import sample.ModelClasses.UserModel;

public class AuthPageController {
    private DatabaseConnection dbConn;

    @FXML
    private ResourceBundle resources;

    @FXML
    private URL location;

    @FXML
    private Label errLabel;

    @FXML
    private Button loginSignInBtn;

    @FXML
    private Button registrBtn;

    @FXML
    private TextField loginField;

    @FXML
    private PasswordField passwordField;

    @FXML
    void initialize() {
        dbConn = new DatabaseConnection();
        errLabel.setText("");
    }

    @FXML
    void loginUser(ActionEvent event) {
        String userLogin = loginField.getText().trim();
        String userPsswd = passwordField.getText().trim();
        if(userLogin.equals("") || userPsswd.equals("")) {
            errLabel.setText("Заполните пустые поля");
            errLabel.setVisible(true);
            return;
        }
        boolean isLogin = isLogin(userLogin, userPsswd);
        if (isLogin)
            loadMainPage();
        else {
            errLabel.setText("Такого пользователя нет");
            errLabel.setVisible(true);
        }
    }

    @FXML
    void registrUser(ActionEvent event) {
        try {
            registrBtn.getScene().getWindow().hide();
            FXMLLoader loader = new FXMLLoader();
            Parent root = loader.load(getClass().getResource("/sample/Pages/registrationP.fxml"));
            Stage registerStage = new Stage();
            registerStage.setTitle("Регистрация");
            registerStage.setScene(new Scene(root, 700, 400));
            registerStage.resizableProperty().setValue(false);
            registerStage.showAndWait();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public boolean isLogin (String userLogin, String userPsswd) {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        String sqlQuery = "SELECT * FROM users WHERE User_Login = ? and User_Password = ?";
        try {
            conn = dbConn.getDbConnection();
            ps = conn.prepareStatement(sqlQuery);
            ps.setString(1, userLogin);
            ps.setString(2, userPsswd);
            rs = ps.executeQuery();
            if(rs.next()) {
                UserDataTransfer.getInstance().setUserModel(new UserModel(rs.getInt(1), rs.getString(2)));
                return true;
            }
            return false;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
        finally {
            try{
                rs.close();
                ps.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public void loadMainPage()
    {
        try {
            loginSignInBtn.getScene().getWindow().hide();
            FXMLLoader loader = new FXMLLoader();
            Parent root = loader.load(getClass().getResource("/sample/Pages/mainP.fxml"));
            Stage mainPage = new Stage();
            mainPage.setTitle("Календарное планирование производства");
            mainPage.setScene(new Scene(root));
            mainPage.setMaximized(true);
            mainPage.showAndWait();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
