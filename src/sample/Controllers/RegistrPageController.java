package sample.Controllers;

import java.net.URL;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;

public class RegistrPageController {

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
    void backToAuth(ActionEvent event) {

    }

    @FXML
    void registUser(ActionEvent event) {

    }

    @FXML
    void initialize() {
    }
}
