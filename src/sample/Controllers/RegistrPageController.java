package sample.Controllers;

import java.io.IOException;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
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

public class RegistrPageController {
    DatabaseConnection dbConn;

    @FXML
    private ResourceBundle resources;

    @FXML
    private URL location;

    @FXML
    private TextField loginField;

    @FXML
    private PasswordField passwordField;

    @FXML
    private Label errLabel;

    @FXML
    private Button backBtn;

    @FXML
    private Button registrBtn;

    @FXML
    void initialize() {
        dbConn = new DatabaseConnection();
        errLabel.setText("");
    }

    @FXML
    void registUser(ActionEvent event) {
        String userLogin = loginField.getText().trim();
        String userPsswd = passwordField.getText().trim();
        if(userLogin.equals("") || userPsswd.equals("")) {
            errLabel.setText("Заполните пустые поля");
            errLabel.setVisible(true);
            return;
        }
        boolean isExist = isExist(userLogin);
        if (isExist) {
            errLabel.setText("Такой пользователь уже сущестует");
            errLabel.setVisible(true);
        }
        else {
            addUser(userLogin, userPsswd);
            loadMainPage();
        }
    }

    @FXML
    void backToAuth(ActionEvent event) {
        try {
            registrBtn.getScene().getWindow().hide();
            FXMLLoader loader = new FXMLLoader();
            Parent root = loader.load(getClass().getResource("/sample/Pages/auth.fxml"));
            Stage mainPage = new Stage();
            mainPage.setTitle("Авторизация");
            mainPage.setScene(new Scene(root));
            mainPage.setMaximized(true);
            mainPage.showAndWait();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public boolean isExist (String userLogin) {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        String sqlQuery = "SELECT * FROM users WHERE User_Login = ?";
        try {
            conn = dbConn.getDbConnection();
            ps = conn.prepareStatement(sqlQuery);
            ps.setString(1, userLogin);
            rs = ps.executeQuery();
            if(rs.next())
                return true;
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

    private void addUser(String userLogin, String userPassword){
        Connection conn = null;
        PreparedStatement ps = null;
        String sqlQuery = "INSERT INTO users (User_Login, User_Password) VALUES (?, ?)";
        ResultSet rs = null;
        try {
            conn = dbConn.getDbConnection();
            ps = conn.prepareStatement(sqlQuery);
            ps.setString(1, userLogin);
            ps.setString(2, userPassword);
            ps.executeUpdate();
            rs = ps.getGeneratedKeys();
            if (rs.next())
                UserDataTransfer.getInstance().setUserModel(new UserModel(rs.getInt(1), userLogin));
        } catch (SQLException e) {
            e.printStackTrace();
        }
        finally {
            try{
                ps.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    private void loadMainPage() {
        try {
            registrBtn.getScene().getWindow().hide();
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
