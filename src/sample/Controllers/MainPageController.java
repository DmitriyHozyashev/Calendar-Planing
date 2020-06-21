package sample.Controllers;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

public class MainPageController {

    @FXML
    private ResourceBundle resources;

    @FXML
    private URL location;

    @FXML
    private Label plansBtn;

    @FXML
    private Label operBtn;

    @FXML
    private Label devicesBtn;

    @FXML
    private Label detailsBtn;

    @FXML
    private Button exitBtn;

    @FXML
    private AnchorPane rightScene;

    @FXML
    void loadPlansScene(MouseEvent event) {
        loadScene("/sample/Pages/plansP");
    }

    @FXML
    void loadDevicesScene(MouseEvent event) {
        loadScene("/sample/Pages/devicesP");
    }

    @FXML
    void loadOpersScene(MouseEvent event) {
        loadScene("/sample/Pages/opersP");
    }

    @FXML
    void loadReqsScene(MouseEvent event) {
        loadScene("/sample/Pages/reqsP");
    }

    void loadScene(String sc){
        AnchorPane anchorPane = null;
        try {
            anchorPane = FXMLLoader.load(getClass().getResource(sc + ".fxml"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        rightScene.getChildren().setAll(anchorPane);
        rightScene.setLeftAnchor(anchorPane, 0d);
        rightScene.setRightAnchor(anchorPane, 0d);
        rightScene.setTopAnchor(anchorPane, 0d);
        rightScene.setBottomAnchor(anchorPane, 0d);
    }

    @FXML
    void initialize() {
    }

    @FXML
    void exitFromSystem(ActionEvent event) {

    }
}
